import { http, HttpResponse } from 'msw';
import type { Job } from '@/types/job';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    region: 'Región Metropolitana',
    category: 'Tecnología',
    type: 'Full Time',
    postedAt: '2026-01-05T10:00:00Z',
    shortDescription: 'Buscamos desarrollador frontend con experiencia en React.',
    description: 'Únete a nuestro equipo de desarrollo para crear aplicaciones web modernas.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    salaryRange: '$3,000 - $4,500'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataFlow',
    region: 'Valparaíso',
    category: 'Tecnología',
    type: 'Remote',
    postedAt: '2026-01-04T14:30:00Z',
    shortDescription: 'Desarrollador backend para APIs REST y microservicios.',
    description: 'Diseña y desarrolla APIs escalables usando Node.js y PostgreSQL.',
    tags: ['Node.js', 'PostgreSQL', 'Docker'],
    salaryRange: '$2,800 - $4,000'
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Creative Studio',
    region: 'Región Metropolitana',
    category: 'Diseño',
    type: 'Part Time',
    postedAt: '2026-01-03T09:15:00Z',
    shortDescription: 'Diseñador UX para proyectos de productos digitales.',
    description: 'Crea experiencias de usuario excepcionales para nuestros clientes.',
    tags: ['Figma', 'UX Research', 'Prototyping']
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'GrowthHub',
    region: 'Biobío',
    category: 'Marketing',
    type: 'Full Time',
    postedAt: '2026-01-02T16:45:00Z',
    shortDescription: 'Lidera estrategias de marketing digital.',
    description: 'Desarrolla y ejecuta campañas de marketing para impulsar el crecimiento.',
    tags: ['SEO', 'SEM', 'Analytics'],
    salaryRange: '$2,500 - $3,500'
  },
  {
    id: '5',
    title: 'Data Analyst',
    company: 'InsightCo',
    region: 'Valparaíso',
    category: 'Tecnología',
    type: 'Contract',
    postedAt: '2026-01-01T11:00:00Z',
    shortDescription: 'Analista de datos para proyectos de BI.',
    description: 'Transforma datos en insights accionables para el negocio.',
    tags: ['SQL', 'Python', 'Tableau']
  }
];

export const handlers = [
  http.get('*/api/jobs', () => {
    return HttpResponse.json(mockJobs);
  }),
  
  http.get('*/api/jobs/:id', ({ params }) => {
    const job = mockJobs.find(j => j.id === params.id);
    if (!job) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(job);
  })
];

