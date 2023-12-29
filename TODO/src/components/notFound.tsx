import { Box, Heading, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Box>
        <Heading as="h1" size="2xl" mb="4">
          404 Not Found
        </Heading>
        <Text fontSize="lg">
          Oops! The page you are looking for does not exist.
        </Text>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
