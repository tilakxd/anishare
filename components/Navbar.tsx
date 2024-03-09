import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <nav className="flex justify-around items-center border-white rounded-lg h-20 w-full max-w-screen-2xl">
        <div>
          <button className="text-white text-xl p-1 rounded-lg hover:text-darkblue hover:bg-white">
            Source
          </button>
        </div>
        <div className="text-white text-4xl">Anishare</div>
        <div className="text-white text-xl">
          <Link
            href="/login"
            className="mr-4 rounded-lg p-1 hover:text-darkblue hover:bg-white"
          >
            Login
          </Link>
          <Link href="/register" className="rounded-lg p-1 hover:text-darkblue hover:bg-white">
            Signup
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
