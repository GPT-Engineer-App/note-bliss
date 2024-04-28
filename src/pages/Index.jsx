import { useState } from 'react';
import { Box, Button, Input, Text, VStack, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (input === '') {
      toast({
        title: 'No content',
        description: "You can't add an empty note!",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, input]);
    setInput('');
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index) => {
    const newInput = notes[index];
    deleteNote(index);
    setInput(newInput);
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Input
          placeholder="Type here to add a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote}>
          Add Note
        </Button>
        {notes.map((note, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
            <Text>{note}</Text>
            <IconButton
              aria-label="Edit note"
              icon={<FaEdit />}
              onClick={() => editNote(index)}
            />
            <IconButton
              aria-label="Delete note"
              icon={<FaTrash />}
              onClick={() => deleteNote(index)}
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;