import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";

const MotionBox = motion(Box);

const MyProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Colors for light and dark mode
  const motionBoxBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  useEffect(() => {
    // Fetch projects data from API
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://api.example.com/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      mt={{ base: "20%", md: "10%" }}
      px={{ base: 4, md: 0 }}
    >
      <VStack spacing={8} px={{ base: 4, md: 0 }}>
        <MotionBox
          p={8}
          bg={motionBoxBg}
          borderRadius="xl"
          boxShadow="xl"
          w={{ base: "95%", md: "80%" }}
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
          {projects.length > 0 ? (
            projects.map((project) => (
              <Box
                key={project.id}
                p={4}
                bg="white"
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
        </MotionBox>
      </VStack>
    </Box>
  );
};

export default MyProjectsSection;
