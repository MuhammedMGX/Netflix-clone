'use server';

import { dataInfo } from "@/app/_interfaces/data-type";
import axios from "axios";

export default async function getMovieDetails(movieId: number): Promise<any> {
  try {
  const Trending = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
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


export async function getMovieRecommendations(movieId: number): Promise<dataInfo> {
    try {
    const Trending = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
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



  export async function getMovieVideo(movieId: number): Promise<any> {
    try {
    const Trending = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
            },
        }
    );
    
    return Trending.data.results[0].key;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    } 
  }
  