import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from 'services/auth';
import { log } from 'helpers';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

export default function Register({ ...rest }) {
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const [isSending, setIsSending] = React.useState(false);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const handleClick = () => setShow(!show);

  const onSubmit = values => {
    setIsSending(true);
    registerUser(values)
      .then(() => {
        setIsSending(false);
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        history.push('/login');
      })
      .catch(error => {
        log(error?.message);
        log(error?.response?.data);
        setIsSending(false);
        toast({
          title: 'Error creating your account',
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
        Thank you for trying {process.env.REACT_APP_NAME}!
      </Heading>

      <form>
        <FormControl isInvalid={!!errors?.firstName} errortext={errors?.firstName?.message} id="first-name" isRequired>
          <FormLabel>First name</FormLabel>
          <Input ref={register} name="firstName" placeholder="First name" />
        </FormControl>

        <FormControl
          isInvalid={!!errors?.lastName}
          errortext={errors?.lastName?.message}
          pt="2"
          id="last-name"
          isRequired
        >
          <FormLabel>Last name</FormLabel>
          <Input ref={register} name="lastName" placeholder="Last name" />
        </FormControl>

        <FormControl isInvalid={!!errors?.email} errortext={errors?.email?.message} pt="2" id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input name="email" ref={register} type="email" />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl
          isInvalid={!!errors?.password?.message}
          errortext={errors?.password?.message}
          pt="2"
          id="password"
          isRequired
        >
          <FormLabel>Password</FormLabel>
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
            Create account
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
