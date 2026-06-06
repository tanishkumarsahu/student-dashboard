'use client'

import { motion, type Variants } from 'framer-motion'
import CourseCard from './CourseCard'
import type { Course } from '@/lib/types'

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

interface CourseGridProps {
  courses: Course[]
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (!courses || courses.length === 0) {
    return (
      <section className="md:col-span-3 flex items-center justify-center py-8">
        <p className="text-text-muted text-sm">No courses found.</p>
      </section>
    )
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-4"
    >
      <div className="col-span-2 mb-1">
        <h2 className="font-display text-xs font-semibold text-text-muted uppercase tracking-widest">
          Your Courses
        </h2>
      </div>
      {courses.length > 0 &&
        courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
    </motion.section>
  )
}
