import { Topic } from "./topic";

type Votes = {
  likes: number;
  dislikes: number;
};

export interface Post {
  id: number;
  title: string;
  tags?: [
    {
      name: string;
    }
  ];
  author: {
    username: string;
  };
  topic: Topic;
  authorId: number;
  image?: string;
  video?: string;
  votes: Votes;
  vote?: VoteTypes | null;
  isOwnPost: boolean;
  createdAt: number;
}

export type CreatePostFormValues = {
  title?: string;
  topicId?: number;
  tags?: string[];
  video?: string;
  image?: string;
};

export type CreatePostResponse = {
  id: number;
};

export type GetPostsParams = {
  limit: number;
  page: number;
  topicId?: number;
  tagName?: string;
  userId?: number;
};

export type GetPostsResponse = {
  data: Post[];
  nextPage: number | null;
};

export type VoteTypes = "like" | "dislike";

export type VotePostParams = {
  type: VoteTypes;
  id: number;
};

export type DeletePostParams = {
  id: number;
};
