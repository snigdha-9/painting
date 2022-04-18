import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './Home';
import { privatesRoutes, publicsRoutes } from 'routes';
import Menu from 'components/Menu';
import RegisterPage from './Register';
import { PrivateRoute, PublicRoute } from 'components/Route';
import Login from './Login';
import Publish from './Publish';

export default function Main() {
  const pages = {
    home: Home,
    register: RegisterPage,
    login: Login,
    publish: Publish
  };
  return (
    <>
      <Box display={['none', 'none', 'none', 'block']}>
        <Menu />
        <Switch>
          {Object.keys(publicsRoutes).map(key => (
            <PublicRoute
              key={key}
              auth={publicsRoutes[key].auth}
              path={publicsRoutes[key].path}
              exact={publicsRoutes[key].exact}
              component={pages[publicsRoutes[key].component]}
            />
          ))}

          {Object.keys(privatesRoutes).map(key => (
            <PrivateRoute
              key={key}
              path={privatesRoutes[key].path}
              exact={privatesRoutes[key].exact}
              component={pages[privatesRoutes[key].component]}
            />
          ))}

          <Redirect to="/" />
        </Switch>
      </Box>
      <Box
        w="100vw"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        color="red"
        display={['flex', 'block', 'block', 'none']}
      >
        <h1>Mobile application is in development</h1>
      </Box>
    </>
  );
}
