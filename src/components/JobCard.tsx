import { Link } from 'react-router-dom';
import type { Job } from '@/types/job';
import Badge from './Badge';

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const formattedDate = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric'
  }).format(new Date(job.postedAt));

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/50 transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-primary/30">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-50 group-hover:text-primary">
              {job.title}
            </h3>
            <p className="text-xs text-slate-400">
              {job.company} • {job.region}
            </p>
          </div>
          <span className="text-[11px] text-slate-400">{formattedDate}</span>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px]">
          <Badge variant="primary">{job.type}</Badge>
          <Badge>{job.category}</Badge>
          {job.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="accent">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-xs text-slate-300">{job.shortDescription}</p>

        {job.salaryRange && (
          <p className="text-xs font-medium text-accent">
            {job.salaryRange}{' '}
            <span className="font-normal text-slate-400">/ mes</span>
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/jobs/${job.id}`}
          className="rounded-xl bg-slate-800 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-primary hover:text-slate-50"
        >
          Ver detalles
        </Link>
        <button className="text-[11px] text-slate-400 hover:text-slate-200">
          Guardar
        </button>
      </div>
    </article>
  );
}
