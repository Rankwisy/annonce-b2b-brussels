import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { generateOrganizationSchema } from '@/lib/utils/seo'

export const metadata: Metadata = {
  metadataBase: new URL('https://annonce.brussels'),
  title: {
    default: 'Annonce.brussels — L\'Annuaire B2B de Référence à Bruxelles',
    template: '%s | Annonce.brussels',
  },
  description: 'Trouvez et contactez les meilleures entreprises B2B de Bruxelles. Annuaire professionnel avec avis vérifiés, fiches détaillées et recherche avancée.',
  keywords: ['annuaire bruxelles', 'entreprises bruxelles', 'B2B bruxelles', 'fournisseurs bruxelles', 'services professionnels bruxelles'],
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    url: 'https://annonce.brussels',
    siteName: 'Annonce.brussels',
    title: 'Annonce.brussels — L\'Annuaire B2B de Bruxelles',
    description: 'Le curateur architectural des affaires bruxelloises. Connectez-vous avec les meilleures entreprises de la capitale européenne.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annonce.brussels',
    description: 'L\'Annuaire B2B de Référence à Bruxelles',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://annonce.brussels' },
  verification: { google: '91aHRH6ZDU2tR_Z_vAvIO4WhwgxVxS873HrsaHdU1ig' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = generateOrganizationSchema()
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
