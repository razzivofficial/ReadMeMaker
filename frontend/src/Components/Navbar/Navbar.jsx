import React, { useState, useEffect } from "react";
import { Link as Navlink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import logoImg from "../../MediaFiles/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiFillGithub } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { BsBook, BsGlobe2 } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
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
  useColorMode,
} from "@chakra-ui/react";

import avatar1 from "../../MediaFiles/avatar1.jpg";
import avatar2 from "../../MediaFiles/avatar2.jpg";
import avatar3 from "../../MediaFiles/avatar3.jpg";
import avatar4 from "../../MediaFiles/avatar4.jpg";
import avatar5 from "../../MediaFiles/avatar5.jpg";
import avatar6 from "../../MediaFiles/avatar6.jpg";
import avatar7 from "../../MediaFiles/avatar7.jpg";
import avatar8 from "../../MediaFiles/avatar8.jpg";

const navLinks = [
  { name: "About", to: "/about" },
  { name: "Documentation", to: "/documentation" },
  // { name: "Features", to: "#" },
];

const dropdownLinks = [
  {
    name: "Trending Projects",
    to: "/projectsreadmemaker",
    icon: MdTimeline,
  },
  {
    name: "Join Community",
    to: "/commreadmemaker",
    icon: BsGlobe2,
  },
  {
    name: "Open Source",
    to: "/opensourcereadmemaker",
    icon: BsBook,
  },
];

function Navbar() {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
  ];
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  useEffect(() => {
    // Close the navbar menu when location changes (for mobile view)
    if (isNavbarOpen) {
      setIsNavbarOpen(false);
    }
  }, [location]); // 'location' needs to be included in dependencies

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        toast({
          title: "Error",
          description: "Email not found. Please log in again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        console.log(email);
        const response = await fetch(
          "https://readmemaker-backend.vercel.app/users/getavatar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          const avatarIndex = parseInt(data.avatar.replace("avatar", "")) - 1;
          setSelectedAvatar(avatars[avatarIndex]);
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch avatar.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUserAvatar();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
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

  const email = localStorage.getItem("userEmail");
  const [name, setName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios
        .get(
          `https://readmemaker-backend.vercel.app/users/getNameByEmail/${email}`
        )
        .then((response) => {
          setName(response.data.name);
        })
        .catch((error) => {
          console.error("There was an error fetching the name!", error);
        });
    }
  }, []);

  /* Login */

  const [logincredentials, setloginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleloginSubmit = async (e) => {
    e.preventDefault();
    setloginCredentials({ email: "", password: "" });

    const response = await fetch(
      "https://readmemaker-backend.vercel.app/users/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: logincredentials.email,
          password: logincredentials.password,
        }),
      }
    );
    const json = await response.json();

    if (!json.success) {
      toast.error("Enter valid credentials");
    } else {
      toast.success("Login successful");
      onClose();
      localStorage.setItem("userEmail", logincredentials.email);
      localStorage.setItem("authToken", json.authToken);
      const email = localStorage.getItem("userEmail");
      if (email) {
        axios
          .get(
            `https://readmemaker-backend.vercel.app/users/getNameByEmail/${email}`
          )
          .then((response) => {
            setName(response.data.name);
          })
          .catch((error) => {
            console.error("There was an error fetching the name!", error);
          });
      }
    }
  };

  const handleChange = (event) => {
    setloginCredentials({
      ...logincredentials,
      [event.target.id]: event.target.value,
    });
  };

  /* Signup */
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleregistration = async (e) => {
    e.preventDefault();
    setcredentials({ name: "", email: "", password: "" });
    const response = await fetch(
      "https://readmemaker-backend.vercel.app/users/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json.message);
    if (json.message !== "success") {
      toast.error("Registration failed: " + json.error);
    } else {
      toast.success("Registration successful");
      localStorage.setItem("name", credentials.name);
      onClose();
    }
  };
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.id]: event.target.value });
  };

  // const [email, setEmail] = useState('');

  // useEffect(() => {
  //   const storedEmail = localStorage.getItem('userEmail');
  //   if (storedEmail) {
  //     setEmail(storedEmail);
  //   }
  // }, []);

  const handleLogout = () => {
    toast.success("Logout successful");
    localStorage.removeItem("authToken");
    navigate("/");
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
          icon={isNavbarOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={["inherit", "inherit", "none"]}
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        />
        <HStack spacing={8} alignItems="center">
          <Link as={Navlink} to="/" w={{ base: "12rem", md: "18rem" }}>
            <Image alt="ReadMeMaker Logo" src={logoImg} rounded={50} />
          </Link>
          <Input
            display={"block"}
            maxW="30rem"
            placeholder="Search for Users, Templates, or Components"
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
          {/* Menu rajiv */}
          {localStorage.getItem("authToken") && (
            <Menu isLazy isOpen={isUserMenuOpen} onClose={toggleUserMenu}>
              <MenuButton size="sm" onClick={toggleUserMenu}>
                <Avatar size="sm" name={name} src={selectedAvatar} />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                // borderColor={useColorModeValue("gray.700", "gray.100")}
                boxShadow="4px 4px 0"
              >
                <Link _hover={{ textDecoration: "none" }} isExternal>
                  <MenuItem>
                    <VStack justify="start" alignItems="left">
                      <Text fontWeight="500">{name}</Text>
                    </VStack>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem as={Navlink} to={`/profile/${email}`}>
                  <Text fontWeight="500">Profile</Text>
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
                  <Button
                    color={"red.600"}
                    fontWeight="500"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          )}

          <Spacer />
        </HStack>
        <IconButton
          aria-label="Color Switcher"
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
        />

        {!localStorage.getItem("authToken") && (
          <Button className="ml-6" colorScheme="blue" onClick={onOpen}>
            Signup
          </Button>
        )}
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
                    focusBorderColor="green.400"
                    id="email"
                    value={logincredentials.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl isRequired>
                  <FormLabel>Enter Your name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Enter your name"
                    name="name"
                    id="name"
                    value={credentials.name}
                    onChange={onchange}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Enter Your email</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    value={credentials.email}
                    onChange={onchange}
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
                    id="password"
                    value={credentials.password}
                    onChange={onchange}
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
                    id="password"
                    focusBorderColor="green.400"
                    value={logincredentials.password}
                    onChange={handleChange}
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
                <Button colorScheme="blue" mr={3} onClick={handleregistration}>
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" mr={3} onClick={handleloginSubmit}>
                  Log In
                </Button>
              </>
            )}

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isOpen ? (
        <Box pb={4} display={["inherit", "inherit", "none"]}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                {...link}
                onClose={isNavbarOpen ? onClose : undefined}
              />
            ))}
          </Stack>
        </Box>
      ) : null}

      {isNavbarOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                {...link}
                onClose={() => setIsNavbarOpen(false)}
              />
            ))}
            {!localStorage.getItem("authToken") ? (
              <Button colorScheme="blue" onClick={onOpen}>
                Signup
              </Button>
            ) : (
              <Menu isLazy isOpen={isUserMenuOpen} onClose={toggleUserMenu}>
                <MenuButton size="sm" onClick={toggleUserMenu}>
                  <Avatar size="sm" src={selectedAvatar} />
                </MenuButton>
              </Menu>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function NavLink({ name, to, onClose }) {
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
      onClick={onClose}
    >
      {name}
    </Link>
  );
}

function MenuLink({ name, to, icon, onClose }) {
  return (
    <Link as={Navlink} to={to} onClick={onClose}>
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
