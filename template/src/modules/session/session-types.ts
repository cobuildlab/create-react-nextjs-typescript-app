export interface User {
  id: string;
  email: string;
  avatar: {
    shareUrl: string;
  };
}
export interface FetchSessionData {
  user: User;
}

export interface FetchSessionResponse {
  data: FetchSessionData;
}
