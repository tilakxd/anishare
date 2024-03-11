"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

function Login() {
  const apiUrl = process.env.API_URL
  axios.defaults.baseURL = apiUrl
  const router = useRouter();
  const [errorMessage, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const login = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", data);
      console.log(response.data);
      setError(response.data.noti);
      if (response.data.message === "Authenticated!") {
        const username = response.data.username;
        router.push(`/users/${username}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
   
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <h1 className="text-white my-2 text-6xl p-2">Anishare</h1>
        <div className="border-2 border-white w-full max-w-xl h-full max-h-96 flex flex-col items-center p-2 justify-between">
          <h1 className="text-white text-4xl">Login</h1>
          <h1 className="text-white">{errorMessage}</h1>
          <div className="">
            <h1 className=" text-white ">username</h1>
            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="border-2 rounded-sm bg-transparent text-white"
            ></input>
            <h1 className="text-white">password</h1>
            <input
              type="password"
              className="border-2 rounded-sm bg-transparent text-white"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
          </div>
          <div className="my-5">
            <button
              onClick={login}
              className="text-white text-xl rounded-md p-1 hover:text-darkblue hover:bg-white"
            >
              Login
            </button>
          </div>
          <Link href="/register" className="my-2 text-white border-b-2">
            Not signed up?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
