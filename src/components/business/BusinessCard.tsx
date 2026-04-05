import Link from 'next/link'
import Image from 'next/image'
import { Business } from '@/types'

interface BusinessCardProps {
  business: Business
  variant?: 'default' | 'featured' | 'compact'
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-sm font-bold text-on-surface">{rating.toFixed(1)}</span>
    </div>
  )
}

function Thumbnail({ src, name, size = 'md' }: { src?: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'w-20 h-20' : size === 'sm' ? 'w-10 h-10' : 'w-14 h-14'
  const textSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-xl'

  if (src) {
    return (
      <div className={`${dims} rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/10`}>
        <Image
          src={src}
          alt={name}
          width={size === 'lg' ? 80 : size === 'sm' ? 40 : 56}
          height={size === 'lg' ? 80 : size === 'sm' ? 40 : 56}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    )
  }
  return (
    <div className={`${dims} rounded-xl bg-surface-container-low flex items-center justify-center flex-shrink-0 border border-outline-variant/10`}>
      <span className={`font-headline font-black ${textSize} text-primary`}>{name.charAt(0)}</span>
    </div>
  )
}

export function BusinessCard({ business, variant = 'default' }: BusinessCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/entreprise/${business.slug}`} className="group block">
        <div className="card p-4 group-hover:border-primary/10 border border-transparent transition-all">
          <div className="flex items-start gap-3">
            <Thumbnail src={business.heroImage} name={business.name} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {business.premium && <span className="badge-premium">PREMIUM</span>}
                {business.verified && <span className="badge-verified">✓ Vérifié</span>}
              </div>
              <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors truncate">{business.name}</h3>
              <p className="text-xs text-secondary mt-0.5 truncate">{business.tagline}</p>
            </div>
            <StarRating rating={business.rating} />
          </div>
          <div className="flex items-center gap-3 mt-3 text-xs text-secondary/70">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {business.commune}
            </span>
            <span className={`flex items-center gap-1 ${business.openNow ? 'text-green-600' : 'text-red-500'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${business.openNow ? 'bg-green-500' : 'bg-red-400'}`} />
              {business.openNow ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/entreprise/${business.slug}`} className="group block">
      <article className="card border border-transparent group-hover:border-primary/10 transition-all overflow-hidden">
        {/* Hero image banner */}
        {business.heroImage && (
          <div className="relative h-36 overflow-hidden">
            <Image
              src={business.heroImage}
              alt={business.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
            {/* Badges over image */}
            <div className="absolute top-3 left-3 flex gap-2">
              {business.premium && <span className="badge-premium shadow-sm">★ PREMIUM</span>}
              {business.featured && <span className="text-xs text-white bg-primary/80 backdrop-blur-sm px-2 py-0.5 rounded-full font-bold">À la une</span>}
            </div>
          </div>
        )}

        {/* Top accent for premium (no image) */}
        {business.premium && !business.heroImage && (
          <div className="h-0.5 bg-gradient-to-r from-primary to-primary-container" />
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Logo / thumbnail — smaller when image banner present */}
              <Thumbnail src={business.heroImage ? undefined : undefined} name={business.name} size="md" />
              <div className="flex-1 min-w-0">
                {!business.heroImage && (
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {business.premium && <span className="badge-premium">★ PREMIUM</span>}
                    {business.verified && <span className="badge-verified">✓ Vérifié</span>}
                    {business.featured && (
                      <span className="text-xs text-secondary/60 bg-surface-container px-2 py-0.5 rounded-full">À la une</span>
                    )}
                  </div>
                )}
                <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-tight">
                  {business.name}
                </h3>
                <p className="text-sm text-secondary mt-0.5 leading-snug">{business.tagline}</p>
                {business.heroImage && (
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {business.verified && <span className="badge-verified">✓ Vérifié</span>}
                  </div>
                )}
              </div>
            </div>
            {/* Rating */}
            <div className="text-right flex-shrink-0">
              <StarRating rating={business.rating} />
              <p className="text-xs text-secondary/60 mt-0.5">{business.reviewCount} avis</p>
            </div>
          </div>

          <p className="text-sm text-secondary leading-relaxed mb-3 line-clamp-2">{business.description}</p>

          {/* Services */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {business.services.slice(0, 3).map((s) => (
              <span key={s} className="text-xs bg-surface-container px-2.5 py-1 rounded-full text-secondary">
                {s}
              </span>
            ))}
            {business.services.length > 3 && (
              <span className="text-xs bg-surface-container px-2.5 py-1 rounded-full text-secondary/60">
                +{business.services.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
            <div className="flex items-center gap-4 text-xs text-secondary/70">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                {business.address}, {business.commune}
              </span>
              <span className={`flex items-center gap-1 font-medium ${business.openNow ? 'text-green-600' : 'text-red-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${business.openNow ? 'bg-green-500' : 'bg-red-400'}`} />
                {business.openNow ? 'Ouvert maintenant' : `Fermé · ${business.hours}`}
              </span>
            </div>
            <span className="text-xs text-primary font-semibold group-hover:underline">
              Voir le profil →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
