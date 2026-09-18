import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const FavoritesContext = createContext(null);

const STORAGE_KEY = 'ai-orbit:favorites';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage unavailable — favorites won't persist, but app still works
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (slug) => favorites.some((f) => f.slug === slug),
    [favorites]
  );

  const toggleFavorite = useCallback((tool) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.slug === tool.slug);
      if (exists) {
        return prev.filter((f) => f.slug !== tool.slug);
      }
      return [...prev, tool];
    });
  }, []);

  const removeFavorite = useCallback((slug) => {
    setFavorites((prev) => prev.filter((f) => f.slug !== slug));
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, toggleFavorite, removeFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
