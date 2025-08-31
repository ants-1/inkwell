"use client";

import { Box, Button, Textarea, HStack } from "@chakra-ui/react"
import { Note } from "../../types/Note";
import { useState } from "react";

interface NoteInputProps {
  onAddNote: (note: Note) => void;
}

export default function NoteInput({ onAddNote }: NoteInputProps) {
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!content.trim()) return;

    const newNote: Note = {
      author: "MaxPower20",
      content,
      date: new Date().toISOString().split("T")[0],
      tags: ["New"],
    };

    onAddNote(newNote);
    setContent("");
  };

  return (
    <Box backgroundColor="gray.700" p="6" rounded="md" maxW="2xl" w="full">
      <Textarea
        color="white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoresize
        maxH="xl"
        minH="28"
      />
      <HStack mt="2">
        <Button variant="surface" colorScheme="whiteAlpha" onClick={handleAdd}>
          Create
        </Button>
      </HStack>
    </Box>
  );
}
