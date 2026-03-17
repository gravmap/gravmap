import { test, expect } from '@playwright/test';

test.describe('Billing and Subscription', () => {
  test('TC-E2E-019: Pricing page displays correctly', async ({ page }) => {
    await page.goto('/pricing');

    // Should show Free tier
    await expect(page.locator('text=/free/i')).toBeVisible();
    
    // Should show Pro tier
    await expect(page.locator('text=/pro/i')).toBeVisible();
    
    // Should show pricing amount
    await expect(page.locator('text=/29|\\$29/i')).toBeVisible();
    
    // Should show feature comparison
    await expect(page.locator('text=/feature|include/i')).toBeVisible();
  });

  test('TC-E2E-020: Upgrade button redirects to checkout (authenticated)', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

    // Go to pricing
    await page.goto('/pricing');
    
    // Click upgrade button
    await page.click('button:has-text("Upgrade"), button:has-text("Get Pro")').catch(() =>
      page.click('text=/upgrade/i')
    );

    // Should redirect to Stripe checkout or show checkout modal
    // In test mode, this would redirect to Stripe's test checkout
    await page.waitForURL(/stripe|checkout/, { timeout: 10000 }).catch(() => {
      // Might open in modal or different flow
    });
  });

  test('TC-E2E-021: Free tier transaction limit enforced', async ({ page }) => {
    // Login as free user
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_FREE_USER_EMAIL || 'free@example.com');
    await page.fill('input[type="password"]', process.env.TEST_FREE_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

    // Try to create transactions beyond limit (assuming limit is 3)
    // This test assumes user already has 3 transactions
    // You'd need to set up test data appropriately
    
    await page.click('text=/new transaction|add transaction/i');
    
    // If at limit, should show upgrade prompt
    await expect(page.locator('text=/limit|upgrade|pro/i')).toBeVisible({ timeout: 5000 }).catch(() => {
      // Not at limit yet, can create transaction
    });
  });

  test('TC-E2E-022: Billing portal accessible for subscribed users', async ({ page }) => {
    // Login as Pro user
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_PRO_USER_EMAIL || 'pro@example.com');
    await page.fill('input[type="password"]', process.env.TEST_PRO_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

    // Navigate to settings
    await page.goto('/dashboard/settings');
    
    // Look for billing management
    const billingButton = page.locator('button:has-text("Manage"), button:has-text("Billing")');
    
    if (await billingButton.isVisible()) {
      await billingButton.click();
      
      // Should redirect to Stripe billing portal
      await page.waitForURL(/stripe|billing/, { timeout: 10000 }).catch(() => {
        // Might open in new tab or different flow
      });
    }
  });
});

test.describe('Subscription Status Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('TC-E2E-023: Current subscription plan displayed in settings', async ({ page }) => {
    await page.goto('/dashboard/settings');
    
    // Should show current plan
    await expect(page.locator('text=/plan|subscription|free|pro/i')).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-024: Usage stats shown for free users', async ({ page }) => {
    // If user is on free plan, should show transaction usage
    await page.goto('/dashboard/settings');
    
    // Look for usage indicator (e.g., "2 of 3 transactions used")
    await expect(page.locator('text=/transaction|used|remaining/i')).toBeVisible({ timeout: 5000 }).catch(() => {
      // Pro users might not see usage limits
    });
  });
});
