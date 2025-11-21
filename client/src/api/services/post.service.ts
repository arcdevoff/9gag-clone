import {
  CreatePostFormValues,
  CreatePostResponse,
  DeletePostParams,
  GetPostsParams,
  GetPostsResponse,
  Post,
  VotePostParams,
} from "@/@types/post";
import axios from "../axios";
import { AxiosPromise } from "axios";

export const PostService = {
  async create(values: CreatePostFormValues) {
    const { data } = await axios.post<CreatePostResponse>("/posts:authorized", {
      ...values,
    });
    return data;
  },

  async getPopular(params: GetPostsParams) {
    const query = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
    });

    if (params.topicId) query.append("topicId", params.topicId.toString());
    if (params.tagName) query.append("tagName", params.tagName);
    if (params.userId) query.append("userId", params.userId.toString());

    const { data } = await axios.get<GetPostsResponse>(
      `/posts/popular?${query.toString()}`
    );
    return data;
  },

  async getNew(params: GetPostsParams) {
    const query = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
    });

    if (params.topicId) query.append("topicId", params.topicId.toString());
    if (params.tagName) query.append("tagName", params.tagName);
    if (params.userId) query.append("userId", params.userId.toString());

    const { data } = await axios.get<GetPostsResponse>(
      `/posts/new?${query.toString()}`
    );
    return data;
  },

  async getById(id: number) {
    const { data } = await axios.get<Post>(`/posts/${id}`);
    return data;
  },

  async vote(params: VotePostParams) {
    const { data } = await axios.post(`/posts/${params.id}/vote:authorized`, {
      type: params.type,
    });

    return data;
  },

  delete(params: DeletePostParams): AxiosPromise<Response> {
    return axios.delete(`/posts/${params.id}:authorized`);
  },
};
