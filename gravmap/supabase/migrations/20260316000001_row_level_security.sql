-- GravMap Row Level Security Policies
-- Migration: 20260316000001
-- Description: RLS policies to ensure users can only access their own data

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- USERS TABLE POLICIES
-- ============================================================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Note: INSERT is handled by the handle_new_user() trigger
-- Note: DELETE is typically handled through auth.users deletion

-- ============================================================================
-- TRANSACTIONS TABLE POLICIES
-- ============================================================================

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create new transactions
CREATE POLICY "Users can create own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own transactions
CREATE POLICY "Users can update own transactions"
  ON public.transactions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own transactions
CREATE POLICY "Users can delete own transactions"
  ON public.transactions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- DOCUMENTS TABLE POLICIES
-- ============================================================================

-- Users can view documents for their own transactions
CREATE POLICY "Users can view own documents"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = documents.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can upload documents to their own transactions
CREATE POLICY "Users can create own documents"
  ON public.documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = documents.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can update their own documents
CREATE POLICY "Users can update own documents"
  ON public.documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = documents.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can delete their own documents
CREATE POLICY "Users can delete own documents"
  ON public.documents FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = documents.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- ============================================================================
-- TIMELINE EVENTS TABLE POLICIES
-- ============================================================================

-- Users can view timeline events for their own transactions
CREATE POLICY "Users can view own timeline events"
  ON public.timeline_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = timeline_events.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can create timeline events for their own transactions
CREATE POLICY "Users can create own timeline events"
  ON public.timeline_events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = timeline_events.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can update their own timeline events
CREATE POLICY "Users can update own timeline events"
  ON public.timeline_events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = timeline_events.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can delete their own timeline events
CREATE POLICY "Users can delete own timeline events"
  ON public.timeline_events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = timeline_events.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- ============================================================================
-- COMMUNICATIONS TABLE POLICIES
-- ============================================================================

-- Users can view communications for their own transactions
CREATE POLICY "Users can view own communications"
  ON public.communications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = communications.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can create communications for their own transactions
CREATE POLICY "Users can create own communications"
  ON public.communications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = communications.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can update their own communications
CREATE POLICY "Users can update own communications"
  ON public.communications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = communications.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- Users can delete their own communications
CREATE POLICY "Users can delete own communications"
  ON public.communications FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions
      WHERE transactions.id = communications.transaction_id
      AND transactions.user_id = auth.uid()
    )
  );

-- ============================================================================
-- SERVICE ROLE BYPASS (for background jobs)
-- ============================================================================

-- Allow service role to bypass RLS (for cron jobs, webhooks, etc.)
-- This is already enabled by default in Supabase for service_role

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON POLICY "Users can view own profile" ON public.users IS 
  'Users can only read their own user profile data';

COMMENT ON POLICY "Users can update own profile" ON public.users IS 
  'Users can only update their own user profile data';

COMMENT ON POLICY "Users can view own transactions" ON public.transactions IS 
  'Users can only view transactions they created';

COMMENT ON POLICY "Users can create own documents" ON public.documents IS 
  'Users can only upload documents to their own transactions';
