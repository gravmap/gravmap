import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export interface NotificationSettings {
  emailReminders: boolean
  smsNotifications: boolean
  weeklyDigest: boolean
  dailyDigest: boolean
  productUpdates: boolean
  reminderDays: number[]
  digestTime: string
}

const defaultSettings: NotificationSettings = {
  emailReminders: true,
  smsNotifications: false,
  weeklyDigest: true,
  dailyDigest: false,
  productUpdates: true,
  reminderDays: [7, 3, 1],
  digestTime: '09:00',
}

/**
 * GET /api/user/notification-settings
 * 
 * Get the current user's notification settings
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's notification settings
    const { data: userData, error } = await supabase
      .from('users')
      .select('notification_settings, phone_number')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Failed to fetch notification settings:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch settings' },
        { status: 500 }
      )
    }

    // Merge with defaults
    const settings: NotificationSettings = {
      ...defaultSettings,
      ...(userData?.notification_settings as Partial<NotificationSettings> || {}),
    }

    return NextResponse.json({
      success: true,
      settings,
      phoneNumber: userData?.phone_number || null,
    })
  } catch (error) {
    console.error('Get notification settings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get settings' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/user/notification-settings
 * 
 * Update the current user's notification settings
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { settings, phoneNumber } = body as { 
      settings: Partial<NotificationSettings>
      phoneNumber?: string 
    }

    // Validate settings
    if (settings.reminderDays) {
      if (!Array.isArray(settings.reminderDays) || 
          !settings.reminderDays.every(d => typeof d === 'number' && d > 0 && d <= 30)) {
        return NextResponse.json(
          { success: false, error: 'Invalid reminder days' },
          { status: 400 }
        )
      }
    }

    if (settings.digestTime && !/^\d{2}:\d{2}$/.test(settings.digestTime)) {
      return NextResponse.json(
        { success: false, error: 'Invalid digest time format (use HH:MM)' },
        { status: 400 }
      )
    }

    // Update user settings
    const updateData: { notification_settings?: NotificationSettings; phone_number?: string | null } = {}
    
    if (settings) {
      // Get current settings first
      const { data: currentData } = await supabase
        .from('users')
        .select('notification_settings')
        .eq('id', user.id)
        .single()

      const currentSettings = (currentData?.notification_settings as NotificationSettings) || defaultSettings
      updateData.notification_settings = {
        ...currentSettings,
        ...settings,
      }
    }

    if (phoneNumber !== undefined) {
      updateData.phone_number = phoneNumber || null
    }

    const { error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id)

    if (updateError) {
      console.error('Failed to update notification settings:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      settings: updateData.notification_settings,
      phoneNumber: updateData.phone_number,
    })
  } catch (error) {
    console.error('Update notification settings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
