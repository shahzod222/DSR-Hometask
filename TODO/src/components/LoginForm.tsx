import { FormEvent, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserContext";

function LoginForm() {
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isUser, setIsUser, setUser } = useUser();

  const validateUsername = (value: string) => {
    if (value !== "Admin" && value !== "User") {
      return "Invalid username";
    }
    return "";
  };
  const validateUsername = (value: string) => {
    if (value !== "Admin" && value !== "User") {
      return "Invalid username";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (value !== "admin123" && value !== "user123") {
      return "Invalid password";
    }
    return "";
  };
  const validatePassword = (value: string) => {
    if (value !== "admin123" && value !== "user123") {
      return "Invalid password";
    }
    return "";
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    setUsernameError(usernameValidation);
    setPasswordError(passwordValidation);

    if (!usernameValidation && !passwordValidation) {
      setLoading(true);

      const userData = {
      const userData = {
        login: username,
        password: password,
      };

      login(userData);
    }
  };

  const login = (userData: { login: string; password: string }) => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.status === 200) {
          return fetch("http://localhost:3000/api/v1/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              }
            })
            .then((data) => {
              setIsUser(true);
              setUser(data);
            });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      {loading ? (
        <>
          <Spinner size="xl" color="teal.500" marginRight="2" />
          <Heading as="h2" size="lg">
            Loading...
          </Heading>
        </>
      ) : isUser ? (
        <Navigate to="/navbar" />
      ) : (
        <Box
          width="400px"
          p={8}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading mb={4}>Log In</Heading>
          <form>
            <FormControl id="username" mb={4} isInvalid={!!usernameError}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormErrorMessage>{usernameError}</FormErrorMessage>
            </FormControl>

            <FormControl id="password" mb={4} isInvalid={!!passwordError}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="teal"
              width="100%"
              type="submit"
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}
}

export default LoginForm;
