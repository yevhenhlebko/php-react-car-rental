import React from "react";
import { Link } from "react-router-dom";
import GuestNav from "../components/guest-nav";

function Welcome() {
  return (
    <div className="flex flex-col min-h-screen">
      <GuestNav />
      <div className="bg-black flex flex-1 flex-col items-center justify-center">
        <div className="p-8 flex flex-col items-center">
          <div className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
            <img src="/images/icons/ajexperience.svg" />
          </div>
        </div>
        <div className="mt-10 px-7 lg:px-0 items-center">
          <img src="/images/icons/car.svg" />
        </div>
        <div className="mt-28 w-2/6 sm:w-1/6">
          <Link to="/login" className="text-white">
            <button className="border rounded-lg p-2 text-white bg-black w-full text-xl sm:text-2xl font-julius hover:bg-indigo-500-dark">
              Start
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
