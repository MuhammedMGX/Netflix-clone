"use server"
import { EmblaCarousel, PostersSlides, MobileEmblaCarousel, MobilePostersSlides, MobileBrowseE } from "../../components/emblaCarousel";
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getAiringToday, getNowPlaying, getPopularMovies, getPopularTvSeries, getTop10Movies, getTop10TvSeries, getTrending, getUpcomingMovies } from "../lib/api/movies";
import  { BrowseE }  from "../../components/emblaCarousel";

import play from '@/../public/icons/play.png'
import like from '@/../public/icons/like.png'
import plus from '@/../public/icons/plus.png'
import mute from '@/../public/icons/mute.png'
import down from '@/../public/icons/down.png'
import { ChevronDown, Languages } from "lucide-react";
import { headers } from "next/headers";

let tmdbDropH = "https://image.tmdb.org/t/p/w1920"
let tmdbDropS = "https://image.tmdb.org/t/p/w780"

let tmdbPosterH = "https://image.tmdb.org/t/p/w1920"
let tmdbPosterS = "https://image.tmdb.org/t/p/w342"


export default async function Browse() {
    const headerInstance = await headers();
  const userAgent = headerInstance?.get('user-agent') || '';
  const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    .test(userAgent);



  const trending = await getTrending()


  return (
    <>

    <div className="pt-25 w-full bg-transparent select-none" >
      
        <h2 className='text-white text-base md:text-2xl font-semibold mb-2 px-1 md:px-10'>Browse by Language</h2>
        <div className="flex flex-wrap items-center px-1 md:px-10 pb-20">
            <p className="text-white font-semibold me-3">Select your preferences</p>

            <div className='text-gray-400 custom-select relative me-3'>
              <select className="border ps-4 pe-10 py-1 rounded-sm text-white border-gray-500" name="" id="">
                  <option className='font-semibold text-black' value="apple">Original Language</option>
                  <option className='font-semibold text-black' value="banana">Dubbing</option>
                  <option className='font-semibold text-black' value="banana">Subtitles</option>
              </select>
              <ChevronDown className="absolute top-[35%] right-[10%]" size={13} color="white" fill="white" />
          </div>
          <div className='text-gray-400 custom-select relative me-3'>
              <select className="border ps-4 pe-10 py-1 rounded-sm text-white border-gray-500" name="" id="">
                  <option className='font-semibold text-black' value="apple">English</option>
                  <option className='font-semibold text-black' value="banana">Arabic</option>
              </select>
              <ChevronDown className="absolute top-[35%] right-[10%]" size={13} color="white" fill="white" />
          </div>

          <p className="text-white font-semibold me-3">Sort by</p>
          <div className='text-gray-400 custom-select relative me-3'>
              <select className="border ps-4 pe-10 py-1 rounded-sm text-white border-gray-500" name="" id="">
                  <option className='font-semibold text-black' value="apple">Suggestions for you</option>
                  <option className='font-semibold text-black' value="banana">Year Released</option>
                  <option className='font-semibold text-black' value="banana">A-Z</option>
                  <option className='font-semibold text-black' value="banana">Z-A</option>
              </select>
              <ChevronDown className="absolute top-[35%] right-[10%]" size={13} color="white" fill="white" />
          </div>

        </div>

      <div className="flex flex-wrap px-1 md:px-10">
        <div>
          {isMobile ?  <MobileBrowseE data={trending} isMobile={isMobile} titleH={"Browse"} /> : <BrowseE data={trending} isMobile={isMobile} titleH={"Browse"} /> }
        </div>
      </div>


    </div>
    
    </>
  )
}

