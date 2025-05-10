'use client';
import searchIcon from "@/../public/icons/search.svg";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fetchDetailsbySearch from "../lib/actions/Search";
import { SearchE } from "../../components/emblaCarousel";
import { getTrending } from "../lib/api/movies";
import { dataInfo } from "../_interfaces/data-type";

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
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
      <div className="pt-25 mb-5 w-2/3 md:w-1/2 mx-auto">
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
        { results ? null :<h2 className="text-white p-2">Not found!</h2>}
        

      <div>
        {<SearchE data={results} isMobile={false} titleH="Search" />}
      </div>

    </>
  );
}