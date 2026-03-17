'use client'

import { useState } from 'react'
import { ConfidenceBadge } from './ConfidenceIndicator'
import type { ExtractedField } from '@/types/extraction'

interface ExtractedFieldProps {
  label: string
  field: ExtractedField<string | number | null>
  onEdit?: (newValue: string | number | null) => void
  isEditing?: boolean
  disabled?: boolean
  type?: 'text' | 'date' | 'number'
}

/**
 * Display a single extracted field with confidence indicator and edit capability
 */
export default function ExtractedFieldComponent({
  label,
  field,
  onEdit,
  isEditing: externalIsEditing,
  disabled = false,
  type = 'text',
}: ExtractedFieldProps) {
  const [internalIsEditing, setInternalIsEditing] = useState(false)
  const [editValue, setEditValue] = useState<string | number>(
    field.value?.toString() || ''
  )

  const isEditing = externalIsEditing ?? internalIsEditing

  const handleStartEdit = () => {
    if (disabled || !onEdit) return
    setInternalIsEditing(true)
    setEditValue(field.value?.toString() || '')
  }

  const handleSave = () => {
    if (onEdit) {
      let parsedValue: string | number | null = editValue || null
      
      if (type === 'number' && editValue) {
        parsedValue = parseFloat(editValue.toString()) || null
      }
      
      onEdit(parsedValue)
    }
    setInternalIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(field.value?.toString() || '')
    setInternalIsEditing(false)
  }

  const formatValue = () => {
    if (field.value === null || field.value === undefined) {
      return <span className="text-gray-400 italic">Not found</span>
    }

    if (type === 'number') {
      // Format as currency if it's a price
      if (label.toLowerCase().includes('price')) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(field.value as number)
      }
      return field.value.toLocaleString()
    }

    if (type === 'date') {
      try {
        const date = new Date(field.value as string)
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      } catch {
        return field.value
      }
    }

    return field.value
  }

  return (
    <div className="py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-900">{formatValue()}</div>
              {onEdit && !disabled && (
                <button
                  onClick={handleStartEdit}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Edit
                </button>
              )}
            </div>
          )}

          {field.notes && (
            <p className="text-xs text-gray-500 mt-1">{field.notes}</p>
          )}
        </div>

        <ConfidenceBadge confidence={field.confidence} />
      </div>
    </div>
  )
}
