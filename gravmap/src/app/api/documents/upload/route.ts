import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  validateFile,
  uploadDocument,
  getDocumentUrl,
} from '@/lib/storage/client'
import type { DocumentType } from '@/types/database'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const transactionId = formData.get('transactionId') as string
    const documentType = (formData.get('documentType') as string) || 'other'

    // Validate inputs
    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 })
    }

    if (!transactionId) {
      return NextResponse.json({ message: 'Transaction ID is required' }, { status: 400 })
    }

    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      return NextResponse.json({ message: validation.error }, { status: 400 })
    }

    // Verify user owns the transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .select('id')
      .eq('id', transactionId)
      .eq('user_id', user.id)
      .single()

    if (transactionError || !transaction) {
      return NextResponse.json(
        { message: 'Transaction not found or access denied' },
        { status: 404 }
      )
    }

    // Upload file to storage
    const { path, error: uploadError } = await uploadDocument(transactionId, file)

    if (uploadError || !path) {
      return NextResponse.json(
        { message: uploadError || 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL
    const fileUrl = getDocumentUrl(path)

    // Create document record in database
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        transaction_id: transactionId,
        file_url: fileUrl,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        document_type: documentType as DocumentType,
        extraction_status: 'pending',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Try to clean up uploaded file
      // Note: In production, you might want to implement a cleanup job instead
      return NextResponse.json(
        { message: 'Failed to create document record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Document uploaded successfully',
      document: {
        id: document.id,
        file_url: document.file_url,
        file_name: document.file_name,
        file_size: document.file_size,
        file_type: document.file_type,
        document_type: document.document_type,
        uploaded_at: document.uploaded_at,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
