import React, { useState, useEffect } from "react";
import { Link as Navlink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { encodeEmail } from "../../utils/emailUtils";
import { signInWithGoogle } from "../../firebase.js";
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
  Spinner,
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
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
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
    to: "/templatecompo",
    icon: MdTimeline,
  },
  {
    name: "Join Community",
    to: "https://t.me/readmemaker",
    icon: BsGlobe2,
  },
  {
    name: "Open Source",
    to: "https://github.com/razzivofficial/ReadMeMaker",
    icon: BsBook,
  },
];


function Navbar() {
  const API_URL = process.env.REACT_APP_BACKEND_API;
  const [isLoading, setIsLoading] = useState(false);
  const inputBg = useColorModeValue("white", "gray.700");
  const inputColor = useColorModeValue("black", "white");
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
        // console.log(email);
        const response = await fetch(`${API_URL}/users/getavatar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

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
        .get(`${API_URL}/users/getNameByEmail/${email}`)
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
    setIsLoading(true);
    const response = await fetch(`${API_URL}/users/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logincredentials.email,
        password: logincredentials.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      toast.error("Enter valid credentials:" + json.error);
      setIsLoading(false);
    } else {
      toast.success("Login successful");
      onClose();
      setIsLoading(false);
      localStorage.setItem("userEmail", logincredentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userId", json.userId);
      if (window.location.pathname === "/editor") {
        window.location.reload();
      }

      const email = localStorage.getItem("userEmail");
      if (email) {
        axios
          .get(`${API_URL}/users/getNameByEmail/${email}`)
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
    username: "",
    email: "",
    password: "",
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const handleregistration = async (e) => {
    e.preventDefault();
    setcredentials({ username: "", email: "", password: "" });
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      setIsLoading(true);
      if (user.email === credentials.email) {
        const response = await fetch(`${API_URL}/users/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const json = await response.json();
        if (json.message !== "success") {
          toast.error("Registration failed: " + json.error);
          setIsLoading(false);
        } else if (json.error) {
          toast.error(json.error);
          setIsLoading(false);
        } else {
          toast.success("Registration successful");
          const reslog = await fetch(`${API_URL}/users/loginuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const js = await reslog.json();
          if (js.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", js.authToken);
            localStorage.setItem("userId", js.userId);
            setIsLoading(false);
            if (window.location.pathname === "/editor") {
              window.location.reload();
            }
          }
          onClose();
        }
      } else {
        toast.error("Registration Failed try with same gmail");
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      console.error("An error occurred while registering!", error);
      setIsLoading(false);
    }
  };
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.id]: event.target.value });
    if (event.target.id === "username") {
      checkUsernameAvailability(event.target.value);
    }
  };

  const isValidUsername = (username) => {
    // Define your username format rules here
    // Example: username should be 3-20 characters long and contain only letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]{1,20}$/;
    return usernameRegex.test(username);
  };

  const checkUsernameAvailability = async (username) => {
    if (username.length > 0) {
      // Check if the username format is valid
      if (!isValidUsername(username)) {
        setIsUsernameAvailable(null);
        toast.error("Invalid username format.");
        return;
      }

      setIsCheckingUsername(true);
      try {
        const response = await fetch(
          `${API_URL}/users/checkusername/${username}`
        );
        const json = await response.json();
        setIsUsernameAvailable(json.available);
      } catch (error) {
        setIsUsernameAvailable(null);
        toast.error("Error checking username availability.");
      }
      setIsCheckingUsername(false);
    } else {
      setIsUsernameAvailable(null);
    }
  };
  const generateUsername = (name) => {
    return name.toLowerCase().replace(/\s+/g, "") + Date.now();
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      // console.log(user)
      // Check if the user already exists in MongoDB
      setIsLoading(true);
      const checkUserResponse = await fetch(
        `${API_URL}/users/getdetailbyemail/${user.email}`
      );
      const checkUserJson = await checkUserResponse.json();
      // console.log(checkUserJson)
      if (checkUserJson.error === "User not found") {
        // If the user does not exist, register the user
        // console.log("Register start ")
        const registrationResponse = await fetch(
          `${API_URL}/users/createuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: generateUsername(user.displayName),
              email: user.email,
              password: process.env.REACT_APP_PASS, // Default password
              isgoogle: true,
            }),
          }
        );

        const registrationJson = await registrationResponse.json();

        if (registrationJson.message === "success") {
          toast.success("Registration successful");
          // setIsLoading(false);
          // Automatically log the user in after registration
          const loginResponse = await fetch(`${API_URL}/users/loginusergoogle`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              password: process.env.REACT_APP_PASS, // Use the same default password for login
            }),
          });

          const loginJson = await loginResponse.json();
          if (loginJson.success) {
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("authToken", loginJson.authToken);
            localStorage.setItem("userId", loginJson.userId);

            toast.success("Logged in with Google");
            setIsLoading(false);
            if (window.location.pathname === "/editor") {
              window.location.reload();
            }
            onClose();
          }
        } else {
          toast.error("Registration failed: " + registrationJson.error);
          setIsLoading(false);
        }
      } else {
        // If the user already exists, log them in
        const loginResponse = await fetch(`${API_URL}/users/loginusergoogle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: process.env.REACT_APP_PASS, // Default password
          }),
        });

        const loginJson = await loginResponse.json();

        if (loginJson.success) {
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("authToken", loginJson.authToken);
          localStorage.setItem("userId", loginJson.userId);

          toast.success("Logged in with Google");
          if (window.location.pathname === "/editor") {
            window.location.reload();
          }
          setIsLoading(false);
          onClose();
        } else {
          setIsLoading(false);
          toast.error("Login failed: " + loginJson.error);
        }
      }
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  // const [email, setEmail] = useState('');

  // useEffect(() => {
  //   const storedEmail = localStorage.getItem('userEmail');
  //   if (storedEmail) {
  //     setEmail(storedEmail);
  //   }
  // }, []);
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  const isPasswordValid = passwordRegex.test(credentials.password);
  const handleLogout = () => {
    toast.success("Logout successful");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const hashedmail = encodeEmail(email);

  const colorbackgroundcolor = useColorModeValue("gray.300", "white");



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
        <HStack spacing={4} alignItems="center">
          <Link as={Navlink} to="/" w={{ base: "12rem", md: "14rem" }}>
            <Image
              alt="ReadMeMaker Logo"
              src={logoImg}
              rounded={50}
              width="92px"
              height="71px"
            />

          </Link>
          {localStorage.getItem('authToken') && (
            <Input
              display={"block"}
              maxW="30rem"
              placeholder="Search for Users, Templates, or Components"
              borderColor={colorbackgroundcolor}
              borderRadius="5px"
              d={{ base: "none", md: "block" }}
            />
          )}

          <Spacer />
          <IconButton
            aria-label="Color Switcher"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            display={{ base: "inline-flex", md: "none" }}
          />
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
          {/* In Mobile Screen */}
          {localStorage.getItem("authToken") && (
            <Menu isLazy isOpen={isUserMenuOpen} onClose={toggleUserMenu}>
              <MenuButton
                size="sm"
                onClick={toggleUserMenu}
                display={{ base: "none", md: "inline-flex" }}
              >
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
                <MenuItem as={Navlink} to={`/profile/${hashedmail}`}>
                  <Text fontWeight="500">Profile</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500" as={Navlink} to="/editor">
                    Create Post
                  </Text>
                </MenuItem>
                {/* <MenuItem>
                  <Text fontWeight="500">Bookmarks</Text>
                </MenuItem> */}
                <MenuItem>
                  <Text fontWeight="500" as={Navlink} to={`/profile/${email}`}>
                    My Projects
                  </Text>
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
          display={{ base: "none", md: "inline-flex" }}
        />

        {!localStorage.getItem("authToken") && (
          <Button
            className="ml-6"
            colorScheme="blue"
            onClick={onOpen}
            display={{ base: "none", md: "inline-flex" }}
          >
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
            {isLoading && (
              <Flex justify="center" align="center" py={4}>
                <Spinner size="lg" />
              </Flex>
            )}
            {!isLoading && (
              <>
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
                  <FormLabel>Enter Your Username</FormLabel>
                  <Input
                    placeholder="Enter your username"
                    id="username"
                    value={credentials.username}
                    onChange={onchange}
                    required
                    bg={inputBg}
                    color={inputColor}
                  />
                  {isCheckingUsername && <Spinner size="sm" mt={2} />}
                  {isUsernameAvailable !== null && (
                    <Text
                      mt={2}
                      color={isUsernameAvailable ? "green.500" : "red.500"}
                    >
                      {isUsernameAvailable ? (
                        <>
                          Username is available{" "}
                          <CheckCircleIcon color="green.500" />
                        </>
                      ) : (
                        "Username is taken"
                      )}
                    </Text>
                  )}
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
                    bg={inputBg}
                    color={inputColor}
                  />
                  {credentials.password && (
                    <Text
                      mt={2}
                      color={isPasswordValid ? "green.500" : "red.500"}
                      fontSize="sm"
                    >
                      {isPasswordValid ? (
                        <>
                          Password is strong{" "}
                          <CheckCircleIcon color="green.500" />
                        </>
                      ) : (
                        <>
                          Password must be at least 8 characters long, contain
                          at least one number, and one special character
                          <WarningIcon color="red.500" ml={2} />
                        </>
                      )}
                    </Text>
                  )}
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
                  color={colorMode === "dark" ? "white" : "gray.700"}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{
                    color: colorMode === "dark" ? "gray.300" : "gray.500",
                  }}
                  justify="center"
                >
                  Forgot password?
                </Text>
              </>
            ) : (
              <>
                {/* <Text
                  py={"4"}
                  color={colorMode === "dark" ? "white" : "gray.700"}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{
                    color: colorMode === "dark" ? "gray.300" : "gray.500",
                  }}
                  justify="center"
                >
                  Forgot password?
                </Text> */}
              </>
            )}

            {!changeMode ? (
              <Flex alignItems={"center"} justify={"center"} my={"2"}>
                <Button
                  mt={4}
                  leftIcon={<FcGoogle />}
                  size="md"
                  width="full"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  Continue with Google
                </Button>
              </Flex>
            ) : (
              <Flex alignItems={"center"} justify={"center"} my={"2"}>
                <Button
                  mt={4}
                  leftIcon={<FcGoogle />}
                  size="md"
                  width="full"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  Continue with Google
                </Button>
              </Flex>
            )}
            <Flex justify={"center"} alignItems={"center"}>
              {changeMode ? (
                <Text
                  py={"3"}
                  color={colorMode === "dark" ? "white" : "gray.700"}
                  textAlign="center"
                  justify="center"
                >
                  Already Registered?
                  <Button
                    color={colorMode === "dark" ? "white" : "gray.700"}
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
                  color={colorMode === "dark" ? "white" : "gray.700"}
                  textAlign="center"
                  justify="center"
                >
                  Not yet Registered?
                  <Button
                    color={colorMode === "dark" ? "white" : "gray.700"}
                    _hover={{ color: "red.700" }}
                    variant="none"
                    onClick={() => setChangeMode(!changeMode)}
                  >
                    Sign up
                  </Button>
                </Text>
              )}
            </Flex>
            </>
            )}
          </ModalBody>

          <ModalFooter>
            {changeMode ? (
              <>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleregistration}
                  isDisabled={isUsernameAvailable === false || !isPasswordValid}
                >
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
      {/* Modal section ends */}
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
  const navigate = useNavigate();
  const isLoggedIn = () => !!localStorage.getItem("authToken");

  const handleClick = () => {
    const isExternal = to.startsWith("http");

    if (isExternal) {
      window.open(to, "_blank");
    } else {
      if (name === "Trending Projects") {
        if (isLoggedIn()) {
          navigate(to);
        } else {
          toast.info("You need to log in to view trending projects.");
        }
      } else {
        navigate(to);
      }
    }
    onClose();
  };

  return (
    <MenuItem
      onClick={handleClick}
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
  );
}

export default Navbar;
