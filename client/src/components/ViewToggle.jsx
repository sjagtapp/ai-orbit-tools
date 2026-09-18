import { LayoutGrid, List } from 'lucide-react';

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.02] p-0.5" role="group" aria-label="Toggle view">
      <button
        type="button"
        onClick={() => onChange('grid')}
        aria-pressed={view === 'grid'}
        aria-label="Grid view"
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          view === 'grid' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'
        }`}
      >
        <LayoutGrid size={14} aria-hidden="true" />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        aria-pressed={view === 'list'}
        aria-label="List view"
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          view === 'list' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'
        }`}
      >
        <List size={14} aria-hidden="true" />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
}
