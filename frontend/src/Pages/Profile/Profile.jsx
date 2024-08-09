import React, { useState, useEffect, useRef } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import EditDescriptionModal from "./EditDescriptionModal";
import AvatarSelectionModal from "./AvatarSelectionModal";
import avatar1 from "../../MediaFiles/avatar1.png";
import avatar2 from "../../MediaFiles/avatar2.png";
import avatar3 from "../../MediaFiles/avatar3.png";
import avatar4 from "../../MediaFiles/avatar4.png";
import avatar5 from "../../MediaFiles/avatar5.png";
import avatar6 from "../../MediaFiles/avatar6.png";
import avatar7 from "../../MediaFiles/avatar7.png";
import avatar8 from "../../MediaFiles/avatar8.png";
import avatar9 from "../../MediaFiles/avatar9.png";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useremail } = useParams();
  const [localmail, setlocalmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();

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

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const email = useremail;
      if (!email) {
        toast({
          title: "Error",
          description: "Email not found. Please log in again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        const response = await fetch(
          "https://readmemaker-backend.vercel.app/users/getavatar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          const avatarIndex = parseInt(data.avatar.replace("avatar", "")) - 1;
          setSelectedAvatar(avatars[avatarIndex]);
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch avatar.",
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

    fetchUserAvatar();
  }, [useremail]);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setIsModalOpen(false);
  };

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
      setlocalmail(localEmail);
    }
  }, []);

  useEffect(() => {
    if (useremail) {
      setEmail(useremail);
    }
  }, [useremail]);

  const handleAvatarClick = () => {
    if (useremail === localStorage.getItem("userEmail")) {
      setIsModalOpen(true);
    }
  };

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
    if (field === "username") {
      try {
        const response = await fetch(
          `https://readmemaker-backend.vercel.app/users/updateUsername/${email}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          toast.success("Username updated successfully");
          setIsEditing(false);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Failed to update Username");
      }
    }
    if (field === "name") {
      try {
        const response = await fetch(
          `https://readmemaker-backend.vercel.app/users/updatename/${email}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          toast.success("Name updated successfully");
          setIsEditing(false);
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("Failed to update Name");
      }
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
        navigate("/"); // Redirect to home or login page
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  const motionBoxBg1 = useColorModeValue("blue.50", "blue.800");
  const motionBoxBg2 = useColorModeValue("teal.50", "teal.800");
  const motionBoxBg3 = useColorModeValue("red.50", "red.800");
  const textColor1 = useColorModeValue("blue.600", "blue.300");
  const textColor2 = useColorModeValue("red.600", "red.300");
  const formInputBg = useColorModeValue("white", "gray.800");
  const emailInputBg = useColorModeValue("gray.100", "gray.600");
  const descriptionBg = useColorModeValue("gray.50", "gray.800");
  const borderColor1 = useColorModeValue("blue.600", "blue.300");
  const borderColor2 = useColorModeValue("blue.800", "blue.500");

  return (
    <Box
      position="relative"
      width="100%"
      minHeight="100vh"
      mt={{ base: "20%", md: "10%" }}
    >
      <VStack spacing={8} px={{ base: 4, md: 0 }}>
        <MotionBox
          p={8}
          bg={motionBoxBg1}
          borderRadius="xl"
          boxShadow="xl"
          w={{ base: "95%", md: "80%" }}
          maxW="6xl"
          mx="auto"
          zIndex="1"
          position="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h3" size="lg" mb={6} color={textColor1}>
            User Profile
          </Heading>
          <HStack
            align="start"
            spacing={8}
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack
              spacing={4}
              align="center"
              width={{ base: "100%", md: "auto" }}
            >
              <Avatar
                size="2xl"
                name={name}
                src={selectedAvatar}
                cursor="pointer"
                onClick={handleAvatarClick}
                borderWidth={4}
                borderColor={borderColor1}
                _hover={{ borderColor: borderColor2 }}
                boxShadow="lg"
              />
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                {name}
              </Text>
              <AvatarSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectAvatar={handleAvatarSelect}
              />
            </VStack>
            <VStack align="start" spacing={6} w="full">
              <FormControl id="name">
                <FormLabel fontWeight="bold">
                  Name
                  {localmail === email && (
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={handleEditToggle1}
                    />
                  )}
                </FormLabel>
                <Input
                  value={name}
                  isReadOnly={!isEditing1}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  bg={formInputBg}
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
                <FormLabel fontWeight="bold">
                  Username
                  {localmail === email && (
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={handleEditToggle}
                    />
                  )}
                </FormLabel>
                <Input
                  value={username}
                  isReadOnly={!isEditing}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  bg={formInputBg}
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
                <FormLabel fontWeight="bold">Email</FormLabel>
                <Input
                  value={email}
                  isReadOnly
                  bg={emailInputBg}
                  placeholder="your-email@example.com"
                />
              </FormControl>

              <FormControl id="description">
                <FormLabel fontWeight="bold">
                  Description
                  {localmail === email && (
                    <IconButton
                      ml={2}
                      size="sm"
                      icon={<EditIcon />}
                      onClick={onOpen}
                    />
                  )}
                </FormLabel>
                <Text bg={descriptionBg} p={3} borderRadius="md" w="full">
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
              p={8}
              bg={motionBoxBg2}
              borderRadius="xl"
              boxShadow="xl"
              w={{ base: "95%", md: "80%" }}
              maxW="6xl"
              mx="auto"
              zIndex="1"
              position="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Heading as="h2" size="lg" mb={6}>
                Change Password
              </Heading>

              <FormControl id="current-password" mb={4}>
                <FormLabel fontWeight="bold">Current Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </FormControl>

              <FormControl id="new-password" mb={4}>
                <FormLabel fontWeight="bold">New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
              </FormControl>

              <FormControl id="retype-password" mb={4}>
                <FormLabel fontWeight="bold">Retype New Password</FormLabel>
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
              p={8}
              bg={motionBoxBg3}
              borderRadius="xl"
              boxShadow="xl"
              w={{ base: "95%", md: "80%" }}
              maxW="6xl"
              mx="auto"
              zIndex="1"
              position="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Heading as="h3" size="lg" mb={6} color={textColor2}>
                Account Deletion
              </Heading>
              <Button
                colorScheme="red"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete My Account
              </Button>
            </MotionBox>

            <AlertDialog
              isOpen={isDeleteDialogOpen}
              leastDestructiveRef={cancelRef}
              onClose={() => setIsDeleteDialogOpen(false)}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Account
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to delete your account? This action is
                    irreversible.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef}
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        handleDeleteAccount();
                        setIsDeleteDialogOpen(false);
                      }}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ProfilePage;
