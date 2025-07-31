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
import { type signUpInputs } from "@/app/_interfaces/sign-type"
import axios from "axios"
import Link from "next/link"



const signUpSchema = z.object({
    username: z.string()
      .min(3, "Username must be 3-20 characters")
      .max(20, "Username must be 3-20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username must be 3-20 characters long and only contain letters, numbers, and underscores."),
    email: z.string()
      .email("Invalid email address"),
    password: z.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long."
      ),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });





export default function Signup() {
    const router = useRouter();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<signUpInputs>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }
      });

      


        const onSubmit = async (data : signUpInputs) => {
          setIsSubmitting(true);
        
            let res = await axios.post('/auth/api/signUp' , data )
  
            if (res.data.success) {
                setIsSubmitting(false);
                setError(false);
                router.push("/auth/signin");
            }else{
                setIsSubmitting(false);
                setError(true);
            }

        };
  
      

    return (
      <>



<div className="w-full relative h-[120vh] overflow-hidden select-none backgroundSign flex justify-center">
        <div  className="flex my-20 items-center text-center">
        
              <Card className="p-6 bg-[rgba(0,0,0,0.6)] border-none my-20">

                <CardHeader className="text-left">
                  <CardTitle className="text-4xl text-white font-bold ">Sign Up</CardTitle>
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
                            <Input id="userName" {...register("username")} type="text" placeholder="Username"  className="border-gray-500 h-13 placeholder:font-bold placeholder:text-gray-400 text-white font-bold selection:bg-white selection:text-black"/>
                            {errors.username && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.username?.message}</p> )}
                          </div>
                          
                          <div className="relative">
                          <Input id="email" {...register("email")} type="email" placeholder="Email" className="border-gray-500 h-13 placeholder:font-bold placeholder:text-gray-400 text-white font-bold selection:bg-white selection:text-black"/>
                          {errors.email && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.email?.message}</p> )}
                          </div>

                          <div className="relative">
                          <Input id="password" {...register("password")} type="password" placeholder="Password" className="border-gray-500 h-13 placeholder:font-bold placeholder:text-gray-400 text-white font-bold selection:bg-white selection:text-black" />
                          {errors.password && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.password?.message}</p> )}
                          </div>

                          <div className="relative">
                          <Input id="confirmPassword" {...register("confirmPassword")} type="password" placeholder="Confirm Password"  className="border-gray-500 h-13 placeholder:font-bold placeholder:text-gray-400 text-white font-bold selection:bg-white selection:text-black"/>
                          {errors.confirmPassword && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒{errors.confirmPassword?.message}</p> )}
                          </div>
                        
                        </div>

                        <Button type="submit" className="w-full bg-red-600 font-bold text-md h-10 hover:bg-red-700 rounded-sm">
                          {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Sign up"}
                        </Button>


                        <span className="text-gray-400 font-semibold text-lg relative z-10 px-2">
                          OR
                        </span>


                        <div className="flex flex-col gap-4">
                          <Button variant="outline" className="w-full bg-[rgba(255,255,255,0.2)] font-semibold text-lg text-white hover:text-white h-10 hover:bg-[rgba(255,255,255,0.3)] rounded-sm border-none">
                            Use a Sign-In Code
                          </Button>

                        </div>

                        <div className="text-start space-x-2">

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
      
      
      
      {/* <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-transparent">

      <div className="flex w-full max-w-sm flex-col gap-6">
        



    <div >
      <Card className="p-6">
        <CardHeader className="text-left">
          <CardTitle className="text-xl">Sign up</CardTitle>
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
                    <Input id="userName" {...register("username")} type="text" placeholder="Username"/>
                    {errors.username && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.username?.message}</p> )}
                  </div>
                  
                  <div className="relative">
                  <Input id="email" {...register("email")} type="email" placeholder="Email" />
                  {errors.email && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.email?.message}</p> )}
                  </div>

                  <div className="relative">
                  <Input id="password" {...register("password")} type="password" placeholder="Password"  />
                  {errors.password && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒ {errors.password?.message}</p> )}
                  </div>

                  <div className="relative">
                  <Input id="confirmPassword" {...register("confirmPassword")} type="password" placeholder="Confirm Password"  />
                  {errors.confirmPassword && ( <p className="text-red-500 text-xs m-0 absolute ms-2 ">⛒{errors.confirmPassword?.message}</p> )}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Sign up"}
                </Button>


                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  OR
                </span>
                </div>


                <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>

                    <a href="#"className="ml-auto text-sm underline-offset-4 hover:underline mx-auto">
                      Forgot your password?
                    </a>




                
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
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>


    

      </div>
    </div> */}
      
      
      
      </>
    )
  }
  