import { useEffect, useMemo, useState } from 'react';
import JobFilters from '@/components/JobFilters';
import JobList from '@/components/JobList';
import Pagination from '@/components/Pagination';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import EmptyState from '@/components/EmptyState';
import { useJobs } from '@/hooks/useJobs';
import { seedJobs } from '@/services/api';
import { regions } from '@/data/regions';
import { categories } from '@/data/categories';
import type { Job } from '@/types/job';

const PAGE_SIZE = 5;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Todas las regiones');
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const { jobs: allJobs, isLoading, error, refetch } = useJobs();

  useEffect(() => {
    const flag = localStorage.getItem('isAdmin');
    setIsAdmin(flag === 'true');
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleSeed = async () => {
    try {
      setSeedMessage(null);
      setIsSeeding(true);
      await seedJobs();
      await refetch();
      setSeedMessage('Seed ejecutado correctamente.');
    } catch (err) {
      setSeedMessage(err instanceof Error ? err.message : 'Error al ejecutar seed.');
    } finally {
      setIsSeeding(false);
    }
  };

  const filteredJobs = useMemo(() => {
    if (!allJobs.length) return [];

    const query = searchQuery.toLowerCase().trim();

    const result = allJobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.shortDescription.toLowerCase().includes(query) ||
        job.tags?.some((t) => t.toLowerCase().includes(query));

      const matchesRegion =
        selectedRegion === 'Todas las regiones' || job.region === selectedRegion;

      const matchesCategory =
        selectedCategory === 'Todas las categorías' || job.category === selectedCategory;

      return matchesQuery && matchesRegion && matchesCategory;
    });

    return result.sort(
      (a: Job, b: Job) =>
        new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
  }, [allJobs, searchQuery, selectedRegion, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [filteredJobs, currentPage]);

  return (
    <section className="relative">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/20 via-slate-950 to-slate-950 blur-2xl" />

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
        <div className="flex flex-col gap-4 text-center md:mt-4 md:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Impulsa tu carrera: encuentra tu próxima oportunidad profesional aquí.
          </h1>
          <p className="mx-auto max-w-2xl text-xs text-slate-300 md:mx-0">
            Encuentra trabajos de alta calidad de empresas que contratan directamente — sin spam,
            sin formularios interminables. Filtra por región y categoría para encontrar los roles que realmente
            te interesan.
          </p>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSeed}
              disabled={isSeeding}
              className="rounded-md border border-slate-600/60 px-3 py-1 text-[11px] font-medium text-slate-100 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSeeding ? 'Ejecutando seed...' : 'Seed (admin)'}
            </button>
            {seedMessage && (
              <span className="text-[11px] text-slate-300">{seedMessage}</span>
            )}
          </div>
        )}
        <div className="mt-6 grid gap-6 md:grid-cols-[260px,1fr]">
          <div className="md:sticky md:top-20">
            <JobFilters
              regions={regions}
              categories={categories}
              selectedRegion={selectedRegion}
              selectedCategory={selectedCategory}
              onRegionChange={(value) => {
                // setSelectedRegion(value);
                // setCurrentPage(1);
              }}
              onCategoryChange={(value) => {
                // setSelectedCategory(value);
                // setCurrentPage(1);
              }}
            />
          </div>

          <div>
            {isLoading ? (
              <div className="space-y-4">
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
              </div>
            ) : error ? (
              <EmptyState
                title="Error al cargar las ofertas"
                message={error}
              />
            ) : (
              <>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span>
                    Mostrando{" "}
                    <span className="font-semibold text-slate-100">
                      {filteredJobs.length}
                    </span>{" "}
                    ofertas
                  </span>
                </div>
                <JobList jobs={paginatedJobs} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
