import { ListingForm } from '@/components/dashboard/ListingForm'
import Link from 'next/link'

export default function NewListingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/dashboard/listings" className="text-sm text-on-surface/50 hover:text-primary transition-colors">
          ← Mes annonces
        </Link>
        <h1 className="text-2xl font-headline font-bold text-on-surface mt-2">Nouvelle annonce</h1>
      </div>

      <ListingForm mode="create" />
    </div>
  )
}
