import { Flex, Heading, Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

const ErrorPage = () => {
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
      bgGradient="linear(to-r, cyan.100, blue.300)"
      color="white"
      px={4}
    >
      <Heading as="h1" fontSize="4xl" mb={4} fontWeight="bold" textShadow="2px 2px 4px rgba(0,0,0,0.4)">
        Oops! Something went wrong... But hey, it's a feature!
      </Heading>
      <Heading as="h2" fontSize="2xl" mb={8} fontWeight="semibold">
        Developer bahut gareeb hai, isi liye yahan
      </Heading>
      <Flex alignItems="center" justifyContent="center" mb={8}>
        <Image
          src="/images/meme.jpg"
          alt="Error Image"
          width={300}
          height={225}
          borderRadius="lg"
          boxShadow="md"
        />
      </Flex>
      <Button
        as="a"
        href="/"
        colorScheme="teal"
        size="lg"
        borderRadius="full"
        px={10}
        py={4}
        _hover={{ bg: 'teal.600' }}
        mb={4}
      >
        Go to Home
      </Button>
    </Flex>
  );
};

export default ErrorPage;
