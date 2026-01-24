import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '@/hooks/useJobs';
import Badge from '@/components/Badge';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, isLoading, error } = useJobs();

  const job = jobs.find((j) => j.id === id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          title="Error al cargar la oferta"
          message={error}
        />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-xs text-primary hover:text-primary-light"
        >
          ← Volver a los resultados
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          title="Oferta no encontrada"
          message="Esta oferta puede haber expirado o el enlace es incorrecto."
        />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-xs text-primary hover:text-primary-light"
        >
          ← Volver a los resultados
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
        ← Volver a los resultados
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
                  {job.salaryRange} / mes
                </span>
              </>
            )}
          </p>
        </header>

        <section className="space-y-3 text-sm text-slate-200">
          <h2 className="text-sm font-semibold text-slate-100">Resumen del rol</h2>
          <p className="text-sm text-slate-300">{job.description}</p>

          <h3 className="mt-4 text-sm font-semibold text-slate-100">
            Responsabilidades
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-sm text-slate-300">
            <li>Colaborar con equipos multifuncionales para entregar características del producto.</li>
            <li>Escribir código limpio, mantenible y probado.</li>
            <li>Participar en revisiones de código y discusiones sobre arquitectura.</li>
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-slate-100">
            Requisitos
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-sm text-slate-300">
            <li>Experiencia relevante en un rol similar.</li>
            <li>Habilidades de comunicación y colaboración.</li>
            <li>Confortable trabajando en remoto o híbrido.</li>
          </ul>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-slate-50 shadow-sm hover:bg-primary-dark">
            Aplicar ahora
          </button>
          <button className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-primary/70 hover:text-primary">
            Guardar para más tarde
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-500">
          Al aplicar, serás redirigido al sitio del empleador o al canal de contacto.
        </p>
      </article>
    </section>
  );
}
