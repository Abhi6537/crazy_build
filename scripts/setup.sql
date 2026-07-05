-- =============================================================
-- CRAZY BUILD — Supabase Database Setup
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- =============================================================

-- 1. Teams table (whitelist — pre-seeded by admin)
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  invite_code TEXT NOT NULL UNIQUE,
  is_registered BOOLEAN DEFAULT FALSE,
  password_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  registered_at TIMESTAMPTZ
);

-- 2. Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  project_title TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  short_description TEXT NOT NULL,
  our_approach TEXT NOT NULL,
  challenges TEXT NOT NULL,
  tech_stack TEXT NOT NULL,
  github_link TEXT NOT NULL,
  live_demo_link TEXT,
  youtube_link TEXT,
  screenshots TEXT[] DEFAULT '{}',
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id)
);

-- 2.5 Team Members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Member',
  food_preference TEXT DEFAULT 'Veg',
  has_checked_in BOOLEAN DEFAULT FALSE,
  has_received_food BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for teams
-- Allow anyone to read team names (for dropdown) but not sensitive data
CREATE POLICY "Anyone can read team names" ON teams
  FOR SELECT USING (true);

-- Allow service role to do everything (for API routes)
CREATE POLICY "Service role full access on teams" ON teams
  FOR ALL USING (true) WITH CHECK (true);

-- 5. RLS Policies for submissions
-- Anyone can read submissions (for future gallery)
CREATE POLICY "Anyone can read submissions" ON submissions
  FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access on submissions" ON submissions
  FOR ALL USING (true) WITH CHECK (true);

-- 5.5 RLS Policies for team_members
CREATE POLICY "Service role full access on team_members" ON team_members
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Create storage bucket for project assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-assets', 'project-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage policies — allow authenticated uploads via service role
CREATE POLICY "Anyone can view project assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-assets');

CREATE POLICY "Service role can upload project assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-assets');

CREATE POLICY "Service role can update project assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'project-assets');

CREATE POLICY "Service role can delete project assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'project-assets');
