'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Transaction, Document, DocumentType, TransactionStatus } from '@/types/database'
import type { ContractExtractionResult } from '@/types/extraction'
import DocumentList from '@/components/documents/DocumentList'
import FileUpload from '@/components/documents/FileUpload'
import ExtractionReviewPanel from '@/components/extraction/ExtractionReviewPanel'

const statusColors: Record<TransactionStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
}

const extractionStatusColors = {
  pending: 'bg-gray-100 text-gray-600',
  processing: 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  failed: 'bg-red-100 text-red-600',
}

export default function TransactionDetailPage() {
  const params = useParams()
  const transactionId = params.id as string

  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [timelineEvents, setTimelineEvents] = useState<Array<{
    id: string
    event_name: string
    event_date: string
    event_type: string
    status: string
    description?: string
  }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'extraction'>('overview')
  const [selectedDocumentForExtraction, setSelectedDocumentForExtraction] = useState<Document | null>(null)

  useEffect(() => {
    loadTransaction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId])

  const loadTransaction = async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Load transaction
      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single()

      if (transactionError || !transactionData) {
        setError('Transaction not found')
        setLoading(false)
        return
      }

      setTransaction(transactionData)

      // Load documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .eq('transaction_id', transactionId)
        .order('uploaded_at', { ascending: false })

      if (!documentsError && documentsData) {
        setDocuments(documentsData)
      }

      // Load timeline events
      const { data: timelineData, error: timelineError } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('transaction_id', transactionId)
        .order('event_date', { ascending: true })

      if (!timelineError && timelineData) {
        setTimelineEvents(timelineData)
      }
    } catch (err) {
      console.error('Error loading transaction:', err)
      setError('Failed to load transaction')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const supabase = createClient()

      // Get document to find file path
      const document = documents.find((d) => d.id === documentId)
      if (!document) return

      // Delete from storage (extract path from URL)
      const deleteResponse = await fetch('/api/documents/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId, fileUrl: document.file_url }),
      })

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete from storage')
      }

      // Delete from database
      const { error: deleteError } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId)

      if (deleteError) {
        throw deleteError
      }

      // Update local state
      setDocuments((prev) => prev.filter((d) => d.id !== documentId))
    } catch (err) {
      console.error('Error deleting document:', err)
      setError('Failed to delete document')
    }
  }

  const handleCategorizeDocument = async (documentId: string, documentType: DocumentType) => {
    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('documents')
        .update({ document_type: documentType })
        .eq('id', documentId)

      if (error) {
        throw error
      }

      // Update local state
      setDocuments((prev) =>
        prev.map((d) => (d.id === documentId ? { ...d, document_type: documentType } : d))
      )
    } catch (err) {
      console.error('Error categorizing document:', err)
      setError('Failed to categorize document')
    }
  }

  const handleConfirmExtraction = async (data: ContractExtractionResult) => {
    try {
      const response = await fetch(`/api/transactions/${transactionId}/confirm-extraction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ extractedData: data }),
      })

      if (!response.ok) {
        throw new Error('Failed to confirm extraction')
      }

      // Reload transaction to get updated data
      await loadTransaction()

      // Clear selection
      setSelectedDocumentForExtraction(null)

      // Switch to timeline tab to show created events
      setActiveTab('timeline')

      // Show success message
      setError(null)
    } catch (err) {
      console.error('Error confirming extraction:', err)
      setError('Failed to save extracted data')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUploadComplete = (_document: {
    file_url: string
    file_name: string
    file_size: number
    file_type: string
    document_type?: DocumentType
  }) => {
    // Reload documents
    loadTransaction()
    setShowUploadModal(false)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Find contract documents for extraction
  const contractDocuments = documents.filter(d => d.document_type === 'contract')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Transaction not found'}</h2>
          <Link
            href="/dashboard/transactions"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to transactions
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/transactions" className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{transaction.property_address}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[transaction.status]}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created {formatDate(transaction.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Edit Transaction
              </button>
              <button className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'timeline'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Timeline ({timelineEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('extraction')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'extraction'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              AI Extraction
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transaction Details */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Property Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{transaction.property_address}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Closing Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(transaction.closing_date)}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Purchase Price</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatCurrency(transaction.purchase_price)}</dd>
                </div>

                {transaction.buyer_name && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Buyer</dt>
                    <dd className="mt-1 text-sm text-gray-900">{transaction.buyer_name}</dd>
                  </div>
                )}

                {transaction.seller_name && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Seller</dt>
                    <dd className="mt-1 text-sm text-gray-900">{transaction.seller_name}</dd>
                  </div>
                )}

                {transaction.property_type && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Property Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{transaction.property_type}</dd>
                  </div>
                )}

                {transaction.notes && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{transaction.notes}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{documents.length}</div>
                    <div className="text-sm text-gray-500">Documents</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">{timelineEvents.length}</div>
                    <div className="text-sm text-gray-500">Timeline Events</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              {timelineEvents.length > 0 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
                  <ul className="space-y-3">
                    {timelineEvents.slice(0, 3).map((event) => {
                      const days = getDaysUntil(event.event_date)
                      return (
                        <li key={event.id} className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{event.event_name}</div>
                            <div className="text-xs text-gray-500">{formatDate(event.event_date)}</div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            days < 0 ? 'bg-gray-100 text-gray-600' :
                            days <= 7 ? 'bg-red-100 text-red-700' :
                            days <= 30 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {days < 0 ? `${Math.abs(days)}d ago` :
                             days === 0 ? 'Today' :
                             `${days}d away`}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Recent Documents */}
              {documents.length > 0 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Documents</h3>
                  <ul className="space-y-2">
                    {documents.slice(0, 3).map((doc) => (
                      <li key={doc.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-900 truncate">{doc.file_name}</span>
                        </div>
                        {doc.extraction_status === 'completed' && (
                          <span className="text-xs text-green-600">✓ Extracted</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {documents.length > 3 && (
                    <button
                      onClick={() => setActiveTab('documents')}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-700"
                    >
                      View all {documents.length} documents →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            {/* Upload Button */}
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Document
              </button>
            </div>

            {/* Document List */}
            <DocumentList
              documents={documents}
              onDeleteDocument={handleDeleteDocument}
              onCategorizeDocument={handleCategorizeDocument}
            />
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
            {timelineEvents.length === 0 ? (
              <p className="text-gray-500">No timeline events yet. Upload a contract and extract data to auto-generate timeline events.</p>
            ) : (
              <div className="space-y-4">
                {timelineEvents.map((event) => {
                  const days = getDaysUntil(event.event_date)
                  return (
                    <div key={event.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.event_name}</h4>
                        <p className="text-sm text-gray-500">{formatDate(event.event_date)}</p>
                        {event.description && (
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          event.status === 'completed' ? 'bg-green-100 text-green-700' :
                          event.status === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {event.status}
                        </span>
                        {days > 0 && days <= 30 && (
                          <span className="text-xs text-gray-500">
                            {days === 1 ? '1 day' : `${days} days`} away
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'extraction' && (
          <div>
            {/* Document Selection */}
            {!selectedDocumentForExtraction && (
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Contract to Extract</h3>
                
                {contractDocuments.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 mb-4">No contract documents found</p>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Upload a contract →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contractDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">{doc.file_name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>Uploaded {formatDate(doc.uploaded_at)}</span>
                              {doc.extraction_status && (
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  extractionStatusColors[doc.extraction_status as keyof typeof extractionStatusColors]
                                }`}>
                                  {doc.extraction_status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedDocumentForExtraction(doc)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                          {doc.extraction_status === 'completed' ? 'Review' : 'Extract'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Extraction Panel */}
            {selectedDocumentForExtraction && (
              <div>
                <button
                  onClick={() => setSelectedDocumentForExtraction(null)}
                  className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to document list
                </button>

                <ExtractionReviewPanel
                  documentId={selectedDocumentForExtraction.id}
                  documentUrl={selectedDocumentForExtraction.file_url}
                  extractionStatus={selectedDocumentForExtraction.extraction_status || 'pending'}
                  existingExtraction={selectedDocumentForExtraction.extracted_data as unknown as ContractExtractionResult | undefined}
                  onConfirm={handleConfirmExtraction}
                  onReExtract={() => setSelectedDocumentForExtraction(null)}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <FileUpload
                transactionId={transactionId}
                onUploadComplete={handleUploadComplete}
                onUploadError={(error) => {
                  setError(error)
                  setShowUploadModal(false)
                }}
                documentType="other"
              />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
