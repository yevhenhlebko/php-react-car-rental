import React, { useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import { getToken, setToken } from '../utils/auth';
import {getUser} from '../api/auth';

const AuthContext = React.createContext();

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

function AuthProvider ({ children }) {
  const [initializing, setInitializing] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [userAdmin, setUserAdmin] = useState(null);
  const authenticated = useMemo(() => !!currentUser, [currentUser]);
  const authAdmin = useMemo(() => !!userAdmin, [userAdmin]);

  const initAuth = () => {
    return getToken()
      ? getUser()
      : Promise.resolve(null);
  };

  const initAuthAdmin = () => {
    initAuth().then((user) => {
      if (user != null) {
        if (user.user_type == 'Administrator') {
          setUserAdmin(true);
        } else { setUserAdmin(false); }
      } else { setUserAdmin(false); }
      setCurrentUser(user);
    });
  };

  useEffect(() => {
    initAuth().then((user) => {
      if (user != null) {
        if (user.user_type == 'Administrator') {
          setUserAdmin(user.user_type);
        }
      }
      setCurrentUser(user);
    });
  }, [initializing]);

  return (
    <AuthContext.Provider value={{
      initializing,
      authenticated,
      authAdmin,
      userAdmin,
      currentUser,
      initAuthAdmin,
      setInitializing,
      setToken,
      setCurrentUser }
    }> { children }
    </AuthContext.Provider>
  );
}

function useAuth () {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

export { AuthProvider, useAuth };
