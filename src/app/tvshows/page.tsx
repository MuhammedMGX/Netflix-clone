"use server"
import { EmblaCarousel, PostersSlides, MobileEmblaCarousel, TvSlides, ContinueWatchingTv, EmblaCarouselTV, MobileEmblaCarouselTV, Top10SlidesTV, MobileTop10SlidesTV, MobileSlidesTV } from "../../components/emblaCarousel";
import { getAiringToday, getPopularTvSeries, getTop10TvSeries, getTrendingTv } from "../lib/api/movies";
import { headers } from "next/headers";

export default async function TvShows() {

  const headerInstance = await headers();
  const userAgent = headerInstance?.get('user-agent') || '';
  const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    .test(userAgent);



  const TrendingTv = await getTrendingTv()

  const PopularTvSeries = await getPopularTvSeries()

  const top10TvSeries = await getTop10TvSeries()

  const AiringToday = await getAiringToday()
  
  
  
  return (
    <>



    <div>
      {isMobile ?  <MobileEmblaCarouselTV data={TrendingTv} /> : <EmblaCarouselTV data={TrendingTv} /> }
    </div>



    <div>
      {isMobile ? null : <ContinueWatchingTv data={top10TvSeries} /> }
    </div>

  



    <div>
      {isMobile ? <MobileSlidesTV data={PopularTvSeries} title={"Popular on Netflix"} /> : <TvSlides data={PopularTvSeries} title={"Popular on Netflix"} /> }
    </div>


    <div>
      {isMobile ? <MobileSlidesTV data={TrendingTv} title={"TrendingTv"} /> : <TvSlides data={TrendingTv} title={"TrendingTv"} /> }
    </div>





    <div>
      {isMobile ? <MobileTop10SlidesTV data={top10TvSeries} title={"Top 10 Tv Series"}/> : <Top10SlidesTV data={top10TvSeries} title={"Top 10 Tv Series"}/> }
    </div>






    <div>
      {isMobile ? <MobileSlidesTV data={PopularTvSeries} title={"Popular Tv Series"} /> : <TvSlides data={PopularTvSeries} title={"Popular Tv Series"} /> }
    </div>





    <div>
      {isMobile ? <MobileSlidesTV data={AiringToday} title={"Airing Today"} /> : <TvSlides data={AiringToday} title={"Airing Today"} /> }
    </div>


    
    </>
  )
}
