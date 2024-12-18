import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { encodeEmail } from "../../utils/emailUtils";
import {
  Box,
  Text,
  HStack,
  VStack,
  Image,
  IconButton,
  Divider,
  Avatar,
  useColorModeValue,
  SimpleGrid,
  Center,
  Container,
  useBreakpointValue,
  Input,
  Button,
  Tag,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import avatar1 from "../../MediaFiles/avatar1.jpg";
import avatar2 from "../../MediaFiles/avatar2.jpg";
import avatar3 from "../../MediaFiles/avatar3.jpg";
import avatar4 from "../../MediaFiles/avatar4.jpg";
import avatar5 from "../../MediaFiles/avatar5.jpg";
import avatar6 from "../../MediaFiles/avatar6.jpg";
import avatar7 from "../../MediaFiles/avatar7.jpg";
import avatar8 from "../../MediaFiles/avatar8.jpg";

import { FaThumbsUp, FaThumbsDown, FaClipboard } from "react-icons/fa";
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
  description,
  tags,
}) => {

  


  const bg = useColorModeValue("white", "#2f3244");
  const markdownBg = useColorModeValue("#f5f5f5", "#1e1e1e");
  const textColor = useColorModeValue("black", "white");
  const API_URL = process.env.REACT_APP_BACKEND_API;

  const processedMarkdown = replaceHeightWithWidth(markdown);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [upvoteClicked, setUpvoteClicked] = useState(false);
  const [downvoteClicked, setDownvoteClicked] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const encodedmail = encodeEmail(email);

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

  const navigate = useNavigate();

  useEffect(() => {
    if (profilePic !== undefined) {
      const avatarIndex = parseInt(profilePic.replace("avatar", "")) - 1;
      setSelectedAvatar(avatars[avatarIndex]);
    }
  }, [profilePic]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const userId = localStorage.getItem("userId"); // Get the userId from local storage

  useEffect(() => {
    const checkVoteStatus = async () => {
      try {

        const response = await fetch(
          `${API_URL}/editor/checkvotestatus?userId=${userId}&editorId=${id}`
        );
        const result = await response.json();
        setUpvoteClicked(result.hasUpvoted);
        setDownvoteClicked(result.hasDownvoted);
      } catch (error) {
        console.error("Error checking vote status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkVoteStatus();
  }, [id, userId]);

  const handleUpvote = async () => {
    try {
      console.log(userId,id)
      const response = await fetch(
        `${API_URL}/editor/upvoteeditor`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, editorId: id }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        if (result.message === "Upvote removed") {
          setUpvoteClicked(false);
          setUpvotes(upvotes - 1);
        } else if (result.message === "Upvote recorded") {
          setUpvoteClicked(true);
          setDownvoteClicked(false);
          setUpvotes(upvotes + 1);
          if (downvoteClicked) setDownvotes(downvotes - 1);
        }
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(
        `${API_URL}/editor/downvoteeditor`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, editorId: id }),
        }
      );

      const result = await response.json();

      console.log(response.message)
      if (response.ok) {
        if (result.message === "Downvote removed") {
          setDownvoteClicked(false);
          setDownvotes(downvotes - 1);
        } else if (result.message === "Downvote recorded") {
          setDownvoteClicked(true);
          setUpvoteClicked(false);
          setDownvotes(downvotes + 1);
          if (upvoteClicked) setUpvotes(upvotes - 1);
        }
      }
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  function openInEditor() {
    navigate("/editor", {
      state: { markdown: markdown },
    });
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(markdown)
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
        console.error("Copy to clipboard failed:", err);
      });
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
        {/* <Image
          borderRadius="full"
          boxSize={{ base: "40px", md: "50px" }}
          src={selectedAvatar}
        // name={username}
        // alt={`${username}'s profile`} 
        /> */}
        <Avatar
          size="2xl"
          name={username}
          src={selectedAvatar}
          boxSize={{ base: "40px", md: "50px" }}
          cursor="pointer"
          // borderWidth={2}
          boxShadow="lg"
        />
        <VStack align="start" spacing={0}>
          <Link to={`/profile/${encodedmail}`}>
            <Text
              fontWeight="bold"
              color={textColor}
              fontSize={{ base: "sm", md: "md" }}
              mt={2.5}
            >
              {username}
            </Text>
          </Link>
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
        onClick={openInEditor}
      >
        {isLoading ? (
          <TempCompoLoader />
        ) : (
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{ a: CustomLink }}
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
            variant={upvoteClicked ? "solid" : "outline"}
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
            variant={downvoteClicked ? "solid" : "outline"}
            colorScheme="red"
            onClick={handleDownvote}
            isDisabled={upvoteClicked}
          />
          <Text color={textColor}>{downvotes}</Text>
        </HStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Copy Markdown"
            icon={<FaClipboard />}
            variant="outline"
            colorScheme="blue"
            onClick={handleCopy}
          />
        </HStack>
      </HStack>
      {/* Description and Tags */}
      <Box mt={4}>
        <HStack spacing={2}>
          {tags.map((tag, index) => (
            <Tag key={index} size="sm" variant="subtle" colorScheme="blue">
              {tag.trim()}
            </Tag>
          ))}
        </HStack>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color={textColor}
          mb={2}
          fontWeight="medium"
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
};

const EditorCard = () => {
  


  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });
  const API_URL = process.env.REACT_APP_BACKEND_API;
  const [selected, setSelected] = useState("templates");
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/editor/getalleditor`
        );
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
  const[search,setSearch] = useState('')

  const dataToDisplay = selected === "templates" ? templates : components;

  const sortedData = [...dataToDisplay].sort((a, b) => {
    const totalVotesA = a.upvotes - a.downvotes;
    const totalVotesB = b.upvotes - b.downvotes;
    return totalVotesB - totalVotesA; // Descending order
  });

  const filteredData = sortedData.filter((item) => {
    // Use optional chaining to safely access `title`, `description`, and `tags`
    const titleMatch = item.title?.toLowerCase().includes(search.toLowerCase());
    const descriptionMatch = item.description?.toLowerCase().includes(search.toLowerCase());
    const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())); // Check if any tag matches
  
    // Return true if either the title, description, or any tag matches the search query
    return titleMatch || descriptionMatch || tagsMatch;
  });
  
  
  // Determine data to display
  const FinalDataToDisplay = filteredData.length > 0 ? filteredData : sortedData;
  

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

            <Input
              placeholder="Search template and Components"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              width={{ base: "60%", md: "30%" }}
              borderRadius="md"
              borderColor="gray.200"
            />
          </HStack>

          {isLoading ? (
            <TempCompoLoader />
          ) : (
            <SimpleGrid columns={columns} spacing={4}>
              {FinalDataToDisplay.map((item, index) => (
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
                  description={item.description}
                  tags={item.tag}
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
