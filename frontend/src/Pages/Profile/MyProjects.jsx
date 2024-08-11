import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// Example data
const exampleProjects = [
  { id: 1, title: "Project One", description: "Description of Project One" },
  { id: 2, title: "Project Two", description: "Description of Project Two" },
  {
    id: 3,
    title: "Project Three",
    description: "Description of Project Three",
  },
  { id: 4, title: "Project Four", description: "Description of Project Four" },
  { id: 5, title: "Project Five", description: "Description of Project Five" },
  { id: 6, title: "Project Six", description: "Description of Project Six" },
  {
    id: 7,
    title: "Project Seven",
    description: "Description of Project Seven",
  },
  {
    id: 8,
    title: "Project Eight",
    description: "Description of Project Eight",
  },
  { id: 9, title: "Project Nine", description: "Description of Project Nine" },
  { id: 10, title: "Project Ten", description: "Description of Project Ten" },
  {
    id: 11,
    title: "Project Eleven",
    description: "Description of Project Eleven",
  },
  {
    id: 12,
    title: "Project Twelve",
    description: "Description of Project Twelve",
  },
  {
    id: 13,
    title: "Project Thirteen",
    description: "Description of Project Thirteen",
  },
  {
    id: 14,
    title: "Project Fourteen",
    description: "Description of Project Fourteen",
  },
  {
    id: 15,
    title: "Project Fifteen",
    description: "Description of Project Fifteen",
  },
  {
    id: 16,
    title: "Project Sixteen",
    description: "Description of Project Sixteen",
  },
  {
    id: 17,
    title: "Project Seventeen",
    description: "Description of Project Seventeen",
  },
  {
    id: 18,
    title: "Project Eighteen",
    description: "Description of Project Eighteen",
  },
  {
    id: 19,
    title: "Project Nineteen",
    description: "Description of Project Nineteen",
  },
  {
    id: 20,
    title: "Project Twenty",
    description: "Description of Project Twenty",
  },
];

const ITEMS_PER_PAGE = 5;

const MyProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(exampleProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = exampleProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const motionBoxBg = useColorModeValue("gray.50", "gray.700");
  const boxBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      width="100%"
      minHeight="100vh"
    //   mt={{ base: "1%", md: "0%" }}
      px={{ base: 4, md: 0 }}
    >
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
              >
                <Heading size="md" mb={2}>
                  {project.title}
                </Heading>
                <Text>{project.description}</Text>
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
