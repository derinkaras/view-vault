import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for searching anime using the Jikan API
 * @param {string} query - The search query
 * @returns {Object} - Data, loading state, error state, and utility functions
 */



function useAnimeSearch(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cacheSource, setCacheSource] = useState(null); // "memory", "localStorage", or "api"

  // In-memory cache for the current session
  const cacheRef = useRef({});

  useEffect(() => {
    const fetchAnime = async () => {
      if (!query) {
        setData(null);
        setCacheSource(null);
        return;
      }
      
      try {
        // Check in-memory cache first
        if (cacheRef.current[query]) {
          console.log(`Retrieving cache data on ${query} from in-memory cache`);
          setData(cacheRef.current[query]);
          setCacheSource("memory");
          return; // Stop execution after setting from cache
        }
        
        // Check local storage cache next
        const localCache = localStorage.getItem(`anime-search-${query}`);
        if (localCache) {
          console.log(`Retrieving cache data on ${query} from localStorage cache`);
          const parsedData = JSON.parse(localCache);
          setData(parsedData);
          
          // Also update in-memory cache for future use
          cacheRef.current[query] = parsedData;
          
          setCacheSource("localStorage");
          return; // Stop execution after setting from localStorage
        }
        
        // If we get here, we need to fetch from API
        setLoading(true);
        
        // Use Jikan API v4
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=20`);
        
        // Handle rate limiting (Jikan has strict rate limits)
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Transform the data to only include what we need
        const simplifiedResults = result.data.map(anime => ({
          Title: anime.title,
          Year: anime.aired?.prop?.from?.year || 'Unknown',
          imdbID: anime.mal_id,
          Type: anime.type || 'Unknown',
          Poster: anime.images?.jpg?.image_url || null
        }));
        
        setData(simplifiedResults);
        setCacheSource("api");
        
        // Store in both caches
        cacheRef.current[query] = simplifiedResults;
        localStorage.setItem(`anime-search-${query}`, JSON.stringify(simplifiedResults));
      } catch (error) {
        console.error("Error fetching anime:", error);
        setError(error.message);
        setData(null);
        setCacheSource(null);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent excessive API calls while typing
    const timeoutId = setTimeout(() => {
      fetchAnime();
    }, 500);

    // Clean up the timeout
    return () => clearTimeout(timeoutId);
  }, [query]);

  /**
   * Clear the cache for the current query
   */
  const clearCache = () => {
    // Clear in-memory cache for this query
    if (query && cacheRef.current[query]) {
      delete cacheRef.current[query];
    }
    
    // Clear localStorage for this query
    if (query) {
      localStorage.removeItem(`anime-search-${query}`);
    }
    
    // Force a refresh from API by setting cache source to null
    setCacheSource(null);
  };

  /**
   * Clear all anime search caches
   */
  const clearAllCaches = () => {
    // Clear all in-memory caches
    cacheRef.current = {};
    
    // Clear all localStorage items that start with 'anime-search-'
    Object.keys(localStorage)
      .filter(key => key.startsWith('anime-search-'))
      .forEach(key => localStorage.removeItem(key));
    
    // Force a refresh
    setCacheSource(null);
  };

  return { 
    data, 
    loading, 
    error, 
    setError,
    cacheSource,
    clearCache,
    clearAllCaches
  };
}

export default useAnimeSearch;