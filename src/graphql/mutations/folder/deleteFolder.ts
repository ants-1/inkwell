import { gql } from "@apollo/client";

export const deleteFolder = gql`
  mutation DeleteFolder($folderId: ID!) {
    deleteFolder(_id: $folderId)
  }
`;
