import React from 'react';
import { Box, VStack, Flex, Text } from '@chakra-ui/react';
import LoginComponent from 'components/Login';
import { Link } from 'react-router-dom';
import { publicsRoutes } from 'routes';

export default function Login() {
  return (
    <Box p="20" textAlign="center" fontSize="xl">
      <Flex direction="column" minH="100vh" p={3}>
        <VStack spacing={2}>
          <LoginComponent />
          <Box pt="5">
            <Text fontSize="sm">
              Don't have an account?
              <Text color="gray.500" ml="1" as="span" className="blue.500">
                <Link to={publicsRoutes.register.path}>Register</Link>
              </Text>
            </Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
