import React from 'react';
import './Navbar.css';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Signout } from '../../store/auth/auth.actions';

// import {  onAuthStateChanged } from 'firebase/auth';

// import { auth } from '../../firebase/firebase';

const links = ['features', 'download'];

const Links = ({ children }) => (
  <RouterLink
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('blue.400', 'blue.400'),
    }}
    to={`/${children}`}
  >
    <Text className="navbar_text">{children}</Text>
  </RouterLink>
);

const Navbar = () => {
  const token = useSelector((store) => store.auth.token);
  const gtoken = useSelector((store) => store.auth.gtoken);

  const name = useSelector((store) => store.auth.name);
  const pic = useSelector((store) => store.auth.pic);
  const name1 = useSelector((store) => store.auth.name1);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(false);

  // const [avatar, setAvatar] = useState('');
  // const [avatarName, setAvatarName] = useState('');
  // const [email, setEmail] = useState('');

  const [gtoken1, setGtoken] = useState(null);

  const dispatch = useDispatch();
  const toast = useToast();

  function logout() {
    // alert('logout');
    dispatch(Signout());
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    toast({
      title: 'Logout successfully 😊😊😊',
      description: 'Thankyou for using my our website  ',
      status: 'success',
      position: 'top',
      duration: 6000,
      isClosable: true,
    });
  }

  // onAuthStateChanged(auth, (currentUser) => {
  //    setEmail(currentUser.email);

  //   setAvatarName(currentUser.displayName);
  //   setAvatar(currentUser.photoURL);

  // });

  // let name = email.split('@');
  // name = name[0].toUpperCase();

  return (
    <div style={{ background: 'linear-gradient(#e8f5fd,#ffff)' }}>
      <Box py={[1, 3]} px={[null, 20]} mb={10}>
        <Flex h={[10, 16]} className="navbar_flex">
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} className="navbar_flex_button">
            <Box>
              <RouterLink to={'/'}>
                <Image src="https://clockify.me/assets/images/clockify-logo.svg"></Image>
              </RouterLink>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {links.map((el) => (
                <Links key={el}>{el}</Links>
              ))}
            </HStack>
          </HStack>
          <Flex className="navbar_flex_button">
            <Button
              variant={'ghosted'}
              colorScheme={'blue'}
              size={['xs', 'sm']}
              mr={4}
            >
              {token || gtoken ? (
                // Show logout button if token or gtoken exists
                <Text
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </Text>
              ) : (
                // Show login button if neither token nor gtoken exists
                <RouterLink to={'/login'}>
                  <Text>LOG IN</Text>
                </RouterLink>
              )}
            </Button>
            <Button
              // variant={'outline'}
              color={'blue.400'}
              borderColor={'blue.400'}
              borderRadius={'sm'}
              _hover={{ color: 'white', bg: 'blue.400' }}
              size={['xs', 'sm']}
              mr={4}
              px={7}
              py={5}
            >
              {token ? (
                // Show user name if token exists
                <Text colorScheme="black">{name1}</Text>
              ) : gtoken ? (
                // Show name and image if only gtoken exists
                <Flex align="center">
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    overflow="hidden"
                    mr={2}
                  >
                    <Image
                      src={pic}
                      alt={name}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                  <Text colorScheme="black" mr={2}>
                    {name}
                  </Text>
                </Flex>
              ) : (
                // Show sign up button if neither token nor gtoken exists
                <RouterLink to={'/signup'}>SIGN UP FREE</RouterLink>
              )}
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
                <Links key={link}>{link}</Links>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default Navbar;
