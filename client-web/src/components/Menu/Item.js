import { Flex, Link } from '@chakra-ui/react';
import React from 'react';

export default function Item({ text }) {
  return (
    <Flex pl={['0', '0', '1rem', '1rem']} align="center">
      <Link>{text}</Link>
    </Flex>
  );
}
