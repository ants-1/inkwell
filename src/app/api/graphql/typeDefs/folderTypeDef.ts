import { gql } from "graphql-tag";

export const folderTypeDefs = gql`
  type Folder {
    _id: ID!
    name: String!
    notes: [Note!]!
  }

  input FolderInput {
    name: String!
    notes: [NoteInput!]!
  }

  type Query {
    folders: [Folder]
  }
`;
