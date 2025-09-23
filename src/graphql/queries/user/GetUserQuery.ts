import { gql } from "@apollo/client";

export const geetUser = gql`
  query GetUser($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
    }
  }
`;
