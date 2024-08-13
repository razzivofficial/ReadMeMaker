import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { decodeEmail } from "../../utils/emailUtils";
import FollowedUsersModal from "./FollowedUsersModal";
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
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import ProfileLoader from "../../Components/Loader/ProfileLoader";
import { motion } from "framer-motion";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import EditDescriptionModal from "./EditDescriptionModal";
import AvatarSelectionModal from "./AvatarSelectionModal";
import MyProjectsSection from "./MyProjects";
import avatar1 from "../../MediaFiles/avatar1.jpg";
import avatar2 from "../../MediaFiles/avatar2.jpg";
import avatar3 from "../../MediaFiles/avatar3.jpg";
import avatar4 from "../../MediaFiles/avatar4.jpg";
import avatar5 from "../../MediaFiles/avatar5.jpg";
import avatar6 from "../../MediaFiles/avatar6.jpg";
import avatar7 from "../../MediaFiles/avatar7.jpg";
import avatar8 from "../../MediaFiles/avatar8.jpg";

const MotionBox = motion(Box);

const generateUniqueUsername = (name, email) => {
  const timestamp = new Date().getTime();
  const randomChars = Math.random().toString(36).substring(2, 8);
  const baseUsername = `${name.replace(
    /\s+/g,
    ""
  )}_${timestamp}_${randomChars}`;

  // Generate username using name and email to make it unique
  const uniqueUsername = `${baseUsername}_${email.split("@")[0]}`;
  return uniqueUsername;
};

const checkAndGenerateUsername = async (email, username, name) => {
  try {
    const response = await fetch(
      `https://readmemaker-backend.vercel.app/users/checkUsername/${username}`,
      { method: "GET" }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.exists) {
        // Username exists, generate a new one
        const newUsername = generateUniqueUsername(name, email);
        return newUsername;
      }
    } else {
      throw new Error("Failed to check username availability.");
    }
  } catch (error) {
    console.error(error);
    return null; // Handle error appropriately
  }
};

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
  let { useremail } = useParams();
  const [localmail, setlocalmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  const {
    isOpen: isFollowedUsersModalOpen,
    onOpen: openFollowedUsersModal,
    onClose: closeFollowedUsersModal,
  } = useDisclosure();

  const userId = localStorage.getItem("userId");

  const [followedUserId, setFollowedId] = useState("");

  useremail = decodeEmail(useremail);

  const [isLoading, setIsLoading] = useState(true);

  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
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
          setFollowedId(response.data._id);
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
    if (currentPassword === newPassword) {
      toast.warning("new password and current password do not same");
    }
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
      let finalUsername = username;

      if (username === "") {
        finalUsername = await checkAndGenerateUsername(email, username, name);
        if (!finalUsername) {
          toast.error("Failed to generate a unique username.");
          return;
        }
      }

      try {
        const response = await fetch(
          `https://readmemaker-backend.vercel.app/users/updateUsername/${email}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: finalUsername }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          toast.success("Username updated successfully");
          setUsername(finalUsername);
          setIsEditing(false);
        } else {
          toast.error(result.error);
          return; // Exit if the first update fails
        }

        // Handle the second fetch call for updating the username in the Editor model
        const editorResponse = await fetch(
          `https://readmemaker-backend.vercel.app/editor/updateusername`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, username: finalUsername }),
          }
        );
        const editorResult = await editorResponse.json();
        if (editorResponse.ok) {
          // toast.success("Username updated in the editor successfully");
        } else {
          toast.error(editorResult.error);
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
        `https://readmemaker-backend.vercel.app/users/deleteaccount/${email}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      if (response.ok) {
        localStorage.removeItem("authToken");
        toast.success("Account deleted successfully");
        navigate("/");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await fetch(
          `https://readmemaker-backend.vercel.app/users/getfollowed/${userId}`
        );
        const followedUsers = await response.json();
        const isFollowing = followedUsers.some(
          (user) => user._id === followedUserId
        );
        setIsFollowed(isFollowing);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollowStatus();
  }, [userId, followedUserId]);

  const handleFollowToggle = async () => {
    try {
      const url = isFollowed
        ? `https://readmemaker-backend.vercel.app/users/removefollow/${userId}/${followedUserId}`
        : `https://readmemaker-backend.vercel.app/users/follow/${userId}/${followedUserId}`;
      await fetch(url, { method: "PUT" });

      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error("Error toggling follow status:", error);
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
    <>
      {isLoading ? (
        <ProfileLoader />
      ) : (
        <>
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
                    <Flex
                      direction={{ base: "column", sm: "row" }}
                      align="center"
                      mt={4}
                      spacing={2}
                    >
                      {followedUserId !== userId && (
                        <Button
                          size={buttonSize}
                          colorScheme={isFollowed ? "red" : "blue"}
                          leftIcon={
                            isFollowed ? <FaUserCheck /> : <FaUserPlus />
                          }
                          onClick={handleFollowToggle}
                        >
                          {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                      )}
                      {localStorage.getItem("authToken") &&
                        followedUserId === userId && (
                          <Button
                            size={buttonSize}
                            colorScheme="teal"
                            ml={{ base: 0, sm: 2 }}
                            leftIcon={<MdGroupAdd />}
                            onClick={openFollowedUsersModal}
                          >
                            Following
                          </Button>
                        )}
                    </Flex>
                    <FollowedUsersModal
                      userId={userId}
                      isOpen={isFollowedUsersModalOpen}
                      onClose={closeFollowedUsersModal}
                    />
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
                        value={name || ""} // Ensure value is always a string
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
                          isDisabled={
                            (name || "").replace(/\s/g, "").length < 6
                          } // Handle undefined or null name
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
                        value={username || ""} // Ensure value is always a string
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
                          isDisabled={
                            (username || "").replace(/\s/g, "").length < 6
                          } // Handle undefined or null username
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
              <MyProjectsSection email={email}/>
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
                      <FormLabel fontWeight="bold">
                        Retype New Password
                      </FormLabel>
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
                          Are you sure you want to delete your account? This
                          action is irreversible.
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
        </>
      )}
    </>
  );
};

export default ProfilePage;
