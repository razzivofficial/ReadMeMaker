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

const RegistrationModal = ({ isOpen, onClose, setChangeMode }) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Enter Your name</FormLabel>
            <Input
              placeholder="Enter your name"
              id="name"
              value={credentials.name}
              onChange={onchange}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Enter Your email</FormLabel>
            <Input
              placeholder="Enter your email"
              id="email"
              value={credentials.email}
              onChange={onchange}
              required
            />
          </FormControl>
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
          <Flex alignItems="center" justify="center" my={5}>
            <Button textAlign="center" justify="center">
              Sign up using Google
            </Button>
          </Flex>
          <Flex alignItems="center" justify="center" my={5}>
            <Button textAlign="center" justify="center">
              Sign up using Github
            </Button>
          </Flex>
          <Flex justify="center" alignItems="center">
            <Text py={3} color="gray.700" textAlign="center">
              Already Registered?
              <Button
                color="red.400"
                _hover={{ color: "red.700" }}
                variant="none"
                onClick={() => setChangeMode(false)}
              >
                Log in
              </Button>
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleregistration}>
            Sign up
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegistrationModal;
