-- ============================================
-- Supabase Storage Setup for Banners
-- ============================================

-- Create storage bucket for banners
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'banners',
  'banners',
  true,
  52428800, -- 50 MB
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

-- ============================================
-- Storage Policies
-- ============================================

-- Policy 1: Anyone can view banners (Public Read)
CREATE POLICY "Public banners are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'banners');

-- Policy 2: Authenticated users can upload banners
CREATE POLICY "Authenticated users can upload banners"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'banners' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Users can update their own banners
CREATE POLICY "Users can update own banners"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'banners' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy 4: Users can delete their own banners
CREATE POLICY "Users can delete own banners"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'banners' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- Helper Functions
-- ============================================

-- Function to get total storage usage per user
CREATE OR REPLACE FUNCTION get_user_storage_usage(user_uuid uuid)
RETURNS TABLE (
  file_count bigint,
  total_size_mb numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as file_count,
    ROUND(SUM((metadata->>'size')::bigint) / 1024.0 / 1024.0, 2) as total_size_mb
  FROM storage.objects
  WHERE bucket_id = 'banners'
    AND (storage.foldername(name))[1] = user_uuid::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to cleanup old files (optional - for scheduled cleanup)
CREATE OR REPLACE FUNCTION cleanup_old_banner_files(days_old integer DEFAULT 90)
RETURNS integer AS $$
DECLARE
  deleted_count integer;
BEGIN
  WITH deleted AS (
    DELETE FROM storage.objects
    WHERE bucket_id = 'banners'
      AND created_at < NOW() - (days_old || ' days')::interval
    RETURNING *
  )
  SELECT COUNT(*) INTO deleted_count FROM deleted;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Comments
-- ============================================

COMMENT ON POLICY "Public banners are viewable by everyone" ON storage.objects IS 
  'Allows anyone to view/download banner images';

COMMENT ON POLICY "Authenticated users can upload banners" ON storage.objects IS 
  'Only logged-in users can upload new banners';

COMMENT ON POLICY "Users can update own banners" ON storage.objects IS 
  'Users can only update banners in their own folder (user_id)';

COMMENT ON POLICY "Users can delete own banners" ON storage.objects IS 
  'Users can only delete banners in their own folder (user_id)';

COMMENT ON FUNCTION get_user_storage_usage(uuid) IS 
  'Returns the total number of files and storage usage in MB for a specific user';

COMMENT ON FUNCTION cleanup_old_banner_files(integer) IS 
  'Deletes banner files older than specified days (default 90 days)';

