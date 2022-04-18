import { Box, Container, Flex, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';

export default function Layout({ children }) {
  return (
    <Box pt="20" textAlign="center" fontSize="xl">
      <Flex direction="column" p={3}>
        <VStack divider={<StackDivider borderColor="white" />} spacing={4} align="stretch">
          <Container maxW="6xl" centerContent>
            {children}
          </Container>
        </VStack>
      </Flex>
    </Box>
  );
}
