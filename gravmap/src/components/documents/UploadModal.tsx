'use client'

import { useEffect } from 'react'
import FileUpload from './FileUpload'
import type { DocumentType } from '@/types/database'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  transactionId: string
  onUploadComplete?: (document: {
    file_url: string
    file_name: string
    file_size: number
    file_type: string
    document_type?: DocumentType
  }) => void
  onUploadError?: (error: string) => void
  documentType?: DocumentType
}

export default function UploadModal({
  isOpen,
  onClose,
  transactionId,
  onUploadComplete,
  onUploadError,
  documentType = 'other',
}: UploadModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleUploadComplete = (document: {
    file_url: string
    file_name: string
    file_size: number
    file_type: string
    document_type?: DocumentType
  }) => {
    onUploadComplete?.(document)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Document</h2>
            
            <FileUpload
              transactionId={transactionId}
              onUploadComplete={handleUploadComplete}
              onUploadError={onUploadError}
              documentType={documentType}
            />

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
