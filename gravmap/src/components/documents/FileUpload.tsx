'use client'

import { useState, useRef, useCallback } from 'react'
import { validateFile, MAX_FILE_SIZE } from '@/lib/storage/client'
import type { DocumentType } from '@/types/database'

interface FileUploadProps {
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
  className?: string
}

interface UploadingFile {
  file: File
  progress: number
  error?: string
}

export default function FileUpload({
  transactionId,
  onUploadComplete,
  onUploadError,
  documentType = 'other',
  className = '',
}: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true)
    }
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const uploadFile = async (file: File) => {
    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      onUploadError?.(validation.error || 'Invalid file')
      return
    }

    // Add to uploading files
    const uploadingFile: UploadingFile = {
      file,
      progress: 0,
    }
    setUploadingFiles((prev) => [...prev, uploadingFile])

    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('transactionId', transactionId)
      formData.append('documentType', documentType)

      // Upload via API route
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Upload failed')
      }

      const data = await response.json()

      // Remove from uploading files
      setUploadingFiles((prev) => prev.filter((f) => f.file !== file))

      // Notify parent
      onUploadComplete?.(data.document)
    } catch (error) {
      console.error('Upload error:', error)
      
      // Update uploading file with error
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.file === file
            ? { ...f, error: error instanceof Error ? error.message : 'Upload failed' }
            : f
        )
      )

      onUploadError?.(error instanceof Error ? error.message : 'Upload failed')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    files.forEach((file) => uploadFile(file))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => uploadFile(file))
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
          multiple
        />

        <svg
          className={`mx-auto h-12 w-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="mt-4">
          <p className="text-base font-medium text-gray-900">
            {isDragActive ? 'Drop files here' : 'Drag and drop files here'}
          </p>
          <p className="mt-1 text-sm text-gray-500">or click to browse</p>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>PDF files only • Max size: {formatFileSize(MAX_FILE_SIZE)}</p>
        </div>
      </div>

      {/* Uploading Files List */}
      {uploadingFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadingFiles.map((uploadingFile, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-8 w-8 text-gray-400"
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
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {uploadingFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(uploadingFile.file.size)}
                    </p>
                  </div>
                </div>

                {uploadingFile.error ? (
                  <span className="text-sm text-red-600">{uploadingFile.error}</span>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">Uploading...</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {!uploadingFile.error && uploadingFile.progress > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadingFile.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
