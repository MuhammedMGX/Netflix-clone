"use server"
import { EmblaCarousel, PostersSlides, MobileEmblaCarousel, MobilePostersSlides, MovieSlides, TvSlides, MobileTop10SlidesTV, Top10SlidesTV, Top10SlidesMovies, MobileTop10SlidesMovies, MobileSlidesTV, MobileSlidesMovies } from "../../components/emblaCarousel";
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getAiringToday, getNowPlaying, getPopularMovies, getPopularTvSeries, getTop10Movies, getTop10TvSeries, getTrending, getTrendingMovies, getTrendingTv, getUpcomingMovies } from "../lib/api/movies";
import { headers } from "next/headers";

export default async function NewPopular() {

  const headerInstance = await headers();
  const userAgent = headerInstance?.get('user-agent') || '';
  const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    .test(userAgent);

  const TrendingTv = await getTrendingTv()
  const TrendingMovies = await getTrendingMovies()
  const nowPlaying = await getNowPlaying()

  const PopularMovies = await getPopularMovies()
  const PopularTvSeries = await getPopularTvSeries()

  const top10Movies = await getTop10Movies()
  const top10TvSeries = await getTop10TvSeries()

  const UpcomingMovies = await getUpcomingMovies()
  const AiringToday = await getAiringToday()
  

  return (
    <>

    <div className="pt-10">
      {isMobile ? <MobileSlidesMovies data={PopularMovies} title={"Popular on Netflix"} /> : <MovieSlides data={PopularMovies} title={"Popular on Netflix"} /> }
    </div>

    <div>
      {isMobile ? <MobileSlidesMovies data={TrendingMovies} title={"Trending Movies"} /> : <MovieSlides data={TrendingMovies} title={"Trending Movies"} /> }
    </div>

    <div>
      {isMobile ? <MobileSlidesTV data={TrendingTv} title={"Trending Tv"} /> : <TvSlides data={TrendingTv} title={"Trending Tv"} /> }
    </div>

    <div>
      {isMobile ? <MobileSlidesMovies data={nowPlaying} title={"Now Playing"} /> : <MovieSlides data={nowPlaying} title={"Now Playing"} /> }
    </div>




    <div>
      {isMobile ? <MobileTop10SlidesMovies data={top10Movies} title={"Top 10 Movies"} /> : <Top10SlidesMovies data={top10Movies} title={"Top 10 Movies"} /> }
    </div>

   <div>
      {isMobile ? <MobileSlidesTV data={PopularTvSeries} title={"Popular Tv Series"} /> : <TvSlides data={PopularTvSeries} title={"Popular Tv Series"} /> }
    </div>

    <div>
      {isMobile ? <MobileTop10SlidesTV data={top10TvSeries} title={"Top 10 Tv Series"}/> : <Top10SlidesTV data={top10TvSeries} title={"Top 10 Tv Series"}/> }
    </div>


    <div>
      {isMobile ? <MobileSlidesMovies data={UpcomingMovies} title={"Upcoming Movies"} /> : <MovieSlides data={UpcomingMovies} title={"Upcoming Movies"} /> }
    </div>






    <div>
      {isMobile ? <MobileSlidesTV data={AiringToday} title={"Airing Today"} /> : <TvSlides data={AiringToday} title={"Airing Today"} /> }
    </div>


    
    </>
  )
}
