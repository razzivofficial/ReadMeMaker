import React from "react";
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
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./EditorCardUnlogged.css";
import data from "./EditorCardUnloggedData"; // Import data from external file

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

  // Apply the replaceHeightWithWidth function to the markdown content
  const processedMarkdown = replaceHeightWithWidth(markdown);

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
      {/* Add on click transfer code */}
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
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {processedMarkdown}
        </ReactMarkdown>
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

const EditorCardLogged = () => {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <VStack spacing={4} align="stretch" w="100%">
          <Text
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="bold"
            textAlign="center"
            mb={6}
            mt={16}
          >
            #Ready-Made-Templates-Of-ReadMeMaker!
          </Text>

          <SimpleGrid columns={columns} spacing={4}>
            {data.map((item, index) => (
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
        </VStack>
      </Center>
    </Container>
  );
};

export default EditorCardLogged;
