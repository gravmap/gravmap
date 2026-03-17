import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { deleteDocument } from '@/lib/storage/client'

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

    // Parse request body
    const body = await request.json()
    const { documentId, fileUrl } = body

    if (!documentId || !fileUrl) {
      return NextResponse.json(
        { message: 'Document ID and file URL are required' },
        { status: 400 }
      )
    }

    // Get document from database
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('*, transactions!inner(user_id)')
      .eq('id', documentId)
      .single()

    if (docError || !document) {
      return NextResponse.json({ message: 'Document not found' }, { status: 404 })
    }

    // Verify user owns the transaction
    const transaction = document.transactions as { user_id: string }
    if (transaction.user_id !== user.id) {
      return NextResponse.json(
        { message: 'Access denied' },
        { status: 403 }
      )
    }

    // Extract storage path from URL
    // URL format: https://xxx.supabase.co/storage/v1/object/public/transaction-documents/transactions/{id}/documents/{filename}
    const urlParts = fileUrl.split('/transaction-documents/')
    if (urlParts.length < 2) {
      return NextResponse.json(
        { message: 'Invalid file URL' },
        { status: 400 }
      )
    }

    const filePath = urlParts[1]

    // Delete from storage
    const { success, error: storageError } = await deleteDocument(filePath)

    if (!success) {
      console.error('Storage delete error:', storageError)
      // Continue even if storage delete fails - database record is more important
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId)

    if (dbError) {
      console.error('Database delete error:', dbError)
      return NextResponse.json(
        { message: 'Failed to delete document record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Document deleted successfully',
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
