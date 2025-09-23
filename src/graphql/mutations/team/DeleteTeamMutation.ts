import { gql } from "@apollo/client";

export const editTeam = gql`
  mutation DeleteTeam($teamId: ID!, $userId: ID!) {
    deleteTeam(teamId: $teamId, userId: $userId)
  }
`;
