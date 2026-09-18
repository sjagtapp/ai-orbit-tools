import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import ToolLogo from './ToolLogo';
import Rating from './Rating';
import PricingBadge from './PricingBadge';
import CategoryBadge from './CategoryBadge';
import useFavorites from '../hooks/useFavorites';
import { useToast } from '../context/ToastContext.jsx';
import { formatCount } from '../utils/formatters';

export default function ToolCard({ tool }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorited = isFavorite(tool.slug);

  function handleFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool);
    showToast(favorited ? 'Tool removed from saved tools' : 'Tool saved');
  }

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.035] motion-reduce:transform-none"
    >
      <div className="flex items-start justify-between">
        <ToolLogo name={tool.name} logo={tool.logo} />
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from favorites' : 'Save tool'}
          aria-pressed={favorited}
          className="rounded-full p-1.5 text-zinc-500 transition-colors hover:text-white"
        >
          <Heart
            size={18}
            className={favorited ? 'fill-rose-500 text-rose-500' : ''}
            aria-hidden="true"
          />
        </button>
      </div>

      <h3 className="mt-4 truncate text-base font-semibold text-white">{tool.name}</h3>
      <p className="text-xs text-zinc-500">{tool.companyName}</p>

      <p className="mt-3 line-clamp-2 text-sm text-zinc-400">{tool.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.categories.slice(0, 2).map((c) => (
          <CategoryBadge key={c} label={c} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Rating value={tool.rating} />
          <span>· {formatCount(tool.reviewCount)} reviews</span>
        </div>
        <div className="flex items-center gap-2">
          <PricingBadge type={tool.pricing?.type} />
          <ArrowRight
            size={16}
            className="text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
