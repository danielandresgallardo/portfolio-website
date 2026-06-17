# Marketplace Setup Guide

Quick setup guide for your marketplace.

## Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase project, go to **Settings > API**
3. Copy these two keys:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable Key (Anon Key)** → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Create Database Tables

In your Supabase project, go to **SQL Editor** and run these queries:

```sql
-- Create marketplace_items table
CREATE TABLE marketplace_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price DECIMAL NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create marketplace_messages table
CREATE TABLE marketplace_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  item_id UUID REFERENCES marketplace_items(id),
  item_title TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON marketplace_items
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON marketplace_messages
  FOR INSERT WITH CHECK (true);
```

## Step 3: Set Environment Variables

1. Create `.env.local` file in your project root (copy from `.env.local.example`)
2. Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
   ```
3. Save and restart your dev server

## Step 4: Add Your Items

Go to your Supabase Dashboard and add items to the `marketplace_items` table:

```sql
INSERT INTO marketplace_items (title, price, description, images) VALUES
('Vintage Camera', 45.99, 'Beautiful vintage film camera in great condition.', '["https://images.unsplash.com/photo-1606986628025-35d57e735ae000?w=400&h=400&fit=crop"]'),
('Wooden Bookshelf', 120, 'Solid oak bookshelf with 5 shelves. Recently refinished.', '["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop"]'),
('Bicycle', 200, 'Mountain bike, 21-speed, excellent condition.', '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"]');
```

## Step 5: Test

1. Run: `npm run dev`
2. Go to `http://localhost:3000/marketplace`
3. Click items to see details
4. Send a message - it will be saved to your Supabase database

## Troubleshooting

- **Can't load items?** Check that your Supabase URL and key are correct in `.env.local`
- **Want to check messages?** Go to Supabase Dashboard > `marketplace_messages` table
- **Images not showing?** Make sure image URLs are publicly accessible
