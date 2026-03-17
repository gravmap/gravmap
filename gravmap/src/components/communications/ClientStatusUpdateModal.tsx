'use client'

import { useState } from 'react'
import type { Transaction, TimelineEvent } from '@/types/database'

interface ClientStatusUpdateModalProps {
  transaction: Transaction
  upcomingEvents: TimelineEvent[]
  completedEvents: TimelineEvent[]
  onClose: () => void
  onSuccess: () => void
}

export default function ClientStatusUpdateModal({
  transaction,
  upcomingEvents,
  completedEvents,
  onClose,
  onSuccess,
}: ClientStatusUpdateModalProps) {
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  const handleSend = async () => {
    if (!recipientEmail) {
      setError('Please enter a recipient email')
      return
    }

    setSending(true)
    setError(null)

    try {
      const response = await fetch(`/api/transactions/${transaction.id}/send-status-update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail,
          recipientName: recipientName || undefined,
          customMessage: customMessage || undefined,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to send email')
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email')
    } finally {
      setSending(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Send Status Update</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setPreviewMode(false)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                !previewMode
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Compose
            </button>
            <button
              onClick={() => setPreviewMode(true)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                previewMode
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
          </div>

          {!previewMode ? (
            <div className="space-y-4">
              {/* Recipient */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Email *
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Name (optional)
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Message (optional)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                  placeholder="Add a personal message to your client..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use a default message
                </p>
              </div>

              {/* Included Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Email will include:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Property address: {transaction.property_address}</li>
                  {transaction.purchase_price && (
                    <li>• Purchase price: ${transaction.purchase_price.toLocaleString()}</li>
                  )}
                  {transaction.closing_date && (
                    <li>• Closing date: {formatDate(transaction.closing_date)}</li>
                  )}
                  <li>• {completedEvents.length} completed milestone(s)</li>
                  <li>• {upcomingEvents.length} upcoming milestone(s)</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center pb-4 border-b mb-4">
                  <div className="text-2xl font-bold text-blue-600">🏠 GravMap</div>
                </div>

                <p className="mb-4">
                  Dear {recipientName || 'Client'},
                </p>

                {customMessage ? (
                  <div className="bg-gray-100 p-4 rounded mb-4">
                    {customMessage.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                ) : (
                  <p className="mb-4">
                    I wanted to provide you with an update on your transaction at {transaction.property_address}.
                  </p>
                )}

                <h3 className="font-semibold text-gray-900 mb-2">Transaction Overview</h3>
                <table className="w-full text-sm mb-4">
                  <tbody>
                    <tr>
                      <td className="py-1 text-gray-500">Property:</td>
                      <td className="py-1">{transaction.property_address}</td>
                    </tr>
                    {transaction.purchase_price && (
                      <tr>
                        <td className="py-1 text-gray-500">Price:</td>
                        <td className="py-1">${transaction.purchase_price.toLocaleString()}</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {upcomingEvents.length > 0 && (
                  <>
                    <h4 className="font-medium text-gray-900 mb-2">📅 Upcoming Milestones</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      {upcomingEvents.slice(0, 3).map(event => (
                        <li key={event.id} className="flex justify-between">
                          <span>{event.event_name}</span>
                          <span className="text-gray-500">{formatDate(event.event_date)}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={sending || !recipientEmail}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
