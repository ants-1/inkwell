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

  input EditUserInput {
    username: String
    email: String
  }

  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    createUser(input: NewUserInput!): User
    editUser(_id: ID!, input: EditUserInput!): User
  }
`;
