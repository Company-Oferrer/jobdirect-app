export type JobType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Remote';

export interface Job {
  id: string;
  title: string;
  company: string;
  region: string;
  category: string;
  type: JobType;
  postedAt: string; // ISO string
  shortDescription: string;
  description: string;
  tags?: string[];
  salaryRange?: string;
}
