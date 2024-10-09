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
  {
    title: "Introduction",
    content:
      "Namaste! Welcome to ReadMeMaker – where your README dreams come true! Whether you're a code newbie trying to impress your first GitHub crush or a grizzled dev wizard who lives in the terminal, our tool helps you create README files that scream professionalism with a dash of swagger.",
    list: ["What is ReadMeMaker?", "Why use ReadMeMaker?", "Key Features"],
    subtopics: [
      {
        title: "What is ReadMeMaker?",
        content:
          "Imagine this: You're about to showcase the world's best code, but oh no, your README is as empty as your fridge on a Sunday night. Enter ReadMeMaker – your trusty sidekick to create README files that don't just inform but *dazzle*. Click a few buttons, and voila – a masterpiece of self-documentation!",
        image: "https://unsplash.com/photos/qzU_t7Hk-40",
      },
      {
        title: "Why use ReadMeMaker?",
        content:
          "Let’s face it – writing a great README is harder than solving a Rubik’s Cube blindfolded. But guess what? ReadMeMaker makes it easier than ordering chai and samosas online. Plus, a killer README makes your project shine like freshly polished code!",
        image: "https://unsplash.com/photos/rCOWMC8qf8A",
      },
      {
        title: "Key Features",
        content:
          "ReadMeMaker is the Swiss Army Knife of README files: \n- Customizable Components: Mix and match like a coding salad.\n- Community Templates: Need inspiration? Borrow from the ReadMe legends out there.\n- Seamless Integration: Your README, your rules – in Markdown or HTML. Heck, write it in poetry form if you want!",
        image: "https://unsplash.com/photos/mSi1HBnKoFE",
      },
    ],
  },
  {
    title: "Getting Started",
    content: "Ready to make README magic? Here's how you dive in:",
    list: ["Installation", "Creating Your First README", "Troubleshooting"],
    subtopics: [
      {
        title: "Installation",
        content:
          "Installation? Pfft. You don’t need that here. Just pop over to our website, and you're halfway to README glory.",
        image: "https://unsplash.com/photos/Ke1CAvE_NFQ",
      },
      {
        title: "Creating Your First README",
        content:
          "Step into the README dojo: \n- Go to the homepage. \n- Click 'Get Started.' \n- Pick the components you need like a coding buffet. \n- Hit download. Boom! You’re done.",
        image: "https://unsplash.com/photos/F6-U5fGAOik",
        code: "console.log('README-making ninjas are born here.');",
      },
      {
        title: "Troubleshooting",
        content:
          "Having issues? Don’t worry! Check out our troubleshooting guide. Most problems can be solved by a good ol' restart or clearing your browser cache. If not, we've got FAQs that might help!",
        image: "https://unsplash.com/photos/m3V1XcY-8xA",
      },
    ],
  },
  {
    title: "Features",
    content:
      "Welcome to the feature playground! Here’s where ReadMeMaker flexes its muscles:",
    list: [
      "Customizable Components",
      "Live Preview",
      "Markdown Support",
      "Export Options",
      "Version History",
    ],
    subtopics: [
      {
        title: "Customizable Components",
        content:
          "Our buffet of 36 (and counting) components is just waiting for you to dig in. From badges to project overviews, mix and match till your README is *chef’s kiss* perfect. Plus, log in to unlock even more templates from the community.",
        image: "https://unsplash.com/photos/Fq3dyDGOgRo",
      },
      {
        title: "Live Preview",
        content:
          "Why guess when you can know? Watch your README come to life in real time as you build it. No more 'oops' moments when it’s too late!",
        image: "https://unsplash.com/photos/WrueFKpTlQs",
      },
      {
        title: "Markdown Support",
        content:
          "Markdown lovers, rejoice! Craft your README using the finest syntax in the land. Prefer HTML? No judgment here. We support that too, because we’re all about freedom.",
        image: "https://unsplash.com/photos/Iv8zxGQKCr8",
        code: "# Best Project Ever\\n\\n## Because It Just Is;",
      },
      {
        title: "Export Options",
        content:
          "When you're done creating your README work of art, just hit 'Download,' and you’re ready to take on GitHub like a pro. Easy-peasy, code-squeezy.",
        image: "https://unsplash.com/photos/Tl9mIDhEqg4",
      },
      {
        title: "Version History",
        content:
          "Ever wonder what you did last week? Our version history feature keeps track of all your README iterations, so you can roll back if your changes are more 'oops' than 'awesome.'",
        image: "https://unsplash.com/photos/XmbofK6rLXs",
      },
    ],
  },
  {
    title: "FAQs",
    content: "Curious? Here are some FAQs that'll satisfy your brain cravings:",
    list: [
      "Is ReadMeMaker free?",
      "Can I customize my README?",
      "How do I report bugs?",
      "What if I forget my password?",
      "Can I use ReadMeMaker offline?",
    ],
    subtopics: [
      {
        title: "Is ReadMeMaker free?",
        content:
          "You bet! ReadMeMaker is as free as WiFi in a café (and way more reliable). No hidden charges, no premium plans – just unlimited README awesomeness.",
        image: "https://unsplash.com/photos/wvUs06TkSec",
      },
      {
        title: "Can I customize my README?",
        content:
          "Uh, yeah! Whether you want it minimalist like your wardrobe or detailed like your bug reports, we’ve got you covered. Customization is our middle name.",
        image: "https://unsplash.com/photos/cckf4TsHAuw",
      },
      {
        title: "How do I report bugs?",
        content:
          "If you find a bug (or think you have), don’t panic! Just head over to our GitHub Issues page, and we’ll squish it faster than you can say 'Merge Conflict.'",
        image: "https://unsplash.com/photos/XfD-fTq-Yn4",
        code: `
          const reportBug = () => { 
            window.open('https://github.com/razzivofficial/ReadMeMaker/issues');
          };
        `,
      },
      {
        title: "What if I forget my password?",
        content:
          "No sweat! Just click on 'Forgot Password?' on the login page. We'll send you a magical email to help you reset it faster than you can say 'password123.'",
        image: "https://unsplash.com/photos/1uM4h9t3D80",
      },
      {
        title: "Can I use ReadMeMaker offline?",
        content:
          "As of now, ReadMeMaker is a web-based tool. But hey, you can always download your README and work on it offline like the coding hero you are!",
        image: "https://unsplash.com/photos/IR5QZMeYcCA",
      },
    ],
  },
  {
    title: "Contributing",
    content:
      "Got ideas to make ReadMeMaker even more awesome? We love contributions! Here’s how you can join the README revolution:",
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
          "Start by forking ReadMeMaker on GitHub. This gives you your very own copy to play with and make magic happen.",
        image: "https://unsplash.com/photos/0eE4PAYqj6o",
        code: "Click 'Fork' on the GitHub repo page – top-right corner!",
      },
      {
        title: "Clone Your Fork",
        content:
          "Next, clone your shiny new fork to your local machine. Now you’re ready to get your hands dirty with some coding fun.",
        image: "https://unsplash.com/photos/2vvT69t5aqI",
        code: "git clone https://github.com/razzivofficial/ReadMeMaker.git",
      },
      {
        title: "Set Up Your Environment",
        content:
          "Run `npm install` in both frontend and backend. This makes sure you’ve got everything you need to rock and roll.",
        image: "https://unsplash.com/photos/4hbJ-eymZ1o",
        code: "cd frontend && npm install && cd ../backend && npm install",
      },
      {
        title: "Quick Start",
        content:
          "Fire up your app with `npm start` to see if everything's running smoothly. If not, don’t fret; the README can guide you.",
        image: "https://unsplash.com/photos/S7Mdo8CBFEE",
        code: "npm start",
      },
      {
        title: "Create a New Branch",
        content:
          "Branch out from the main code base! This keeps your changes organized and easy to manage. Aim for a branch name that describes your feature or fix.",
        image: "https://unsplash.com/photos/yf8sVeS5dYw",
        code: "git checkout -b feature-name",
      },
      {
        title: "Make Your Changes",
        content:
          "This is where the magic happens! Write your code, create new components, and transform the README experience for everyone.",
        image: "https://unsplash.com/photos/q1B83N8Eadg",
      },
      {
        title: "Commit Your Changes",
        content:
          "Time to save your work! Keep your commit messages clear and concise – it helps others understand what you did and why.",
        image: "https://unsplash.com/photos/2I9F0m6DR1I",
        code: "git commit -m 'Added feature X'",
      },
      {
        title: "Push Changes to Your Fork",
        content:
          "Once you’re satisfied with your changes, push them back to your fork. This makes them available for review.",
        image: "https://unsplash.com/photos/j_LJXX0wY90",
        code: "git push origin feature-name",
      },
      {
        title: "Submit a Pull Request",
        content:
          "Head over to the original ReadMeMaker repository and submit a pull request. This is your chance to let us know what you’ve created!",
        image: "https://unsplash.com/photos/FdQm1dE4wsE",
      },
      {
        title: "Review Process",
        content:
          "Our team will review your PR faster than you can say 'open source.' If everything looks good, we’ll merge it, and you’ll be officially part of the ReadMeMaker family!",
        image: "https://unsplash.com/photos/B5C7rr6Dt5g",
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
