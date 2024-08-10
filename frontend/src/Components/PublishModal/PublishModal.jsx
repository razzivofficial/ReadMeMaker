// ProjectModal.js
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

const PublishModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  const handleTagInput = (e) => {
    if ((e.key === "Enter" || e.key === " ") && tags.length < 4) {
      const newTag = e.target.value.trim();
      if (newTag.startsWith("#") && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    console.log("Project Title:", title);
    console.log("Description:", description);
    console.log("Tags:", tags);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Project Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel htmlFor="title">Project Title</FormLabel>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Tags</FormLabel>
            <Box mb={2} d="flex" flexWrap="wrap">
              {tags.map((tag, index) => (
                <Tag
                  size="sm"
                  key={index}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                  m={1}
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(tag)} />
                </Tag>
              ))}
              {tags.length < 4 && (
                <Input
                  type="text"
                  onKeyDown={handleTagInput}
                  placeholder="Type #tag and press enter"
                  size="sm"
                  variant="unstyled"
                  width="auto"
                  flex="1"
                />
              )}
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublishModal;
