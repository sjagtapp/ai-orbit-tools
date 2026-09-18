import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import FilterDrawer from '../components/FilterDrawer';
import SortDropdown from '../components/SortDropdown';
import ViewToggle from '../components/ViewToggle';
import ToolGrid from '../components/ToolGrid';
import ToolList from '../components/ToolList';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CategoryBadge from '../components/CategoryBadge';
import useTools from '../hooks/useTools';
import useDebounce from '../hooks/useDebounce';
import { CATEGORY_OPTIONS } from '../utils/formatters';

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState(() => localStorage.getItem('ai-orbit:view') || 'grid');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(null);

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const pricing = searchParams.get('pricing') || '';
  const minRating = searchParams.get('minRating') || '';
  const sort = searchParams.get('sort') || 'popular';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(q);
  const debouncedSearch = useDebounce(searchInput, 300);

  const filters = useMemo(
    () => ({ q, category, pricing, minRating, sort, page }),
    [q, category, pricing, minRating, sort, page]
  );

  const activeFilters = draftFilters || filters;

  function updateParams(patch, { resetPage = true } = {}) {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, val]) => {
      if (val === '' || val == null) {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    if (resetPage && !('page' in patch)) {
      next.delete('page');
    }
    setSearchParams(next);
  }

  // Sync debounced search text into URL
  useMemo(() => {
    if (debouncedSearch !== q) {
      updateParams({ q: debouncedSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const apiParams = useMemo(
    () => ({
      q: filters.q,
      category: filters.category,
      pricing: filters.pricing,
      minRating: filters.minRating,
      sort: filters.sort,
      page: filters.page,
      limit: 12,
    }),
    [filters]
  );

  const { tools, meta, status, error, reload } = useTools(apiParams);

  const handleViewChange = useCallback((next) => {
    setView(next);
    localStorage.setItem('ai-orbit:view', next);
  }, []);

  function handleClearFilters() {
    setSearchInput('');
    setSearchParams({});
  }

  function openDrawer() {
    setDraftFilters(filters);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setDraftFilters(null);
  }

  function applyDrawer() {
    updateParams(draftFilters, { resetPage: false });
    closeDrawer();
  }

  function resetDrawer() {
    setDraftFilters({ q: filters.q, category: '', pricing: '', minRating: '', sort: 'popular', page: 1 });
  }

  const hasActiveFilters = Boolean(category || pricing || minRating || q);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-white/[0.06] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">AI Tools</h1>
          <p className="mt-3 text-base text-zinc-400">
            Discover the best AI tools for productivity, creativity, development, research and more.
          </p>
          <div className="mt-7">
            <SearchBar value={searchInput} onChange={setSearchInput} size="lg" />
          </div>
        </div>
      </section>

      {/* Category nav */}
      <section className="border-b border-white/[0.06] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto scrollbar-thin">
          {CATEGORY_OPTIONS.map((c) => (
            <div key={c} className="shrink-0">
              <CategoryBadge
                label={c}
                active={(category || 'All') === c}
                onClick={() => updateParams({ category: c === 'All' ? '' : c })}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden w-56 shrink-0 md:block">
            <h2 className="mb-4 text-sm font-semibold text-white">Filters</h2>
            <FilterPanel filters={filters} onChange={(patch) => updateParams(patch)} />
          </aside>

          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-zinc-400">
                {status === 'loading' ? 'Loading…' : `${meta.total.toLocaleString()} AI tools`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openDrawer}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 md:hidden"
                >
                  <SlidersHorizontal size={14} aria-hidden="true" />
                  Filters
                </button>
                <SortDropdown value={sort} onChange={(val) => updateParams({ sort: val })} />
                <ViewToggle view={view} onChange={handleViewChange} />
              </div>
            </div>

            {status === 'loading' && <LoadingSkeleton count={12} />}

            {status === 'error' && (
              <ErrorState message={error || "We couldn't load the AI tools."} onAction={reload} />
            )}

            {status === 'success' && tools.length === 0 && (
              <EmptyState onAction={hasActiveFilters ? handleClearFilters : undefined} />
            )}

            {status === 'success' && tools.length > 0 && (
              <>
                {view === 'grid' ? <ToolGrid tools={tools} /> : <ToolList tools={tools} />}
                <Pagination page={meta.page} totalPages={meta.totalPages} onChange={(p) => updateParams({ page: p }, { resetPage: false })} />
              </>
            )}
          </div>
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        filters={draftFilters || filters}
        onChange={(patch) => setDraftFilters((prev) => ({ ...(prev || filters), ...patch }))}
        onReset={resetDrawer}
        onApply={applyDrawer}
      />
    </div>
  );
}
