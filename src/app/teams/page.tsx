"use client"

import Sidebar from "@/components/Sidebar";
import { Box, Tabs, VStack, Heading } from "@chakra-ui/react";
import { Team } from "@/types/Team";
import { useState } from "react";
import { Note } from "@/types/Note";
import FoldersTab from "@/components/FoldersTab";
import { mockTeamsData, mockNotesData } from "@/lib/mock-data";

export default function TeamsPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotesData);

  const addNote = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  }

  return (
    <Box backgroundColor="gray.800" display="flex" ml={{ base: "16", md: "20" }}>
      <Sidebar />
      <VStack w="full" minH="dvh" h="full" my="7" px="10">
        <Heading size="xl" color="white" mb="5">Teams</Heading>
        {/* Top-level: Teams */}
        <Tabs.Root variant="outline" defaultValue={mockTeamsData[0].name} w="full" maxW="2xl" >
          <Tabs.List>
            {mockTeamsData.map((team: Team, index: number) => (
              <Tabs.Trigger key={index} value={team.name} color="white">
                {team.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Box pos="relative" minH="200px" width="full">
            {mockTeamsData.map((team: Team, index: number) => (
              <Tabs.Content
                key={index}
                value={team.name}
                inset="0"
              >
                {/* Nested Tabs: Folders */}
                <FoldersTab
                  defaultFolder={team.folders[0].name}
                  folders={team.folders}
                  addNote={addNote}
                />
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      </VStack>
    </Box>
  )
}
