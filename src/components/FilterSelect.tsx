interface FilterSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label,
  options,
  value,
  onChange
}: FilterSelectProps) {
  return (
    <div>
      <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </h3>
      <select
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-primary focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

