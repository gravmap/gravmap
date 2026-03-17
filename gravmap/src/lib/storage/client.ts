import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lazy-initialize Supabase client to avoid build-time errors
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

const getSupabase = () => {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// For backward compatibility, export supabase as a getter
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(target, prop) {
    return getSupabase()[prop as keyof typeof target]
  }
})

// Storage bucket name
export const STORAGE_BUCKET = 'transaction-documents'

// Folder structure for documents
export const getDocumentPath = (transactionId: string, fileName: string) => {
  return `transactions/${transactionId}/documents/${fileName}`
}

// File validation constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = ['application/pdf']

// Helper to validate file before upload
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PDF files are allowed' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  return { valid: true }
}

// Helper to generate unique filename
export const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(7)
  const extension = originalName.split('.').pop()
  const baseName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_')
  return `${baseName}_${timestamp}_${randomStr}.${extension}`
}

// Upload document to storage
export const uploadDocument = async (
  transactionId: string,
  file: File
): Promise<{ path: string; error?: string }> => {
  try {
    const validation = validateFile(file)
    if (!validation.valid) {
      return { path: '', error: validation.error }
    }

    const fileName = generateUniqueFileName(file.name)
    const filePath = getDocumentPath(transactionId, fileName)

    const client = getSupabase()
    const { data, error } = await client
      .storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return { path: '', error: error.message }
    }

    return { path: data.path }
  } catch (err) {
    console.error('Upload exception:', err)
    return { path: '', error: 'Failed to upload file' }
  }
}

// Get public URL for a document
export const getDocumentUrl = (path: string): string => {
  const client = getSupabase()
  const { data } = client.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// Delete document from storage
export const deleteDocument = async (path: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const client = getSupabase()
    const { error } = await client.storage.from(STORAGE_BUCKET).remove([path])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Delete exception:', err)
    return { success: false, error: 'Failed to delete file' }
  }
}
