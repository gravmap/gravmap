'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/auth/client'
import { createClient } from '@/lib/supabase/client'
import type { AuthUser, Transaction } from '@/types/database'
import { 
  FileText, Calendar, Upload, Mail, Plus, ArrowRight, 
  CheckCircle2, Clock, TrendingUp,
  CreditCard, Settings
} from 'lucide-react'

type DashboardStats = {
  activeTransactions: number
  upcomingDeadlines: number
  documentsUploaded: number
  communicationsSent: number
}

type RecentActivity = {
  id: string
  type: 'transaction' | 'document' | 'deadline' | 'communication'
  title: string
  description: string
  timestamp: Date
  icon: typeof FileText
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    activeTransactions: 0,
    upcomingDeadlines: 0,
    documentsUploaded: 0,
    communicationsSent: 0,
  })
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [subscriptionTier, setSubscriptionTier] = useState('free')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Check for success message from Stripe
    if (searchParams.get('success')) {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [searchParams])

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadUser = async () => {
    const userData = await getCurrentUser()
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(userData)

    const supabase = createClient()

    // Load subscription tier
    const { data: profile } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', userData.id)
      .single()

    if (profile) {
      setSubscriptionTier(profile.subscription_tier || 'free')
    }

    // Load stats
    const [transactionsResult, documentsResult] = await Promise.all([
      supabase
        .from('transactions')
        .select('id', { count: 'exact' })
        .eq('user_id', userData.id)
        .in('status', ['active', 'pending']),
      supabase
        .from('documents')
        .select('id', { count: 'exact' })
        .eq('user_id', userData.id),
    ])

    // Load recent transactions
    const { data: recentTx } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false })
      .limit(5)

    setStats({
      activeTransactions: transactionsResult.count || 0,
      upcomingDeadlines: 0, // Will be calculated from timeline_events
      documentsUploaded: documentsResult.count || 0,
      communicationsSent: 0,
    })

    setRecentTransactions(recentTx || [])
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  const getTierDisplay = (tier: string) => {
    switch (tier) {
      case 'starter':
        return { name: 'Starter', color: 'bg-gray-100 text-gray-800' }
      case 'professional':
        return { name: 'Professional', color: 'bg-blue-100 text-blue-800' }
      case 'team':
        return { name: 'Team', color: 'bg-purple-100 text-purple-800' }
      default:
        return { name: 'Free Trial', color: 'bg-green-100 text-green-800' }
    }
  }

  // Mock recent activity for demo
  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'transaction',
      title: 'No recent activity',
      description: 'Create your first transaction to get started',
      timestamp: new Date(),
      icon: FileText,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const tierInfo = getTierDisplay(subscriptionTier)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
                GravMap
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link 
                  href="/dashboard/transactions" 
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Transactions
                </Link>
                <Link 
                  href="/dashboard/documents" 
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Documents
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${tierInfo.color}`}>
                {tierInfo.name}
              </span>
              <div className="text-sm hidden sm:block">
                <span className="text-gray-600">Welcome, </span>
                <span className="font-medium text-gray-900">{user?.user_metadata?.name || user?.email}</span>
              </div>
              <Link
                href="/dashboard/settings"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3 text-green-800">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-medium">Subscription activated! Welcome to GravMap.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your real estate transactions
            </p>
          </div>
          <Link
            href="/dashboard/transactions/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Transactions</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.activeTransactions}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Deadlines</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.upcomingDeadlines}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 text-amber-500 mr-1" />
                <span>Next 7 days</span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Documents Uploaded</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.documentsUploaded}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                <span>All processed</span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Communications Sent</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stats.communicationsSent}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                <span>Delivered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-xl border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <Link
                  href="/dashboard/transactions"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {recentTransactions.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                    Get started by creating your first transaction. Upload a contract and let AI handle the rest.
                  </p>
                  <Link
                    href="/dashboard/transactions/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first transaction
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentTransactions.map((transaction) => (
                    <Link
                      key={transaction.id}
                      href={`/dashboard/transactions/${transaction.id}`}
                      className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {transaction.property_address}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {transaction.closing_date
                              ? `Closing: ${new Date(transaction.closing_date).toLocaleDateString()}`
                              : 'No closing date set'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : transaction.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Card */}
            {subscriptionTier === 'free' && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm rounded-xl text-white p-6">
                <h3 className="text-lg font-semibold mb-2">Upgrade to Pro</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Unlock unlimited transactions, SMS notifications, and more.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Plans
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No recent activity
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/dashboard/transactions/new"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Plus className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">New Transaction</span>
                </Link>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Upload className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">Upload Document</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">Manage Subscription</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
