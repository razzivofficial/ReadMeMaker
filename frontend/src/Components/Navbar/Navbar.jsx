import logoImg from "../../logo.png";
import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  VStack,
  Image,
  Input,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Link,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { CgMenuRound } from "react-icons/cg";

const IconButton = ({ children }) => {
  return (
    <Button
      padding="0.4rem"
      width="auto"
      height="auto"
      borderRadius="100%"
      bg="transparent"
      _hover={{ bg: "#f6f6f6" }}
    >
      {children}
    </Button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="fixed"
      top="0"
      bg={useColorModeValue("gray.100", "gray.700")}
      width="100%"
      zIndex="1"
    >
      <Container maxW="1280px" px={4} mx="auto">
        <HStack spacing={4}>
          <Image
            alt="ReadMeMaker Logo"
            w={"auto"}
            h={14}
            src={logoImg}
            rounded={50}
          />
          <Button display={{ base: "block", md: "none" }} onClick={toggleMenu}>
            <CgMenuRound className="text-2xl items-center" />
          </Button>
          <Input
            // display={{ base: "block", md: "block" }}
            display={"block"}
            maxW="30rem"
            placeholder="Search Templates"
            borderColor={useColorModeValue("gray.300", "white")}
            borderRadius="5px"
            d={{ base: "none", md: "block" }}
          />
          <Spacer />
          <HStack spacing={3}>
            {/* <Button
              w={20}
              color="#fff"
              rounded="md"
              bg="#3b49df"
              _hover={{ bg: "#1b28b3" }}
            >
              LogIn
            </Button> */}
            <Menu isLazy isOpen={isUserMenuOpen} onClose={toggleUserMenu}>
              <MenuButton size="sm" onClick={toggleUserMenu}>
                <Avatar
                  size="sm"
                  src={
                    "https://media.images.yourquote.in/user/large/0/0/0/88/9aLa1749.jpg"
                  }
                />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue("gray.700", "gray.100")}
                boxShadow="4px 4px 0"
              >
                <Link _hover={{ textDecoration: "none" }} isExternal>
                  <MenuItem>
                    <VStack justify="start" alignItems="left">
                      <Text fontWeight="500">Rajiv Lochan Dash</Text>
                      <Text size="sm" color="gray.500" mt="0 !important">
                        @razzivofficial
                      </Text>
                    </VStack>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="500">Dashboard</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Create Post</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Book Maarks</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Settings</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Text color={"red.600"} fontWeight="500">
                    Sign Out
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
