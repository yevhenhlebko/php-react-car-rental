import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { setIntendedUrl } from '../utils/auth';

function AuthNav () {
  let { setCurrentUser, setToken, currentUser } = useAuth();
  let history = useHistory();
  let [hideMobileNav, setHideMobileNav] = useState(true);

  const toggleMobileNav = () => setHideMobileNav(prevState => !prevState);
  const closeMobileNav = () => setHideMobileNav(true);

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    history.push('/');
    setIntendedUrl(null);
  };

  return (
    <div className="w-full bg-black px-6 mx-auto flex items-center justify-between border-b-2 border-gray-200 border-opacity-25">
      <ul className="list-reset flex pt-4">
        <li className="px-2">
          <Link to=""
            className="no-underline text-white font-julius font-normal text-opacity-75"
          >
                        AJ’s Experience
          </Link>
        </li>
      </ul>

      <ul className="list-reset flex pt-4">
        <li
          className="px-4 py-2">
          <Link
            to="/user-approve"
            className="no-underline text-white font-julius font-normal text-opacity-75">
                        UserList</Link>
        </li>

        <li
          onClick={handleLogout}
          className="px-4 py-2">
          <Link
            to="/logout"
            className="no-underline text-white font-julius font-normal text-opacity-75">
                        Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
