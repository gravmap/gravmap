'use client'

import { useState, useEffect } from 'react'
import type { TimelineEvent, EventStatus } from '@/types/database'

interface TimelineViewProps {
  transactionId: string
  editable?: boolean
  onEventUpdate?: (eventId: string, updates: Partial<TimelineEvent>) => Promise<void>
}

type FilterStatus = 'all' | EventStatus

const eventTypeIcons: Record<string, string> = {
  closing: '🏠',
  inspection: '🔍',
  appraisal: '📊',
  financing: '💰',
  title_search: '📋',
  insurance: '🛡️',
  contingency: '⚠️',
  other: '📌',
}

const statusColors: Record<EventStatus, { bg: string; text: string; border: string }> = {
  upcoming: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200' 
  },
  completed: { 
    bg: 'bg-green-50', 
    text: 'text-green-700', 
    border: 'border-green-200' 
  },
  overdue: { 
    bg: 'bg-red-50', 
    text: 'text-red-700', 
    border: 'border-red-200' 
  },
  cancelled: { 
    bg: 'bg-gray-50', 
    text: 'text-gray-500', 
    border: 'border-gray-200' 
  },
}

const filterButtons: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'completed', label: 'Completed' },
]

export default function TimelineView({ 
  transactionId, 
  editable = true,
  onEventUpdate 
}: TimelineViewProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    loadTimeline()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId])

  const loadTimeline = async () => {
    setLoading(true)
    setError(null)

    try {
      // Refresh timeline to update statuses
      const response = await fetch(`/api/transactions/${transactionId}/generate-timeline`)
      
      if (!response.ok) {
        throw new Error('Failed to load timeline')
      }

      const data = await response.json()
      setEvents(data.events || [])
    } catch (err) {
      console.error('Error loading timeline:', err)
      setError('Failed to load timeline')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkComplete = async (eventId: string) => {
    if (!onEventUpdate) return

    setUpdatingId(eventId)
    try {
      await onEventUpdate(eventId, { status: 'completed' })
      setEvents(prev => 
        prev.map(e => 
          e.id === eventId ? { ...e, status: 'completed' as EventStatus } : e
        )
      )
    } catch (err) {
      console.error('Error updating event:', err)
      setError('Failed to update event')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleMarkCancelled = async (eventId: string) => {
    if (!onEventUpdate) return

    setUpdatingId(eventId)
    try {
      await onEventUpdate(eventId, { status: 'cancelled' })
      setEvents(prev => 
        prev.map(e => 
          e.id === eventId ? { ...e, status: 'cancelled' as EventStatus } : e
        )
      )
    } catch (err) {
      console.error('Error updating event:', err)
      setError('Failed to update event')
    } finally {
      setUpdatingId(null)
    }
  }

  const getDaysUntil = (dateString: string): number => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)
    const diffTime = date.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true
    return event.status === filter
  })

  // Sort by date
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Transaction Timeline</h3>
        <button
          onClick={loadTimeline}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {filterButtons.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              filter === value
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Timeline */}
      {sortedEvents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'No timeline events yet. Upload and extract a contract to generate events.'
              : `No ${filter} events`}
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Events */}
          <div className="space-y-4">
            {sortedEvents.map((event) => {
              const days = getDaysUntil(event.event_date)
              const colors = statusColors[event.status]
              const icon = eventTypeIcons[event.event_type || 'other']

              return (
                <div 
                  key={event.id} 
                  className={`relative pl-14 pb-4 ${event.status === 'cancelled' ? 'opacity-50' : ''}`}
                >
                  {/* Icon circle */}
                  <div 
                    className={`absolute left-3 w-6 h-6 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center text-sm`}
                  >
                    {icon}
                  </div>

                  {/* Event Card */}
                  <div className={`bg-white border ${colors.border} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-gray-900">{event.event_name}</h4>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>
                            {event.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{formatDate(event.event_date)}</p>
                        {event.description && (
                          <p className="text-sm text-gray-500 mt-2">{event.description}</p>
                        )}
                      </div>

                      {/* Days indicator and actions */}
                      <div className="flex flex-col items-end gap-2">
                        {event.status !== 'completed' && event.status !== 'cancelled' && (
                          <>
                            <div className={`text-lg font-semibold ${
                              days < 0 ? 'text-gray-400' :
                              days === 0 ? 'text-orange-600' :
                              days <= 3 ? 'text-red-600' :
                              days <= 7 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {days < 0 ? `${Math.abs(days)}d ago` :
                               days === 0 ? 'Today!' :
                               `${days}d`}
                            </div>
                            {editable && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleMarkComplete(event.id)}
                                  disabled={updatingId === event.id}
                                  className="text-xs px-2 py-1 text-green-600 hover:bg-green-50 rounded border border-green-200 disabled:opacity-50"
                                >
                                  ✓ Complete
                                </button>
                                <button
                                  onClick={() => handleMarkCancelled(event.id)}
                                  disabled={updatingId === event.id}
                                  className="text-xs px-2 py-1 text-gray-500 hover:bg-gray-50 rounded border border-gray-200 disabled:opacity-50"
                                >
                                  ✕ Cancel
                                </button>
                              </div>
                            )}
                          </>
                        )}
                        {event.reminder_sent && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Reminder sent
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {events.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{events.length}</div>
            <div className="text-xs text-gray-500">Total Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {events.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-xs text-gray-500">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {events.filter(e => e.status === 'overdue').length}
            </div>
            <div className="text-xs text-gray-500">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {events.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
        </div>
      )}
    </div>
  )
}
