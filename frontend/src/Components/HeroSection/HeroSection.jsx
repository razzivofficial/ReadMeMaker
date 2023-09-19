import React, { useState, useEffect } from "react";
import { chakra, Stack, Text, Button, Box } from "@chakra-ui/react";
import { GiCoffeeCup } from "react-icons/gi";

const textArray = [
  "Drag & Drop Interface",
  "Interface Markdown",
  "Preview Custom Templates",
];

const Typewriter = ({ text, delay, infinite }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);
      } else {
        setIsTyping(false);

        if (infinite) {
          setTimeout(() => {
            setCurrentIndex(0);
            setCurrentText("");
            setIsTyping(true);
          }, 3000);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, isTyping, text]);

  return <span>{currentText}</span>;
};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
            <Typewriter text={textArray[0]} delay={100} infinite />
          </chakra.span>
        </chakra.h1>
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
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
