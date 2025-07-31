import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import logoImage from "@/../public/Netflix.png";
import searchIcon from "@/../public/icons/search.svg";
import Frame from "@/../public/icons/Frame.svg";
import notification from "@/../public/icons/Notification.svg";


import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, CircleHelp, Languages, MenuIcon, MountainIcon, Pencil, RefreshCw, User } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SignOutBtn from "@/app/auth/signout/SignOutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";


export default async function Navbar() {

  const session = await getServerSession(authOptions)
  const isAuth = Boolean(session);

  return (
    <>

    {isAuth ? 
      <header className="flex h-17 w-full shrink-0 fixed items-center px-8 md:px-12 bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] z-55">


            <Link href="/home" className="mr-6 hidden mt-1 lg:flex" prefetch={false}>
                <img src={logoImage.src} className="w-33" alt="" />
              </Link>

              
              <nav className="me-auto hidden lg:flex w-full items-center">
                <Link
                  href="/home"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-gray-400 transition"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="/tvshows"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-gray-400 transition"
                  prefetch={false}
                >
                  TV Shows
                </Link>
                <Link
                  href="/movies"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-gray-400 transition"
                  prefetch={false}
                >
                  Movies
                </Link>
                <Link
                  href="/new&popular"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-gray-400 transition"
                  prefetch={false}
                >
                  New & Popular
                </Link>
                <Link
                  href="/mylist"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-gray-400 transition"
                  prefetch={false}
                >
                  My List
                </Link>
                <Link
                  href="/browse"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-2 py-2 text-sm font-semibold text-white hover:text-gray-400 transition"
                  prefetch={false}
                >
                  Browse by Languages
                </Link>

                <div className="ml-auto flex items-center">

                  <Link href="/search" className="mr-6 hidden lg:flex" prefetch={false}>
                      <img src={searchIcon.src} className="hover:opacity-70" alt="" />
                  </Link>

                  <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                      <p className="text-white font-semibold hover:opacity-70">Kids</p>
                  </Link>

                  <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                      <img src={notification.src} className="hover:opacity-70" alt="" />
                  </Link>


                <DropdownMenu>
                    <DropdownMenuTrigger className="flex focus:outline-none">
                    <Avatar>
                      <AvatarImage src={Frame.src} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-60 me-10 mt-1 hover:none">

                      <Link href="/profile">
                      <DropdownMenuLabel className="flex items-center my-2">
                        <Avatar className="me-3">
                        <AvatarImage src={Frame.src} />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        My Account
                      </DropdownMenuLabel>
                      </Link>

                      <DropdownMenuSeparator  className="mb-3"/>
                      <Link href="/profile"><DropdownMenuItem><Pencil /> Manage Profile</DropdownMenuItem></Link>
                      <Link href="/profile"><DropdownMenuItem><RefreshCw /> Transfer Profile</DropdownMenuItem></Link>
                      <Link href="/profile"><DropdownMenuItem><User /> Account</DropdownMenuItem></Link>
                      <Link href="/profile"><DropdownMenuItem><CircleHelp /> Help Center</DropdownMenuItem></Link>
                      <DropdownMenuSeparator  className="my-3" />
                      <DropdownMenuItem><SignOutBtn /></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

              </div>

                  
              </nav>

              

              
              <Sheet>

                <div className="flex w-full items-center justify-between lg:hidden">

                  <Link href="/home" className="mr-6 lg:hidden lg:flex">
                      <img src={logoImage.src} className="w-27" alt="" />
                  </Link>



                  <div className="ml-auto flex items-center">

                      <Link href="/search" className="mr-3 sm:mr-6 lg:flex" prefetch={false}>
                          <img src={searchIcon.src} className="hover:opacity-70" alt="" />
                      </Link>

                      <Link href="#" className="mr-3 sm:mr-6 lg:flex" prefetch={false}>
                          <p className="text-white font-semibold hover:opacity-70">Kids</p>
                      </Link>

                      <Link href="#" className="mr-3 sm:mr-6  lg:flex" prefetch={false}>
                          <img src={notification.src} className="hover:opacity-70" alt="" />
                      </Link>


                      <DropdownMenu>
                    <DropdownMenuTrigger className="flex focus:outline-none">
                    <Avatar>
                      <AvatarImage src={Frame.src} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-60 me-10 mt-1">

                      <Link href="/profile">
                      <DropdownMenuLabel className="flex items-center my-2">
                        <Avatar className="me-3">
                        <AvatarImage src={Frame.src} />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        My Account
                      </DropdownMenuLabel>
                      </Link>

                      <DropdownMenuSeparator  className="mb-3"/>
                      <Link href="/profile"><DropdownMenuItem><Pencil /> Manage Profile</DropdownMenuItem></Link>
                      <Link href="/profile"><DropdownMenuItem><RefreshCw /> Transfer Profile</DropdownMenuItem></Link>
                      <Link href="/profile"><DropdownMenuItem><User /> Account</DropdownMenuItem></Link>
                      <Link href="/profile"><DropdownMenuItem><CircleHelp /> Help Center</DropdownMenuItem></Link>
                      <DropdownMenuSeparator  className="my-3" />
                      <DropdownMenuItem><SignOutBtn /></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                      </div>
                        

                </div>



                  <SheetTrigger asChild>
                  <Button size="icon" className="lg:hidden ml-auto bg-transparent hover:bg-transparent">
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"></path> </g></svg>
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                  </SheetTrigger>

                <SheetContent side="right" className="z-99 bg-[#141414] text-white border-none">

                  <SheetTitle className="flex items-center justify-between w-full">
                    <Link href="/home" className="mx-auto lg:flex">
                      <img src={logoImage.src} className="w-30" alt="" />
                    </Link>
                  </SheetTitle>
          
                  <div className="grid gap-2">
                    <Link href="/home" className="flex w-full items-center py-2 text-lg font-semibold ms-10 hover:text-gray-400 transition" prefetch={false}>
                      Home
                    </Link>
                    <Link href="/tvshows" className="flex w-full items-center py-2 text-lg font-semibold ms-10 hover:text-gray-400 transition" prefetch={false}>
                      TV Shows
                    </Link>
                    <Link href="/movies" className="flex w-full items-center py-2 text-lg font-semibold ms-10 hover:text-gray-400 transition" prefetch={false}>
                      Movies
                    </Link>
                    <Link href="/new&popular" className="flex w-full items-center py-2 text-lg font-semibold ms-10 hover:text-gray-400 transition" prefetch={false}>
                      New & Popular
                    </Link>
                    <Link href="/mylist" className="flex w-full items-center py-2 text-lg font-semibold ms-10 hover:text-gray-400 transition" prefetch={false}>
                      My List
                    </Link>
                    <Link href="/browse" className="flex w-full items-center py-2 text-lg font-semibold ms-10 hover:text-gray-400 transition" prefetch={false}>
                      Browse by Languages
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>

              
      </header>
    :
    <header className="flex h-20 w-full shrink-0 fixed items-center px-8 md:px-18 bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] z-55">


    <Link href="/home" className="mr-6 hidden mt-1 lg:flex" prefetch={false}>
        <img src={logoImage.src} className="w-50" alt="" />
      </Link>

      
      <nav className="me-auto hidden lg:flex w-full items-center">
        

        <div className="ml-auto flex items-center">

          <div className='text-gray-400 custom-select relative'>
              <select className="border px-10 py-1 rounded-sm text-white border-gray-500" name="" id="">
                  <option className='font-semibold text-black' value="apple">English</option>
                  <option className='font-semibold text-black' value="banana">Arabic</option>
              </select>
              <ChevronDown className="absolute top-[35%] right-[10%]" size={13} color="white" fill="white" />
              <Languages className="absolute top-[30%] left-[10%]" size={16} color="white" />
          </div>


          <Link href="/auth/signin" className="ms-4 hidden lg:flex" prefetch={false}>
            <button className='rounded-md py-1.5 px-3.5 text-white font-semibold text-sm bg-red-600 hover:bg-red-700 transition'>Sign In</button>
          </Link>

      </div>

          
      </nav>

      

      
      <Sheet>

        <div className="flex w-full items-center justify-between lg:hidden">

          <Link href="/home" className="mr-6 lg:hidden lg:flex">
              <img src={logoImage.src} className="w-15 md:w-40" alt="" />
          </Link>



          <div className="ml-auto flex items-center">

          <div className='text-gray-400 custom-select relative'>
              <select className="border px-2 md:px-10 py-1 rounded-sm text-white border-gray-500" name="" id="">
                  <option className='font-semibold text-black' value="apple">English</option>
                  <option className='font-semibold text-black' value="banana">Arabic</option>
              </select>
              <ChevronDown className="absolute top-[35%] right-[10%] hidden md:block" size={13} color="white" fill="white" />
              <Languages className="absolute top-[30%] left-[10%] hidden md:block" size={16} color="white" />
          </div>


          <Link href="/auth/signin" className="ms-4 lg:flex" prefetch={false}>
            <button className='rounded-md py-1.5 px-3.5 text-white font-semibold text-sm bg-red-600 hover:bg-red-700 transition'>Sign In</button>
          </Link>



              </div>
                

        </div>


      </Sheet>

      
    </header>

    }
      
    </>
  )
}

