-- Create subscriptions table to store user subscription information
create table public.subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users (id) on delete cascade not null,
  name text not null,
  plan text not null,
  status text not null check (status in ('active', 'inactive', 'pending', 'ended')),
  price decimal(10,2) not null,
  price_interval text not null check (price_interval in ('monthly', 'yearly')),
  logo_url text,
  due_date timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.subscriptions is 'Stores user subscription services information and their payment details';

-- Enable RLS
alter table public.subscriptions enable row level security;

-- Create an index on user_id for faster lookups
create index subscriptions_user_id_idx on public.subscriptions (user_id);

-- Create trigger for updating the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row
  execute function public.handle_updated_at();

-- Create RLS policies

-- Select policy for authenticated users (can only view own subscriptions)
create policy "Users can view own subscriptions"
  on public.subscriptions
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Insert policy for authenticated users (can only insert own subscriptions)
create policy "Users can insert own subscriptions"
  on public.subscriptions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Update policy for authenticated users (can only update own subscriptions)
create policy "Users can update own subscriptions"
  on public.subscriptions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Delete policy for authenticated users (can only delete own subscriptions)
create policy "Users can delete own subscriptions"
  on public.subscriptions
  for delete
  to authenticated
  using (auth.uid() = user_id);
