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
    folders: [Folder!]!
    getTeamFolders(teamId: ID!): [Folder!]!
    getFoldersByUser(userId: ID!): [Folder!]!
  }

  type Mutation {
    createFolder(teamId: ID!, input: FolderInput!): Folder!
    editFolder(_id: ID!, input: FolderInput!): Folder!
    deleteFolder(_id: ID!): Boolean!
  }
`;
