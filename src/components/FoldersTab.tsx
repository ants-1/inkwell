import { Folder } from "@/types/Folder";
import { Tabs } from "@chakra-ui/react";
import { FolderOpen } from "lucide-react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import { Note } from "@/types/Note";

interface FoldersTabProps {
  defaultFolder: string;
  folders: Folder[];
  addNote: (newNote: Note) => void;
}

export default function FoldersTab({defaultFolder, folders, addNote}: FoldersTabProps) {
  return (
    <Tabs.Root
      variant="enclosed"
      defaultValue={defaultFolder}
      maxW="2xl" 
      w="full"
    >
      <Tabs.List>
        {folders?.map((folder: Folder, index: number) => (
          <Tabs.Trigger key={index} value={folder.name}>
            <FolderOpen size={16} />
            {folder.name} ({folder.notes.length})
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {folders?.map((folder: Folder, index: number) => (
        <Tabs.Content key={index} value={folder.name}>
          <NoteInput folderId={folder._id} onAddNote={addNote} />
          <NoteList notes={folder.notes} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}