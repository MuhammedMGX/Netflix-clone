"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import ArrowDown from '@/../public/icons/ArrowDown.png'
import ArrowUp from '@/../public/icons/ArrowUp.png'
import ArrowRight from '@/../public/icons/ArrowRight.png'
import ArrowLeft from '@/../public/icons/ArrowLeft.png'
import play from '@/../public/icons/play.png'
import like from '@/../public/icons/like.png'
import plus from '@/../public/icons/plus.png'
import mute from '@/../public/icons/mute.png'
import down from '@/../public/icons/down.png'
import { Info, Play } from 'lucide-react'

import one from '@/../public/top10/1.webp'
import two from '@/../public/top10/2.webp'
import three from '@/../public/top10/3.webp'
import four from '@/../public/top10/4.webp'
import five from '@/../public/top10/5.webp'
import six from '@/../public/top10/6.webp'
import seven from '@/../public/top10/7.webp'
import eight from '@/../public/top10/8.webp'
import nine from '@/../public/top10/9.webp'
import ten from '@/../public/top10/10.webp'
import { dataInfo } from '@/app/_interfaces/data-type'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import MovieDetails from "../app/movieDetails/MovieDetails"
import TvDetails from "../app/movieDetails/TvDetails"
import DetailsbySearch from "../app/movieDetails/Details"
import { Skeleton } from './ui/skeleton'
import { useSession } from 'next-auth/react'
import WatchlistButton from '@/app/lib/watchList/MovieWatchlistButton'
import MovieWatchlistButton from '@/app/lib/watchList/MovieWatchlistButton'
import TvWatchlistButton from '@/app/lib/watchList/TvWatchlistButton'

let tmdbDropH = "https://image.tmdb.org/t/p/w1920"
let tmdbDropS = "https://image.tmdb.org/t/p/w780"

let tmdbPosterH = "https://image.tmdb.org/t/p/w1920"
let tmdbPosterS = "https://image.tmdb.org/t/p/w342"





export function EmblaCarousel({ data }: { data: dataInfo  }) {  
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true},
    [Autoplay({ delay: 30000 }), Fade()]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="embla w-full bg-black relative">

      <div className='flex flex-col justify-center  absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10'>
        <button className="embla__prev" onClick={scrollPrev}>
          <img src={ArrowUp.src} className='w-2 md:w-4' alt="" />
        </button>
        <div className="flex flex-col justify-center items-center gap-2 py-4 ">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-white' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="embla__next" onClick={scrollNext}>
          <img src={ArrowDown.src} className='w-2 md:w-4' alt="" />
        </button>
      </div>


      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container aspect-[10/5.63]">

          {data?.results?.slice(0, 5).map((item) =>(
            
              <div key={item.id} onClick={() => openModal(item.id)}  className="embla__slide flex-[0_0_100%] select-none">
                <Image src={tmdbDropH + item.backdrop_path} className='w-full object-cover' alt="" priority width={1920} height={1080}/>
                <div className='flex flex-col justify-center w-full h-full md:w-1/2 absolute left-1 md:left-17 top-1/2 -translate-y-1/2 z-[80]'>           
                <h1 className='hidden md:block text-white text-xl md:text-6xl font-extrabold break-normal'>{item.title ? item.title : item.name}</h1>
                <p className='hidden md:block text-white text-xs md:text-base md:mt-6 md:mb-3 text-center md:text-start'>{item.original_title}</p>
                <p className='hidden md:block 2xl:hidden text-gray-300 w-3/4 md:mb-13'>{item.overview.split(" ").slice(0, 30).join(" ")}</p>
                <p className='hidden 2xl:block text-gray-300 w-3/4 md:mb-13'>{item.overview}</p>
                <div className='flex w-full absolute right-0 bottom-10 px-7 md:relative md:px-0'>
                    <button className='w-1/2 md:w-auto flex justify-center items-center rounded-md me-3 text-black px-4 py-2 font-semibold bg-white hover:bg-gray-200 transition'> <Play size={15} color="black" fill="black" strokeWidth={5} className="me-2" /> Play</button>
                    <button className='w-1/2 md:w-auto flex justify-center items-center rounded-md me-3 text-white px-4 py-2 font-semibold bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition'> <Info size={17} color="white" strokeWidth={3} className="me-2" /> More info</button>
                </div>         
                </div>
              </div>
          ))}


        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent"></div>
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  )
}
export function MobileEmblaCarousel({ data }: { data: dataInfo  }) {  
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = true
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true},
    [Autoplay({ delay: 30000 }), Fade()]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="embla w-full  relative px-10 rounded-3xl">

      <div className='flex flex-col justify-center  absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10'>
        <button className="embla__prev" onClick={scrollPrev}>
          <img src={ArrowUp.src} className='w-2 md:w-4' alt="" />
        </button>
        <div className="flex flex-col justify-center items-center gap-2 py-4 ">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-white' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="embla__next" onClick={scrollNext}>
          <img src={ArrowDown.src} className='w-2 md:w-4' alt="" />
        </button>
      </div>


      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container aspect-[5.63/9.5] ">


          {data?.results?.slice(0, 5).map((item) =>(
            
              <div key={item.id} onClick={() => openModal(item.id)} className="flex-[0_0_100%] select-none">
                <Image src={tmdbPosterS+item.poster_path} className='w-full rounded-3xl' alt="" priority width={342} height={513}/>
               
                <div className='flex w-full py-5 sm:px-5'>
                    <button className='w-1/2 flex justify-center items-center rounded-md me-3 text-black px-1 py-1 font-semibold bg-white hover:bg-gray-200 transition'> <Play size={12} color="black" fill="black" strokeWidth={5} className="me-2" /> Play</button>
                    <button className='w-1/2 flex justify-center items-center rounded-md text-white px-1 py-1 font-semibold bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition'> <Info size={12} color="white" strokeWidth={3} className="me-2" /> More info</button>
                </div>         
                
              </div>

          ))}


        </div>
      </div>
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  )
}


export function EmblaCarouselTV({ data }: { data: dataInfo  }) {  
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}



  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true},
    [Autoplay({ delay: 30000 }), Fade()]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="embla w-full bg-black relative">

      <div className='flex flex-col justify-center  absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10'>
        <button className="embla__prev" onClick={scrollPrev}>
          <img src={ArrowUp.src} className='w-2 md:w-4' alt="" />
        </button>
        <div className="flex flex-col justify-center items-center gap-2 py-4 ">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-white' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="embla__next" onClick={scrollNext}>
          <img src={ArrowDown.src} className='w-2 md:w-4' alt="" />
        </button>
      </div>


      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container aspect-[10/5.63]">


          {data?.results?.slice(0, 5).map((item) =>(
            
              <div key={item.id} onClick={() => openModal(item.id)} className="embla__slide flex-[0_0_100%] select-none">
                <Image src={tmdbDropH + item.backdrop_path} className='w-full object-cover' alt="" priority width={1920} height={1080}/>
                <div className='flex flex-col justify-center w-full h-full md:w-1/2 absolute left-1 md:left-17 top-1/2 -translate-y-1/2 z-[80]'>           
                <h1 className='hidden md:block text-white text-xl md:text-6xl font-extrabold break-normal'>{item.title ? item.title : item.name}</h1>
                <p className='hidden md:block text-white text-xs md:text-base md:mt-6 md:mb-3 text-center md:text-start'>{item.original_title}</p>
                <p className='hidden md:block 2xl:hidden text-gray-300 w-3/4 md:mb-13'>{item.overview.split(" ").slice(0, 30).join(" ")}</p>
                <p className='hidden 2xl:block text-gray-300 w-3/4 md:mb-13'>{item.overview}</p>
                <div className='flex w-full absolute right-0 bottom-10 px-7 md:relative md:px-0'>
                    <button className='w-1/2 md:w-auto flex justify-center items-center rounded-md me-3 text-black px-4 py-2 font-semibold bg-white hover:bg-gray-200 transition'> <Play size={15} color="black" fill="black" strokeWidth={5} className="me-2" /> Play</button>
                    <button className='w-1/2 md:w-auto flex justify-center items-center rounded-md me-3 text-white px-4 py-2 font-semibold bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition'> <Info size={17} color="white" strokeWidth={3} className="me-2" /> More info</button>
                </div>         
                </div>
              </div>

          ))}

        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent"></div>
      {selectedMovieId && <TvDetails tvId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  )
}
export function MobileEmblaCarouselTV({ data }: { data: dataInfo  }) {  
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = true
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true},
    [Autoplay({ delay: 30000 }), Fade()]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="embla w-full  relative px-10 rounded-3xl">

      <div className='flex flex-col justify-center  absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10'>
        <button className="embla__prev" onClick={scrollPrev}>
          <img src={ArrowUp.src} className='w-2 md:w-4' alt="" />
        </button>
        <div className="flex flex-col justify-center items-center gap-2 py-4 ">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-white' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="embla__next" onClick={scrollNext}>
          <img src={ArrowDown.src} className='w-2 md:w-4' alt="" />
        </button>
      </div>


      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container aspect-[5.63/9.5] ">


          {data?.results?.slice(0, 5).map((item) =>(
            
              <div key={item.id} onClick={() => openModal(item.id)} className="flex-[0_0_100%] select-none">
                <Image src={tmdbPosterS+item.poster_path} className='w-full rounded-3xl' alt="" priority width={342} height={513}/>
               
                <div className='flex w-full py-5 sm:px-5'>
                    <button className='w-1/2 flex justify-center items-center rounded-md me-3 text-black px-1 py-1 font-semibold bg-white hover:bg-gray-200 transition'> <Play size={12} color="black" fill="black" strokeWidth={5} className="me-2" /> Play</button>
                    <button className='w-1/2 flex justify-center items-center rounded-md text-white px-1 py-1 font-semibold bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition'> <Info size={12} color="white" strokeWidth={3} className="me-2" /> More info</button>
                </div>         
                
              </div>

          ))}

        </div>
      </div>
      {selectedMovieId && <TvDetails tvId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  )
}






export function ContinueWatchingMovies({ data }: { data: dataInfo  }) {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

  return (
    <div className="hidden lg:block flex w-full relative">
    <div className="left-4  2xl:left-17 md:left-10 absolute translate-y-[-90%] overflow-hidden">
      <h2 className='text-white font-semibold mb-4'>Continue Watching</h2>

      <div className=" w-full h-full select-none" > 
          <div className=" flex">

          {data?.results?.slice(0, 3).map((item) =>(
            
            <div key={item.id} onClick={() => openModal(item.id)} className=" flex-shrink-0 max-w-1/6  me-2 rounded-3 relative">
            {item.backdrop_path?<img className='object-cover rounded-xs w-full' src={tmdbDropS+item.backdrop_path} alt="" />:<div className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            <p className='text-white font-semibold break-words absolute bottom-1 left-3'>{item.title ? item.title : item.name}</p>
            </div>

        ))}

              </div>
          </div>
    </div>
    {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  );
}
export function ContinueWatchingTv({ data }: { data: dataInfo  }) {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

  return (
    <div className="hidden lg:block flex w-full relative">
    <div className="left-4 2xl:left-17 md:left-10 absolute translate-y-[-90%] overflow-hidden">
      <h2 className='text-white font-semibold mb-4'>Continue Watching</h2>

      <div className=" w-full h-full select-none" > 
          <div className=" flex">

          {data?.results?.slice(0, 3).map((item) =>(
            
            <div key={item.id} onClick={() => openModal(item.id)} className=" flex-shrink-0 max-w-1/6  me-2 rounded-3 relative">
            {item.backdrop_path?<img className='object-cover rounded-xs w-full' src={tmdbDropS+item.backdrop_path} alt="" />:<div className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            <p className='text-white font-semibold break-words absolute bottom-1 left-3'>{item.title ? item.title : item.name}</p>
            </div>

        ))}

              </div>
          </div>
    </div>
    {selectedMovieId && <TvDetails tvId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  );
}




export function MovieSlides({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  // {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])


  return (
    <div className="mt-10 ps-10 2xl:ps-17 lg:mt-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-base font-semibold mb-2'>{title}</h2>

      <div className="embla relative group/main ">

        <button className="hidden group-hover/main:block embla__prev absolute top-[25%] -left-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollPrev}>
          <img src={ArrowLeft.src} className='w-full' alt="" />
        </button>
      
        <button className="hidden group-hover/main:block embla__next absolute top-[25%] right-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollNext}>
          <img src={ArrowRight.src} className='w-2 md:w-4' alt="" />
        </button>

      <div className='embla__viewport' ref={emblaRef}>
      <div className="embla__container flex left-4 md:left-10 aspect-[10/3] md:aspect-[10/1.2]">


      {data?.results?.slice(0, 15).map((item , index) =>(
            
        <div key={item.id}  className={`embla__slide rounded-xs flex flex-[0_0_50%] md:flex-[0_0_20%] rounded-3 me-2 transition  hover:delay-500 ease-in relative group hover:z-1 hover:scale-[140%] hover:translate-y-[-60%] ${ index === 0 ? "hover:translate-x-[15%]" : null } ${ index === 14 ? "hover:translate-x-[-20%]" : null } shadow-xl`}>
            {item.backdrop_path?<img onClick={() => openModal(item.id)} className='object-cover rounded-xs aspect-[10/5.6]' src={tmdbDropS+item.backdrop_path} alt="" />:<div  onClick={() => openModal(item.id)} className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            <p className='text-white font-semibold break-words absolute bottom-1 left-3 drop-shadow-2xl group-hover:translate-y-[-30%] group-hover:duration-400 group-hover:delay-500 group-hover:transition-all'>{item.title ? item.title : item.name}</p>
          <div className='w-full px-2 py-2 rounded-b-sm bg-[#141414] absolute translate-y-[95%] bottom-0 opacity-0 group-hover:opacity-100 group-hover:duration-400 group-hover:delay-500 group-hover:transition-all group-hover:ease-in-out shadow-lg '>
            <div className='flex w-[95%] mx-auto p-[1%] h-[30%] aspect-[7/1] gap-x-1 xl:gap-x-2 my-1'>
              <img onClick={() => openModal(item.id)} src={play.src} className='object-cover hover:opacity-50' alt="" />
              {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}
              <img src={like.src} className='object-cover hover:opacity-50' alt="" />
              <img onClick={() => openModal(item.id)} src={down.src} className='object-cover ms-auto hover:opacity-50' alt="" />
            </div>
            <p className='text-gray-300 w-[95%] mx-auto text-xs mt-2'><span className='text-green-400'>90% Match</span> 2h 8m</p>
            <p className='text-gray-300 w-[95%] mx-auto text-xs'>Action Thriller • Drama</p>
          </div>
        </div>

        ))}

      </div>
      </div>
      </div>
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  );
}
export function TvSlides({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  // {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])


  return (
    <div className="mt-10 ps-10 2xl:ps-17 lg:mt-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-base font-semibold mb-2'>{title}</h2>

      <div className="embla relative group/main ">

        <button className="hidden group-hover/main:block embla__prev absolute top-[25%] -left-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollPrev}>
          <img src={ArrowLeft.src} className='w-full' alt="" />
        </button>
      
        <button className="hidden group-hover/main:block embla__next absolute top-[25%] right-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollNext}>
          <img src={ArrowRight.src} className='w-2 md:w-4' alt="" />
        </button>

      <div className='embla__viewport' ref={emblaRef}>
      <div className="embla__container flex left-4 md:left-10 aspect-[10/3] md:aspect-[10/1.2]">


      {data?.results?.slice(0, 15).map((item , index) =>(
            
          <div key={item.id} className={`embla__slide rounded-xs flex flex-[0_0_50%] md:flex-[0_0_20%] rounded-3 me-2 transition  hover:delay-500 ease-in relative group hover:z-1 hover:scale-[140%] hover:translate-y-[-60%] ${ index === 0 ? "hover:translate-x-[15%]" : null } ${ index === 14 ? "hover:translate-x-[-20%]" : null } shadow-xl`}>
            {item.backdrop_path?<img onClick={() => openModal(item.id)} className='object-cover rounded-xs aspect-[10/5.6]' src={tmdbDropS+item.backdrop_path} alt="" />:<div onClick={() => openModal(item.id)} className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            <p className='text-white font-semibold break-words absolute bottom-1 left-3 drop-shadow-2xl group-hover:translate-y-[-30%] group-hover:duration-400 group-hover:delay-500 group-hover:transition-all'>{item.title ? item.title : item.name}</p>
          <div className='w-full px-2 py-2 rounded-b-sm bg-[#141414] absolute translate-y-[95%] bottom-0 opacity-0 group-hover:opacity-100 group-hover:duration-400 group-hover:delay-500 group-hover:transition-all group-hover:ease-in-out shadow-lg '>
            <div className='flex w-[95%] mx-auto p-[1%] h-[30%] aspect-[7/1] gap-x-1 xl:gap-x-2 my-1'>
              <img onClick={() => openModal(item.id)} src={play.src} className='object-cover hover:opacity-50' alt="" />
              {userEmail ? (<TvWatchlistButton tvId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

              <img src={like.src} className='object-cover hover:opacity-50' alt="" />
              <img onClick={() => openModal(item.id)} src={down.src} className='object-cover ms-auto hover:opacity-50' alt="" />
            </div>
            <p className='text-gray-300 w-[95%] mx-auto text-xs mt-2'><span className='text-green-400'>90% Match</span> 2h 8m</p>
            <p className='text-gray-300 w-[95%] mx-auto text-xs'>Action Thriller • Drama</p>
          </div>
        </div>

        ))}

      </div>
      </div>
      </div>
      {selectedMovieId && <TvDetails tvId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
  );
}




export function PostersSlides({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="mt-10 ps-10 2xl:ps-17 lg:mt-10 w-full bg-transparent" >
      <h2 className='text-white md:text-base font-semibold mb-2'>{title}</h2>

      <div className="embla relative group/main">

      <button className="hidden group-hover/main:block embla__prev absolute top-[25%] -left-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollPrev}>
        <img src={ArrowLeft.src} className='w-full' alt="" />
      </button>
     
      <button className="hidden group-hover/main:block embla__next absolute top-[25%] right-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollNext}>
        <img src={ArrowRight.src} className='w-2 md:w-4' alt="" />
      </button>

      <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
      <div className="embla__container flex aspect-[10/5] md:aspect-[10/3]">


      {data?.results?.slice(0, 15).map((item) =>(
            
            <div key={item.id} onClick={() => openModal(item.id)} className="embla__slide  overflow-hidden w-full flex flex-[0_0_34%] hover:flex-[0_0_85%] md:flex-[0_0_20%] md:hover:flex-[0_0_53%] rounded-3 me-2 z-10 transition-all duration-500 ease-in-out relative group">
              <img className='block group-hover:hidden object-cover' src={tmdbPosterH+item.poster_path} alt="" />
              <img className='hidden group-hover:block object-cover' src={tmdbDropH+item.backdrop_path} alt="" />
              
              <div className='w-full absolute px-9 top-1/2 hidden group-hover:block'>
    
                <div>
                  <h3 className='text-white h-8 text-xl md:text-4xl font-extrabold mb-6'>{item.title ? item.title : item.name}</h3>
                </div>
    
                <div className='flex h-8'>
                  <button className=' flex justify-center items-center rounded-md me-3 text-black px-4 py-2 font-semibold bg-white hover:bg-gray-200 transition'> <Play size={15} color="black" fill="black" strokeWidth={5} className="me-2" /> Play</button>
                  <button className=' flex justify-center items-center rounded-md me-3 text-white px-2 lg:px-4 py-2 font-semibold bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] transition'> <Info size={17} color="white" strokeWidth={3} className="me-2" /> More info</button>
                  
                  <img src={play.src} className='me-3 ms-auto hover:opacity-70' alt="" />
                  <img src={mute.src} className='hover:opacity-70' alt="" />
                </div>
                    
                
              </div>
            </div>
    
            ))}

      </div>
      </div>
      </div>


      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  );
}
export function MobilePostersSlides({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = true
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="mt-5 ps-3 lg:mt-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-base font-semibold mb-2 ms-1'>{title}</h2>

      <div className="embla relative">


        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex aspect-[10/6]">


          {data?.results?.slice(0, 15).map((item) =>(
            
            <div key={item.id} onClick={() => openModal(item.id)} className="embla__slide flex flex-[0_0_40%]  me-2 rounded-3">
                <img className='object-cover' src={tmdbPosterS+item.poster_path} alt="" /> 
            </div>
    
            ))}
          

      </div>
      </div>
      </div>

      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
  );
}



export function Top10SlidesMovies({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="mt-5 ps-10 2xl:ps-17 lg:mt-10 w-full bg-transparent" >
      <h2 className='text-white md:text-base font-semibold mb-2'>{title}</h2>

      <div className="embla relative group/main">

      <button className="hidden group-hover/main:block embla__prev absolute top-[25%] -left-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollPrev}>
        <img src={ArrowLeft.src} className='w-full' alt="" />
      </button>
     
      <button className="hidden group-hover/main:block embla__next absolute top-[25%] right-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollNext}>
        <img src={ArrowRight.src} className='w-2 md:w-4' alt="" />
      </button>

        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex aspect-[10/3] md:aspect-[10/1.5]">


          <div onClick={() => openModal(data.results[0].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={one.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[0].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[1].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={two.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[1].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[2].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={three.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[2].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[3].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={four.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[3].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[4].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={five.src} alt="" />  
            <img className='translate-x-[-56%] ' src={tmdbPosterS+data.results[4].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[5].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={six.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[5].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[6].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={seven.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[6].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[7].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={eight.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[7].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[8].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={nine.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[8].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[9].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative ms-8  -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={ten.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[9].poster_path} alt="" /> 
          </div>

      </div>
      </div>
      </div>
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
    </div>
  );
}
export function Top10SlidesTV({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = false
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="mt-5 ps-10 2xl:ps-17 lg:mt-10 w-full bg-transparent" >
      <h2 className='text-white md:text-base font-semibold mb-2'>{title}</h2>

      <div className="embla relative group/main">

      <button className="hidden group-hover/main:block embla__prev absolute top-[25%] -left-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollPrev}>
        <img src={ArrowLeft.src} className='w-full' alt="" />
      </button>
     
      <button className="hidden group-hover/main:block embla__next absolute top-[25%] right-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollNext}>
        <img src={ArrowRight.src} className='w-2 md:w-4' alt="" />
      </button>

        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex aspect-[10/3] md:aspect-[10/1.5]">


          <div onClick={() => openModal(data.results[0].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={one.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[0].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[1].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={two.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[1].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[2].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={three.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[2].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[3].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={four.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[3].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[4].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={five.src} alt="" />  
            <img className='translate-x-[-56%] ' src={tmdbPosterS+data.results[4].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[5].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={six.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[5].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[6].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={seven.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[6].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[7].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={eight.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[7].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[8].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={nine.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[8].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[9].id)} className="embla__slide flex flex-[0_0_40%] md:flex-[0_0_20%] rounded-3 relative ms-8 -translate-x-8">
            <img className='scale-125 translate-y-[6%]' src={ten.src} alt="" />  
            <img className='translate-x-[-56%]' src={tmdbPosterS+data.results[9].poster_path} alt="" /> 
          </div>

      </div>
      </div>
      </div>
      {selectedMovieId && <TvDetails tvId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
  );
}


export function MobileTop10SlidesMovies({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = true
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="mt-5 lg:mt-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-base font-semibold mb-2 ms-5'>{title}</h2>

      <div className="embla relative">


        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex gap-x-10 aspect-[10/3.6] translate-x-[-5%]">


          <div onClick={() => openModal(data.results[0].id)} className="embla__slide flex flex-[0_0_30%] rounded-3">
            <img className=' translate-y-[11%] object-cover' src={one.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[0].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[1].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 ">
            <img className='translate-y-[11%] object-cover' src={two.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[1].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[2].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={three.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[2].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[3].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={four.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[3].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[4].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={five.src} alt="" />  
            <img className='translate-x-[-50%] ' src={tmdbPosterS+data.results[4].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[5].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={six.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[5].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[6].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={seven.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[6].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[7].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={eight.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[7].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[8].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={nine.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[8].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[9].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative ms-8">
            <img className='translate-y-[11%] object-cover' src={ten.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[9].poster_path} alt="" /> 
          </div>

      </div>
      </div>
      </div>
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
  );
}
export function MobileTop10SlidesTV({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = true
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="mt-5 lg:mt-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-base font-semibold mb-2 ms-5'>{title}</h2>

      <div className="embla relative">


        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex gap-x-10 aspect-[10/3.6] translate-x-[-5%]">


          <div onClick={() => openModal(data.results[0].id)} className="embla__slide flex flex-[0_0_30%] rounded-3">
            <img className=' translate-y-[11%] object-cover' src={one.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[0].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[1].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 ">
            <img className='translate-y-[11%] object-cover' src={two.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[1].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[2].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={three.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[2].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[3].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={four.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[3].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[4].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={five.src} alt="" />  
            <img className='translate-x-[-50%] ' src={tmdbPosterS+data.results[4].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[5].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={six.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[5].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[6].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={seven.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[6].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[7].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={eight.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[7].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[8].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative">
            <img className='translate-y-[11%] object-cover' src={nine.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[8].poster_path} alt="" /> 
          </div>

          <div onClick={() => openModal(data.results[9].id)} className="embla__slide flex flex-[0_0_30%] rounded-3 relative ms-8">
            <img className='translate-y-[11%] object-cover' src={ten.src} alt="" />  
            <img className='translate-x-[-50%]' src={tmdbPosterS+data.results[9].poster_path} alt="" /> 
          </div>

      </div>
      </div>
      </div>
      {selectedMovieId && <TvDetails tvId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
  );
}



export function Top10LandingPage({ data , title }: { data: dataInfo , title: string }) { 
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])


  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="px-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-2xl font-bold mb-2'>{title}</h2>

      <div className="embla relative group/main">

      <button className="hidden group-hover/main:block embla__prev absolute top-[25%] -left-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollPrev}>
        <img src={ArrowLeft.src} className='w-full' alt="" />
      </button>
     
      <button className="hidden group-hover/main:block embla__next absolute top-[25%] right-5 z-11 bg-[rgba(0,0,0,0.5)] w-6 h-1/2 px-1 rounded-full" onClick={scrollNext}>
        <img src={ArrowRight.src} className='w-2 md:w-4' alt="" />
      </button>

        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex h-50 md:h-60 aspect-[5/1.5]">


          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={one.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[0].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={two.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[1].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={three.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[2].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={four.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[3].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={five.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[4].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={six.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[5].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={seven.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[6].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-12">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={eight.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[7].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-15">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={nine.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[8].poster_path} alt="" /> 
          </div>

          <div className="embla__slide flex flex-[0_0_20%] rounded-3 relative me-10">
            <img className='absolute scale-60 -bottom-8 -left-15 z-1' src={ten.src} alt="" />  
            <img className='absolute translate-x-[10%] rounded-xl' src={tmdbPosterS+data.results[9].poster_path} alt="" /> 
          </div>


      </div>
      </div>
      </div>

    </div>
  );
}





export function MobileSlidesMovies({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = true
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="mt-5 ps-3 lg:mt-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-base font-semibold mb-2 ms-1'>{title}</h2>

      <div className="embla relative">


        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex aspect-[10/4.45]">


          {data?.results?.slice(0, 15).map((item) =>(
            
            <div key={item.id} onClick={() => openModal(item.id)} className="embla__slide flex flex-[0_0_30%]  me-2 rounded-3">
            {item.backdrop_path?<img className='object-cover rounded-xs' src={tmdbDropS+item.poster_path} alt="" />:<div className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            </div>
    
            ))}

          

      </div>
      </div>
      </div>

      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
  );
}
export function MobileSlidesTV({ data , title }: { data: dataInfo , title: string }) { 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const isMobile = true
  const openModal = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };
  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}


  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="mt-5 ps-3 lg:mt-10 w-full bg-transparent select-none" >
      <h2 className='text-white md:text-base font-semibold mb-2 ms-1'>{title}</h2>

      <div className="embla relative">


        <div className='embla__viewport overflow-hidden ' ref={emblaRef}>
          <div className="embla__container flex aspect-[10/4.45]">


          {data?.results?.slice(0, 15).map((item) =>(
            
            <div key={item.id} onClick={() => openModal(item.id)} className="embla__slide flex flex-[0_0_30%]  me-2 rounded-3">
            {item.backdrop_path?<img className='object-cover rounded-xs' src={tmdbDropS+item.poster_path} alt="" />:<div className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            </div>
    
            ))}

      </div>
      </div>
      </div>

      {selectedMovieId && <TvDetails tvId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
  );
}






export function MyListE({ MovieData , TvData , isMobile }: { MovieData: any, TvData: any , isMobile:boolean }) {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedTvId, setSelectedTvId] = useState<number | null>(null);

  const openModalMovie = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedMovieId(id);
  };
  const closeModalMovie = () => {
    setSelectedMovieId(null); 
  };

  const openModalTv = (id: number) => {
    if (selectedMovieId === id) return;
    setSelectedTvId(id);
  };
  const closeModalTv = () => {
    setSelectedTvId(null); 
  };


  // {selectedMovieId && <TvDetails movieId={selectedMovieId} onClose={closeModal} mobile={isMobile} />}
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  // {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

  return (
    <>

    <div className="pt-25 w-full bg-transparent select-none" >
      
        <h2 className='text-white text-base md:text-2xl font-semibold mb-2 md:mb-10 px-1 md:px-10'>My List</h2>

      <div className="flex flex-wrap px-1 md:px-10">


      {MovieData?.map((item:any) =>(

          <div key={item.id} className="embla__slide rounded-xs flex w-1/2 md:w-1/4 xl:w-1/6 rounded-3 transition  md:hover:delay-500 ease-in relative group md:hover:z-1 md:hover:scale-[120%] md:hover:translate-y-[-60%] shadow-xl">
             <div className='p-1 md:group-hover:p-0 md:group-hover:delay-500'>

            {item.backdrop_path?<img onClick={() => openModalMovie(item.id)} className='object-cover rounded-xs aspect-[10/5.6]' src={tmdbDropS+item.backdrop_path} alt="" />:<div onClick={() => openModalMovie(item.id)} className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            <p className='text-white font-semibold break-words absolute bottom-1 left-3 drop-shadow-2xl group-hover:translate-y-[-30%] group-hover:duration-400 group-hover:delay-500 group-hover:transition-all'>{item.title ? item.title : item.name}</p>
          <div className='w-full px-2 py-2 rounded-b-sm bg-[#141414] absolute translate-y-[95%] bottom-0 opacity-0 group-hover:opacity-100 group-hover:duration-400 group-hover:delay-500 group-hover:transition-all group-hover:ease-in-out shadow-lg '>
            <div className='flex w-[95%] mx-auto p-[1%] h-[30%] aspect-[7/1] gap-x-1 xl:gap-x-2 my-1'>
              <img onClick={() => openModalMovie(item.id)} src={play.src} className='object-cover hover:opacity-50' alt="" />
              {userEmail ? (<TvWatchlistButton tvId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

              <img src={like.src} className='object-cover hover:opacity-50' alt="" />
              <img onClick={() => openModalMovie(item.id)} src={down.src} className='object-cover ms-auto hover:opacity-50' alt="" />
            </div>
            <p className='text-gray-300 w-[95%] mx-auto text-xs mt-2'><span className='text-green-400'>90% Match</span> 2h 8m</p>
            <p className='text-gray-300 w-[95%] mx-auto text-xs'>Action Thriller • Drama</p>
          </div>
       
        </div>
        </div>
        ))}

        {TvData?.map((item:any) =>(
            
            <div key={item.id} className="embla__slide rounded-xs flex w-1/2 md:w-1/4 xl:w-1/6 rounded-3 transition  md:hover:delay-500 ease-in relative group md:hover:z-1 md:hover:scale-[120%] md:hover:translate-y-[-60%] shadow-xl">
             <div className='p-1 md:group-hover:p-0 md:group-hover:delay-500'>     

            {item.backdrop_path?<img onClick={() => openModalTv(item.id)} className='object-cover rounded-xs aspect-[10/5.6]' src={tmdbDropS+item.backdrop_path} alt="" />:<div onClick={() => openModalTv(item.id)} className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
            <p className='text-white font-semibold break-words absolute bottom-1 left-3 drop-shadow-2xl group-hover:translate-y-[-30%] group-hover:duration-400 group-hover:delay-500 group-hover:transition-all'>{item.title ? item.title : item.name}</p>
          <div className='w-full px-2 py-2 rounded-b-sm bg-[#141414] absolute translate-y-[95%] bottom-0 opacity-0 group-hover:opacity-100 group-hover:duration-400 group-hover:delay-500 group-hover:transition-all group-hover:ease-in-out shadow-lg '>
            <div className='flex w-[95%] mx-auto p-[1%] h-[30%] aspect-[7/1] gap-x-1 xl:gap-x-2 my-1'>
              <img onClick={() => openModalTv(item.id)} src={play.src} className='object-cover hover:opacity-50' alt="" />
              {userEmail ? (<TvWatchlistButton tvId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

              <img src={like.src} className='object-cover hover:opacity-50' alt="" />
              <img onClick={() => openModalTv(item.id)} src={down.src} className='object-cover ms-auto hover:opacity-50' alt="" />
            </div>
            <p className='text-gray-300 w-[95%] mx-auto text-xs mt-2'><span className='text-green-400'>90% Match</span> 2h 8m</p>
            <p className='text-gray-300 w-[95%] mx-auto text-xs'>Action Thriller • Drama</p>
          </div>
        </div>
        </div>

    
        ))}


      </div>

      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeModalMovie} mobile={isMobile} />}
      {selectedTvId && <TvDetails tvId={selectedTvId} onClose={closeModalTv} mobile={isMobile} />}

    </div>
    
    </>
  )
}





export function BrowseE({ data , isMobile , titleH }: { data: dataInfo, isMobile: boolean , titleH: string }) {
  const [selectedMovieId, setSelectedMovieId] = useState<any>(null);
  const openModal = (title:string , overview:string , backdrop_path:string , poster_path:string , release_date:string ) => {
    if (selectedMovieId === title) return;

    setSelectedMovieId({title , overview , backdrop_path , poster_path , release_date });

  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };

  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  // {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

  return (
    <>

    <div className="w-full bg-transparent select-none" >
      
        <h2 className='text-white text-base md:text-2xl font-semibold mb-2 md:mb-10 px-1 md:px-10'>{titleH}</h2>

      <div className="flex flex-wrap px-1 md:px-10">


      {data?.results?.slice(0, 15).map((item) =>(
           
           <div key={item.id} className="embla__slide rounded-xs flex w-1/2 md:w-1/4 xl:w-1/6 rounded-3 transition  md:hover:delay-500 ease-in relative group md:hover:z-1 md:hover:scale-[120%] md:hover:translate-y-[-60%] shadow-xl">
             <div className='p-1 md:group-hover:p-0 md:group-hover:delay-500'>

              {item.backdrop_path?<img onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} className='object-cover rounded-xs aspect-[10/5.6]' src={tmdbDropS+item.backdrop_path} alt="" /> : <div onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
              <p className='text-white font-semibold break-words absolute bottom-1 left-3 drop-shadow-2xl md:group-hover:translate-y-[-30%] md:group-hover:duration-400 md:group-hover:delay-500 md:group-hover:transition-all'>{item.title ? item.title : item.name}</p>
              <div className='w-full px-2 py-2 rounded-b-sm bg-[#141414] absolute translate-y-[95%] bottom-0 opacity-0 md:group-hover:opacity-100 md:group-hover:duration-400 md:group-hover:delay-500 md:group-hover:transition-all md:group-hover:ease-in-out shadow-lg '>
              <div className='flex w-[95%] mx-auto p-[1%] h-[30%] aspect-[7/1] gap-x-1 xl:gap-x-2 my-1'>
                <img onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} src={play.src} className='object-cover hover:opacity-50' alt="" />
                {userEmail ? (<TvWatchlistButton tvId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

                <img src={like.src} className='object-cover hover:opacity-50' alt="" />
                <img onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} src={down.src} className='object-cover ms-auto hover:opacity-50' alt="" />
              </div>
              <p className='text-gray-300 w-[95%] mx-auto text-xs mt-2'><span className='text-green-400'>90% Match</span> 2h 8m</p>
              <p className='text-gray-300 w-[95%] mx-auto text-xs'>Action Thriller • Drama</p>
              </div>

              </div>
            </div>

        ))}

      </div>

      {selectedMovieId && <DetailsbySearch data={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
    
    </>
  )
}
export function MobileBrowseE({ data , isMobile , titleH }: { data: dataInfo, isMobile: boolean , titleH: string }) {
  const [selectedMovieId, setSelectedMovieId] = useState<any>(null);
  const openModal = (title:string , overview:string , backdrop_path:string , poster_path:string , release_date:string ) => {
    if (selectedMovieId === title) return;

    setSelectedMovieId({title , overview , backdrop_path , poster_path , release_date });

  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };

  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  // {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

  return (
    <>

    <div className="w-full bg-transparent select-none" >
      
        <h2 className='text-white text-base md:text-2xl font-semibold mb-2 md:mb-10 px-1 md:px-10'>{titleH}</h2>

      <div className="flex flex-wrap gap-y-2 px-1 md:px-10 justify-center">


      {data?.results?.slice(0, 15).map((item) =>(
           
          <div key={item.id} onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} className="embla__slide flex flex-[0_0_30%]  me-2 rounded-3">
            {item.backdrop_path?<img className='object-cover rounded-xs' src={tmdbDropS+item.poster_path} alt="" />:<div className="flex w-full aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
          </div>

        ))}



      </div>

      {selectedMovieId && <DetailsbySearch data={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
    
    </>
  )
}


export function SearchE({ data , isMobile , titleH }: { data: any, isMobile: boolean , titleH: string }) {
  const [selectedMovieId, setSelectedMovieId] = useState<any>(null);
  const openModal = (title:string , overview:string , backdrop_path:string , poster_path:string , release_date:string ) => {
    if (selectedMovieId === title) return;

    setSelectedMovieId({title , overview , backdrop_path , poster_path , release_date });

  };
  const closeModal = () => {
    setSelectedMovieId(null); 
  };


  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;
  // {userEmail ? (<MovieWatchlistButton movieId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

  return (
    <>

    <div className="w-full bg-transparent select-none" >
      
        <h2 className='text-white text-base md:text-2xl font-semibold mb-1 px-1 md:px-10'>{titleH}</h2>

      <div className="flex flex-wrap px-1 md:px-10 hidden lg:flex">


      {data?.results?.slice(0, 15).map((item:any) =>(


            <div key={item.id} className="embla__slide rounded-xs flex w-1/2 w-1/2 md:w-1/4 xl:w-1/6 rounded-3 transition  md:hover:delay-500 ease-in relative group md:hover:z-1 md:hover:scale-[120%] md:hover:translate-y-[-60%] shadow-xl">
             <div className='p-1 md:group-hover:p-0 md:group-hover:delay-500'>

              {item.backdrop_path ?<img onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} className='object-cover rounded-xs aspect-[10/5.6]' src={tmdbDropS+item.backdrop_path} alt="" /> : <Skeleton onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)}  className=" w-full h-full rounded-xl object-cover rounded-xs aspect-[10/5.6]" />}
              <p className='text-white font-semibold break-words absolute bottom-1 left-3 drop-shadow-2xl md:group-hover:translate-y-[-30%] md:group-hover:duration-400 md:group-hover:delay-500 md:group-hover:transition-all'>{item.title ? item.title : item.name}</p>
              <div className='w-full px-2 py-2 rounded-b-sm bg-[#141414] absolute translate-y-[95%] bottom-0 opacity-0 md:group-hover:opacity-100 md:group-hover:duration-400 md:group-hover:delay-500 md:group-hover:transition-all md:group-hover:ease-in-out shadow-lg '>
              <div className='flex w-[95%] mx-auto p-[1%] h-[30%] aspect-[7/1] gap-x-1 xl:gap-x-2 my-1'>
                <img onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} src={play.src} className='object-cover hover:opacity-50' alt="" />
                {userEmail ? (<TvWatchlistButton tvId={item.id} userEmail={userEmail} />) : ( <p>Please log in to manage your watchlist.</p>)}

                <img src={like.src} className='object-cover hover:opacity-50' alt="" />
                <img onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} src={down.src} className='object-cover ms-auto hover:opacity-50' alt="" />
              </div>
              <p className='text-gray-300 w-[95%] mx-auto text-xs mt-2'><span className='text-green-400'>90% Match</span> 2h 8m</p>
              <p className='text-gray-300 w-[95%] mx-auto text-xs'>Action Thriller • Drama</p>
              </div>

              </div>
            </div>




        ))}

      </div>

      <div className="flex flex-wrap gap-y-2 px-1 md:px-10 justify-center block lg:hidden">
      {data?.results?.slice(0, 15).map((item:any) =>(
           
          <div key={item.id} onClick={() => openModal(item.title ? item.title : item.name , item.overview , item.backdrop_path, item.poster_path , item.release_date)} className="embla__slide flex flex-[0_0_30%]  me-2 rounded-3">
            {item.backdrop_path?<img className='object-cover rounded-xs' src={tmdbDropS+item.poster_path} alt="" />:<div className="flex w-full aspect-[5/7] lg:aspect-[10/5.6]"><Skeleton className=" w-full rounded-xl object-cover rounded-xs" /></div>}
          </div>

        ))}
      </div>

      {selectedMovieId && <DetailsbySearch data={selectedMovieId} onClose={closeModal} mobile={isMobile} />}

    </div>
    
    </>
  )
}

