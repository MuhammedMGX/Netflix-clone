import facebook from '@/../public/icons/SocialMedia/Facebook.png'
import twitter from '@/../public/icons/SocialMedia/Twitter.png'
import instagram from '@/../public/icons/SocialMedia/Instagram.png'
import youtube from '@/../public/icons/SocialMedia/YouTube.png'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/nextAuth'
import { ChevronDown, Languages } from 'lucide-react'

export default async function Footer() {

      const session = await getServerSession(authOptions)
      const isAuth = Boolean(session);
      
  
  return (
    <>

    {isAuth ? 
    <footer className='px-10 md:px-30 pt-18 pb-9 mt-5 z-55'>

    <div className='flex gap-3'>
      <img src={facebook.src} alt="" />
      <img src={instagram.src} alt="" />
      <img src={twitter.src} alt="" />
      <img src={youtube.src} alt="" />
    </div>

    <div className="flex flex-wrap text-gray-400">

      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">Audio Description</Link>
        <Link href="">Investor Relations</Link>
        <Link href="">Privacy</Link>
        <Link href="">Contact Us</Link>
      </div>
      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">Help Center</Link>
        <Link href="">Jobs</Link>
        <Link href="">Legal Notices</Link>
        <Link href="">Do Not Sell or Share My Personal Information</Link>
      </div>
      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">Gift Cards</Link>
        <Link href="">Netflix Shop</Link>
        <Link href="">Cookie Preferences</Link>
        <Link href="">Ad Choices</Link>
      </div>
      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">Media Center</Link>
        <Link href="">Terms of Use</Link>
        <Link href="">Corporate Information</Link>
      </div>

    </div>

    <div className='text-gray-400'>
      <button className='border px-2 py-2 mb-2 rounded-sm'>Service Code</button>
      <p>© 1997 - 2024 Netflix, Inc.</p>
    </div>

  </footer>
    :
    <footer className='flex flex-col px-10 md:px-21 pt-18 pb-9 mt-5 z-55'>

    <div className='flex gap-3 text-gray-400'>
      <p>Questions? Call 1-844-505-2993</p>
    </div>

    <div className="flex flex-wrap text-gray-400">

      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">FAQ</Link>
        <Link href="">Investor Relations</Link>
        <Link href="">Buy Gift Cards</Link>
        <Link href="">Cookie Preferences</Link>
        <Link href="">Legal Notices</Link>
      </div>
      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">Help Center</Link>
        <Link href="">Jobs</Link>
        <Link href="">Ways to Watch</Link>
        <Link href="">Corporate Information</Link>
        <Link href="">Only on Netflix</Link>
      </div>
      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">Account</Link>
        <Link href="">Netflix Shop</Link>
        <Link href="">Terms of Use</Link>
        <Link href="">Contact Us</Link>
        <Link href="">Do Not Sell or Share Personal Information</Link>
      </div>
      <div className='flex w-1/2 md:w-1/4 flex-col gap-2 my-4'>
        <Link href="">Media Center</Link>
        <Link href="">Redeem Gift Cards</Link>
        <Link href="">Privacy</Link>
        <Link href="">Speed Test</Link>
        <Link href="">Ad Choices</Link>
      </div>

    </div>

    <div className='text-gray-400 w-33 custom-select relative'>
              <select className="border px-10 py-1 rounded-sm text-white border-gray-500" name="" id="">
                  <option className='font-semibold text-black' value="apple">English</option>
                  <option className='font-semibold text-black' value="banana">Arabic</option>
              </select>
              <ChevronDown className="absolute top-[35%] right-[10%]" size={13} color="white" fill="white" />
              <Languages className="absolute top-[30%] left-[10%]" size={16} color="white" />
          </div>

    </footer>
     }
    
    </>
  )
}
