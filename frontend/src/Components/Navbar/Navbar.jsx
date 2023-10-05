import React, { useState } from "react";
import { Link as Navlink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Input,
  Spacer,
  MenuDivider,
  VStack,
  Image,
} from "@chakra-ui/react";
import logoImg from "../../logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiFillGithub } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { BsBook, BsGlobe2 } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const navLinks = [
  { name: "About", to: "/About" },
  { name: "Documentation", to: "/Documentation" },
  // { name: "Features", to: "#" },
];

const dropdownLinks = [
  {
    name: "Trending Projects",
    to: "#",
    icon: MdTimeline,
  },
  {
    name: "Join Community",
    to: "#",
    icon: BsGlobe2,
  },
  {
    name: "Open Source",
    to: "#",
    icon: BsBook,
  },
];

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [changeMode, setChangeMode] = useState(true);

  const menuProps = {
    bg: useColorModeValue("gray.200", "gray.700"),
    color: useColorModeValue("blue.400", "blue.200"),
  };

  //   const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  //   };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  /* Login */
  const [loginData, setLoginData] = useState({
    useremail: "",
    password: "",
  });
  //login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData
      );
      const { success, message } = response.data;

      if (success) {
        console.log("Login Successful");
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error(`Error in logging ${error}`);
    }
    setLoginData({
      useremail: "",
      password: "",
    });
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      px={4}
      boxShadow="lg"
      width="100%"
      bg={useColorModeValue("gray.100", "gray.700")}
      top="0"
      position={"fixed"}
      zIndex={999}
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW={1000}
        mx="auto"
      >
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={["inherit", "inherit", "none"]}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          {/* <Avatar
            href="#"
            as={Link}
            size="sm"
            showBorder={true}
            borderColor="blue.400"
            rounded="full"
            src="https://avatars2.githubusercontent.com/u/37842853?v=4"
          /> */}
          <Link as={Navlink} to="/" w={{ base: "12rem", md: "18rem" }}>
            <Image
              alt="ReadMeMaker Logo"
              //   w={"80%"}
              //   h={14}
              src={logoImg}
              rounded={50}
            />
          </Link>
          <Input
            display={"block"}
            maxW="30rem"
            placeholder="Search Templates"
            borderColor={useColorModeValue("gray.300", "white")}
            borderRadius="5px"
            d={{ base: "none", md: "block" }}
          />
          <Spacer />
          <HStack
            as="nav"
            spacing={1}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} to={link.to} {...link} onClose={onClose} />
            ))}
            {/* Dropdown Menu */}
            <Menu autoSelect={false} isLazy>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="sm"
                    px={3}
                    py={1}
                    lineHeight="inherit"
                    fontSize="1em"
                    fontWeight="normal"
                    rounded="md"
                    height="auto"
                    _hover={{ color: "blue.400", bg: menuProps.bg }}
                  >
                    <Flex alignItems="center">
                      <Text>Links</Text>
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition="all .25s ease-in-out"
                        transform={isOpen ? "rotate(180deg)" : ""}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList
                    zIndex={5}
                    // bg={useColorModeValue(
                    //   "rgb(255, 255, 255)",
                    //   "rgb(26, 32, 44)"
                    // )}
                    border="none"
                  // boxShadow={useColorModeValue(
                  //   "2px 4px 6px 2px rgba(160, 174, 192, 0.6)",
                  //   "2px 4px 6px 2px rgba(9, 17, 28, 0.6)"
                  // )}
                  >
                    {dropdownLinks.map((link, index) => (
                      <MenuLink
                        key={index}
                        name={link.name}
                        path={link.path}
                        to={link.to}
                        icon={link.icon}
                        onClose={onClose}
                      />
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </HStack>
          <Menu isLazy isOpen={isUserMenuOpen} onClose={toggleUserMenu}>
            <MenuButton size="sm" onClick={toggleUserMenu}>
              <Avatar
                size="sm"
                src={
                  "https://media.images.yourquote.in/user/large/0/0/0/88/9aLa1749.jpg"
                }
              />
            </MenuButton>
            <MenuList
              zIndex={5}
              border="2px solid"
              borderColor={useColorModeValue("gray.700", "gray.100")}
              boxShadow="4px 4px 0"
            >
              <Link _hover={{ textDecoration: "none" }} isExternal>
                <MenuItem>
                  <VStack justify="start" alignItems="left">
                    <Text fontWeight="500">Rajiv Lochan Dash</Text>
                    <Text size="sm" color="gray.500" mt="0 !important">
                      @razzivofficial
                    </Text>
                  </VStack>
                </MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem>
                <Text fontWeight="500">Dashboard</Text>
              </MenuItem>
              <MenuItem>
                <Text fontWeight="500">Create Post</Text>
              </MenuItem>
              <MenuItem>
                <Text fontWeight="500">Bookmarks</Text>
              </MenuItem>
              <MenuItem>
                <Text fontWeight="500">Settings</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Text color={"red.600"} fontWeight="500">
                  Sign Out
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
        </HStack>
        <IconButton aria-label="Color Switcher" icon={<FiSun />} />
        <Button className="ml-6" colorScheme="blue" onClick={onOpen}>
          Signup
        </Button>
      </Flex>

      {/* Modal section starts */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          {changeMode ? (
            <>
              <ModalHeader textAlign={"center"}>
                Create your account
              </ModalHeader>
            </>
          ) : (
            <>
              <ModalHeader textAlign={"center"}>
                Log in into your account
              </ModalHeader>
            </>
          )}
          <ModalCloseButton />

          <ModalBody pb={6}>
            {!changeMode ? (
              <>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Email"
                    name="useremail"
                    focusBorderColor='green.400'
                    value={loginData.useremail}
                    onChange={handleLoginChange}
                    required
                  />
                </FormControl>
              </>
            ) : (

              <>
                <FormControl isRequired>
                  <FormLabel>Enter Your email</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Enter your email"
                    name="useremail"
                    value={loginData.useremail}
                    onChange={handleLoginChange}
                    required
                  />
                </FormControl>
              </>
            )}
            {changeMode ? (
              <>
                <FormControl mt={4} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl mt={4} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    focusBorderColor='green.400'
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </FormControl>
              </>
            )}
            {!changeMode ? (
              <>
                <Text
                  py={"4"}
                  color="gray.700"
                  textAlign="center"
                  justify="center"
                  cursor={"pointer"}
                  _hover={{ color: "gray.400" }}
                >
                  Forgot password?
                </Text>
              </>
            ) : (
              <>
                <Text
                  py={"4"}
                  color="gray.700"
                  textAlign="center"
                  justify="center"
                  cursor={"pointer"}
                  _hover={{ color: "gray.400" }}
                  display={"none"}
                >
                  Forgot password?
                </Text>
              </>
            )}

            <Flex alignItems={"center"} justify={"center"} my={"2"}>
              {!changeMode ? (
                <>
                  <Button
                    textAlign="center"
                    justify="center"
                    leftIcon={<FcGoogle />}
                  >
                    Log in with Google
                  </Button>
                </>
              ) : (
                <>
                  <Flex alignItems={"center"} justify={"center"} mt={"5"}>
                    <Button
                      textAlign="center"
                      justify="center"
                      leftIcon={<FcGoogle />}
                      onSubmit={handleLoginSubmit}
                    >
                      {/* {" "} */}
                      Sign up using Google
                    </Button>
                  </Flex>
                </>
              )}
            </Flex>
            <Flex alignItems={"center"} justify={"center"} my={"2"}>
              {!changeMode ? (
                <>
                  <Button
                    textAlign="center"
                    justify="center"
                    leftIcon={<AiFillGithub />}
                  >
                    Log in with Github
                  </Button>
                </>
              ) : (
                <>
                  <Flex alignItems={"center"} justify={"center"} mt={"5"}>
                    <Button
                      textAlign="center"
                      justify="center"
                      leftIcon={<AiFillGithub />}
                      onSubmit={handleLoginSubmit}
                    >
                      {/* {" "} */}
                      Sign up using Github
                    </Button>
                  </Flex>
                </>
              )}
            </Flex>
            <Flex justify={"center"} alignItems={"center"}>
              {changeMode ? (
                <Text
                  py={"3"}
                  color="gray.700"
                  textAlign="center"
                  justify="center"
                >
                  Already Registered?
                  <Button
                    color={"red.400"}
                    _hover={{ color: "red.700" }}
                    variant="none"
                    onClick={() => setChangeMode(!changeMode)}
                  >
                    Log in
                  </Button>
                </Text>
              ) : (
                <Text
                  py={"3"}
                  color="gray.700"
                  textAlign="center"
                  justify="center"
                >
                  Not yet Registered?
                  <Button
                    color={"red.400"}
                    _hover={{ color: "red.700" }}
                    variant="none"
                    onClick={() => setChangeMode(!changeMode)}
                  >
                    Sign up
                  </Button>
                </Text>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            {changeMode ? (
              <>
                <Button colorScheme="blue" mr={3}>
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" mr={3}>
                  Log In
                </Button>
              </>
            )}

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal section ends */}

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={["inherit", "inherit", "none"]}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

function NavLink({ name, path, to, onClose }) {
  const link = {
    bg: useColorModeValue("gray.200", "gray.700"),
    color: useColorModeValue("blue.500", "blue.200"),
  };

  return (
    <Link
      as={Navlink}
      to={to}
      px={3}
      py={1}
      lineHeight="inherit"
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: link.bg,
        color: link.color,
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
}

function MenuLink({ name, path, to, icon, onClose }) {
  return (
    <Link href={path} as={Navlink}
      to={to} onClick={() => onClose()}>
      <MenuItem
        _hover={{
          color: "blue.400",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        <HStack>
          <Icon as={icon} size={18} color="blue.400" />
          <Text>{name}</Text>
        </HStack>
      </MenuItem>
    </Link>
  );
}

export default Navbar;
