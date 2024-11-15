import React from 'react';
import { Flex, Image, Spinner } from '@chakra-ui/react';

const GlobalLoader = () => {
  return (
    <Flex
      justify="center"
      align="center"
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      zIndex="1000"
    >
      <Flex direction="column" align="center">
        <Image
          src="https://clockify.me/assets/images/clockify-logo.svg"
          alt="Clockify Logo"
          boxSize="100px"
          mb="4"
        />
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    </Flex>
  );
};

export default GlobalLoader;
