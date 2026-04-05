import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { StatusBadge } from '@/components/dashboard/StatusBadge'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user!.id)
    .single()

  const { data: listings } = await supabase
    .from('listings')
    .select('id, title, status, created_at')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalCount } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)

  const { count: approvedCount } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('status', 'approved')

  const { count: pendingCount } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('status', 'pending')

  const firstName = profile?.full_name?.split(' ')[0] ?? user!.email?.split('@')[0]

  const stats = [
    { label: 'Total annonces',  value: totalCount ?? 0,    color: 'text-primary' },
    { label: 'Approuvées',       value: approvedCount ?? 0, color: 'text-green-600' },
    { label: 'En attente',       value: pendingCount ?? 0,  color: 'text-amber-600' },
  ]

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-headline font-bold text-on-surface">
          Bonjour, {firstName} 👋
        </h1>
        <p className="text-on-surface/60 mt-1">
          Gérez vos annonces et suivez leur statut de modération.
        </p>
        {profile?.role === 'admin' && (
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Panneau d&apos;administration →
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-xs font-semibold text-on-surface/50 uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-3xl font-headline font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent listings */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-headline font-bold text-on-surface">Annonces récentes</h2>
          <Link href="/dashboard/listings" className="text-sm text-primary font-semibold hover:underline">
            Voir tout →
          </Link>
        </div>

        {!listings?.length ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-on-surface/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-on-surface/50 text-sm mb-4">Vous n&apos;avez pas encore d&apos;annonces.</p>
            <Link href="/dashboard/listings/new" className="btn-primary text-sm py-2 px-5">
              Créer ma première annonce
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/20">
            {listings.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-on-surface truncate">{l.title}</p>
                  <p className="text-xs text-on-surface/40 mt-0.5">
                    {new Date(l.created_at).toLocaleDateString('fr-BE')}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <StatusBadge status={l.status} />
                  <Link
                    href={`/dashboard/listings/${l.id}/edit`}
                    className="text-xs text-primary hover:underline"
                  >
                    Modifier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
