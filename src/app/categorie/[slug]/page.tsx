import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategoryBySlug } from '@/lib/data/categories'
import { getBusinessesByCategory } from '@/lib/data/businesses'
import { BusinessCard } from '@/components/business/BusinessCard'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { generateFAQSchema } from '@/lib/utils/seo'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) return {}
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: { canonical: `https://annonce.brussels/categorie/${cat.slug}` },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: `https://annonce.brussels/categorie/${cat.slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) notFound()

  const bizList = getBusinessesByCategory(params.slug)
  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Catégories', href: '/categorie' },
    { name: cat.name, href: `/categorie/${cat.slug}` },
  ]

  const faqSchema = generateFAQSchema([
    {
      question: `Comment trouver une entreprise de ${cat.name.toLowerCase()} à Bruxelles ?`,
      answer: `Sur Annonce.brussels, naviguez dans la catégorie ${cat.name} pour découvrir ${cat.count} entreprises vérifiées avec leurs coordonnées, avis clients et services détaillés. Vous pouvez aussi utiliser la recherche avancée pour filtrer par commune.`,
    },
    {
      question: `Combien y a-t-il d'entreprises de ${cat.name.toLowerCase()} à Bruxelles ?`,
      answer: `Notre annuaire recense ${cat.count} entreprises de ${cat.name.toLowerCase()} actives dans la Région de Bruxelles-Capitale, toutes vérifiées avec numéro de TVA belge et coordonnées complètes.`,
    },
    {
      question: `Comment contacter une entreprise de ${cat.name.toLowerCase()} à Bruxelles ?`,
      answer: `Chaque fiche d'entreprise sur Annonce.brussels contient les coordonnées complètes : téléphone, email, adresse et site web. Cliquez sur une entreprise pour accéder à sa fiche et la contacter directement.`,
    },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className="pt-20 min-h-screen bg-surface">
      {/* Hero band */}
      <div className="bg-surface-container-low border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex items-center gap-4 mt-2">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface">{cat.name}</h1>
              <p className="text-secondary mt-1 max-w-2xl">{cat.description}</p>
            </div>
          </div>
          {/* SEO intro paragraph */}
          <div className="mt-6 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 max-w-3xl">
            <p className="text-sm text-secondary leading-relaxed">
              Découvrez les meilleures entreprises de <strong className="text-on-surface">{cat.name.toLowerCase()}</strong> à Bruxelles.
              Notre sélection de {cat.count} professionnels vérifiés vous garantit qualité et fiabilité.
              Comparez les services, consultez les avis clients et contactez directement les prestataires.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Stats bar */}
        <div className="flex items-center gap-6 mb-8 text-sm text-secondary">
          <span><strong className="text-on-surface font-bold">{cat.count}</strong> entreprises</span>
          <span>·</span>
          <span>Secteur: <strong className="text-on-surface">{cat.name}</strong></span>
          <span>·</span>
          <span>Région de Bruxelles-Capitale</span>
        </div>

        {bizList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bizList.map(biz => (
              <BusinessCard key={biz.slug} business={biz} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
            <span className="text-5xl mb-4 block">{cat.icon}</span>
            <h3 className="font-headline font-bold text-lg text-on-surface mb-2">
              Bientôt disponible
            </h3>
            <p className="text-secondary text-sm mb-6">
              Les entreprises de ce secteur seront disponibles très prochainement.
            </p>
            <a href="/publier" className="btn-primary inline-flex text-sm">
              Inscrire mon entreprise
            </a>
          </div>
        )}

        {/* Cross-links SEO */}
        <div className="mt-14 border-t border-outline-variant/10 pt-10">
          <h2 className="font-headline font-bold text-lg text-on-surface mb-4">
            Autres secteurs à Bruxelles
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter(c => c.slug !== params.slug)
              .slice(0, 8)
              .map(c => (
                <a
                  key={c.slug}
                  href={`/categorie/${c.slug}`}
                  className="text-sm bg-surface-container border border-outline-variant/10 hover:border-primary/30 hover:text-primary text-secondary px-4 py-2 rounded-full transition-all"
                >
                  {c.icon} {c.name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
