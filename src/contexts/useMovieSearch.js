// Custom hooks is the best practice for retrieving from an API 
import { useState, useEffect, useRef } from 'react';

function useMovieSearch(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cacheSource, setCacheSource] = useState(null); // "memory", "localStorage", or "api"

  // In-memory cache for the current session
  const cacheRef = useRef({});

  useEffect(() => {
    const fetchMovies = async () => {
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
          return; // Important: stop execution after setting from cache
        }
        
        // Check local storage cache next
        const localCache = localStorage.getItem(`movie-search-${query}`);
        if (localCache) {
          console.log(`Retrieving cache data on ${query} from localStorage cache`);
          const parsedData = JSON.parse(localCache);
          setData(parsedData);
          
          // Also update in-memory cache for future use
          cacheRef.current[query] = parsedData;
          
          setCacheSource("localStorage");
          return; // Important: stop execution after setting from localStorage
        }
        
        // If we get here, we need to fetch from API
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        
        // Check if the API returned an error
        if (result.Error) {
          throw new Error(result.Error);
        }
        
        const movieResults = result.Search;
        setData(movieResults);
        setCacheSource("api");
        
        // Store in both caches using the SAME FORMAT
        cacheRef.current[query] = movieResults;
        localStorage.setItem(`movie-search-${query}`, JSON.stringify(movieResults));
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
        setData(null);
        setCacheSource(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  // Helper function to clear cache
  const clearCache = () => {
    // Clear in-memory cache for this query
    if (query && cacheRef.current[query]) {
      delete cacheRef.current[query];
    }
    
    // Clear localStorage for this query
    if (query) {
      localStorage.removeItem(`movie-search-${query}`);
    }
    
    // Force a refresh from API
    setCacheSource(null);
  };

  return { data, loading, error, setError };
}

export default useMovieSearch;