"use client";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AnimeCards from "@/components/AnimeCards";

const SuspenseWrapper = () => (
    <Suspense>
        <SearchPage />
    </Suspense>
)

export default SuspenseWrapper

function SearchPage() {
  const apiUrl = process.env.API_URL
  axios.defaults.baseURL = apiUrl
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [anime, setAnime] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract search query from pathnam
    const pathname = searchParams.get("a");
    setSearch(pathname || "");
    const fetchAnime = async () => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${pathname}&sfw&limit=12`
      );

      setAnime(response.data.data);
    };
    fetchAnime();
    const fetchData = async () => {
      const response = await axios.get("/api/users");
      setUsername(response.data.username);
    };
    fetchData();
  }, []); // Trigger useEffect when the pathname changes

  const addAnime = async (url: string, title: string) => {
    try {
      const response = await axios.post("/api/add", { username, title, url });
      console.log(username);
      if (response.data.message === "success") {
        router.push(`/users/${username}`);
      }
    } catch (error) {
      console.error("Error adding anime:", error);
    }
  };

  // Handle search functionality here

  return (
    <>
      <div className="h-screen w-full ">
        <div className="flex flex-col items-center">
          <h1 className="text-white text-xl">Search query: {search}</h1>
          <div className="w-full max-w-6xl my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {anime.length == 0 ? <div>No results found</div> : (anime.map((animeItem, index) => (
              <AnimeCards
                key={index}
                url={animeItem["images"]["jpg"]["image_url"]}
                title={animeItem["title"]}
                sourcefile={animeItem["url"]}
                addList={addAnime}
              />
            )))}
          </div>
        </div>
      </div>
    </>
  );
}