import { useEffect, useState } from "react";
import { toggleWatchlist } from "./TvWatchlist";
import { supabase } from "./supabase";
import plus from '@/../public/icons/plus.png'
import plusHover from '@/../public/icons/plusHover.png'



export default function TvWatchlistButton({  tvId,  userEmail,}: {  tvId: number; userEmail: any;}) {

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
        .select("tv_ids")
        .eq("user_email", userEmail)
        .maybeSingle(); // بدل single() ✅
  
      if (error) {
        console.error("Error fetching watchlist:", error);
        setLoading(false);
        return;
      }
  
      const tvIds: number[] = Array.isArray(data?.tv_ids)
        ? data.tv_ids
        : [];
  
      setIsInWatchlist(tvIds.includes(tvId));
      setLoading(false);
    };
  
    fetchWatchlist();
  }, [tvId, userEmail]);


  // ✅ Toggle handler
  const handleToggle = async () => {
    setLoading(true);
    await toggleWatchlist(tvId, userEmail);
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