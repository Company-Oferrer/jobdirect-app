import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import JobList from '@/components/JobList';
import type { Job } from '@/types/job';

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Job One',
    company: 'Company One',
    region: 'Region One',
    category: 'Category One',
    type: 'Full Time',
    postedAt: '2026-01-05T10:00:00Z',
    shortDescription: 'Description one',
    description: 'Full description one'
  },
  {
    id: '2',
    title: 'Job Two',
    company: 'Company Two',
    region: 'Region Two',
    category: 'Category Two',
    type: 'Part Time',
    postedAt: '2026-01-04T10:00:00Z',
    shortDescription: 'Description two',
    description: 'Full description two'
  },
  {
    id: '3',
    title: 'Job Three',
    company: 'Company Three',
    region: 'Region Three',
    category: 'Category Three',
    type: 'Remote',
    postedAt: '2026-01-03T10:00:00Z',
    shortDescription: 'Description three',
    description: 'Full description three'
  }
];

describe('JobList Component Integration', () => {
  it('renders all jobs', () => {
    render(<JobList jobs={mockJobs} />);
    
    expect(screen.getByText('Job One')).toBeInTheDocument();
    expect(screen.getByText('Job Two')).toBeInTheDocument();
    expect(screen.getByText('Job Three')).toBeInTheDocument();
  });

  it('renders correct number of job cards', () => {
    render(<JobList jobs={mockJobs} />);
    
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
  });

  it('renders empty state when no jobs', () => {
    render(<JobList jobs={[]} />);
    
    expect(screen.getByText(/No se encontraron ofertas/i)).toBeInTheDocument();
  });

  it('each job card links to correct detail page', () => {
    render(<JobList jobs={mockJobs} />);
    
    const links = screen.getAllByText('View details');
    expect(links[0]).toHaveAttribute('href', '/jobs/1');
    expect(links[1]).toHaveAttribute('href', '/jobs/2');
    expect(links[2]).toHaveAttribute('href', '/jobs/3');
  });

  it('renders single job correctly', () => {
    render(<JobList jobs={[mockJobs[0]]} />);
    
    expect(screen.getByText('Job One')).toBeInTheDocument();
    expect(screen.queryByText('Job Two')).not.toBeInTheDocument();
  });

  it('preserves job order', () => {
    render(<JobList jobs={mockJobs} />);
    
    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles[0]).toHaveTextContent('Job One');
    expect(titles[1]).toHaveTextContent('Job Two');
    expect(titles[2]).toHaveTextContent('Job Three');
  });
});

