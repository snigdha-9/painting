import { Heading } from '@chakra-ui/react';
import React from 'react';

const Logo = () => {
  return <Heading size="lg">{process.env.REACT_APP_NAME}</Heading>;
};

export default Logo;
