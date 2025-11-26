import type { Job } from '@/types/job';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'BlueWave Tech',
    region: 'Lima',
    category: 'Technology',
    type: 'Full Time',
    postedAt: '2025-11-10T09:00:00.000Z',
    salaryRange: '$4,000 – $5,500',
    shortDescription: 'Lead the frontend of our SaaS analytics platform using React and TypeScript.',
    description:
      'We are looking for a Senior Frontend Engineer to own the user interface of our analytics platform. You will work closely with designers and backend engineers to ship high-quality, performant experiences. Responsibilities include building reusable components, ensuring accessibility, and collaborating on architectural decisions.',
    tags: ['React', 'TypeScript', 'SaaS', 'Leadership']
  },
  {
    id: '2',
    title: 'Product Designer (Mid-Level)',
    company: 'Flowly',
    region: 'Mexico City',
    category: 'Design',
    type: 'Full Time',
    postedAt: '2025-11-08T09:00:00.000Z',
    salaryRange: '$3,000 – $4,000',
    shortDescription:
      'Design clean, intuitive interfaces for a growing fintech app serving LatAm markets.',
    description:
      'As a Product Designer, you will own end-to-end design for key features: research, wireframing, prototyping, and visual design. You will collaborate with product and engineering to deliver meaningful experiences in the fintech space.',
    tags: ['Figma', 'UX', 'UI', 'Fintech']
  },
  {
    id: '3',
    title: 'Digital Marketing Specialist',
    company: 'BrightHive',
    region: 'Remote',
    category: 'Marketing',
    type: 'Remote',
    postedAt: '2025-11-05T09:00:00.000Z',
    salaryRange: '$2,500 – $3,500',
    shortDescription:
      'Plan and execute performance campaigns for B2B SaaS products in global markets.',
    description:
      'You will manage multi-channel campaigns (search, social, email), measure performance, and optimize for conversion. Experience with B2B funnels, marketing automation, and analytics is a plus.',
    tags: ['Performance', 'B2B', 'Remote']
  },
  {
    id: '4',
    title: 'Customer Success Manager',
    company: 'Supportly',
    region: 'Buenos Aires',
    category: 'Customer Support',
    type: 'Full Time',
    postedAt: '2025-11-01T09:00:00.000Z',
    salaryRange: '$3,200 – $4,200',
    shortDescription:
      'Help enterprise customers achieve value with our support automation platform.',
    description:
      'You will build long-term relationships with key accounts, understand their goals, and ensure successful adoption. Responsibilities include onboarding, QBRs, and acting as the main point of contact.',
    tags: ['Customer Success', 'Enterprise', 'Onboarding']
  },
  {
    id: '5',
    title: 'Junior Data Analyst',
    company: 'InsightLab',
    region: 'Santiago',
    category: 'Finance',
    type: 'Internship',
    postedAt: '2025-10-28T09:00:00.000Z',
    salaryRange: '$1,200 – $1,800',
    shortDescription:
      'Support the finance and operations team with dashboards and ad-hoc reports.',
    description:
      'You will help build and maintain dashboards, prepare datasets, and run basic statistical analyses. Great role for someone starting in data with strong Excel/SQL skills.',
    tags: ['SQL', 'Excel', 'Internship']
  },
  {
    id: '6',
    title: 'Sales Executive',
    company: 'GrowthLoop',
    region: 'Bogotá',
    category: 'Sales',
    type: 'Full Time',
    postedAt: '2025-10-25T09:00:00.000Z',
    salaryRange: '$2,000 – $3,000 + commission',
    shortDescription:
      'Drive new business for a fast-growing B2B platform in the LatAm region.',
    description:
      'As a Sales Executive, you will prospect, qualify, and close deals with mid-market companies across LatAm. You are comfortable managing a pipeline, running demos, and negotiating contracts.',
    tags: ['B2B', 'Sales', 'SaaS']
  }
];
