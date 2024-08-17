import React, { useState, useEffect } from "react";
import {
  chakra,
  Stack,
  Text,
  Button,
  Box,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { GiCoffeeCup } from "react-icons/gi";
import { Link as Navlink } from "react-router-dom";
import CoffeePage from "../CoffeePage/CoffeePage";

// Array of arrays, each containing words associated with the initial letters
const wordsList = [
  ["SICK", "PICK", "LICK", "DRAG-DROP_INTERFACE"],
  ["BITS", "FITS", "HITS", "TEMPLATE_CUSTOMIZATION"],
  ["RUDE", "DUDE", "GUDE", "NEW_LIVE_EDITOR"],
];

const HeroSection = () => {
  const [currentWordSet, setCurrentWordSet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedWords, setDisplayedWords] = useState(() =>
    wordsList[0].map((word, index) => ({
      text: word.charAt(0),
      isLast: index === wordsList[0].length - 1,
    }))
  );
  const [isFinalWordTyped, setIsFinalWordTyped] = useState(false);

  const typingSpeed = 160;
  const finalWordTypingSpeed = 120; // Speed of typing effect for final words
  const pauseDuration = 1000; // Duration to pause before moving to next word
  const finalWordPauseDuration = 1500; // Longer pause before the last word

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    const words = wordsList[currentWordSet];
    let timer;
    const isLastWord = currentIndex === words.length - 1;
    const currentTypingSpeed = isLastWord ? finalWordTypingSpeed : typingSpeed;

    if (displayedWords[currentIndex].text === words[currentIndex]) {
      timer = setTimeout(
        () => {
          if (isLastWord) {
            setIsFinalWordTyped(true);
            setTimeout(() => {
              setCurrentIndex(0);
              setCurrentWordSet((prevSet) => (prevSet + 1) % wordsList.length);
              setDisplayedWords(
                wordsList[(currentWordSet + 1) % wordsList.length].map(
                  (word, index) => ({
                    text: word.charAt(0),
                    isLast:
                      index ===
                      wordsList[(currentWordSet + 1) % wordsList.length]
                        .length -
                        1,
                  })
                )
              );
              setIsFinalWordTyped(false); // Reset for next set
            }, finalWordPauseDuration);
          } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        },
        isLastWord ? finalWordPauseDuration : pauseDuration
      );
    } else {
      timer = setTimeout(() => {
        setDisplayedWords((prevDisplayedWords) => {
          const updatedDisplayedWords = [...prevDisplayedWords];
          const nextCharacter =
            words[currentIndex][displayedWords[currentIndex].text.length];
          updatedDisplayedWords[currentIndex] = {
            text: updatedDisplayedWords[currentIndex].text + nextCharacter,
            isLast: updatedDisplayedWords[currentIndex].isLast,
          };
          return updatedDisplayedWords;
        });
      }, currentTypingSpeed);
    }
    return () => clearTimeout(timer);
  }, [displayedWords, currentIndex, currentWordSet]);

  return (
    <Box
      p={{ base: 4, md: 10 }}
      bg={useColorModeValue("gray.100", "gray.700")}
      m={4}
      mt={{ base: 12, md: 18 }}
    >
      <Stack direction="column" spacing={6} alignItems="center">
        <a
          href="https://t.me/readmemaker"
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box
            mt={10}
            py={2}
            px={3}
            bg={useColorModeValue("teal.400", "teal.600")}
            w="max-content"
            color={useColorModeValue("white", "gray.200")}
            rounded="md"
            fontSize="md"
            _hover={{ textDecoration: "none" }}
          >
            <Stack direction={{ base: "column", sm: "row" }}>
              <Text fontWeight="bold">Ready, Set, Build! 🚀</Text>
              <Text>Join the Community!</Text>
            </Stack>
          </Box>
        </a>

        <chakra.h1
          fontSize={{ base: "xl", sm: "3xl" }}
          fontWeight="bold"
          textAlign="center"
          maxW="800px"
          color={useColorModeValue("gray.800", "gray.100")}
        >
          Get started with ReadMeMaker
          <br />
          <Stack direction="column" alignItems="center">
            {displayedWords.map((wordObj, index) => (
              <Box key={index} textAlign="center">
                <chakra.span
                  fontSize={{ base: "2xl", sm: "4xl" }}
                  fontWeight="bold"
                  color={
                    wordObj.isLast && isFinalWordTyped ? "red.500" : "teal.400"
                  }
                >
                  '{wordObj.text}'
                </chakra.span>
              </Box>
            ))}
          </Stack>
        </chakra.h1>
        <Text
          maxW="850px"
          fontSize="xl"
          textAlign="center"
          color={useColorModeValue("gray.700", "gray.300")}
        >
          Crafting documentation is like painting the portrait of your project's
          soul. Each line of code, every design choice, and every contributor's
          effort are woven together into a tapestry that tells the story of your
          creation. With our README.md generator, you hold the artist's brush,
          effortlessly turning your vision into a masterpiece of clarity and
          understanding.
        </Text>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 4, sm: 6 }}
          align="center"
          w={{ base: "100%", sm: "auto" }}
        >
          <Link as={Navlink} to="/editor">
            <Button
              colorScheme="teal"
              variant="outline"
              rounded="md"
              size="lg"
              height="3.5rem"
              fontSize={{ base: "md", sm: "lg" }}
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
            fontSize={{ base: "sm", sm: "md" }}
            borderColor="gray.500"
            onClick={openModal}
          >
            Buy me a coffee
          </Button>

          <CoffeePage isOpen={isModalOpen} onClose={closeModal} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default HeroSection;
