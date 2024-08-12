import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const EditDescriptionModal = ({
  isOpen,
  onClose,
  email,
  description,
  setDescription,
}) => {
  const [newDescription, setNewDescription] = useState(description);
  const toast = useToast();

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://readmemaker-backend.vercel.app/users/updateDescription/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: newDescription }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDescription(newDescription);
        toast({
          title: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating description",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Description</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontSize="sm" color="gray.600">
              Update the description below and click 'Save' to apply the
              changes.
            </Text>
          </Box>
          <Textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter new description"
            size="md"
            resize="vertical"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditDescriptionModal;
