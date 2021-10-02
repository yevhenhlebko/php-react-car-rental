import React, { useMemo, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { setIntendedUrl, getIntendedUrl } from "../utils/auth";
import { useAuth } from "../context/auth";
import AuthNav from "../components/auth-nav";
import useDocumentTitle from "../components/document-title";

function AdminRoute({ component: Component, title, ...rest }) {
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
        // } else {
        if (authenticated) {
          if (isAdmin) {
            return (
              <div className="flex flex-col min-h-screen">
                <AuthNav />
                <Component {...props} />
              </div>
            );
          }
          return <Redirect to={{ pathname: "/date-select", state: { from: props.location } }} />;
        }
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        //}
      }}
    />
  );
}

AdminRoute.displayName = "Admin Route";

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string,
};

export default AdminRoute;
