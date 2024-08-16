import React, { useState } from "react";
import logoImg from "../../MediaFiles/logo.png";
import { Link as Navlink } from "react-router-dom";
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
import CoffeePage from "../CoffeePage/CoffeePage";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);
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
        <Link as={Navlink} to={"/"} display={{ base: "none", md: "block" }}>
          <Image w="30%" src={logoImg} alt="ReadMeMaker" />
        </Link>
        <Box d={["block", "block", "none", "none"]} mb="30px" mx={5}>
          <FooterSignup />
        </Box>
        <Box>
          <SimpleGrid columns={[1, 1, 2, 2]}>
            <Stack mb={["10px", "10px", 0, 0]}>
              <Text as="span">
                <ExternalFooterLink href="#contact-us" text="Contact us" />
              </Text>
              {/* <Text as="span">
                <ExternalFooterLink onClick={openModal} text="Contribute" />
                <CoffeePage isOpen={isModalOpen} onClose={closeModal} />
              </Text> */}
              <Text as="span">
                <ExternalFooterLink
                  href="https://github.com/razzivofficial/ReadMeMaker"
                  text="Contribute"
                />
              </Text>
              <Text as="span">
                <InternalFooterLink
                  href="https://github.com/razzivofficial/ReadMeMaker"
                  text="Open source projects"
                />
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
                            href="https://github.com/razzivofficial/ReadMeMaker"
                            icon={<FaGithub />}
                            type="gray"
                            label="Github Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.telegram}
                            href="https://t.me/readmemaker"
                            icon={<FaTelegram />}
                            type="gray"
                            label="Github Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.twitter}
                            href="https://x.com/readmemaker"
                            icon={<FaSquareXTwitter />}
                            type="X"
                            label="X Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.insta}
                            href="https://www.instagram.com/readmemaker/"
                            icon={<FaSquareInstagram />}
                            type="pink"
                            label="Instagram Account"
                          />
                          <ExternalSocialLink
                            // href={siteConfig.author.gmail}
                            href="mailto:readmemaker.work@gmail.com"
                            icon={<MdEmail />}
                            type="gray"
                            label="Gmail Account"
                          />
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Text>
              <Text as="span">
                <ExternalFooterLink href="/" text="Get Me A Coffie" />
              </Text>
              <Text as="span">
                <ExternalFooterLink
                  href="/documentation"
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
              href="https://github.com/razzivofficial/ReadMeMaker"
              fontWeight={600}
              color="gray.400"
              bgClip="text"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
            >
              Razziv X Tushar
            </ChakraLink>{" "}
          </Text>
        </Box>
        <Box d={["none", "none", "block", "block"]}></Box>
      </SimpleGrid>
    </Container>
  );
};

export default Footer;
