# LearnSpace — Student Learning Dashboard

A futuristic, dark-mode learning dashboard built with Next.js App Router, Supabase, Tailwind CSS v4, Framer Motion, and Lucide React. Displays live course data in an asymmetric bento grid with smooth entrance and hover animations.

**Live demo:** [student-dashboard-tanish.vercel.app](https://student-dashboard-tanish.vercel.app)

---

## Server vs Client Components

The data-fetching layer stays entirely on the server. `app/page.tsx` is an async Server Component — it calls Supabase directly and passes the result down as props. No `useEffect` + `fetch` anywhere near Supabase.

Client Components (`Sidebar`, `HeroTile`, `CourseCard`, `CourseGrid`, `ActivityTile`) are marked `"use client"` only because they need browser APIs: Framer Motion animations, `useState` for sidebar collapse, `IntersectionObserver` for progress bar animation. If a component doesn't need any of that, it stays a Server Component.

## Supabase SSR + Cookies

In Next.js App Router, `cookies()` from `next/headers` is async (changed in Next.js 15). The Supabase server client reads cookies to forward the session — important for row-level security even on public-read tables. The cookie `get` handler is passed into `createServerClient` from `@supabase/ssr`, which handles the plumbing internally. No auth flows here since the courses table is public, but the setup is correct for when you add auth later.

One thing that took a while: figuring out that `cookies()` now returns a Promise in Next.js 15 so you need `await cookies()` — the old `createServerComponentClient` pattern from `@supabase/auth-helpers-nextjs` doesn't apply here.

## Local Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase project URL and anon key
4. Create the `courses` table in Supabase:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamp with time zone default now()
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Layers'),
  ('System Design Fundamentals', 42, 'GitBranch'),
  ('TypeScript Deep Dive', 88, 'Code2'),
  ('Next.js App Router', 31, 'Zap');
```

5. `npm run dev` → open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 16** (App Router)
- **Supabase** (`@supabase/ssr` for SSR-safe client)
- **Tailwind CSS v4** (CSS-first config with `@theme`)
- **Framer Motion** (stagger, spring hover, progress animation)
- **Lucide React** (icons)
- **Fonts:** Syne (headings), DM Sans (body), JetBrains Mono (numbers)
