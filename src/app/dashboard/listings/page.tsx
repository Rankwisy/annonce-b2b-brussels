import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { StatusBadge } from '@/components/dashboard/StatusBadge'

export default async function MyListingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: listings } = await supabase
    .from('listings')
    .select('id, title, category, status, price, location, created_at, rejection_reason')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Mes annonces</h1>
          <p className="text-on-surface/60 mt-1">{listings?.length ?? 0} annonce{(listings?.length ?? 0) !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/dashboard/listings/new" className="btn-primary text-sm py-2 px-5">
          + Nouvelle annonce
        </Link>
      </div>

      {!listings?.length ? (
        <div className="card p-12 text-center">
          <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-on-surface/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-on-surface/50 mb-5">Vous n&apos;avez pas encore d&apos;annonces.</p>
          <Link href="/dashboard/listings/new" className="btn-primary text-sm py-2 px-6">
            Créer ma première annonce
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-outline-variant/20">
          {listings.map((l) => (
            <div key={l.id} className="flex items-start justify-between p-5 gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-on-surface truncate">{l.title}</p>
                  <StatusBadge status={l.status} />
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface/40">
                  <span>{l.category.replace(/-/g, ' ')}</span>
                  {l.location && <><span>·</span><span>{l.location}</span></>}
                  {l.price && <><span>·</span><span>{Number(l.price).toLocaleString('fr-BE')} €</span></>}
                  <span>·</span>
                  <span>{new Date(l.created_at).toLocaleDateString('fr-BE')}</span>
                </div>
                {l.status === 'rejected' && l.rejection_reason && (
                  <p className="mt-2 text-xs text-error bg-error/10 rounded-lg px-3 py-2">
                    <strong>Refusé :</strong> {l.rejection_reason}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/dashboard/listings/${l.id}/edit`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
