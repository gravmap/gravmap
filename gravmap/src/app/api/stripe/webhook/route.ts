import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeServer, updateSubscriptionTier } from '@/lib/stripe/server'

// Webhook secret for verifying signatures
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  const stripe = getStripeServer()
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  // Get raw body for signature verification
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (subscriptionId) {
          // Get the subscription to find the user
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const customer = await stripe.customers.retrieve(customerId)
          
          if ('metadata' in customer && customer.metadata.userId) {
            await updateSubscriptionTier(customer.metadata.userId, subscription)
          }
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        // Get customer to find userId
        const customer = await stripe.customers.retrieve(customerId)
        
        if ('metadata' in customer && customer.metadata.userId) {
          await updateSubscriptionTier(customer.metadata.userId, subscription)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        // Get customer to find userId
        const customer = await stripe.customers.retrieve(customerId)
        
        if ('metadata' in customer && customer.metadata.userId) {
          // Reset to free tier
          const { createClient } = await import('@/lib/supabase/server')
          const supabase = await createClient()
          
          await supabase
            .from('users')
            .update({ 
              subscription_tier: 'free',
              updated_at: new Date().toISOString() 
            })
            .eq('id', customer.metadata.userId)
        }
        break
      }

      case 'invoice.paid': {
        // Handle successful payment - invoice has subscription info
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string }
        
        if (invoice.subscription) {
          const subscriptionId = invoice.subscription
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const customerId = subscription.customer as string
          const customer = await stripe.customers.retrieve(customerId)
          
          if ('metadata' in customer && customer.metadata.userId) {
            await updateSubscriptionTier(customer.metadata.userId, subscription)
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string }
        
        if (invoice.subscription) {
          console.warn(`Payment failed for subscription ${invoice.subscription}`)
          // Optionally notify user or take action
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}

// Disable body parsing for webhook signature verification
export const runtime = 'nodejs'
