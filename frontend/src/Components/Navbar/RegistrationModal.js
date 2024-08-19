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
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { signInWithGoogle } from "../../firebase.js"

const RegistrationModal = ({ isOpen, onClose, setChangeMode }) => {
  const API_URL = process.env.REACT_APP_BACKEND_API;
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  const isPasswordValid = passwordRegex.test(credentials.password);

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
              password: process.env.REACT_APP_PASS, 
              isgoogle: true,
            }),
          }
        );

        const registrationJson = await registrationResponse.json();

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



  const handleRegistration = async (e) => {
    e.preventDefault();
    setCredentials({ username: "", email: "", password: "" });
    try {

      const result = await signInWithGoogle();
      const user = result.user;

      if (user.email === credentials.email) {

        const response = await fetch(
          `${API_URL}/users/createuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        const json = await response.json();
        console.log(json);
        if (json.message !== "success") {
          toast.error("Registration failed: " + json.error);
        } else if (json.error) {
          toast.error(json.error);
        } else {
          toast.success("Registration successful");
          const reslog = await fetch(
            `${API_URL}/users/loginuser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          const js = await reslog.json();
          if (js.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", js.authToken);
            localStorage.setItem("userId", js.userId);
            if (window.location.pathname === "/editor") {
              window.location.reload();
            }
          }
          onClose();
        }
      }
      else {
        // console.log("registration Failed")
        toast.error("registration failed try with same gmail");
        onClose()
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.id]: event.target.value });

    if (event.target.id === "username") {
      checkUsernameAvailability(event.target.value);
    }
  };

  const checkUsernameAvailability = async (username) => {
    if (username.length > 0) {
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

  const modalContentBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("blue", "blue");
  const buttonHoverColor = useColorModeValue("blue.600", "blue.400");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={modalContentBg}
        color={textColor}
        borderRadius="md"
        maxW="md"
        mx="auto"
      >
        <ModalHeader textAlign="center">Create Your Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired mb={4}>
            <FormLabel>Enter Your Username</FormLabel>
            <Input
              placeholder="Enter your username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              required
              bg={useColorModeValue("white", "gray.700")}
              color={useColorModeValue("black", "white")}
            />
            {isCheckingUsername && <Spinner size="sm" mt={2} />}
            {isUsernameAvailable !== null && (
              <Text mt={2} color={isUsernameAvailable ? "green.500" : "red.500"}>
                {isUsernameAvailable ? (
                  <>
                    Username is available <CheckCircleIcon color="green.500" />
                  </>
                ) : (
                  "Username is taken"
                )}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Enter Your Email</FormLabel>
            <Input
              placeholder="Enter your email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              required
              bg={useColorModeValue("white", "gray.700")}
              color={useColorModeValue("black", "white")}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              required
              bg={useColorModeValue("white", "gray.700")}
              color={useColorModeValue("black", "white")}
            />
            {credentials.password && (
              <Text
                mt={2}
                color={isPasswordValid ? "green.500" : "red.500"}
                fontSize="sm"
              >
                {isPasswordValid ? (
                  <>
                    Password is Strong <CheckCircleIcon color="green.500" />
                  </>
                ) : (
                  <>
                    Password must be at least 8 characters long, contain at least
                    one number, and one special character
                    <WarningIcon color="red.500" ml={2} />
                  </>
                )}
              </Text>
            )}
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            size="md"
            width="full"
            onClick={handleRegistration}
            isDisabled={
              !credentials.username ||
              !credentials.email ||
              !credentials.password ||
              !isUsernameAvailable ||
              !isPasswordValid
            }
          >
            Register
          </Button>
          <Flex mt={4} justifyContent="center" alignItems="center">
            <Text fontSize="md">Or</Text>
          </Flex>
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
          <Flex mt={4} justifyContent="center" alignItems="center">
            <Text fontSize="md" mr={1}>
              Already have an account?
            </Text>
            <Button
              colorScheme={buttonColor}
              variant="link"
              size="sm"
              onClick={() => setChangeMode()}
            >
              Log In
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={buttonColor}
            mr={3}
            onClick={onClose}
            _hover={{ bg: buttonHoverColor }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegistrationModal;
