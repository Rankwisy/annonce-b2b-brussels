import { Commune } from '@/types'

export const communes: Commune[] = [
  {
    slug: 'bruxelles-ville',
    name: 'Bruxelles-Ville',
    postalCode: '1000',
    description: 'Le cœur administratif et historique de Bruxelles, siège des institutions européennes et belges.',
    metaTitle: 'Entreprises à Bruxelles-Ville 1000 | Annonce.brussels',
    metaDescription: 'Annuaire B2B des entreprises à Bruxelles-Ville (1000). Trouvez des prestataires professionnels au cœur de la capitale.',
  },
  {
    slug: 'ixelles',
    name: 'Ixelles',
    postalCode: '1050',
    description: 'Commune dynamique au centre de Bruxelles, hub créatif et siège de nombreuses ambassades et entreprises européennes.',
    metaTitle: 'Entreprises à Ixelles 1050 | Annonce.brussels',
    metaDescription: 'Annuaire des entreprises B2B à Ixelles (1050). Hub créatif et européen de Bruxelles.',
  },
  {
    slug: 'etterbeek',
    name: 'Etterbeek',
    postalCode: '1040',
    description: 'Commune du quartier européen, concentrant des institutions EU et des services professionnels de haut niveau.',
    metaTitle: 'Entreprises à Etterbeek 1040 | Annonce.brussels',
    metaDescription: 'Annuaire B2B des entreprises à Etterbeek (1040), quartier européen de Bruxelles.',
  },
  {
    slug: 'schaerbeek',
    name: 'Schaerbeek',
    postalCode: '1030',
    description: 'Grande commune du nord de Bruxelles, carrefour commercial et artisanal avec une forte tradition entrepreneuriale.',
    metaTitle: 'Entreprises à Schaerbeek 1030 | Annonce.brussels',
    metaDescription: 'Annuaire des entreprises à Schaerbeek (1030). Commerce, artisanat et services professionnels.',
  },
  {
    slug: 'anderlecht',
    name: 'Anderlecht',
    postalCode: '1070',
    description: 'Pôle industriel et commercial en pleine transformation, avec un tissu économique dense et diversifié.',
    metaTitle: 'Entreprises à Anderlecht 1070 | Annonce.brussels',
    metaDescription: 'Annuaire B2B des entreprises à Anderlecht (1070). Zone industrielle et commerciale de Bruxelles.',
  },
  {
    slug: 'molenbeek',
    name: 'Molenbeek-Saint-Jean',
    postalCode: '1080',
    description: 'Commune en pleine revitalisation économique, avec un secteur artisanal et manufacturier actif.',
    metaTitle: 'Entreprises à Molenbeek 1080 | Annonce.brussels',
    metaDescription: 'Annuaire des entreprises à Molenbeek-Saint-Jean (1080). Artisanat et services locaux.',
  },
  {
    slug: 'woluwe-saint-lambert',
    name: 'Woluwe-Saint-Lambert',
    postalCode: '1200',
    description: 'Commune résidentielle et tertiaire de l\'est bruxellois, accueillant de nombreuses PME et professions libérales.',
    metaTitle: 'Entreprises à Woluwe-Saint-Lambert 1200 | Annonce.brussels',
    metaDescription: 'Annuaire B2B des entreprises à Woluwe-Saint-Lambert (1200). PME et professions libérales.',
  },
  {
    slug: 'uccle',
    name: 'Uccle',
    postalCode: '1180',
    description: 'Commune aisée du sud de Bruxelles, forte concentration de professions libérales et de services haut de gamme.',
    metaTitle: 'Entreprises à Uccle 1180 | Annonce.brussels',
    metaDescription: 'Annuaire des entreprises à Uccle (1180). Professions libérales et services premium à Bruxelles.',
  },
]

export function getCommuneBySlug(slug: string): Commune | undefined {
  return communes.find(c => c.slug === slug)
}
