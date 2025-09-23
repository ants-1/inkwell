import { gql } from "@apollo/client";

export const editNote = gql`
  mutation EditNote($_id: ID!, $input: NoteInput!) {
    editNote(_id: $_id, input: $input) {
      _id
      author
      content
      date
      tags
    }
  }
`;
