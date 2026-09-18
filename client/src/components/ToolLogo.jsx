import { useState } from 'react';
import { initials } from '../utils/formatters';

export default function ToolLogo({ name, logo, size = 44 }) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="rounded-xl border border-white/10 object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-semibold text-zinc-200"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials(name) || '•'}
    </div>
  );
}
