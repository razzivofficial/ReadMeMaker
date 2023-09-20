import { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
} from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import {
  Container,
  Box,
  chakra,
  Flex,
  Text,
  VStack,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { Heading, Link, IconButton, Center } from "@chakra-ui/react";
import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaQuora,
  FaTwitter,
} from "react-icons/fa";
import imgA from "../../img1.png";

import { AiFillBug } from "react-icons/ai";

const testimonials = [
  {
    name: "Ben Parker",
    position: "CEO",
    company: "Foodtesla",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga ipsa porro esse dicta error praesentium dignissimos molestiae quibusdam excepturi debitis.",
  },
  {
    name: "Jena Karlis",
    position: "GM",
    company: "Olpers",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi nulla esse officia accusantium sed dolorem reiciendis cumque corporis, quaerat tenetur.",
  },
];

const accounts = [
  {
    url: "https://github.com/MA-Ahmad",
    label: "Github Account",
    type: "gray",
    icon: <FaGithub />,
  },
  {
    url: "https://twitter.com/muhammad_ahmaad",
    label: "Twitter Account",
    type: "twitter",
    icon: <FaTwitter />,
  },
  {
    url: "https://dev.to/m_ahmad",
    label: "Dev Account",
    type: "gray",
    icon: <FaDev />,
  },
  {
    url: "https://linkedin.com/in/muhammad-ahmad20",
    label: "LinkedIn Account",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
  {
    url: "https://www.quora.com/profile/Muhammad-Ahmad-66",
    label: "Quora Account",
    type: "red",
    icon: <FaQuora />,
  },
];

const iconProps = {
  variant: "ghost",
  size: "lg",
  isRound: true,
};

// const contactOptions = [
//   {
//     label: 'Address',
//     value: 'A108 Adam Street, NY 535022, USA',
//     icon: GoLocation
//   },
//   {
//     label: 'PHONE NUMBER',
//     value: '+1 5589 55488 55',
//     icon: BsPhone
//   },
//   {
//     label: 'EMAIL',
//     value: 'info@example.com',
//     icon: HiOutlineMail
//   }
// ];

const Testimonials = () => {
  return (
    <>
      {/* About us */}
      <Container mt={"10"} maxW="7xl" p={{ base: 5, md: 10 }} mx="auto">
        <Center>
          <VStack
            spacing={4}
            px={2}
            alignItems={{ base: "center", sm: "flex-start" }}
          >
            <Heading
              textAlign={{ base: "center", sm: "left" }}
              pt={"10"}
              margin="0 auto"
              width={{ base: "23rem", sm: "auto" }}
              fontSize={{ base: "2.5rem", sm: "3rem" }}
            >
              Who are we?
            </Heading>
            <Flex
              alignItems={"center"}
              height={{ base: "50rem", md: "20rem" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Flex
                height={{ base: "25rem", md: "20rem" }}
                p={"3"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Text
                  textAlign={"justify"}
                  height={{ base: "30rem", md: "10rem", sm: "35rem" }}
                  pl={{ base: "14" }}
                  fontSize="l"
                >
                  Passionate about Tech. Lover of web and opensource. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
                  laborum fugit aliquid error optio, numquam eum nemo illum
                  deserunt maiores vitae cumque repellendus? Lorem ipsum dolor
                  sit amet, consectetur adipisicing elit. Ullam aliquid eius,
                  harum, nobis modi quod nulla cupiditate, laboriosam totam
                  consequatur perspiciatis? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ad, illum suscipit reprehenderit
                  natus non voluptates placeat quas perspiciatis aperiam?
                </Text>
                <Box>
                  <Button
                    bg="red.500"
                    color="white"
                    _hover={{
                      bg: "red.300",
                    }}
                    rounded="md"
                    w={{ base: "100%", md: "max-content" }}
                    mt={{ base: "8", md: "28", sm: "12" }}
                  >
                    <AiFillBug style={{ paddingRight: "2px" }} />
                    Report a bug
                  </Button>
                </Box>
              </Flex>
              <Box>
                <Image src={imgA} alt="Image" />
              </Box>
            </Flex>
          </VStack>
        </Center>
      </Container>

      {/* Developed by */}
      <Container maxW="5xl" p={{ base: 5, md: 10 }}>
        <Flex justify="center" mb={8}>
          <chakra.h3 fontSize="3xl" fontWeight="bold" mb={4}>
            Developed by
          </chakra.h3>
        </Flex>
        <Flex flexDirection={{ base: "column", md: "row" }}>
          {testimonials.map((obj, index) => (
            <Fragment key={index}>
              <VStack spacing={3} pt={1} justify="center">
                <Avatar
                  size="xl"
                  showBorder={true}
                  borderColor="green.400"
                  name="avatar"
                  src={obj.image}
                />
                <Box textAlign="center">
                  <Text fontWeight="bold" fontSize="lg">
                    {obj.name}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="gray.400">
                    {obj.position}, {obj.company}
                  </Text>
                </Box>
                <Box p={"3"} textAlign="center" maxW="4xl">
                  <Text fontSize="md" fontWeight="medium">
                    {obj.content}
                  </Text>
                  <Divider mt={"10"} />
                  <Flex alignItems="center" justify="center" w="100%">
                    <Box textAlign="center">
                      {accounts.map((sc, index) => (
                        <IconButton
                          key={index}
                          as={Link}
                          isExternal
                          href={sc.url}
                          aria-label={sc.label}
                          colorScheme={sc.type}
                          rounded="full"
                          icon={sc.icon}
                          {...iconProps}
                        />
                      ))}
                    </Box>
                  </Flex>
                </Box>
              </VStack>
            </Fragment>
          ))}
        </Flex>
      </Container>

      {/* Contact form */}
      <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
        <Stack spacing={10}>
          <Flex align="center" justify="center" direction="column">
            <Heading fontSize="4xl" mb={2}>
              Contact Us
            </Heading>
            {/* <Text fontSize="md" textAlign="center">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            </Text> */}
          </Flex>
          {/* <Stack
            spacing={{ base: 6, md: 0 }}
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
          >
            {contactOptions.map((option, index) => (
              <Fragment key={index}>
                <Stack spacing={3} direction="column" justify="center" alignItems="center" px={3}>
                  <Icon as={option.icon} w={10} h={10} color="green.400" />
                  <Text fontSize="lg" fontWeight="semibold">
                    {option.label}
                  </Text>
                  <Text fontSize="md" textAlign="center">
                    {option.value}
                  </Text>
                </Stack>
                {contactOptions.length - 1 !== index && (
                  <Flex d={{ base: 'none', md: 'flex' }}>
                    <Divider orientation="vertical" />
                  </Flex>
                )}
              </Fragment>
            ))}
          </Stack> */}
          <VStack
            as="form"
            spacing={8}
            w="100%"
            rounded="lg"
            // boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <Stack
                w="100%"
                spacing={3}
                direction={{ base: "column", md: "row" }}
              >
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Your good name"
                    rounded="md"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Eg: md@md.com"
                    rounded="md"
                  />
                </FormControl>
              </Stack>
              <FormControl id="message" isRequired>
                <FormLabel>How can we help you?</FormLabel>
                <Textarea
                  size="lg"
                  h={"30vh"}
                  placeholder="Enter your message"
                  rounded="md"
                />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                bg="blue.300"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                rounded="md"
                w={{ base: "100%", md: "max-content" }}
              >
                Send Message
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </>
  );
};

export default Testimonials;
