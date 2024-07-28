import React, { useState, useEffect } from "react";
import { chakra, Stack, Text, Button, Box, Link } from "@chakra-ui/react";
import { GiCoffeeCup } from "react-icons/gi";
import { Link as Navlink } from "react-router-dom";

const textArray = [
  "# Create READMEs with ease",
  "# Collaborate in real-time",
  "# Live markdown compilation",
];

const Typewriter = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const typingSpeed = 200; // Adjust the typing speed as needed (lower value = faster)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => {
        const targetText = textArray[currentIndex];
        if (prevText === targetText) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
          return "";
        }
        const nextChar = targetText.charAt(prevText.length);
        return prevText + nextChar;
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <span>
      {currentText}
      <span>|</span>
    </span>
  );
};

const HeroSection = () => {
  return (
    <Box
      p={{ base: 8, md: 14 }}
      bgColor={"whitesmoke"}
      m={4}
      mt={{ base: 12, md: 18 }}
    >
      <Stack direction="column" spacing={6} alignItems="center">
        <Box
          mt={10}
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
            <Text>Join the Community!</Text>
          </Stack>
        </Box>
        <chakra.h1
          fontSize={{ base: "4xl", sm: "5xl" }}
          fontWeight="bold"
          textAlign="center"
          maxW="800px"
        >
          Get started with ReadMeMaker
          <br />
          <chakra.span
            color="teal"
            bg="linear-gradient(transparent 50%, #83e9e7 50%)"
          >
            <Typewriter />
          </chakra.span>
        </chakra.h1>
        <Text maxW="850px" fontSize="xl" textAlign="center" color="gray.500">
          Crafting documentation is like painting the portrait of your project's
          soul. Each line of code, every design choice, and every contributor's
          effort are woven together into a tapestry that tells the story of your
          creation. With our README.md generator, you hold the artist's brush,
          effortlessly turning your vision into a masterpiece of clarity and
          understanding.
        </Text>
        <Stack
          direction={{ base: "column", sm: "row" }}
          w={{ base: "100%", sm: "auto" }}
          spacing={5}
        >
          <Link as={Navlink} to="/editor">
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
          </Link>
          <Button
            leftIcon={<GiCoffeeCup />}
            colorScheme="gray"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1rem"
            borderColor="black.500"
          >
            Buy me a coffee
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HeroSection;
