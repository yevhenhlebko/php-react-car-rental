import React from 'react';
import GuestNav from '../components/guest-nav';
import { Link } from 'react-router-dom';

function Welcome () {
  return (
    <div className="flex flex-col min-h-screen">
      <GuestNav />
      <div className="bg-black flex flex-1 flex-col items-center justify-center">
        <div className="p-8 flex flex-col items-center">
          <div className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
                AJ’s Experience
          </div>
        </div>
        <div className="items-center">
          <img src='/images/icons/car.svg'/>
        </div>
        <div className="mt-5per w-1/6 h-96">
          <button className="border rounded-lg p-2 text-white bg-black w-full text-2xl font-julius hover:bg-indigo-500-dark">
            <Link to="/login" className="text-white">
                    Start
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
