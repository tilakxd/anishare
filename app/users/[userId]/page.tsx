"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import ListCards from "@/components/ListCards";
import Navbar from "@/components/Navbar";

function Lsers({ params }: any) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState(false); // State variable to store userId
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = process.env.API_URL;
  axios.defaults.baseURL = apiUrl;
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await axios.post("/api/find", {
        username: params.userId,
      });
      if (response.data.message == "success") {
        setAnime(response.data.animes);
      }
      if (
        response.data.message ==
        "No user found register this username to claim this page"
      ) {
        setError(response.data.message);
      }
    };
    fetchAnime();
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsername(response.data.username);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setUsername("Null");
        } else {
          console.error("Something went wrong:", error.message);
        }
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (username == params.userId) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [username, params.userId]);
  const searchAnime = () => {
    router.push(`/search?a=${search}`);
  };

  const deleteAnime = async (_id: string) => {
    try {
      await axios.delete("/api/delete", {
        params: {
          a: _id,
        },
      });
      // Filter out the deleted anime from the state
      setAnime((prevAnime) =>
        prevAnime.filter((anime) => anime["_id"] !== _id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar />
      <div className="flex items-center flex-col">
        {auth && (
          <div className="text-white text-4xl">Welcome {params.userId}</div>
        )}
        <div className="flex flex-row">
          {auth && (
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Anime Here"
            ></input>
          )}
          {auth && (
            <button
              onClick={searchAnime}
              className="text-white mx-2 p-2 border-2 rounded-md hover:text-darkblue hover:bg-white"
            >
              Submit
            </button>
          )}
        </div>
        <div>{error}</div>

        <div>
          {auth && anime.length === 0 ? (
            <div>Search to add anime</div>
          ) : (
            anime.map((animes) => (
              <ListCards
                key={animes["_id"]}
                url={animes["image_url"]}
                title={animes["title"]}
                clicked={!auth}
                _id={animes["_id"]}
                deleteAnime={deleteAnime}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Lsers;
