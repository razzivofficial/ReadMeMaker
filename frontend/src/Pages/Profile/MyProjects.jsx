import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const MotionBox = motion(Box);

const ITEMS_PER_PAGE = 5;

const MyProjectsSection = ({ email }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voteStatus, setVoteStatus] = useState({});

  const userId = localStorage.getItem("userId");

  // Fetch data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://readmemaker-backend.vercel.app/editor/geteditorbyemail/${email}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data.editors || []); // Ensure projects is always an array

        // Initialize voteStatus for each project
        const initialVoteStatus = {};
        data.editors.forEach((project) => {
          initialVoteStatus[project._id] = {
            upvoteClicked: false,
            downvoteClicked: false,
            upvotes: project.upvotes,
            downvotes: project.downvotes,
          };
        });
        setVoteStatus(initialVoteStatus);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); // Ensure projects is set to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [email]);

  // Check vote status for each project
  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        for (const project of projects) {
          const response = await fetch(
            `https://readmemaker-backend.vercel.app/editor/checkvotestatus?userId=${userId}&editorId=${project._id}`
          );
          const result = await response.json();
          setVoteStatus((prevState) => ({
            ...prevState,
            [project._id]: {
              ...prevState[project._id],
              upvoteClicked: result.hasUpvoted,
              downvoteClicked: result.hasDownvoted,
            },
          }));
        }
      } catch (error) {
        console.error("Error checking vote status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projects.length > 0) {
      checkVoteStatus();
    }
  }, [userId, projects]);

  // Sort projects by the difference between upvotes and downvotes
  const sortedProjects = projects.slice().sort((a, b) => {
    const diffA = a.upvotes - a.downvotes;
    const diffB = b.upvotes - b.downvotes;
    return diffB - diffA; // Descending order
  });

  const totalPages = Math.ceil(sortedProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = sortedProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpvote = async (projectId) => {
    try {
      const response = await fetch(
        `https://readmemaker-backend.vercel.app/editor/upvoteeditor`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, editorId: projectId }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setVoteStatus((prevState) => {
          const project = prevState[projectId];
          return {
            ...prevState,
            [projectId]: {
              ...project,
              upvoteClicked: result.message === "Upvote recorded",
              downvoteClicked:
                result.message === "Upvote recorded"
                  ? false
                  : project.downvoteClicked,
              upvotes:
                result.message === "Upvote recorded"
                  ? project.upvotes + 1
                  : project.upvotes - 1,
              downvotes:
                project.downvoteClicked && result.message === "Upvote recorded"
                  ? project.downvotes - 1
                  : project.downvotes,
            },
          };
        });
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async (projectId) => {
    try {
      const response = await fetch(
        `https://readmemaker-backend.vercel.app/editor/downvoteeditor`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, editorId: projectId }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setVoteStatus((prevState) => {
          const project = prevState[projectId];
          return {
            ...prevState,
            [projectId]: {
              ...project,
              downvoteClicked: result.message === "Downvote recorded",
              upvoteClicked:
                result.message === "Downvote recorded"
                  ? false
                  : project.upvoteClicked,
              downvotes:
                result.message === "Downvote recorded"
                  ? project.downvotes + 1
                  : project.downvotes - 1,
              upvotes:
                project.upvoteClicked && result.message === "Downvote recorded"
                  ? project.upvotes - 1
                  : project.upvotes,
            },
          };
        });
      }
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  const motionBoxBg = useColorModeValue("gray.50", "gray.700");
  const boxBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box width="100%" px={{ base: 4, md: 0 }}>
      <VStack spacing={8}>
        <MotionBox
          p={8}
          bg={motionBoxBg}
          borderRadius="xl"
          boxShadow="xl"
          w={{ base: "100%", md: "80%" }}
          maxW="6xl"
          mx="auto"
          zIndex="1"
          position="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h2" size="lg" mb={6} color={textColor}>
            My Projects
          </Heading>
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <Box
                key={project._id}
                p={4}
                bg={boxBg}
                borderRadius="md"
                shadow="md"
                mb={4}
                display="flex"
                flexDirection={{ base: "column", md: "row" }} // Stack vertically on small screens
                justifyContent="space-between"
                alignItems="center"
              >
                {/* <Box flex="1" mb={{ base: 4, md: 0 }}> */}
                <Box flex="1">
                  <Heading size="md" mb={2}>
                    {project.title}
                  </Heading>
                  <Text m={1}>{project.description}</Text>
                </Box>
                <HStack
                  spacing={{ base: 2, md: 4 }} // Adjust spacing for different screen sizes
                  ml={{ base: 0, md: 4 }} // No margin on small screens
                  wrap="wrap" // Allow items to wrap on small screens
                >
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Upvote"
                      icon={<FaThumbsUp />}
                      variant={
                        voteStatus[project._id]?.upvoteClicked
                          ? "solid"
                          : "outline"
                      }
                      colorScheme="green"
                      onClick={() => handleUpvote(project._id)}
                      isDisabled={voteStatus[project._id]?.downvoteClicked}
                      size={{ base: "sm", md: "md" }} // Responsive size
                    />
                    <Text color={textColor}>
                      {voteStatus[project._id]?.upvotes || 0}
                    </Text>
                  </HStack>

                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Downvote"
                      icon={<FaThumbsDown />}
                      variant={
                        voteStatus[project._id]?.downvoteClicked
                          ? "solid"
                          : "outline"
                      }
                      colorScheme="red"
                      onClick={() => handleDownvote(project._id)}
                      isDisabled={voteStatus[project._id]?.upvoteClicked}
                      size={{ base: "sm", md: "md" }} // Responsive size
                    />
                    <Text color={textColor}>
                      {voteStatus[project._id]?.downvotes || 0}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            ))
          ) : (
            <Text>No projects available.</Text>
          )}
          <HStack spacing={4} mt={6} justify="center">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Text>
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </HStack>
        </MotionBox>
      </VStack>
    </Box>
  );
};

export default MyProjectsSection;
