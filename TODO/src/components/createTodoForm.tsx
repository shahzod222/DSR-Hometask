import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
  Input,
  useDisclosure,
  FormErrorMessage,
} from "@chakra-ui/react";
import { TodoType } from "./Main";

interface CreateTodoForm {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CreateTodoForm: React.FC<CreateTodoForm> = ({ setTodos, setLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = () => {
    if (title === "") {
      setTitleError("Fill title");
    }

    if (description === "") {
      setDescriptionError("Fill description");
    }

    if (description && title) {
      setDescriptionError("");
      setTitleError("");

      const todoData = {
        title: title,
        description: description,
      };

      setLoading(true);

      fetch("http://localhost:3000/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(todoData),
      })
        .then((res) => res.json())
        .then((data: TodoType) => {
          onClose();
          setTodos((todos) => [...todos, data]);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant="outline" colorScheme="blue" m="auto">
        Create TODO
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create TODO</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!titleError}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormErrorMessage>{titleError}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!!descriptionError}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormErrorMessage>{descriptionError}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTodoForm;
