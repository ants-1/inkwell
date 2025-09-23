import { gql } from "@apollo/client";

export const getFolderByUser = gql`
  query GetFoldersByUser($userId: ID!) {
    getFoldersByUser(userId: $userId) {
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
