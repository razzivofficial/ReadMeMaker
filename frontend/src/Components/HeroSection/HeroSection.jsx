import React, { useState, useEffect } from "react";
import { chakra, Stack, Text, Button, Box, Link } from "@chakra-ui/react";
import { GiCoffeeCup } from "react-icons/gi";
import { Link as Navlink } from "react-router-dom";

// Array of arrays, each containing words associated with the initial letters
const wordsList = [
  ["SICK", "PICK", "LICK", "DRAG-DROP_INTERFACE"],
  ["BITS", "FITS", "HITS", "TEMPLATE_CUSTOMIZATION"],
  ["RUDE", "DUDE", "GUDE", "NEW_LIVE_EDITOR"],
];

const HeroSection = () => {
  const [currentWordSet, setCurrentWordSet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState(() =>
    wordsList[0].map((word, index) => ({
      text: word.charAt(0),
      isLast: index === wordsList[0].length - 1,
    }))
  );
  const [isFinalWordTyped, setIsFinalWordTyped] = useState(false);

  const typingSpeed = 160; // Speed of typing effect for regular words
  const finalWordTypingSpeed = 120; // Speed of typing effect for final words
  const pauseDuration = 1000; // Duration to pause before moving to next word
  const finalWordPauseDuration = 1500; // Longer pause before the last word

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
      bgColor="whitesmoke"
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
          fontSize={{ base: "xl", sm: "3xl" }}
          fontWeight="bold"
          textAlign="center"
          maxW="800px"
        >
          Get started with ReadMeMaker
          <br />
          <Stack direction="column" alignItems="center">
            {displayedWords.map((wordObj, index) => (
              <Box key={index} textAlign="center">
                <chakra.span
                  fontSize={{ base: "2xl", sm: "4xl" }}
                  fontWeight="bold"
                  color={wordObj.isLast && isFinalWordTyped ? "red" : "teal"}
                >
                  '{wordObj.text}'
                </chakra.span>
              </Box>
            ))}
          </Stack>
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
