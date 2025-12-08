Supabase setup for Ajagbe Books
================================

Follow these steps to create a Supabase project and the tables/storage needed by the admin dashboard.

1) Create a Supabase project
  - Go to https://supabase.com and sign in / create an account.
  - Create a new project. Choose a name and a strong password for the DB.

2) Get your keys
  - In the project settings > API, copy the "Project URL" and the "anon public" key.
  - Add these to your local .env file at the project root (Vite expects VITE_ prefixed env vars):

    VITE_SUPABASE_URL=https://your-project-ref.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI... (anon public key)

  - Also set an admin password that protects the private admin UI (not secret storage):

    VITE_ADMIN_PASSWORD=choose-a-strong-password

  - Never commit your .env file to source control. Add it to .gitignore.

3) Create a storage bucket for book images
  - In Supabase Studio, go to "Storage" and create a bucket named: book-images
  - Make it public if you want direct public URLs (the admin UI uses getPublicUrl). Alternatively keep it private and generate signed URLs.

4) Create the `books` table
  - In Supabase Studio SQL editor, run the following SQL to create the table used by the admin UI:

```sql
create table public.books (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  description text,
  price text,
  image_url text,
  created_at timestamp with time zone default timezone('utc', now())
);
```

7) Create the `orders` table
- Run this SQL in Supabase Studio to create a simple orders table used to notify the admin when users place orders:

```sql
create table public.orders (
  id bigserial primary key,
  items jsonb,
  total text,
  name text,
  email text,
  location text,
  phone text,
  delivery_type text,
  transport_fee numeric default 0,
  status text default 'pending',
  unread boolean default true,
  created_at timestamp with time zone default timezone('utc', now()),
  deliver_by timestamp with time zone
);
```

Notes:
- `items` stores the cart contents as JSON so the admin can inspect what was ordered.
- `total` kept as text to match existing UI conventions (e.g. "$6.00").
- `deliver_by` is set by the frontend to now + 48 hours for estimated delivery.

8) Add payment columns to `orders`
- Run this SQL to add payment tracking fields to the `orders` table:

```sql
alter table public.orders
  add column payment_reference text,
  add column paid boolean default false,
  add column paid_at timestamp with time zone,
  add column payment_channel text;
```

These fields let your server mark orders as paid after verifying with Paystack.


Notes on columns
  - `price` is text to keep the current code working with strings like "$4". If you prefer numeric pricing, change it to numeric and update the frontend.
  - `image_url` will store the Supabase public URL from the storage bucket.

5) Storage policy and security
  - If you make the bucket public, anyone can access images by URL. That is OK for public book covers.
  - If you make it private, update the admin code to generate signed URLs instead of getPublicUrl (supabase.storage.from(...).createSignedUrl).

6) CORS / client usage
  - The frontend uses the anon public key. That's fine for browser-only usage if you rely on RLS (Row Level Security) or public tables. For admin writes, keep the dashboard behind an authenticated admin or a serverless function if you want stronger security.

7) Testing the connection
  - After adding `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env`, restart your dev server.
  - Visit `/admin/login` and enter the `VITE_ADMIN_PASSWORD` you set. The dashboard should be able to list rows from `books` and upload images to the `book-images` bucket.

If you'd like, I can also:
  - Add server-side functions (Netlify/Vercel) to keep a stronger secret for uploads.
  - Add user authentication via Supabase Auth for a proper admin user instead of the simple env-password flow.
