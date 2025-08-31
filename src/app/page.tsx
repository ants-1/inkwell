"use client"

import NoteInput from "@/components/NoteInput";
import NoteList from "@/components/NoteList";
import Sidebar from "@/components/Sidebar";
import { Box, VStack } from "@chakra-ui/react";
import { mockNotesData } from "../lib/mock-data";
import { useState } from "react";
import { Note } from "../types/Note";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(mockNotesData);

  const addNote = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  }

  return (
    <Box backgroundColor="gray.800" display="flex" ml={{ base: "16", md: "20" }}>
      <Sidebar />
      <VStack w="full" my="7" px="10">
        <NoteInput onAddNote={addNote} />
        {/* 
          - Workspace/Teams
          - Tags
        */}
        <NoteList notes={notes} />
      </VStack>
    </Box>
  );
}
