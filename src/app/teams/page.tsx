"use client"

import Sidebar from "@/components/Sidebar";
import { Box, Text, Flex, Tabs, VStack, Heading } from "@chakra-ui/react";
import { Team } from "@/types/Team";
import { mockNotesData } from "@/lib/mock-data";
import NoteList from "@/components/NoteList";
import { Folder } from "@/types/Folder";
import { FolderOpen } from "lucide-react";
import NoteInput from "@/components/NoteInput";
import { useState } from "react";
import { Note } from "@/types/Note";

const teams: Team[] = [
  {
    name: "My Team",
    members: [
      { name: "MaxPower20" },
      { name: "BillyBob" }
    ],
    folders: [
      {
        name: "First Folder",
        notes: mockNotesData
      },
      {
        name: "Second Folder",
        notes: mockNotesData
      }
    ]
  },
  {
    name: "Work Team",
    members: [
      { name: "MaxPower20" },
      { name: "BillyBob" }
    ],
    folders: [
      {
        name: "First Folder",
        notes: mockNotesData
      },
      {
        name: "Second Folder",
        notes: []
      }
    ]
  }
];

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
        <Flex>
          {/* Top-level: Teams */}
          <Tabs.Root variant="outline" defaultValue={teams[0].name} width="xl">
            <Tabs.List>
              {teams.map((team: Team, index: number) => (
                <Tabs.Trigger key={index} value={team.name} color="white">
                  {team.name}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Box pos="relative" minH="200px" width="full">
              {teams.map((team: Team, index: number) => (
                <Tabs.Content
                  key={index}
                  value={team.name}
                  position="absolute"
                  inset="0"
                >
                  {/* Nested Tabs: Folders */}
                  <Tabs.Root
                    variant="enclosed"
                    defaultValue={team.folders[0].name}
                  >
                    <Tabs.List>
                      {team.folders.map((folder: Folder, index: number) => (
                        <Tabs.Trigger key={index} value={folder.name}>
                          <FolderOpen size={16} style={{ marginRight: 6 }} />
                          {folder.name} ({folder.notes.length})
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>

                    {team.folders.map((folder: Folder, index: number) => (
                      <Tabs.Content key={index} value={folder.name}>
                        <NoteInput onAddNote={addNote} />
                        <NoteList notes={folder.notes} />
                      </Tabs.Content>
                    ))}
                  </Tabs.Root>
                </Tabs.Content>
              ))}
            </Box>
          </Tabs.Root>
        </Flex>
      </VStack>
    </Box>
  )
}
