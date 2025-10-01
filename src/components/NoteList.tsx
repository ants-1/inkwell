import { VStack } from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import { Note } from "../types/Note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <VStack w="full" mt="4" maxW="2xl">
      {[...notes].reverse().map((note, i) => (
        <NoteCard key={i} note={note} />
      ))}
    </VStack>
  )
}
