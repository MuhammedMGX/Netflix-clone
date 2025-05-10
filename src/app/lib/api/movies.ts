import { dataInfo } from "@/app/_interfaces/data-type";
import axios from "axios";

export async function getTrending(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/trending/all/day?language=en-US',
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

  export async function getTrendingMovies(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US',
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

  export async function getTrendingTv(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/trending/tv/day?language=en-US',
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





  export async function getNowPlaying(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
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



  
  export async function getPopularMovies(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
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
  export async function getPopularTvSeries(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
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




  export async function getTop10Movies(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
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



  export async function getTop10TvSeries(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
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








  export async function getUpcomingMovies(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
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


  export async function getAiringToday(): Promise<dataInfo> {
    try {
    const Trending = await axios.get('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
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




//   export default async function fetchMovieById (movieId: number , cat:string): Promise<any> {
//     try {
//     const Trending = await axios.get(`https://api.themoviedb.org/3/${cat}/${movieId}?language=en-US`,
//         {
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
//             },
//         }
//     );
    
//     return Trending.data;
//     } catch (error) {
//         console.error('Error fetching trending movies:', error);
//         throw error;
//     } 
//   }

export const fetchMoviesByIds = async (ids: number[], category: 'movie' | 'tv') => {
    const API_KEY = process.env.TMDB_API_KEY;
    if (!API_KEY) {
      throw new Error('TMDB_API_KEY is not defined');
    }
  
    const requests = ids.map((id) =>
      axios
        .get(`https://api.themoviedb.org/3/${category}/${id}?language=en-US`, {
            headers: {
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
                            },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(`Failed to fetch ${category} with ID ${id}:`, err.message);
          return null;
        })
    );
  
    const results = await Promise.all(requests);
    return results.filter(Boolean); // remove nulls
  };