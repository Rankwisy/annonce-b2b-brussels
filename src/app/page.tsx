import type { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { getFeaturedBusinesses } from '@/lib/data/businesses'
import { communes } from '@/lib/data/communes'
import { BusinessCard } from '@/components/business/BusinessCard'

export const metadata: Metadata = {
  title: "Annonce.brussels — L'Annuaire B2B de Référence à Bruxelles",
  description: "Trouvez et contactez les meilleures entreprises B2B de Bruxelles. Construction, Finance, Tech, Horeca et plus. Avis vérifiés, fiches détaillées.",
  alternates: { canonical: 'https://annonce.brussels' },
}

export default function HomePage() {
  const featured = getFeaturedBusinesses()
  const topCategories = categories.slice(0, 8)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-inverse-surface">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-inverse-surface/80 via-inverse-surface/60 to-primary/20 z-10" />
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559113202-c916b8e44373?w=1800&q=80')] bg-cover bg-center opacity-50" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="space-y-8">
            <span className="inline-block text-primary-container font-bold tracking-widest text-xs uppercase bg-primary/15 px-4 py-1.5 rounded-full border border-primary/20">
              Annuaire B2B · Bruxelles, Belgique
            </span>
            <h1 className="font-headline font-extrabold text-5xl md:text-6xl lg:text-[3.75rem] leading-[1.05] tracking-tight text-white">
              Le Curateur<br />
              Architectural des{' '}
              <span className="text-gradient-primary">Affaires<br />Bruxelloises.</span>
            </h1>
            <p className="text-lg text-inverse-on-surface/80 leading-relaxed max-w-lg">
              Connectez-vous avec les entreprises les plus fiables de la capitale européenne.
              Qualité, expertise et intégrité locale.
            </p>

            {/* Search bar */}
            <div className="glass-panel rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-ambient border border-white/10 max-w-xl">
              <div className="flex items-center gap-2 flex-1 bg-white/10 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Chercher une entreprise..."
                  className="bg-transparent outline-none text-white placeholder:text-white/50 text-sm flex-1"
                />
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 sm:w-36">
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-white/70 text-sm">Bruxelles, BE</span>
              </div>
              <Link
                href="/rechercher"
                className="bg-primary hover:bg-primary-container text-white font-headline font-bold text-sm px-6 py-3 rounded-xl transition-all text-center"
              >
                Rechercher
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {[
                { value: '2 400+', label: 'Entreprises' },
                { value: '12', label: 'Secteurs' },
                { value: '19', label: 'Communes' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-headline font-extrabold text-2xl text-white">{stat.value}</p>
                  <p className="text-xs text-inverse-on-surface/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating card preview */}
          <div className="hidden lg:block space-y-3">
            {featured.slice(0, 3).map((biz, index) => (
              <Link key={biz.slug} href={index === 2 ? `/categorie/${biz.categorySlug}` : `/entreprise/${biz.slug}`}>
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white hover:border-primary/40 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="font-headline font-black text-primary">{index === 2 ? '🚘' : biz.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-headline font-bold text-gray-900 text-sm truncate group-hover:text-primary transition-colors">
                        {index === 2 ? biz.category : biz.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {index === 2 ? 'Découvrir le secteur →' : `${biz.commune} · ${biz.category}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {index === 2 ? (
                        <span className="text-sm font-bold text-primary">→</span>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-bold text-gray-800">{biz.rating}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTEURS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface" id="categories">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-bold text-xs tracking-widest uppercase mb-2">Parcourir le réseau</p>
              <h2 className="section-title text-3xl md:text-4xl">Secteurs Stratégiques</h2>
            </div>
            <Link href="/categorie" className="hidden sm:flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
              Voir toutes les catégories →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {topCategories.map((cat) => (
              <Link key={cat.slug} href={`/categorie/${cat.slug}`} className="group">
                <div className="card p-5 border border-transparent group-hover:border-primary/10 transition-all text-center">
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-headline font-bold text-sm text-on-surface group-hover:text-primary transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-secondary/60 mt-1">{cat.count} entreprises</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/categorie" className="btn-secondary inline-flex text-sm">
              Voir les {categories.length} secteurs
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED BUSINESSES ──────────────────────────────────────── */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-bold text-xs tracking-widest uppercase mb-2">Leaders locaux sélectionnés</p>
              <h2 className="section-title text-3xl md:text-4xl">Entreprises à la Une</h2>
              <p className="text-secondary mt-2 text-sm">Sélectionnés pour leur excellence opérationnelle et leur engagement envers Bruxelles.</p>
            </div>
            <Link href="/rechercher" className="hidden sm:flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
              Voir toutes →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.slice(0, 4).map((biz) => (
              <BusinessCard key={biz.slug} business={biz} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNES ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <p className="text-primary font-bold text-xs tracking-widest uppercase mb-2">Par localisation</p>
            <h2 className="section-title text-3xl md:text-4xl">Entreprises par Commune</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {communes.map((c) => (
              <Link
                key={c.slug}
                href={`/ville/${c.slug}`}
                className="bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/30 hover:bg-primary/5 text-secondary hover:text-primary font-medium text-sm px-5 py-2.5 rounded-full transition-all"
              >
                {c.name} <span className="text-xs text-secondary/50">({c.postalCode})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-container">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-white mb-4">
            Inscrivez votre entreprise aujourd&apos;hui
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez le réseau professionnel le plus influent de Bruxelles et augmentez votre visibilité auprès des décideurs locaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/publier" className="bg-white text-primary font-headline font-bold px-8 py-4 rounded-lg hover:bg-surface transition-all shadow-lg">
              Commencer l&apos;inscription
            </Link>
            <Link href="/a-propos" className="border-2 border-white/30 text-white font-headline font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEO TEXT BLOCK ───────────────────────────────────────────── */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-headline font-bold text-xl text-on-surface mb-4">
            L&apos;annuaire B2B de référence pour Bruxelles
          </h2>
          <div className="prose prose-sm text-secondary space-y-3">
            <p>
              <strong>Annonce.brussels</strong> est la première plateforme dédiée aux entreprises professionnelles de la Région de Bruxelles-Capitale. Notre annuaire B2B recense plus de 2 400 sociétés vérifiées dans 12 secteurs stratégiques, des cabinets d&apos;avocats aux agences digitales, en passant par les entreprises de construction, les fiduciaires et les spécialistes en santé.
            </p>
            <p>
              Que vous soyez à la recherche d&apos;un <Link href="/categorie/finance-comptabilite" className="text-primary hover:underline">comptable à Bruxelles</Link>, d&apos;un <Link href="/categorie/technologie-innovation" className="text-primary hover:underline">développeur web</Link> ou d&apos;une <Link href="/categorie/construction-renovation" className="text-primary hover:underline">entreprise de construction</Link>, notre annuaire vous connecte avec les prestataires les plus fiables de la capitale européenne.
            </p>
            <p>
              Chaque fiche entreprise est enrichie d&apos;informations vérifiées : numéro de TVA belge, coordonnées, horaires, avis clients authentiques et services détaillés. Notre système de vérification garantit la qualité et la fiabilité des entreprises référencées.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
