import React from 'react';
import { Link } from 'react-router-dom';

function GuestNav () {
  return (
    <div className="w-full bg-black px-6 mx-auto flex items-center justify-between border-b-2 border-gray-200 border-opacity-25">
      <ul className="list-reset flex pt-4">
        <li className="px-2">
          <Link to=""
            className="no-underline text-gray-700 uppercase font-thin"
          ></Link>
        </li>
      </ul>

      <ul className="list-reset flex pt-4">
        <li className="px-4 py-2">
          <Link to="/login"
            className="no-underline text-white font-julius font-normal text-opacity-75"
          >LOGIN
          </Link>
        </li>

        <li className="px-4 py-2 list-reset">
          <Link to="/join"
            className="no-underline text-white font-julius font-normal text-opacity-75"
          >JOIN</Link>
        </li>
      </ul>
    </div>
  );
};

export default GuestNav;
