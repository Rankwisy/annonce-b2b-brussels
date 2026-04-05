import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { StatusBadge } from '@/components/dashboard/StatusBadge'

type Props = { searchParams: Promise<{ status?: string }> }

const TABS = [
  { value: 'all',      label: 'Toutes' },
  { value: 'pending',  label: 'En attente' },
  { value: 'approved', label: 'Approuvées' },
  { value: 'rejected', label: 'Refusées' },
  { value: 'draft',    label: 'Brouillons' },
]

export default async function AdminListingsPage({ searchParams }: Props) {
  const { status = 'all' } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('listings')
    .select('id, title, category, status, created_at, location, profiles!listings_user_id_fkey(full_name, email)')
    .order('created_at', { ascending: false })

  if (status !== 'all') {
    query = query.eq('status', status)
  }

  const { data: listings } = await query

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Toutes les annonces</h1>
          <p className="text-on-surface/60 mt-1">{listings?.length ?? 0} résultat{(listings?.length ?? 0) !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-surface-container rounded-xl p-1 mb-6 w-fit">
        {TABS.map(tab => (
          <Link
            key={tab.value}
            href={`/admin/listings${tab.value !== 'all' ? `?status=${tab.value}` : ''}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              status === tab.value || (tab.value === 'all' && !status)
                ? 'bg-white text-on-surface shadow-sm'
                : 'text-on-surface/50 hover:text-on-surface'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {!listings?.length ? (
        <div className="card p-12 text-center">
          <p className="text-on-surface/50">Aucune annonce trouvée pour ce filtre.</p>
        </div>
      ) : (
        <div className="card divide-y divide-outline-variant/20">
          {listings.map((l) => {
            const profile = (l as any).profiles
            return (
              <div key={l.id} className="flex items-start justify-between p-5 gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-on-surface truncate">{l.title}</p>
                    <StatusBadge status={l.status} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-on-surface/40">
                    <span>{profile?.full_name ?? profile?.email ?? '—'}</span>
                    <span>·</span>
                    <span>{l.category.replace(/-/g, ' ')}</span>
                    {l.location && <><span>·</span><span>{l.location}</span></>}
                    <span>·</span>
                    <span>{new Date(l.created_at).toLocaleDateString('fr-BE')}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/listings/${l.id}`}
                  className="text-xs font-semibold text-primary hover:underline flex-shrink-0"
                >
                  Réviser →
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
