import type { Job } from '@/types/job';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://backend-service:3000';

export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(`/api/jobs`);

  if (!response.ok) {
    throw new Error(`Error al cargar las ofertas: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function seedJobs(): Promise<void> {
  const response = await fetch(`/api/seed`, { method: 'POST' });

  if (!response.ok) {
    throw new Error(`Error al ejecutar seed: ${response.statusText}`);
  }
}

