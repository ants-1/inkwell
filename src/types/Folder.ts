import { Note } from "./Note";

export type Folder = {
  _id: string;
  name: string;
  notes: Note[];
}