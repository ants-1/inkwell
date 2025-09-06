import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }
  
  input NewUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: NewUserInput!): User
  }
`;
