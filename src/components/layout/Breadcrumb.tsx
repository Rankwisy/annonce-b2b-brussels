import Link from 'next/link'
import { generateBreadcrumbSchema } from '@/lib/utils/seo'

interface BreadcrumbItem {
  name: string
  href: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schema = generateBreadcrumbSchema(items.map(i => ({ name: i.name, url: i.href })))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-secondary/70 py-3">
        {items.map((item, idx) => (
          <span key={item.href} className="flex items-center gap-1.5">
            {idx < items.length - 1 ? (
              <>
                <Link href={item.href} className="hover:text-primary transition-colors">{item.name}</Link>
                <span className="text-outline/40">/</span>
              </>
            ) : (
              <span className="text-on-surface font-medium">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
