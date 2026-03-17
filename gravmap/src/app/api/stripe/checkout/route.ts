import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateCustomer, createCheckoutSession } from '@/lib/stripe/server'
import { STRIPE_PRICES, type PlanTier, type BillingPeriod } from '@/lib/stripe/client'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { tier, period = 'monthly' }: { tier: PlanTier; period: BillingPeriod } = body

    if (!tier || !['starter', 'professional', 'team'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      )
    }

    // Get price ID
    const priceId = STRIPE_PRICES[tier][period]
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price not configured. Please set up Stripe products first.' },
        { status: 400 }
      )
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateCustomer(
      user.id,
      user.email!,
      user.user_metadata?.name
    )

    if (!customerId) {
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      )
    }

    // Create checkout session
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const checkoutUrl = await createCheckoutSession(
      customerId,
      priceId,
      `${origin}/dashboard?success=true`,
      `${origin}/pricing?canceled=true`
    )

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: checkoutUrl })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
