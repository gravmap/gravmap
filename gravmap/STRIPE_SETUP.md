# Stripe Setup Guide for GravMap

This guide walks you through setting up Stripe for the GravMap billing system.

## Prerequisites

- A Stripe account (create one at https://dashboard.stripe.com/register)
- Node.js installed
- GravMap project cloned

## Step 1: Get API Keys

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**
4. For testing, use the test mode keys (they start with `pk_test_` and `sk_test_`)

## Step 2: Create Products and Prices

You need to create 3 products (Starter, Professional, Team) with monthly and yearly pricing options.

### Option A: Using Stripe Dashboard (Recommended for first setup)

1. Go to **Products** in Stripe Dashboard
2. Click **Add product**
3. Create each product:

#### Starter Plan
- **Name:** Starter
- **Description:** Perfect for solo agents
- **Pricing:**
  - Monthly: $49 USD / month
  - Yearly: $470 USD / year (20% discount)
- Copy the **Price IDs** (start with `price_`)

#### Professional Plan
- **Name:** Professional
- **Description:** For producing agents
- **Pricing:**
  - Monthly: $99 USD / month
  - Yearly: $950 USD / year (20% discount)
- Copy the **Price IDs**

#### Team Plan
- **Name:** Team
- **Description:** For growing teams
- **Pricing:**
  - Monthly: $199 USD / month
  - Yearly: $1,910 USD / year (20% discount)
- Copy the **Price IDs**

### Option B: Using Stripe CLI (For developers)

```bash
# Install Stripe CLI first
# See: https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Create products using the provided script
# (See scripts/create-stripe-products.sh)
```

## Step 3: Set Up Webhooks

Webhooks are essential for receiving subscription events from Stripe.

### For Local Development

1. Install Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
   scoop install stripe
   
   # Linux
   # Download from https://github.com/stripe/stripe-cli/releases
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   
4. Copy the webhook signing secret (starts with `whsec_`) to your `.env.local`

### For Production

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your endpoint URL:
   ```
   https://your-domain.com/api/stripe/webhook
   ```
4. Select these events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** to your environment variables

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Stripe Keys
STRIPE_SECRET_KEY=your_stripe_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_STARTER_YEARLY=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_YEARLY=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_TEAM_YEARLY=price_xxxxx
```

## Step 5: Test the Integration

### Test Checkout Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. In a separate terminal, start the Stripe webhook forwarder:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

3. Visit `http://localhost:3000/pricing`

4. Click "Start Free Trial" on any plan

5. Use Stripe test card numbers:
   - **Successful payment:** `4242 4242 4242 4242`
   - **Failed payment:** `4000 0000 0000 0002`
   - **Requires authentication:** `4000 0025 0000 3155`

6. Complete the checkout

7. Verify the subscription was created in your Stripe Dashboard

### Test Webhooks

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click on your endpoint
3. Use the "Send test webhook" button to test different events

## Step 6: Enable Billing Portal

The billing portal allows customers to manage their subscriptions.

1. Go to **Settings** → **Billing** → **Customer portal**
2. Enable the portal
3. Configure which features customers can access:
   - Cancel subscriptions ✓
   - Update payment methods ✓
   - View invoices ✓
   - Switch plans ✓
4. Save your changes

## Production Checklist

Before going live:

- [ ] Switch to live API keys (start with `pk_live_` and `sk_live_`)
- [ ] Update webhook endpoint to production URL
- [ ] Update price IDs to live mode prices
- [ ] Test the complete checkout flow with a real card
- [ ] Verify webhook signatures are being validated
- [ ] Set up proper error logging (Sentry, etc.)
- [ ] Configure Stripe emails/receipts
- [ ] Review and enable fraud prevention settings
- [ ] Set up Stripe Radar for fraud detection
- [ ] Add business information to Stripe account

## Useful Commands

```bash
# View recent Stripe events
stripe events list

# View recent webhooks
stripe events list --filter type=checkout.session.completed

# Create a test customer
stripe customers create --email test@example.com

# View subscriptions
stripe subscriptions list
```

## Troubleshooting

### "Invalid signature" error
- Make sure `STRIPE_WEBHOOK_SECRET` is set correctly
- Restart your dev server after updating env variables
- Verify you're using the correct webhook secret (test vs live)

### Checkout not working
- Verify price IDs are correct and match your Stripe products
- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set

### Subscription not updating in database
- Check webhook logs in Stripe Dashboard
- Verify webhook endpoint is accessible
- Check server logs for errors

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Next.js Integration](https://github.com/vercel/nextjs-subscription-payments)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## Support

For Stripe-specific issues, contact [Stripe Support](https://support.stripe.com)

For GravMap billing issues, check the application logs or contact the development team.
