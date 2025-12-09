import type React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function JobSearchBar({ value, onChange, onSearch }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-lg shadow-slate-950/50 mb-3">
      <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2">
        <span className="text-slate-400">🔎</span>
        <input
          className="flex-1 bg-transparent text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none"
          placeholder="Buscar por título, empresa o palabra clave..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={onSearch}
          className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-slate-50 shadow-sm hover:bg-primary-dark"
        >
          Buscar
        </button>
      </div>
      <p className="mt-1 px-2 text-[11px] text-slate-400">
        Consejo: prueba "frontend", "diseñador", o "remoto".
      </p>
    </div>
  );
}
