export default function LoadingSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
      <div className="flex gap-2">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-16 animate-pulse rounded bg-slate-800" />
      </div>
      <div className="h-3 w-full animate-pulse rounded bg-slate-800" />
      <div className="h-3 w-3/4 animate-pulse rounded bg-slate-800" />
      <div className="flex gap-2">
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-800" />
        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-800" />
      </div>
    </div>
  );
}
