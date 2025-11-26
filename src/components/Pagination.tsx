interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="mt-6 flex items-center justify-between text-xs text-slate-300">
      <button
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        className={`rounded-lg border px-3 py-1.5 ${
          canPrev
            ? 'border-slate-700 bg-slate-900 hover:border-primary/70'
            : 'cursor-not-allowed border-slate-800 bg-slate-900/60 text-slate-500'
        }`}
      >
        Previous
      </button>

      <div className="text-[11px] text-slate-400">
        Page{' '}
        <span className="font-semibold text-slate-100">
          {currentPage}
        </span>{' '}
        of {totalPages}
      </div>

      <button
        disabled={!canNext}
        onClick={() => canNext && onPageChange(currentPage + 1)}
        className={`rounded-lg border px-3 py-1.5 ${
          canNext
            ? 'border-slate-700 bg-slate-900 hover:border-primary/70'
            : 'cursor-not-allowed border-slate-800 bg-slate-900/60 text-slate-500'
        }`}
      >
        Next
      </button>
    </div>
  );
}
