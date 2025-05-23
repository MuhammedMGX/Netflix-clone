
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import play from '@/../public/icons/play.png'
import like from '@/../public/icons/like.png'
import plus from '@/../public/icons/plus.png'
import mute from '@/../public/icons/mute.png'
import down from '@/../public/icons/down.png'
import close from '@/../public/icons/close.png'

import { dataInfo, movieDataInfo } from '../_interfaces/data-type';
import fetchTvdetails, { getTvRecommendations, getTvVideo } from '../lib/actions/fetchtvdetails';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import TvWatchlistButton from '../lib/watchList/TvWatchlistButton';

interface Props {
    tvId: number;
  mobile: boolean;
  onClose: () => void;
}


let tmdbDropH = "https://image.tmdb.org/t/p/w1920"
let tmdbDropS = "https://image.tmdb.org/t/p/w780"

let tmdbPosterH = "https://image.tmdb.org/t/p/w1920"
let tmdbPosterS = "https://image.tmdb.org/t/p/w342"


export default function MovieModal({ tvId, onClose, mobile }: Props) {
  const [tv, setTv] = useState<any>(null);
  const [tvRecommendations, setTvRecommendations] = useState<any>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [TvVideo, setTvVideo] = useState("");
  const URL = `https://www.youtube.com/embed/${TvVideo}?autoplay=1&mute=1&controls=0&loop=1&playlist=${TvVideo}`

      const { data: session } = useSession();
      const userEmail = session?.user?.email ?? null;
      // {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}


  useEffect(() => {

    async function getData(tvId : number) {
      try {
        const result = await fetchTvdetails(tvId);
        const resultRecommendations = await getTvRecommendations(tvId);
        const resultTvVideo = await getTvVideo(tvId) as string | null
        setTv(result);
        setTvRecommendations(resultRecommendations);
        if (typeof resultTvVideo === 'string') {
            setTvVideo(resultTvVideo);
        }
       
        
      } catch (err) {
        console.error(err);
      }
    }
    
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 10000);
    
    getData(tvId);


  }, [tvId]);
  

  if (!tv)
    return (
 
      <div className="fixed top-0 right-0 left-0 bottom-0 md:py-9 z-100 bg-[rgba(0,0,0,0.7)] overflow-y-auto scrollbar-hide select-none" onClick={onClose}>
        
        <div className="bg-[#141414] w-full lg:w-[75%] mx-auto rounded-lg relative h-screen">
    
          <div className="flex flex-col space-y-3 w-full  {mobile ? aspect-[5/7.5] : aspect-[10/5.6]} ">
            <Skeleton className="h-full w-full rounded-xl" />
            <div className="space-y-2 px-10 mt-5">
              <Skeleton className="h-full w-full" />
              <Skeleton className="h-full w-full mt-5" />
            </div>
          </div>
    
        </div>
    
      </div>)
 
   
 if (tv){
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 md:py-9 z-100 bg-[rgba(0,0,0,0.7)] overflow-y-auto scrollbar-hide select-none" onClick={onClose}>

      <div className="bg-[#141414] w-full lg:w-[75%] mx-auto rounded-lg relative" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className='absolute top-5 right-5 z-90 hover:opacity-50'><img src={close.src} alt="" /></button>

        <div className="relative">

          {mobile ? 
          <>{tv.poster_path? <img className='object-cover rounded-lg' src={tmdbDropS+tv.poster_path} alt="" /> : <div className="flex w-full aspect-[5/8]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div> }</>
          
          : 

          <div className='aspect-[8/4.5] relative'> 
            {showVideo? 

            <iframe
            className='w-full h-full rounded-lg'
            width="100%"
            height="490"
            src={URL}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            loading="lazy"
          ></iframe> 



            :
            <>{tv.backdrop_path? <img className='object-cover w-full rounded-lg aspect-[8/4.5]' src={tmdbDropS+tv.backdrop_path} alt={tv?.title} /> : <div className="flex w-full aspect-[8/4.5]"><Skeleton className=" w-full object-cover rounded-lg" /></div> }</>
            }

          </div>

          }



          <div className="pointer-events-none absolute bottom-0 left-0 right-0 w-full h-35 bg-gradient-to-t from-[#141414] to-transparent"></div>

            <div className='flex flex-col justify-end w-full h-full absolute top-0 bottom-0 left-0 right-0 px-13 pb-10 z-[80]'>           
              <h1 className='w-1/2 text-white text-xl md:text-6xl font-extrabold break-normal'>{tv?.title ? tv?.title : tv?.name}</h1>
              <div className='flex w-full absolute right-0 -bottom-6 px-7 md:relative md:px-0'>
                  <button className='w-1/2 md:w-auto flex justify-center items-center rounded-md me-3 text-black px-4 py-2 font-semibold bg-white hover:bg-gray-200 transition'> <Play size={15} color="black" fill="black" strokeWidth={5} className="me-2" /> Play</button>
                    {userEmail ? (<TvWatchlistButton tvId={tv.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

                    <img src={like.src} className='object-cover mx-3 hover:opacity-50' alt="" />
                    <img src={mute.src} className='object-cover ms-auto hover:opacity-50' alt="" />
              </div>          
            </div>
        </div>

        <div className='flex flex-wrap px-10 py-10 text-white'>

          <div className='w-full md:w-2/3 pe-15'>
            <p className='text-gray-300'><span className='text-green-400'>90% Match</span> 2h 8m</p>
            <p className='text-gray-300'>Action Thriller • Drama</p>

            <p className='mt-6'>{tv?.overview}</p>
          </div>


          <div className='w-full md:w-1/3'>
            <p className='text-gray-400'>Cast: {tv?.genres.map((item : {id: number , name: string})=> <span key={item.id} className='text-white'>{item.name}, </span>)} </p>
            <p className='text-gray-400 mt-2'>Geners: {tv?.genres.map((item : {id: number , name: string})=> <span key={item.id } className='text-white'>{item.name}, </span>)} </p>
            <p className='text-gray-400 mt-2'>Release Date: {<span className='text-white'>{tv?.release_date}</span>} </p>
          </div>

        </div>




        <h3 className='px-10 text-white font-bold text-xl'>More Like This</h3>

        <div className='flex flex-wrap p-8 pb-20 text-white'>
          {tvRecommendations?.results?.slice(0, 9).map((item : movieDataInfo) =>(
  
            <div key={item.id} className="sm:w-1/2 md:w-1/3 xl-1/5 relative">
  
            <div className='m-2 bg-[#2F2F2F] rounded-sm h-90'>
            <div className="flex flex-col">
            <img className='object-cover rounded-t-sm' src={tmdbDropS+item.backdrop_path} alt="" />
  
            <div className='w-full px-4 rounded-xs'>
                <div className='flex items-center aspect-[10/1.5] mt-3'>
                <p className='text-white font-semibold break-words drop-shadow-2xl w-3/4'>{item.title ? item.title : item.name}</p>
                <div className='ms-auto w-1/4 p-2'>{userEmail ? (<TvWatchlistButton tvId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}</div>
                </div>
  
                <p className='text-gray-400 py-3 text-sm font-semibold'>{item.overview.split(" ").slice(0, 20).join(" ")}</p>
            </div>
  
            </div>
            </div>
  
            </div>
          ))}
          </div>


    </div>
    </div>

  );
}}