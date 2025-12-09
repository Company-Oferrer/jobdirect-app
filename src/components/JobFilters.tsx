import FilterSelect from './FilterSelect';

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
      <FilterSelect
        label="Region"
        options={regions}
        value={selectedRegion}
        onChange={onRegionChange}
      />
      <FilterSelect
        label="Categoría"
        options={categories}
        value={selectedCategory}
        onChange={onCategoryChange}
      />
    </aside>
  );
}
