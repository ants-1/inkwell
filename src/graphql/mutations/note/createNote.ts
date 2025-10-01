import { gql } from "@apollo/client";

export const createNote = gql`
  mutation CreateNote($folderId: ID!, $input: NoteInput!) {
    createNote(folderId: $folderId, input: $input) {
      _id
      author
      content
      date
      tags
    }
  }
`;