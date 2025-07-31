export type dataInfo = {
    page: number
    results: movieDataInfo[]
    total_pages: number
    total_results: number
  }

  export type movieDataInfo = {
    backdrop_path: string
    id: number
    title: string
    name: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    adult: boolean
    original_language: string
    genre_ids: Array<number>
    popularity: number 
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
  }


  export interface Watchlist {
    userId: string;
    movieIds: string[];
  }