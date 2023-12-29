import {
  Spinner,
  Heading,
  Box,
  Card,
  CardBody,
  CardHeader,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { useUser } from "../UserContext";
import CreateTodoForm from "./createTodoForm";
import EditTodoForm from "./editTodoForm";

export interface TodoType {
  id: number;
  title: string;
  description: string;
  createdBy: string;
}

function Main() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleDelete = async (id: number) => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/v1/todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

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
          <CreateTodoForm setTodos={setTodos} setLoading={setLoading} />
          <Stack
            direction={["column", "row"]}
            spacing="5"
            display="flex"
            flexWrap="wrap"
          >
            {todos.map((el) => (
              <Card
                maxW="md"
                minWidth="400px"
                borderRadius="lg"
                overflow="hidden"
                mb={4}
                key={el.id}
              >
                <CardHeader>
                  <Box flex="1">
                    <Box mb={2}>
                      <strong>{el.title}</strong>
                    </Box>
                    <Box color="gray.500">{el.description}</Box>
                  </Box>
                </CardHeader>
                {(user.role === "admin" || user.role === el.createdBy) && (
                  <CardBody>
                    <Box textAlign="right">
                      <EditTodoForm
                        todo={el}
                        setLoading={setLoading}
                        setTodos={setTodos}
                      />
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={() => handleDelete(el.id)}
                        mx={2}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardBody>
                )}
              </Card>
            ))}
          </Stack>
        </>
      )}
    </>
  );
}

export default Main;
