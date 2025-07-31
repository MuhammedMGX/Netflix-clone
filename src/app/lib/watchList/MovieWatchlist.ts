// hooks/useWatchlist.ts
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useWatchlist() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userEmail) return;
    fetchWatchlist();
  }, [userEmail]);

  async function fetchWatchlist() {
    const { data, error } = await supabase
    .from("user_watchlists")
    .select("movie_ids")
    .eq("user_email", userEmail)
    .single();
  
  }
  
  

  function isInWatchlist(movieId: number) {
    return movieIds.includes(movieId);
  }

  return {
    loading,
    movieIds,
    toggleWatchlist,
    isInWatchlist,
  };
}



export async function toggleWatchlist(movieId: number, userEmail: string) {
  // جلب الـ watchlist الحالية
  const { data, error } = await supabase
    .from("user_watchlists")
    .select("movie_ids")
    .eq("user_email", userEmail)
    .single();

  if (error && error.code !== "PGRST116") {
    // لو حصل خطأ غير "not found"
    console.error("Error fetching user watchlist:", error);
    return;
  }

  // تأكد إن movie_ids مصفوفة
  const currentMovieIds: number[] = Array.isArray(data?.movie_ids)
    ? data!.movie_ids
    : [];

  // تحقق هل الفيلم موجود
  const alreadyInWatchlist = currentMovieIds.includes(movieId);

  // لو موجود، شيله، ولو مش موجود أضفه
  const updatedMovieIds = alreadyInWatchlist
    ? currentMovieIds.filter((id) => id !== movieId)
    : [...currentMovieIds, movieId];

  // استخدم upsert مع onConflict لتحديث أو إدخال جديد
  const { error: upsertError } = await supabase
    .from("user_watchlists")
    .upsert(
      [
        {
          user_email: userEmail,
          movie_ids: updatedMovieIds,
        },
      ],
      { onConflict: "user_email" }
    );

  if (upsertError) {
    console.error("Error upserting watchlist:", upsertError);
  } else {
    console.log(
      alreadyInWatchlist
        ? "Movie removed from watchlist"
        : "Movie added to watchlist"
    );
  }
}
