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
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginModal = ({ isOpen, onClose, setChangeMode, setName }) => {
    const navigate = useNavigate();
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
      
      navigate('/editor')
      localStorage.setItem("userEmail", logincredentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userId",json.userId)
      const email = localStorage.getItem('userEmail');
      if (email) {
        axios
          .get(`https://readmemaker-backend.vercel.app/users/getNameByEmail/${email}`)
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Log in into your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              id="email"
              value={logincredentials.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              id="password"
              value={logincredentials.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Text
            py={4}
            color="gray.700"
            textAlign="center"
            cursor="pointer"
            _hover={{ color: "gray.400" }}
          >
            Forgot password?
          </Text>
          <Flex alignItems="center" justify="center" my={5}>
            <Button textAlign="center" justify="center">
              Log in with Google
            </Button>
          </Flex>
          <Flex alignItems="center" justify="center" my={5}>
            <Button textAlign="center" justify="center">
              Log in with Github
            </Button>
          </Flex>
          <Flex justify="center" alignItems="center">
            <Text py={3} color="gray.700" textAlign="center">
              Not yet Registered?
              <Button
                color="red.400"
                _hover={{ color: "red.700" }}
                variant="none"
                onClick={() => setChangeMode(true)}
              >
                Sign up
              </Button>
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleloginSubmit}>
            Log In
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
