import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolLogo from './ToolLogo';
import Rating from './Rating';
import { fetchRelatedTools } from '../services/api';

export default function RelatedTools({ slug }) {
  const [tools, setTools] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchRelatedTools(slug)
      .then((data) => {
        if (cancelled) return;
        setTools(data.tools || []);
        setStatus('success');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
        ))}
      </div>
    );
  }

  if (status === 'error' || tools.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {tools.map((t) => (
        <Link
          key={t.slug}
          to={`/tools/${t.slug}`}
          className="flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20"
        >
          <ToolLogo name={t.name} logo={t.logo} size={32} />
          <span className="truncate text-sm font-medium text-white">{t.name}</span>
          <Rating value={t.rating} size={12} />
        </Link>
      ))}
    </div>
  );
}
