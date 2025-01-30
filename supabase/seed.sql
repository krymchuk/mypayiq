-- Seed data for subscriptions table
with sample_user as (
  -- First, ensure we have a test user
  insert into auth.users (id, email)
  values ('d0d54e51-cc10-4db6-8fb6-c2733c1f9e87', 'test@example.com')
  on conflict (id) do nothing
  returning id
)
insert into public.subscriptions (
  user_id,
  name,
  plan,
  status,
  price,
  price_interval,
  logo_url,
  due_date
)
values
  (
    'ab4dd0e0-0228-4c89-8ba7-737460ac16b1',
    'Netflix Premium',
    'Premium 4K Plan',
    'active',
    19.99,
    'monthly',
    'https://picsum.photos/200',
    now() + interval '15 days'
  ),
  (
    'ab4dd0e0-0228-4c89-8ba7-737460ac16b1',
    'Spotify Family',
    'Family Plan',
    'active',
    14.99,
    'monthly',
    'https://picsum.photos/200',
    now() + interval '7 days'
  ),
  (
    'ab4dd0e0-0228-4c89-8ba7-737460ac16b1',
    'YouTube Premium',
    'Individual Plan',
    'ended',
    11.99,
    'monthly',
    'https://picsum.photos/200',
    now() - interval '5 days'
  ),
  (
    'ab4dd0e0-0228-4c89-8ba7-737460ac16b1',
    'Adobe Creative Cloud',
    'All Apps Plan',
    'pending',
    52.99,
    'monthly',
    'https://picsum.photos/200',
    now() + interval '2 days'
  ),
  (
    'ab4dd0e0-0228-4c89-8ba7-737460ac16b1',
    'Apple One',
    'Premier Plan',
    'active',
    29.99,
    'monthly',
    'https://picsum.photos/200',
    now() + interval '20 days'
  );

comment on column public.subscriptions.user_id is 'References the user who owns the subscription';
comment on column public.subscriptions.status is 'Current status of the subscription: active, inactive, pending, or ended';
comment on column public.subscriptions.price_interval is 'Billing interval: monthly or yearly';
