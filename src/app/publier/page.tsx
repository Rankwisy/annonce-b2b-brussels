import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { categories } from '@/lib/data/categories'

export const metadata: Metadata = {
  title: 'Publier une Annonce — Inscrire mon entreprise à Bruxelles',
  description: 'Inscrivez votre entreprise sur Annonce.brussels, l\'annuaire B2B de référence de la capitale européenne. Visibilité accrue, avis vérifiés, fiches détaillées.',
  alternates: { canonical: 'https://annonce.brussels/publier' },
}

export default function PublierPage() {
  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Publier une annonce', href: '/publier' },
  ]

  return (
    <div className="pt-20 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <Breadcrumb items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          {/* Left: editorial */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-primary font-bold tracking-widest text-xs uppercase">Partenaire de votre croissance</span>
              <h1 className="font-headline font-extrabold text-5xl text-on-surface leading-tight">
                Inscrire mon entreprise
              </h1>
              <p className="text-lg text-secondary leading-relaxed max-w-md">
                Rejoignez l&apos;écosystème digital le plus influent de Bruxelles. Valorisez votre savoir-faire auprès d&apos;une audience locale et internationale.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid gap-4">
              {[
                { icon: '✓', title: 'Visibilité Accrue', desc: 'Votre entreprise indexée sur le portail de référence pour tous les Bruxellois.' },
                { icon: '🏗', title: 'Design Architecturé', desc: 'Une mise en avant esthétique qui respecte l\'image de marque de votre société.' },
                { icon: '📊', title: 'SEO Intégré', desc: 'Chaque fiche est optimisée pour Google — schema.org, titres, mots-clés locaux.' },
                { icon: '⭐', title: 'Avis Vérifiés', desc: 'Collectez et affichez des avis clients authentiques pour renforcer votre crédibilité.' },
              ].map((b) => (
                <div key={b.title} className="bg-surface-container-low p-5 rounded-xl flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <h3 className="font-headline font-bold text-sm text-on-surface">{b.title}</h3>
                    <p className="text-xs text-secondary mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="flex items-start gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="font-headline font-black text-primary text-sm">M</span>
              </div>
              <div>
                <p className="text-sm italic text-on-surface">&ldquo;Indispensable pour notre cabinet d&apos;architecture. Notre trafic local a doublé en 3 mois.&rdquo;</p>
                <p className="text-xs font-bold text-secondary mt-0.5">— Marc D., Bruxelles-Ville</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-8 md:p-10 border border-outline-variant/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container" />

              <form className="space-y-8">
                {/* Section 1 */}
                <section className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs">01</span>
                    <h2 className="font-headline font-bold text-lg">Identité de l&apos;entreprise</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Nom de la société</label>
                      <input type="text" placeholder="Ex: Studio Nord" className="input-field" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Numéro de TVA</label>
                      <input type="text" placeholder="BE 0123.456.789" className="input-field" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Secteur d&apos;activité</label>
                    <select className="input-field">
                      <option value="">Sélectionnez votre domaine</option>
                      {categories.map(cat => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Description courte</label>
                    <textarea rows={3} placeholder="Décrivez vos services en quelques mots..." className="input-field resize-none" />
                  </div>
                </section>

                {/* Section 2 */}
                <section className="space-y-5 pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs">02</span>
                    <h2 className="font-headline font-bold text-lg">Coordonnées & Contact</h2>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Adresse à Bruxelles</label>
                    <input type="text" placeholder="Rue de la Loi 10, 1000 Bruxelles" className="input-field" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Email professionnel</label>
                      <input type="email" placeholder="contact@entreprise.be" className="input-field" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Téléphone</label>
                      <input type="tel" placeholder="+32 2 000 00 00" className="input-field" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-secondary/70">Site web (optionnel)</label>
                    <input type="url" placeholder="https://monentreprise.be" className="input-field" />
                  </div>
                </section>

                {/* Submit */}
                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 rounded text-primary focus:ring-primary border-outline-variant" />
                    <span className="text-sm text-secondary">
                      J&apos;accepte les <a href="/mentions-legales" className="text-primary hover:underline">conditions d&apos;utilisation</a> et la politique de confidentialité d&apos;Annonce.brussels.
                    </span>
                  </label>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
                    Soumettre mon inscription
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                  <p className="text-center text-xs text-secondary/50">Un conseiller vérifiera vos informations sous 48h ouvrables.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
