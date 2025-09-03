"use client"

import NoteInput from "@/components/NoteInput";
import NoteList from "@/components/NoteList";
import Sidebar from "@/components/Sidebar";
import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import { mockNotesData, mockTeamsData } from "../../lib/mock-data";
import { useState } from "react";
import { Note } from "../../types/Note";
import FoldersTab from "@/components/FoldersTab";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotesData);

  const addNote = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  }

  return (
    <Box backgroundColor="gray.800" display="flex" ml={{ base: "16", md: "20" }}>
      <Sidebar />
      <VStack w="full" my="7" px="10">
        <Heading size="xl" mb="8" color="white">My Notes</Heading>
        <FoldersTab 
          defaultFolder={mockTeamsData[0].folders[0].name}
          folders={mockTeamsData[0].folders}
          addNote={addNote}
        />
      </VStack>
    </Box>
  );
}
