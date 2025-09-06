import { gql } from "graphql-tag";

export const teamTypeDefs = gql`
  type Member {
    name: String!
  }

  input MemberInput {
    name: String!
  }

  type Team {
    _id: ID!
    name: String!
    members: [Member!]!
    folders: [Folder!]!
  }

  input TeamInput {
    name: String!
    members: [MemberInput!]!
    folders: [FolderInput!]!
  }

  extend type Query {
    teams: [Team!]!
    team(name: String!): Team
  }

  extend type Mutation {
    createTeam(input: TeamInput!): Team!
    addNote(teamId: ID!, folderId: ID!, note: NoteInput!): Folder!
  }
`;
