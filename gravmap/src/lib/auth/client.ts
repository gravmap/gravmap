// Authentication utilities and helpers

import { createClient } from '@/lib/supabase/client'
import type { User, AuthUser, ApiResponse } from '@/types/database'

// ============================================================================
// SIGN UP
// ============================================================================

export interface SignUpData {
  email: string
  password: string
  name?: string
}

export async function signUp(data: SignUpData): Promise<ApiResponse<AuthUser>> {
  const supabase = createClient()
  
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name || null,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'Failed to create user',
      }
    }

    return {
      success: true,
      data: {
        id: authData.user.id,
        email: authData.user.email!,
        email_confirmed_at: authData.user.email_confirmed_at || undefined,
        user_metadata: authData.user.user_metadata,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// ============================================================================
// SIGN IN
// ============================================================================

export interface SignInData {
  email: string
  password: string
}

export async function signIn(data: SignInData): Promise<ApiResponse<AuthUser>> {
  const supabase = createClient()
  
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'Failed to sign in',
      }
    }

    return {
      success: true,
      data: {
        id: authData.user.id,
        email: authData.user.email!,
        email_confirmed_at: authData.user.email_confirmed_at || undefined,
        user_metadata: authData.user.user_metadata,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// ============================================================================
// SIGN OUT
// ============================================================================

export async function signOut(): Promise<ApiResponse> {
  const supabase = createClient()
  
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// ============================================================================
// PASSWORD RESET
// ============================================================================

export async function resetPassword(email: string): Promise<ApiResponse> {
  const supabase = createClient()
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// ============================================================================
// UPDATE PASSWORD
// ============================================================================

export async function updatePassword(newPassword: string): Promise<ApiResponse> {
  const supabase = createClient()
  
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// ============================================================================
// GOOGLE OAUTH
// ============================================================================

export async function signInWithGoogle(): Promise<void> {
  const supabase = createClient()
  
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}

// ============================================================================
// GET CURRENT USER
// ============================================================================

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    return {
      id: user.id,
      email: user.email!,
      email_confirmed_at: user.email_confirmed_at || undefined,
      user_metadata: user.user_metadata,
    }
  } catch {
    return null
  }
}

// ============================================================================
// GET USER PROFILE
// ============================================================================

export async function getUserProfile(): Promise<User | null> {
  const supabase = createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return profile
  } catch {
    return null
  }
}

// ============================================================================
// UPDATE USER PROFILE
// ============================================================================

export async function updateUserProfile(updates: {
  name?: string
  avatar_url?: string
}): Promise<ApiResponse<User>> {
  const supabase = createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return {
        success: false,
        error: 'Not authenticated',
      }
    }

    // Update auth metadata
    await supabase.auth.updateUser({
      data: updates,
    })

    // Update public profile
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// ============================================================================
// RESEND CONFIRMATION EMAIL
// ============================================================================

export async function resendConfirmationEmail(email: string): Promise<ApiResponse> {
  const supabase = createClient()
  
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}
