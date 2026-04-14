import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Annonce.brussels — Annuaire B2B de Bruxelles',
    short_name: 'Annonce.brussels',
    description: 'Trouvez les meilleures entreprises B2B à Bruxelles',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#a04100',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
