import { useEffect, useState } from "react";
import { Box, Button, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Todo from "../components/Todo";
import { supabase } from "../supabaseClient";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await supabase.from("todos").select("*");
    setTodos(data);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    await supabase
      .from("todos")
      .update({ is_completed: !todo.is_completed })
      .eq("id", id);
    fetchTodos();
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Todo List</Heading>
      <Button mb={4} onClick={() => navigate("/create")}>
        Create Todo
      </Button>
      <VStack spacing={4}>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default HomePage;