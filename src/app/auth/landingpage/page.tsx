import landingpage from '@/../public/LandingPage.png'
import { getTrending } from '@/app/lib/api/movies'
import { Top10LandingPage } from '@/components/emblaCarousel'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'

import one from '@/../public/one.svg'
import two from '@/../public/two.svg'
import three from '@/../public/three.svg'
import four from '@/../public/four.svg'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


export default async function LandingPage() {

    const Trending = await getTrending()
  return (
    <>
    
    <div className="w-full bg-black relative h-[150vh] md:h-[125vh] overflow-hidden select-none">

      <img src={landingpage.src} className='w-full h-full object-cover' alt=""/>
            
              <div  className="absolute top-[18%] md:top-[30%] right-0 left-0 bottom-0 flex flex-col items-center text-center">
                    <div className='w-[80%] md:w-1/2' >
                        <h1 className='text-white text-5xl font-bold'>Unlimited movies, TV shows, and more</h1>
                        <p className='text-white mt-2'>Starts at $7.99. Cancel anytime.</p>
                        <p className='text-white mt-6'>Ready to watch? Enter your email to create or restart your membership.</p>

                            <div className='w-full flex flex-col md:flex-row md:gap-x-2 my-4'>
                                <Input className='h-14 w-full md:w-2/3 rounded-sm bg-[rgba(0,0,0,0.7)] text-white font-bold selection:bg-white selection:text-black' type="email" placeholder="Email address" />
                                <button className='h-14 w-full md:w-1/3 mt-5 md:mt-0 rounded-sm flex justify-center items-center text-white font-semibold bg-red-600 hover:bg-red-700 transition'>Get Started <ChevronRight className='ms-3' /></button>
                            </div>
                    </div>
              </div>


              {/* <div className='relative w-full bg-black'> */}
                    <div className="pointer-events-none absolute top-[80%] left-[50%] translate-x-[-50%] transform scale-x-420 w-100 h-100  rounded-full bg-gradient-to-r from-black via-red-500 to-black z-1"></div>
                    <div className="pointer-events-none absolute top-[80.7%] left-[50%] translate-x-[-50%] transform scale-x-420 w-100 h-100  rounded-full bg-black z-1"></div>
                    <div className="pointer-events-none absolute top-[80.7%] left-[50%] translate-x-[-50%] transform scale-x-420 w-100 h-100  rounded-full bg-[radial-gradient(circle_at_top,_rgba(27,54,196,0.4),_transparent_18%)] z-2"></div>
                {/* </div> */}
    </div>



    <div className='relative w-full bg-black'>
        <div className="z-5 text-white">
            <Top10LandingPage data={Trending} title={"Trending Now"}/>
        </div>
    </div>


    

    <div className='relative  w-full bg-black px-10 pt-10'>
        <h2 className="text-white font-bold text-2xl pb-3">More Reasons to Join</h2>

        <div className='flex flex-row flex-wrap'>

        

        <div className="p-2 w-full md:w-1/2">
            <div className="relative text-white p-5 rounded-2xl bg-gradient-to-r from-[#192246] to-[#210E17]">
                <p className="text-white font-bold text-2xl pb-4">Enjoy on your TV</p>
                <p className="text-white text-1xl">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                <div className='flex justify-end pt-5'>
                    <img src={three.src} alt="" />
                </div>
            </div>
        </div>

        <div className="p-2 w-full md:w-1/2">
            <div className="relative text-white p-5 rounded-2xl bg-gradient-to-r from-[#192246] to-[#210E17]">
                <p className="text-white font-bold text-2xl pb-4">Enjoy on your TV</p>
                <p className="text-white text-1xl">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                <div className='flex justify-end pt-5'>
                    <img src={two.src} alt="" />
                </div>
            </div>
        </div>

        <div className="p-2 w-full md:w-1/2">
            <div className="relative text-white p-5 rounded-2xl bg-gradient-to-r from-[#192246] to-[#210E17]">
                <p className="text-white font-bold text-2xl pb-4">Enjoy on your TV</p>
                <p className="text-white text-1xl">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                <div className='flex justify-end pt-5'>
                    <img src={one.src} alt="" />
                </div>
            </div>
        </div>

        <div className="p-2 w-full md:w-1/2">
            <div className="relative text-white p-5 rounded-2xl bg-gradient-to-r from-[#192246] to-[#210E17]">
                <p className="text-white font-bold text-2xl pb-4">Enjoy on your TV</p>
                <p className="text-white text-1xl">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                <div className='flex justify-end pt-5'>
                    <img src={four.src} alt="" />
                </div>
            </div>
        </div>

        </div>

    </div>




    <div className='relative  w-full bg-black px-10 py-10'>
        <h2 className="text-white font-bold text-2xl pb-5">Frequently Asked Questions</h2>

        <div className='flex flex-col'>

        <Accordion type="single" collapsible>

        <AccordionItem value="item-1">
            <AccordionTrigger>What is Netflix?</AccordionTrigger>
            <AccordionContent>
            Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
            <br/>You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
            </AccordionContent>
        </AccordionItem>


        <AccordionItem value="item-1">
            <AccordionTrigger>How much does Netflix cost?</AccordionTrigger>
            <AccordionContent>
            Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EGP 100 to EGP 240 a month. No extra costs, no contracts.
            </AccordionContent>
        </AccordionItem>


        <AccordionItem value="item-1">
            <AccordionTrigger>Where can I watch?</AccordionTrigger>
            <AccordionContent>
            Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
            <br/>You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
            </AccordionContent>
        </AccordionItem>


        <AccordionItem value="item-1">
            <AccordionTrigger>How do I cancel?</AccordionTrigger>
            <AccordionContent>
            Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
            </AccordionContent>
        </AccordionItem>


        <AccordionItem value="item-1">
            <AccordionTrigger>What can I watch on Netflix?</AccordionTrigger>
            <AccordionContent>
            Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
            </AccordionContent>
        </AccordionItem>


        <AccordionItem value="item-1">
            <AccordionTrigger>Is Netflix good for kids?</AccordionTrigger>
            <AccordionContent>
            The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.
            <br/>Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.
            </AccordionContent>
        </AccordionItem>

        </Accordion>

        </div>

    </div>





    <div className='relative  w-full bg-black px-10 py-10'>
        <div className='w-full md:w-2/3 mx-auto' >
            <p className='text-white mt-6 text-center'>Ready to watch? Enter your email to create or restart your membership.</p>
                <div className='w-full flex flex-col md:flex-row md:gap-x-2 my-4'>
                    <Input className='h-14 w-full md:w-2/3 rounded-sm bg-[#141414]' type="email" placeholder="Email address" />
                    <button className='h-14 w-full md:w-1/3 mt-5 md:mt-0 rounded-sm flex justify-center items-center text-white font-semibold bg-red-600 hover:bg-red-700 transition'>Get Started <ChevronRight className='ms-3' /></button>
                </div>
        </div>
    </div>

    
    
    </>
  )
}
