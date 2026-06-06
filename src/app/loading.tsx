import SkeletonTile from '@/components/SkeletonTile'

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      {/* sidebar placeholder */}
      <div className="hidden md:block w-56 lg:w-60 shrink-0 bg-bg-surface border-r border-[var(--border-subtle)]" />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:[grid-template-rows:220px_220px_auto]">
            <div className="md:col-span-1 lg:col-span-2 lg:row-span-2">
              <SkeletonTile className="h-full min-h-[220px]" />
            </div>
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-2">
              <SkeletonTile className="h-full min-h-[220px]" />
            </div>
            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-4">
              <SkeletonTile className="h-32" />
              <SkeletonTile className="h-32" />
              <SkeletonTile className="h-32" />
              <SkeletonTile className="h-32" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
