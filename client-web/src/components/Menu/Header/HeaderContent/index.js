import {
  Avatar,
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  useUpdateEffect,
  useMediaQuery,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { privatesRoutes, publicsRoutes } from 'routes';
import { logoutUser } from 'services/auth';
import AppContext from 'store/app';
import Logo from '../../Logo';
import { MobileNavContent } from '../../Mobile';
import NavMenuMobile from '../../NavMenuMobile';
import LinksMenu from 'components/Menu/LinksMenu';

export default function HeaderContent() {
  const mobileNav = useDisclosure();
  const mobileNavBtnRef = React.useRef();
  const [{ user, isAuthenticated }] = React.useContext(AppContext);
  const history = useHistory();
  let location = useLocation();
  const [isLargerThan820] = useMediaQuery('(max-width:820px)');
  const bgContainer = useColorModeValue('gray.50', 'gray.700');

  useUpdateEffect(() => {
    mobileNavBtnRef?.current?.focus();
  }, [mobileNav.isOpen]);

  const logout = () => {
    logoutUser();
    window.location.reload();
  };

  const onPublish = () => {
    if (isAuthenticated) {
      history.push(privatesRoutes.publish.path);
    } else {
      history.push(publicsRoutes.login.path);
    }
  };

  return (
    <>
      <Flex width="100%" height="60px" align="center" justify="center">
        <Flex justify="space-between" maxWidth="1280px" pt="5" width="full">
          {isLargerThan820 ? <NavMenuMobile /> : ''}

          <Flex align="center">
            <chakra.a href="/" display="block" aria-label="Back to homepage">
              <Logo />
            </chakra.a>
          </Flex>

          {isLargerThan820 ? (
            ''
          ) : (
            <Flex maxW="40rem" w="100%" color="white" justify="center" alignItems="center">
              <LinksMenu />
            </Flex>
          )}

          {location.pathname === '/' && (
            <Button
              ml={['0', '0', '0', '5']}
              my={['5', '5', '5', '0']}
              colorScheme="red"
              size="lg"
              rounded="full"
              onClick={onPublish}
            >
              Publish
            </Button>
          )}

          <Flex justify="flex-end" align="center">
            {isAuthenticated && (
              <Menu>
                <MenuButton as={Avatar} src={user?.profileImage} cursor="pointer" size="sm" bg="teal.500"></MenuButton>
                <MenuList bg={bgContainer}>
                  <MenuGroup title={`${user?.firstName} ${user?.lastName}`}></MenuGroup>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
          <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
        </Flex>
      </Flex>
    </>
  );
}
