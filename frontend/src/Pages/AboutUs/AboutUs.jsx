// import { Fragment } from "react";
// import { motion } from "framer-motion";
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Stack,
//   Button,
// } from "@chakra-ui/react";
// import { Image } from "@chakra-ui/react";
// import {
//   Container,
//   Box,
//   chakra,
//   Flex,
//   Text,
//   VStack,
//   Avatar,
//   Divider,
// } from "@chakra-ui/react";
// import { Heading, Link, IconButton, Center } from "@chakra-ui/react";
// import {
//   FaGithub,
//   FaDev,
//   FaLinkedin,
//   FaQuora,
//   FaTwitter,
// } from "react-icons/fa";
// import imgA from "../../MediaFiles/logo.png";
// import { AiFillBug } from "react-icons/ai";

// const testimonials = [
//   {
//     name: "Alex Johnson",
//     position: "Code Wizard",
//     company: "CodeMasters",
//     image:
//       "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
//     content:
//       "Turning spaghetti code into a Michelin-star dish. Seriously, it’s like magic but with more semicolons.",
//   },
//   {
//     name: "Jamie Lee",
//     position: "Debugging Pro",
//     company: "BugBusters",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
//     content:
//       "Spotting bugs faster than a hawk on espresso. Your bugs don’t stand a chance!",
//   },
//   {
//     name: "Jordan Smith",
//     position: "Design Ace",
//     company: "DesignWizards",
//     image:
//       "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
//     content:
//       "Makes your README look so good, it might just win a beauty pageant. They’re the Picasso of README files.",
//   },
// ];

// const myAccounts = [
//   {
//     url: "#",
//     label: "Github Account",
//     type: "gray",
//     icon: <FaGithub />,
//   },
//   {
//     url: "#",
//     label: "Twitter Account",
//     type: "twitter",
//     icon: <FaTwitter />,
//   },
//   {
//     url: "#",
//     label: "Dev Account",
//     type: "gray",
//     icon: <FaDev />,
//   },
//   {
//     url: "#",
//     label: "LinkedIn Account",
//     type: "linkedin",
//     icon: <FaLinkedin />,
//   },
//   {
//     url: "#",
//     label: "Quora Account",
//     type: "red",
//     icon: <FaQuora />,
//   },
// ];
// const accounts = [
//   {
//     url: "https://github.com/MA-Ahmad",
//     label: "Github Account",
//     type: "gray",
//     icon: <FaGithub />,
//   },
//   {
//     url: "https://twitter.com/muhammad_ahmaad",
//     label: "Twitter Account",
//     type: "twitter",
//     icon: <FaTwitter />,
//   },
//   {
//     url: "https://dev.to/m_ahmad",
//     label: "Dev Account",
//     type: "gray",
//     icon: <FaDev />,
//   },
//   {
//     url: "https://linkedin.com/in/muhammad-ahmad20",
//     label: "LinkedIn Account",
//     type: "linkedin",
//     icon: <FaLinkedin />,
//   },
//   {
//     url: "https://www.quora.com/profile/Muhammad-Ahmad-66",
//     label: "Quora Account",
//     type: "red",
//     icon: <FaQuora />,
//   },
// ];

// const iconProps = {
//   variant: "ghost",
//   size: "lg",
//   isRound: true,
// };

// const MotionContainer = motion(Container);
// const MotionVStack = motion(VStack);
// const MotionFlex = motion(Flex);

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1 } },
// };

// const waveStyle = {
//   position: 'absolute',
//   top: '70%',
//   left: '50%',
//   width: '120%',
//   height: '150px',
//   filter: 'blur(50px)',
//   transform: 'translateX(-50%) rotate(30deg)',
// };

// const containerStyle = {
//   position: 'relative',
//   width: '100%',
//   height: '100%',
//   overflow: 'hidden',
//   background: '#fff',
//   backgroundSize: '200% 200%',
//   animation: 'waveAnimation 2s linear infinite',
// };

// const animationStyle = `
//   @keyframes waveAnimation {
//     0% {
//       background: rgba(245, 245, 220 ,0.1);
//       background-position: 0 0;
//     }
//     100% {
//       background: rgba(245, 245, 220,0.1);
//       background-position: 400% 0;
//     }
//   }
// `;

// // const testimonials = [
// //   {
// //     name: "Ben Parker",
// //     position: "CEO",
// //     company: "Foodtesla",
// //     image:
// //       "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
// //     content:
// //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga ipsa porro esse dicta error praesentium dignissimos molestiae quibusdam excepturi debitis.",
// //   },
// //   {
// //     name: "Jena Karlis",
// //     position: "GM",
// //     company: "Olpers",
// //     image:
// //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
// //     content:
// //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi nulla esse officia accusantium sed dolorem reiciendis cumque corporis, quaerat tenetur.",
// //   },
// // ];

// // const accounts = [
// //   {
// //     url: "https://github.com/MA-Ahmad",
// //     label: "Github Account",
// //     type: "gray",
// //     icon: <FaGithub />,
// //   },
// //   {
// //     url: "https://twitter.com/muhammad_ahmaad",
// //     label: "Twitter Account",
// //     type: "twitter",
// //     icon: <FaTwitter />,
// //   },
// //   {
// //     url: "https://dev.to/m_ahmad",
// //     label: "Dev Account",
// //     type: "gray",
// //     icon: <FaDev />,
// //   },
// //   {
// //     url: "https://linkedin.com/in/muhammad-ahmad20",
// //     label: "LinkedIn Account",
// //     type: "linkedin",
// //     icon: <FaLinkedin />,
// //   },
// //   {
// //     url: "https://www.quora.com/profile/Muhammad-Ahmad-66",
// //     label: "Quora Account",
// //     type: "red",
// //     icon: <FaQuora />,
// //   },
// // ];

// // const iconProps = {
// //   variant: "ghost",
// //   size: "lg",
// //   isRound: true,
// // };

// // const contactOptions = [
// //   {
// //     label: 'Address',
// //     value: 'A108 Adam Street, NY 535022, USA',
// //     icon: GoLocation
// //   },
// //   {
// //     label: 'PHONE NUMBER',
// //     value: '+1 5589 55488 55',
// //     icon: BsPhone
// //   },
// //   {
// //     label: 'EMAIL',
// //     value: 'info@example.com',
// //     icon: HiOutlineMail
// //   }
// // ];
// // import React from "react";
// // import { Container, Flex, Heading, Text, Button, VStack, Avatar, Divider, FormControl, FormLabel, Input, Textarea, Stack } from "@chakra-ui/react";

// const Testimonials = () => {
//   return (
//     <>
//     <style>{animationStyle}</style>
//     <div style={containerStyle}>
//     <div style={waveStyle} />
//       {/* Intro */}
//       <MotionContainer
//         mt="10"
//         maxW="7xl"
//         p={{ base: 5, md: 10 }}
//         mx="auto"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={fadeInUp}
//       >
//         <Center>
//           <Stack
//             spacing={4}
//             px={2}
//             alignItems={{ base: "center", sm: "flex-start" }}
//           >
//             <Heading
//               textAlign={{ base: "center", sm: "left" }}
//               pt="10"
//               margin="0 auto"
//               width={{ base: "100%", sm: "auto" }}
//               fontSize={{
//                 base: "1.5rem",
//                 sm: "2rem",
//                 md: "2.5rem",
//               }}
//             >
//               Welcome to ReadMeMaker !
//             </Heading>
//             <MotionFlex
//               alignItems="center"
//               flexDirection={{ base: "column", md: "row" }}
//               height="auto"
//               width="100%"
//               mb={1}
//             >
//               <MotionFlex
//                 flexDirection={{ base: "column", md: "row" }}
//                 alignItems="center"
//                 mb={{ base: 8, md: 0 }}
//                 textAlign={{ base: "center", md: "left" }}
//               >
//                 <Text
//                   mb={2}
//                   textAlign={"justify"}
//                   fontSize={{
//                     base: "1rem",
//                     sm: "1rem",
//                     md: "1.15rem",
//                   }}
//                 >
//                   Tired of your README files being as exciting as a soggy
//                   sandwich? Welcome to ReadMeMaker, where we transform your
//                   README from “meh” to “heck yeah!” faster than you can say “git
//                   push". Once upon a caffeine-fueled brainstorming session, a
//                   team of developers decided they were tired of boring README
//                   files and endless tab-switching. They dreamed of a place where
//                   README creation could be as exciting as a rollercoaster ride.
//                   And boom, ReadMeMaker was born—a place where your README isn’t
//                   just informative, it’s a blockbuster hit.
//                 </Text>
//                 <Image
//                   objectFit="cover"
//                   maxW={{ base: "70%", sm: "40%" }}
//                   // src={imgA}
//                   src={
//                     "https://user-images.githubusercontent.com/74038190/212748842-9fcbad5b-6173-4175-8a61-521f3dbb7514.gif"
//                   }
//                   alt="Company Image"
//                 />
//               </MotionFlex>
//               {/* https://user-images.githubusercontent.com/74038190/219923823-bf1ce878-c6b8-4faa-be07-93e6b1006521.gif */}
//             </MotionFlex>
//             <MotionFlex
//               alignItems="center"
//               justifyContent="center"
//               width={"100%"}
//               // direction="row"
//             >
//               <MotionFlex
//                 wrap="wrap"
//                 justify="center"
//                 align="center"
//                 direction={"row"}
//               >
//                 {myAccounts.map((account, idx) => (
//                   <IconButton
//                     key={idx}
//                     as="a"
//                     href={account.url}
//                     aria-label={account.label}
//                     icon={account.icon}
//                     colorScheme={account.type}
//                     variant={iconProps.variant}
//                     size={iconProps.size}
//                     isRound={iconProps.isRound}
//                     m={1}
//                   />
//                 ))}
//               </MotionFlex>
//             </MotionFlex>
//             <MotionFlex
//               flexDirection="column"
//               alignItems="center"
//               width="100%"
//               p={3}
//               textAlign={{ base: "center", md: "center" }}
//             >
//               <Text
//                 fontSize={{
//                   base: "1rem",
//                   sm: "1rem",
//                   md: "1.25rem",
//                 }}
//                 mb={4}
//               >
//                 Oh, and if you find any bugs, just remember—they’re not bugs,
//                 they’re “surprises with extra flavor.”
//               </Text>
//               <Button
//                 bg="red.500"
//                 color="white"
//                 _hover={{ bg: "red.300" }}
//                 rounded="md"
//                 leftIcon={<AiFillBug />}
//               >
//                 Report a bug
//               </Button>
//             </MotionFlex>
//           </Stack>
//         </Center>
//       </MotionContainer>

//       {/* Developed By */}
//       <MotionContainer
//         maxW="5xl"
//         p={{ base: 5, md: 10 }}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={fadeInUp}
//       >
//         <MotionFlex justify="center">
//           <chakra.h3 fontSize="3xl" fontWeight="bold" mb={4} color="teal.600">
//             Developed by
//           </chakra.h3>
//         </MotionFlex>

//         <MotionFlex
//           flexDirection={{ base: "column", md: "row" }}
//           justify="space-around"
//           wrap="wrap"
//         >
//           {/* Loop over testimonials */}
//           {testimonials.map((testimonial, index) => (
//             <MotionVStack
//               key={index}
//               spacing={4}
//               p={4}
//               bg="white"
//               borderRadius="md"
//               boxShadow="md"
//               textAlign="center"
//               maxW="x"
//               m={2}
//               flex="1"
//               variants={fadeInUp}
//             >
//               <Avatar
//                 size="xl"
//                 name={testimonial.name}
//                 src={testimonial.image}
//                 mb={4}
//               />
//               <Text fontWeight="bold" fontSize="lg" color="teal.600">
//                 {testimonial.name}
//               </Text>
//               <Text fontSize="sm" color="gray.500">
//                 {testimonial.position}, {testimonial.company}
//               </Text>
//               <Text fontSize="md" color="gray.700">
//                 {testimonial.content}
//               </Text>
//               <Divider my={1} />
//               <MotionFlex justify="center" wrap="wrap">
//                   {accounts.map((account, idx) => (
//                     <IconButton
//                       key={idx}
//                       as="a"
//                       href={account.url}
//                       aria-label={account.label}
//                       icon={account.icon}
//                       colorScheme={account.type}
//                       variant={iconProps.variant}
//                       size={iconProps.size}
//                       isRound={iconProps.isRound}
//                       m={0}
//                     />
//                   ))}
//                 </MotionFlex>

//             </MotionVStack>
//           ))}
//         </MotionFlex>
//       </MotionContainer>

//       {/* Contact form */}
//       <MotionContainer
//         maxW="5xl"
//         py={10}
//         px={{ base: 5, md: 8 }}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={fadeInUp}
//       >
//         <MotionFlex align="center" justify="center" direction="column" mb={4}>
//           <Heading fontSize="3xl" mb={4} color="teal.600">
//             Contact Us
//           </Heading>
//         </MotionFlex>
//         <VStack
//           as="form"
//           spacing={8}
//           bg="white"
//           p={6}
//           borderRadius="md"
//           boxShadow="md"
//         >
//           <Stack spacing={4} w="100%" direction={{ base: "column", md: "row" }}>
//             <FormControl id="name" isRequired>
//               <FormLabel>Name</FormLabel>
//               <Input
//                 type="text"
//                 placeholder="Your good name"
//                 rounded="md"
//                 borderColor="gray.300"
//               />
//             </FormControl>
//             <FormControl id="email" isRequired>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 placeholder="Eg: md@md.com"
//                 rounded="md"
//                 borderColor="gray.300"
//               />
//             </FormControl>
//           </Stack>
//           <FormControl id="message" isRequired>
//             <FormLabel>How can we help you?</FormLabel>
//             <Textarea
//               size="lg"
//               h="12vh"
//               placeholder="Enter your message"
//               rounded="md"
//               borderColor="gray.300"
//             />
//           </FormControl>
//           <Button
//             bg="blue.500"
//             color="white"
//             _hover={{ bg: "blue.400" }}
//             rounded="md"
//             w="full"
//           >
//             Send Message
//           </Button>
//         </VStack>
//       </MotionContainer>
//     </div>
//     </>
//   );
// };

// export default Testimonials;

import { motion } from "framer-motion";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  useColorMode,
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
import { AiFillBug } from "react-icons/ai";

import AboutUsGif from "../../MediaFiles/AboutUsGif.gif";

const testimonials = [
  {
    name: "Alex Johnson",
    position: "Code Wizard",
    company: "CodeMasters",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content:
      "Turning spaghetti code into a Michelin-star dish. Seriously, it’s like magic but with more semicolons.",
  },
  {
    name: "Jamie Lee",
    position: "Debugging Pro",
    company: "BugBusters",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    content:
      "Spotting bugs faster than a hawk on espresso. Your bugs don’t stand a chance!",
  },
  {
    name: "Jordan Smith",
    position: "Design Ace",
    company: "DesignWizards",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content:
      "Makes your README look so good, it might just win a beauty pageant. They’re the Picasso of README files.",
  },
];

const myAccounts = [
  {
    url: "#",
    label: "Github Account",
    type: "gray",
    icon: <FaGithub />,
  },
  {
    url: "#",
    label: "Twitter Account",
    type: "twitter",
    icon: <FaTwitter />,
  },
  {
    url: "#",
    label: "Dev Account",
    type: "gray",
    icon: <FaDev />,
  },
  {
    url: "#",
    label: "LinkedIn Account",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
  {
    url: "#",
    label: "Quora Account",
    type: "red",
    icon: <FaQuora />,
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
  const headingColor = isDark ? "teal.300" : "teal.600";
  const bgColor = isDark ? "gray.700" : "white";
  // const borderColor = isDark ? "gray.600" : "gray.300";
  // const buttonBgColor = isDark ? "blue.600" : "blue.500";
  // const buttonHoverColor = isDark ? "blue.500" : "blue.400";
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
                {myAccounts.map((account, idx) => (
                  <IconButton
                    key={idx}
                    as="a"
                    href={account.url}
                    aria-label={account.label}
                    icon={account.icon}
                    colorScheme={account.type}
                    variant={iconProps.variant}
                    size={iconProps.size}
                    isRound={iconProps.isRound}
                    m={1}
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
                bg={bugButtonBgColor}
                color="white"
                _hover={{ bg: bugButtonHoverColor }}
                rounded="md"
                leftIcon={<AiFillBug />}
              >
                Report a bug
              </Button>
            </MotionFlex>
          </Stack>
        </Center>
      </MotionContainer>

      {/* Developed By */}
      <MotionContainer
        maxW="5xl"
        p={{ base: 5, md: 10 }}
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
            Developed by
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
                {testimonial.position}, {testimonial.company}
              </Text>
              <Text fontSize="md" color={textColor}>
                {testimonial.content}
              </Text>
              <Divider my={1} />
              <MotionFlex justify="center" wrap="wrap">
                {accounts.map((account, idx) => (
                  <IconButton
                    key={idx}
                    as="a"
                    href={account.url}
                    aria-label={account.label}
                    icon={account.icon}
                    colorScheme={account.type}
                    variant={iconProps.variant}
                    size={iconProps.size}
                    isRound={iconProps.isRound}
                    m={1}
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
          <Heading fontSize="3xl" mb={4} color="teal.600">
            Contact Us
          </Heading>
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
