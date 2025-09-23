import { gql } from "graphql-tag";

export const teamTypeDefs = gql`
  type Member {
    user: User!
    role: String!
  }

  input MemberInput {
    userId: ID!
    role: String
  }

  type Team {
    _id: ID!
    name: String!
    teamType: String
    members: [Member!]!
    folders: [Folder!]!
  }

  input TeamInput {
    name: String!
    userId: ID!
  }

  type Query {
    teams(userId: ID!): [Team!]
    team(_id: ID!): Team
    myTeam(userId: ID!): Team
  }

  type Mutation {
    createDefaultTeam(input: TeamInput!): Team!
    createTeam(input: TeamInput!): Team!
    editTeam(teamId: ID!, userId: ID!, name: String, teamType: String): Team!
    deleteTeam(teamId: ID!, userId: ID!): Boolean!
    addMember(teamId: ID!, member: MemberInput!): Team!
    removeMember(teamId: ID!, userId: ID!): Team!
  }
`;
