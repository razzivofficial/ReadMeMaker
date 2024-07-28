import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Code,
  List,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";

const documentation = [
  {
    title: "Introduction",
    content: `
      Welcome to the documentation! This section will help you get started with our API.
    `,
    code: `
    const greet = () => {
      console.log("Hello, World!");
    }
    greet();
    `,
    image: "https://via.placeholder.com/600x200",
    list: ["Getting Started", "Installation", "Basic Usage"],
    subtopics: [
      {
        title: "Overview",
        content: `
          This is the overview of the Introduction.
        `,
        code: `
        console.log("Overview of Introduction");
        `,
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Setup",
        content: `
          This is the setup guide for the Introduction.
        `,
        code: `
        console.log("Setup guide for Introduction");
        `,
        image: "https://via.placeholder.com/600x200",
      },
    ],
  },
  {
    title: "Authentication",
    content: `
      To use our API, you need to authenticate yourself. Use the API key provided to you.
    `,
    code: `
    const apiKey = "your-api-key";
    fetch("https://api.example.com/data", {
      headers: {
        "Authorization": \`Bearer \${apiKey}\`
      }
    });
    `,
    image: "https://via.placeholder.com/600x200",
    subtopics: [
      {
        title: "API Key",
        content: `
          Information about API Keys.
        `,
        code: `
        const apiKey = "your-api-key";
        `,
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "OAuth",
        content: `
          Information about OAuth authentication.
        `,
        code: `
        console.log("OAuth authentication");
        `,
        image: "https://via.placeholder.com/600x200",
      },
    ],
  },
  {
    title: "Endpoints",
    content: `
      Here are the available endpoints:
    `,
    table: {
      headers: ["Endpoint", "Description"],
      rows: [
        ["/api/v1/users", "Get all users"],
        ["/api/v1/users/:id", "Get user by ID"],
        ["/api/v1/users", "Create new user"],
      ],
    },
  },
];

const Documentation = () => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.900", "white");

  return (
    <Flex
      className="min-h-screen"
      bg={useColorModeValue("gray.50", "gray.900")}
      p={4}
      mt={16}
      direction={{ base: "column", md: "row" }}
    >
      <Sidebar sections={documentation} />
      <Box
        w={{ base: "100%", md: "75%" }}
        p={4}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 4 }}
        bg={bg}
        shadow="md"
        rounded="md"
      >
        {documentation.map((doc, index) => (
          <Box key={index} id={`section-${index}`} mb={8}>
            <Heading as="h2" size="lg" mb={4} color={textColor}>
              {doc.title}
            </Heading>
            <Text mb={4} color={textColor}>
              {doc.content}
            </Text>
            {doc.image && <Image src={doc.image} alt={doc.title} mb={4} />}
            {doc.list && (
              <List spacing={3} mb={4}>
                {doc.list.map((item, idx) => (
                  <ListItem key={idx} color={textColor}>
                    {item}
                  </ListItem>
                ))}
              </List>
            )}
            {doc.code && (
              <Box
                as="pre"
                p={4}
                bg="gray.900"
                color="white"
                rounded="md"
                overflow="auto"
                mb={4}
              >
                <Code p={0} display="block" whiteSpace="pre-wrap">
                  {doc.code.trim()}
                </Code>
              </Box>
            )}
            {doc.table && (
              <Table variant="simple" mb={4}>
                <Thead>
                  <Tr>
                    {doc.table.headers.map((header, idx) => (
                      <Th key={idx} color={textColor}>
                        {header}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {doc.table.rows.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <Td key={cellIndex} color={textColor}>
                          {cell}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {doc.subtopics &&
              doc.subtopics.map((subtopic, subIndex) => (
                <Box
                  key={subIndex}
                  id={`section-${index}-${subIndex}`}
                  pl={4}
                  borderLeft="2px solid teal"
                  ml={2}
                  mb={8}
                >
                  <Heading as="h3" size="md" mb={4} color={textColor}>
                    {subtopic.title}
                  </Heading>
                  <Text mb={4} color={textColor}>
                    {subtopic.content}
                  </Text>
                  {subtopic.image && (
                    <Image src={subtopic.image} alt={subtopic.title} mb={4} />
                  )}
                  {subtopic.code && (
                    <Box
                      as="pre"
                      p={4}
                      bg="gray.900"
                      color="white"
                      rounded="md"
                      overflow="auto"
                      mb={4}
                    >
                      <Code p={0} display="block" whiteSpace="pre-wrap">
                        {subtopic.code.trim()}
                      </Code>
                    </Box>
                  )}
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default Documentation;
