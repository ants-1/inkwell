import { gql } from "@apollo/client";

export const editTeam = gql`
  mutation EditTeam(
    $teamId: ID!
    $userId: ID!
    $name: String
    $teamType: String
  ) {
    editTeam(
      teamId: $teamId
      userId: $userId
      name: $name
      teamType: $teamType
    ) {
      _id
      name
      teamType
    }
  }
`;
