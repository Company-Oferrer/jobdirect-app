import { useParams, useNavigate } from 'react-router-dom';
import { jobs } from '@/data/jobs';
import Badge from '@/components/Badge';
import EmptyState from '@/components/EmptyState';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          title="Job not found"
          message="This job may have expired or the link is incorrect."
        />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-xs text-primary hover:text-primary-light"
        >
          ← Back to results
        </button>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(job.postedAt));

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-xs text-slate-400 hover:text-slate-100"
      >
        ← Back to results
      </button>

      <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/60">
        <header className="mb-4 space-y-2">
          <h1 className="text-xl font-semibold text-slate-50">{job.title}</h1>
          <p className="text-sm text-slate-300">
            {job.company} • {job.region}
          </p>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <Badge variant="primary">{job.type}</Badge>
            <Badge>{job.category}</Badge>
            {job.tags?.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-[11px] text-slate-500">
            Posted on {formattedDate}
            {job.salaryRange && (
              <>
                {' '}
                ·{' '}
                <span className="font-medium text-accent">
                  {job.salaryRange} / month
                </span>
              </>
            )}
          </p>
        </header>

        <section className="space-y-3 text-sm text-slate-200">
          <h2 className="text-sm font-semibold text-slate-100">Role overview</h2>
          <p className="text-sm text-slate-300">{job.description}</p>

          <h3 className="mt-4 text-sm font-semibold text-slate-100">
            Responsibilities
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-sm text-slate-300">
            <li>Collaborate with cross-functional teams to deliver product features.</li>
            <li>Write clean, maintainable, and tested code.</li>
            <li>Participate in code reviews and architecture discussions.</li>
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-slate-100">
            Requirements
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-sm text-slate-300">
            <li>Relevant experience in a similar role.</li>
            <li>Strong communication and collaboration skills.</li>
            <li>Comfortable working in remote or hybrid setups.</li>
          </ul>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-slate-50 shadow-sm hover:bg-primary-dark">
            Apply now
          </button>
          <button className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-primary/70 hover:text-primary">
            Save for later
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-500">
          By applying you will be redirected to the employer&apos;s site or contact channel.
        </p>
      </article>
    </section>
  );
}
