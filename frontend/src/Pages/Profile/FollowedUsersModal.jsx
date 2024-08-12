import React, { useState, useEffect } from "react";
// import { encodeEmail } from "../../utils/emailUtils";
import { Link } from "react-router-dom";
import {
  useColorMode,
  Box,
  Flex,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Spinner,
  Divider,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const FollowedUsersModal = ({ userId, isOpen, onClose }) => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const usersPerPage = 20; // Number of users to load per page
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const response = await fetch(
          `https://readmemaker-backend.vercel.app/users/getfollowed/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch followed users");
        }
        const data = await response.json();
        setFollowedUsers(data);
        setDisplayedUsers(data.slice(0, usersPerPage));
        setHasMore(data.length > usersPerPage);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchFollowedUsers();
    }
  }, [userId, isOpen]);

  const handleLoadMore = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      const nextUsers = followedUsers.slice(0, nextPage * usersPerPage);
      setDisplayedUsers(nextUsers);
      setHasMore(nextUsers.length < followedUsers.length);
      return nextPage;
    });
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose(); // Close the modal
    }
  };

  // Responsive size utility for the modal
  const modalSize = useBreakpointValue({ base: "full", sm: "md", lg: "xl" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "light" ? "white" : "gray.800"}
        color={colorMode === "light" ? "gray.800" : "white"}
        borderRadius="md"
        boxShadow="lg"
        overflow="hidden"
      >
        <ModalHeader
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="teal.500"
        >
          Followed Users
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading && followedUsers.length === 0 ? (
            <VStack spacing={4} align="center">
              <Spinner size="xl" />
              <Text>Loading followed users...</Text>
            </VStack>
          ) : error ? (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <VStack align="start">
                <AlertTitle>Failed to Load Data</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </VStack>
            </Alert>
          ) : displayedUsers.length > 0 ? (
            <VStack spacing={4} align="stretch">
              {displayedUsers.map((user) => (
                <Box
                  key={user._id}
                  padding={{ base: 2, md: 4 }}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
                  backgroundColor={
                    colorMode === "light" ? "gray.50" : "gray.900"
                  }
                >
                  <Flex direction="column" align="start">
                    <Link
                      to={`/profile/${user.email}`}
                      onClick={handleLinkClick}
                    >
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "md", md: "lg" }}
                      >
                        {user.name}
                      </Text>
                    </Link>
                    <Link
                      to={`/profile/${user.email}`}
                      onClick={handleLinkClick}
                    >
                      <Text
                        color={colorMode === "light" ? "gray.600" : "gray.400"}
                        fontSize={{ base: "sm", md: "sm" }}
                      >
                        @{user.username}
                      </Text>
                    </Link>
                  </Flex>
                </Box>
              ))}
              {hasMore && (
                <Button onClick={handleLoadMore} colorScheme="teal" mt={4}>
                  Load More
                </Button>
              )}
            </VStack>
          ) : (
            <Text
              textAlign="center"
              color={colorMode === "light" ? "gray.500" : "gray.300"}
              fontSize={{ base: "md", md: "lg" }}
            >
              No followed users found.
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FollowedUsersModal;
