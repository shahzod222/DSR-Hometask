import React from "react";
import { Box, Flex, Spacer, Button, Container } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import { Link } from "react-router-dom";

const logout = async () => {
  try {
    await fetch("http://localhost:3000/api/v1/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

const Navbar: React.FC = () => {
  const { setIsUser, user } = useUser();

  const handleLogOut = async () => {
    await logout();
    setIsUser(false);
  };

  return (
    <Box p={4} shadow="md" marginBottom={4}>
      <Container maxW="container.lg">
        <Flex>
          <Box>
            <Link to="/main">
              <Button variant="ghost" colorScheme="teal">
                Main
              </Button>
            </Link>
            {user.role === "admin" && (
              <Link to="/users">
                <Button variant="ghost" colorScheme="teal">
                  Users
                </Button>
              </Link>
            )}
          </Box>
          <Spacer />
          <Box>
            <Button variant="ghost" colorScheme="blue">
              {user.name}
            </Button>
            <Button variant="ghost" colorScheme="teal" onClick={handleLogOut}>
              Log out
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
