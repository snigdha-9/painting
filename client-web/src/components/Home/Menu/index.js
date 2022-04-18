import { chakra } from '@chakra-ui/react';
import React from 'react';
import MenuItems from './MenuItems';

export default function index() {
  return (
    <chakra.header transition="box-shadow 0.2s" pt="5" width="full">
      <MenuItems />
    </chakra.header>
  );
}
