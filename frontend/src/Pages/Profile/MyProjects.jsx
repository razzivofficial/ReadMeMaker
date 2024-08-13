import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";

const MotionBox = motion(Box);

const ITEMS_PER_PAGE = 5;

const MyProjectsSection = ({ email }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voteStatus, setVoteStatus] = useState({});
  const [projectToDelete, setProjectToDelete] = useState(null); // State for the project to delete
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hooks
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");



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
        setProjects(data.editors || []);

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
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [email]);

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

  const sortedProjects = projects.slice().sort((a, b) => {
    const diffA = a.upvotes - a.downvotes;
    const diffB = b.upvotes - b.downvotes;
    return diffB - diffA;
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

  const handleTitleClick = (project) => {
    navigate("/editor", {
      state: { markdown: project.markdown },
    });
  };

  const handleEdit = (project) => {
    navigate("/editor", {
      state: {
        markdown: project.markdown,
        projectId: project._id,
        projectTitle: project.title,
        projectDescription: project.description,
        projectTag: project.tag,
        projectType: project.type,
      },
    });
    console.log(project._id);
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(
        `https://readmemaker-backend.vercel.app/editor/deleteeditor/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Deleted project successfully")
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
        onClose();
      }
    } catch (error) {
      toast.error("Error deleting project:", error);
    }
  };

  const motionBoxBg = useColorModeValue("gray.50", "gray.700");
  const boxBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const deleteBtnClr = useColorModeValue("black", "white");

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
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box flex="1">
                  <Heading
                    size="md"
                    mb={2}
                    cursor="pointer"
                    onClick={() => handleTitleClick(project)}
                  >
                    {project.title}
                  </Heading>
                  <Text
                    m={1}
                    cursor="pointer"
                    onClick={() => handleTitleClick(project)}
                  >
                    {project.description}
                  </Text>
                </Box>
                <HStack
                  spacing={{ base: 2, md: 4 }}
                  ml={{ base: 0, md: 4 }}
                  wrap="wrap"
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
                      size={{ base: "sm", md: "md" }}
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
                      size={{ base: "sm", md: "md" }}
                    />
                    <Text color={textColor}>
                      {voteStatus[project._id]?.downvotes || 0}
                    </Text>
                  </HStack>
                  {localStorage.getItem('userEmail') === email && (
                    <HStack spacing={2}>
                      <Tooltip label="Edit Project" aria-label="Edit tooltip">
                        <IconButton
                          aria-label="Edit"
                          icon={<FaRegEdit />}
                          variant="outline"
                          colorScheme="blue"
                          size={{ base: "sm", md: "md" }}
                          onClick={() => handleEdit(project)}
                        />
                      </Tooltip>
                    </HStack>
                  )}
                  {localStorage.getItem('userEmail') === email && (
                    <HStack spacing={2}>
                      <Tooltip label="Delete Project" aria-label="Delete tooltip">
                        <IconButton
                          aria-label="Delete"
                          icon={<RiDeleteBin2Line />}
                          variant="outline"
                          colorScheme={deleteBtnClr}
                          size={{ base: "sm", md: "md" }}
                          onClick={() => {
                            setProjectToDelete(project._id);
                            onOpen();
                          }}
                        />
                      </Tooltip>
                    </HStack>
                  )}




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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this project?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleDelete(projectToDelete)}
            >
              Confirm
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyProjectsSection;
