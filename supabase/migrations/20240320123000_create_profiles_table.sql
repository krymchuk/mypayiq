-- Create profiles table to store user profile information
create table public.profiles (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users (id) on delete cascade not null unique,
  full_name text,
  email text,
  phone text,
  company text,
  job_title text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.profiles is 'Stores user profile information including personal and professional details';

-- Enable RLS
alter table public.profiles enable row level security;

-- Create an index on user_id for faster lookups
create index profiles_user_id_idx on public.profiles (user_id);

-- Create trigger to automatically update the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Create RLS policies

-- Select policy for authenticated users (can only view their own profile)
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Insert policy for authenticated users (can only insert their own profile)
create policy "Users can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Update policy for authenticated users (can only update their own profile)
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Delete policy for authenticated users (can only delete their own profile)
create policy "Users can delete own profile"
  on public.profiles
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create a function to automatically create a profile after user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to call the function after user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
