import { gql } from '@apollo/client';

export const FETCH_SESSION_QUERY = gql`
  query FetchSessionQuery {
    user {
      id
      email
      avatar {
        shareUrl
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
    }
  }
`;

export const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
    }
  }
`;
