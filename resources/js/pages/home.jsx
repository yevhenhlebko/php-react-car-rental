import React from "react";
import { useAuth } from "../context/auth";

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div>
        <h1 className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
          Welcome, {currentUser.name}!
        </h1>
        <p className="text-white text-center">
          Once your account is confirmed by an admin, you will be able to access the site.
        </p>
      </div>
    </div>
  );
}

export default Home;
