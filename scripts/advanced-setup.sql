-- 1. Create app_settings table
CREATE TABLE IF NOT EXISTS app_settings (
  id INT PRIMARY KEY DEFAULT 1,
  submission_status TEXT DEFAULT 'PRE_HACKATHON',
  admin_message TEXT DEFAULT ''
);

-- 2. Enable RLS on app_settings
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for app_settings
CREATE POLICY "Anyone can read app_settings" ON app_settings
  FOR SELECT USING (true);

CREATE POLICY "Service role full access on app_settings" ON app_settings
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Insert default row
INSERT INTO app_settings (id, submission_status, admin_message)
VALUES (1, 'PRE_HACKATHON', '')
ON CONFLICT (id) DO NOTHING;

-- 5. Alter submissions table to add draft and late flags
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT true;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS is_late BOOLEAN DEFAULT false;
