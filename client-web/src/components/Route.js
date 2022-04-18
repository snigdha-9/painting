import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import AppContext from 'store/app';

export const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const [{ isAuthenticated }] = React.useContext(AppContext);

  const render = props =>
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: path }
        }}
      />
    );

  return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};

export const PublicRoute = ({ component: Component, path, auth, ...rest }) => {
  const [{ isAuthenticated }] = React.useContext(AppContext);

  const render = props =>
    isAuthenticated && auth ? (
      <Redirect
        to={{
          pathname: '/',
          state: { from: path }
        }}
      />
    ) : (
      <Component {...props} />
    );

  return <Route path={path} render={render} {...rest} />;
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};
