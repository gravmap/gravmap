import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.warn('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
      return Promise.resolve(null)
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

// Price IDs - these will be set after creating products in Stripe
export const STRIPE_PRICES = {
  starter: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY || '',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_YEARLY || '',
  },
  professional: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_MONTHLY || '',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_YEARLY || '',
  },
  team: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY || '',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_YEARLY || '',
  },
} as const

export type PlanTier = 'starter' | 'professional' | 'team'
export type BillingPeriod = 'monthly' | 'yearly'

export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    description: 'Perfect for solo agents',
    monthlyPrice: 49,
    yearlyPrice: 470, // ~20% off
    features: [
      '15 active transactions',
      '1 user',
      'AI contract extraction',
      'Auto-generated timelines',
      'Email reminders',
      'Email support',
    ],
    limitations: [
      '15 transaction limit',
      'No SMS notifications',
    ],
    highlighted: false,
  },
  professional: {
    name: 'Professional',
    description: 'For producing agents',
    monthlyPrice: 99,
    yearlyPrice: 950, // ~20% off
    features: [
      'Unlimited transactions',
      '3 users',
      'AI contract extraction',
      'Auto-generated timelines',
      'Email & SMS reminders',
      'Priority email support',
      'Client communication templates',
      'Google Calendar sync',
    ],
    limitations: [],
    highlighted: true,
  },
  team: {
    name: 'Team',
    description: 'For growing teams',
    monthlyPrice: 199,
    yearlyPrice: 1910, // ~20% off
    features: [
      'Unlimited transactions',
      '10 users',
      'Everything in Professional',
      'Phone support',
      'Custom workflows',
      'Team analytics dashboard',
      'White-label options',
      'Dedicated account manager',
    ],
    limitations: [],
    highlighted: false,
  },
} as const

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
