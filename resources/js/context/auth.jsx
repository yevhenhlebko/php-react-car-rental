import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { getToken, setToken, getIntendedUrl } from "../utils/auth";
import { getUser, login as loginAPI } from "../api/auth";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function AuthProvider({ children }) {
  const history = useHistory();
  const [isInitialized, setIsInitialized] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const authenticated = useMemo(() => !!currentUser, [currentUser]);

  const initAuth = () => (getToken() ? getUser() : Promise.resolve(null));

  const checkAuth = useCallback(() => {
    setIsInitialized(false);

    return initAuth()
      .then((user) => {
        if (user != null) {
          setIsAdmin(user.user_type == "Administrator");
        }
        setCurrentUser(user);
      })
      .finally(() => setIsInitialized(true));
  });

  const login = useCallback(
    ({ email, password }) => {
      return loginAPI({
        email,
        password,
      })
        .then(({ user, token }) => {
          if (user != null) {
            setIsAdmin(user.user_type == "Administrator");
          }
          setCurrentUser(user);
          setToken(token);
          return true;
          //return getIntendedUrl(user.user_type == "Administrator");
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    },
    [loginAPI, setCurrentUser, setIsAdmin, setToken, getIntendedUrl, history],
  );

  const logout = useCallback(() => {
    setIsAdmin(false);
    setCurrentUser(null);
    setToken(null);
  }, [setIsAdmin, setCurrentUser, setToken]);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        isAdmin,
        currentUser,
        isInitialized,
        login,
        logout,
        setToken,
        setCurrentUser,
        checkAuth,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

export { AuthProvider, useAuth };
