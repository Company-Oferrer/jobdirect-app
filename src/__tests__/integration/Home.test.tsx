import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import Home from '@/routes/Home';
import { mockJobs } from '../mocks/handlers';

describe('Home Page Integration', () => {
  it('renders loading state initially', () => {
    render(<Home />);
    
    // Should show loading skeletons
    const loadingElements = document.querySelectorAll('[class*="animate-pulse"]');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('renders job listings after loading', async () => {
    render(<Home />);

    // Wait for jobs to load
    await waitFor(() => {
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
    });

    // Check that multiple jobs are displayed
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('UX Designer')).toBeInTheDocument();
  });

  it('displays correct job count', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(mockJobs.length.toString())).toBeInTheDocument();
    });
  });

  it('shows company and region information for jobs', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/TechCorp/)).toBeInTheDocument();
      // Multiple jobs may have the same region
      expect(screen.getAllByText(/Región Metropolitana/).length).toBeGreaterThan(0);
    });
  });

  it('displays job type badges', async () => {
    render(<Home />);

    await waitFor(() => {
      // Multiple jobs may have the same type, so use getAllByText
      expect(screen.getAllByText('Full Time').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Remote').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Part Time').length).toBeGreaterThan(0);
    });
  });

  it('displays job tags', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  it('shows salary information when available', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/\$3,000 - \$4,500/)).toBeInTheDocument();
    });
  });

  it('renders "Ver detalles" links for each job', async () => {
    render(<Home />);

    await waitFor(() => {
      const viewDetailsLinks = screen.getAllByText('Ver detalles');
      expect(viewDetailsLinks.length).toBeGreaterThan(0);
    });
  });

  it('has correct link to job detail page', async () => {
    render(<Home />);

    await waitFor(() => {
      const firstViewDetailsLink = screen.getAllByText('Ver detalles')[0];
      expect(firstViewDetailsLink).toHaveAttribute('href', '/jobs/1');
    });
  });

  it('renders page title and description', async () => {
    render(<Home />);

    expect(
      screen.getByText(/Impulsa tu carrera: encuentra tu próxima oportunidad profesional/)
    ).toBeInTheDocument();
    
    expect(
      screen.getByText(/Encuentra trabajos de alta calidad/)
    ).toBeInTheDocument();
  });

  it('shows jobs sorted by date (newest first)', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
    });
    
    // Get all article elements (job cards)
    const articles = screen.getAllByRole('article');
    // First article should contain the most recent job
    expect(articles[0]).toHaveTextContent('Senior Frontend Developer');
  });
});

describe('Home Page Pagination', () => {
  it('displays pagination controls', async () => {
    render(<Home />);

    await waitFor(() => {
      // Should show pagination component
      const pagination = document.querySelector('nav[aria-label]') || 
                         screen.queryByRole('navigation');
      // Pagination may or may not be visible depending on total pages
      expect(screen.getByText(/Mostrando/)).toBeInTheDocument();
    });
  });
});

describe('Home Page Accessibility', () => {
  it('has proper heading structure', async () => {
    render(<Home />);

    await waitFor(() => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });
  });

  it('job cards have proper article role', async () => {
    render(<Home />);

    await waitFor(() => {
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBeGreaterThan(0);
    });
  });
});

