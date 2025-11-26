interface Props {
  regions: string[];
  categories: string[];
  selectedRegion: string;
  selectedCategory: string;
  onRegionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function JobFilters({
  regions,
  categories,
  selectedRegion,
  selectedCategory,
  onRegionChange,
  onCategoryChange
}: Props) {
  return (
    <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200 shadow-md shadow-slate-950/40">
      <div>
        <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Region
        </h3>
        <select
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-primary focus:outline-none"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Categoría
        </h3>
        <select
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-primary focus:outline-none"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
