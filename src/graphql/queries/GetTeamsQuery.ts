import { gql } from "@apollo/client";

export const getTeams = gql`
  query getTeams($userId: ID!) {
    myTeam(userId: $userId) {
      _id
      name
      teamType
      members {
        user {
          username
        }
        role
      }
      folders {
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
  }
`;
