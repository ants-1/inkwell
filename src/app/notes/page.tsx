"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import Sidebar from "@/components/Sidebar";
import FoldersTab from "@/components/FoldersTab";
import { Box, VStack, Heading, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { getFolderByUser } from "@/graphql/queries/folder/getFoldersByUser";
import { Note } from "@/types/Note";
import { Folder } from "@/types/Folder";
import { CreateDefaultTeam } from "@/graphql/mutations/team/CreateDefaultTeamMutation";

export default function NotesPage() {
  const [_, setNotes] = useState<Note[]>([]);
  const { data: session } = useSession();

  const { data, loading, error, refetch } = useQuery(getFolderByUser, {
    variables: { userId: session?.user?.id },
    skip: !session?.user?.id,
  });

  const [createDefaultTeam] = useMutation(CreateDefaultTeam);

  useEffect(() => {
    const folders = data?.getFoldersByUser ?? [];
    if (!loading && !error && folders.length === 0 && session?.user?.id) {
      createDefaultTeam({
        variables: {
          input: {
            name: "Default Team",
            userId: session.user.id,
          },
        },
      }).then(() => {
        refetch();
      });
    }
  }, [data, loading, error, createDefaultTeam, refetch, session?.user?.id]);

  const addNote = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    refetch();
  };

  if (loading) {
    return (
      <Box backgroundColor="gray.800" display="flex" ml={{ base: "16", md: "20" }}>
        <Sidebar />
        <VStack w="full" my="7" px="10">
          <Heading size="xl" mb="8" color="white">My Notes</Heading>
          <Spinner size="xl" color="white" />
        </VStack>
      </Box>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error.message}</p>;
  }

  const folders: Folder[] = Array.isArray(data?.getFoldersByUser)
    ? data.getFoldersByUser
    : [];

  return (
    <Box backgroundColor="gray.800" display="flex" ml={{ base: "16", md: "20" }}>
      <Sidebar />
      <VStack w="full" my="7" px="10">
        <Heading size="xl" mb="8" color="white">My Notes</Heading>
        <FoldersTab
          defaultFolder={folders?.[0]?.name ?? ""}
          folders={folders}
          addNote={addNote}
        />
      </VStack>
    </Box>
  );
}
