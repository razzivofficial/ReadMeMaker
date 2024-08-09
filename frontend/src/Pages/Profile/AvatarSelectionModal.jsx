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
  const avatars = [
    "",
    "https://th-i.thgim.com/public/incoming/5b5wzr/article68500264.ece/alternates/FREE_1200/PTI08_05_2024_000314B.jpg",
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        bg={useColorModeValue("gray.100", "gray.800")}
        boxShadow="xl"
        borderRadius="lg"
        p={6}
      >
        <ModalHeader>Select Your Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
            gap={4}
          >
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                src={avatar}
                size="lg"
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
