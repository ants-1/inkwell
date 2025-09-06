import { gql } from "graphql-tag";

export const noteTypeDefs = gql`
  type Note {
    _id: ID!
    author: String!
    content: String!
    date: String!
    tags: [String!]!
  }

  type Query {
    notes: [Note]
  }

  input NoteInput {
    author: String!
    content: String!
    date: String!
    tags: [String!]!
  }
`;
