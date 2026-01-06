import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useJobs } from '@/hooks/useJobs';
import { mockJobs } from '../mocks/handlers';

describe('useJobs Hook Integration', () => {
  it('starts with loading state', () => {
    const { result } = renderHook(() => useJobs());
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.jobs).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('fetches jobs successfully', async () => {
    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.jobs).toHaveLength(mockJobs.length);
    expect(result.current.error).toBeNull();
  });

  it('returns correct job data structure', async () => {
    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const firstJob = result.current.jobs[0];
    expect(firstJob).toHaveProperty('id');
    expect(firstJob).toHaveProperty('title');
    expect(firstJob).toHaveProperty('company');
    expect(firstJob).toHaveProperty('region');
    expect(firstJob).toHaveProperty('category');
    expect(firstJob).toHaveProperty('type');
    expect(firstJob).toHaveProperty('postedAt');
    expect(firstJob).toHaveProperty('shortDescription');
    expect(firstJob).toHaveProperty('description');
  });

  it('provides refetch function', async () => {
    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });

  it('can refetch jobs', async () => {
    const { result } = renderHook(() => useJobs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const initialJobs = result.current.jobs;

    // Trigger refetch
    await result.current.refetch();

    // After refetch completes, should still have jobs
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.jobs).toHaveLength(mockJobs.length);
  });
});

