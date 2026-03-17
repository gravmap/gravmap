// Re-export database types
export * from './database'

// Core application types
export interface User {
  id: string
  email: string
  created_at: string
}

// Legacy support - will be removed
export type { User as LegacyUser } from './database'
