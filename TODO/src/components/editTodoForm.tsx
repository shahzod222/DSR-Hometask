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

interface EditTodoFormProps {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  todo: TodoType;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
  todo,
  setLoading,
  setTodos,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const initialRef = React.useRef(null);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError("Fill title");
    }

    if (!description.trim()) {
      setDescriptionError("Fill description");
    }

    if (description === todo.description || title === todo.title) {
      setDescriptionError("Edit TODO");
      setTitleError("Edit TODO");
    }

    if (
      title.trim() !== todo.title &&
      description.trim() !== todo.description
    ) {
      setDescriptionError("");
      setTitleError("");

      const todoData = {
        title: title.trim(),
        description: description.trim(),
      };

      const updatedTodo = {
        id: todo.id,
        title: title.trim(),
        description: description.trim(),
        createdBy: todo.createdBy,
      };

      setLoading(true);

      fetch(`http://localhost:3000/api/v1/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(todoData),
      }).then((res) => {
        if (res.ok) {
          onClose();
          setTodos((prevTodos) =>
            prevTodos.map((el) =>
              el.id === todo.id ? { ...todo, ...updatedTodo } : el
            )
          );

          setLoading(false);
        }
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant="outline" colorScheme="blue">
        Edit
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit TODO</ModalHeader>
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
              Edit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTodoForm;
