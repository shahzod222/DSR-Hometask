import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { UserType, useUser } from "../UserContext";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user.role === "admin") {
          const response = await fetch("http://localhost:3000/api/v1/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            setUsers(data);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (user.role !== "admin") {
    return <Navigate to="/main" replace />;
  }

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          textAlign="center"
        >
          <Spinner size="xl" color="teal.500" marginRight="2" />
          <Heading as="h2" size="lg">
            Loading...
          </Heading>
        </Box>
      ) : (
        <>
          <Navbar />
          <Stack spacing="4">
            {users.map((el) => {
              return (
                <Card variant="filled" key={el.name}>
                  <CardHeader>
                    <Heading size="md"> {el.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>role = {el.role}</Text>
                  </CardBody>
                </Card>
              );
            })}
          </Stack>
        </>
      )}
    </>
  );
}

export default Users;
