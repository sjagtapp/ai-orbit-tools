import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Orbit, Search, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Explore', to: '/tools' },
  { label: 'Tools', to: '/tools' },
  { label: 'Companies', to: '#' },
  { label: 'Leaderboard', to: '#' },
  { label: 'Business', to: '#' },
  { label: 'Learn', to: '#' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050505]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/tools" className="flex items-center gap-2 font-semibold text-white">
          <Orbit size={20} className="text-white" aria-hidden="true" />
          <span>AI Orbit</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = item.label === 'Tools' && location.pathname.startsWith('/tools');
            return (
              <Link
                key={`${item.label}-${idx}`}
                to={item.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/tools"
            aria-label="Search AI tools"
            className="rounded-lg border border-white/10 p-2 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <Search size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-semibold text-zinc-300"
            aria-label="Account"
          >
            AO
          </button>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-zinc-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Primary mobile">
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={`m-${item.label}-${idx}`}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/[0.04] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
