import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { communes, getCommuneBySlug } from '@/lib/data/communes'
import { getBusinessesByCommune } from '@/lib/data/businesses'
import { BusinessCard } from '@/components/business/BusinessCard'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { categories } from '@/lib/data/categories'
import Link from 'next/link'

interface Props {
  params: { commune: string }
}

export async function generateStaticParams() {
  return communes.map(c => ({ commune: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const commune = getCommuneBySlug(params.commune)
  if (!commune) return {}
  return {
    title: commune.metaTitle,
    description: commune.metaDescription,
    alternates: { canonical: `https://annonce.brussels/ville/${commune.slug}` },
  }
}

export default function CommunePage({ params }: Props) {
  const commune = getCommuneBySlug(params.commune)
  if (!commune) notFound()

  const bizList = getBusinessesByCommune(params.commune)
  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Communes', href: '/rechercher' },
    { name: commune.name, href: `/ville/${commune.slug}` },
  ]

  return (
    <div className="pt-20 min-h-screen bg-surface">
      <div className="bg-surface-container-low border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex items-start gap-4 mt-2">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface">{commune.name}</h1>
                <span className="text-sm bg-surface-container text-secondary px-3 py-1 rounded-full">{commune.postalCode}</span>
              </div>
              <p className="text-secondary max-w-2xl">{commune.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main listings */}
          <div className="lg:col-span-2">
            <h2 className="font-headline font-bold text-xl text-on-surface mb-6">
              Entreprises à {commune.name}
              <span className="text-secondary font-normal text-base ml-2">({bizList.length} résultats)</span>
            </h2>

            {bizList.length > 0 ? (
              <div className="space-y-4">
                {bizList.map(biz => (
                  <BusinessCard key={biz.slug} business={biz} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 card">
                <p className="text-3xl mb-3">🏢</p>
                <h3 className="font-headline font-bold text-on-surface mb-2">Bientôt disponible</h3>
                <p className="text-secondary text-sm mb-4">Les entreprises de {commune.name} arrivent prochainement.</p>
                <Link href="/publier" className="btn-primary inline-flex text-sm">Inscrire mon entreprise</Link>
              </div>
            )}
          </div>

          {/* Sidebar: sectors in this commune */}
          <aside>
            <div className="card p-5 sticky top-20">
              <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70 mb-4">
                Secteurs à {commune.name}
              </h3>
              <div className="space-y-1">
                {categories.slice(0, 8).map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/rechercher?commune=${commune.slug}&categorie=${cat.slug}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-secondary hover:bg-surface-container hover:text-primary transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-xs text-secondary/40 group-hover:text-primary/60">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-outline-variant/10">
                <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70 mb-3">Autres communes</h3>
                <div className="flex flex-wrap gap-2">
                  {communes.filter(c => c.slug !== params.commune).slice(0, 5).map(c => (
                    <Link key={c.slug} href={`/ville/${c.slug}`} className="text-xs bg-surface-container text-secondary hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-all">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
