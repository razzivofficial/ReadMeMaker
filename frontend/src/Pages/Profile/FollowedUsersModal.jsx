import React, { useState, useEffect } from 'react';
import { encodeEmail } from "../../utils/emailUtils";
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
  ModalCloseButton, Text, Spinner, VStack, Divider
} from '@chakra-ui/react';

const FollowedUsersModal = ({ userId, isOpen, onClose }) => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const response = await fetch(`https://readmemaker-backend.vercel.app/users/getfollowed/${userId}`);
        const data = await response.json();
        setFollowedUsers(data);
      } catch (error) {
        console.error('Error fetching followed users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchFollowedUsers();
    }
  }, [userId, isOpen]);

  const handleLinkClick = () => {
    if (onClose) {
      onClose(); // Close the modal
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg" fontWeight="bold" color="teal.500">
          Followed Users
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <VStack spacing={4} align="center">
              <Spinner size="xl" />
              <Text>Loading followed users...</Text>
            </VStack>
          ) : (
            <VStack spacing={4} align="start">
              {followedUsers.length > 0 ? (
                followedUsers.map(user => (
                  <VStack
                    key={user._id}
                    spacing={1}
                    align="start"
                    padding={2}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    backgroundColor="gray.50"
                  >
                    <Link to={`/profile/${encodeEmail(user.email)}`} onClick={handleLinkClick}>
                      <Text fontWeight="bold">{user.name}</Text>
                    </Link>
                    <Link to={`/profile/${encodeEmail(user.email)}`} onClick={handleLinkClick}>
                      <Text color="gray.600">@{user.username}</Text>
                    </Link>
                    <Divider />
                  </VStack>
                ))
              ) : (
                <Text textAlign="center" color="gray.500">
                  No followed users found.
                </Text>
              )}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FollowedUsersModal;
