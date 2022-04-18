import { Box, Container } from '@chakra-ui/react';
import React from 'react';

export default function index() {
  return (
    <Box h="60px" mt="10" w="100%">
      <Container color="white" maxW="1280">
        Copyright © {new Date().getFullYear()} {process.env.REACT_APP_NAME} Inc. All rights reserved.
      </Container>
    </Box>
  );
}
