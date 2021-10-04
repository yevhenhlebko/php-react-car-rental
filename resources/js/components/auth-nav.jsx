import React, { useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";

function AuthNav() {
  const history = useHistory();
  const { logout, isAdmin } = useAuth();
  const [hideMobileNav, setHideMobileNav] = useState(true);

  const toggleMobileNav = () => setHideMobileNav((prevState) => !prevState);
  const closeMobileNav = () => setHideMobileNav(true);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <div className="w-full bg-black px-2 sm:px-6 mx-auto flex items-center justify-between border-b-2 border-gray-200 border-opacity-25">
      <ul className="list-reset flex pt-4">
        <li className="px-2">
          <Link to="" className="no-underline text-white font-julius font-normal text-opacity-75">
            AJ’s Experience
          </Link>
        </li>
      </ul>

      <ul className="list-reset flex pt-4">
        {isAdmin && (
          <>
            <li className="px-4 py-2">
              <Link to="/slot-management" className="no-underline text-white font-julius font-normal text-opacity-75">
                Reservations
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/user-approve" className="no-underline text-white font-julius font-normal text-opacity-75">
                Users
              </Link>
            </li>
          </>
        )}

        <li onClick={handleLogout} className="px-4 py-2">
          <Link to="#" className="no-underline text-white font-julius font-normal text-opacity-75">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AuthNav;
