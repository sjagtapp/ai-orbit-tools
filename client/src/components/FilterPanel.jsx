import { PRICING_OPTIONS, RATING_OPTIONS } from '../utils/formatters';

export default function FilterPanel({ filters, onChange }) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Pricing</legend>
        <div className="flex flex-col gap-1.5">
          {PRICING_OPTIONS.map((p) => (
            <label key={p} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={filters.pricing === p}
                onChange={() => onChange({ pricing: filters.pricing === p ? '' : p })}
                className="h-4 w-4 rounded border-white/20 bg-transparent accent-white"
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Rating</legend>
        <div className="flex flex-col gap-1.5">
          {RATING_OPTIONS.map((r) => (
            <label key={r.value} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={filters.minRating === r.value}
                onChange={() => onChange({ minRating: filters.minRating === r.value ? '' : r.value })}
                className="h-4 w-4 rounded border-white/20 bg-transparent accent-white"
              />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
