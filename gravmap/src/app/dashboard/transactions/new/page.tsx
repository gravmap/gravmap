'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import FileUpload from '@/components/documents/FileUpload'
import type { DocumentType } from '@/types/database'

export default function NewTransactionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'details' | 'documents'>('details')
  
  // Transaction details
  const [propertyAddress, setPropertyAddress] = useState('')
  const [closingDate, setClosingDate] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [sellerName, setSellerName] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [notes, setNotes] = useState('')
  
  // Created transaction ID
  const [transactionId, setTransactionId] = useState<string | null>(null)
  
  // Uploaded documents
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    file_url: string
    file_name: string
    file_size: number
    file_type: string
    document_type?: DocumentType
  }>>([])

  const handleCreateTransaction = async () => {
    setError(null)
    
    if (!propertyAddress.trim()) {
      setError('Property address is required')
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        setError('You must be logged in to create a transaction')
        setIsSubmitting(false)
        return
      }

      // Create transaction
      const { data: transaction, error: insertError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          property_address: propertyAddress,
          closing_date: closingDate || null,
          purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
          buyer_name: buyerName || null,
          seller_name: sellerName || null,
          property_type: propertyType || null,
          notes: notes || null,
          status: 'active',
        })
        .select()
        .single()

      if (insertError) {
        console.error('Insert error:', insertError)
        setError('Failed to create transaction')
        setIsSubmitting(false)
        return
      }

      setTransactionId(transaction.id)
      setStep('documents')
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUploadComplete = (document: {
    file_url: string
    file_name: string
    file_size: number
    file_type: string
    document_type?: DocumentType
  }) => {
    setUploadedDocuments((prev) => [...prev, document])
  }

  const handleFinish = () => {
    router.push(`/dashboard/transactions/${transactionId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/transactions" className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">New Transaction</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'details' ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'
              }`}>
                {step === 'details' ? (
                  <span>1</span>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${step === 'details' ? 'text-gray-900' : 'text-gray-500'}`}>
                Transaction Details
              </span>
            </div>

            <div className="flex-shrink-0 w-12 h-0.5 bg-gray-300"></div>

            <div className="flex items-center">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'documents' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className={`ml-2 text-sm font-medium ${step === 'documents' ? 'text-gray-900' : 'text-gray-500'}`}>
                Upload Documents
              </span>
            </div>
          </div>
        </div>

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

        {/* Step 1: Transaction Details */}
        {step === 'details' && (
          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={(e) => { e.preventDefault(); handleCreateTransaction(); }}>
              <div className="space-y-6">
                {/* Property Address */}
                <div>
                  <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123 Main St, City, State 12345"
                    required
                  />
                </div>

                {/* Closing Date */}
                <div>
                  <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Closing Date
                  </label>
                  <input
                    type="date"
                    id="closingDate"
                    value={closingDate}
                    onChange={(e) => setClosingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Purchase Price */}
                <div>
                  <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="purchasePrice"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="500000"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Buyer and Seller Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700 mb-1">
                      Buyer Name
                    </label>
                    <input
                      type="text"
                      id="buyerName"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700 mb-1">
                      Seller Name
                    </label>
                    <input
                      type="text"
                      id="sellerName"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="single_family">Single Family Home</option>
                    <option value="condo">Condominium</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="multi_family">Multi-Family</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional notes about this transaction..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <Link
                    href="/dashboard/transactions"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Upload Documents */}
        {step === 'documents' && transactionId && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Documents</h2>
              <p className="text-sm text-gray-600 mb-6">
                Upload any documents related to this transaction. You can skip this step and upload documents later.
              </p>

              <FileUpload
                transactionId={transactionId}
                onUploadComplete={handleUploadComplete}
                onUploadError={(error) => setError(error)}
                documentType="other"
              />

              {uploadedDocuments.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Uploaded Documents ({uploadedDocuments.length})
                  </h3>
                  <div className="space-y-2">
                    {uploadedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{doc.file_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep('details')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
