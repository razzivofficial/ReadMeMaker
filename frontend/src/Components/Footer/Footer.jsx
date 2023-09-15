import React from "react";
import {
  Container,
  Box,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Link,
  Image,
} from "@chakra-ui/react";

import FooterSignup from "./SignUp";
import {
  ExternalFooterLink,
  InternalFooterLink,
  ExternalSocialLink,
} from "./Links";

import {
  FaGithub,
  FaDev,
  FaLinkedin,
  FaQuora,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }} mt={8}>
      <SimpleGrid
        flexDirection="column-reverse"
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
        borderTopWidth={2}
        mt="30px"
        borderTopColor="gray.900"
        pt="20px"
      >
        <Link href="#" isExternal display={{ base: "none", md: "block" }}>
          <Image
            w="30%"
            src="https://t3.ftcdn.net/jpg/04/01/04/04/360_F_401040407_G0Oc6pezJWHDUMLrFEkcSJMXgi3fuIT0.jpg"
            alt="ReadMeMaker"
          />
        </Link>
        <Box d={["block", "block", "none", "none"]} mb="30px" mx={5}>
          <FooterSignup />
        </Box>
        <Box>
          <SimpleGrid columns={[1, 1, 2, 2]}>
            <Stack mb={["10px", "10px", 0, 0]}>
              <Text as="span">
                <ExternalFooterLink href="#" text="Contact us" />
              </Text>
              <Text as="span">
                <ExternalFooterLink href="#" text="Contribute" />
              </Text>
              <Text as="span">
                <InternalFooterLink href="#" text="Open source projects" />
              </Text>
            </Stack>
            <Stack>
              <Text as="span">
                <Popover placement="top">
                  <PopoverTrigger>
                    <Text
                      as="span"
                      _focus={{ outline: "none", boxShadow: "none" }}
                      fontWeight={500}
                      color="gray.500"
                      cursor="pointer"
                      _hover={{ color: "gray.600", textDecoration: "none" }}
                    >
                      Click to connect
                    </Text>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Stack
                          as="footer"
                          spacing={[1, 2]}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ExternalSocialLink
                            // href={siteConfig.author.github}
                            href="#"
                            icon={<FaGithub />}
                            type="gray"
                            label="Github Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.dev}
                            href="#"
                            icon={<FaDev />}
                            type="gray"
                            label="Dev Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.linkedin}
                            href="#"
                            icon={<FaLinkedin />}
                            type="linkedin"
                            label="LinkedIn Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.twitter}
                            href="#"
                            icon={<FaTwitter />}
                            type="twitter"
                            label="Twitter Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.quora}
                            href="#"
                            icon={<FaQuora />}
                            type="red"
                            label="Quora Account"
                          />
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Text>
              <Text as="span">
                <ExternalFooterLink href="#" text="Get Me A Coffie" />
              </Text>
              <Text as="span">
                <ExternalFooterLink
                  href="#"
                  isExternal={false}
                  text="Documentation"
                />
              </Text>
            </Stack>
          </SimpleGrid>
          <Text mt="20px" color="gray.500">
            Made with 🧡 by {""}
            <ChakraLink
              _focus={{ boxShadow: "none", outline: "none" }}
              target="_blank"
              //   href={siteConfig.author.github}
              href="#"
              fontWeight={600}
              color="gray.400"
              bgClip="text"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
            >
              Razziv
            </ChakraLink>{" "}
          </Text>
        </Box>
        <Box d={["none", "none", "block", "block"]}></Box>
      </SimpleGrid>
    </Container>
  );
};

export default Footer;
