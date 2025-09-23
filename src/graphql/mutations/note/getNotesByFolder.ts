import { gql } from "@apollo/client";

export const getNotesByFolder = gql`
  query GetNotesByFolder($folderId: ID!) {
    getNotesByFolder(folderId: $folderId) {
      _id
      author
      content
      date
      tags
    }
  }
`;
