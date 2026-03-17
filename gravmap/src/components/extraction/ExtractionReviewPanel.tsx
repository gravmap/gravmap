'use client'

import { useState, useEffect } from 'react'
import type { ContractExtractionResult } from '@/types/extraction'
import ExtractedField from './ExtractedField'
import ConfidenceIndicator from './ConfidenceIndicator'

interface ExtractionReviewPanelProps {
  documentId: string
  documentUrl: string
  extractionStatus: 'pending' | 'processing' | 'completed' | 'failed'
  existingExtraction?: ContractExtractionResult
  onConfirm: (data: ContractExtractionResult) => Promise<void>
  onReExtract?: () => void
}

/**
 * Main UI for reviewing and confirming extracted contract data
 */
export default function ExtractionReviewPanel({
  documentId,
  documentUrl,
  extractionStatus,
  existingExtraction,
  onConfirm,
  onReExtract,
}: ExtractionReviewPanelProps) {
  const [extractedData, setExtractedData] = useState<ContractExtractionResult | null>(
    existingExtraction || null
  )
  const [isExtracting, setIsExtracting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [extractionAttempted, setExtractionAttempted] = useState(false)

  // Trigger extraction if status is pending
  useEffect(() => {
    if (extractionStatus === 'pending' && !extractionAttempted && !extractedData) {
      handleExtract()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extractionStatus, extractionAttempted, extractedData])

  const handleExtract = async () => {
    setIsExtracting(true)
    setError(null)
    setExtractionAttempted(true)

    try {
      const response = await fetch('/api/extract-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId,
          documentUrl,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Extraction failed')
      }

      setExtractedData(data.extractedData)
    } catch (err) {
      console.error('Extraction error:', err)
      setError(err instanceof Error ? err.message : 'Failed to extract contract data')
    } finally {
      setIsExtracting(false)
    }
  }

  const handleFieldEdit = (fieldPath: string, newValue: string | number | null) => {
    if (!extractedData) return

    // Update the specific field in extractedData
    const updated = { ...extractedData }
    const keys = fieldPath.split('.')
    
    if (keys.length === 1) {
      // Top-level field - use type assertion to allow dynamic field access
      const fieldName = keys[0] as keyof ContractExtractionResult
      if (fieldName in updated) {
        // Cast through unknown to avoid TypeScript error
        ;(updated as unknown as Record<string, { value: unknown; confidence: number }>)[fieldName] = {
          value: newValue,
          confidence: 100, // User-edited = 100% confidence
        }
      }
    } else if (keys.length === 2) {
      // Nested field (e.g., contingency_dates.inspection)
      const [parent, child] = keys
      if (parent === 'contingency_dates') {
        updated.contingency_dates[child] = {
          value: newValue as string,
          confidence: 100,
        }
      }
    }

    setExtractedData(updated)
  }

  const handleConfirm = async () => {
    if (!extractedData) return

    setIsSaving(true)
    setError(null)

    try {
      await onConfirm(extractedData)
    } catch (err) {
      console.error('Confirm error:', err)
      setError(err instanceof Error ? err.message : 'Failed to save confirmed data')
    } finally {
      setIsSaving(false)
    }
  }

  // Loading state during extraction
  if (isExtracting || extractionStatus === 'processing') {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Analyzing Contract...
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            GPT-4 Vision is extracting key information from your document
          </p>
          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Loading document...
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Analyzing content...
            </div>
            <div className="flex items-center text-sm text-blue-600">
              <div className="h-4 w-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Extracting data...
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Extraction Failed</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleExtract}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
            {onReExtract && (
              <button
                onClick={onReExtract}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // No data yet
  if (!extractedData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No extraction data available</p>
          <button
            onClick={handleExtract}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Extract Data
          </button>
        </div>
      </div>
    )
  }

  // Success - show extraction results
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Extracted Data</h3>
            <p className="text-sm text-gray-500 mt-1">
              Review and confirm the extracted information below
            </p>
          </div>
          {onReExtract && (
            <button
              onClick={onReExtract}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Re-extract
            </button>
          )}
        </div>
      </div>

      {/* Extraction Quality Summary */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Overall Confidence</p>
            <p className="text-xs text-blue-700">
              {calculateAverageConfidence(extractedData)}% average across all fields
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>High (90-100%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span>Medium (70-89%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>Low (50-69%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Extracted Fields */}
      <div className="p-6 space-y-6">
        {/* Transaction Details Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Transaction Details
          </h4>
          <div className="divide-y divide-gray-200">
            <ExtractedField
              label="Property Address"
              field={extractedData.property_address}
              onEdit={(value) => handleFieldEdit('property_address', value)}
              type="text"
            />
            <ExtractedField
              label="Purchase Price"
              field={extractedData.purchase_price}
              onEdit={(value) => handleFieldEdit('purchase_price', value)}
              type="number"
            />
            <ExtractedField
              label="Closing Date"
              field={extractedData.closing_date}
              onEdit={(value) => handleFieldEdit('closing_date', value)}
              type="date"
            />
          </div>
        </div>

        {/* Parties Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Parties
          </h4>
          <div className="divide-y divide-gray-200">
            <ExtractedField
              label="Buyer Name"
              field={extractedData.buyer_name}
              onEdit={(value) => handleFieldEdit('buyer_name', value)}
            />
            <ExtractedField
              label="Seller Name"
              field={extractedData.seller_name}
              onEdit={(value) => handleFieldEdit('seller_name', value)}
            />
          </div>
        </div>

        {/* Contingency Dates Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Contingency Dates
          </h4>
          <div className="divide-y divide-gray-200">
            <ExtractedField
              label="Inspection Deadline"
              field={extractedData.contingency_dates.inspection}
              onEdit={(value) => handleFieldEdit('contingency_dates.inspection', value)}
              type="date"
            />
            <ExtractedField
              label="Financing Deadline"
              field={extractedData.contingency_dates.financing}
              onEdit={(value) => handleFieldEdit('contingency_dates.financing', value)}
              type="date"
            />
            <ExtractedField
              label="Appraisal Deadline"
              field={extractedData.contingency_dates.appraisal}
              onEdit={(value) => handleFieldEdit('contingency_dates.appraisal', value)}
              type="date"
            />
          </div>
        </div>

        {/* Additional Dates */}
        {extractedData.additional_dates && extractedData.additional_dates.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Additional Dates
            </h4>
            <div className="divide-y divide-gray-200">
              {extractedData.additional_dates.map((date, index) => (
                <div key={index} className="py-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {date.name}
                      </label>
                      <div className="text-sm text-gray-900">
                        {new Date(date.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ConfidenceIndicator confidence={date.confidence} />
                      <span className="text-sm text-gray-600">{date.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extraction Notes */}
        {extractedData.extraction_notes && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">AI Notes</p>
            <p className="text-sm text-gray-600">{extractedData.extraction_notes}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Edit any field above before confirming
          </p>
          <button
            onClick={handleConfirm}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Confirm & Create Timeline'}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Calculate average confidence across all extracted fields
 */
function calculateAverageConfidence(data: ContractExtractionResult): number {
  const confidences: number[] = []

  // Add main fields
  if (data.closing_date.confidence > 0) confidences.push(data.closing_date.confidence)
  if (data.buyer_name.confidence > 0) confidences.push(data.buyer_name.confidence)
  if (data.seller_name.confidence > 0) confidences.push(data.seller_name.confidence)
  if (data.property_address.confidence > 0) confidences.push(data.property_address.confidence)
  if (data.purchase_price.confidence > 0) confidences.push(data.purchase_price.confidence)

  // Add contingency dates
  Object.values(data.contingency_dates).forEach((field) => {
    if (field.confidence > 0) confidences.push(field.confidence)
  })

  // Add additional dates
  data.additional_dates?.forEach((date) => {
    if (date.confidence > 0) confidences.push(date.confidence)
  })

  if (confidences.length === 0) return 0

  return Math.round(confidences.reduce((a, b) => a + b, 0) / confidences.length)
}
