import React from "react";
import {
    chakra,
    Stack,
    HStack,
    Text,
    Box,
    Flex,
    Link,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const HeroSection = () => {
    return (
        <Stack
            p={{ base: 5, md: 10 }}
            direction={{ base: "column", md: "row" }}
            bgImage={{
                base: "none",
                // md: "url(https://mantine.dev/static/banner-3aed73d88ba2f8fca5f19f43eb8df554.webp)",
                md: "https://images.unsplash.com/photo-1590935216109-8d3318de2c1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdpdGh1YnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            }}
            backgroundSize="980px"
            backgroundPosition="center right"
            backgroundRepeat="no-repeat"
            minH={{ base: "unset", md: "450px" }}
        >
            <Box
                bgImage={{
                    base: "none",
                    //   md: "linear-gradient(45deg, #e9ecef 25%, rgba(0, 0, 0, 0) 95%)",
                }}
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                zIndex="0"
                overflow={"hidden"}
                opacity="0.8"
            ></Box>
            <Stack
                pos="relative"
                zIndex={1}
                direction="column"
                justifyContent="center"
                spacing={6}
                maxW="550px"
            >
                <chakra.h1
                    fontSize={{ base: "3xl", sm: "5xl" }}
                    lineHeight={1}
                    fontWeight="bold"
                    textAlign="left"
                >
                    Lorem, ipsum dolor. <br />
                </chakra.h1>
                <Text
                    fontSize="1.2rem"
                    textAlign="left"
                    lineHeight="1.375"
                    fontWeight="400"
                    color={useColorModeValue("gray.500", "gray.700")}
                >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut quia, voluptate explicabo odio laboriosam facere amet natus reiciendis voluptatum culpa ipsa quas magnam voluptatem, perferendis doloribus dicta eius necessitatibus repellat incidunt architecto ut quasi cupiditate, a animi. Voluptate eveniet laboriosam a sit amet alias nobis animi? Minus tempore consequatur error.
                </Text>
                <HStack spacing={{ base: 0, sm: 2 }} flexWrap="wrap">
                    <chakra.button
                        h={10}
                        px={6}
                        color="white"
                        variant="solid"
                        fontSize="md"
                        rounded="md"
                        mb={{ base: 2, sm: 0 }}
                        zIndex={5}
                        lineHeight={1}
                        bg="blue.400"
                        _hover={{ bg: "blue.600" }}
                    >
                        View Templates
                    </chakra.button>
                    <Flex
                        as={Link}
                        justify="center"
                        h={10}
                        px={6}
                        lineHeight={1.18}
                        rounded="md"
                        fontWeight="bold"
                        alignItems="center"
                        bg={useColorModeValue("gray.200", "gray.600")}
                        _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                    >
                        <Icon as={FaGithub} h={4} w={4} />
                        <chakra.span ml={1}> Open Source</chakra.span>
                    </Flex>
                </HStack>
            </Stack>
        </Stack>
    );
};

export default HeroSection;