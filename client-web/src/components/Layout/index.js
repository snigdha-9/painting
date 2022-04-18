import { Flex, Box } from '@chakra-ui/react';
import React from 'react';

export default function Layout({
  textColor = 'black',
  bg,
  children,
  marginTopLayout = '150px',
  marginBottomLayout = '6'
}) {
  return (
    <>
      <Flex bg={bg} minHeight="100vh" w="100%" flexDirection="column" alignItems="center" color={textColor}>
        <Box maxW="1280px" w="100%" mb={marginBottomLayout} px={50} mt={marginTopLayout}>
          {children}
        </Box>
      </Flex>
    </>
  );
}
