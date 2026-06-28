-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organization table
CREATE TABLE IF NOT EXISTS organization (
  id TEXT PRIMARY KEY NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_subscription_price_id TEXT,
  stripe_subscription_status TEXT,
  stripe_subscription_current_period_end BIGINT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create unique index on stripe_customer_id
CREATE UNIQUE INDEX IF NOT EXISTS stripe_customer_id_idx ON organization (stripe_customer_id);

-- Todo table
CREATE TABLE IF NOT EXISTS todo (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE organization ENABLE ROW LEVEL SECURITY;
ALTER TABLE todo ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organization table (public access for demo)
CREATE POLICY "select_organization" ON organization FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "insert_organization" ON organization FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_organization" ON organization FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_organization" ON organization FOR DELETE
  TO anon, authenticated USING (true);

-- RLS Policies for todo table (public access for demo)
CREATE POLICY "select_todo" ON todo FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "insert_todo" ON todo FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_todo" ON todo FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_todo" ON todo FOR DELETE
  TO anon, authenticated USING (true);
