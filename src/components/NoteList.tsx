import { VStack } from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import { Note } from "../../types/Note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <VStack w="full" mt="10">
      {notes.map((note, i) => (
        <NoteCard key={i} note={note} />
      ))}
    </VStack>
  )
}
