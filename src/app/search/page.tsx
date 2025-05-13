"use server"

import { getTrending } from "../lib/api/movies"
import SearchPage from "./search"

export default async function Search() {
    const trending = await getTrending()
    
    

    
  return (
    <>
        <SearchPage data={trending} />
    </>
  )
}