'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ModerationCardProps {
  listingId: string
  currentStatus: string
}

export function ModerationCard({ listingId, currentStatus }: ModerationCardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<'approve' | 'reject' | 'delete' | null>(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [error, setError] = useState('')

  async function updateStatus(status: string, reason?: string) {
    setError('')
    try {
      const res = await fetch(`/api/admin/listings/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, rejection_reason: reason }),
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error ?? 'Erreur')
        return
      }
      router.refresh()
    } finally {
      setLoading(null)
      setShowRejectModal(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Supprimer définitivement cette annonce ?')) return
    setLoading('delete')
    const res = await fetch(`/api/admin/listings/${listingId}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/listings')
    } else {
      setLoading(null)
      setError('Erreur lors de la suppression.')
    }
  }

  return (
    <>
      <div className="card p-5 space-y-3">
        <h3 className="font-headline font-semibold text-on-surface text-sm">Modération</h3>

        {error && (
          <p className="text-xs text-error bg-error/10 rounded-lg px-3 py-2">{error}</p>
        )}

        {currentStatus !== 'approved' && (
          <button
            onClick={async () => { setLoading('approve'); await updateStatus('approved') }}
            disabled={loading !== null}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {loading === 'approve' ? 'Approbation…' : '✓ Approuver'}
          </button>
        )}

        {currentStatus !== 'rejected' && (
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={loading !== null}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 disabled:opacity-50 transition-colors"
          >
            ✕ Refuser
          </button>
        )}

        {currentStatus !== 'pending' && (
          <button
            onClick={async () => { setLoading('approve'); await updateStatus('pending') }}
            disabled={loading !== null}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-on-surface/60 hover:bg-surface-container disabled:opacity-50 transition-colors"
          >
            ↩ Remettre en attente
          </button>
        )}

        <div className="border-t border-outline-variant/20 pt-3">
          <button
            onClick={handleDelete}
            disabled={loading !== null}
            className="w-full py-2 text-sm text-error hover:bg-error/5 rounded-xl transition-colors font-medium"
          >
            {loading === 'delete' ? 'Suppression…' : 'Supprimer l\'annonce'}
          </button>
        </div>
      </div>

      {/* Rejection reason modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-headline font-bold text-on-surface mb-3">Motif de refus</h3>
            <p className="text-sm text-on-surface/60 mb-4">
              Indiquez à l&apos;utilisateur pourquoi son annonce a été refusée.
            </p>
            <textarea
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="Ex: L'annonce ne respecte pas nos conditions d'utilisation…"
              rows={4}
              className="input w-full resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-on-surface/60 border border-outline-variant/40 hover:bg-surface-container transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={async () => {
                  setLoading('reject')
                  await updateStatus('rejected', rejectionReason)
                }}
                disabled={loading !== null}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {loading === 'reject' ? 'Refus…' : 'Confirmer le refus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
