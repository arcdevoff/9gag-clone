export interface TopicFollow {
  topicId: number;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  createdAt: Date;
  topicFollows: TopicFollow[];
}

export interface PublicUser {
  id: number;
  username: string;
  avatar: string | null;
  createdAt: Date;
}

export type AccessToken = string | null;
