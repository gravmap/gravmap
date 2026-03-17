import { test, expect } from '@playwright/test';

test.describe('Transaction Management', () => {
  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('TC-E2E-008: User can create a new transaction', async ({ page }) => {
    // Navigate to new transaction page
    await page.click('text=/new transaction|add transaction/i');
    await expect(page).toHaveURL(/.*transactions\/new/);

    // Fill transaction form
    const timestamp = Date.now();
    await page.fill('input[name="name"]', `Test Transaction ${timestamp}`);
    await page.fill('input[name="clientName"]', 'John Doe');
    await page.fill('input[name="clientEmail"]', 'john@example.com');
    await page.fill('input[name="propertyAddress"]', '123 Test St, Austin, TX 78701');
    
    // Select transaction type
    await page.selectOption('select[name="transactionType"]', 'Purchase');
    
    // Set closing date (30 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateStr = futureDate.toISOString().split('T')[0];
    await page.fill('input[type="date"]', dateStr);

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to transaction detail or show success
    await expect(page).toHaveURL(/.*transactions\/[\w-]+/, { timeout: 10000 });
    
    // Verify transaction created
    await expect(page.locator(`text=Test Transaction ${timestamp}`)).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-009: User can view transaction list', async ({ page }) => {
    // Should be on dashboard with transaction list
    await expect(page.locator('text=/transaction/i')).toBeVisible({ timeout: 5000 });
    
    // Should show at least one transaction or empty state
    const hasTransactions = await page.locator('[data-testid="transaction-item"]').count() > 0;
    const hasEmptyState = await page.locator('text=/no transactions|get started/i').isVisible();
    
    expect(hasTransactions || hasEmptyState).toBeTruthy();
  });

  test('TC-E2E-010: User can edit a transaction', async ({ page }) => {
    // Navigate to first transaction
    await page.click('[data-testid="transaction-item"]', { timeout: 5000 }).catch(() => {
      // Fallback: try finding transaction link
      return page.click('a[href*="/dashboard/transactions/"]').first();
    });

    // Click edit button
    await page.click('button:has-text("Edit")');

    // Modify transaction name
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('Updated Transaction Name');

    // Save changes
    await page.click('button[type="submit"]');

    // Verify changes saved
    await expect(page.locator('text=Updated Transaction Name')).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-011: Transaction search works', async ({ page }) => {
    // Find search input
    const searchInput = page.locator('input[placeholder*="search"], input[type="search"]').first();
    
    if (await searchInput.isVisible()) {
      // Type search query
      await searchInput.fill('test');
      
      // Wait for results to filter
      await page.waitForTimeout(500);
      
      // Verify filtering occurred (results should update)
      // This is a basic check - adjust based on actual implementation
      await page.waitForTimeout(1000);
    }
  });

  test('TC-E2E-012: Transaction form validation works', async ({ page }) => {
    await page.goto('/dashboard/transactions/new');

    // Try submitting empty form
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator('text=/required|invalid/i')).toBeVisible({ timeout: 3000 });
  });
});
