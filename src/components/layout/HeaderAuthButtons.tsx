'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function HeaderAuthButtons({ user }: { user: User | null }) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-all"
      >
        Se connecter
      </Link>
    )
  }

  const initials = (user.email ?? 'U').charAt(0).toUpperCase()

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-surface-container transition-all group"
      >
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
          Mon espace
        </span>
      </Link>
      <button
        onClick={handleLogout}
        className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm text-on-surface/50 hover:text-error rounded-xl hover:bg-error/5 transition-all"
      >
        Déconnexion
      </button>
    </div>
  )
}
