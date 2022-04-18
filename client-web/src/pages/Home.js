import React, { useEffect } from 'react';
import { Box, Container, Flex, Icon, Image } from '@chakra-ui/react';
import Header from 'components/Home/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaintings } from 'redux/actions/paintings';
import { FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share';

const PaintingCard = ({ painting }) => {
  return (
    <Box mb="4" shadow="md" borderWidth="1px" borderRadius="md">
      <Image boxSize="300px" src={painting.url} alt={painting.name} />
      <Flex justifyContent="center" py="2">
        <FacebookShareButton url={painting.url} quote={painting.name}>
          <Icon mx="2" w={8} h={8} as={FaFacebook} />
        </FacebookShareButton>
        <TwitterShareButton url={painting.url} title={painting.name}>
          <Icon mx="2" w={8} h={8} as={FaTwitter} />
        </TwitterShareButton>
        <PinterestShareButton media={painting.url} url={painting.url}>
          <Icon mx="2" w={8} h={8} as={FaPinterest} />
        </PinterestShareButton>
      </Flex>
    </Box>
  );
};

export default function Home() {
  const paintings = useSelector(state => state.Paintings.paintings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPaintings());
  }, [dispatch]);

  return (
    <Box w="100%" minH="100vh">
      <Container pt="20" maxW="1280">
        <Header />
        <Flex w="100%" justifyContent="space-between" flexWrap="wrap">
          {paintings.map(painting => (
            <PaintingCard key={painting.id} painting={painting} />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
