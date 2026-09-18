import { useEffect } from 'react';
import { X } from 'lucide-react';
import FilterPanel from './FilterPanel';
import SortDropdown from './SortDropdown';
import { CATEGORY_OPTIONS } from '../utils/formatters';

export default function FilterDrawer({ open, onClose, filters, onChange, onReset, onApply }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[#0A0A0A] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Filters</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-zinc-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Category</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ category: c === 'All' ? '' : c })}
                aria-pressed={(filters.category || 'All') === c}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  (filters.category || 'All') === c
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-white/10 text-zinc-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <FilterPanel filters={filters} onChange={onChange} />

        <div className="mt-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Sort</h3>
          <SortDropdown value={filters.sort} onChange={(sort) => onChange({ sort })} />
        </div>

        <div className="mt-6 flex gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-zinc-300"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 rounded-lg bg-white py-2.5 text-sm font-semibold text-black"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
