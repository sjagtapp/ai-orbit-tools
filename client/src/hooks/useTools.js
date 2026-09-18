import { useCallback, useEffect, useState } from 'react';
import { fetchTools } from '../services/api';

export default function useTools(params) {
  const [tools, setTools] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => setReloadToken((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);
      try {
        const data = await fetchTools(params);
        if (cancelled) return;
        setTools(data.tools || []);
        setMeta({
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
        });
        setStatus('success');
      } catch (err) {
        if (cancelled) return;
        setError(err.message || 'Something went wrong');
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params), reloadToken]);

  return { tools, meta, status, error, reload };
}
