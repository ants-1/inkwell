import { gql } from "@apollo/client";

export const getTeamFolders = gql`
  query GetTeamFolders($teamId: ID!) {
    getTeamFolders(teamId: $teamId) {
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
