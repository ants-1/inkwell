import { gql } from "graphql-tag";

export const noteTypeDefs = gql`
  type Note {
    _id: ID!
    author: String!
    content: String!
    date: String!
    tags: [String!]!
  }

  input NoteInput {
    author: String!
    content: String!
    date: String
    tags: [String!]!
  }

  type Query {
    getNotesByFolder(folderId: ID!): [Note!]! 
    getNote(_id: ID!): Note
  }

  type Mutation {
    createNote(folderId: ID!, input: NoteInput!): Note!
    editNote(_id: ID!, input: NoteInput!): Note!
    deleteNote(_id: ID!, folderId: ID!): Boolean!
  }
`;
