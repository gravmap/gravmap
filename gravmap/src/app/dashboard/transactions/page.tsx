'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/auth/client'
import { createClient } from '@/lib/supabase/client'
import type { AuthUser, Transaction } from '@/types/database'
import { 
  Plus, Search, Filter, Calendar, DollarSign, MapPin,
  ArrowRight, FileText, Clock, CheckCircle2,
  XCircle, Settings
} from 'lucide-react'

export default function TransactionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'price'>('date')

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

    // Load transactions
    const supabase = createClient()
    const { data: transactionsData } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false })

    setTransactions(transactionsData || [])
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
      completed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle2 },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle },
      draft: { bg: 'bg-gray-100', text: 'text-gray-600', icon: FileText },
    }
    return styles[status as keyof typeof styles] || styles.draft
  }

  const getDaysUntilClosing = (closingDate: string | null) => {
    if (!closingDate) return null
    const today = new Date()
    const closing = new Date(closingDate)
    const diffTime = closing.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesSearch = 
        tx.property_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.buyer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.seller_name?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'status':
          return a.status.localeCompare(b.status)
        case 'price':
          return (b.purchase_price || 0) - (a.purchase_price || 0)
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
                  className="text-sm text-blue-600 font-medium px-3 py-2 rounded-md bg-blue-50"
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="mt-1 text-sm text-gray-600">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/dashboard/transactions/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by address, buyer, or seller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              {searchQuery || statusFilter !== 'all' ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matching transactions</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('all')
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => {
              const badgeStyle = getStatusBadge(transaction.status)
              const StatusIcon = badgeStyle.icon
              const daysUntilClosing = getDaysUntilClosing(transaction.closing_date)
              
              return (
                <Link
                  key={transaction.id}
                  href={`/dashboard/transactions/${transaction.id}`}
                  className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        {/* Property Address */}
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <h3 className="text-base font-semibold text-gray-900 truncate">
                            {transaction.property_address}
                          </h3>
                        </div>

                        {/* Details Row */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          {transaction.purchase_price && (
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="h-4 w-4" />
                              <span>${transaction.purchase_price.toLocaleString()}</span>
                            </div>
                          )}
                          {transaction.closing_date && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              <span>Closing: {new Date(transaction.closing_date).toLocaleDateString()}</span>
                              {daysUntilClosing !== null && (
                                <span className={`ml-1 px-2 py-0.5 rounded text-xs font-medium ${
                                  daysUntilClosing < 0
                                    ? 'bg-red-100 text-red-700'
                                    : daysUntilClosing <= 7
                                    ? 'bg-amber-100 text-amber-700'
                                    : daysUntilClosing <= 30
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {daysUntilClosing < 0
                                    ? `${Math.abs(daysUntilClosing)} days ago`
                                    : daysUntilClosing === 0
                                    ? 'Today'
                                    : `${daysUntilClosing} days`}
                                </span>
                              )}
                            </div>
                          )}
                          {transaction.buyer_name && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-400">Buyer:</span>
                              <span>{transaction.buyer_name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${badgeStyle.bg} ${badgeStyle.text}`}>
                          <StatusIcon className="h-4 w-4" />
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                        <ArrowRight className="h-5 w-5 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
