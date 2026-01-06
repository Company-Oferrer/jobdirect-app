import { test, expect } from '@playwright/test';

const mockJobs = [
  {
    id: 'nav-1',
    title: 'Navigation Test Job 1',
    company: 'Nav Company',
    region: 'Test Region',
    category: 'Tecnología',
    type: 'Full Time',
    postedAt: new Date().toISOString(),
    shortDescription: 'First navigation test job',
    description: 'Full description 1'
  },
  {
    id: 'nav-2',
    title: 'Navigation Test Job 2',
    company: 'Nav Company 2',
    region: 'Test Region 2',
    category: 'Diseño',
    type: 'Remote',
    postedAt: new Date().toISOString(),
    shortDescription: 'Second navigation test job',
    description: 'Full description 2'
  }
];

test.describe('Navigation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockJobs)
      });
    });
  });

  test('should navigate from home to job detail and back', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await expect(page).toHaveURL('/');
    
    // Wait for jobs to load
    await expect(page.getByText('Navigation Test Job 1')).toBeVisible();
    
    // Click on first job
    await page.getByRole('link', { name: 'View details' }).first().click();
    
    // Should be on job detail page
    await expect(page).toHaveURL('/jobs/nav-1');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Navigation Test Job 1');
    
    // Go back
    await page.getByText(/Back to results/).click();
    
    // Should be back on home
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Navigation Test Job 1')).toBeVisible();
  });

  test('should navigate to different jobs', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to first job
    await page.getByRole('link', { name: 'View details' }).first().click();
    await expect(page).toHaveURL('/jobs/nav-1');
    
    // Go back
    await page.goBack();
    
    // Navigate to second job
    await page.getByRole('link', { name: 'View details' }).nth(1).click();
    await expect(page).toHaveURL('/jobs/nav-2');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Navigation Test Job 2');
  });

  test('should handle direct URL navigation to job detail', async ({ page }) => {
    // Go directly to job detail
    await page.goto('/jobs/nav-1');
    
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Navigation Test Job 1');
  });

  test('should handle browser back/forward buttons', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to job detail
    await page.getByRole('link', { name: 'View details' }).first().click();
    await expect(page).toHaveURL('/jobs/nav-1');
    
    // Use browser back
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // Use browser forward
    await page.goForward();
    await expect(page).toHaveURL('/jobs/nav-1');
  });

  test('should maintain app state when navigating', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to load
    await expect(page.getByText('Navigation Test Job 1')).toBeVisible();
    
    // Navigate to detail
    await page.getByRole('link', { name: 'View details' }).first().click();
    
    // Navigate back
    await page.goBack();
    
    // Jobs should still be visible
    await expect(page.getByText('Navigation Test Job 1')).toBeVisible();
    await expect(page.getByText('Navigation Test Job 2')).toBeVisible();
  });
});

test.describe('404 Handling', () => {
  test('should handle non-existent job gracefully', async ({ page }) => {
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });
    
    await page.goto('/jobs/does-not-exist');
    
    await expect(page.getByText('Job not found')).toBeVisible();
  });
});

test.describe('Deep Linking', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockJobs)
      });
    });
  });

  test('should load correct job when accessing via direct URL', async ({ page }) => {
    await page.goto('/jobs/nav-2');
    
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Navigation Test Job 2');
    await expect(page.getByText(/Nav Company 2/)).toBeVisible();
  });

  test('should handle shared links correctly', async ({ page }) => {
    // Simulate someone sharing a link
    await page.goto('/jobs/nav-1');
    
    // Page should fully render
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

