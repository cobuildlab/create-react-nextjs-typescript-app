import { OnFetchSession, OnFetchSessionError } from './session-events';
import { FETCH_SESSION_QUERY } from './session-queries';
import { client } from '../../shared/apollo/client';
import { FetchSessionResponse } from './session-types';

/**
 * @description - fetch session.
 * @returns {void}.
 */
export const fetchSession = async (): Promise<void> => {
  let response: FetchSessionResponse;

  try {
    response = await client.query({
      query: FETCH_SESSION_QUERY,
    });
  } catch (error) {
    OnFetchSessionError.dispatch({
      error: 'Error get user',
    });
    throw new Error(error);
  }

  if (response) {
    OnFetchSession.dispatch(response?.data);
  }
};
