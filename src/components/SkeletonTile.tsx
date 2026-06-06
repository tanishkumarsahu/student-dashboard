'use client'

export default function SkeletonTile({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-bg-surface border border-[var(--border-subtle)] animate-pulse h-full ${className}`}
    >
      <div className="p-5 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <div className="h-4 w-8 rounded-lg bg-bg-elevated" />
          <div className="h-3 w-10 rounded bg-bg-elevated" />
        </div>
        <div className="h-5 w-3/4 rounded bg-bg-elevated mt-1" />
        <div className="h-3 w-full rounded bg-bg-elevated" />
        <div className="h-3 w-2/3 rounded bg-bg-elevated" />
        <div className="mt-auto h-1.5 w-full rounded-full bg-bg-elevated" />
      </div>
    </div>
  )
}
