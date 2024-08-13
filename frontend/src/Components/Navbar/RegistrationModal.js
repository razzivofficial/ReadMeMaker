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
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const RegistrationModal = ({ isOpen, onClose, setChangeMode }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      // console.log(json);
      if (json.message !== "success") {
        toast.error("Registration failed: " + json.error);
      }
      else if(json.error){
        toast.error(json.error)
      } 
      else {
        toast.success("Registration successful");
        onClose();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.id]: event.target.value });
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
            <FormLabel>Enter Your username</FormLabel>
            <Input
              placeholder="Enter your username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              required
              bg={useColorModeValue("white", "gray.700")}
              color={useColorModeValue("black", "white")}
            />
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
              colorScheme={buttonColor}
              _hover={{ bg: buttonHoverColor }}
              mb={2}
              w="full"
              maxW="sm"
            >
              Sign Up with Google
            </Button>
            <Button
              colorScheme={buttonColor}
              _hover={{ bg: buttonHoverColor }}
              w="full"
              maxW="sm"
            >
              Sign Up with GitHub
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
          <Button colorScheme="blue" mr={3} onClick={handleRegistration}>
            Sign Up
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegistrationModal;
