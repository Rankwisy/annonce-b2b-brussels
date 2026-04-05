import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createClient()

  const [
    { count: totalCount },
    { count: pendingCount },
    { count: approvedCount },
    { count: rejectedCount },
    { data: recentPending },
  ] = await Promise.all([
    supabase.from('listings').select('id', { count: 'exact', head: true }),
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'rejected'),
    supabase.from('listings')
      .select('id, title, category, created_at, profiles!listings_user_id_fkey(full_name, email)')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(5),
  ])

  const stats = [
    { label: 'Total annonces', value: totalCount ?? 0, color: 'text-primary', href: '/admin/listings' },
    { label: 'En attente',     value: pendingCount ?? 0, color: 'text-amber-600', href: '/admin/listings?status=pending' },
    { label: 'Approuvées',     value: approvedCount ?? 0, color: 'text-green-600', href: '/admin/listings?status=approved' },
    { label: 'Refusées',       value: rejectedCount ?? 0, color: 'text-red-600', href: '/admin/listings?status=rejected' },
  ]

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-headline font-bold text-on-surface">Panneau d&apos;administration</h1>
        <p className="text-on-surface/60 mt-1">Modération des annonces et gestion du contenu.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-on-surface/50 uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-3xl font-headline font-bold ${s.color}`}>{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Pending queue */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-headline font-bold text-on-surface">File d&apos;attente</h2>
          <Link href="/admin/listings?status=pending" className="text-sm text-primary font-semibold hover:underline">
            Voir tout →
          </Link>
        </div>

        {!recentPending?.length ? (
          <div className="text-center py-8">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-on-surface/50 text-sm">Aucune annonce en attente. 🎉</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/20">
            {recentPending.map((l) => {
              const profile = (l as any).profiles
              return (
                <div key={l.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-on-surface truncate">{l.title}</p>
                    <p className="text-xs text-on-surface/40 mt-0.5">
                      {profile?.full_name ?? profile?.email ?? 'Utilisateur'} · {new Date(l.created_at).toLocaleDateString('fr-BE')}
                    </p>
                  </div>
                  <Link
                    href={`/admin/listings/${l.id}`}
                    className="ml-4 text-xs font-semibold text-primary hover:underline flex-shrink-0"
                  >
                    Réviser →
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
