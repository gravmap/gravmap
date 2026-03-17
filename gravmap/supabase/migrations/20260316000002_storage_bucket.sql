-- GravMap Storage Bucket Configuration
-- Migration: 20260316000002
-- Description: Create storage bucket for transaction documents

-- ============================================================================
-- STORAGE BUCKET
-- ============================================================================

-- Create storage bucket for transaction documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'transaction-documents',
  'transaction-documents',
  false, -- Not public - requires authentication
  10485760, -- 10MB limit
  ARRAY['application/pdf'] -- Only allow PDF files
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Policy: Users can upload documents to their own transactions
CREATE POLICY "Users can upload documents to their transactions"
  ON storage.objects FOR INSERT
  WITH AUTHENTICATED
  AS (
    -- Check if the user owns the transaction
    EXISTS (
      SELECT 1 
      FROM public.transactions t
      WHERE t.id::text = (storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 2)))::text
      AND t.user_id = auth.uid()
    )
    -- Ensure file is in the correct folder structure: transactions/{transaction_id}/documents/
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 1)) = 'transactions'
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 3)) = 'documents'
  );

-- Policy: Users can read documents from their own transactions
CREATE POLICY "Users can read documents from their transactions"
  ON storage.objects FOR SELECT
  WITH AUTHENTICATED
  AS (
    -- Check if the user owns the transaction
    EXISTS (
      SELECT 1 
      FROM public.transactions t
      WHERE t.id::text = (storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 2)))::text
      AND t.user_id = auth.uid()
    )
    -- Ensure file is in the correct folder structure
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 1)) = 'transactions'
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 3)) = 'documents'
  );

-- Policy: Users can delete documents from their own transactions
CREATE POLICY "Users can delete documents from their transactions"
  ON storage.objects FOR DELETE
  WITH AUTHENTICATED
  AS (
    -- Check if the user owns the transaction
    EXISTS (
      SELECT 1 
      FROM public.transactions t
      WHERE t.id::text = (storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 2)))::text
      AND t.user_id = auth.uid()
    )
    -- Ensure file is in the correct folder structure
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 1)) = 'transactions'
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 3)) = 'documents'
  );

-- Policy: Users can update documents in their own transactions
CREATE POLICY "Users can update documents in their transactions"
  ON storage.objects FOR UPDATE
  WITH AUTHENTICATED
  AS (
    -- Check if the user owns the transaction
    EXISTS (
      SELECT 1 
      FROM public.transactions t
      WHERE t.id::text = (storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 2)))::text
      AND t.user_id = auth.uid()
    )
    -- Ensure file is in the correct folder structure
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 1)) = 'transactions'
    AND storage.foldername(SPLIT_PART(storage.object_path(id, bucket_id), '/', 3)) = 'documents'
  );

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE storage.objects IS 'Storage objects with row-level security for transaction documents';
COMMENT ON POLICY "Users can upload documents to their transactions" ON storage.objects IS 
  'Allows authenticated users to upload PDF files to transactions they own';
COMMENT ON POLICY "Users can read documents from their transactions" ON storage.objects IS 
  'Allows authenticated users to read PDF files from transactions they own';
COMMENT ON POLICY "Users can delete documents from their transactions" ON storage.objects IS 
  'Allows authenticated users to delete PDF files from transactions they own';
COMMENT ON POLICY "Users can update documents in their transactions" ON storage.objects IS 
  'Allows authenticated users to update PDF files in transactions they own';
