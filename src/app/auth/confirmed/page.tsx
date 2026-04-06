import Link from 'next/link'

export default function ConfirmedPage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-10">
          <img
            src="https://ik.imagekit.io/9nqnnkvba/android-chrome-192x192.png"
            alt="Annonce.brussels"
            className="w-10 h-10 rounded-xl"
          />
          <span className="text-xl font-headline font-extrabold text-primary tracking-tight">
            Annonce<span className="text-secondary">.brussels</span>
          </span>
        </Link>

        {/* Success icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-headline font-bold text-on-surface mb-3">
          Compte confirmé !
        </h1>
        <p className="text-on-surface/60 mb-8 leading-relaxed">
          Votre adresse e-mail a été vérifiée avec succès.<br />
          Bienvenue sur <strong>Annonce.brussels</strong> — l&apos;annuaire B2B de référence à Bruxelles.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="btn-primary text-sm py-3 px-8">
            Se connecter
          </Link>
          <Link href="/" className="btn-secondary text-sm py-3 px-8">
            Découvrir le site
          </Link>
        </div>
      </div>
    </main>
  )
}
