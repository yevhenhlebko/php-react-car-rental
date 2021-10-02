import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { setIntendedUrl } from '../utils/auth';
import PropTypes from 'prop-types';
import { useAuth } from '../context/auth';
import AuthNav from '../components/auth-nav';
import useDocumentTitle from '../components/document-title';

function AdminRoute ({ component: Component, title, ...rest }) {
  useDocumentTitle(title);
  let {authenticated} = useAuth();
  let {userAdmin} = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        if (!authenticated || !userAdmin) {
          setIntendedUrl(props.location.pathname);
        }
        if (authenticated) {
          if (userAdmin) {
            return (
              <div className="flex flex-col min-h-screen">
                <AuthNav />
                <Component {...props} />
              </div>
            );
          } else {
            return (<Redirect to={{ pathname: '/date-select', state: { from: props.location } }} />);
          }
        } else { return (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />); }
      }
      }
    />
  );
};

AdminRoute.displayName = 'Admin Route';

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
  title: PropTypes.string
};

export default AdminRoute;
