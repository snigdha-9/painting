import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Divider, Text } from '@chakra-ui/react';
import { publicsRoutes } from 'routes';

export default function Links() {
  const history = useHistory();
  const renderDivider = <Divider display={['block', 'block', 'block', 'none']} my="2" />;

  return (
    <>
      <Link to="#">
        <Text mx="5">Why us ?</Text>
      </Link>
      {renderDivider}
      <Link to="#">
        <Text mx="5">Features</Text>
      </Link>
      {renderDivider}
      <Link to="#">
        <Text mx="5">Pricing</Text>
      </Link>
      {renderDivider}
      <Link to="#">
        <Text mx="5">Docs</Text>
      </Link>
      {renderDivider}
      <Link to="#">
        <Text mx="5">Blog</Text>
      </Link>
      {renderDivider}
      <Link to={publicsRoutes.login.path}>
        <Text mx="5">Sign in</Text>
      </Link>

      <Button
        w={['100%', '100%', '100%', 'auto']}
        ml={['0', '0', '0', '5']}
        my={['5', '5', '5', '0']}
        color="black"
        onClick={() => history.push(publicsRoutes.register.path)}
      >
        Get Started
      </Button>
    </>
  );
}
