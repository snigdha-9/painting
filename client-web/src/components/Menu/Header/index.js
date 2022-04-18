import { chakra } from '@chakra-ui/react';
import React from 'react';
import HeaderContent from './HeaderContent';

function Header(props) {
  const ref = React.useRef();

  return (
    <chakra.header
      ref={ref}
      bg="white"
      transition="box-shadow 0.2s"
      top="0"
      zIndex="999"
      left="0"
      right="0"
      width="full"
      {...props}
      position="fixed"
      mx="auto"
    >
      <chakra.div height="4.5rem" mx="auto" transition="all 0.4s ">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  );
}

export default Header;
