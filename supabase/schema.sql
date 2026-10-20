create table medications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  strength text,
  unit text not null default 'units',
  created_at timestamptz not null default now()
);

create table stock_levels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  medication_id uuid not null unique references medications(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  low_threshold integer not null default 0,
  surplus_threshold integer not null default 0,
  updated_at timestamptz not null default now()
);

create table stock_movements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  medication_id uuid not null references medications(id) on delete cascade,
  change integer not null check (change <> 0),
  moved_at timestamptz not null default now()
);

create index on stock_movements (medication_id, moved_at);

alter table medications enable row level security;
alter table stock_levels enable row level security;
alter table stock_movements enable row level security;

create policy "own rows" on medications for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on stock_levels for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on stock_movements for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
