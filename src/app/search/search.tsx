'use client';
import searchIcon from "@/../public/icons/search.svg";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fetchDetailsbySearch from "../lib/actions/Search";
import { BrowseE, MobileBrowseE, SearchE } from "../../components/emblaCarousel";
import { getTrending } from "../lib/api/movies";
import { dataInfo } from "../_interfaces/data-type";

export default function SearchPage(trending : any) {
  const [query, setQuery] = useState('');
  const [resultsData, setResults] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetchDetailsbySearch(query);
    setResults(res);
    setLoading(false);
  };

 

  
  return (
    <>
      <div className="pt-25 mb-5 w-[90%] md:w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center h-12">
          <Input
            className="h-full rounded-full placeholder:ps-5 placeholder:font-bold text-white font-bold ps-5 border-2 border-gray-500 selection:bg-white selection:text-black focus:outline-none focus:ring-none "
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for fruits..."
          />
          <Button type="submit" className="rounded-full h-full border-2 border-gray-500"> <img src={searchIcon.src} className="" alt="" /> </Button>
        </form>
        
      </div>
        

    {resultsData?.results.length > 0 ? 

      <div>
        <SearchE data={resultsData} isMobile={false} titleH="Search" />
      </div> 

    :

      <div className="mt-10">
        <SearchE data={trending.data} isMobile={false} titleH="" />
      </div>
    
    }

      


      

  
      

      

    </>
  );
}