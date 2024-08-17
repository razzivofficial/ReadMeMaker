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
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";

const documentation = [
  // {
  //   title: "Introduction",
  //   content:
  //     "Welcome to the documentation! This section will help you get started with our API.",
  //   code: `
  //     const greet = () => {
  //       console.log("Hello, World!");
  //     }
  //     greet();
  //   `,
  //   image: "https://via.placeholder.com/600x200",
  //   list: ["Getting Started", "Installation", "Basic Usage"],
  //   subtopics: [
  //     {
  //       title: "Overview",
  //       content: "This is the overview of the Introduction.",
  //       code: `
  //         console.log("Overview of Introduction");
  //       `,
  //       image: "https://via.placeholder.com/600x200",
  //     },
  //     {
  //       title: "Setup",
  //       content: "This is the setup guide for the Introduction.",
  //       code: `
  //         console.log("Setup guide for Introduction");
  //       `,
  //       image: "https://via.placeholder.com/600x200",
  //     },
  //   ],
  // },
  // {
  //   title: "Authentication",
  //   content:
  //     "To use our API, you need to authenticate yourself. Use the API key provided to you.",
  //   code: `
  //     const apiKey = "your-api-key";
  //     fetch("https://api.example.com/data", {
  //       headers: {
  //         "Authorization": \`Bearer \${apiKey}\`
  //       }
  //     });
  //   `,
  //   image: "https://via.placeholder.com/600x200",
  //   subtopics: [
  //     {
  //       title: "API Key",
  //       content: "Information about API Keys.",
  //       code: `
  //         const apiKey = "your-api-key";
  //       `,
  //       image: "https://via.placeholder.com/600x200",
  //     },
  //     {
  //       title: "OAuth",
  //       content: "Information about OAuth authentication.",
  //       code: `
  //         console.log("OAuth authentication");
  //       `,
  //       image: "https://via.placeholder.com/600x200",
  //     },
  //   ],
  // },
  // {
  //   title: "Endpoints",
  //   content: "Here are the available endpoints:",
  //   table: {
  //     headers: ["Endpoint", "Description"],
  //     rows: [
  //       ["/api/v1/users", "Get all users"],
  //       ["/api/v1/users/:id", "Get user by ID"],
  //       ["/api/v1/users", "Create new user"],
  //     ],
  //   },
  // },

  {
    title: "Introduction",
    content:
      "Namaste! Welcome to ReadMeMaker – your ultimate tool for crafting README files that sparkle on GitHub. Whether you're just starting out or you're a seasoned coder, our tool helps you create the perfect README in no time.",
    list: ["What is ReadMeMaker?", "Why use ReadMeMaker?", "Key Features"],
    subtopics: [
      {
        title: "What is ReadMeMaker?",
        content:
          "Think of ReadMeMaker as your README file’s best friend! It’s a web tool that helps you create GitHub README files with ease. Just pick your components and let us handle the rest.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Why use ReadMeMaker?",
        content:
          "A great README is like a warm cup of chai – comforting and impressive. ReadMeMaker makes your README informative and eye-catching, ensuring your project stands out in the GitHub crowd.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Key Features",
        content:
          "ReadMeMaker offers features designed to simplify README creation:",
        image: "https://via.placeholder.com/600x200",
      },
    ],
  },
  {
    title: "Getting Started",
    content: "Ready to jump in? Here’s how to get started with ReadMeMaker:",
    list: ["Installation", "Creating Your First README"],
    subtopics: [
      {
        title: "Installation",
        content:
          "No installation needed! Just head over to our website and start creating – it’s as simple as ordering your favorite snack online.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Creating Your First README",
        content:
          "Go to the main page --> Click 'Get Started' --> Select your components --> Download your shiny new README.",
        image: "https://via.placeholder.com/600x200",
        code: "console.log('Creating your first README with ReadMeMaker');",
      },
    ],
  },
  {
    title: "Features",
    content:
      "ReadMeMaker offers features designed to simplify README creation:",
    list: [
      "Customizable Components",
      "Live Preview",
      "Markdown Support",
      "Export Options",
    ],
    subtopics: [
      {
        title: "Customizable Components",
        content:
          "Start with 36 components. Log in to access pre-designed templates, use components from them, and even publish your own templates.  Less hassle searching through README files.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Live Preview",
        content:
          "See your README live as you build it. Instant feedback to make sure it looks just right.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Markdown Support",
        content:
          "Use Markdown or HTML to format your README. Easy styling with our editor.",
        image: "https://via.placeholder.com/600x200",
        code: "# Your Project Title\\n\\n## Description;",
      },
      {
        title: "Export Options",
        content: "Export your README by downloading the file itself.",
        image: "https://via.placeholder.com/600x200",
      },
    ],
  },
  {
    title: "FAQs",
    content: "Got questions? We’ve got answers!",
    list: [
      "Is ReadMeMaker free?",
      "Can I customize my README?",
      "How do I report bugs?",
    ],
    subtopics: [
      {
        title: "Is ReadMeMaker free?",
        content:
          "Yes, absolutely! Like a free sample at your favorite store, ReadMeMaker is completely free.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Can I customize my README?",
        content:
          "Of course! Customize it as you wish – from minimalistic to elaborate.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "How do I report bugs?",
        content:
          "Found a bug? Report it on our GitHub Issues page. We’re on it!",
        image: "https://via.placeholder.com/600x200",
        code: `
          const reportBug = () => { 
            window.open('https://github.com/razzivofficial/ReadMeMaker/issues');
          };
        `,
      },      
    ],
  },
  {
    title: "Contributing",
    content:
      "We welcome contributions to ReadMeMaker! Whether you want to add features, fix bugs, or improve documentation, we value your input. Follow these steps to contribute:",
    list: [
      "Fork the Repository",
      "Clone Your Fork",
      "Set Up Your Environment",
      "Quick Start",
      "Create a New Branch",
      "Make Your Changes",
      "Commit Your Changes",
      "Push Changes to Your Fork",
      "Submit a Pull Request",
      "Review Process",
    ],
    subtopics: [
      {
        title: "Fork the Repository",
        content:
          "Start by forking the ReadMeMaker repository on GitHub. This creates a personal copy of the repository where you can make changes without affecting the main project.",
        image: "https://via.placeholder.com/600x200",
        code: "Click 'Fork' on the top-right corner of the repository page on GitHub.",
      },
      {
        title: "Clone Your Fork",
        content:
          "Clone your forked repository to your local machine using Git. This allows you to work on your changes locally.",
        image: "https://via.placeholder.com/600x200",
        code: "git clone https://github.com/your-username/readmemaker.git",
      },
      {
        title: "Set Up Your Environment",
        content:
          "Navigate to the frontend and backend folders and install the necessary dependencies using npm. This ensures you have all the packages needed for development.",
        image: "https://via.placeholder.com/600x200",
        code: "cd frontend && npm install \ncd ../backend && npm install",
      },
      {
        title: "Quick Start",
        content:
          "Before diving into the world of ReadMeMaker, make sure to spin up the development server so you can see your changes in real-time, that is, if you're running the project locally, don’t forget to use the magic words:",
        image: "https://via.placeholder.com/600x200",
        code: "npm start",
      },
      {
        title: "Create a New Branch",
        content:
          "Create a new branch for your changes. This helps keep your modifications separate from the main codebase and makes it easier to manage multiple features or fixes.",
        image: "https://via.placeholder.com/600x200",
        code: "git checkout -b my-feature-branch",
      },
      {
        title: "Make Your Changes",
        content:
          "Work on your changes in the new branch. Whether you’re adding new features, fixing bugs, or updating documentation, ensure your changes are well-tested and adhere to the project’s coding standards.",
        image: "https://via.placeholder.com/600x200",
      },
      {
        title: "Commit Your Changes",
        content:
          "Once you’ve made your changes, commit them with a clear and descriptive message. This helps explain the purpose of your changes and makes it easier to review.",
        image: "https://via.placeholder.com/600x200",
        code: "git add . \ngit commit -m 'Describe your changes here'",
      },
      {
        title: "Push Changes to Your Fork",
        content:
          "Push your committed changes to your forked repository on GitHub. This updates your remote repository with the latest changes.",
        image: "https://via.placeholder.com/600x200",
        code: "git push origin my-feature-branch",
      },
      {
        title: "Submit a Pull Request",
        content:
          "Go to the main ReadMeMaker repository on GitHub and open a pull request from your branch. Provide a clear description of your changes and why they should be merged.",
        image: "https://via.placeholder.com/600x200",
        code: "Click 'New Pull Request' on the GitHub page of the main repository and follow the prompts.",
      },
      {
        title: "Review Process",
        content:
          "Once your pull request is submitted, our team will review it. We may request additional changes or clarifications. After approval, your changes will be merged into the main repository.",
        image: "https://via.placeholder.com/600x200",
      },
    ],
  },
];

const Documentation = () => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.900", "white");
  const theme = useTheme();

  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.900")}
      p={4}
      mt={16}
      direction={{ base: "column", md: "row" }}
    >
      <Sidebar sections={documentation} />
      <Box
        w={{ base: "100%", md: "80%" }}
        p={4}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 4 }}
        bg={bg}
        shadow="lg"
        rounded="md"
        transition="all 0.3s"
        _hover={{ shadow: "xl" }}
      >
        {documentation.map((doc, index) => (
          <Box key={index} id={`section-${index}`} mb={8}>
            <Heading as="h2" size="lg" mb={4} color={textColor}>
              {doc.title}
            </Heading>
            <Text mb={4} color={textColor}>
              {doc.content}
            </Text>
            {doc.image && (
              <Image src={doc.image} alt={doc.title} mb={4} borderRadius="md" />
            )}
            {doc.list && (
              <List spacing={3} mb={4} pl={4} styleType="disc">
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
                bg={theme.colors.gray[900]}
                color="white"
                rounded="md"
                overflow="auto"
                mb={4}
                border="1px solid"
                borderColor="gray.700"
              >
                <Code display="block" whiteSpace="pre-wrap">
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
                    <Image
                      src={subtopic.image}
                      alt={subtopic.title}
                      mb={4}
                      borderRadius="md"
                    />
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
                      border="1px solid"
                      borderColor="gray.700"
                    >
                      <Code display="block" whiteSpace="pre-wrap">
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
