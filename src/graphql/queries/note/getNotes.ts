import { gql } from "@apollo/client";

export const getNote = gql`
  query GetNote($id: ID!) {
    getNote(_id: $id) {
      _id
      author
      content
      date
      tags
    }
  }
`;
