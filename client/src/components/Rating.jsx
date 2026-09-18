import { Star } from 'lucide-react';

export default function Rating({ value = 0, size = 14, showValue = true }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-white" aria-label={`Rated ${value} out of 5`}>
      <Star size={size} className="fill-amber-400 text-amber-400" aria-hidden="true" />
      {showValue && <span className="font-medium">{value.toFixed ? value.toFixed(1) : value}</span>}
    </span>
  );
}
