export interface User {
  id: string;
  email: string;
  avatar: {
    shareUrl: string;
  };
}

export interface SessionQuery {
  user: User;
}
