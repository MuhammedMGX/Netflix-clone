"use client"
import { signOut } from "next-auth/react"

export default function SignOutBtn() {
  return <button onClick={() => signOut({ callbackUrl: '/auth/landingpage' })}>Sign out of Netflix</button>
  
}
