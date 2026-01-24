import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import JobCard from '@/components/JobCard';
import type { Job } from '@/types/job';

const mockJob: Job = {
  id: 'test-1',
  title: 'Test Developer',
  company: 'Test Company',
  region: 'Test Region',
  category: 'Test Category',
  type: 'Full Time',
  postedAt: '2026-01-05T10:00:00Z',
  shortDescription: 'This is a test job description.',
  description: 'Full description of the test job.',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  salaryRange: '$1,000 - $2,000'
};

describe('JobCard Component Integration', () => {
  it('renders job title', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText('Test Developer')).toBeInTheDocument();
  });

  it('renders company and region', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText(/Test Company/)).toBeInTheDocument();
    expect(screen.getByText(/Test Region/)).toBeInTheDocument();
  });

  it('renders job type badge', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText('Full Time')).toBeInTheDocument();
  });

  it('renders category badge', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders only first 2 tags', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.queryByText('Tag3')).not.toBeInTheDocument();
  });

  it('renders short description', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText('This is a test job description.')).toBeInTheDocument();
  });

  it('renders salary when available', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText(/\$1,000 - \$2,000/)).toBeInTheDocument();
  });

  it('does not render salary when not available', () => {
    const jobWithoutSalary = { ...mockJob, salaryRange: undefined };
    render(<JobCard job={jobWithoutSalary} />);
    
    expect(screen.queryByText(/\/ mes/)).not.toBeInTheDocument();
  });

  it('renders view details link with correct href', () => {
    render(<JobCard job={mockJob} />);
    
    const link = screen.getByText('Ver detalles');
    expect(link).toHaveAttribute('href', '/jobs/test-1');
  });

  it('renders save job button', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<JobCard job={mockJob} />);
    
    // Should show formatted date like "Jan 5"
    expect(screen.getByText(/Jan/)).toBeInTheDocument();
  });

  it('is wrapped in article element', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('handles job without tags', () => {
    const jobWithoutTags = { ...mockJob, tags: undefined };
    render(<JobCard job={jobWithoutTags} />);
    
    // Should still render without crashing
    expect(screen.getByText('Test Developer')).toBeInTheDocument();
  });
});

