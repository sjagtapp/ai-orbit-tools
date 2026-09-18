import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import ToolLogo from './ToolLogo';
import Rating from './Rating';
import PricingBadge from './PricingBadge';
import useFavorites from '../hooks/useFavorites';
import { useToast } from '../context/ToastContext.jsx';

function ToolRow({ tool }) {
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
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.035]"
    >
      <ToolLogo name={tool.name} logo={tool.logo} size={40} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-white">{tool.name}</h3>
          <span className="hidden text-xs text-zinc-500 sm:inline">{tool.companyName}</span>
        </div>
        <p className="truncate text-xs text-zinc-500 sm:hidden">{tool.companyName}</p>
      </div>

      <span className="hidden shrink-0 text-xs text-zinc-400 md:inline">{tool.categories[0]}</span>

      <div className="hidden shrink-0 sm:block">
        <Rating value={tool.rating} />
      </div>

      <div className="hidden shrink-0 lg:block">
        <PricingBadge type={tool.pricing?.type} />
      </div>

      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label={favorited ? 'Remove from favorites' : 'Save tool'}
        aria-pressed={favorited}
        className="shrink-0 rounded-full p-1.5 text-zinc-500 hover:text-white"
      >
        <Heart size={16} className={favorited ? 'fill-rose-500 text-rose-500' : ''} aria-hidden="true" />
      </button>

      <ArrowRight size={16} className="shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

export default function ToolList({ tools }) {
  return (
    <div className="flex flex-col gap-2">
      {tools.map((tool) => (
        <ToolRow key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
