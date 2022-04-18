import React from 'react';
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
  DrawerFooter,
  DrawerOverlay
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Links from './Links';
import Logo from 'components/Menu/Logo';

export default function NavMenuMobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const btn_color = useColorModeValue('gray.700', 'gray.800');

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} bg={btn_color} _focus={{ outline: 'none' }}>
        <GiHamburgerMenu size={20} color="gray" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent color="white" bgGradient="linear(to-r, blue.900, black)">
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            <Links />
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
}
