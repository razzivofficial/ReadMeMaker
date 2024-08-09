import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Button,
  Grid,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import avatar1 from "../../MediaFiles/avatar1.png";
import avatar2 from "../../MediaFiles/avatar2.png";
import avatar3 from "../../MediaFiles/avatar3.png";
import avatar4 from "../../MediaFiles/avatar4.png";
import avatar5 from "../../MediaFiles/avatar5.png";
import avatar6 from "../../MediaFiles/avatar6.png";
import avatar7 from "../../MediaFiles/avatar7.png";
import avatar8 from "../../MediaFiles/avatar8.png";
import avatar9 from "../../MediaFiles/avatar9.png";

const AvatarSelectionModal = ({ isOpen, onClose, onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
  ];

  const handleAvatarClick = (avatar, index) => {
    setSelectedAvatar({ avatar, index });
  };

  const confirmAvatarSelection = async () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      toast({
        title: "Authentication Error",
        description: "Email not found. Please log in again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(
        "https://readmemaker-backend.vercel.app/users/updateavatar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            avatar: `avatar${selectedAvatar.index + 1}`,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Avatar updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onSelectAvatar(selectedAvatar.avatar);
        navigate(`/profile/${email}`);
        onClose();
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update avatar. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        bg={useColorModeValue("gray.100", "gray.800")}
        boxShadow="lg"
        borderRadius="md"
        p={4}
        maxW={{ base: "90%", md: "lg" }}
      >
        <ModalHeader>Select Your Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(3, 1fr)" }}
            gap={4}
          >
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                src={avatar}
                size="lg"
                cursor="pointer"
                borderWidth={4}
                borderColor={
                  selectedAvatar?.index === index ? "blue.600" : "transparent"
                }
                _hover={{ borderColor: "blue.600" }}
                onClick={() => handleAvatarClick(avatar, index)}
                transition="border-color 0.2s ease"
              />
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={confirmAvatarSelection}
            disabled={!selectedAvatar}
          >
            Confirm Selection
          </Button>
          <Button onClick={onClose} ml={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarSelectionModal;
