import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { ModerationCard } from '@/components/admin/ModerationCard'
import Link from 'next/link'

type Props = { params: Promise<{ id: string }> }

export default async function AdminListingDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from('listings')
    .select('*, profiles!listings_user_id_fkey(full_name, email), listing_images(id, image_url, position)')
    .eq('id', id)
    .single()

  if (!listing) notFound()

  const profile = (listing as any).profiles
  const images = ((listing as any).listing_images ?? []).sort((a: { position: number }, b: { position: number }) => a.position - b.position)

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/listings" className="text-sm text-on-surface/50 hover:text-primary transition-colors">
          ← Toutes les annonces
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-headline font-bold text-on-surface truncate">{listing.title}</h1>
          <StatusBadge status={listing.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          {images.length > 0 && (
            <div className="card p-5">
              <h2 className="font-headline font-semibold text-on-surface mb-4 text-sm">Photos</h2>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img: { id: string; image_url: string }, idx: number) => (
                  <div key={img.id} className="rounded-xl overflow-hidden aspect-video bg-surface-container">
                    <img src={img.image_url} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          <div className="card p-5 space-y-4">
            <h2 className="font-headline font-semibold text-on-surface text-sm">Détails</h2>
            <dl className="space-y-3">
              <div className="flex gap-4">
                <dt className="w-28 text-xs font-semibold text-on-surface/40 uppercase tracking-wide flex-shrink-0">Catégorie</dt>
                <dd className="text-sm text-on-surface">{listing.category.replace(/-/g, ' ')}</dd>
              </div>
              {listing.location && (
                <div className="flex gap-4">
                  <dt className="w-28 text-xs font-semibold text-on-surface/40 uppercase tracking-wide flex-shrink-0">Localisation</dt>
                  <dd className="text-sm text-on-surface">{listing.location}</dd>
                </div>
              )}
              {listing.price && (
                <div className="flex gap-4">
                  <dt className="w-28 text-xs font-semibold text-on-surface/40 uppercase tracking-wide flex-shrink-0">Prix</dt>
                  <dd className="text-sm text-on-surface">{Number(listing.price).toLocaleString('fr-BE')} €</dd>
                </div>
              )}
              <div className="flex gap-4">
                <dt className="w-28 text-xs font-semibold text-on-surface/40 uppercase tracking-wide flex-shrink-0">Soumis le</dt>
                <dd className="text-sm text-on-surface">{new Date(listing.created_at).toLocaleDateString('fr-BE', { dateStyle: 'long' })}</dd>
              </div>
            </dl>
          </div>

          {/* Description */}
          {listing.description && (
            <div className="card p-5">
              <h2 className="font-headline font-semibold text-on-surface mb-3 text-sm">Description</h2>
              <p className="text-sm text-on-surface/70 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
            </div>
          )}

          {/* Rejection reason */}
          {listing.status === 'rejected' && listing.rejection_reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-red-700 mb-1">Motif de refus enregistré</p>
              <p className="text-sm text-red-600">{listing.rejection_reason}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <ModerationCard listingId={id} currentStatus={listing.status} />

          {/* User info */}
          <div className="card p-5">
            <h3 className="font-headline font-semibold text-on-surface text-sm mb-3">Déposant</h3>
            <p className="text-sm font-medium text-on-surface">{profile?.full_name ?? '—'}</p>
            <p className="text-xs text-on-surface/50 mt-0.5">{profile?.email ?? '—'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
