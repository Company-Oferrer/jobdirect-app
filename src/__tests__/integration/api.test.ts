import { describe, it, expect } from 'vitest';
import { fetchJobs } from '@/services/api';
import { mockJobs } from '../mocks/handlers';

describe('API Service Integration', () => {
  it('fetches jobs from API', async () => {
    const jobs = await fetchJobs();
    
    expect(jobs).toHaveLength(mockJobs.length);
  });

  it('returns jobs with correct structure', async () => {
    const jobs = await fetchJobs();
    const firstJob = jobs[0];

    expect(firstJob).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        company: expect.any(String),
        region: expect.any(String),
        category: expect.any(String),
        type: expect.any(String),
        postedAt: expect.any(String),
        shortDescription: expect.any(String),
        description: expect.any(String)
      })
    );
  });

  it('returns jobs with optional fields when present', async () => {
    const jobs = await fetchJobs();
    const jobWithSalary = jobs.find(j => j.salaryRange);
    const jobWithTags = jobs.find(j => j.tags && j.tags.length > 0);

    expect(jobWithSalary).toBeDefined();
    expect(jobWithSalary?.salaryRange).toBeDefined();
    
    expect(jobWithTags).toBeDefined();
    expect(jobWithTags?.tags).toBeInstanceOf(Array);
  });

  it('returns specific mock job data', async () => {
    const jobs = await fetchJobs();
    
    const frontendJob = jobs.find(j => j.title === 'Senior Frontend Developer');
    expect(frontendJob).toBeDefined();
    expect(frontendJob?.company).toBe('TechCorp');
    expect(frontendJob?.region).toBe('Región Metropolitana');
    expect(frontendJob?.category).toBe('Tecnología');
  });
});

