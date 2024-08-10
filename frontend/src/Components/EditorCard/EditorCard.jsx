import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
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

import avatar1 from "../../MediaFiles/avatar1.jpg";
import avatar2 from "../../MediaFiles/avatar2.jpg";
import avatar3 from "../../MediaFiles/avatar3.jpg";
import avatar4 from "../../MediaFiles/avatar4.jpg";
import avatar5 from "../../MediaFiles/avatar5.jpg";
import avatar6 from "../../MediaFiles/avatar6.jpg";
import avatar7 from "../../MediaFiles/avatar7.jpg";
import avatar8 from "../../MediaFiles/avatar8.jpg";

import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./EditorCard.css";
import TempCompoLoader from "../Loader/TempCompoLoader";

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
  id,
  username,
  profilePic,
  projectTitle,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  markdown,
}) => {
  const bg = useColorModeValue('white', '#2f3244');
  const markdownBg = useColorModeValue('#f5f5f5', '#1e1e1e');
  const textColor = useColorModeValue('black', 'white');

  const processedMarkdown = replaceHeightWithWidth(markdown);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [upvoteClicked, setUpvoteClicked] = useState(false);
  const [downvoteClicked, setDownvoteClicked] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
  ];

  useEffect(() => {
    const avatarIndex = parseInt(profilePic.replace('avatar', '')) - 1;
    setSelectedAvatar(avatars[avatarIndex]);
  }, [profilePic]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const userId = localStorage.getItem('userId'); // Get the userId from local storage

  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        const response = await fetch(`https://readmemaker-backend.vercel.app/editor/checkvotestatus?userId=${userId}&editorId=${id}`);
        const result = await response.json();
        setUpvoteClicked(result.hasUpvoted);
        setDownvoteClicked(result.hasDownvoted);
      } catch (error) {
        console.error('Error checking vote status:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    checkVoteStatus();
  }, [id, userId]);

  const handleUpvote = async () => {
    try {
      const response = await fetch(`https://readmemaker-backend.vercel.app/editor/upvoteeditor`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, editorId: id }),
      });
  
      const result = await response.json();
      if (response.ok) {
        if (result.message === 'Upvote removed') {
          setUpvoteClicked(false);
          setUpvotes(upvotes - 1);
        } else if (result.message === 'Upvote recorded') {
          setUpvoteClicked(true);
          setDownvoteClicked(false);
          setUpvotes(upvotes + 1);
          if (downvoteClicked) setDownvotes(downvotes - 1);
        }
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };
  
  const handleDownvote = async () => {
    try {
      const response = await fetch(`https://readmemaker-backend.vercel.app/editor/downvoteeditor`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, editorId: id }),
      });
  
      const result = await response.json();
      if (response.ok) {
        if (result.message === 'Downvote removed') {
          setDownvoteClicked(false);
          setDownvotes(downvotes - 1);
        } else if (result.message === 'Downvote recorded') {
          setDownvoteClicked(true);
          setUpvoteClicked(false);
          setDownvotes(downvotes + 1);
          if (upvoteClicked) setUpvotes(upvotes - 1);
        }
      }
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  return (
    <Box
      className="card"
      w="100%"
      maxW={{ base: 'full', sm: '500px', md: '400px' }}
      boxShadow="lg"
      rounded="md"
      p={4}
      overflow="hidden"
      cursor="pointer"
      _hover={{ boxShadow: '2xl' }}
      bg={bg}
      role="group"
      m={2}
    >
      <HStack spacing={4} mb={4} align="start">
        <Image
          borderRadius="full"
          boxSize={{ base: '40px', md: '50px' }}
          src={selectedAvatar}
          alt={`${username}'s profile`}
        />
        <VStack align="start" spacing={0}>
          <Link to={`/profile/${email}`}>
            <Text
              fontWeight="bold"
              color={textColor}
              fontSize={{ base: 'sm', md: 'md' }}
            >
              {username}
            </Text>
          </Link>
        </VStack>
      </HStack>

      <Text
        fontSize={{ base: 'md', md: 'lg' }}
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
        height={{ base: '180px', md: '200px' }}
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
            variant={upvoteClicked ? 'solid' : 'outline'}
            colorScheme="green"
            onClick={handleUpvote}
            isDisabled={downvoteClicked}
          />
          <Text color={textColor}>{upvotes}</Text>
        </HStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Downvote"
            icon={<FaThumbsDown />}
            variant={downvoteClicked ? 'solid' : 'outline'}
            colorScheme="red"
            onClick={handleDownvote}
            isDisabled={upvoteClicked}
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
        </HStack>
      </HStack>
    </Box>
  );
};

const EditorCard = () => {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });
  const [selected, setSelected] = useState("templates");
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://readmemaker-backend.vercel.app/editor/getalleditor");
        const data = await response.json();
        if (data.editors) {
          const templateData = data.editors.filter(
            (editor) => editor.type === "template"
          );
          const componentData = data.editors.filter(
            (editor) => editor.type === "component"
          );
          setTemplates(templateData);
          setComponents(componentData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelection = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelected(type);
      setIsLoading(false);
    }, 100);
  };

  const dataToDisplay = selected === "templates" ? templates : components;

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
              onClick={() => handleSelection("components")}
              colorScheme={selected === "components" ? "blue" : "gray"}
              variant={selected === "components" ? "solid" : "outline"}
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
                  id={item._id}
                  email={item.email}
                  username={item.username}
                  profilePic={item.avatar}
                  projectTitle={item.title}
                  upvotes={item.upvotes}
                  downvotes={item.downvotes}
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
