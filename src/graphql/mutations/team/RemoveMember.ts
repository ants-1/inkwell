import { gql } from "@apollo/client";

export const removeMemeber = gql`
  mutation RemoveMember($teamId: ID!, $userId: ID!) {
    removeMember(teamId: $teamId, userId: $userId) {
      _id
      name
      members {
        user {
          username
        }
        role
      }
    }
  }
`;
