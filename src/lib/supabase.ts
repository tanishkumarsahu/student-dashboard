import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ref: https://supabase.com/docs/reference/javascript/select
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie_val = cookieStore.get(name)?.value
          return cookie_val
        },
      },
    }
  )
}
