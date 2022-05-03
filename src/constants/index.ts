export const WORKSPACE_ID = process.env.REACT_APP_WORKSPACE_ID;
export const ENVIRONMENT_NAME = process.env.REACT_APP_ENVIRONMENT_NAME || '';
export const WORKSPACE_ENDPOINT = `https://api.8base.com/${WORKSPACE_ID}${
  ENVIRONMENT_NAME.toLowerCase() === 'master' || ENVIRONMENT_NAME === ''
    ? ''
    : `_${ENVIRONMENT_NAME}`
}`;
export const AUTH_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
export const AUTH_CLIENT_SECRET = process.env.REACT_APP_AUTH0_CLIENT_SECRET || '';
export const AUTH_BASE_URL = process.env.REACT_APP_AUTH0_BASE_URL || '';
export const AUTH_CLIENT_DOMAIN = process.env.REACT_APP_AUTH0_CLIENT_DOMAIN || '';
export const AUTH_SCOPE = process.env.REACT_APP_AUTH0_SCOPE || '';
export const AUTH_SECRET = process.env.REACT_APP_AUTH0_SECRET || '';

export const AUTH_PROFILE_ID = process.env.REACT_APP_AUTH0_PROFILE_ID;
export const EIGHTBASE_WS_ENDPOINT = 'wss://ws.8base.com';
export const AUTH_CLIENT_REDIRECT_URI = '';
export const AUTH_CLIENT_REDIRECT_LOGOUT = '';
// export const AUTH_CLIENT_REDIRECT_URI = (typeof window.location.origin != 'undefined')?`${window.location.origin}/auth/callback`:'';
// export const AUTH_CLIENT_REDIRECT_LOGOUT = (typeof window.location.origin != 'undefined')?`${window.location.origin}/logout`:'';


