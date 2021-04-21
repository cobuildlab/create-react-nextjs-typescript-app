import { createEvent } from '@cobuildlab/react-simple-state';
import { FetchSessionData } from './session-types';

export const OnFetchSession = createEvent<FetchSessionData>();

export const OnFetchSessionError = createEvent();
