import { gql } from "@apollo/client";

export const addMemeber = gql`
  mutation AddMember($teamId: ID!, $member: MemberInput!) {
    addMember(teamId: $teamId, member: $member) {
      _id
      name
      members {
        user {
          username
        }
        role
      }
    }
  }
`;
