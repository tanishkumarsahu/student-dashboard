'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: add error toast here later, for now just console.error is fine
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen items-center justify-center bg-bg-base px-4">
      <div className="text-center max-w-sm">
        <p className="font-mono text-accent-primary text-xs mb-3 uppercase tracking-widest">
          Error
        </p>
        <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
          Something went wrong
        </h2>
        <p className="text-text-muted text-sm mb-8 leading-relaxed">
          {error.message || 'An unexpected error occurred while loading your dashboard.'}
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-accent-primary/10 text-accent-primary text-sm font-medium border border-accent-primary/20 hover:bg-accent-primary/20 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
