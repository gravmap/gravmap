'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Zap } from 'lucide-react'
import { PRICING_PLANS, formatPrice, type PlanTier, type BillingPeriod } from '@/lib/stripe/client'

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly')

  const handleSelectPlan = async (tier: PlanTier) => {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, period: billingPeriod }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            GravMap
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your business. All plans include a 14-day free trial.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={billingPeriod === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-7' : ''
              }`}
            />
          </button>
          <span className={billingPeriod === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}>
            Yearly
            <span className="ml-2 text-green-600 text-sm font-semibold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {(Object.entries(PRICING_PLANS) as [PlanTier, typeof PRICING_PLANS.starter][]).map(([tier, plan]) => {
            const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
            const isHighlighted = plan.highlighted

            return (
              <div
                key={tier}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  isHighlighted ? 'ring-2 ring-blue-600 scale-105 z-10' : 'border border-gray-200'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(price)}
                    </span>
                    <span className="text-gray-600">
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(tier)}
                    className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isHighlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Start Free Trial
                  </button>

                  <p className="mt-3 text-sm text-gray-500 text-center">
                    14 days free, no credit card required
                  </p>
                </div>

                <div className="px-8 pb-8">
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">What&apos;s included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-medium text-gray-900 mt-6 mb-4">Limitations:</h4>
                        <ul className="space-y-3">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Compare all features
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 text-left font-semibold text-gray-900">Feature</th>
                  <th className="py-4 text-center font-semibold text-gray-900">Starter</th>
                  <th className="py-4 text-center font-semibold text-gray-900 bg-blue-50">
                    Professional
                  </th>
                  <th className="py-4 text-center font-semibold text-gray-900">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: 'Active transactions', starter: '15', pro: 'Unlimited', team: 'Unlimited' },
                  { feature: 'Team members', starter: '1', pro: '3', team: '10' },
                  { feature: 'AI contract extraction', starter: true, pro: true, team: true },
                  { feature: 'Auto-generated timelines', starter: true, pro: true, team: true },
                  { feature: 'Email reminders', starter: true, pro: true, team: true },
                  { feature: 'SMS notifications', starter: false, pro: true, team: true },
                  { feature: 'Google Calendar sync', starter: false, pro: true, team: true },
                  { feature: 'Client email templates', starter: false, pro: true, team: true },
                  { feature: 'Team analytics', starter: false, pro: false, team: true },
                  { feature: 'Custom workflows', starter: false, pro: false, team: true },
                  { feature: 'White-label options', starter: false, pro: false, team: true },
                  { feature: 'Support', starter: 'Email', pro: 'Priority Email', team: 'Phone' },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 text-gray-700">{row.feature}</td>
                    <td className="py-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-4 text-center bg-blue-50">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {typeof row.team === 'boolean' ? (
                        row.team ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.team}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How does the 14-day free trial work?',
                a: 'Start using GravMap immediately with full access to all features. No credit card required. After 14 days, choose a plan that works for you or your account will be limited to the free tier.',
              },
              {
                q: 'Can I change plans later?',
                a: 'Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, you\'ll receive credit toward future billing.',
              },
              {
                q: 'What counts as an "active transaction"?',
                a: 'An active transaction is any property deal that hasn\'t closed yet. Once a transaction is marked as completed or cancelled, it no longer counts toward your limit.',
              },
              {
                q: 'Do you offer discounts for annual billing?',
                a: 'Yes! Save 20% when you pay annually. That\'s like getting 2 months free.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, MasterCard, American Express) and process payments securely through Stripe.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time with no penalties. You\'ll continue to have access until the end of your billing period.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to streamline your transactions?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join hundreds of real estate professionals using GravMap
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Zap className="h-5 w-5 mr-2" />
              Start Free Trial
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} GravMap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
