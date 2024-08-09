import React from "react";
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
} from "@chakra-ui/react";

const AvatarSelectionModal = ({ isOpen, onClose, onSelectAvatar }) => {
  const avatars = [
    "",
    "../../MediaFiles/avatar1.png",
    "../../MediaFiles/avatar2.png",
    "../../MediaFiles/avatar3.png",
    "../../MediaFiles/avatar4.png",
    "../../MediaFiles/avatar5.png",
    "../../MediaFiles/avatar6.png",
    "../../MediaFiles/avatar7.png",
    "../../MediaFiles/avatar8.png",
    "../../MediaFiles/avatar9.png",
    "../../MediaFiles/avatar10.png",
    "../../MediaFiles/avatar11.png",
    "../../MediaFiles/avatar12.png",
    "../../MediaFiles/avatar13.png",
    "../../MediaFiles/avatar14.png",
    "../../MediaFiles/avatar15.png",
    "../../MediaFiles/avatar16.png",
    "../../MediaFiles/avatar16.png",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        bg={useColorModeValue("gray.100", "gray.800")}
        boxShadow="xl"
        borderRadius="lg"
        p={6} // Add padding for better spacing
      >
        <ModalHeader>Select Your Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} // Responsive grid
            gap={4}
          >
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                src={avatar}
                size="lg" // Adjust size for better responsiveness
                cursor="pointer"
                borderWidth={2}
                borderColor="transparent"
                _hover={{ borderColor: "teal.500" }}
                onClick={() => onSelectAvatar(avatar)}
              />
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarSelectionModal;
