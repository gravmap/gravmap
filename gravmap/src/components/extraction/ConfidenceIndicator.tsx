'use client'

import { getConfidenceLabel, type ConfidenceLevel } from '@/types/extraction'

interface ConfidenceIndicatorProps {
  confidence: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Visual indicator for extraction confidence levels
 * 
 * Colors:
 * - Green: 90-100% (High confidence)
 * - Yellow: 70-89% (Medium confidence)
 * - Red: 50-69% (Low confidence)
 * - Gray: 0-49% (Very low confidence)
 */
export default function ConfidenceIndicator({
  confidence,
  showLabel = false,
  size = 'md',
  className = '',
}: ConfidenceIndicatorProps) {
  const label = getConfidenceLabel(confidence)

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  const colorClasses: Record<ConfidenceLevel, string> = {
    high: 'bg-green-500',
    medium: 'bg-yellow-500',
    low: 'bg-red-500',
    none: 'bg-gray-400',
  }

  const labelColorClasses: Record<ConfidenceLevel, string> = {
    high: 'text-green-700',
    medium: 'text-yellow-700',
    low: 'text-red-700',
    none: 'text-gray-500',
  }

  const level = confidence >= 90 ? 'high' : confidence >= 70 ? 'medium' : confidence >= 50 ? 'low' : 'none'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative group">
        <div
          className={`${sizeClasses[size]} rounded-full ${colorClasses[level]}`}
          aria-label={label}
        />
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
          {confidence}% confidence - {label}
        </div>
      </div>

      {showLabel && (
        <span className={`text-sm ${labelColorClasses[level]}`}>
          {confidence}%
        </span>
      )}
    </div>
  )
}

/**
 * Badge-style confidence indicator
 */
export function ConfidenceBadge({ confidence }: { confidence: number }) {
  const level = confidence >= 90 ? 'high' : confidence >= 70 ? 'medium' : confidence >= 50 ? 'low' : 'none'

  const badgeClasses: Record<ConfidenceLevel, string> = {
    high: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-red-100 text-red-800 border-red-200',
    none: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  const emojiMap: Record<ConfidenceLevel, string> = {
    high: '🟢',
    medium: '🟡',
    low: '🔴',
    none: '⚪',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${badgeClasses[level]}`}
    >
      <span>{emojiMap[level]}</span>
      {confidence}%
    </span>
  )
}
