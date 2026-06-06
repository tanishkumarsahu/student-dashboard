'use client'

import { motion, type Variants } from 'framer-motion'
import { Layers, GitBranch, Code2, Zap, type LucideIcon } from 'lucide-react'
import ProgressBar from './ProgressBar'
import type { Course } from '@/lib/types'

const iconMap: Record<string, LucideIcon> = {
  Layers,
  GitBranch,
  Code2,
  Zap,
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function CourseCard({ course }: { course: Course }) {
  const Icon = iconMap[course.icon_name] ?? Layers

  return (
    <motion.article
      variants={tileVariants}
      whileHover={{
        scale: 1.015,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="card-grain relative rounded-2xl bg-bg-surface border border-[var(--border-subtle)] p-5 flex flex-col gap-3 overflow-hidden cursor-default transition-shadow hover:shadow-[0_0_0_1px_rgba(110,231,183,0.2)]"
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="p-2 rounded-xl bg-bg-elevated">
          <Icon size={16} className="text-accent-primary" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-xs text-text-muted tabular-nums">
          {course.progress}%
        </span>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="font-display text-sm font-semibold text-text-primary leading-snug">
          {course.title}
        </h3>
      </div>

      <ProgressBar value={course.progress} className="relative z-10" />
    </motion.article>
  )
}
