import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Flex
} from '@chakra-ui/react';
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from 'services/auth';
import { log } from 'helpers';
import AppContext from 'store/app';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});

export default function Login({ ...rest }) {
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const [isSending, setIsSending] = React.useState(false);
  const [state, dispatch] = React.useContext(AppContext);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const handleClick = () => setShow(!show);

  const onSubmit = values => {
    setIsSending(true);
    loginUser(values)
      .then(res => {
        setIsSending(false);
        dispatch({ ...state, isAuthenticated: true, user: res.user });
        window.location.reload();
      })
      .catch(error => {
        log(error?.message);
        log(error?.response?.data);
        setIsSending(false);
        toast({
          title: 'Error login user',
          description:
            error?.response?.data?.message?.split(':')[1] || 'Please contact the support or try another time',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      });
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" mt="10" w={[300, 400, 400]} {...rest}>
      <Heading mt={4} fontSize="xl">
        Let's sign you in.
      </Heading>
      <Text align="left" mb={4} mt={4}>
        Welcome back. <br />
        You've been missed!
      </Text>
      <form>
        <FormControl isInvalid={!!errors?.email} errortext={errors?.email?.message} pt="2" id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input name="email" ref={register} type="email" />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.password?.message}
          errortext={errors?.password?.message}
          pt="2"
          id="password"
          isRequired
        >
          <Flex justify="space-between">
            <FormLabel>Password</FormLabel>
            <Link to="/forgot-password/">
              <Text fontSize="14px" color="grey.50">
                Forgot password ?
              </Text>
            </Link>
          </Flex>

          <InputGroup size="md">
            <Input
              ref={register}
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              name="password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl paddingTop={3}>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!!errors.email || !!errors.password || !!errors.lastName || !!errors.firstName}
            width="100%"
            colorScheme="teal"
            isLoading={isSending}
          >
            Sign in
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
