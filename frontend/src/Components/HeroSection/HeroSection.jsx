import * as React from "react";
import { chakra, Stack, Text, Button, Box } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const HeroSection = () => {
  return (
      <Box p={{ base: 8, md: 14 }} bgColor={"whitesmoke"}
      m={6} mt={30}>
      <Stack direction="column" spacing={6} alignItems="center">
        <Box
          py={2}
          px={3}
          bg="teal"
          w="max-content"
          color="white"
          rounded="md"
          fontSize="md"
        >
          <Stack direction={{ base: "column", sm: "row" }}>
            <Text fontWeight="bold">Ready, Set, Build! 🚀</Text>
            <Text>Join the Hackathon!</Text>
          </Stack>
        </Box>
        <chakra.h1
          fontSize={{ base: "4xl", sm: "5xl" }}
          fontWeight="bold"
          textAlign="center"
          maxW="600px"
        >
                  Get started with{" "}
                  <br />
          <chakra.span
            color="teal"
            bg="linear-gradient(transparent 50%, #83e9e7 50%)"
          >
            animated content
          </chakra.span>
        </chakra.h1>
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas error sequi autem praesentium dolores est minima iure? Ipsa ea distinctio laudantium dolorem nisi, reprehenderit facilis odio, assumenda sunt praesentium quas?
        </Text>
        <Stack
          direction={{ base: "column", sm: "row" }}
          w={{ base: "100%", sm: "auto" }}
          spacing={5}
        >
          <Button
            colorScheme="teal"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1.2rem"
          >
            Get Started
          </Button>
          <Button
            leftIcon={<FaGithub />}
            colorScheme="gray"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1.2rem"
          >
            Github
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HeroSection;
