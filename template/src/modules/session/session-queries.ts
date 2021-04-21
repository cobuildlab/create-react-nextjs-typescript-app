import { gql } from '@apollo/client';

export const FETCH_SESSION_QUERY = gql`
  query fetchSessionQuery {
    user {
      id
      email
      avatar {
        shareUrl
      }
    }
  }
`;
