import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import useFavorites from '../hooks/useFavorites';
import ToolGrid from '../components/ToolGrid';
import ToolList from '../components/ToolList';
import ViewToggle from '../components/ViewToggle';
import EmptyState from '../components/EmptyState';

export default function Favorites() {
  const { favorites } = useFavorites();
  const [view, setView] = useState(() => localStorage.getItem('ai-orbit:view') || 'grid');
  const navigate = useNavigate();

  function handleViewChange(next) {
    setView(next);
    localStorage.setItem('ai-orbit:view', next);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Saved Tools</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {favorites.length} tool{favorites.length === 1 ? '' : 's'} saved
          </p>
        </div>
        {favorites.length > 0 && <ViewToggle view={view} onChange={handleViewChange} />}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved tools yet"
          message="Save tools you want to come back to later."
          actionLabel="Explore AI Tools"
          onAction={() => navigate('/tools')}
        />
      ) : view === 'grid' ? (
        <ToolGrid tools={favorites} />
      ) : (
        <ToolList tools={favorites} />
      )}
    </div>
  );
}
