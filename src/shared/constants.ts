export const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID;
export const ENVIRONMENT_NAME = process.env.NEXT_PUBLIC_ENVIRONMENT_NAME || '';
export const AUTH_PROFILE_ID = process.env.REACT_APP_AUTH0_PROFILE_ID;
export const AUTH_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
export const AUTH_CLIENT_DOMAIN =
  process.env.REACT_APP_AUTH0_CLIENT_DOMAIN || '';
export const EIGHTBASE_WS_ENDPOINT = 'wss://ws.8base.com';
export const AUTH_CLIENT_REDIRECT_URI = ''; // `${window.location.origin}/auth/callback`;
export const AUTH_CLIENT_REDIRECT_LOGOUT = ''; // `${window.location.origin}/logout`;

export const WORKSPACE_ENDPOINT = `https://api.8base.com/${WORKSPACE_ID}${
  ENVIRONMENT_NAME.toLowerCase() === 'master' || ENVIRONMENT_NAME === ''
    ? ''
    : `_${ENVIRONMENT_NAME}`
}`;
// export const WORKSPACE_ENDPOINT = 'https://rickandmortyapi.com/graphql'
export const PROJECT_ID = WORKSPACE_ID || '';
