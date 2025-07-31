
"use client"

import { GalleryVerticalEnd, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AlertCircle } from "lucide-react"
import landingpage from '@/../public/LandingPage.png'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { use, useState } from "react"
import { signInInputs, type signUpInputs } from "@/app/_interfaces/sign-type"
import { signIn } from "next-auth/react"
import Link from "next/link"



const signInSchema = z.object({
    
    email: z.string()
      .email("Invalid email address"),
    password: z.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long."
      ),
  });





export default function Signin() {
    const router = useRouter();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<signInInputs>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email: "",
          password: "",
        }
      });

        const onSubmit = async (data : signInInputs) => {

          setIsSubmitting(true);


          const res = await signIn("credentials", {
            username: data.email,
            password: data.password,
            redirect: true,
            callbackUrl: "/home",
          });
           

        };
  
      

    return (
      <>
      
      <div className="w-full relative h-[120vh] overflow-hidden select-none backgroundSign flex justify-center">
        <div  className="flex my-20 items-center text-center">
        
              <Card className="p-6 bg-[rgba(0,0,0,0.6)] border-none my-20">

                <CardHeader className="text-left">
                  <CardTitle className="text-4xl text-white font-bold ">Sign In</CardTitle>
                </CardHeader>

                <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                      <div className="grid gap-6">


                      {error ? <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Something went wrong. Please try again later. 
                        </AlertDescription>
                      </Alert> : null}
                      

                        <div className="grid gap-6">                           
                          
                          <div className="relative">
                          <Input id="email" {...register("email")} type="email" placeholder="Email"  className="border-gray-500 h-13 placeholder:font-bold placeholder:text-gray-400 text-white font-bold selection:bg-white selection:text-black"/>
                          {errors.email && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.email?.message}</p> )}
                          </div>

                          <div className="relative">
                          <Input id="password" {...register("password")} type="password" placeholder="Password" className="border-gray-500 h-13 placeholder:font-bold placeholder:text-gray-400 text-white font-bold selection:bg-white selection:text-black" />
                          {errors.password && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.password?.message}</p> )}
                          </div>

                        </div>

                        <Button type="submit" className="w-full bg-red-600 font-bold text-md h-10 hover:bg-red-700 rounded-sm">
                          {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Sign in"}
                        </Button>


                        <span className="text-gray-400 font-semibold text-lg relative z-10 px-2">
                          OR
                        </span>


                        <div className="flex flex-col gap-4">
                          <Button variant="outline" className="w-full bg-[rgba(255,255,255,0.2)] font-semibold text-lg text-white hover:text-white h-10 hover:bg-[rgba(255,255,255,0.3)] rounded-sm border-none">
                            Use a Sign-In Code
                          </Button>

                          <Link href="#"className="ml-auto text-sm underline mx-auto text-white font-semibold">
                              Forgot password?
                          </Link>

                        </div>

                        <div className="text-start space-x-2">

                          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                          <label
                            htmlFor="terms"
                            className="text-md font-semibold text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remember me
                          </label>

                          <p className="pt-2 text-gray-300">New to Netflix? <Link href="/auth/signup" className="text-white pt-2 font-bold hover:underline">Sign up now</Link></p>

                          <p className="pt-5 text-gray-400 text-xs">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>

                        </div>


                      
                      </div>


                      <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="underline underline-offset-4">
                          Sign up
                        </a>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>


              
            </div>

     </div>
      
      
      
      
      </>
    )
  }
  