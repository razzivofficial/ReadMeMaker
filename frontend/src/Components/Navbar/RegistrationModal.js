import React, { useState, useEffect } from "react";
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
import { AiFillGithub } from "react-icons/ai";
import { CheckCircleIcon } from "@chakra-ui/icons"; // Import Chakra UI icon

const RegistrationModal = ({ isOpen, onClose, setChangeMode }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setCredentials({ username: "", email: "", password: "" });
    try {
      const response = await fetch(
        "https://readmemaker-backend.vercel.app/users/createuser",
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
      if (json.message !== "success") {
        toast.error("Registration failed: " + json.error);
      } else if (json.error) {
        toast.error(json.error);
      } else {
        toast.success("Registration successful");
        onClose();
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
          `https://readmemaker-backend.vercel.app/users/checkusername/${username}`
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
          </FormControl>
          <Flex direction="column" align="center" my={5}>
            <Button
              mt={4}
              textAlign="center"
              justify="center"
              leftIcon={<FcGoogle />}
            >
              Sign up using Google
            </Button>
            <Button
              mt={4}
              textAlign="center"
              justify="center"
              leftIcon={<AiFillGithub />}
            >
              Log in with Github
            </Button>
          </Flex>
          <Flex justify="center" alignItems="center">
            <Text py={3} color={textColor} textAlign="center">
              Already Registered?{" "}
              <Button
                color="red.400"
                _hover={{ color: "red.700" }}
                variant="link"
                onClick={() => setChangeMode(false)}
              >
                Log In
              </Button>
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleRegistration}
            isDisabled={isUsernameAvailable === false}
          >
            Sign Up
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegistrationModal;
