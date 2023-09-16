import { React, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Input,
  Spacer,
  MenuDivider,
  VStack,
  Image,
} from "@chakra-ui/react";
import logoImg from "../../logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { BsBook, BsGlobe2 } from "react-icons/bs";
import { FiSun } from "react-icons/fi";

const navLinks = [
  { name: "About", path: "#" },
  { name: "Blog", path: "#" },
  { name: "Features", path: "#" },
];

const dropdownLinks = [
  {
    name: "Trending Projects",
    path: "#",
    icon: MdTimeline,
  },
  {
    name: "Tech Stack",
    path: "#",
    icon: BsGlobe2,
  },
  {
    name: "Open Source",
    path: "#",
    icon: BsBook,
  },
];

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuProps = {
    bg: useColorModeValue("gray.200", "gray.700"),
    color: useColorModeValue("blue.400", "blue.200"),
  };

  //   const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  //   };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  return (
    <Box
      px={4}
      boxShadow="lg"
      width="100%"
      bg={useColorModeValue("gray.100", "gray.700")}
      top="0"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW={800}
        mx="auto"
      >
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={["inherit", "inherit", "none"]}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          {/* <Avatar
            href="#"
            as={Link}
            size="sm"
            showBorder={true}
            borderColor="blue.400"
            rounded="full"
            src="https://avatars2.githubusercontent.com/u/37842853?v=4"
          /> */}
          <Link href="/" w={{ base: "12rem", md: "18rem" }}>
            <Image
              alt="ReadMeMaker Logo"
              //   w={"80%"}
              //   h={14}
              src={logoImg}
              rounded={50}
            />
          </Link>
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
          <HStack
            as="nav"
            spacing={1}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
            {/* Dropdown Menu */}
            <Menu autoSelect={false} isLazy>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="sm"
                    px={3}
                    py={1}
                    lineHeight="inherit"
                    fontSize="1em"
                    fontWeight="normal"
                    rounded="md"
                    height="auto"
                    _hover={{ color: "blue.400", bg: menuProps.bg }}
                  >
                    <Flex alignItems="center">
                      <Text>Links</Text>
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition="all .25s ease-in-out"
                        transform={isOpen ? "rotate(180deg)" : ""}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList
                    zIndex={5}
                    // bg={useColorModeValue(
                    //   "rgb(255, 255, 255)",
                    //   "rgb(26, 32, 44)"
                    // )}
                    border="none"
                    // boxShadow={useColorModeValue(
                    //   "2px 4px 6px 2px rgba(160, 174, 192, 0.6)",
                    //   "2px 4px 6px 2px rgba(9, 17, 28, 0.6)"
                    // )}
                  >
                    {dropdownLinks.map((link, index) => (
                      <MenuLink
                        key={index}
                        name={link.name}
                        path={link.path}
                        icon={link.icon}
                        onClose={onClose}
                      />
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </HStack>
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
          <Spacer />
        </HStack>
        <IconButton aria-label="Color Switcher" icon={<FiSun />} />
      </Flex>
      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={["inherit", "inherit", "none"]}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

function NavLink({ name, path, onClose }) {
  const link = {
    bg: useColorModeValue("gray.200", "gray.700"),
    color: useColorModeValue("blue.500", "blue.200"),
  };

  return (
    <Link
      href={path}
      px={3}
      py={1}
      lineHeight="inherit"
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: link.bg,
        color: link.color,
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
}

function MenuLink({ name, path, icon, onClose }) {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem
        _hover={{
          color: "blue.400",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        <HStack>
          <Icon as={icon} size={18} color="blue.400" />
          <Text>{name}</Text>
        </HStack>
      </MenuItem>
    </Link>
  );
}

export default Navbar;
