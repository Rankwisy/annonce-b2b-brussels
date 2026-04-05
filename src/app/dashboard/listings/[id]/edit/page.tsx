import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ListingForm } from '@/components/dashboard/ListingForm'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import Link from 'next/link'

type Props = { params: Promise<{ id: string }> }

export default async function EditListingPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: listing } = await supabase
    .from('listings')
    .select('*, listing_images(id, image_url, storage_path, position)')
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!listing) notFound()

  const images = (listing.listing_images ?? []).sort((a: { position: number }, b: { position: number }) => a.position - b.position)

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/dashboard/listings" className="text-sm text-on-surface/50 hover:text-primary transition-colors">
          ← Mes annonces
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-headline font-bold text-on-surface truncate">{listing.title}</h1>
          <StatusBadge status={listing.status} />
        </div>
        {listing.status === 'rejected' && listing.rejection_reason && (
          <div className="mt-3 text-sm text-error bg-error/10 border border-error/20 rounded-xl px-4 py-3">
            <strong>Motif de refus :</strong> {listing.rejection_reason}
          </div>
        )}
      </div>

      <ListingForm
        mode="edit"
        listingId={id}
        defaultValues={{
          title: listing.title,
          description: listing.description ?? '',
          price: listing.price ? String(listing.price) : '',
          category: listing.category,
          location: listing.location ?? '',
          status: listing.status,
        }}
        initialImages={images}
      />
    </div>
  )
}
