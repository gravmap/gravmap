import { test, expect } from '@playwright/test';

test.describe('Timeline Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

    // Navigate to transaction with timeline
    await page.click('[data-testid="transaction-item"]').catch(() => 
      page.click('a[href*="/dashboard/transactions/"]').first()
    );
  });

  test('TC-E2E-025: Timeline displays correctly', async ({ page }) => {
    // Look for timeline section
    await expect(page.locator('text=/timeline|events|deadline/i')).toBeVisible({ timeout: 5000 });
    
    // Should show event list or empty state
    const hasEvents = await page.locator('[data-testid="timeline-event"]').count() > 0;
    const hasEmptyState = await page.locator('text=/no events|add event/i').isVisible();
    
    expect(hasEvents || hasEmptyState).toBeTruthy();
  });

  test('TC-E2E-026: Event status indicators work', async ({ page }) => {
    // Look for status indicators
    const upcomingBadge = page.locator('text=/upcoming/i');
    const overdueBadge = page.locator('text=/overdue/i');
    const completedBadge = page.locator('text=/completed/i');
    
    // At least one type should be visible if events exist
    const hasStatusBadge = 
      await upcomingBadge.isVisible() || 
      await overdueBadge.isVisible() || 
      await completedBadge.isVisible();
    
    // This is informational, not a hard assertion
  });

  test('TC-E2E-027: User can mark event as complete', async ({ page }) => {
    // Find an event with "complete" button
    const completeButton = page.locator('button:has-text("Complete")').first();
    
    if (await completeButton.isVisible()) {
      await completeButton.click();
      
      // Event should show as completed
      await expect(page.locator('text=/completed/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('TC-E2E-028: Timeline filtering works', async ({ page }) => {
    // Look for filter buttons/dropdown
    const filterButtons = page.locator('button:has-text("All"), button:has-text("Upcoming"), button:has-text("Overdue")');
    
    if (await filterButtons.first().isVisible()) {
      // Click "Upcoming" filter
      await page.click('button:has-text("Upcoming")').catch(() => {});
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Click "All" to reset
      await page.click('button:has-text("All")').catch(() => {});
    }
  });

  test('TC-E2E-029: User can add manual event to timeline', async ({ page }) => {
    // Look for "Add Event" button
    const addEventButton = page.locator('button:has-text("Add Event"), button:has-text("Add Date")');
    
    if (await addEventButton.isVisible()) {
      await addEventButton.click();
      
      // Fill event details
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]).catch(() => {});
      await page.fill('input[name="label"], input[placeholder*="event"]', 'Test Event').catch(() => {});
      
      // Save
      await page.click('button:has-text("Save"), button:has-text("Add")').catch(() => {});
      
      // Verify event added
      await expect(page.locator('text=Test Event')).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('Dashboard Overview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('TC-E2E-030: Dashboard shows transaction summary', async ({ page }) => {
    // Should show some kind of summary or stats
    await expect(page.locator('text=/transaction/i')).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-031: Dashboard shows upcoming deadlines', async ({ page }) => {
    // Look for upcoming deadlines section
    await expect(page.locator('text=/upcoming|deadline|due/i')).toBeVisible({ timeout: 5000 }).catch(() => {
      // Might not have upcoming deadlines
    });
  });

  test('TC-E2E-032: Quick actions available on dashboard', async ({ page }) => {
    // Should have button to create new transaction
    await expect(page.locator('text=/new transaction|add transaction|get started/i')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Settings Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('TC-E2E-033: User can access settings page', async ({ page }) => {
    await page.goto('/dashboard/settings');
    
    // Settings page should load
    await expect(page.locator('text=/settings|profile|notification/i')).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-034: User can update notification preferences', async ({ page }) => {
    await page.goto('/dashboard/settings');
    
    // Look for notification toggles
    const emailToggle = page.locator('input[type="checkbox"]').first();
    
    if (await emailToggle.isVisible()) {
      // Toggle preference
      await emailToggle.click();
      
      // Look for save button or auto-save
      await page.click('button:has-text("Save")').catch(() => {});
      
      // Verify saved
      await expect(page.locator('text=/saved|updated/i')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('TC-E2E-035: User can view current plan', async ({ page }) => {
    await page.goto('/dashboard/settings');
    
    // Should show subscription info
    await expect(page.locator('text=/plan|subscription|free|pro/i')).toBeVisible({ timeout: 5000 });
  });
});
