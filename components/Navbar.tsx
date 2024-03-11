"user client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function Navbar() {
  const apiUrl = process.env.API_URL;
  axios.defaults.baseURL = apiUrl;
  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
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
    const fetchAnime = async () => {
      const response = await axios.post("/api/find", {
        username,
      });
      if (response.data.message == "success") {
        setAuth(true);
      }
      if (
        response.data.message ==
        "No user found register this username to claim this page"
      ) {
        console.log(response.data.message);
      }
    };
    fetchAnime();
  }, [username]);

  const logout = async () => {
    const response = await axios.get("/api/logout") 
    if (response.data.message == "Logged out successfully!"){
        router.push('/')
    } else {
console.log("logout unsuccesfull")
    }
  }
  return (
    <>
      <div className="w-full flex justify-center">
        <nav className="flex justify-around items-center border-white rounded-lg h-20 w-full max-w-screen-2xl">
          <div>
            <button className="text-white text-xl p-1 rounded-lg hover:text-darkblue hover:bg-white">
              Source
            </button>
          </div>
          <div className="text-white text-4xl">Anishare</div>
          <div className="text-white text-xl">
            {!auth ? (
              <>
                <Link
                  href="/login"
                  className="mr-4 rounded-lg p-1 hover:text-darkblue hover:bg-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg p-1 hover:text-darkblue hover:bg-white"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/users/${username}`}
                  className="rounded-lg p-1 hover:text-darkblue hover:bg-white mx-2"
                >
                  Profile
                </Link>
                <button className="rounded-lg p-1 hover:text-darkblue hover:bg-white" onClick= {logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
