const STYLES = {
  Free: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Freemium: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Paid: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export default function PricingBadge({ type }) {
  const style = STYLES[type] || 'bg-white/5 text-zinc-300 border-white/10';
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${style}`}>
      {type}
    </span>
  );
}
