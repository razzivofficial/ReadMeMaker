import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const PublishModal = ({ isOpen, onClose, markdownContent }) => {
  const email = localStorage.getItem("userEmail");
  const [type, setType] = useState("component");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [descriptionError, setDescriptionError] = useState("");
  const [titleError, setTitleError] = useState("");

  const location = useLocation();
  const {
    projectId,
    projectTitle,
    projectDescription,
    projectTag,
    projectType,
  } = location.state || {};

  useEffect(() => {
    if (projectId) {
      setTitle(projectTitle);
      setDescription(projectDescription);
      setTags(projectTag);
      setType(projectType);
    }
  }, [projectId, projectTitle, projectDescription, projectTag, projectType]);

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
      const tagPattern = /^#[a-zA-Z0-9-_]+$/; // Validates tags like #tag1, #tag-2, #tag_3
      if (
        newTag.startsWith("#") &&
        tagPattern.test(newTag) &&
        !tags.includes(newTag)
      ) {
        setTags([...tags, newTag]);
      } else if (!tagPattern.test(newTag)) {
        toast.error(
          "Invalid tag format. Tags should start with '#' and can include letters, numbers, dashes, and underscores only."
        );
      } else if (!newTag.startsWith("#")) {
        toast.error("Tag must start with '#'"); // Optionally, display an error message
      }
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const convertMarkdownToJsonFormat = (markdownContent) => {
    return markdownContent.replace(/\n/g, "\\n\\n");
  };

  const handleSubmit = async () => {
    if (title.trim() === "") {
      toast.error("Title is required.");
      return;
    }
    // Validate description length
    if (description.length < 10) {
      toast.error("Description must be at least 10 characters long.");
      return;
    }
    if (description.length > 100) {
      toast.error("Description cannot exceed 100 characters.");
      return;
    }

    try {
      if (projectId !== undefined) {
        const dataid = {
          title: title,
          description: description,
          tag: tags,
          type: type,
          markdown: markdownContent,
        };
        setTitle("");
        setDescription("");
        setTags([]);
        const res = await fetch(
          `https://readmemaker-backend.vercel.app/editor/updateeditor/${projectId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataid),
          }
        );
        if (res.ok) {
          toast.success("Edit successfully");
        } else {
          toast.error("Failed to Edit");
        }

        onClose();
      } else {
        const data = {
          type: type,
          username: username,
          email: email,
          avatar: avatar,
          title: title,
          description: description,
          tag: tags,
          markdown: markdownContent,
        };
        setTitle("");
        setDescription("");
        setTags([]);

        const response = await fetch(
          "https://readmemaker-backend.vercel.app/editor/addeditor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          toast.success("Published successfully");
        } 
        else if(username === undefined) {
          toast.error("Please add username to publish from profile");
        }
        else {
          toast.error("Failed to publish");
        }

        onClose();
      }
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
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                if (value.trim() === "") {
                  setTitleError("Title is required.");
                } else {
                  setTitleError(""); // Clear error if title is provided
                }
              }}
              placeholder="Enter project title"
              required
              style={{
                borderColor: titleError ? "red" : "initial",
                borderWidth: titleError ? "2px" : "1px",
              }}
            />
            {titleError && <FormErrorMessage>{titleError}</FormErrorMessage>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                setDescription(value);

                // Validate length
                if (value.length < 10) {
                  setDescriptionError(
                    "Description must be at least 10 characters long."
                  );
                } else if (value.length > 100) {
                  setDescriptionError(
                    "Description cannot exceed 100 characters."
                  );
                } else {
                  setDescriptionError(""); // Clear error if within range
                }
              }}
              placeholder="Enter project description"
              required
              minLength={10}
              maxLength={100}
              style={{
                borderColor: descriptionError ? "red" : "initial",
                borderWidth: descriptionError ? "2px" : "1px",
              }}
            />
            {descriptionError && (
              <FormErrorMessage>{descriptionError}</FormErrorMessage>
            )}
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
                <Box mb={2}>
                  <Radio value="template">Template</Radio>
                </Box>
                <Box>
                  <Radio value="component">Component</Radio>
                </Box>
              </Box>
            </RadioGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {projectId === undefined ? (
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Publish
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Edit
            </Button>
          )}

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublishModal;
