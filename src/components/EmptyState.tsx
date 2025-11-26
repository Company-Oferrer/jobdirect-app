interface Props {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = 'No se encontraron ofertas',
  message = 'Intenta ajustar tus filtros o términos de búsqueda.'
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-300">
        🔍
      </div>
      <h3 className="mb-1 text-base font-semibold text-slate-100">{title}</h3>
      <p className="max-w-sm text-xs text-slate-400">{message}</p>
    </div>
  );
}
