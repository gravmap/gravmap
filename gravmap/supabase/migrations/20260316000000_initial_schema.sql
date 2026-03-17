-- GravMap Initial Database Schema
-- Migration: 20260316000000
-- Description: Core tables for transaction management platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS TABLE
-- ============================================================================
-- Note: Supabase creates its own auth.users table. We create a public.users
-- table that mirrors/extends auth.users for application data.

CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'professional', 'team')),
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups by email
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
CREATE INDEX IF NOT EXISTS users_stripe_customer_id_idx ON public.users(stripe_customer_id);

-- ============================================================================
-- TRANSACTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  property_address TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'pending', 'completed', 'cancelled')),
  closing_date DATE,
  purchase_price DECIMAL(12, 2),
  buyer_name TEXT,
  seller_name TEXT,
  property_type TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS transactions_user_id_idx ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS transactions_status_idx ON public.transactions(status);
CREATE INDEX IF NOT EXISTS transactions_closing_date_idx ON public.transactions(closing_date);
CREATE INDEX IF NOT EXISTS transactions_created_at_idx ON public.transactions(created_at DESC);

-- ============================================================================
-- DOCUMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  document_type TEXT CHECK (document_type IN (
    'contract', 
    'inspection', 
    'appraisal', 
    'disclosure', 
    'title', 
    'insurance', 
    'other'
  )),
  extracted_data JSONB, -- Store AI-extracted data from contracts
  extraction_status TEXT DEFAULT 'pending' CHECK (extraction_status IN ('pending', 'processing', 'completed', 'failed')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS documents_transaction_id_idx ON public.documents(transaction_id);
CREATE INDEX IF NOT EXISTS documents_document_type_idx ON public.documents(document_type);
CREATE INDEX IF NOT EXISTS documents_uploaded_at_idx ON public.documents(uploaded_at DESC);

-- ============================================================================
-- TIMELINE EVENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_type TEXT CHECK (event_type IN (
    'closing',
    'inspection',
    'appraisal',
    'financing',
    'title_search',
    'insurance',
    'contingency',
    'other'
  )),
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'overdue', 'cancelled')),
  description TEXT,
  reminder_sent BOOLEAN DEFAULT FALSE,
  reminder_dates JSONB DEFAULT '[]'::jsonb, -- Array of dates when reminders were sent
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS timeline_events_transaction_id_idx ON public.timeline_events(transaction_id);
CREATE INDEX IF NOT EXISTS timeline_events_event_date_idx ON public.timeline_events(event_date);
CREATE INDEX IF NOT EXISTS timeline_events_status_idx ON public.timeline_events(status);

-- ============================================================================
-- COMMUNICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  email_type TEXT CHECK (email_type IN (
    'status_update',
    'deadline_reminder',
    'document_request',
    'custom'
  )),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS communications_transaction_id_idx ON public.communications(transaction_id);
CREATE INDEX IF NOT EXISTS communications_sent_at_idx ON public.communications(sent_at DESC);
CREATE INDEX IF NOT EXISTS communications_status_idx ON public.communications(status);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON public.timeline_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create a user record when auth user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create public.users record on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.users IS 'Application users - mirrors/extends auth.users';
COMMENT ON TABLE public.transactions IS 'Real estate transactions being tracked';
COMMENT ON TABLE public.documents IS 'Documents associated with transactions';
COMMENT ON TABLE public.timeline_events IS 'Key dates and milestones for transactions';
COMMENT ON TABLE public.communications IS 'Email communications sent to clients';
