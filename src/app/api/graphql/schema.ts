
const typeDefs = `#graphql
  type User {
    id: ID!
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

export default typeDefs;