# Analytics Implementation Guide

**Purpose:** Comprehensive event tracking to understand user behavior, measure feature adoption, and optimize conversion funnels.

---

## Analytics Stack

### Recommended Tools
- **Primary:** Mixpanel or PostHog (self-hosted option)
- **Secondary:** Google Analytics 4 (for marketing attribution)
- **Database:** Direct queries to Supabase for custom analysis

### Implementation Approach
- Event tracking via analytics SDK
- Server-side events for billing and key actions
- User identification across sessions
- Property enrichment for segmentation

---

## Event Taxonomy

### Event Naming Convention
```
[entity]_[action] (snake_case)

Examples:
- transaction_created
- document_uploaded
- deadline_completed
- subscription_started
```

### Event Categories

1. **Authentication** - User signup, login, logout
2. **Transactions** - CRUD operations
3. **Documents** - Upload, extraction, download
4. **Deadlines** - View, edit, complete, miss
5. **Notifications** - Email, SMS, in-app
6. **Billing** - Subscription, payment, cancellation
7. **Settings** - Preferences, integrations
8. **Navigation** - Page views, feature discovery
9. **Search** - Queries, filters, results
10. **Collaboration** - Sharing, comments, assignments

---

## Event Definitions (50+ Events)

### Authentication Events

```typescript
// User signed up
{
  event: 'user_signed_up',
  properties: {
    method: 'email' | 'google' | 'apple',
    plan: 'free' | 'pro',
    referral_source: string | null,
    utm_source: string | null,
    utm_medium: string | null,
    utm_campaign: string | null
  }
}

// User logged in
{
  event: 'user_logged_in',
  properties: {
    method: 'email' | 'google' | 'apple',
    days_since_last_login: number
  }
}

// User logged out
{
  event: 'user_logged_out',
  properties: {
    session_duration_minutes: number
  }
}

// Password reset requested
{
  event: 'password_reset_requested',
  properties: {}
}

// Password reset completed
{
  event: 'password_reset_completed',
  properties: {}
}

// Email verification sent
{
  event: 'email_verification_sent',
  properties: {}
}

// Email verified
{
  event: 'email_verified',
  properties: {
    hours_since_signup: number
  }
}
```

### Transaction Events

```typescript
// Transaction created
{
  event: 'transaction_created',
  properties: {
    transaction_id: string,
    transaction_type: 'buy' | 'sell' | 'lease',
    property_type: string | null,
    estimated_value: number | null,
    has_closing_date: boolean,
    deadlines_auto_created: number,
    source: 'manual' | 'ai_extraction' | 'template'
  }
}

// Transaction viewed
{
  event: 'transaction_viewed',
  properties: {
    transaction_id: string,
    days_until_close: number | null,
    total_deadlines: number,
    completed_deadlines: number
  }
}

// Transaction edited
{
  event: 'transaction_edited',
  properties: {
    transaction_id: string,
    fields_changed: string[] // ['closing_date', 'property_address', etc]
  }
}

// Transaction deleted
{
  event: 'transaction_deleted',
  properties: {
    transaction_id: string,
    transaction_age_days: number,
    was_completed: boolean
  }
}

// Transaction completed (closed)
{
  event: 'transaction_completed',
  properties: {
    transaction_id: string,
    days_to_close: number,
    on_time: boolean,
    total_deadlines: number,
    missed_deadlines: number
  }
}

// Transaction shared
{
  event: 'transaction_shared',
  properties: {
    transaction_id: string,
    shared_with_type: 'team' | 'user',
    access_level: 'view' | 'edit' | 'manage'
  }
}

// Transaction archived
{
  event: 'transaction_archived',
  properties: {
    transaction_id: string,
    reason: 'completed' | 'cancelled' | 'other'
  }
}
```

### Document Events

```typescript
// Document uploaded
{
  event: 'document_uploaded',
  properties: {
    transaction_id: string,
    document_type: 'contract' | 'addendum' | 'inspection' | 'other',
    file_size_kb: number,
    page_count: number | null,
    file_extension: string
  }
}

// Document deleted
{
  event: 'document_deleted',
  properties: {
    transaction_id: string,
    document_id: string,
    document_type: string,
    age_days: number
  }
}

// Document downloaded
{
  event: 'document_downloaded',
  properties: {
    transaction_id: string,
    document_id: string,
    document_type: string
  }
}

// AI extraction started
{
  event: 'ai_extraction_started',
  properties: {
    transaction_id: string,
    document_id: string,
    document_type: string
  }
}

// AI extraction completed
{
  event: 'ai_extraction_completed',
  properties: {
    transaction_id: string,
    document_id: string,
    processing_time_seconds: number,
    dates_extracted: number,
    parties_extracted: number,
    confidence_score: number,
    success: boolean
  }
}

// AI extraction approved by user
{
  event: 'ai_extraction_approved',
  properties: {
    transaction_id: string,
    document_id: string,
    dates_modified: number,
    edits_made: boolean
  }
}

// AI extraction rejected
{
  event: 'ai_extraction_rejected',
  properties: {
    transaction_id: string,
    document_id: string,
    reason: string | null
  }
}
```

### Deadline Events

```typescript
// Deadline created
{
  event: 'deadline_created',
  properties: {
    deadline_id: string,
    transaction_id: string,
    deadline_type: string,
    days_from_now: number,
    source: 'manual' | 'ai' | 'template'
  }
}

// Deadline viewed
{
  event: 'deadline_viewed',
  properties: {
    deadline_id: string,
    transaction_id: string,
    days_until_due: number,
    is_overdue: boolean
  }
}

// Deadline edited
{
  event: 'deadline_edited',
  properties: {
    deadline_id: string,
    transaction_id: string,
    fields_changed: string[],
    due_date_changed: boolean,
    days_change: number // positive = extended, negative = moved up
  }
}

// Deadline completed
{
  event: 'deadline_completed',
  properties: {
    deadline_id: string,
    transaction_id: string,
    deadline_type: string,
    days_early: number, // negative = late
    was_reminded: boolean
  }
}

// Deadline missed
{
  event: 'deadline_missed',
  properties: {
    deadline_id: string,
    transaction_id: string,
    deadline_type: string,
    days_late: number,
    was_reminded: boolean
  }
}

// Deadline deleted
{
  event: 'deadline_deleted',
  properties: {
    deadline_id: string,
    transaction_id: string,
    deadline_type: string,
    days_until_due: number
  }
}

// Deadline assigned
{
  event: 'deadline_assigned',
  properties: {
    deadline_id: string,
    transaction_id: string,
    assignee_id: string
  }
}

// Deadline reminder dismissed
{
  event: 'deadline_reminder_dismissed',
  properties: {
    deadline_id: string,
    reminder_type: 'email' | 'in_app' | 'sms',
    days_before_due: number
  }
}
```

### Notification Events

```typescript
// Email sent
{
  event: 'email_sent',
  properties: {
    email_type: 'reminder' | 'digest' | 'welcome' | 'verification' | 'notification',
    deadline_id: string | null,
    transaction_id: string | null,
    days_before_due: number | null
  }
}

// Email opened
{
  event: 'email_opened',
  properties: {
    email_type: string,
    email_id: string
  }
}

// Email link clicked
{
  event: 'email_link_clicked',
  properties: {
    email_type: string,
    email_id: string,
    link_type: 'transaction' | 'deadline' | 'settings' | 'upgrade'
  }
}

// SMS sent
{
  event: 'sms_sent',
  properties: {
    sms_type: 'reminder' | 'verification' | 'alert',
    deadline_id: string | null
  }
}

// Notification preference changed
{
  event: 'notification_preference_changed',
  properties: {
    channel: 'email' | 'sms' | 'push',
    notification_type: string,
    enabled: boolean
  }
}

// Daily digest generated
{
  event: 'daily_digest_generated',
  properties: {
    user_id: string,
    deadlines_included: number,
    urgent_count: number
  }
}
```

### Billing Events

```typescript
// Pricing page viewed
{
  event: 'pricing_page_viewed',
  properties: {
    current_plan: 'free' | 'pro',
    referral_code: string | null
  }
}

// Upgrade initiated
{
  event: 'upgrade_initiated',
  properties: {
    from_plan: 'free',
    to_plan: 'pro' | 'team',
    billing_period: 'monthly' | 'annual'
  }
}

// Checkout started
{
  event: 'checkout_started',
  properties: {
    plan: 'pro' | 'team',
    billing_period: 'monthly' | 'annual',
    price: number
  }
}

// Subscription created
{
  event: 'subscription_created',
  properties: {
    plan: 'pro' | 'team',
    billing_period: 'monthly' | 'annual',
    price: number,
    trial_days: number,
    payment_method: 'card' | 'other'
  }
}

// Subscription cancelled
{
  event: 'subscription_cancelled',
  properties: {
    plan: string,
    cancellation_reason: string | null,
    months_subscribed: number,
    total_paid: number
  }
}

// Subscription renewed
{
  event: 'subscription_renewed',
  properties: {
    plan: string,
    billing_period: string,
    months_total: number
  }
}

// Payment failed
{
  event: 'payment_failed',
  properties: {
    plan: string,
    amount: number,
    error_type: string
  }
}

// Payment method updated
{
  event: 'payment_method_updated',
  properties: {}
}

// Plan changed
{
  event: 'plan_changed',
  properties: {
    from_plan: string,
    to_plan: string,
    price_change: number
  }
}
```

### Settings Events

```typescript
// Settings page viewed
{
  event: 'settings_page_viewed',
  properties: {
    tab: 'profile' | 'notifications' | 'billing' | 'integrations' | 'security'
  }
}

// Profile updated
{
  event: 'profile_updated',
  properties: {
    fields_changed: string[]
  }
}

// Integration connected
{
  event: 'integration_connected',
  properties: {
    integration_type: 'google_calendar' | 'follow_up_boss' | 'other',
    success: boolean
  }
}

// Integration disconnected
{
  event: 'integration_disconnected',
  properties: {
    integration_type: string,
    days_connected: number
  }
}

// Integration sync triggered
{
  event: 'integration_sync_triggered',
  properties: {
    integration_type: string,
    sync_type: 'manual' | 'automatic'
  }
}

// Phone number verified
{
  event: 'phone_number_verified',
  properties: {
    attempts: number
  }
}
```

### Navigation Events

```typescript
// Page viewed
{
  event: 'page_viewed',
  properties: {
    page_name: string,
    page_path: string,
    referrer: string | null,
    is_new_visitor: boolean
  }
}

// Dashboard viewed
{
  event: 'dashboard_viewed',
  properties: {
    active_transactions: number,
    upcoming_deadlines: number,
    days_range: number // default 7
  }
}

// Help center viewed
{
  event: 'help_center_viewed',
  properties: {
    search_query: string | null,
    article_viewed: string | null
  }
}

// Feature discovered
{
  event: 'feature_discovered',
  properties: {
    feature_name: string,
    discovery_method: 'onboarding' | 'tooltip' | 'help' | 'organic'
  }
}

// Search performed
{
  event: 'search_performed',
  properties: {
    search_type: 'transactions' | 'deadlines' | 'global',
    query_length: number,
    results_count: number
  }
}

// Filter applied
{
  event: 'filter_applied',
  properties: {
    page: string,
    filter_type: string,
    filter_value: string
  }
}

// Export triggered
{
  event: 'export_triggered',
  properties: {
    export_type: 'transactions' | 'deadlines' | 'report',
    format: 'csv' | 'pdf'
  }
}
```

### Collaboration Events

```typescript
// Team created
{
  event: 'team_created',
  properties: {
    team_id: string,
    team_name: string,
    initial_members: number
  }
}

// Team member invited
{
  event: 'team_member_invited',
  properties: {
    team_id: string,
    role: string
  }
}

// Team member joined
{
  event: 'team_member_joined',
  properties: {
    team_id: string,
    role: string,
    invite_accepted_hours: number
  }
}

// Comment created
{
  event: 'comment_created',
  properties: {
    transaction_id: string,
    deadline_id: string | null,
    has_mention: boolean,
    mention_count: number
  }
}

// Comment replied
{
  event: 'comment_replied',
  properties: {
    transaction_id: string,
    parent_comment_id: string
  }
}

// Assignment accepted
{
  event: 'assignment_accepted',
  properties: {
    deadline_id: string,
    transaction_id: string
  }
}
```

---

## User Properties

Track these properties for segmentation:

```typescript
{
  // Identity
  user_id: string,
  email: string,
  name: string,
  
  // Subscription
  plan: 'free' | 'pro' | 'team',
  billing_period: 'monthly' | 'annual' | 'none',
  subscription_start_date: date,
  monthly_value: number,
  
  // Usage
  total_transactions: number,
  active_transactions: number,
  total_deadlines: number,
  completed_deadlines: number,
  missed_deadlines: number,
  documents_uploaded: number,
  
  // Engagement
  days_since_signup: number,
  days_since_last_login: number,
  session_count: number,
  last_active_date: date,
  
  // Features
  has_connected_calendar: boolean,
  has_verified_phone: boolean,
  has_connected_crm: boolean,
  has_team: boolean,
  
  // Attribution
  signup_source: string,
  utm_source: string | null,
  utm_medium: string | null,
  utm_campaign: string | null,
  referral_user_id: string | null,
  
  // Profile
  company: string | null,
  role: 'agent' | 'broker' | 'tc' | 'other',
  state: string | null,
  timezone: string
}
```

---

## Conversion Funnels

### Funnel 1: Signup to First Transaction

```
View Landing Page → Sign Up → Email Verified → Create Transaction → Upload Document

Step 1: Landing page view
Step 2: Sign up (conversion rate: target 5%)
Step 3: Email verified (conversion rate: target 80%)
Step 4: First transaction created (conversion rate: target 60%)
Step 5: First document uploaded (conversion rate: target 70%)

Overall funnel conversion: target 1.7%
```

### Funnel 2: Trial to Paid

```
Trial Started → Use Product (7 days) → View Pricing → Start Checkout → Complete Payment

Step 1: Trial start
Step 2: Active usage (>3 logins in first 7 days)
Step 3: View pricing page
Step 4: Initiate checkout
Step 5: Complete payment

Target conversion: 10-15%
```

### Funnel 3: Feature Adoption

```
Feature Available → Feature Discovered → Feature Used → Feature Retained

Example: AI Extraction
Step 1: Transaction created (feature available)
Step 2: Upload button clicked (discovered)
Step 3: Document uploaded (used)
Step 4: Extraction approved (engaged)
Step 5: Used again within 30 days (retained)
```

---

## Analytics Dashboard Specifications

### Executive Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                     GRAVMAP ANALYTICS                           │
├─────────────────────────────────────────────────────────────────┤
│  Key Metrics (Today)                    │  vs Last Week         │
│  ─────────────────────────             │  ─────────────        │
│  Signups: 23                            │  ↑ 15%                │
│  Active Users: 156                      │  ↑ 8%                 │
│  MRR: $4,523                            │  ↑ 12%                │
│  NPS: 42                                │  ↑ 5 points           │
├─────────────────────────────────────────────────────────────────┤
│  Funnel: Signup → First Transaction                             │
│  ─────────────────────────────────────────────────────────────  │
│  Landing Page: 1,234 ████████████████████ 100%                 │
│  Signups:        62   ██░░░░░░░░░░░░░░░░░░   5%                │
│  Verified:       50   █░░░░░░░░░░░░░░░░░░░   81%               │
│  1st Trans:      35   ░░░░░░░░░░░░░░░░░░░░   70%               │
│  1st Doc:        28   ░░░░░░░░░░░░░░░░░░░░   80%               │
│  ─────────────────────────────────────────────────────────────  │
│  Overall: 2.3% (target: 1.7%) ✅                                │
├─────────────────────────────────────────────────────────────────┤
│  Feature Usage (Last 7 Days)                                    │
│  ─────────────────────────────────────────────────────────────  │
│  Transaction Created:    89  ████████████                      │
│  Document Uploaded:      67  █████████                         │
│  AI Extraction:          54  ███████                           │
│  Deadline Completed:    123  ████████████████                  │
│  Email Reminder Sent:   234  █████████████████████████████     │
├─────────────────────────────────────────────────────────────────┤
│  Cohort Retention                                               │
│  ─────────────────────────────────────────────────────────────  │
│         Week 1  Week 2  Week 3  Week 4                         │
│  Jan   100%    65%     52%     48%                             │
│  Feb   100%    70%     58%       -                             │
│  Mar   100%    72%       -       -                             │
└─────────────────────────────────────────────────────────────────┘
```

### Product Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  Product Engagement                                             │
├─────────────────────────────────────────────────────────────────┤
│  DAU: 89 | WAU: 156 | MAU: 234                                  │
│  Sticky Factor: 57% (DAU/MAU)                                   │
├─────────────────────────────────────────────────────────────────┤
│  Feature Adoption                                               │
│  ─────────────────────────────────────────────────────────────  │
│  Feature         % Users    Actions/Week   Retention           │
│  Transactions    100%       3.2            85%                  │
│  Documents       72%        2.1            78%                  │
│  AI Extraction   54%        1.8            82%                  │
│  Calendar Sync   23%        -              91%                  │
│  Team Features   12%        -              95%                  │
├─────────────────────────────────────────────────────────────────┤
│  Top User Flows                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  1. Dashboard → Transaction → Upload → Extract (34%)            │
│  2. Dashboard → Transaction → View (28%)                        │
│  3. Dashboard → Settings → Integrations (12%)                   │
│  4. Email Link → Transaction → Complete (11%)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Code

### Client-Side Setup

```typescript
// lib/analytics/client.ts
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageviews: true,
    persistence: 'localStorage'
  });
}

export const analytics = {
  identify: (userId: string, properties?: Record<string, any>) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.identify(userId);
      if (properties) {
        mixpanel.people.set(properties);
      }
    }
  },

  track: (eventName: string, properties?: Record<string, any>) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track(eventName, properties);
    }
  },

  page: (pageName: string, properties?: Record<string, any>) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('page_viewed', { page_name: pageName, ...properties });
    }
  },

  reset: () => {
    if (MIXPANEL_TOKEN) {
      mixpanel.reset();
    }
  }
};
```

### Server-Side Tracking

```typescript
// lib/analytics/server.ts
export async function trackServerEvent(
  eventName: string,
  userId: string,
  properties: Record<string, any>
) {
  if (process.env.MIXPANEL_TOKEN) {
    await fetch('https://api.mixpanel.com/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(process.env.MIXPANEL_TOKEN + ':')}`
      },
      body: JSON.stringify({
        event: eventName,
        properties: {
          distinct_id: userId,
          ...properties,
          token: process.env.MIXPANEL_TOKEN,
          time: Math.floor(Date.now() / 1000)
        }
      })
    });
  }
}
```

### Usage Examples

```typescript
// In component or server action
import { analytics } from '@/lib/analytics/client';

// Track event
analytics.track('transaction_created', {
  transaction_id: transaction.id,
  transaction_type: transaction.type,
  source: 'manual'
});

// Identify user
analytics.identify(user.id, {
  email: user.email,
  name: user.name,
  plan: user.plan
});

// Track page view
analytics.page('Dashboard', {
  active_transactions: transactions.length
});
```

---

## Privacy & Compliance

### Data Collection Principles
1. Only collect data that provides user value
2. Clear privacy policy explaining what's tracked
3. Allow users to opt-out of tracking
4. Don't track sensitive personal information
5. Comply with GDPR, CCPA requirements

### Implementation

```typescript
// Check consent before tracking
const canTrack = () => {
  if (typeof window === 'undefined') return false;
  const consent = localStorage.getItem('analytics_consent');
  return consent === 'true';
};

// Respect DNT header
if (navigator.doNotTrack === '1') {
  // Disable tracking
}
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Events tracked per user/day | 20+ | Mixpanel dashboard |
| Event accuracy | > 99% | QA testing |
| User property completeness | > 90% | Property reports |
| Dashboard availability | 99.9% | Uptime monitoring |
| Query response time | < 3s | Performance monitoring |

---

*Last Updated: March 2024*
*Implementation Owner: Engineering*
