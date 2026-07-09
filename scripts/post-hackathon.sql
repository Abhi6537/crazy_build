-- 1. Add winner columns to submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS is_winner BOOLEAN DEFAULT false;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS winner_position TEXT DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS winner_message TEXT DEFAULT '';

-- 2. Create event_photos table for memories
CREATE TABLE IF NOT EXISTS event_photos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Setup RLS for event_photos
ALTER TABLE event_photos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to event_photos
CREATE POLICY "Allow public read access on event_photos" ON event_photos
FOR SELECT USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access on event_photos" ON event_photos
FOR ALL USING (true) WITH CHECK (true);
