"use server"
import { EmblaCarousel, PostersSlides, MobileEmblaCarousel, MobilePostersSlides, TvSlides, MovieSlides, ContinueWatchingMovies, Top10SlidesMovies, Top10SlidesTV, MobileTop10SlidesMovies, MobileTop10SlidesTV, MobileSlidesMovies, MobileSlidesTV } from "../../components/emblaCarousel";
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getAiringToday, getNowPlaying, getPopularMovies, getPopularTvSeries, getTop10Movies, getTop10TvSeries, getTrending, getTrendingMovies, getUpcomingMovies } from "../lib/api/movies";
import { headers } from "next/headers";

export default async function Home() {

  const headerInstance = await headers();
  const userAgent = headerInstance?.get('user-agent') || '';
  const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    .test(userAgent);


  const TrendingMovies = await getTrendingMovies()

  const trending = await getTrending()
  const nowPlaying = await getNowPlaying()

  const PopularMovies = await getPopularMovies()
  const PopularTvSeries = await getPopularTvSeries()

  const top10Movies = await getTop10Movies()
  const top10TvSeries = await getTop10TvSeries()

  const UpcomingMovies = await getUpcomingMovies()
  const AiringToday = await getAiringToday()


  
  

  return (
    <>



    <div>
      {isMobile ?  <MobileEmblaCarousel data={TrendingMovies} /> : <EmblaCarousel data={TrendingMovies} /> }
    </div>



    <div>
      {isMobile ? null : <ContinueWatchingMovies data={nowPlaying} /> }
    </div>

  




    <div>
      {isMobile ? <MobileSlidesMovies data={PopularMovies} title={"Popular on Netflix"} /> : <MovieSlides data={PopularMovies} title={"Popular on Netflix"} /> }
    </div>




    <div>
      {isMobile ? <MobileTop10SlidesMovies data={top10Movies} title={"Top 10 Movies"} /> : <Top10SlidesMovies data={top10Movies} title={"Top 10 Movies"} /> }
    </div>



    <div>
      {isMobile ? <MobileTop10SlidesTV data={top10TvSeries} title={"Top 10 Tv Series"}/> : <Top10SlidesTV data={top10TvSeries} title={"Top 10 Tv Series"}/> }
    </div>






    <div>
      {isMobile ? <MobileSlidesTV data={PopularTvSeries} title={"Popular Tv Series"} /> : <TvSlides data={PopularTvSeries} title={"Popular Tv Series"} /> }
    </div>


    


    <div>
      {isMobile ? <MobilePostersSlides data={top10Movies} title={"Worth the Watch"} /> : <PostersSlides data={top10Movies} title={"Worth the Watch"} /> }
    </div>






    <div>
      {isMobile ? <MobileSlidesMovies data={UpcomingMovies} title={"Upcoming Movies"} /> : <TvSlides data={UpcomingMovies} title={"Upcoming Movies"} /> }
    </div>






    <div>
      {isMobile ? <MobileSlidesTV data={AiringToday} title={"Airing Today"} /> : <TvSlides data={AiringToday} title={"Airing Today"} /> }
    </div>


    
    </>
  )
}
