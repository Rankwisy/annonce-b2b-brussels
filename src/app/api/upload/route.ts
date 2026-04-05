import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const listingId = formData.get('listing_id') as string | null
  const position = parseInt(formData.get('position') as string ?? '0', 10)

  if (!file || !listingId) {
    return NextResponse.json({ error: 'file and listing_id are required' }, { status: 400 })
  }

  // Verify user owns the listing
  const { data: listing } = await supabase
    .from('listings')
    .select('id')
    .eq('id', listingId)
    .eq('user_id', user.id)
    .single()

  if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const storagePath = `${user.id}/${listingId}/${Date.now()}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const { error: uploadError } = await supabase.storage
    .from('listing-images')
    .upload(storagePath, arrayBuffer, { contentType: file.type, upsert: false })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage
    .from('listing-images')
    .getPublicUrl(storagePath)

  const { data: imageRecord, error: dbError } = await supabase
    .from('listing_images')
    .insert({ listing_id: listingId, image_url: publicUrl, storage_path: storagePath, position })
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  return NextResponse.json(imageRecord, { status: 201 })
}

export async function DELETE(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { image_id } = await req.json()
  if (!image_id) return NextResponse.json({ error: 'image_id required' }, { status: 400 })

  // Get image + verify ownership via joined listing
  const { data: image } = await supabase
    .from('listing_images')
    .select('storage_path, listings!inner(user_id)')
    .eq('id', image_id)
    .single()

  if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const listing = (image as any).listings
  if (listing?.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await supabase.storage.from('listing-images').remove([image.storage_path])

  const { error } = await supabase.from('listing_images').delete().eq('id', image_id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
