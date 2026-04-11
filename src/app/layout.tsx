import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { generateOrganizationSchema } from '@/lib/utils/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

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
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annonce.brussels',
    description: 'L\'Annuaire B2B de Référence à Bruxelles',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: 'https://annonce.brussels' },
  verification: { google: '91aHRH6ZDU2tR_Z_vAvIO4WhwgxVxS873HrsaHdU1ig' },
  icons: {
    icon: [
      { url: 'https://ik.imagekit.io/9nqnnkvba/favicon.ico',        type: 'image/x-icon' },
      { url: 'https://ik.imagekit.io/9nqnnkvba/favicon-16x16.png',  sizes: '16x16',  type: 'image/png' },
      { url: 'https://ik.imagekit.io/9nqnnkvba/favicon-32x32.png',  sizes: '32x32',  type: 'image/png' },
    ],
    apple: { url: 'https://ik.imagekit.io/9nqnnkvba/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    other: [
      { rel: 'icon', url: 'https://ik.imagekit.io/9nqnnkvba/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: 'https://ik.imagekit.io/9nqnnkvba/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: 'https://ik.imagekit.io/9nqnnkvba/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = generateOrganizationSchema()
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
