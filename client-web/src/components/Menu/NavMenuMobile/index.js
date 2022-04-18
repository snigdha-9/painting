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
  DrawerOverlay,
  Text
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import LinksMenu from '../LinksMenu';

export default function NavMenuMobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const btn_color = useColorModeValue('gray.700', 'gray.800');
  const bg = useColorModeValue('gray.900', 'gray.700');
  const textColor = useColorModeValue('gray.100', 'gray.100');

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} bg={btn_color} _focus={{ outline: 'none' }}>
        <GiHamburgerMenu size={20} color="gray" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton color={textColor} />
          <DrawerHeader>
            <Text color={textColor}>IntergroData</Text>
          </DrawerHeader>
          <DrawerBody>
            <LinksMenu onClose={onClose} />
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
}
