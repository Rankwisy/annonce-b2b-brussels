import type { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: 'Tous les Secteurs B2B à Bruxelles',
  description: 'Explorez les 12 secteurs B2B de l\'annuaire Annonce.brussels. Construction, Finance, Tech, Santé, Horeca et plus — entreprises vérifiées à Bruxelles.',
  alternates: { canonical: 'https://annonce.brussels/categorie' },
}

export default function CategoriesPage() {
  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Catégories', href: '/categorie' },
  ]

  return (
    <div className="pt-20 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-10">
          <p className="text-primary font-bold text-xs tracking-widest uppercase mb-2">Parcourir le réseau</p>
          <h1 className="font-headline font-extrabold text-4xl text-on-surface mb-3">
            Tous les Secteurs B2B
          </h1>
          <p className="text-secondary text-lg max-w-2xl">
            Explorez l&apos;écosystème professionnel bruxellois par secteur d&apos;activité.
            {categories.reduce((acc, c) => acc + c.count, 0).toLocaleString('fr-BE')}+ entreprises référencées.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categorie/${cat.slug}`} className="group block">
              <article className="card border border-transparent group-hover:border-primary/15 p-6 transition-all h-full">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{cat.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors mb-1">
                      {cat.name}
                    </h2>
                    <p className="text-sm text-secondary leading-relaxed line-clamp-2 mb-3">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-surface-container text-secondary px-3 py-1 rounded-full font-medium">
                        {cat.count} entreprises
                      </span>
                      <span className="text-xs text-primary font-semibold group-hover:underline">
                        Explorer →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* SEO text */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-headline font-bold text-xl text-on-surface mb-4">
            L&apos;annuaire B2B le plus complet de Bruxelles
          </h2>
          <p className="text-secondary text-sm leading-relaxed">
            Annonce.brussels recense les meilleures entreprises professionnelles de la Région de Bruxelles-Capitale, classées par secteur d&apos;activité. De la construction à la finance, en passant par les technologies de l&apos;information et les services juridiques, notre annuaire vous connecte avec les prestataires B2B les plus fiables de la capitale européenne.
          </p>
        </div>
      </div>
    </div>
  )
}
