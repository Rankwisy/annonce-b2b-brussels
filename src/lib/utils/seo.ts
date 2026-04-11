export function generateLocalBusinessSchema(business: {
  slug: string
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
  heroImage?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://annonce.brussels/entreprise/${business.slug}`,
    name: business.name,
    description: business.description,
    image: business.heroImage ? `${business.heroImage}&w=1200&q=85` : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: 'Bruxelles',
      postalCode: business.postalCode,
      addressCountry: 'BE',
    },
    telephone: business.phone,
    email: business.email,
    url: business.website || `https://annonce.brussels/entreprise/${business.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
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
    logo: {
      '@type': 'ImageObject',
      url: 'https://ik.imagekit.io/9nqnnkvba/android-chrome-512x512.png',
      width: 512,
      height: 512,
    },
    description: 'L\'annuaire B2B de référence pour les entreprises de Bruxelles.',
    foundingDate: '2024',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Région de Bruxelles-Capitale',
      containedInPlace: { '@type': 'Country', name: 'Belgique' },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bruxelles',
      addressRegion: 'Région de Bruxelles-Capitale',
      addressCountry: 'BE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contact@annonce.brussels',
      availableLanguage: ['French', 'Dutch'],
    },
    sameAs: ['https://www.linkedin.com/company/annonce-brussels'],
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Annonce.brussels',
    url: 'https://annonce.brussels',
    description: 'L\'annuaire B2B de référence pour les entreprises de Bruxelles.',
    inLanguage: 'fr-BE',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://annonce.brussels/rechercher?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
