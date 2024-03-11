"use client"

import React, { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <div className="flex items-center flex-col max-w-full">
        <Navbar />
        <div className="w-full max-w-screen-2xl my-32 p-2">
          <h1 className="text-white text-5xl mb-5">What is Anishare?</h1>
          <p className="text-white text-2xl">
            Anishare is anime tracker service to share your watched animes with
            your freinds and to track watched animes for personal reasons.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
