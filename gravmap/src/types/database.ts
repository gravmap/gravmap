// Database types for Supabase tables

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ============================================================================
// USERS
// ============================================================================

export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'team'

export interface User {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  subscription_tier: SubscriptionTier
  stripe_customer_id: string | null
  created_at: string
  updated_at: string
}

export interface UserInsert {
  id: string
  email: string
  name?: string | null
  avatar_url?: string | null
  subscription_tier?: SubscriptionTier
  stripe_customer_id?: string | null
}

export interface UserUpdate {
  email?: string
  name?: string | null
  avatar_url?: string | null
  subscription_tier?: SubscriptionTier
  stripe_customer_id?: string | null
}

// ============================================================================
// TRANSACTIONS
// ============================================================================

export type TransactionStatus = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled'

export interface Transaction {
  id: string
  user_id: string
  property_address: string
  status: TransactionStatus
  closing_date: string | null
  purchase_price: number | null
  buyer_name: string | null
  seller_name: string | null
  property_type: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface TransactionInsert {
  user_id: string
  property_address: string
  status?: TransactionStatus
  closing_date?: string | null
  purchase_price?: number | null
  buyer_name?: string | null
  seller_name?: string | null
  property_type?: string | null
  notes?: string | null
}

export interface TransactionUpdate {
  property_address?: string
  status?: TransactionStatus
  closing_date?: string | null
  purchase_price?: number | null
  buyer_name?: string | null
  seller_name?: string | null
  property_type?: string | null
  notes?: string | null
}

// Transaction with related data
export interface TransactionWithDetails extends Transaction {
  documents: Document[]
  timeline_events: TimelineEvent[]
  communications: Communication[]
  document_count?: number
  upcoming_events_count?: number
}

// ============================================================================
// DOCUMENTS
// ============================================================================

export type DocumentType = 
  | 'contract' 
  | 'inspection' 
  | 'appraisal' 
  | 'disclosure' 
  | 'title' 
  | 'insurance' 
  | 'other'

export type ExtractionStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface ExtractedData {
  closing_date?: string
  purchase_price?: number
  buyer_name?: string
  seller_name?: string
  property_address?: string
  contingencies?: Array<{
    type: string
    date: string
    description?: string
  }>
  confidence_score?: number
  extracted_at?: string
}

export interface Document {
  id: string
  transaction_id: string
  file_url: string
  file_name: string
  file_size: number | null
  file_type: string | null
  document_type: DocumentType | null
  extracted_data: ExtractedData | null
  extraction_status: ExtractionStatus
  uploaded_at: string
}

export interface DocumentInsert {
  transaction_id: string
  file_url: string
  file_name: string
  file_size?: number | null
  file_type?: string | null
  document_type?: DocumentType | null
  extracted_data?: ExtractedData | null
  extraction_status?: ExtractionStatus
}

export interface DocumentUpdate {
  document_type?: DocumentType | null
  extracted_data?: ExtractedData | null
  extraction_status?: ExtractionStatus
}

// ============================================================================
// TIMELINE EVENTS
// ============================================================================

export type EventType = 
  | 'closing'
  | 'inspection'
  | 'appraisal'
  | 'financing'
  | 'title_search'
  | 'insurance'
  | 'contingency'
  | 'other'

export type EventStatus = 'upcoming' | 'completed' | 'overdue' | 'cancelled'

export interface TimelineEvent {
  id: string
  transaction_id: string
  event_name: string
  event_date: string
  event_type: EventType | null
  status: EventStatus
  description: string | null
  reminder_sent: boolean
  reminder_dates: string[] // JSON array of ISO date strings
  created_at: string
  updated_at: string
}

export interface TimelineEventInsert {
  transaction_id: string
  event_name: string
  event_date: string
  event_type?: EventType | null
  status?: EventStatus
  description?: string | null
  reminder_sent?: boolean
  reminder_dates?: string[]
}

export interface TimelineEventUpdate {
  event_name?: string
  event_date?: string
  event_type?: EventType | null
  status?: EventStatus
  description?: string | null
  reminder_sent?: boolean
  reminder_dates?: string[]
}

// ============================================================================
// COMMUNICATIONS
// ============================================================================

export type EmailType = 
  | 'status_update'
  | 'deadline_reminder'
  | 'document_request'
  | 'custom'

export type CommunicationStatus = 'draft' | 'scheduled' | 'sent' | 'failed'

export interface Communication {
  id: string
  transaction_id: string
  recipient_email: string
  recipient_name: string | null
  subject: string
  body: string
  email_type: EmailType | null
  sent_at: string | null
  opened_at: string | null
  status: CommunicationStatus
  created_at: string
}

export interface CommunicationInsert {
  transaction_id: string
  recipient_email: string
  recipient_name?: string | null
  subject: string
  body: string
  email_type?: EmailType | null
  sent_at?: string | null
  opened_at?: string | null
  status?: CommunicationStatus
}

export interface CommunicationUpdate {
  recipient_email?: string
  recipient_name?: string | null
  subject?: string
  body?: string
  email_type?: EmailType | null
  sent_at?: string | null
  opened_at?: string | null
  status?: CommunicationStatus
}

// ============================================================================
// DATABASE SCHEMA TYPE
// ============================================================================

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: UserInsert
        Update: UserUpdate
      }
      transactions: {
        Row: Transaction
        Insert: TransactionInsert
        Update: TransactionUpdate
      }
      documents: {
        Row: Document
        Insert: DocumentInsert
        Update: DocumentUpdate
      }
      timeline_events: {
        Row: TimelineEvent
        Insert: TimelineEventInsert
        Update: TimelineEventUpdate
      }
      communications: {
        Row: Communication
        Insert: CommunicationInsert
        Update: CommunicationUpdate
      }
    }
  }
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface AuthUser {
  id: string
  email: string
  email_confirmed_at?: string
  user_metadata: {
    name?: string
    avatar_url?: string
  }
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
}
