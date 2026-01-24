import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import JobDetail from '@/routes/JobDetail';

// Custom render for routes with params (uses raw render, not the one with BrowserRouter)
function renderWithRouter(jobId: string) {
  return render(
    <MemoryRouter initialEntries={[`/jobs/${jobId}`]}>
      <Routes>
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('JobDetail Page Integration', () => {
  it('renders loading state initially', () => {
    renderWithRouter('1');
    
    // Should show loading skeleton
    const loadingElements = document.querySelectorAll('[class*="animate-pulse"]');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('displays job title after loading', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Senior Frontend Developer'
      );
    });
  });

  it('shows company and region', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText(/TechCorp/)).toBeInTheDocument();
      expect(screen.getByText(/Región Metropolitana/)).toBeInTheDocument();
    });
  });

  it('displays job type badge', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Full Time')).toBeInTheDocument();
    });
  });

  it('displays category badge', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Tecnología')).toBeInTheDocument();
    });
  });

  it('displays all job tags', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Tailwind')).toBeInTheDocument();
    });
  });

  it('shows salary information', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText(/\$3,000 - \$4,500/)).toBeInTheDocument();
    });
  });

  it('displays job description', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(
        screen.getByText(/Únete a nuestro equipo de desarrollo/)
      ).toBeInTheDocument();
    });
  });

  it('shows back button', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText(/Volver a los resultados/)).toBeInTheDocument();
    });
  });

  it('renders aplicar ahora button', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Aplicar ahora')).toBeInTheDocument();
    });
  });

  it('renders guardar para más tarde button', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Guardar para más tarde')).toBeInTheDocument();
    });
  });

  it('displays role overview section', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Resumen del rol')).toBeInTheDocument();
    });
  });

  it('displays responsibilities section', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Responsabilidades')).toBeInTheDocument();
    });
  });

  it('displays requirements section', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Requisitos')).toBeInTheDocument();
    });
  });

  it('shows formatted date', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      // The date should be formatted like "Jan 5, 2026"
      expect(screen.getByText(/Posted on/)).toBeInTheDocument();
    });
  });
});

describe('JobDetail Page - Job Not Found', () => {
  it('shows not found message for invalid job id', async () => {
    renderWithRouter('non-existent-id');

    await waitFor(() => {
      expect(screen.getByText('Oferta no encontrada')).toBeInTheDocument();
    });
  });

  it('shows back button when job not found', async () => {
    renderWithRouter('non-existent-id');

    await waitFor(() => {
      expect(screen.getByText(/Volver a los resultados/)).toBeInTheDocument();
    });
  });
});

describe('JobDetail Page - Different Jobs', () => {
  it('displays correct data for job 2', async () => {
    renderWithRouter('2');

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Backend Engineer'
      );
      expect(screen.getByText(/DataFlow/)).toBeInTheDocument();
      expect(screen.getByText('Remote')).toBeInTheDocument();
    });
  });

  it('displays correct data for job 3', async () => {
    renderWithRouter('3');

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'UX Designer'
      );
      expect(screen.getByText(/Creative Studio/)).toBeInTheDocument();
      expect(screen.getByText('Part Time')).toBeInTheDocument();
      expect(screen.getByText('Diseño')).toBeInTheDocument();
    });
  });
});

describe('JobDetail Page Accessibility', () => {
  it('has proper heading structure', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toBeInTheDocument();
    });
  });

  it('job detail is wrapped in article', async () => {
    renderWithRouter('1');

    await waitFor(() => {
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
    });
  });
});
