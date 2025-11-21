export interface Follow {
  topicId: number;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  avatar: string | null;
  topicFollows: Follow[];
}

export interface PublicUser {
  id: number;
  username: string;
  avatar: string | null;
  createdAt: Date;
}
