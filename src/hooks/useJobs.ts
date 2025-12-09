import { useEffect, useState } from 'react';
import { fetchJobs } from '@/services/api';
import type { Job } from '@/types/job';

interface UseJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useJobs(): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar las ofertas');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    refetch: loadJobs
  };
}

