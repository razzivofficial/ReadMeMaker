import { motion } from "framer-motion";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  useColorMode,
  IconButton,
  Image,
  Container,
  Box,
  chakra,
  Flex,
  Text,
  VStack,
  Avatar,
  Divider,
  Heading,
  Center,
} from "@chakra-ui/react";
import { FaGithub, FaDev, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { AiFillBug } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

import AboutUsGif from "../../MediaFiles/AboutUsGif.gif";
import Rajiv from "../../MediaFiles/Rajiv.jpg";
import Tushar from "../../MediaFiles/Tushar.jpg";

// Testimonials data
const testimonials = [
  {
    name: "Rajiv Lochan Dash",
    position: "Frontend Funster",
    company: "Appreciating life {Jobless}",
    image: Rajiv,
    content: "The frontend developer who still Googles 'How to center a div'.",
    accounts: [
      {
        url: "https://github.com/razzivofficial",
        label: "Github Account",
        type: "gray",
        icon: <FaGithub />,
      },
      {
        url: "https://dev.to/razzivdecoder",
        label: "Dev Account",
        type: "gray",
        icon: <FaDev />,
      },
      {
        url: "https://x.com/razzivofficial",
        label: "X Account",
        type: "X",
        icon: <FaSquareXTwitter />,
      },
      {
        url: "https://www.instagram.com/razzivofficial/",
        label: "Instagram",
        type: "pink",
        icon: <FaSquareInstagram />,
      },
      {
        url: "https://www.linkedin.com/in/razzivofficial/",
        label: "LinkedIn Account",
        type: "linkedin",
        icon: <FaLinkedin />,
      },
      {
        url: "mailto:razzivofficial@gmail.com",
        label: "Gmail Account",
        type: "gray",
        icon: <MdEmail />,
      },
      {
        url: "https://t.me/razzivofficial",
        label: "Telegram Account",
        type: "blue",
        icon: <FaTelegram />,
      },
    ],
  },
  {
    name: "Tushar Gandhi",
    position: "Backend Maestro",
    company: "Funemployed {Unemployed}",
    image: Tushar,
    content: "My code works, but I don’t know why it’s showing a 404 error.",
    accounts: [
      {
        url: "https://github.com/tushar",
        label: "Github Account",
        type: "gray",
        icon: <FaGithub />,
      },
      {
        url: "https://dev.to/razzivdecoder",
        label: "Dev Account",
        type: "gray",
        icon: <FaDev />,
      },
      {
        url: "https://x.com/razzivofficial",
        label: "X Account",
        type: "X",
        icon: <FaSquareXTwitter />,
      },
      {
        url: "https://www.instagram.com/razzivofficial/",
        label: "Instagram",
        type: "pink",
        icon: <FaSquareInstagram />,
      },
      {
        url: "https://www.linkedin.com/in/razzivofficial/",
        label: "LinkedIn Account",
        type: "linkedin",
        icon: <FaLinkedin />,
      },
      {
        url: "mailto:razzivofficial@gmail.com",
        label: "Gmail Account",
        type: "gray",
        icon: <MdEmail />,
      },
      {
        url: "https://t.me/razzivofficial",
        label: "Telegram Account",
        type: "blue",
        icon: <FaTelegram />,
      },
    ],
  },
];

const companyAccounts = [
  {
    url: "https://github.com/razzivofficial/ReadMeMaker",
    label: "Github Account",
    type: "gray",
    icon: <FaGithub />,
  },
  {
    url: "https://t.me/readmemaker",
    label: "Telegram Account",
    type: "blue",
    icon: <FaTelegram />,
  },
  {
    url: "https://x.com/readmemaker",
    label: "X Account",
    type: "X",
    icon: <FaSquareXTwitter />,
  },
  {
    url: "https://www.instagram.com/readmemaker/",
    label: "Instagram",
    type: "pink",
    icon: <FaSquareInstagram />,
  },
  // {
  //   url: "https://www.linkedin.com/in/razzivofficial/",
  //   label: "LinkedIn Account",
  //   type: "linkedin",
  //   icon: <FaLinkedin />,
  // },
  {
    url: "mailto:readmemaker.work@gmail.com",
    label: "Gmail Account",
    type: "gray",
    icon: <MdEmail />,
  },
];

const iconProps = {
  variant: "ghost",
  size: "lg", // Use a predefined size as a base
  isRound: true,
  style: { fontSize: "2rem" }, // Adjust this value to change the icon size
};

const MotionContainer = motion(Container);
const MotionVStack = motion(VStack);
const MotionFlex = motion(Flex);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Testimonials = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const textColor = isDark ? "gray.100" : "gray.700";
  const headingColor = isDark ? "blue.300" : "blue.600";
  const bgColor = isDark ? "gray.700" : "white";
  const bugButtonBgColor = isDark ? "red.600" : "red.500";
  const bugButtonHoverColor = isDark ? "red.500" : "red.300";

  return (
    <>
      {/* Intro */}
      <MotionContainer
        mt="10"
        maxW="7xl"
        p={{ base: 5, md: 10 }}
        mx="auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Center>
          <Stack
            spacing={4}
            px={2}
            alignItems={{ base: "center", sm: "flex-start" }}
          >
            <Heading
              textAlign={{ base: "center", sm: "left" }}
              pt="10"
              margin="0 auto"
              width={{ base: "100%", sm: "auto" }}
              fontSize={{
                base: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
              }}
              color={headingColor}
            >
              Welcome to ReadMeMaker!
            </Heading>
            <MotionFlex
              alignItems="center"
              flexDirection={{ base: "column", md: "row" }}
              height="auto"
              width="100%"
              mb={1}
            >
              <MotionFlex
                flexDirection={{ base: "column", md: "row" }}
                alignItems="center"
                mb={{ base: 4, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text
                  mb={2}
                  textAlign={"justify"}
                  fontSize={{
                    base: "1rem",
                    sm: "1rem",
                    md: "1.15rem",
                  }}
                  color={textColor}
                >
                  Tired of your README files being as exciting as a soggy
                  sandwich? Welcome to ReadMeMaker, where we transform your
                  README from “meh” to “heck yeah!” faster than you can say “git
                  push". Once upon a caffeine-fueled brainstorming session, a
                  team of developers decided they were tired of boring README
                  files and endless tab-switching. They dreamed of a place where
                  README creation could be as exciting as a rollercoaster ride.
                  And boom, ReadMeMaker was born—a place where your README isn’t
                  just informative, it’s a blockbuster hit.
                </Text>
                <Image
                  objectFit="cover"
                  maxW={{ base: "70%", sm: "40%" }}
                  src={AboutUsGif}
                  alt="gif / Image"
                />
              </MotionFlex>
            </MotionFlex>
            <MotionFlex
              alignItems="center"
              justifyContent="center"
              width={"100%"}
            >
              <MotionFlex
                wrap="wrap"
                justify="center"
                align="center"
                direction={"row"}
              >
                {companyAccounts.map((account, idx) => (
                  <IconButton
                    key={idx}
                    as="a"
                    target="_blank"
                    href={account.url}
                    aria-label={account.label}
                    icon={account.icon}
                    colorScheme={account.type}
                    variant={iconProps.variant}
                    size={iconProps.size}
                    isRound={iconProps.isRound}
                    m={1}
                    style={{ fontSize: "2.5rem" }} // Adjust size here
                  />
                ))}
              </MotionFlex>
            </MotionFlex>
            <MotionFlex
              flexDirection="column"
              alignItems="center"
              width="100%"
              p={3}
              textAlign={{ base: "center", md: "center" }}
            >
              <Text
                fontSize={{
                  base: "1rem",
                  sm: "1rem",
                  md: "1.25rem",
                }}
                mb={4}
                color={textColor}
              >
                Oh, and if you find any bugs, just remember—they’re not bugs,
                they’re “surprises with extra flavor.”
              </Text>
              <Button
                as="a"
                href="https://github.com/razzivofficial/ReadMeMaker/issues"
                target="_blank"
                bg={bugButtonBgColor}
                color="white"
                _hover={{ bg: bugButtonHoverColor }}
                rounded="md"
                leftIcon={<AiFillBug />}
                size="lg"
              >
                Report a bug
              </Button>
            </MotionFlex>
          </Stack>
        </Center>
      </MotionContainer>

      {/* Developed By */}
      <MotionContainer
        maxW="6xl"
        p={{ base: 4, md: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <MotionFlex justify="center">
          <chakra.h3
            fontSize="3xl"
            fontWeight="bold"
            mb={4}
            color={headingColor}
          >
            Meet the Majdurs
          </chakra.h3>
        </MotionFlex>

        <MotionFlex
          flexDirection={{ base: "column", md: "row" }}
          justify="space-around"
          wrap="wrap"
        >
          {testimonials.map((testimonial, index) => (
            <MotionVStack
              key={index}
              spacing={4}
              p={4}
              bg={bgColor}
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
              maxW="x"
              m={2}
              flex="1"
              variants={fadeInUp}
            >
              <Avatar
                size="xl"
                name={testimonial.name}
                src={testimonial.image}
                mb={4}
              />
              <Text fontWeight="bold" fontSize="lg" color={headingColor}>
                {testimonial.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {testimonial.position}
              </Text>
              <Text fontSize="sm" color="red.400">
                {testimonial.company}
              </Text>
              <Text fontSize="md" color={textColor}>
                {testimonial.content}
              </Text>
              <Divider my={1} />
              <MotionFlex justify="center" wrap="wrap">
                {testimonial.accounts.map((account, idx) => (
                  <IconButton
                    key={idx}
                    as="a"
                    target="_blank"
                    href={account.url}
                    aria-label={account.label}
                    icon={account.icon}
                    colorScheme={account.type}
                    variant={iconProps.variant}
                    size={iconProps.size}
                    isRound={iconProps.isRound}
                    m={1}
                    style={{ fontSize: "2rem" }} // Adjust size here
                  />
                ))}
              </MotionFlex>
            </MotionVStack>
          ))}
        </MotionFlex>
      </MotionContainer>

      {/* Contact form */}
      <MotionContainer
        maxW="5xl"
        py={10}
        px={{ base: 5, md: 8 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <MotionFlex align="center" justify="center" direction="column" mb={4}>
          <section id="contact-us">
            <Heading fontSize="3xl" mb={4} color="teal.600">
              Contact Us
            </Heading>
          </section>
        </MotionFlex>
        <VStack
          as="form"
          spacing={8}
          bg={bgColor}
          p={6}
          borderRadius="md"
          boxShadow="md"
        >
          <Stack spacing={4} w="100%" direction={{ base: "column", md: "row" }}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Your good name"
                rounded="md"
                borderColor="gray.300"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Eg: md@md.com"
                rounded="md"
                borderColor="gray.300"
              />
            </FormControl>
          </Stack>
          <FormControl id="message" isRequired>
            <FormLabel>How can we help you?</FormLabel>
            <Textarea
              size="lg"
              h="12vh"
              placeholder="Enter your message"
              rounded="md"
              borderColor="gray.300"
            />
          </FormControl>
          <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.400" }}
            rounded="md"
            w="full"
          >
            Send Message
          </Button>
        </VStack>
      </MotionContainer>
    </>
  );
};

export default Testimonials;
