import { gql } from "@apollo/client";

export const createTeam = gql`
  mutation CreateTeam($input: TeamInput!) {
    createTeam(input: $input) {
      _id
      name
      teamType
      members {
        user {
          username
        }
        role
      }
    }
  }
`;
