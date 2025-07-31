import { getServerSession } from "next-auth";
import { authOptions } from "./lib/nextAuth";
import HomePage from "./home/page";
import { redirect } from "next/navigation";



export default async function Home() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/landingpage')
  }else{
    redirect('/home')
  }


  return (
    <>
      
    </>
  );
}
