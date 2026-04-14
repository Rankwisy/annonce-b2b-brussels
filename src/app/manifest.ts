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
        src: 'https://ik.imagekit.io/9nqnnkvba/android-chrome-192x192.png?updatedAt=1775401867792',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://ik.imagekit.io/9nqnnkvba/android-chrome-512x512.png?updatedAt=1775401867727',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
