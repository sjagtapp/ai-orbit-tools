import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <Compass size={26} className="text-zinc-400" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">404</p>
      <h1 className="mt-2 text-2xl font-bold text-white">Tool not found</h1>
      <p className="mt-2 text-sm text-zinc-400">
        The AI tool you're looking for doesn't exist or may have been removed.
      </p>
      <Link
        to="/tools"
        className="mt-6 rounded-lg border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white hover:border-white/25"
      >
        Browse AI Tools
      </Link>
    </div>
  );
}
