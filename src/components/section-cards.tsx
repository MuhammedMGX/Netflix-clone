import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export function SectionCards() {
  return (
    <div className="px-10">
      <h1 className="text-4xl font-bold">Account</h1>

      <p className="text-gray-500 font-semibold">Membership details</p>

      <Card className="w-full pb-2 px-2 mt-4">
        <CardHeader>

          <CardDescription>
            <div className="h-10 w-50 bg-gradient-to-r from-violet-800 to-fuchsia-600 mb-3 flex justify-center items-center text-white font-semibold translate-x-[-16%] rounded-r-full">Member since May 2025</div>
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ">
            Standard plan
          </CardTitle>

        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm px-2">
          <div className="line-clamp-1 flex gap-2 font-medium px-4">
            Next payment: 5 June 2025
          </div>
          <div className="w-[98%] mx-auto h-[1px] bg-gray-300 mt-4"></div>

          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Manage membership</p><ChevronRight/></div>
        </CardFooter>
      </Card>



      <p className="text-gray-500 font-semibold mt-5">Quick Links</p>

      <Card className=" p-2 mt-4">
      
          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Change plan</p><ChevronRight/></div>
          <div className="w-[98%] mx-auto h-[1px] bg-gray-300"></div>

          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Add payment method</p><ChevronRight/></div>
          <div className="w-[98%] mx-auto h-[1px] bg-gray-300"></div>

          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Manage access and devices</p><ChevronRight/></div>
          <div className="w-[98%] mx-auto h-[1px] bg-gray-300"></div>

          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Update password</p><ChevronRight/></div>
          <div className="w-[98%] mx-auto h-[1px] bg-gray-300"></div>

          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Transfer a profile</p><ChevronRight/></div>
          <div className="w-[98%] mx-auto h-[1px] bg-gray-300"></div>

          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Adjust parental controls</p><ChevronRight/></div>
          <div className="w-[98%] mx-auto h-[1px] bg-gray-300"></div>

          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Edit settings</p><ChevronRight/></div>
      </Card>

      <Card className=" p-2 mt-4 mb-20">
          <div className="w-full h-17 bg-white hover:bg-gray-100 transition rounded-lg flex justify-between items-center ps-4 pe-5"><p className="text-black text-lg font-semibold">Manage profiles</p><ChevronRight/></div>
      </Card>


    </div>
  )
}
