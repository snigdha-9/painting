import React from 'react';
import { Box, VStack, Flex, Text } from '@chakra-ui/react';
import Register from 'components/Register';
import { Link } from 'react-router-dom';
import { publicsRoutes } from 'routes';

export default function RegisterPage() {
  return (
    <Box p="20" textAlign="center" fontSize="xl">
      <Flex direction="column" minH="100vh" p={3}>
        <VStack spacing={2}>
          <Register />
        </VStack>
        <Box pt="5">
          <Text fontSize="sm">
            Already have an account?
            <Text color="gray.500" ml="1" as="span" className="blue.500">
              <Link to={publicsRoutes.login.path}>Log in</Link>
            </Text>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
