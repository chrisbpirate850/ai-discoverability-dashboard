-- AI Discoverability Dashboard - Supabase Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sites table
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  ecosystem TEXT NOT NULL CHECK (ecosystem IN ('hub', 'art-of-citizenship', 'there-is-still-time')),
  priority TEXT NOT NULL CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
  current_status TEXT NOT NULL CHECK (current_status IN ('live', 'building', 'deploying', 'error', 'not-built')),
  last_check TIMESTAMP WITH TIME ZONE,
  framework TEXT,
  ai_readable BOOLEAN DEFAULT FALSE,
  next_action TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Checks table (for monitoring history)
CREATE TABLE IF NOT EXISTS checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('live', 'building', 'deploying', 'error', 'not-built')),
  content_found BOOLEAN NOT NULL,
  response_time INTEGER NOT NULL, -- in milliseconds
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Builds table (for Netlify webhook tracking)
CREATE TABLE IF NOT EXISTS builds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'building')),
  build_time INTEGER, -- in seconds
  deploy_time INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_checks_site_id ON checks(site_id);
CREATE INDEX IF NOT EXISTS idx_checks_timestamp ON checks(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_builds_site_id ON builds(site_id);
CREATE INDEX IF NOT EXISTS idx_builds_timestamp ON builds(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sites_url ON sites(url);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_sites_updated_at
  BEFORE UPDATE ON sites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial site data
INSERT INTO sites (name, url, ecosystem, priority, current_status, framework, ai_readable, next_action)
VALUES
  ('Christopher J Bradley', 'https://christopherjbradley.com', 'hub', 'HIGH', 'deploying', 'Astro', false, 'Fix DNS typo, verify'),
  ('The Art of Citizenship', 'https://theartofcitizenship.com', 'art-of-citizenship', 'MEDIUM', 'not-built', null, false, 'Decide: rebuild or redirect?'),
  ('Liberty''s Principles Pals', 'https://libertysprinciplespals.com', 'art-of-citizenship', 'HIGH', 'building', 'Next.js', false, 'Complete Next.js migration'),
  ('The Citizens Compass', 'https://thecitizenscompass.com', 'art-of-citizenship', 'LOW', 'live', 'Next.js', true, 'Optimize SEO'),
  ('Family Unity Hub', 'https://familyunityhub.com', 'art-of-citizenship', 'MEDIUM', 'not-built', null, false, 'Rebuild after LPP'),
  ('There Is Still Time', 'https://thereisstilltime.com', 'there-is-still-time', 'MEDIUM', 'not-built', null, false, 'Marketing site rebuild'),
  ('There Is Still Time App', 'https://app.thereisstilltime.com', 'there-is-still-time', 'LOW', 'live', 'React (CSR)', false, 'App - CSR is fine'),
  ('Love Everyone', 'https://loveeveryone.love', 'there-is-still-time', 'MEDIUM', 'not-built', null, false, 'Peace message site'),
  ('Sunsets for the Soul', 'https://sunsetsforthesoul.com', 'there-is-still-time', 'LOW', 'not-built', null, false, 'Photo gallery site')
ON CONFLICT (url) DO NOTHING;

-- Grant necessary permissions (adjust if using RLS - Row Level Security)
-- For development, you might want to allow public access
-- In production, configure RLS policies based on your security needs
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE builds ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust for your security needs)
CREATE POLICY "Allow public read access to sites"
  ON sites FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to checks"
  ON checks FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to builds"
  ON builds FOR SELECT
  USING (true);

-- Allow inserts from service role or authenticated users
CREATE POLICY "Allow service role to insert checks"
  ON checks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role to insert builds"
  ON builds FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role to update sites"
  ON sites FOR UPDATE
  USING (true);

-- Comments for documentation
COMMENT ON TABLE sites IS 'Stores information about all monitored websites';
COMMENT ON TABLE checks IS 'Records each site availability check with response time and status';
COMMENT ON TABLE builds IS 'Tracks build and deployment events from Netlify webhooks';
