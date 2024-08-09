import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Image,
  IconButton,
  Divider,
  useColorModeValue,
  SimpleGrid,
  Center,
  Container,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./EditorCard.css";
import ComponentData from "./ComponentData";
import TemplateData from "./TemplateData";
import TempCompoLoader from "../Loader/TempCompoLoader";

// Function to replace height with width in <img> tags
const replaceHeightWithWidth = (inputText) => {
  return inputText.replace(
    /<img\s+([^>]*)height="(\d+)"([^>]*)>/gi,
    (match, p1, height, p2) => {
      return `<img ${p1} width="${height}" ${p2}>`;
    }
  );
};

const MarkdownPreviewCard = ({
  email,
  username,
  profilePic,
  projectTitle,
  upvotes,
  downvotes,
  comments,
  markdown,
}) => {
  const bg = useColorModeValue("white", "#2f3244");
  const markdownBg = useColorModeValue("#f5f5f5", "#1e1e1e");
  const textColor = useColorModeValue("black", "white");

  const processedMarkdown = replaceHeightWithWidth(markdown);

  /* Loader */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <Box
      className="card"
      w="100%"
      maxW={{ base: "full", sm: "500px", md: "400px" }}
      boxShadow="lg"
      rounded="md"
      p={4}
      overflow="hidden"
      cursor="pointer"
      _hover={{ boxShadow: "2xl" }}
      bg={bg}
      role="group"
      m={2}
    >
      <HStack spacing={4} mb={4} align="start">
        <Image
          borderRadius="full"
          boxSize={{ base: "40px", md: "50px" }}
          src={profilePic}
          alt={`${username}'s profile`}
        />
        <VStack align="start" spacing={0}>
          <Text
            fontWeight="bold"
            color={textColor}
            fontSize={{ base: "sm", md: "md" }}
          >
            {username}
          </Text>
          <Text color={textColor} fontSize={{ base: "xs", md: "sm" }}>
            {email}
          </Text>
        </VStack>
      </HStack>

      <Text
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="bold"
        mb={2}
        color={textColor}
      >
        {projectTitle}
      </Text>
      <Box
        className="markdown-content"
        p={4}
        border="1px solid"
        borderColor="gray.300"
        rounded="md"
        mt={4}
        bg={markdownBg}
        height={{ base: "180px", md: "200px" }}
        overflowY="auto"
        fontFamily="monospace"
        color={textColor}
      >
        {isLoading ? (
          <TempCompoLoader />
        ) : (
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {processedMarkdown}
          </ReactMarkdown>
        )}
      </Box>

      <Divider my={4} />

      <HStack spacing={4} justify="space-between" wrap="wrap">
        <HStack spacing={2}>
          <IconButton
            aria-label="Upvote"
            icon={<FaThumbsUp />}
            variant="outline"
            colorScheme="green"
          />
          <Text color={textColor}>{upvotes}</Text>
        </HStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Downvote"
            icon={<FaThumbsDown />}
            variant="outline"
            colorScheme="red"
          />
          <Text color={textColor}>{downvotes}</Text>
        </HStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Comments"
            icon={<FaComment />}
            variant="outline"
            colorScheme="blue"
          />
          <Text color={textColor}>{comments}</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

const EditorCard = () => {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });
  const [selected, setSelected] = useState("templates");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelected(type);
      setIsLoading(false);
    }, 100); // Simulate loading time
  };

  const dataToDisplay = selected === "templates" ? TemplateData : ComponentData;

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <VStack spacing={4} align="stretch" w="100%">
          <Text
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            textAlign="center"
            mb={8}
            mt={12}
            lineHeight="shorter"
            color="gray.800"
            textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
            bgGradient="linear(to-r, teal.300, blue.500)"
            bgClip="text"
            animation="fadeIn 2s ease-in-out"
          >
            Templates & Components by ReadMeMaker
          </Text>
          <HStack
            spacing={{ base: 4, md: 6 }}
            justify="center"
            mb={{ base: 4, md: 6 }}
            wrap="wrap"
          >
            <Button
              onClick={() => handleSelection("templates")}
              colorScheme={selected === "templates" ? "blue" : "gray"}
              variant={selected === "templates" ? "solid" : "outline"}
              borderRadius="md"
              px={{ base: 4, md: 8 }}
              py={{ base: 2, md: 4 }}
              fontSize={{ base: "md", md: "xl" }}
              borderColor="gray.200"
              _focus={{ boxShadow: "none" }}
              minWidth={{ base: "120px", md: "150px" }}
              mb={{ base: 2, md: 0 }}
            >
              Templates
            </Button>
            <Button
              onClick={() => handleSelection("component")}
              colorScheme={selected === "component" ? "blue" : "gray"}
              variant={selected === "component" ? "solid" : "outline"}
              borderRadius="md"
              px={{ base: 4, md: 8 }}
              py={{ base: 2, md: 4 }}
              fontSize={{ base: "md", md: "xl" }}
              _focus={{ boxShadow: "none" }}
              minWidth={{ base: "120px", md: "150px" }}
            >
              Components
            </Button>
          </HStack>

          {isLoading ? (
            <TempCompoLoader />
          ) : (
            <SimpleGrid columns={columns} spacing={4}>
              {dataToDisplay.map((item, index) => (
                <MarkdownPreviewCard
                  key={index}
                  email={item.email}
                  username={item.username}
                  profilePic={item.profilePic}
                  projectTitle={item.projectTitle}
                  upvotes={item.upvotes}
                  downvotes={item.downvotes}
                  comments={item.comments}
                  markdown={item.markdown}
                />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Center>
    </Container>
  );
};

export default EditorCard;
