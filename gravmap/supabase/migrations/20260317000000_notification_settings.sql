-- Notification Settings Migration
-- Migration: 20260317000000
-- Description: Add notification preferences to users table

-- Add notification settings column to users
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{
  "emailReminders": true,
  "smsNotifications": false,
  "weeklyDigest": true,
  "productUpdates": true,
  "reminderDays": [7, 3, 1],
  "dailyDigest": false,
  "digestTime": "09:00"
}'::jsonb;

-- Add phone number for SMS notifications
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Add index for notification settings queries
CREATE INDEX IF NOT EXISTS users_notification_settings_idx ON public.users USING GIN (notification_settings);

-- Comment
COMMENT ON COLUMN public.users.notification_settings IS 'User notification preferences stored as JSONB';

-- Add tracking for last reminder email sent (per transaction)
CREATE TABLE IF NOT EXISTS public.notification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN (
    'deadline_reminder',
    'daily_digest',
    'weekly_digest',
    'status_update',
    'custom'
  )),
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for notification logs
CREATE INDEX IF NOT EXISTS notification_logs_user_id_idx ON public.notification_logs(user_id);
CREATE INDEX IF NOT EXISTS notification_logs_transaction_id_idx ON public.notification_logs(transaction_id);
CREATE INDEX IF NOT EXISTS notification_logs_sent_at_idx ON public.notification_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS notification_logs_type_idx ON public.notification_logs(notification_type);

-- Comment
COMMENT ON TABLE public.notification_logs IS 'Log of all notification emails sent';
