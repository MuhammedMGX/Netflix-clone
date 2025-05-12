// components/MovieWatchlistButton.tsx
import { useEffect, useState } from "react";
import { supabase } from "../watchList/supabase";
import plus from '@/../public/icons/plus.png';
import plusHover from '@/../public/icons/plusHover.png';
import Image from "next/image";

interface MovieWatchlistButtonProps {
  movieId: number;
  userEmail: string | null | undefined;
}

export default function MovieWatchlistButton({
  movieId,
  userEmail,
}: MovieWatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userEmail) {
      setIsInWatchlist(false);
      setLoading(false);
      return;
    }

    const fetchWatchlist = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from("user_watchlists")
          .select("movie_ids")
          .eq("user_email", userEmail)
          .maybeSingle();

        if (error) {
          throw error;
        }

        const movieIds: number[] = Array.isArray(data?.movie_ids)
          ? data.movie_ids
          : [];

        setIsInWatchlist(movieIds.includes(movieId));
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [movieId, userEmail]);

  const handleToggle = async () => {
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

      setIsInWatchlist(!isInWatchlist);
    } catch (err) {
      console.error("Error updating watchlist:", err);
      setError("Failed to update watchlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? <img src={plusHover.src} className='h-full rotate-45 hover:opacity-50' alt="" /> : isInWatchlist ? <img src={plusHover.src} className='h-full rotate-45 hover:opacity-50' alt="" /> :  <img src={plus.src} className='h-full hover:opacity-50' alt="" /> }

    </button>

  );
}