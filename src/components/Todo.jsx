import { Checkbox, IconButton, Text, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Todo = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  return (
    <HStack spacing={4} w="100%" p={4} borderWidth={1} borderRadius="md">
      <Checkbox
        isChecked={todo.is_completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      <Text flex={1} textDecoration={todo.is_completed ? "line-through" : "none"}>
        {todo.task}
      </Text>
      <IconButton
        aria-label="Edit"
        icon={<FaEdit />}
        onClick={() => onEdit(todo.id)}
      />
      <IconButton
        aria-label="Delete"
        icon={<FaTrash />}
        onClick={() => onDelete(todo.id)}
      />
    </HStack>
  );
};

export default Todo;