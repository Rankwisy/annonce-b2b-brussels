type Status = 'draft' | 'pending' | 'approved' | 'rejected'

const config: Record<Status, { label: string; className: string }> = {
  draft:    { label: 'Brouillon',  className: 'bg-gray-100 text-gray-600 border-gray-200' },
  pending:  { label: 'En attente', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  approved: { label: 'Approuvé',   className: 'bg-green-50 text-green-700 border-green-200' },
  rejected: { label: 'Refusé',     className: 'bg-red-50 text-red-700 border-red-200' },
}

export function StatusBadge({ status }: { status: string }) {
  const s = config[status as Status] ?? config.draft
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.className}`}>
      {s.label}
    </span>
  )
}
