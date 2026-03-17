'use client'

import { useState } from 'react'
import type { Document, DocumentType } from '@/types/database'

interface DocumentListProps {
  documents: Document[]
  onDeleteDocument?: (documentId: string) => void
  onCategorizeDocument?: (documentId: string, documentType: DocumentType) => void
  isLoading?: boolean
}

const documentTypeLabels: Record<DocumentType, string> = {
  contract: 'Contract',
  inspection: 'Inspection',
  appraisal: 'Appraisal',
  disclosure: 'Disclosure',
  title: 'Title',
  insurance: 'Insurance',
  other: 'Other',
}

const documentTypeColors: Record<DocumentType, string> = {
  contract: 'bg-blue-100 text-blue-800',
  inspection: 'bg-yellow-100 text-yellow-800',
  appraisal: 'bg-purple-100 text-purple-800',
  disclosure: 'bg-orange-100 text-orange-800',
  title: 'bg-green-100 text-green-800',
  insurance: 'bg-pink-100 text-pink-800',
  other: 'bg-gray-100 text-gray-800',
}

export default function DocumentList({
  documents,
  onDeleteDocument,
  onCategorizeDocument,
  isLoading = false,
}: DocumentListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [categorizingId, setCategorizingId] = useState<string | null>(null)
  const [showCategorizeMenu, setShowCategorizeMenu] = useState<string | null>(null)

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size'
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleDelete = async (documentId: string) => {
    if (!onDeleteDocument) return

    if (!confirm('Are you sure you want to delete this document?')) {
      return
    }

    setDeletingId(documentId)
    try {
      await onDeleteDocument(documentId)
    } finally {
      setDeletingId(null)
    }
  }

  const handleCategorize = async (documentId: string, documentType: DocumentType) => {
    if (!onCategorizeDocument) return

    setCategorizingId(documentId)
    setShowCategorizeMenu(null)
    try {
      await onCategorizeDocument(documentId, documentType)
    } finally {
      setCategorizingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No documents yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Upload your first document to get started
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <div
          key={document.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* File Icon */}
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Document Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {document.file_name}
                  </h4>
                  {document.document_type && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        documentTypeColors[document.document_type]
                      }`}
                    >
                      {documentTypeLabels[document.document_type]}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{formatFileSize(document.file_size)}</span>
                  <span>•</span>
                  <span>Uploaded {formatDate(document.uploaded_at)}</span>
                  {document.extraction_status === 'completed' && (
                    <>
                      <span>•</span>
                      <span className="text-green-600">Data extracted</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              {/* Download */}
              <a
                href={document.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </a>

              {/* Categorize */}
              {onCategorizeDocument && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowCategorizeMenu(showCategorizeMenu === document.id ? null : document.id)
                    }
                    disabled={categorizingId === document.id}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {categorizingId === document.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-1"></div>
                    ) : (
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    )}
                    Categorize
                  </button>

                  {showCategorizeMenu === document.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        {Object.entries(documentTypeLabels).map(([type, label]) => (
                          <button
                            key={type}
                            onClick={() => handleCategorize(document.id, type as DocumentType)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Delete */}
              {onDeleteDocument && (
                <button
                  onClick={() => handleDelete(document.id)}
                  disabled={deletingId === document.id}
                  className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {deletingId === document.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></div>
                  ) : (
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
