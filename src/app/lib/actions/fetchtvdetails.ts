'use server';

import { dataInfo } from "@/app/_interfaces/data-type";
import axios from "axios";

export default async function fetchTvdetails(tvTd: number): Promise<any> {
  try {
  const Trending = await axios.get(`https://api.themoviedb.org/3/tv/${tvTd}?language=en-US`,
      {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
          },
      }
  );
  
  return Trending.data;
  } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
  } 
}


export async function getTvRecommendations(tvTd: number): Promise<dataInfo> {
    try {
    const Trending = await axios.get(`https://api.themoviedb.org/3/tv/${tvTd}/recommendations?language=en-US&page=1`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
            },
        }
    );
    
    return Trending.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    } 
  }



  export async function getTvVideo(tvTd: number): Promise<string | null> {
    try {
    const Trending = await axios.get(`https://api.themoviedb.org/3/tv/${tvTd}/videos?language=en-US`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
            },
        }
    );
    
    if (Trending.data.results && Trending.data.results.length > 0) {
        return Trending.data.results[0].key;
      } else {
        console.warn("No video results found for TV show ID:", tvTd);
        return null; // or throw an error if preferred
      }
    } catch (error) {
      console.error("Error fetching TV videos:", error);
      throw error;
    }
  }