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
import { AiFillGithub } from "react-icons/ai";
const LoginModal = ({ isOpen, onClose, setChangeMode, setName, onSuccess }) => {
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
        "https://readmemaker-backend.vercel.app/users/loginuser",
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
            <Button mt={4} textAlign="center" justify="center" leftIcon={<FcGoogle />}>
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
