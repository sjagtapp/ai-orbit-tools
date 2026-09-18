function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-start justify-between">
        <div className="h-11 w-11 rounded-xl bg-white/[0.06]" />
        <div className="h-6 w-6 rounded-full bg-white/[0.06]" />
      </div>
      <div className="mt-4 h-4 w-2/3 rounded bg-white/[0.06]" />
      <div className="mt-2 h-3 w-1/3 rounded bg-white/[0.05]" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.05]" />
        <div className="h-3 w-5/6 rounded bg-white/[0.05]" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-white/[0.05]" />
        <div className="h-5 w-20 rounded-full bg-white/[0.05]" />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="h-3 w-16 rounded bg-white/[0.05]" />
        <div className="h-3 w-10 rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 12 }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
      aria-label="Loading AI tools"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
