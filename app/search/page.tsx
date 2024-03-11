"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import AnimeCards from "@/components/AnimeCards";

function SearchPage() {
  axios.defaults.baseURL = "http://localhost:3000/api/";
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [anime, setAnime] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract search query from pathname
    const pathname = searchParams.get("a");
    setSearch(pathname || "");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${pathname}&sfw&limit=12`
        );
        setAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchData();

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [searchParams]); // Add searchParams as a dependency

  const addAnime = async (url: string, title: string) => {
    try {
      const response = await axios.post("/add", { username, title, url });
      if (response.data.message === "success") {
        router.push(`/users/${username}`);
      }
    } catch (error) {
      console.error("Error adding anime:", error);
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-xl">Search query: {search}</h1>
        <div className="w-full max-w-6xl my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {anime.length === 0 ? (
            <div>No results found</div>
          ) : (
            anime.map((animeItem, index) => (
              <AnimeCards
                key={index}
                url={animeItem["images"]["jpg"]["image_url"]}
                title={animeItem["title"]}
                sourcefile={animeItem["url"]}
                addList={addAnime}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
