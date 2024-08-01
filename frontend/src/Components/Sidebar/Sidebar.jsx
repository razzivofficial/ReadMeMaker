import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Collapse,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { Link as ScrollLink } from "react-scroll";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

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
      w={{ base: "full", md: "20%" }}
      zIndex={10}
      bg={useColorModeValue("gray.100", "gray.700")}
      rounded="md"
      shadow="md"
      p={4}
    >
      <HStack
        justifyContent="space-between"
        display={{ base: "flex", md: "none" }}
        onClick={toggleSidebar}
        cursor="pointer"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Documentation
        </Text>
        <IconButton
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          aria-label="Toggle Sidebar"
          variant="outline"
        />
      </HStack>
      <Collapse in={isOpen || { base: false, md: true }} animateOpacity>
        <VStack
          align="flex-start"
          spacing={4}
          mt={4}
          display={{ base: isOpen ? "block" : "none", md: "block" }}
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
