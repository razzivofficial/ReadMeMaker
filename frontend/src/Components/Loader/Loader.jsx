import { Container, Box, HStack, Skeleton, Stack } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Container maxW="6xl" px={8} py={16} mx="auto">
      <Stack spacing={3} mt="3">
        {Array.from(Array(2).keys()).map((id) => {
          return (
            <Box
              key={id}
              cursor="pointer"
              borderWidth="1px"
              shadow="md"
              bg="#fbfdff"
              position="relative"
              rounded="md"
              borderRadius="5px"
            >
              {id === 0 ? (
                <Skeleton
                  height="15rem"
                  borderRadius="5px 5px 0 0"
                  width="100%"
                />
              ) : (
                ""
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
                      />
                    </Box>
                    <Skeleton height="14px" width="20%" />
                    <Skeleton height="16px" width="100%" />
                  </Stack>
                  {/* <Box pl="2.5em">
                    <Skeleton height="16px" width="100%" />
                    <Stack spacing={2} mt={1} isInline alignItems="center">
                      <Skeleton height="14px" width="80%" />
                    </Stack>
                    <HStack
                      justify="space-between"
                      alignItems="center"
                      mt={4}
                    >
                      <HStack spacing={2} width="50%">
                        <Skeleton
                          height="12px"
                          width="40%"
                          rounded="full"
                          my={1}
                        />
                        <Skeleton
                          height="12px"
                          width="40%"
                          rounded="full"
                          my={1}
                        />
                      </HStack>
                      <Skeleton
                        height="12px"
                        width="20%"
                        rounded="full"
                        my={1}
                      />
                    </HStack>
                  </Box> */}
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Loader;
