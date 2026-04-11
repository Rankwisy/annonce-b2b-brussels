import type { Metadata } from 'next'
import { businesses } from '@/lib/data/businesses'
import { categories } from '@/lib/data/categories'
import { communes } from '@/lib/data/communes'
import { BusinessCard } from '@/components/business/BusinessCard'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { SearchParams } from '@/types'

export const metadata: Metadata = {
  title: 'Rechercher une entreprise à Bruxelles',
  description: 'Recherchez parmi 2 400+ entreprises B2B à Bruxelles. Filtrez par secteur, commune, note et disponibilité.',
  alternates: { canonical: 'https://annonce.brussels/rechercher' },
  openGraph: {
    title: 'Rechercher une entreprise à Bruxelles',
    description: 'Recherchez parmi 2 400+ entreprises B2B à Bruxelles. Filtrez par secteur, commune, note et disponibilité.',
    url: 'https://annonce.brussels/rechercher',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function RechercherPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Filter logic
  let results = [...businesses]
  if (searchParams.categorie) {
    results = results.filter(b => b.categorySlug === searchParams.categorie)
  }
  if (searchParams.commune) {
    results = results.filter(b => b.communeSlug === searchParams.commune)
  }
  if (searchParams.note) {
    const minNote = parseFloat(searchParams.note)
    results = results.filter(b => b.rating >= minNote)
  }
  if (searchParams.ouvert === 'true') {
    results = results.filter(b => b.openNow)
  }
  if (searchParams.q) {
    const q = searchParams.q.toLowerCase()
    results = results.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.services.some(s => s.toLowerCase().includes(q))
    )
  }

  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Rechercher', href: '/rechercher' },
  ]

  return (
    <div className="pt-20 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-8">
          <h1 className="font-headline font-extrabold text-3xl text-on-surface">
            Rechercher une entreprise
          </h1>
          <p className="text-secondary mt-1">
            {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <aside className="lg:col-span-1">
            <div className="card p-5 sticky top-20 space-y-6">
              <h2 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70">Filtres</h2>

              {/* Search */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-secondary/70 block mb-2">Recherche</label>
                <form>
                  <input
                    name="q"
                    type="text"
                    defaultValue={searchParams.q || ''}
                    placeholder="Nom, service..."
                    className="input-field text-sm"
                  />
                </form>
              </div>

              {/* Category filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-secondary/70 block mb-2">Secteur</label>
                <div className="space-y-1">
                  <a href="/rechercher" className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${!searchParams.categorie ? 'bg-primary/10 text-primary font-medium' : 'text-secondary hover:bg-surface-container'}`}>
                    Tous les secteurs
                  </a>
                  {categories.map(cat => (
                    <a
                      key={cat.slug}
                      href={`/rechercher?categorie=${cat.slug}`}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${searchParams.categorie === cat.slug ? 'bg-primary/10 text-primary font-medium' : 'text-secondary hover:bg-surface-container'}`}
                    >
                      {cat.icon} {cat.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Commune filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-secondary/70 block mb-2">Commune</label>
                <div className="space-y-1">
                  {communes.slice(0, 5).map(c => (
                    <a
                      key={c.slug}
                      href={`/rechercher?commune=${c.slug}`}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${searchParams.commune === c.slug ? 'bg-primary/10 text-primary font-medium' : 'text-secondary hover:bg-surface-container'}`}
                    >
                      {c.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick filters */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-secondary/70 block mb-2">Disponibilité</label>
                <a
                  href={searchParams.ouvert === 'true' ? '/rechercher' : '/rechercher?ouvert=true'}
                  className={`flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg transition-colors ${searchParams.ouvert === 'true' ? 'bg-green-50 text-green-700 font-medium' : 'text-secondary hover:bg-surface-container'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Ouvert maintenant
                </a>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Active filters chips */}
            {(searchParams.categorie || searchParams.commune || searchParams.ouvert) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchParams.categorie && (
                  <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                    Secteur: {categories.find(c => c.slug === searchParams.categorie)?.name}
                    <a href="/rechercher" className="ml-1 hover:text-primary-container">×</a>
                  </span>
                )}
                {searchParams.commune && (
                  <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                    {communes.find(c => c.slug === searchParams.commune)?.name}
                    <a href="/rechercher" className="ml-1 hover:text-primary-container">×</a>
                  </span>
                )}
                {searchParams.ouvert === 'true' && (
                  <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    Ouvert maintenant
                    <a href="/rechercher" className="ml-1">×</a>
                  </span>
                )}
              </div>
            )}

            {results.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">Aucun résultat trouvé</h3>
                <p className="text-secondary text-sm">Essayez d&apos;élargir vos critères de recherche.</p>
                <a href="/rechercher" className="btn-secondary inline-flex mt-4 text-sm">Réinitialiser les filtres</a>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map(biz => (
                  <BusinessCard key={biz.slug} business={biz} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
