# Deployment Checklist - PropFlow MVP

**Build Status:** ✅ Complete
**Code Status:** Ready to deploy
**Blocker:** Environment variables & account setup

---

## Pre-Deployment Tasks (Do Once)

### 1. Create Required Accounts

| Service | Purpose | Free Tier | Link |
|---------|---------|-----------|------|
| **Supabase** | Database + Auth + Storage | ✅ Yes | https://supabase.com |
| **OpenAI** | AI extraction | ❌ Pay per use | https://platform.openai.com |
| **Stripe** | Billing | ✅ Yes | https://stripe.com |
| **Resend** | Email | ✅ 3K/month | https://resend.com |
| **Vercel** | Hosting | ✅ Yes | https://vercel.com |

**Estimated setup time:** 30-45 minutes

---

### 2. Get API Keys

From each service, collect:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - From Supabase project settings
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase project settings
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - From Supabase project settings (secret!)
- [ ] `OPENAI_API_KEY` - From OpenAI platform (sk-...)
- [ ] `STRIPE_SECRET_KEY` - From Stripe dashboard (sk_test_...)
- [ ] `STRIPE_PUBLISHABLE_KEY` - From Stripe dashboard (pk_test_...)
- [ ] `STRIPE_WEBHOOK_SECRET` - Will get after webhook setup
- [ ] `RESEND_API_KEY` - From Resend dashboard (re_...)
- [ ] `NEXT_PUBLIC_APP_URL` - Will be your Vercel URL

---

### 3. Create `.env.local` File

In the project root (`~/.openclaw/workspace/startup/propflow/`), create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
STRIPE_PRICE_STARTER=price_your-starter-price-id
STRIPE_PRICE_PRO=price_your-pro-price-id

# Resend
RESEND_API_KEY=re_your-resend-key

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

### 4. Set Up Supabase

**In Supabase dashboard:**

1. **Run migrations:**
   - Go to SQL Editor
   - Run schema from `supabase/migrations/` folder

2. **Create storage bucket:**
   - Go to Storage
   - Create bucket: `contracts`
   - Set to private

3. **Enable Row Level Security:**
   - Already in migrations, but verify

---

### 5. Set Up Stripe Products

**In Stripe dashboard:**

1. **Create products:**
   - Starter Plan: $49/month
   - Pro Plan: $99/month

2. **Copy price IDs:**
   - Add to `.env.local` as `STRIPE_PRICE_STARTER` and `STRIPE_PRICE_PRO`

---

### 6. Push to GitHub

```bash
cd ~/.openclaw/workspace/startup/propflow
git init
git add .
git commit -m "Initial commit - PropFlow MVP"
git branch -M main
git remote add origin https://github.com/gravmapco/propflow.git
git push -u origin main
```

---

### 7. Deploy to Vercel

1. Go to https://vercel.com
2. Import GitHub repo: `gravmapco/propflow`
3. Add all environment variables from `.env.local`
4. Deploy
5. Copy deployment URL → set as `NEXT_PUBLIC_APP_URL`

---

### 8. Configure Stripe Webhook

1. In Stripe dashboard, go to Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.*`
4. Copy signing secret → add to `.env.local` as `STRIPE_WEBHOOK_SECRET`
5. Redeploy on Vercel to pick up new env var

---

### 9. Configure Vercel Cron (Optional)

For daily reminder emails:

1. Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/reminders",
    "schedule": "0 9 * * *"
  }]
}
```

2. Redeploy

---

### 10. Test Everything

**Test checklist:**
- [ ] Sign up works
- [ ] Can upload contract
- [ ] AI extraction works
- [ ] Timeline generates
- [ ] Stripe checkout works
- [ ] Email sends (check spam)
- [ ] Webhook receives (check Stripe logs)

---

## Post-Deployment

**Once deployed:**

1. **Share URL with r1** - I'll transition to LAUNCH phase
2. **Beta user outreach** - I have 20+ communities ready
3. **Product Hunt prep** - I'll draft launch assets
4. **Customer development** - Start interviews

---

## Need Help?

If you get stuck on any step, just message me. I can:
- Walk you through specific setup
- Help debug deployment issues
- Create the GitHub repo
- Generate additional documentation

**Estimated total time to deploy:** 1-2 hours

Once deployed, we move to LAUNCH phase 🚀
