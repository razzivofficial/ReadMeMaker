import React from "react";
import {
  Container,
  Box,
  Skeleton,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

const Loader = () => {
  const { colorMode } = useColorMode();

  return (
    <Container maxW="6xl" px={8} py={16} mx="auto">
      <Stack spacing={3} mt="3">
        {Array.from(Array(2).keys()).map((id) => (
          <Box
            key={id}
            cursor="pointer"
            borderWidth="1px"
            shadow="md"
            bg={colorMode === "dark" ? "#2D3748" : "#fbfdff"} // Dark mode background color
            borderColor={colorMode === "dark" ? "#4A5568" : "#E2E8F0"} // Dark mode border color
            position="relative"
            rounded="md"
            borderRadius="5px"
          >
            {id === 0 && (
              <Skeleton
                height="15rem"
                borderRadius="5px 5px 0 0"
                width="100%"
                bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"} // Dark mode skeleton color
              />
            )}
            <Stack justifyContent="space-between" mt={3} p={5}>
              <Box width="100%">
                <Stack align="center" marginBottom="5px">
                  <Box>
                    <Skeleton
                      size="lg"
                      width="2em"
                      height="2em"
                      borderRadius="50%"
                      bg={colorMode === "dark" ? "#4A5568" : "#EDF2F7"} // Dark mode skeleton color
                    />
                  </Box>
                  <Skeleton
                    height="14px"
                    width="20%"
                    bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"} // Dark mode skeleton color
                  />
                  <Skeleton
                    height="16px"
                    width="100%"
                    bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"} // Dark mode skeleton color
                  />
                </Stack>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Loader;
