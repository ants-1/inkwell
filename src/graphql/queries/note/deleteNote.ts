import { gql } from "@apollo/client";

export const deleteNote = gql`
  mutation DeleteNote($id: ID!, $folderId: ID!) {
    deleteNote(_id: $id, folderId: $folderId)
  }
`;
