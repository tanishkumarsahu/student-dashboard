import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Sidebar from '@/components/Sidebar'
import HeroTile from '@/components/HeroTile'
import CourseGrid from '@/components/CourseGrid'
import ActivityTile from '@/components/ActivityTile'
import type { Course } from '@/lib/types'

async function getCourses(): Promise<Course[]> {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: courseDataFromDB, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  console.log('courses fetched:', courseDataFromDB)
  return courseDataFromDB ?? []
}

export default async function DashboardPage() {
  const courses = await getCourses()

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 lg:px-8 pt-16 md:pt-6">
          {/* bento grid — hero + activity span 2 rows, courses fill below */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:[grid-template-rows:220px_220px_auto]">
            <div className="md:col-span-1 lg:col-span-2 lg:row-span-2">
              <HeroTile />
            </div>
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-2">
              <ActivityTile />
            </div>
            <CourseGrid courses={courses} />
          </div>
        </div>
      </main>
    </div>
  )
}
