import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/auth";
import useDocumentTitle from "../components/document-title";

function GuestRoute({ component: Component, title, ...rest }) {
  useDocumentTitle(title);

  const { authenticated, isInitialized, isVerified, isAdmin } = useAuth();

  if (!isInitialized) return null;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) {
          if (isAdmin) {
            return <Redirect to={{ pathname: "/slot-management", state: { from: props.location } }} />;
          } else if (isVerified) {
            return <Redirect to={{ pathname: "/date-select", state: { from: props.location } }} />;
          }
        }
        return <Component {...props} />;
      }}
    />
  );
}

GuestRoute.displayName = "Guest Route";

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string,
};

export default GuestRoute;
