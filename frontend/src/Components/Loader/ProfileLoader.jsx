import React from "react";
import {
  Container,
  Box,
  Skeleton,
  Stack,
  useColorMode,
  Divider,
} from "@chakra-ui/react";

const ProfileLoader = () => {
  const { colorMode } = useColorMode();

  return (
    <Container maxW="6xl" px={8} py={16} mx="auto" mt={8}>
      <Stack spacing={6}>
        {/* Profile Header */}
        <Box
          borderWidth="1px"
          shadow="md"
          bg={colorMode === "dark" ? "#2D3748" : "#fbfdff"}
          borderColor={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
          rounded="md"
          borderRadius="5px"
          p={5}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            align="center"
          >
            {/* Profile Picture */}
            <Skeleton
              width="250px"
              height="250px"
              borderRadius="full"
              bg={colorMode === "dark" ? "#4A5568" : "#EDF2F7"}
            />

            {/* Profile Details */}
            <Stack spacing={3} flex="1">
              <Skeleton
                height="60px"
                width="40%"
                bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
              />
              <Skeleton
                height="25px"
                width="60%"
                bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
              />
              <Skeleton
                height="25px"
                width="50%"
                bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
              />
            </Stack>
          </Stack>
        </Box>

        {/* <Divider /> */}

        {/* Additional Sections */}
        {Array.from(Array(2).keys()).map((id) => (
          <Box
            key={id}
            borderWidth="1px"
            shadow="md"
            bg={colorMode === "dark" ? "#2D3748" : "#fbfdff"}
            borderColor={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
            rounded="md"
            borderRadius="5px"
            p={5}
          >
            <Stack spacing={4}>
              {/* Section Title */}
              <Skeleton
                height="40px"
                width="30%"
                bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
              />

              {/* Section Content */}
              <Stack spacing={3}>
                <Skeleton
                  height="30px"
                  width="80%"
                  bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
                />
                <Skeleton
                  height="25px"
                  width="90%"
                  bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
                />
                <Skeleton
                  height="25px"
                  width="75%"
                  bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"}
                />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default ProfileLoader;
