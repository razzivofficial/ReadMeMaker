import React from "react";
import {
  Container,
  Box,
  Skeleton,
  SimpleGrid,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

const TempCompoLoader = () => {
  const { colorMode } = useColorMode();

  return (
    <Container maxW="7xl" px={8} py={16} mx="auto">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {Array.from(Array(6).keys()).map((id) => (
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
            mt={10}
          >
            <Stack justifyContent="space-between" mt={3} p={5}>
              <Box width="100%">
                <Stack marginBottom="5px">
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
            <Box m={4}>
              <Skeleton
                height="15rem"
                borderRadius="5px 5px 0 0"
                width="100%"
                bg={colorMode === "dark" ? "#4A5568" : "#E2E8F0"} // Dark mode skeleton color
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default TempCompoLoader;
