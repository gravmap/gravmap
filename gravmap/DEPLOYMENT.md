# Deployment Guide

Complete guide to deploying GravMap to production on Vercel.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Database Setup (Supabase)](#database-setup-supabase)
- [Payment Setup (Stripe)](#payment-setup-stripe)
- [Email Setup (Resend)](#email-setup-resend)
- [Vercel Deployment](#vercel-deployment)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] Vercel account (free tier works)
- [ ] Supabase account (free tier works)
- [ ] Stripe account (test mode for development)
- [ ] Resend account (optional, for emails)
- [ ] OpenAI API key

---

## Environment Variables

Create these in your `.env.local` for local development and in Vercel for production.

### Required Variables

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Authentication
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your domain in production

# AI/Extraction
OPENAI_API_KEY=sk-proj-xxxxx

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Email (Resend) - Optional
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@yourdomain.com

# Cron Jobs (Vercel Cron)
CRON_SECRET=your-random-secret-here

# Support Chat (Optional)
NEXT_PUBLIC_CRISP_WEBSITE_ID=your-crisp-id
```

### Getting the Values

#### Supabase Variables
1. Go to [supabase.com](https://supabase.com) and open your project
2. Go to Settings → API
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)

#### OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Copy to `OPENAI_API_KEY`

#### Stripe Keys
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Get your keys from Developers → API Keys
3. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
4. For webhook secret, see [Stripe Setup](#payment-setup-stripe)

#### Resend API Key
1. Go to [resend.com](https://resend.com)
2. Create an API key
3. Copy to `RESEND_API_KEY`

---

## Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name it "GravMap" or similar
4. Set a strong database password (save it!)
5. Choose a region close to you
6. Wait 2-3 minutes for project to initialize

### Step 2: Run Migrations

#### Option A: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

#### Option B: Manual SQL Execution

1. Go to Supabase Dashboard → SQL Editor
2. Run each migration file in order:
   - `supabase/migrations/20260315000000_initial_schema.sql`
   - `supabase/migrations/20260317000000_notification_settings.sql`
   - Any other migration files

### Step 3: Enable Row Level Security

The migrations include RLS policies, but verify:
1. Go to Authentication → Policies
2. Ensure RLS is enabled on all tables
3. Check policies are created

### Step 4: Create Storage Bucket

1. Go to Storage in Supabase Dashboard
2. Create a new bucket named `documents`
3. Set it to private (not public)
4. Configure CORS if needed

### Step 5: Get API Keys

1. Go to Settings → API
2. Copy URL and keys to your `.env.local`

---

## Payment Setup (Stripe)

### Step 1: Create Products and Prices

1. Go to [dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Create two products:

**Free Plan:**
- Name: "Free"
- Price: $0
- Billing: One-time (not recurring)

**Pro Plan:**
- Name: "Pro"
- Price: $29/month
- Billing: Recurring - Monthly

3. Copy the Price IDs (start with `price_`) and update in your code

### Step 2: Configure Webhook

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Enter your endpoint URL:
   - Development: Use Stripe CLI (see below)
   - Production: `https://yourdomain.com/api/stripe/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Copy the Signing secret → `STRIPE_WEBHOOK_SECRET`

### Step 3: Test with Stripe CLI (Development)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# This will output a webhook signing secret
# Copy it to STRIPE_WEBHOOK_SECRET
```

### Step 4: Test Mode vs Live Mode

- Use test mode keys for development
- Switch to live mode for production
- Never commit live keys to git!

---

## Email Setup (Resend)

### Step 1: Create Account

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Verify your email

### Step 2: Get API Key

1. Go to API Keys
2. Create a new key
3. Copy to `RESEND_API_KEY`

### Step 3: Configure Domain (Production)

For production, you need to verify your domain:

1. Go to Domains
2. Add your domain (e.g., `gravmap.com`)
3. Add the DNS records shown
4. Wait for verification
5. Update `EMAIL_FROM` to use your domain

### Mock Mode

If you don't set up Resend, the app will run in "mock mode":
- Emails are logged to console
- No actual emails sent
- Useful for development

---

## Vercel Deployment

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repo at github.com/new
# Then push:
git remote add origin https://github.com/yourusername/gravmap.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Add Environment Variables

In Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add each variable from your `.env.local`
3. Make sure to update:
   - `NEXT_PUBLIC_APP_URL` → Your Vercel URL
   - Stripe keys → Switch to live mode keys (when ready)
   - Resend domain → Your production domain

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Vercel will provide a URL like `yourproject.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your domain (e.g., `gravmap.com`)
3. Add DNS records as instructed
4. Wait for verification
5. Update `NEXT_PUBLIC_APP_URL` to your custom domain

---

## Post-Deployment

### Step 1: Verify Deployment

Visit your deployed URL and check:

- [ ] Homepage loads
- [ ] Signup works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Can create transaction (with mock)
- [ ] Stripe checkout works (test mode)
- [ ] Webhooks receive events

### Step 2: Configure Cron Jobs

Vercel Cron is configured in `vercel.json`. To enable:

1. Ensure `CRON_SECRET` is set in Vercel
2. Verify crons are active:
   - Go to your project in Vercel
   - Settings → Crons
   - Should see two crons scheduled

### Step 3: Set Up Monitoring (Optional)

- Vercel Analytics: Enable in project settings
- Error Tracking: Consider Sentry
- Uptime Monitoring: UptimeRobot, Pingdom

### Step 4: Stripe Live Mode

When ready to accept real payments:

1. Switch to live mode in Stripe Dashboard
2. Copy live keys to Vercel environment variables
3. Update webhook endpoint to production URL
4. Test with real card (you can refund after)

### Step 5: Support Chat

Follow instructions in `docs/SUPPORT_INTEGRATION.md` to enable Crisp or Intercom.

---

## Troubleshooting

### Build Fails

**Error: "Type error"**
```bash
# Run locally to debug
npm run build

# Fix TypeScript errors before deploying
```

**Error: "Module not found"**
```bash
# Install dependencies
npm install

# Check imports are correct
```

### Environment Variable Issues

**"NEXT_PUBLIC_* variables not available"**
- Ensure they're set in Vercel
- Rebuild and redeploy after adding
- Clear browser cache

**"Service role key not working"**
- Check key is correct
- Ensure no extra spaces
- Verify key is in Vercel (not just local)

### Database Errors

**"Connection refused"**
- Check Supabase project is not paused
- Verify URL and keys are correct
- Check IP allowlist (usually not needed)

**"Permission denied"**
- RLS policies might be blocking
- Check user is authenticated
- Verify RLS policies are correct

### Stripe Webhook Issues

**"Webhook signature verification failed"**
- Ensure webhook secret is correct
- Check webhook URL is accessible
- Verify payload is not modified

**"Events not received"**
- Check webhook endpoint is deployed
- Verify events are selected in Stripe
- Check Vercel logs for errors

### Email Not Sending

**"Resend API error"**
- Check API key is correct
- Verify domain is configured (production)
- Check sender email matches domain

**"Emails going to spam"**
- Configure SPF, DKIM, DMARC records
- Use verified domain
- Avoid spam trigger words

---

## Rollback

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click the three dots (...) → "Promote to Production"
4. Instant rollback

---

## Monitoring

### Vercel Logs

1. Go to your project in Vercel
2. Click "Logs" tab
3. View real-time logs
4. Filter by function, time, etc.

### Supabase Logs

1. Go to Supabase Dashboard
2. Click "Logs" in sidebar
3. View API, database, and auth logs

### Stripe Dashboard

1. Developers → Logs
2. See all API calls and webhooks
3. Debug payment issues

---

## Security Checklist

Before going live:

- [ ] All API keys are environment variables (not in code)
- [ ] Service role key is not exposed to client
- [ ] RLS policies are enabled on all tables
- [ ] Stripe webhook secret is set
- [ ] HTTPS only (automatic on Vercel)
- [ ] Strong CRON_SECRET set
- [ ] Remove all console.logs with sensitive data
- [ ] Enable rate limiting (consider Upstash)
- [ ] Set up CSP headers (optional)

---

## Performance Optimization

### Before Launch

- [ ] Run Lighthouse audit
- [ ] Optimize images (use Next.js Image)
- [ ] Enable compression (automatic on Vercel)
- [ ] Check bundle size
- [ ] Lazy load components where possible

### After Launch

- [ ] Monitor Core Web Vitals
- [ ] Set up error tracking (Sentry)
- [ ] Monitor API response times
- [ ] Check database query performance

---

## Support

Need help? Contact:
- Email: support@gravmap.com
- Documentation: /help
- In-app chat (when enabled)

---

## License

MIT License - See LICENSE file for details.
