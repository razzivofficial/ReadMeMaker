import React, { useState,useEffect } from "react";
import axios from "axios";
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
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const PublishModal = ({ isOpen, onClose,markdownContent }) => {
  const email = localStorage.getItem("userEmail");
  const [type, setType] = useState("component"); 
  const [username,setUsername] = useState("");
  const [avatar,setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (email) {
      axios
        .get(
          `https://readmemaker-backend.vercel.app/users/getdetailbyemail/${email}`
        )
        .then((response) => {
          setUsername(response.data.username);
          setAvatar(response.data.avatar);
        })
        .catch((error) => {
          console.error("There was an error fetching the user details!", error);
        });
    }
  }, [email]);

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

  const convertMarkdownToJsonFormat = (markdownContent) => {
    // Replace new lines with `\n\n` for 
    return markdownContent.replace(/\n/g, '\\n\\n');
  };
  

  const handleSubmit = async () => {
    try {
      const data = {
        type:type,
        username:username,
        email:email,
        avatar:avatar,
        title:title,
        description:description,
        tag:tags,
        markdown: markdownContent, // Use the formatted markdown content
      };
      setTitle("")
      setDescription("")
      setTags([])
      
      const response = await fetch(
        "https://readmemaker-backend.vercel.app/editor/addeditor",
        {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if(response.ok){
        toast.success("Published successfully")
      }
      else{
        toast.error("Failed to publish")
      }
      
      onClose();
    } catch (error) {
      console.error("Error adding data:", error);
    }
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
          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <RadioGroup value={type} onChange={setType}>
              <Box d="flex" flexDirection="column">
                <Box mb={2}> {/* Add space between radio buttons */}
                  <Radio value="component">
                    Component
                  </Radio>
                </Box>
                <Box>
                  <Radio value="template">
                    Template
                  </Radio>
                </Box>
              </Box>
            </RadioGroup>
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
