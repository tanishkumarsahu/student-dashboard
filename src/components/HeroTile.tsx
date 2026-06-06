'use client'

import { motion, type Variants } from 'framer-motion'
import { Flame, BookOpen } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function HeroTile() {
  const greeting = getGreeting()

  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="show"
      whileHover={{
        scale: 1.01,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative flex flex-col justify-between rounded-2xl bg-bg-surface border border-[var(--border-subtle)] p-6 lg:p-8 overflow-hidden h-full min-h-[220px] transition-shadow hover:shadow-[0_0_0_1px_rgba(110,231,183,0.18)]"
    >
      {/* background blob — low opacity accent glow */}
      <div
        className="rounded-full pointer-events-none absolute w-72 h-72 -top-20 -right-20 opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(110,231,183,0.07) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        <div>
          <p className="text-text-muted text-xs font-sans mb-2 tracking-wide">
            {greeting}
          </p>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary leading-tight">
            Welcome back, Andaz Kumar
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-elevated">
            <Flame size={14} className="text-accent-primary" strokeWidth={1.5} />
            <span className="font-mono text-base font-medium text-accent-primary">
              12
            </span>
            <span className="text-text-muted text-xs">day streak</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-elevated">
            <BookOpen size={14} className="text-accent-secondary" strokeWidth={1.5} />
            <span className="font-mono text-base font-medium text-accent-secondary">
              4
            </span>
            <span className="text-text-muted text-xs">active courses</span>
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-6 text-text-muted text-xs leading-relaxed">
        You&apos;re in the top{' '}
        <span className="font-mono text-accent-primary">18%</span> of learners
        this week. Keep it up.
      </p>
    </motion.article>
  )
}
