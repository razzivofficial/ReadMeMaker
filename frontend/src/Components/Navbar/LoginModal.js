import React, { useState } from "react";
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
  Input,
  Button,
  Text,
  Flex,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../firebase.js"
const LoginModal = ({ isOpen, onClose, setChangeMode, setName, onSuccess }) => {
  const API_URL = process.env.REACT_APP_BACKEND_API;
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginCredentials({ email: "", password: "" });

    try {
      const response = await fetch(
        `${API_URL}/users/loginuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginCredentials.email,
            password: loginCredentials.password,
          }),
        }
      );
      const json = await response.json();

      if (!json.success) {
        toast.error("Enter valid credentials");
      } else {
        toast.success("Login successful");

        onSuccess();
        onClose();
        navigate("/editor");

        localStorage.setItem("userEmail", loginCredentials.email);
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userId", json.userId);

        const email = localStorage.getItem("userEmail");
        if (email) {
          axios
            .get(
              `${API_URL}/users/getNameByEmail/${email}`
            )
            .then((response) => {
              setName(response.data.name);
            })
            .catch((error) => {
              console.error("There was an error fetching the name!", error);
            });
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.id]: event.target.value,
    });
  };
  const generateUsername = (name) => {
    return name.toLowerCase().replace(/\s+/g, '') + Date.now();
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      // console.log(user)
      // Check if the user already exists in MongoDB
      const checkUserResponse = await fetch(
        `${API_URL}/users/getdetailbyemail/${user.email}`
      );
      const checkUserJson = await checkUserResponse.json();
      if (checkUserJson.error === "User not found") {
        // If the user does not exist, register the user
        console.log("Register start ")
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
        console.log(registrationJson)
        if (registrationJson.message === "success") {
          toast.success("Registration successful");
  
          // Automatically log the user in after registration
          const loginResponse = await fetch(
            `${API_URL}/users/loginusergoogle`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                password: process.env.REACT_APP_PASS, // Use the same default password for login
              }),
            }
          );
  
          const loginJson = await loginResponse.json();
          if (loginJson.success) {
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("authToken", loginJson.authToken);
            localStorage.setItem("userId", loginJson.userId);
  
            toast.success("Logged in with Google");
            if (window.location.pathname === "/editor") {
              window.location.reload();
            }
            onClose();
          }
        } else {
          toast.error("Registration failed: " + registrationJson.error);
        }
      } else {
        // If the user already exists, log them in
        const loginResponse = await fetch(
          `${API_URL}/users/loginusergoogle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              password: process.env.REACT_APP_PASS, // Default password
            }),
          }
        );
  
        const loginJson = await loginResponse.json();
  
        if (loginJson.success) {
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("authToken", loginJson.authToken);
          localStorage.setItem("userId", loginJson.userId);
  
          toast.success("Logged in with Google");
          if (window.location.pathname === "/editor") {
            window.location.reload();
          }
          onClose();
        } else {
          toast.error("Login failed: " + loginJson.error);
        }
      }
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? theme.colors.gray[800] : "white"}
        borderRadius="md"
        maxW="md"
        mx="auto"
      >
        <ModalHeader
          textAlign="center"
          color={colorMode === "dark" ? "white" : "gray.800"}
        >
          Log in to your account
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired mb={4}>
            <FormLabel color={colorMode === "dark" ? "white" : "gray.600"}>
              Email
            </FormLabel>
            <Input
              placeholder="Enter your email"
              id="email"
              value={loginCredentials.email}
              onChange={handleChange}
              required
              bg={colorMode === "dark" ? "gray.700" : "white"}
              color={colorMode === "dark" ? "white" : "black"}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel color={colorMode === "dark" ? "white" : "gray.600"}>
              Password
            </FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              id="password"
              value={loginCredentials.password}
              onChange={handleChange}
              required
              bg={colorMode === "dark" ? "gray.700" : "white"}
              color={colorMode === "dark" ? "white" : "black"}
            />
          </FormControl>
          <Text
            py={2}
            color={colorMode === "dark" ? "white" : "gray.700"}
            textAlign="center"
            cursor="pointer"
            _hover={{ color: colorMode === "dark" ? "gray.300" : "gray.500" }}
          >
            Forgot password?
          </Text>
          <Flex direction="column" align="center" my={5}>
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
            {/* <Button
              mt={4}
              textAlign="center"
              justify="center"
              leftIcon={<AiFillGithub />}
            >
              Log in with Github
            </Button> */}
          </Flex>
          <Flex direction="column" align="center">
            <Text
              py={3}
              color={colorMode === "dark" ? "white" : "gray.700"}
              textAlign="center"
            >
              Not yet registered?
              <Button
                color="red.400"
                _hover={{ color: "red.700" }}
                variant="link"
                onClick={() => setChangeMode(true)}
                ml={1}
              >
                Sign up
              </Button>
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLoginSubmit}>
            Log In
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
