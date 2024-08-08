import { Container, Box, Skeleton, SimpleGrid, Stack } from "@chakra-ui/react";

const TempCompoLoader = () => {
  return (
    <Container maxW="7xl" px={8} py={16} mx="auto">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {Array.from(Array(6).keys()).map((id) => (
          <Box
            key={id}
            cursor="pointer"
            borderWidth="1px"
            shadow="md"
            bg="#fbfdff"
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
                    />
                  </Box>
                  <Skeleton height="14px" width="20%" />
                  <Skeleton height="16px" width="100%" />
                </Stack>
              </Box>
            </Stack>
            <Box m={4}>
              <Skeleton
                height="15rem"
                borderRadius="5px 5px 0 0"
                width="100%"
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default TempCompoLoader;
