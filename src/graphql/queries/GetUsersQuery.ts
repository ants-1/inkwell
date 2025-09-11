import { gql } from "@apollo/client";

export const getUsers = gql`
  query GetUsersQuery {
    users {
      _id
      username
      email
    }
  }
`;