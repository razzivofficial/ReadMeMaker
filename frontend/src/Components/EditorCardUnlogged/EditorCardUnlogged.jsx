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
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaClipboard } from "react-icons/fa"; // Import the Clipboard icon
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditorCardUnlogged.css";
import data from "./EditorCardUnloggedData";

// Function to replace height with width in <img> tags
const replaceHeightWithWidth = (inputText) => {
  return inputText.replace(
    /<img\s+([^>]*)height="(\d+)"([^>]*)>/gi,
    (match, p1, height, p2) => {
      return `<img ${p1} width="${height}" ${p2}>`;
    }
  );
};

// Custom link component to prevent navigation
const CustomLink = ({ href, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    // console.log("Link clicked:", href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {children}
    </a>
  );
};

const MarkdownPreviewCard = ({
  email,
  username,
  profilePic,
  projectTitle,
  upvotes,
  downvotes,
  markdown,
  onMarkdownClick,
}) => {
  const bg = useColorModeValue("white", "#2f3244");
  const markdownBg = useColorModeValue("#f5f5f5", "#1e1e1e");
  const textColor = useColorModeValue("black", "white");

  // Apply the replaceHeightWithWidth function to the markdown content
  const processedMarkdown = replaceHeightWithWidth(markdown);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(processedMarkdown)
      .then(() => {
        toast.success("Markdown copied to clipboard!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((err) => {
        toast.error("Failed to copy markdown!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        //console.error("Copy to clipboard failed:", err);
      });
  };

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
            mt={3}
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
        onClick={() => onMarkdownClick(processedMarkdown)}
      >
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{ a: CustomLink }} // Use the custom link component
        >
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
            aria-label="Copy Markdown"
            icon={<FaClipboard />}
            variant="outline"
            colorScheme="blue"
            onClick={handleCopy} // Add the onClick event for the copy button
          />
        </HStack>
      </HStack>
    </Box>
  );
};

const EditorCardUnLogged = ({ onMarkdownClick }) => {
  const handleMarkdownClick = (markdown) => {
    // Show a professional notification
    // toast.success("Code successfully added to the ReadMeMaker code editor!", {
    //   position: "bottom-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    if (onMarkdownClick) {
      onMarkdownClick(markdown); // Call the passed function if needed
    }
  };

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

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {data.map((item, index) => (
              <MarkdownPreviewCard
                key={index}
                // email={item.email}
                username={item.username}
                profilePic={item.profilePic}
                projectTitle={item.projectTitle}
                upvotes={item.upvotes}
                downvotes={item.downvotes}
                markdown={item.markdown}
                onMarkdownClick={handleMarkdownClick}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Center>

      <ToastContainer />
    </Container>
  );
};

export default EditorCardUnLogged;
