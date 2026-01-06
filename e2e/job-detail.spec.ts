import { test, expect } from '@playwright/test';

const mockJob = {
  id: 'e2e-detail-1',
  title: 'Senior Software Engineer',
  company: 'Tech Giants Inc',
  region: 'Región Metropolitana',
  category: 'Tecnología',
  type: 'Full Time',
  postedAt: '2026-01-05T10:00:00Z',
  shortDescription: 'Join our amazing team',
  description: 'We are looking for a senior engineer to lead our development efforts.',
  tags: ['React', 'Node.js', 'AWS'],
  salaryRange: '$6,000 - $8,000'
};

test.describe('Job Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API to return our test job
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([mockJob])
      });
    });
  });

  test('should display job title', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Senior Software Engineer');
  });

  test('should display company and region', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText(/Tech Giants Inc/)).toBeVisible();
    await expect(page.getByText(/Región Metropolitana/)).toBeVisible();
  });

  test('should display job type badge', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText('Full Time')).toBeVisible();
  });

  test('should display category badge', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText('Tecnología')).toBeVisible();
  });

  test('should display all tags', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText('React')).toBeVisible();
    await expect(page.getByText('Node.js')).toBeVisible();
    await expect(page.getByText('AWS')).toBeVisible();
  });

  test('should display salary information', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText(/\$6,000 - \$8,000/)).toBeVisible();
  });

  test('should display job description', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(
      page.getByText(/looking for a senior engineer/)
    ).toBeVisible();
  });

  test('should display back button', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText(/Back to results/)).toBeVisible();
  });

  test('should navigate back when clicking back button', async ({ page }) => {
    // First go to home
    await page.goto('/');
    
    // Then navigate to job detail
    await page.getByRole('link', { name: 'View details' }).first().click();
    await expect(page).toHaveURL('/jobs/e2e-detail-1');
    
    // Click back button
    await page.getByText(/Back to results/).click();
    
    // Should be back on home
    await expect(page).toHaveURL('/');
  });

  test('should display Apply now button', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByRole('button', { name: 'Apply now' })).toBeVisible();
  });

  test('should display Save for later button', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByRole('button', { name: 'Save for later' })).toBeVisible();
  });

  test('should display role overview section', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText('Role overview')).toBeVisible();
  });

  test('should display responsibilities section', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText('Responsibilities')).toBeVisible();
  });

  test('should display requirements section', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.getByText('Requirements')).toBeVisible();
  });
});

test.describe('Job Detail Page - Job Not Found', () => {
  test('should show not found message for invalid job', async ({ page }) => {
    // Mock empty job list
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });
    
    await page.goto('/jobs/non-existent-job');
    
    await expect(page.getByText('Job not found')).toBeVisible();
  });

  test('should show back button when job not found', async ({ page }) => {
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });
    
    await page.goto('/jobs/non-existent-job');
    
    await expect(page.getByText(/Back to results/)).toBeVisible();
  });
});

test.describe('Job Detail Page - Error Handling', () => {
  test('should display error when API fails', async ({ page }) => {
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server Error' })
      });
    });
    
    await page.goto('/jobs/any-job');
    
    await expect(page.getByText(/Error/)).toBeVisible();
  });
});

test.describe('Job Detail Page - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([mockJob])
      });
    });
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    // Should have h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    
    // Should have h2 or h3
    const subHeadings = page.locator('h2, h3');
    await expect(subHeadings.first()).toBeVisible();
  });

  test('should be contained in article element', async ({ page }) => {
    await page.goto('/jobs/e2e-detail-1');
    
    await expect(page.locator('article')).toBeVisible();
  });
});

