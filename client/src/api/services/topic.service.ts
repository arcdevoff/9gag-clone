import { Topic } from "@/@types/topic";
import axios from "@/api/axios";

export const TopicService = {
  async getAll() {
    const { data } = await axios.get<Topic[]>("/topics");
    return data;
  },

  async getBySlug(slug: string) {
    const { data } = await axios.get<Topic>(`/topics/${slug}`);
    return data;
  },

  async follow(id: number): Promise<Response> {
    return axios.post(`/topics/${id}/follow:authorized`);
  },

  async unfollow(id: number): Promise<Response> {
    return axios.delete(`/topics/${id}/unfollow:authorized`);
  },
};
