import { Link } from 'react-router-dom';
import { Orbit } from 'lucide-react';

const LINKS = ['Tools', 'Companies', 'Leaderboard', 'Business', 'Learn'];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-semibold text-white">
            <Orbit size={18} aria-hidden="true" />
            <span>AI Orbit</span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">Discover AI tools and technologies.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {LINKS.map((l) => (
            <Link key={l} to={l === 'Tools' ? '/tools' : '#'} className="text-sm text-zinc-400 hover:text-white">
              {l}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
