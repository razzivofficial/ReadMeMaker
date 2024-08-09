import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  Text,
  useDisclosure,
  FormLabel,
  Heading,
  Avatar,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import EditDescriptionModal from "./EditDescriptionModal";
import AvatarSelectionModal from "./AvatarSelectionModal"; // Ensure this is imported

const MotionBox = motion(Box);

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("path_to_default_avatar"); // Default avatar
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAvatarOpen,
    onOpen: onAvatarOpen,
    onClose: onAvatarClose,
  } = useDisclosure();
  const { useremail } = useParams();
  const [localmail, setLocalmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast.warning("Login First");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const localEmail = localStorage.getItem("userEmail");
    if (localEmail) {
      setLocalmail(localEmail);
    }
  }, []);

  useEffect(() => {
    if (useremail) {
      setEmail(useremail);
    }
  }, [useremail]);

  useEffect(() => {
    if (email) {
      axios
        .get(
          `https://readmemaker-backend.vercel.app/users/getdetailbyemail/${email}`
        )
        .then((response) => {
          setName(response.data.name);
          setUsername(response.data.username);
          setDescription(response.data.description);
          setAvatar(response.data.avatar || "path_to_default_avatar"); // Load avatar
        })
        .catch((error) => {
          console.error("There was an error fetching the user details!", error);
        });
    }
  }, [email]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditToggle1 = () => {
    setIsEditing1(!isEditing1);
  };

  const handleChangePassword = async () => {
    if (newPassword === retypePassword) {
      try {
        const response = await fetch(
          "https://readmemaker-backend.vercel.app/users/updatePassword",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              currentPassword,
              newPassword,
            }),
          }
        );

        const data = await response.json();
        setCurrentPassword("");
        setNewPassword("");
        setRetypePassword("");
        if (response.ok) {
          toast.success(`Password changed: ${data.message}`);
        } else {
          toast.error(`Error changing password: ${data.error}`);
        }
      } catch (error) {
        toast.error("Error changing password: An unexpected error occurred.");
      }
    } else {
      toast.error("Passwords do not match.");
    }
  };

  const handleUpdate = async (field) => {
    try {
      const endpoint =
        field === "username"
          ? `https://readmemaker-backend.vercel.app/users/updateUsername/${email}`
          : `https://readmemaker-backend.vercel.app/users/updatename/${email}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [field]: field === "username" ? username : name,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } updated successfully`
        );
        field === "username" ? setIsEditing(false) : setIsEditing1(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(`Failed to update ${field}`);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `https://readmemaker-backend.vercel.app/users/deleteAccount/${email}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Account deleted successfully");
        // Redirect or perform any other action after account deletion
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

const handleAvatarSelection = async (selectedAvatar) => {
    try {
        const response = await fetch("https://readmemaker-backend.vercel.app/users/updateAvatar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`, // Ensure token is correct if used
            },
            body: JSON.stringify({ email, avatar: selectedAvatar }),
        });

        // Check if the response is not in JSON format and handle it
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Expected JSON, but received: ${text}`);
        }

        const result = await response.json();

        if (response.ok) {
            toast.success("Avatar updated successfully");
            setAvatar(selectedAvatar); // Update state with the new avatar
        } else {
            console.error('Error response:', result); // Log error response for debugging
            toast.error(result.error || "Failed to update avatar");
        }
    } catch (error) {
        console.error('Error caught:', error); // Log error for debugging
        toast.error("Failed to update avatar: An unexpected error occurred.");
    }
};


  return (
    <Box
      position="relative"
      width="100%"
      height="100vh"
      marginTop="-80px"
      marginBottom="250px"
    >
      <Box
        position="absolute"
        top="-40"
        left="0"
        width="100%"
        height="50%"
        bgImage="url('https://image.slidesdocs.com/responsive-images/background/line-professional-frame-blue-square-shape-business-powerpoint-background_9c874dd0f4__960_540.jpg')"
        bgSize="cover"
        bgPosition="center"
      />
      <VStack spacing={6} mt="20%">
        <MotionBox
          p={6}
          bg="gray.100"
          borderRadius="lg"
          boxShadow="lg"
          w="80%"
          maxW="4xl"
          mx="auto"
          zIndex="1"
          position="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HStack align="start" spacing={6}>
            <Avatar
              size="2xl"
              name={name}
              src={avatar}
              cursor="pointer"
              onClick={onAvatarOpen}
              borderWidth={2}
              borderColor="teal.500"
            />
            <VStack align="start" spacing={4} w="full">
              <FormControl id="name">
                <FormLabel>
                  Name
                  {localmail === email && (
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={handleEditToggle1}
                      variant="ghost"
                    />
                  )}
                </FormLabel>
                <Input
                  value={name}
                  isReadOnly={!isEditing1}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  bg={isEditing1 ? "white" : "gray.200"}
                />
                {isEditing1 && (
                  <Button
                    mt={2}
                    colorScheme="blue"
                    onClick={() => {
                      handleUpdate("name");
                      setIsEditing1(false);
                    }}
                  >
                    Update Name
                  </Button>
                )}
              </FormControl>

              <FormControl id="username">
                <FormLabel display="flex" alignItems="center">
                  Username
                  {localmail === email && (
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={handleEditToggle}
                      variant="ghost"
                    />
                  )}
                </FormLabel>
                <Input
                  value={username}
                  isReadOnly={!isEditing}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  bg={isEditing ? "white" : "gray.200"}
                />
                {isEditing && (
                  <Button
                    mt={2}
                    colorScheme="blue"
                    onClick={() => {
                      handleUpdate("username");
                      setIsEditing(false);
                    }}
                  >
                    Update Username
                  </Button>
                )}
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  isReadOnly
                  bg="gray.300"
                  placeholder="readmemaker@gmail.com"
                />
              </FormControl>

              <FormControl id="description">
                <FormLabel display="flex" alignItems="center">
                  Description
                  {localmail === email && (
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={onOpen}
                      variant="ghost"
                    />
                  )}
                </FormLabel>
                <Text bg="gray.100" p={2} borderRadius="md" w="full">
                  {description}
                </Text>
              </FormControl>

              <EditDescriptionModal
                isOpen={isOpen}
                onClose={onClose}
                email={email}
                description={description}
                setDescription={setDescription}
              />
            </VStack>
          </HStack>
        </MotionBox>
        {localmail === email && (
          <>
            <MotionBox
              p={6}
              bg="blue.50"
              borderRadius="lg"
              boxShadow="lg"
              w="full"
              maxW="4xl"
              mx="auto"
              zIndex="1"
              position="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Heading as="h2" size="md" mb={4}>
                Change Password
              </Heading>

              <FormControl id="current-password" mb={4}>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </FormControl>

              <FormControl id="new-password" mb={4}>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
              </FormControl>

              <FormControl id="retype-password" mb={4}>
                <FormLabel>Retype New Password</FormLabel>
                <Input
                  type="password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  placeholder="Retype your new password"
                />
              </FormControl>

              <Button colorScheme="teal" onClick={handleChangePassword}>
                Change Password
              </Button>
            </MotionBox>
            <MotionBox
              p={6}
              bg="red.100"
              borderRadius="lg"
              boxShadow="lg"
              w="full"
              maxW="4xl"
              mx="auto"
              zIndex="1"
              position="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Heading as="h2" size="md" mb={4}>
                Delete My Account
              </Heading>
              <Button colorScheme="red" onClick={handleDeleteAccount}>
                Delete My Account
              </Button>
            </MotionBox>
          </>
        )}
        <AvatarSelectionModal
          isOpen={isAvatarOpen}
          onClose={onAvatarClose}
          onSelectAvatar={handleAvatarSelection} // Pass the correct function
        />
      </VStack>
    </Box>
  );
};

export default ProfilePage;
