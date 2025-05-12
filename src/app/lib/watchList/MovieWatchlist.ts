// hooks/useWatchlist.ts
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "../watchList/supabase";

export function useWatchlist() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userEmail) {
      setMovieIds([]);
      return;
    }
    fetchWatchlist();
  }, [userEmail]);

  async function fetchWatchlist() {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("user_watchlists")
        .select("movie_ids")
        .eq("user_email", userEmail)
        .single();

      if (error && error.code !== "PGRST116") { // PGRST116 = no rows found
        throw error;
      }

      setMovieIds(Array.isArray(data?.movie_ids) ? data.movie_ids : []);
    } catch (err) {
      console.error("Error fetching watchlist:", err);
      setError("Failed to load watchlist");
    } finally {
      setLoading(false);
    }
  }

  async function toggleWatchlist(movieId: number) {
    if (!userEmail) return;

    setLoading(true);
    setError(null);
    
    try {
      // Get current watchlist
      const { data, error } = await supabase
        .from("user_watchlists")
        .select("movie_ids")
        .eq("user_email", userEmail)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      const currentMovieIds: number[] = Array.isArray(data?.movie_ids)
        ? data.movie_ids
        : [];

      const updatedMovieIds = currentMovieIds.includes(movieId)
        ? currentMovieIds.filter(id => id !== movieId)
        : [...currentMovieIds, movieId];

      // Upsert the updated watchlist
      const { error: upsertError } = await supabase
        .from("user_watchlists")
        .upsert(
          { user_email: userEmail, movie_ids: updatedMovieIds },
          { onConflict: "user_email" }
        );

      if (upsertError) {
        throw upsertError;
      }

      setMovieIds(updatedMovieIds);
    } catch (err) {
      console.error("Error updating watchlist:", err);
      setError("Failed to update watchlist");
    } finally {
      setLoading(false);
    }
  }

  function isInWatchlist(movieId: number) {
    return movieIds.includes(movieId);
  }

  return {
    loading,
    error,
    movieIds,
    toggleWatchlist,
    isInWatchlist,
    refetch: fetchWatchlist
  };
}