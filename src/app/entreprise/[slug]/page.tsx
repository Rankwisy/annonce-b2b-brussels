import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { businesses, getBusinessBySlug } from '@/lib/data/businesses'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { generateLocalBusinessSchema } from '@/lib/utils/seo'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return businesses.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const biz = getBusinessBySlug(params.slug)
  if (!biz) return {}
  return {
    title: `${biz.name} — ${biz.category} à ${biz.commune}`,
    description: `${biz.description} — ${biz.address}, ${biz.postalCode} Bruxelles. ☎ ${biz.phone}`,
    alternates: { canonical: `https://annonce.brussels/entreprise/${biz.slug}` },
    openGraph: {
      title: biz.name,
      description: biz.description,
      url: `https://annonce.brussels/entreprise/${biz.slug}`,
    },
  }
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`${sz} ${i <= Math.round(rating) ? 'text-amber-400 fill-current' : 'text-outline/30 fill-current'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function BusinessPage({ params }: Props) {
  const biz = getBusinessBySlug(params.slug)
  if (!biz) notFound()

  const schema = generateLocalBusinessSchema(biz)
  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: biz.category, href: `/categorie/${biz.categorySlug}` },
    { name: biz.name, href: `/entreprise/${biz.slug}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pt-20 min-h-screen bg-surface">
        {/* Header band */}
        <div className="bg-surface-container-low border-b border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <Breadcrumb items={breadcrumbs} />
            <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 flex items-center justify-center flex-shrink-0 shadow-card">
                <span className="font-headline font-black text-3xl text-primary">{biz.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {biz.premium && <span className="badge-premium">★ PREMIUM</span>}
                  {biz.verified && <span className="badge-verified">✓ Vérifié</span>}
                  <span className="text-xs bg-surface-container text-secondary px-3 py-1 rounded-full">{biz.category}</span>
                </div>
                <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface mb-1">{biz.name}</h1>
                <p className="text-secondary text-lg">{biz.tagline}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-secondary">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={biz.rating} size="sm" />
                    <span className="font-bold text-on-surface">{biz.rating.toFixed(1)}</span>
                    <span className="text-secondary/60">({biz.reviewCount} avis)</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    {biz.address}, {biz.commune}
                  </span>
                  <span className={`flex items-center gap-1 font-medium ${biz.openNow ? 'text-green-600' : 'text-red-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${biz.openNow ? 'bg-green-500' : 'bg-red-400'}`} />
                    {biz.openNow ? 'Ouvert maintenant' : 'Actuellement fermé'}
                    <span className="text-secondary/60 font-normal">· {biz.hours}</span>
                  </span>
                </div>
              </div>
              {/* CTA buttons */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <a href={`tel:${biz.phone}`} className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Contacter
                </a>
                {biz.website && (
                  <a href={biz.website} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Site web
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="card p-6">
              <h2 className="font-headline font-bold text-lg text-on-surface mb-4">À propos</h2>
              <p className="text-secondary leading-relaxed">{biz.fullDescription}</p>
            </section>

            {/* Services */}
            <section className="card p-6">
              <h2 className="font-headline font-bold text-lg text-on-surface mb-4">Services proposés</h2>
              <div className="flex flex-wrap gap-2">
                {biz.services.map(s => (
                  <span key={s} className="bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full border border-primary/10">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Reviews */}
            {biz.reviews.length > 0 && (
              <section className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline font-bold text-lg text-on-surface">Avis clients</h2>
                  <div className="flex items-center gap-2">
                    <StarRating rating={biz.rating} size="sm" />
                    <span className="font-bold text-on-surface">{biz.rating.toFixed(1)}</span>
                    <span className="text-xs text-secondary/60">/ 5 ({biz.reviewCount} avis)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {biz.reviews.map((review, idx) => (
                    <div key={idx} className="bg-surface-container-low rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{review.author.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{review.author}</p>
                            <p className="text-xs text-secondary/60">{new Date(review.date).toLocaleDateString('fr-BE', { year: 'numeric', month: 'long' })}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarRating rating={review.rating} size="sm" />
                          {review.verified && <span className="text-xs text-primary ml-1">✓</span>}
                        </div>
                      </div>
                      <p className="text-sm text-secondary italic">&ldquo;{review.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Contact card */}
            <div className="card p-5 space-y-4">
              <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70">Coordonnées</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  <span className="text-secondary">{biz.address}, {biz.postalCode} {biz.commune}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href={`tel:${biz.phone}`} className="text-primary hover:underline font-medium">{biz.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href={`mailto:${biz.email}`} className="text-primary hover:underline truncate">{biz.email}</a>
                </div>
                {biz.vatNumber && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-secondary/60 text-xs font-mono">{biz.vatNumber}</span>
                  </div>
                )}
              </div>
              <a href={`tel:${biz.phone}`} className="btn-primary w-full flex items-center justify-center gap-2 text-sm mt-2">
                Contacter maintenant
              </a>
            </div>

            {/* Hours */}
            <div className="card p-5">
              <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70 mb-3">Horaires</h3>
              <p className="text-sm text-secondary">{biz.hours}</p>
              <span className={`inline-flex items-center gap-1.5 mt-2 text-xs font-bold ${biz.openNow ? 'text-green-600' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${biz.openNow ? 'bg-green-500' : 'bg-red-400'}`} />
                {biz.openNow ? 'Ouvert maintenant' : 'Actuellement fermé'}
              </span>
            </div>

            {/* Map placeholder */}
            <div className="card overflow-hidden">
              <div className="bg-surface-container-low h-40 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  <p className="text-xs text-secondary font-medium">Bruxelles, Belgique</p>
                  <p className="text-xs text-secondary/60">{biz.address}</p>
                </div>
              </div>
              <div className="p-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.address + ' ' + biz.commune + ' Bruxelles')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                >
                  Voir sur Google Maps →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
