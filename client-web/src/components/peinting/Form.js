import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
  useToast,
  Image,
  VStack,
  FormErrorMessage
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatFile, log } from 'helpers';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { AiOutlinePicture } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addPainting, clearStore } from 'redux/actions/paintings';

const schema = yup.object().shape({
  description: yup.string().required(),
  name: yup.string().required()
});

export default function Form({ ...rest }) {
  const toast = useToast();
  const history = useHistory();
  const [images, setImages] = useState([]);
  const isFetching = useSelector(state => state.Paintings.isFetching);
  const error = useSelector(state => state.Paintings.error);
  const isSuccess = useSelector(state => state.Paintings.isSuccess);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onDrop = useCallback(acceptedFiles => {
    const uploadedFiles_ = acceptedFiles.map(formatFile);
    console.log(uploadedFiles_);
    setImages(uploadedFiles_);
  }, []);

  const onResult = useCallback(() => {
    if (!isFetching && error) {
      log(error?.message);
      log(error?.response?.data);
      toast({
        title: 'Error publishing painting',
        description: error?.response?.data?.message?.split(':')[1] || 'Please contact the support or try another time',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    } else if (!isFetching && isSuccess) {
      toast({
        title: 'Painting published.',
        description: "We've published your painting for you.",
        status: 'success',
        duration: 9000,
        isClosable: true
      });
      dispatch(clearStore());
      history.push('/');
    }
  }, [dispatch, error, history, isFetching, isSuccess, toast]);

  useEffect(() => {
    onResult();
  }, [onResult]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = values => {
    if (images.length === 0) {
      return toast({
        title: 'Painting Error.',
        description: 'You should add or drop one painting.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }

    dispatch(addPainting({ ...values, image: images[0] }));
  };

  return (
    <VStack p={5} justifyContent="center" borderRadius="md" mt="" {...rest}>
      <Heading w="100%" textAlign="left" mt={4} fontSize="2xl">
        Publish
      </Heading>
      <Text mb={4} mt={4}></Text>
      <Flex
        bg="gray.50"
        borderWidth="4px"
        justifyContent="center"
        alignItems="center"
        shadow="md"
        w="50rem"
        h="30rem"
        flexWrap="wrap"
        borderStyle="dotted"
        borderRadius="md"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drop one picture here</p>}
        <Icon mx="2" w={10} h={10} as={AiOutlinePicture} />
        {!!images.length && (
          <Flex mt="-60" justifyContent="center" alignItems="center" w="100%">
            <Image ml="5" w="200px" src={images[0].preview} />{' '}
          </Flex>
        )}
      </Flex>
      <Box justifyContent="center" w={[300, 400, 400]}>
        <form>
          <FormControl isInvalid={!!errors?.name} id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input ref={register} name="name" placeholder="name" />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.description} pt="2" id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input ref={register} name="description" placeholder="Description" />
            <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl paddingTop={3}>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={!!errors.name || !!errors.description}
              width="100%"
              rounded="full"
              colorScheme="red"
              isLoading={isFetching}
            >
              Publish
            </Button>
          </FormControl>

          <Box my="40"></Box>
        </form>
      </Box>
    </VStack>
  );
}
