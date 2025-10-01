"use client";

import { Box, Button, Textarea, HStack } from "@chakra-ui/react"
import { Note } from "../types/Note";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { createNote } from "@/graphql/mutations/note/createNote";
import { useSession } from "next-auth/react";
import { formattedNowDate } from "@/utils/formattedDates";

interface NoteInputProps {
  folderId: string;
  onAddNote: (note: Note) => void;
}

export default function NoteInput({ folderId, onAddNote }: NoteInputProps) {
  const [content, setContent] = useState("");

  const { data: session } = useSession();

  const [addNoteMutation, { loading, error }] = useMutation(createNote);

  const handleAdd = async () => {
    if (!content.trim()) return;

    try {
      const now = new Date();

      const { data } = await addNoteMutation({
        variables: {
          folderId,
          input: {
            author: session?.user.name,
            content,
            date: formattedNowDate(now),
            tags: ["New"],
          }
        }
      })

      if (data?.createNote) {
        onAddNote(data.createNote);
        setContent("");
      }
    } catch (err) {
      console.error("Failed to create note:", err);
    }
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
