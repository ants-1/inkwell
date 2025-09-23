import { gql } from "@apollo/client";

export const editFolder = gql`
  mutation EditFolder($folderId: ID!, $input: FolderInput!) {
    editFolder(_id: $folderId, input: $input) {
      _id
      name
      notes {
        _id
        author
        content
        date
        tags
      }
    }
  }
`;
