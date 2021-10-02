import React, { useMemo, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { setIntendedUrl, getIntendedUrl } from "../utils/auth";
import { useAuth } from "../context/auth";
import AuthNav from "../components/auth-nav";
import useDocumentTitle from "../components/document-title";

function AuthRoute({ component: Component, title, ...rest }) {
  useDocumentTitle(title);
  const history = useHistory();
  const { authenticated, isInitialized, isAdmin } = useAuth();
  const intendedRoute = useMemo(() => getIntendedUrl(isAdmin), [isAdmin]);

  // useEffect(() => {
  //   if (isInitialized && history) {
  //     history.push(intendedRoute);
  //   }
  // }, [isInitialized, intendedRoute, history]);

  return (
    <Route
      {...rest}
      render={(props) => {
        // if (!isInitialized) {
        //   setIntendedUrl(props.location.pathname);
        //   return null;
        // }

        return authenticated ? (
          <div className="flex flex-col min-h-screen">
            <AuthNav />
            <div className="flex flex-1">
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        );
      }}
    />
  );
}

AuthRoute.displayName = "Auth Route";

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string,
};

export default AuthRoute;
