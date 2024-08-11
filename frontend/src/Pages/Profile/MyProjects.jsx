import React, { useState } from "react";
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

// Example data with like and dislike counts
const initialProjects = [
  {
    id: 1,
    title: "Project One",
    description: "Description of Project One",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 2,
    title: "Project Two",
    description: "Description of Project Two",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 3,
    title: "Project Three",
    description: "Description of Project Three",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 4,
    title: "Project Four",
    description: "Description of Project Four",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 5,
    title: "Project Five",
    description: "Description of Project Five",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 6,
    title: "Project Five",
    description: "Description of Project Five",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 7,
    title: "Project Five",
    description: "Description of Project Five",
    likes: 0,
    dislikes: 0,
  },
  // Add more projects as needed...
];

const ITEMS_PER_PAGE = 5;

const MyProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState(initialProjects);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLike = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, likes: project.likes + 1 } : project
      )
    );
  };

  const handleDislike = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, dislikes: project.dislikes + 1 }
          : project
      )
    );
  };

  const motionBoxBg = useColorModeValue("gray.50", "gray.700");
  const boxBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box width="100%" minHeight="100vh" px={{ base: 4, md: 0 }}>
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
                key={project.id}
                p={4}
                bg={boxBg}
                borderRadius="md"
                shadow="md"
                mb={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box flex="1">
                  <Heading size="md" mb={2}>
                    {project.title}
                  </Heading>
                  <Text>{project.description}</Text>
                </Box>
                <HStack spacing={4} ml={4}>
                  <HStack spacing={1} align="center">
                    <IconButton
                      aria-label="Like"
                      icon={<FaThumbsUp />}
                      onClick={() => handleLike(project.id)}
                    />
                    <Text>{project.likes}</Text>
                  </HStack>
                  <HStack spacing={1} align="center">
                    <IconButton
                      aria-label="Dislike"
                      icon={<FaThumbsDown />}
                      onClick={() => handleDislike(project.id)}
                    />
                    <Text>{project.dislikes}</Text>
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
