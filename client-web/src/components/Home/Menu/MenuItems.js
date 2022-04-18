import { chakra, Flex, Box } from '@chakra-ui/react';
import Logo from 'components/Menu/Logo';
import React from 'react';
import Links from './Links';
import NavMenuMobile from './NavMenuMobile';

export default function HeaderContent() {
  return (
    <>
      <Flex width="100%" height="60px" align="center" justify="center">
        <Flex justify="space-between" maxWidth="full" width="100%">
          <Flex align="center" color="white">
            <chakra.a href="/" display="block" aria-label="Back to homepage">
              <Logo />
            </chakra.a>
          </Flex>

          <Box display={['block', 'block', 'block', 'none']}>
            <NavMenuMobile />
          </Box>

          <Flex display={['none', 'none', 'none', 'flex']} color="white" justifyContent="flex-end" alignItems="center">
            <Links />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
