import { useEffect, useState } from "react";
import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditTodoPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    const { data } = await supabase.from("todos").select("*").eq("id", id).single();
    setTask(data.task);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("todos").update({ task }).eq("id", id);
    navigate("/");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Edit Todo</Heading>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Input
          placeholder="Task description"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button type="submit">Update</Button>
      </VStack>
    </Box>
  );
};

export default EditTodoPage;