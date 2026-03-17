import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
  });

  test('TC-E2E-001: User can sign up successfully', async ({ page }) => {
    // Navigate to signup page
    await page.click('text=Sign Up');
    await expect(page).toHaveURL(/.*signup/);

    // Fill signup form
    const timestamp = Date.now();
    await page.fill('input[type="email"]', `test-${timestamp}@example.com`);
    await page.fill('input[type="password"]', 'SecurePass123!');
    
    // Submit form
    await page.click('button[type="submit"]');

    // Should show success message or redirect to verification page
    await expect(page.locator('text=/verification|success|check your email/i')).toBeVisible({ timeout: 10000 });
  });

  test('TC-E2E-002: Signup form validation works', async ({ page }) => {
    await page.goto('/auth/signup');

    // Try submitting empty form
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator('text=/required|invalid/i')).toBeVisible();
  });

  test('TC-E2E-003: User can login successfully', async ({ page }) => {
    // Navigate to login page
    await page.goto('/auth/login');

    // Fill login form with test credentials
    // Note: These should be test environment credentials
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    
    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('TC-E2E-004: Login fails with invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    // Enter invalid credentials
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=/invalid|incorrect/i')).toBeVisible({ timeout: 5000 });
    
    // Should still be on login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC-E2E-005: User can logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_USER_PASSWORD || 'TestPass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

    // Logout
    await page.click('[data-testid="user-menu"]', { timeout: 5000 }).catch(() => {
      // Fallback: try clicking user avatar or name
      return page.click('button:has-text("Sign Out")').catch(() => 
        page.click('text=/logout|sign out/i')
      );
    });
    
    // Try to find and click logout button
    const logoutButton = page.locator('button:has-text("Sign Out"), button:has-text("Logout")');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    }

    // Should redirect to home or login
    await page.waitForURL(/.*(^\/$|login)/, { timeout: 5000 }).catch(() => {
      // If not redirected, verify session cleared by trying to access dashboard
    });

    // Try to access protected route
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*(^\/$|login)/, { timeout: 5000 });
  });

  test('TC-E2E-006: Password reset flow works', async ({ page }) => {
    await page.goto('/auth/login');

    // Click forgot password link
    await page.click('text=/forgot|reset/i');
    await expect(page).toHaveURL(/.*forgot-password/);

    // Enter email
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button[type="submit"]');

    // Should show success message
    await expect(page.locator('text=/check your email|sent/i')).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-007: Unauthenticated users cannot access protected routes', async ({ page }) => {
    // Try to access dashboard directly
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL(/.*(^\/$|login)/, { timeout: 5000 });
  });
});
