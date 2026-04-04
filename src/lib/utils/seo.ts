export function generateLocalBusinessSchema(business: {
  name: string
  description: string
  address: string
  postalCode: string
  phone: string
  email: string
  website?: string
  rating: number
  reviewCount: number
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: 'Bruxelles',
      postalCode: business.postalCode,
      addressCountry: 'BE',
    },
    telephone: business.phone,
    email: business.email,
    url: business.website || `https://annonce.brussels`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    '@id': `https://annonce.brussels/entreprise/${business.name.toLowerCase().replace(/\s+/g, '-')}`,
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://annonce.brussels${item.url}`,
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Annonce.brussels',
    url: 'https://annonce.brussels',
    logo: 'https://annonce.brussels/logo.png',
    description: 'L\'annuaire B2B de référence pour les entreprises de Bruxelles.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bruxelles',
      addressCountry: 'BE',
    },
    sameAs: ['https://www.linkedin.com/company/annonce-brussels'],
  }
}
