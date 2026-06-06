'use client'

import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

type ActivityDay = {
  date: string
  level: number
}

type WeekData = ActivityDay[]

// fix this later - should properly type the tooltip formatter param
function formatTooltip(day: any) {
  const labels = ['No activity', 'Light', 'Moderate', 'Active', 'Very active']
  return `${day.date}: ${labels[day.level] ?? 'Unknown'}`
}

const WEEKS = 14

function generateActivityGrid(): WeekData[] {
  const weeks: WeekData[] = []
  const today = new Date()

  for (let w = WEEKS - 1; w >= 0; w--) {
    const week: WeekData = []
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today)
      date.setDate(today.getDate() - (w * 7 + d))
      week.push({
        date: date.toISOString().split('T')[0],
        level: Math.floor(Math.random() * 5),
      })
    }
    weeks.push(week)
  }

  return weeks
}

const levelColors: Record<number, string> = {
  0: 'bg-bg-elevated',
  1: 'bg-accent-primary/20',
  2: 'bg-accent-primary/40',
  3: 'bg-accent-primary/65',
  4: 'bg-accent-primary',
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ActivityTile() {
  const [grid, setGrid] = useState<WeekData[]>([])

  useEffect(() => {
    // not sure if this is the right way to do this but it works
    Promise.resolve(generateActivityGrid()).then((data) => {
      setGrid(data)
    })
  }, [])

  const totalActiveDays = grid.flat().filter((d) => d.level > 0).length

  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="show"
      whileHover={{
        scale: 1.01,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="rounded-2xl bg-bg-surface border border-[var(--border-subtle)] p-5 flex flex-col gap-4 h-full transition-shadow hover:shadow-[0_0_0_1px_rgba(110,231,183,0.18)]"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold text-text-primary">
          Activity
        </h2>
        <span className="font-mono text-xs text-text-muted tabular-nums">
          {totalActiveDays} active days
        </span>
      </div>

      <div className="flex-1 flex items-center">
        {grid.length > 0 ? (
          <div className="flex gap-[3px] w-full">
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px] flex-1">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`w-full aspect-square rounded-[2px] transition-opacity hover:opacity-60 cursor-default ${
                      levelColors[day.level] ?? 'bg-bg-elevated'
                    }`}
                    title={formatTooltip(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-24 rounded-lg bg-bg-elevated animate-pulse" />
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-auto">
        <span className="text-[10px] text-text-muted">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className={`w-3 h-3 rounded-[2px] ${levelColors[l]}`}
          />
        ))}
        <span className="text-[10px] text-text-muted">More</span>
      </div>
    </motion.article>
  )
}
