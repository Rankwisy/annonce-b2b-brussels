import { MetadataRoute } from 'next'
import { businesses } from '@/lib/data/businesses'
import { categories } from '@/lib/data/categories'
import { communes } from '@/lib/data/communes'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://annonce.brussels'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/rechercher`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/categorie`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/publier`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${base}/categorie/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const communePages: MetadataRoute.Sitemap = communes.map(c => ({
    url: `${base}/ville/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const businessPages: MetadataRoute.Sitemap = businesses.map(b => ({
    url: `${base}/entreprise/${b.slug}`,
    lastModified: new Date(b.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...communePages, ...businessPages]
}
