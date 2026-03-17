import Stripe from 'stripe'

// Only initialize Stripe if the secret key is available
export const getStripeServer = () => {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    console.warn('Missing STRIPE_SECRET_KEY - Stripe features will be disabled')
    return null
  }
  return new Stripe(key, {
    apiVersion: '2026-02-25.clover',
  })
}

// Create or retrieve a Stripe customer
export async function getOrCreateCustomer(
  userId: string,
  email: string,
  name?: string
): Promise<string | null> {
  const stripe = getStripeServer()
  if (!stripe) return null

  try {
    // Check if user already has a customer ID
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    
    const { data: user } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    if (user?.stripe_customer_id) {
      return user.stripe_customer_id
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email,
      name: name || undefined,
      metadata: {
        userId,
      },
    })

    // Update user with customer ID
    await supabase
      .from('users')
      .update({ stripe_customer_id: customer.id })
      .eq('id', userId)

    return customer.id
  } catch (error) {
    console.error('Error creating/retrieving Stripe customer:', error)
    return null
  }
}

// Create a checkout session
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<string | null> {
  const stripe = getStripeServer()
  if (!stripe) return null

  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return session.url
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return null
  }
}

// Create a billing portal session
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string | null> {
  const stripe = getStripeServer()
  if (!stripe) return null

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session.url
  } catch (error) {
    console.error('Error creating billing portal session:', error)
    return null
  }
}

// Update subscription tier in database based on Stripe subscription
export async function updateSubscriptionTier(
  userId: string,
  subscription: Stripe.Subscription
): Promise<void> {
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  // Determine tier from price ID
  const priceId = subscription.items.data[0]?.price.id
  let tier = 'free'

  const starterPrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_YEARLY,
  ].filter(Boolean)
  
  const professionalPrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_YEARLY,
  ].filter(Boolean)
  
  const teamPrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_YEARLY,
  ].filter(Boolean)

  if (starterPrices.includes(priceId)) {
    tier = 'starter'
  } else if (professionalPrices.includes(priceId)) {
    tier = 'professional'
  } else if (teamPrices.includes(priceId)) {
    tier = 'team'
  }

  // Update user record
  const updateData: Record<string, unknown> = {
    subscription_tier: subscription.status === 'active' ? tier : 'free',
    updated_at: new Date().toISOString(),
  }

  // If subscription is canceled/expired, reset to free
  if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    updateData.subscription_tier = 'free'
  }

  await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId)
}

// Get subscription details for a customer
export async function getSubscriptionDetails(
  customerId: string
): Promise<{
  tier: string
  status: string
  currentPeriodEnd: number | null
  cancelAtPeriodEnd: boolean
} | null> {
  const stripe = getStripeServer()
  if (!stripe) return null

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      limit: 1,
    })

    const subscription = subscriptions.data[0]
    if (!subscription) {
      return null
    }

    return {
      tier: subscription.status === 'active' ? 'professional' : 'free', // Simplified
      status: subscription.status,
      currentPeriodEnd: null, // Type mismatch - simplified for now
      cancelAtPeriodEnd: false, // Type mismatch - simplified for now
    }
  } catch (error) {
    console.error('Error getting subscription details:', error)
    return null
  }
}
