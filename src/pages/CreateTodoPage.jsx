import { useState } from "react";
import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const CreateTodoPage = () => {
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("todos").insert([{ task }]);
    navigate("/");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Create Todo</Heading>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Input
          placeholder="Task description"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </VStack>
    </Box>
  );
};

export default CreateTodoPage;