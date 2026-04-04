export interface Category {
  slug: string
  name: string
  nameEn: string
  icon: string
  description: string
  metaTitle: string
  metaDescription: string
  count: number
}

export interface Commune {
  slug: string
  name: string
  postalCode: string
  description: string
  metaTitle: string
  metaDescription: string
}

export interface Business {
  slug: string
  name: string
  tagline: string
  description: string
  fullDescription: string
  category: string
  categorySlug: string
  commune: string
  communeSlug: string
  address: string
  postalCode: string
  phone: string
  email: string
  website?: string
  rating: number
  reviewCount: number
  verified: boolean
  featured: boolean
  premium: boolean
  openNow: boolean
  hours: string
  services: string[]
  logo?: string
  heroImage?: string
  reviews: Review[]
  createdAt: string
  vatNumber: string
}

export interface Review {
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface SearchParams {
  q?: string
  categorie?: string
  commune?: string
  note?: string
  ouvert?: string
  page?: string
}
