import { Box, Flex, Spacer, Button, Container } from "@chakra-ui/react";
import { logout } from "../requests";
import { logout } from "../requests";
import { useUser } from "../UserContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { setIsUser, user, setUser } = useUser();

  const handleLogOut = () => {
    logout();
  const handleLogOut = () => {
    logout();
    setIsUser(false);
    setUser({ role: "", name: "" });
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
}

export default Navbar;
