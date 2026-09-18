import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, size = 'md', placeholder = 'Search AI tools...' }) {
  const sizing = size === 'lg' ? 'py-4 text-base' : 'py-2.5 text-sm';

  return (
    <div className="relative w-full">
      <Search
        size={size === 'lg' ? 20 : 16}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search AI tools"
        className={`w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-10 ${sizing} text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.05]`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
