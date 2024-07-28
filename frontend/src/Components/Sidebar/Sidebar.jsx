import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { Link as ScrollLink } from "react-scroll";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Sidebar = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      as="nav"
      position={{ base: "relative", md: "sticky" }}
      top="4rem"
      w={{ base: "full", md: "25%" }}
    >
      <HStack
        justifyContent="space-between"
        display={{ base: "flex", md: "none" }}
        bg="white"
        p={4}
        shadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Documentation
        </Text>
        {/* <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={toggleSidebar}
        /> */}
      </HStack>
      <Collapse in={isOpen || { base: false, md: true }} animateOpacity>
        <VStack
          align="flex-start"
          spacing={4}
          p={4}
          bg="white"
          shadow="md"
          rounded="md"
        >
          {sections.map((section, index) => (
            <Box key={index} w="100%">
              <ScrollLink
                to={`section-${index}`}
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer"
              >
                <Text
                  _hover={{ color: "teal.500", cursor: "pointer" }}
                  fontSize="lg"
                  fontWeight="bold"
                >
                  {section.title}
                </Text>
              </ScrollLink>
              {section.subtopics && (
                <VStack align="flex-start" spacing={2} pl={4} mt={2}>
                  {section.subtopics.map((subtopic, subIndex) => (
                    <ScrollLink
                      key={subIndex}
                      to={`section-${index}-${subIndex}`}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      className="cursor-pointer"
                    >
                      <Text
                        _hover={{ color: "teal.500", cursor: "pointer" }}
                        fontSize="md"
                      >
                        {subtopic.title}
                      </Text>
                    </ScrollLink>
                  ))}
                </VStack>
              )}
            </Box>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Sidebar;
