
import axios from 'axios';
import { useEffect, useState } from 'react';
import fetchmoviedetails, { getMovieRecommendations, getMovieVideo } from "../lib/actions/fetchmoviedetails"
import { Play } from 'lucide-react';
import play from '@/../public/icons/play.png'
import like from '@/../public/icons/like.png'
import plus from '@/../public/icons/plus.png'
import mute from '@/../public/icons/mute.png'
import down from '@/../public/icons/down.png'
import close from '@/../public/icons/close.png'
import { dataInfo, movieDataInfo } from '../_interfaces/data-type';
import { Skeleton } from '@/components/ui/skeleton';
import fetchDetailsbySearch from '../lib/actions/Search';
import { useSession } from 'next-auth/react';

interface Props {
  data: datahere;
  mobile:boolean;
  onClose: () => void;
}
export type datahere = {
  title: string
  name: string
  overview: string
  backdrop_path: string
  poster_path: string
  release_date: string
  mobile:boolean;
  onClose: () => void;
  }
  

let tmdbDropH = "https://image.tmdb.org/t/p/w1920"
let tmdbDropS = "https://image.tmdb.org/t/p/w780"

let tmdbPosterH = "https://image.tmdb.org/t/p/w1920"
let tmdbPosterS = "https://image.tmdb.org/t/p/w342"


export default function MovieModal({ data, onClose, mobile }: Props) {



  if (!data)
    return (
 
   <div className="fixed top-0 right-0 left-0 bottom-0 md:py-9 z-100 bg-[rgba(0,0,0,0.7)] overflow-y-auto scrollbar-hide select-none" onClick={onClose}>
     
     <div className="bg-[#141414] w-full lg:w-[75%] mx-auto rounded-lg relative">
 
       <div className="flex flex-col space-y-3 w-full h-screen {mobile ? aspect-[5/7.5] : aspect-[10/5.6]} ">
         <Skeleton className="h-[80%] w-full rounded-xl" />
         <div className="space-y-2">
           <Skeleton className="h-full w-full" />
           <Skeleton className="h-full w-full" />
         </div>
       </div>
 
     </div>
 
   </div>)

  
if (data){
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 md:py-9 z-100 bg-[rgba(0,0,0,0.7)] overflow-y-auto scrollbar-hide select-none" onClick={onClose}>

      <div className="bg-[#141414] w-full lg:w-[75%] mx-auto rounded-lg relative" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className='absolute top-5 right-5 z-90 hover:opacity-50'><img src={close.src} alt="" /></button>

        <div className="relative">

  
          <img src={tmdbPosterH+data?.poster_path} alt={data?.title} className='rounded-lg block md:hidden' /> 
           
          <img src={tmdbDropH+data?.backdrop_path} alt={data?.title} className='rounded-lg hidden md:block' />
     




          <div className="pointer-events-none absolute bottom-0 left-0 right-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent"></div>

            <div className='flex flex-col justify-end w-full h-full absolute top-0 bottom-0 left-0 right-0 px-13 pb-10 z-[80]'>           
              <h1 className='w-1/2 text-white text-xl md:text-6xl font-extrabold break-normal'>{data?.title ? data?.title : data?.name}</h1>
              <div className='flex w-full absolute right-0 -bottom-6 px-7 md:relative md:px-0'>
                  <button className='w-1/2 md:w-auto flex justify-center items-center rounded-md me-3 text-black px-4 py-2 font-semibold bg-white hover:bg-gray-200 transition'> <Play size={15} color="black" fill="black" strokeWidth={5} className="me-2" /> Play</button>
                    <img src={plus.src} className='object-cover p-0.5 hover:opacity-50' alt="" />
                    <img src={like.src} className='object-cover p-0.5 mx-3 hover:opacity-50' alt="" />
                    <img src={mute.src} className='object-cover p-0.5 ms-auto hover:opacity-50' alt="" />
              </div>          
            </div>
        </div>

        <div className='flex flex-wrap px-10 py-10 text-white'>

          <div className='w-full md:w-2/3 pe-15'>
            <p className='text-gray-300'><span className='text-green-400'>90% Match</span> 2h 8m</p>
            <p className='text-gray-300'>Action Thriller • Drama</p>

            <p className='mt-6'>{data?.overview}</p>
          </div>


          <div className='w-full md:w-1/3'>
            <p className='text-gray-400 mt-2'>Release Date: {<span className='text-white'>{data?.release_date}</span>} </p>
          </div>

        </div>

        

    </div>
    </div>

  );
}}