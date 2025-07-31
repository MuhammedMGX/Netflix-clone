'use server';

import { dataInfo } from "@/app/_interfaces/data-type";
import axios from "axios";

export default async function fetchDetailsbySearch(title: string): Promise<any> {
    const input = title;
    const encoded = encodeURIComponent(input);

  try {
  const Trending = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${encoded}&include_adult=false&language=en-US&page=1`,
      {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
          },
      }
  );
  
  return Trending.data.results[0];
  } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
  } 
}
