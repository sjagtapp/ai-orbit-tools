export default function CategoryBadge({ label, active = false, onClick, as = 'span' }) {
  const classes = `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
    active
      ? 'border-white/30 bg-white/10 text-white'
      : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
  }`;

  if (as === 'button' || onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-pressed={active}>
        {label}
      </button>
    );
  }
  return <span className={classes}>{label}</span>;
}
