import React from "react";
import {
  Container,
  Box,
  Text,
  Center,
  useColorModeValue,
  SimpleGrid,
  VStack,
  Image,
  HStack,
  IconButton,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./EditorCard.css";

const data = [
  {
    email: "user1@example.com",
    username: "user1",
    profilePic: "https://via.placeholder.com/50",
    projectTitle: "Sample Project",
    upvotes: 15,
    downvotes: 2,
    comments: 5,
    markdown: `# Hello World\nThis is a sample Markdown content.`,
  },
  {
    email: "user2@example.com",
    username: "user2",
    profilePic: "https://via.placeholder.com/50",
    projectTitle: "Sample Project",
    upvotes: 13,
    downvotes: 0,
    comments: 0,
    markdown: `# Test\n## Subheader\n### Smaller Header`,
  },
  {
    email: "user3@example.com",
    username: "user3",
    profilePic: "https://via.placeholder.com/50",
    projectTitle: "Another Project",
    upvotes: 12,
    downvotes: 3,
    comments: 12,
    markdown: `
*LOGIN TO USE DIRECT TEMPLATES*

## Logo and Title

<div align='center'>
   <img src='https://example.com/logo.png' alt='Project Logo' />
   <h1>Project Title</h1>
</div>

# Project Title

A brief introduction or overview of what the project is about.

## Description

Provide a detailed description of the project. Explain its purpose, goals, and any other relevant information that would help someone understand the project's significance.
    `,
  },
  {
    email: "user4@example.com",
    username: "user4",
    profilePic: "https://via.placeholder.com/50",
    projectTitle: "Another Project",
    upvotes: 5,
    downvotes: 13,
    comments: 2,
    markdown: `## Contact Us

For any inquiries or assistance, feel free to reach out to us:

- **Address:** Near Huda Sector - 9, Safidon Road Jind - 126102 (Haryana)
- **Phone:** +91-9996135006, +91-9896948004 (Admin), +91-9896948005 (Admission)
- **Email:** info@jietjind.ac.in
- **Website:** [www.jietcollege.edu](https://www.jietcollege.edu)

<div align="center">
   <a href="https://github.com/addymistrel/jiet-college-repo/graphs/contributors">
   <img src="https://contrib.rocks/image?repo=addymistrel/jiet-college-repo" alt="Collaborators" />
   </a>
</div>

## Thanks to all Collaborators 💪

Thanks a lot for spending your time helping us grow. Keep rocking 🍻

## Contributing

If you're an alumni, faculty member, or student of JIET and would like to contribute to this README file or any other aspect of JIET's documentation, please feel free to submit a pull request. Thank you for choosing JIET College. We look forward to accompanying you on your educational journey!
    `,
  },
];

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
      _hover={{ boxShadow: "xl" }}
      bg={bg}
      role="group"
      m={2}
      // mt={14}
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
          {markdown}
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

const EditorCard = () => {
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
            #Ready-Mad-Templates-Of-ReadMeMaker!
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

export default EditorCard;
