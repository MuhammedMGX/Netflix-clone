"use server"
import { EmblaCarousel, PostersSlides, MobileEmblaCarousel, MobilePostersSlides, ContinueWatchingMovies, MovieSlides, MobileTop10SlidesMovies, Top10SlidesMovies, MobileSlidesMovies } from "../../components/emblaCarousel";
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getAiringToday, getNowPlaying, getPopularMovies, getPopularTvSeries, getTop10Movies, getTop10TvSeries, getTrending, getTrendingMovies, getUpcomingMovies } from "../lib/api/movies";
import { headers } from "next/headers";

export default async function Movies() {

  const headerInstance = await headers();
  const userAgent = headerInstance?.get('user-agent') || '';
  const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    .test(userAgent);


    
  const TrendingMovies = await getTrendingMovies()

  const PopularMovies = await getPopularMovies()

  const top10Movies = await getTop10Movies()

  const UpcomingMovies = await getUpcomingMovies()
  


  return (
    <>



    <div>
      {isMobile ?  <MobileEmblaCarousel data={TrendingMovies} /> : <EmblaCarousel data={TrendingMovies} /> }
    </div>



    <div>
      {isMobile ? null : <ContinueWatchingMovies data={top10Movies} /> }
    </div>

  




    <div>
      {isMobile ? <MobileSlidesMovies data={PopularMovies} title={"Popular on Netflix"} /> : <MovieSlides data={PopularMovies} title={"Popular on Netflix"} /> }
    </div>


    <div>
      {isMobile ? <MobileSlidesMovies data={TrendingMovies} title={"Trending Movies"} /> : <MovieSlides data={TrendingMovies} title={"Trending Movies"} /> }
    </div>




    <div>
      {isMobile ? <MobileTop10SlidesMovies data={top10Movies} title={"Top 10 Movies"} /> : <Top10SlidesMovies data={top10Movies} title={"Top 10 Movies"} /> }
    </div>









    <div>
      {isMobile ? <MobileSlidesMovies data={PopularMovies} title={"Popular Movies"} /> : <MovieSlides data={PopularMovies} title={"Popular Movies"} /> }
    </div>








    <div>
      {isMobile ? <MobileSlidesMovies data={UpcomingMovies} title={"Upcoming Movies"} /> : <MovieSlides data={UpcomingMovies} title={"Upcoming Movies"} /> }
    </div>




    
    </>
  )
}
