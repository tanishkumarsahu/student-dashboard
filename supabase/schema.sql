-- courses table
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamp with time zone default now()
);

-- seed data
insert into courses (id, title, progress, icon_name, created_at) values
  ('6ecb0bb5-7ec9-45f7-9fdb-11c43ee301d4', 'Next.js App Router', 31, 'Zap', '2026-06-06 08:00:07.336025+00'),
  ('d8298962-e7c9-4066-bfcf-471c27b12935', 'Advanced React Patterns', 75, 'Layers', '2026-06-06 08:00:07.336025+00'),
  ('f42ce229-72be-43f0-ab30-cd87f8e21bba', 'TypeScript Deep Dive', 88, 'Code2', '2026-06-06 08:00:07.336025+00'),
  ('f4452697-0f1d-4f3d-bd60-ff8553182f74', 'System Design Fundamentals', 42, 'GitBranch', '2026-06-06 08:00:07.336025+00');
