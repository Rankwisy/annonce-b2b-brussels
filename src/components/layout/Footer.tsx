import Link from 'next/link'
import { categories } from '@/lib/data/categories'
import { communes } from '@/lib/data/communes'

export function Footer() {
  const topCategories = categories.slice(0, 6)
  const topCommunes = communes.slice(0, 5)

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-headline font-black text-sm">A</span>
              </div>
              <span className="font-headline font-extrabold text-primary">Annonce<span className="text-secondary">.brussels</span></span>
            </Link>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              L&apos;annuaire B2B de référence pour la capitale européenne. Qualité, expertise et intégrité locale.
            </p>
            <p className="text-xs text-secondary/60">© {new Date().getFullYear()} Annonce.brussels</p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70 mb-4">Secteurs</h3>
            <ul className="space-y-2">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categorie/${cat.slug}`} className="text-sm text-secondary hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categorie" className="text-sm text-primary font-medium hover:underline">
                  Voir tous →
                </Link>
              </li>
            </ul>
          </div>

          {/* Communes */}
          <div>
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70 mb-4">Communes</h3>
            <ul className="space-y-2">
              {topCommunes.map((commune) => (
                <li key={commune.slug}>
                  <Link href={`/ville/${commune.slug}`} className="text-sm text-secondary hover:text-primary transition-colors">
                    {commune.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ville/bruxelles-ville" className="text-sm text-primary font-medium hover:underline">
                  Voir toutes →
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-secondary/70 mb-4">Annonce.brussels</h3>
            <ul className="space-y-2">
              {[
                { href: '/publier', label: 'Publier une annonce' },
                { href: '/a-propos', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/politique-confidentialite', label: 'Confidentialité' },
                { href: '/plan-du-site', label: 'Plan du site' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-secondary hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-outline-variant/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary/60">
            © {new Date().getFullYear()} Annonce.brussels — L&apos;Architecte de la Ville
          </p>
          <p className="text-xs text-secondary/60">
            Annuaire B2B Bruxelles · Région de Bruxelles-Capitale, Belgique
          </p>
        </div>
      </div>
    </footer>
  )
}
