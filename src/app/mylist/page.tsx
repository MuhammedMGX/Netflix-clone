import { supabase } from "../lib/watchList/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import  {fetchMoviesByIds}  from "../lib/api/movies";
import { headers } from "next/headers";
import { MyListE, MobileMyListE } from "@/components/emblaCarousel";
import { dataInfo } from "../_interfaces/data-type";


export default async function WatchlistPage() {

    const headerInstance = await headers();
    const userAgent = headerInstance?.get('user-agent') || '';
    const Mobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      .test(userAgent);


  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  

  if (!userEmail) {
    return <p>Please log in to view your watchlist.</p>;
  }

  const { data, error } = await supabase
    .from("user_watchlists")
    .select("movie_ids , tv_ids")
    .eq("user_email", userEmail)
    .single();



  const movieIds = data?.movie_ids ?? [];
  const tvIds = data?.tv_ids ?? [];

  const movieData = await fetchMoviesByIds(movieIds , "movie")
  const tvData = await fetchMoviesByIds (tvIds , "tv")
  

  return (
        
          
              <div>
                {Mobile ?  <MobileMyListE MovieData={movieData} TvData={tvData} isMobile={Mobile} /> : <MyListE MovieData={movieData} TvData={tvData} isMobile={Mobile} /> }
              </div>

        
  );
}
