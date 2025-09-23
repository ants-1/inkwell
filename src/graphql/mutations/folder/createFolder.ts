import { gql } from "@apollo/client";

export const createFolder = gql`
  mutation CreateFolder($teamId: ID!, $input: FolderInput!) {
    createFolder(teamId: $teamId, input: $input) {
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
