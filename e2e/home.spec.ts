import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display page title and description', async ({ page }) => {
    await expect(
      page.getByText(/Impulsa tu carrera/)
    ).toBeVisible();
    
    await expect(
      page.getByText(/Encuentra trabajos de alta calidad/)
    ).toBeVisible();
  });

  test('should display navigation bar', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should show loading state initially', async ({ page }) => {
    // Navigate fresh to catch loading state
    await page.goto('/');
    
    // Either loading skeleton or job list should be visible quickly
    await expect(
      page.locator('[class*="animate-pulse"], article').first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('should display job listings or empty state', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForLoadState('networkidle');
    
    // Should show either job cards or empty state
    const hasJobs = await page.locator('article').count();
    const hasEmptyState = await page.getByText(/No se encontraron ofertas/).isVisible().catch(() => false);
    const hasError = await page.getByText(/Error/).isVisible().catch(() => false);
    
    expect(hasJobs > 0 || hasEmptyState || hasError).toBeTruthy();
  });

  test('should display filter sidebar', async ({ page }) => {
    await expect(page.getByText(/Filtros/i)).toBeVisible();
  });
});

test.describe('Home Page - With Mock API', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API response
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'e2e-1',
            title: 'E2E Test Developer',
            company: 'E2E Corp',
            region: 'Test Region',
            category: 'Tecnología',
            type: 'Full Time',
            postedAt: new Date().toISOString(),
            shortDescription: 'E2E test job description',
            description: 'Full E2E test job description',
            tags: ['E2E', 'Testing'],
            salaryRange: '$5,000 - $7,000'
          },
          {
            id: 'e2e-2',
            title: 'QA Engineer',
            company: 'Quality Co',
            region: 'Another Region',
            category: 'Tecnología',
            type: 'Remote',
            postedAt: new Date().toISOString(),
            shortDescription: 'QA position',
            description: 'Full QA description',
            tags: ['QA', 'Automation']
          }
        ])
      });
    });
    
    await page.goto('/');
  });

  test('should display mocked job listings', async ({ page }) => {
    await expect(page.getByText('E2E Test Developer')).toBeVisible();
    await expect(page.getByText('QA Engineer')).toBeVisible();
  });

  test('should display job count', async ({ page }) => {
    await expect(page.getByText('2')).toBeVisible();
    await expect(page.getByText(/ofertas/)).toBeVisible();
  });

  test('should display job company and region', async ({ page }) => {
    await expect(page.getByText(/E2E Corp/)).toBeVisible();
    await expect(page.getByText(/Test Region/)).toBeVisible();
  });

  test('should display job type badges', async ({ page }) => {
    await expect(page.getByText('Full Time').first()).toBeVisible();
    await expect(page.getByText('Remote').first()).toBeVisible();
  });

  test('should display salary when available', async ({ page }) => {
    await expect(page.getByText(/\$5,000 - \$7,000/)).toBeVisible();
  });

  test('should have clickable Ver detalles links', async ({ page }) => {
    const viewDetailsLinks = page.getByRole('link', { name: 'Ver detalles' });
    await expect(viewDetailsLinks.first()).toBeVisible();
    await expect(viewDetailsLinks.first()).toHaveAttribute('href', '/jobs/e2e-1');
  });

  test('should navigate to job detail when clicking Ver detalles', async ({ page }) => {
    await page.getByRole('link', { name: 'Ver detalles' }).first().click();
    await expect(page).toHaveURL('/jobs/e2e-1');
  });
});

test.describe('Home Page - Error Handling', () => {
  test('should display error message when API fails', async ({ page }) => {
    // Mock API error
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('/');
    
    await expect(page.getByText(/Error/)).toBeVisible();
  });
});

test.describe('Home Page - Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.route('**/api/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });
    
    await page.goto('/');
    
    // Page should still be usable
    await expect(page.getByText(/Impulsa tu carrera/)).toBeVisible();
  });
});

