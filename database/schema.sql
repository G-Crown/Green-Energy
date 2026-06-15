create extension if not exists "pgcrypto";

create type order_status as enum ('pending', 'paid', 'processing', 'scheduled', 'installed', 'cancelled');
create type booking_status as enum ('requested', 'quoted', 'scheduled', 'completed');
create type review_status as enum ('pending', 'approved', 'rejected');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  default_address text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  category text not null,
  price numeric(12, 2) not null check (price >= 0),
  compare_at_price numeric(12, 2),
  rating numeric(2, 1) not null default 0,
  review_count integer not null default 0,
  inventory integer not null default 0,
  low_stock_threshold integer not null default 5,
  image_url text not null,
  specs jsonb not null default '{}'::jsonb,
  installation_available boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  quantity_delta integer not null,
  reason text not null,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table wishlists (
  user_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  reference text not null unique,
  customer_name text not null,
  customer_email text not null,
  phone text,
  delivery_address text,
  total numeric(12, 2) not null,
  status order_status not null default 'pending',
  installation_requested boolean not null default false,
  installation_date date,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  name text not null,
  quantity integer not null check (quantity > 0),
  price numeric(12, 2) not null
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid references profiles(id),
  author text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null,
  status review_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table installation_bookings (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  customer_name text not null,
  customer_email text not null,
  address text not null,
  preferred_date date not null,
  system_size text,
  notes text,
  status booking_status not null default 'requested',
  created_at timestamptz not null default now()
);

create table payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  reference text not null,
  event_type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table products enable row level security;
alter table inventory_movements enable row level security;
alter table wishlists enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reviews enable row level security;
alter table installation_bookings enable row level security;
alter table payment_events enable row level security;

create policy "Products are public" on products for select using (true);
create policy "Approved reviews are public" on reviews for select using (status = 'approved');
create policy "Users can manage own wishlist" on wishlists for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create index products_category_idx on products(category);
create index products_featured_idx on products(featured);
create index orders_reference_idx on orders(reference);
create index orders_status_idx on orders(status);
create index reviews_product_idx on reviews(product_id);
create index bookings_status_idx on installation_bookings(status);
