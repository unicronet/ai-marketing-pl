-- Create content table for AI-generated marketing content
create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  content_type text not null,
  topic text not null,
  generated_content text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table public.content enable row level security;

-- Create policies for content table
create policy "Users can view own content"
  on public.content for select
  using (auth.uid() = user_id);

create policy "Users can insert own content"
  on public.content for insert
  with check (auth.uid() = user_id);

create policy "Users can update own content"
  on public.content for update
  using (auth.uid() = user_id);

create policy "Users can delete own content"
  on public.content for delete
  using (auth.uid() = user_id);

-- Create trigger to update updated_at for content
create trigger on_content_updated
  before update on public.content
  for each row execute procedure public.handle_updated_at();

-- Create banners table for AI-generated banner images
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  prompt text not null,
  image_url text not null,
  replicate_url text,
  resolution text not null default '2K',
  aspect_ratio text not null default '16:9',
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Add comment to explain columns
comment on column public.banners.image_url is 'Primary URL (Supabase Storage if uploaded, otherwise Replicate URL)';
comment on column public.banners.replicate_url is 'Original Replicate API URL (backup)';

-- Enable Row Level Security
alter table public.banners enable row level security;

-- Create policies for banners table
create policy "Users can view own banners"
  on public.banners for select
  using (auth.uid() = user_id);

create policy "Users can insert own banners"
  on public.banners for insert
  with check (auth.uid() = user_id);

create policy "Users can update own banners"
  on public.banners for update
  using (auth.uid() = user_id);

create policy "Users can delete own banners"
  on public.banners for delete
  using (auth.uid() = user_id);

-- Create trigger to update updated_at for banners
create trigger on_banners_updated
  before update on public.banners
  for each row execute procedure public.handle_updated_at();

-- Create indexes for better query performance
create index if not exists idx_content_user_id on public.content(user_id);
create index if not exists idx_content_created_at on public.content(created_at desc);
create index if not exists idx_banners_user_id on public.banners(user_id);
create index if not exists idx_banners_created_at on public.banners(created_at desc);

