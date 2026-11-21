import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem('scentory_favourites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('scentory_favourites', JSON.stringify(favourites));
    } catch (err) {
      console.error('Error saving favourites to localStorage:', err);
    }
  }, [favourites]);

  const toggleFavourite = (productId) => {
    if (!productId) return;
    setFavourites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isFavourite = (productId) => {
    return favourites.includes(productId);
  };

  return (
    <FavouritesContext.Provider value={{
      favourites,
      toggleFavourite,
      isFavourite,
      favouritesCount: favourites.length
    }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
