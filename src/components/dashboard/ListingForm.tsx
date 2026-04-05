'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from './ImageUploader'

const CATEGORIES = [
  { value: 'construction-renovation',  label: 'Construction & Rénovation' },
  { value: 'finance-comptabilite',      label: 'Finance & Comptabilité' },
  { value: 'sante-bien-etre',           label: 'Santé & Bien-être' },
  { value: 'horeca-gastronomie',        label: 'Horeca & Gastronomie' },
  { value: 'technologie-innovation',    label: 'Technologie & Innovation' },
  { value: 'logistique-transport',      label: 'Logistique & Transport' },
  { value: 'energie-environnement',     label: 'Énergie & Environnement' },
  { value: 'services-juridiques',       label: 'Services Juridiques' },
  { value: 'marketing-communication',   label: 'Marketing & Communication' },
  { value: 'immobilier',                label: 'Immobilier' },
  { value: 'ressources-humaines',       label: 'Ressources Humaines' },
  { value: 'securite-gardiennage',      label: 'Sécurité & Gardiennage' },
  { value: 'transport-prive',           label: 'Transport Privé' },
]

interface ListingImage {
  id: string
  image_url: string
  position: number
}

interface ListingFormProps {
  mode: 'create' | 'edit'
  listingId?: string
  defaultValues?: {
    title: string
    description: string
    price: string
    category: string
    location: string
    status: string
  }
  initialImages?: ListingImage[]
}

export function ListingForm({ mode, listingId, defaultValues, initialImages = [] }: ListingFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState<'draft' | 'pending' | null>(null)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: defaultValues?.title ?? '',
    description: defaultValues?.description ?? '',
    price: defaultValues?.price ?? '',
    category: defaultValues?.category ?? '',
    location: defaultValues?.location ?? '',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(status: 'draft' | 'pending') {
    if (!form.title.trim()) { setError('Le titre est requis.'); return }
    if (!form.category) { setError('Veuillez sélectionner une catégorie.'); return }
    setError('')
    setSaving(status)

    try {
      const payload = { ...form, price: form.price ? parseFloat(form.price) : null, status }

      let res: Response
      if (mode === 'create') {
        res = await fetch('/api/listings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch(`/api/listings/${listingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) {
        const err = await res.json()
        setError(err.error ?? 'Une erreur est survenue.')
        return
      }

      const listing = await res.json()
      router.push(`/dashboard/listings/${listing.id}/edit`)
      router.refresh()
    } finally {
      setSaving(null)
    }
  }

  async function handleDelete() {
    if (!listingId) return
    if (!confirm('Supprimer cette annonce définitivement ?')) return
    await fetch(`/api/listings/${listingId}`, { method: 'DELETE' })
    router.push('/dashboard/listings')
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main fields */}
      <div className="lg:col-span-2 space-y-6">
        <div className="card p-6 space-y-5">
          <h2 className="font-headline font-bold text-on-surface">Informations générales</h2>

          {error && (
            <div className="text-sm text-error bg-error/10 border border-error/20 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">
              Titre <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => update('title', e.target.value)}
              placeholder="Ex: Développement web React & Next.js"
              className="input w-full"
              maxLength={120}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder="Décrivez votre offre, vos services, vos atouts…"
              rows={6}
              className="input w-full resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">
                Catégorie <span className="text-error">*</span>
              </label>
              <select
                value={form.category}
                onChange={e => update('category', e.target.value)}
                className="input w-full"
              >
                <option value="">Sélectionner…</option>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Prix (€)</label>
              <input
                type="number"
                value={form.price}
                onChange={e => update('price', e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="input w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-1.5">Localisation</label>
            <input
              type="text"
              value={form.location}
              onChange={e => update('location', e.target.value)}
              placeholder="Ex: Ixelles, Bruxelles"
              className="input w-full"
            />
          </div>
        </div>

        {/* Images — only shown in edit mode once we have the listing ID */}
        {mode === 'edit' && listingId && (
          <div className="card p-6 space-y-4">
            <h2 className="font-headline font-bold text-on-surface">Photos</h2>
            <ImageUploader listingId={listingId} initialImages={initialImages} />
          </div>
        )}
        {mode === 'create' && (
          <div className="card p-6">
            <p className="text-sm text-on-surface/50">
              💡 Sauvegardez d&apos;abord l&apos;annonce en brouillon pour pouvoir ajouter des photos.
            </p>
          </div>
        )}
      </div>

      {/* Sidebar actions */}
      <div className="space-y-4">
        <div className="card p-5 space-y-3">
          <h3 className="font-headline font-semibold text-on-surface text-sm">Publication</h3>
          <p className="text-xs text-on-surface/50 leading-relaxed">
            Sauvegardez en <strong>brouillon</strong> pour continuer plus tard, ou soumettez pour <strong>révision</strong> afin de la publier.
          </p>

          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving !== null}
            className="w-full btn-secondary text-sm py-2.5 disabled:opacity-50"
          >
            {saving === 'draft' ? 'Enregistrement…' : 'Enregistrer en brouillon'}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('pending')}
            disabled={saving !== null}
            className="w-full btn-primary text-sm py-2.5 disabled:opacity-50"
          >
            {saving === 'pending' ? 'Envoi…' : 'Soumettre pour révision'}
          </button>
        </div>

        {mode === 'edit' && listingId && (
          <div className="card p-5">
            <button
              type="button"
              onClick={handleDelete}
              className="w-full text-sm text-error hover:bg-error/5 py-2.5 rounded-xl transition-colors font-medium"
            >
              Supprimer l&apos;annonce
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
