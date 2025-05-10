// hooks/useWatchlist.ts
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useWatchlist() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  const [tvIds, settvIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userEmail) return;
    fetchWatchlist();
  }, [userEmail]);

  async function fetchWatchlist() {
    const { data, error } = await supabase
    .from("user_watchlists")
    .select("tv_ids")
    .eq("user_email", userEmail)
    .single();
  
  }
  
  

  function isInWatchlist(tvId: number) {
    return tvIds.includes(tvId);
  }

  return {
    loading,
    tvIds,
    toggleWatchlist,
    isInWatchlist,
  };
}



export async function toggleWatchlist(tvId: number, userEmail: string) {
  // جلب الـ watchlist الحالية
  const { data, error } = await supabase
    .from("user_watchlists")
    .select("tv_ids")
    .eq("user_email", userEmail)
    .single();

  if (error && error.code !== "PGRST116") {
    // لو حصل خطأ غير "not found"
    console.error("Error fetching user watchlist:", error);
    return;
  }

  // تأكد إن tv_ids مصفوفة
  const currenttvIds: number[] = Array.isArray(data?.tv_ids)
    ? data!.tv_ids
    : [];

  // تحقق هل الفيلم موجود
  const alreadyInWatchlist = currenttvIds.includes(tvId);

  // لو موجود، شيله، ولو مش موجود أضفه
  const updatedtvIds = alreadyInWatchlist
    ? currenttvIds.filter((id) => id !== tvId)
    : [...currenttvIds, tvId];

  // استخدم upsert مع onConflict لتحديث أو إدخال جديد
  const { error: upsertError } = await supabase
    .from("user_watchlists")
    .upsert(
      [
        {
          user_email: userEmail,
          tv_ids: updatedtvIds,
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
