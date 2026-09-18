import { SORT_OPTIONS } from '../utils/formatters';

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Sort tools
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-white/25"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0A0A0A]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
