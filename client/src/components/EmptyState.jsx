import { SearchX } from 'lucide-react';

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'No tools found',
  message = "We couldn't find any AI tools matching your search or filters.",
  actionLabel = 'Clear filters',
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <Icon size={24} className="text-zinc-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-zinc-400">{message}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.08]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
