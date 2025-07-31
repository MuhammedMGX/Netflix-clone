import { useEffect, useState } from "react";
import { toggleWatchlist } from "./MovieWatchlist";
import { supabase } from "./supabase";
import plus from '@/../public/icons/plus.png'
import plusHover from '@/../public/icons/plusHover.png'


export default function MovieWatchlistButton({
  movieId,
  userEmail,
}: {
  movieId: number;
  userEmail: any;
}) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isInWatchlist, setIsInWatchlist] = useState(false);

  // const handleClick = async () => {
  //   setIsLoading(true);
  //   await toggleWatchlist(movieId, userEmail);
  //   setIsLoading(false);
  // };
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check if movie is in watchlist
  useEffect(() => {
    if (!userEmail) {
      console.warn("No user email provided");
      setLoading(false);
      return;
    }
  
    const fetchWatchlist = async () => {
      const { data, error } = await supabase
        .from("user_watchlists")
        .select("movie_ids")
        .eq("user_email", userEmail)
        .maybeSingle(); // بدل single() ✅
  
      if (error) {
        console.error("Error fetching watchlist:", error);
        setLoading(false);
        return;
      }
  
      const movieIds: number[] = Array.isArray(data?.movie_ids)
        ? data.movie_ids
        : [];
  
      setIsInWatchlist(movieIds.includes(movieId));
      setLoading(false);
    };
  
    fetchWatchlist();
  }, [movieId, userEmail]);


  // ✅ Toggle handler
  const handleToggle = async () => {
    setLoading(true);
    await toggleWatchlist(movieId, userEmail);
    setIsInWatchlist((prev) => !prev); // عكس القيمة الحالية
    setLoading(false);
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