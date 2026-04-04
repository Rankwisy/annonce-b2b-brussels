import Link from 'next/link'

export function Header() {
  const navLinks = [
    { href: '/categorie', label: 'Catégories' },
    { href: '/rechercher', label: 'Rechercher' },
    { href: '/ville/bruxelles-ville', label: 'Par Commune' },
  ]

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-outline-variant/10 h-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-headline font-black text-sm">A</span>
          </div>
          <span className="text-lg font-headline font-extrabold text-primary tracking-tight">
            Annonce<span className="text-secondary">.brussels</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/publier"
            className="btn-primary text-sm py-2 px-4 hidden sm:inline-flex"
          >
            Publier une annonce
          </Link>
          {/* Mobile menu button */}
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors" aria-label="Menu">
            <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
