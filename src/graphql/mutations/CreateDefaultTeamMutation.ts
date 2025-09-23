import { gql } from "@apollo/client";

export const CreateDefaultTeam = gql`
  mutation CreateDefaultTeam($input: TeamInput!) {
    createDefaultTeam(input: $input) {
      _id
      name
      teamType
      members {
        user {
          _id
          username
        }
        role
      }
      folders {
        _id
        name
      }
    }
  }
`;
