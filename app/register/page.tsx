"use client"


import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function Register() {
  axios.defaults.baseURL = "http://localhost:3000/api/";
  const { push } = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setError] = useState("");

  const createAccount = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", data);
      console.log(response.data);
      setError(response.data.error);
      if (!response.data.error) {
        push("/login");
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
          <h1 className="text-white text-4xl">Register</h1>
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
              onClick={createAccount}
              className="text-white text-xl rounded-md p-1 hover:text-darkblue hover:bg-white"
            >
              Create Account
            </button>
          </div>
          <Link href="/login" className="my-2 text-white border-b-2">
            Haven&apos;t Signed Up?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
