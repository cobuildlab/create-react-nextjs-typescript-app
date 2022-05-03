import { initAuth0 } from '@auth0/nextjs-auth0';
import * as ENV from '../../constants';

export const auth0 = initAuth0({
  authorizationParams: {
    scope: ENV.AUTH_SCOPE,
  },
  baseURL: ENV.AUTH_BASE_URL,
  clientID: ENV.AUTH_CLIENT_ID,
  clientSecret: ENV.AUTH_CLIENT_SECRET,
  issuerBaseURL: ENV.AUTH_CLIENT_DOMAIN,
  secret: ENV.AUTH_SECRET,
});
