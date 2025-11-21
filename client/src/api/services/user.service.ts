import type { AuthUser, PublicUser } from "@/@types/user";
import axios from "../axios";

export const UserService = {
  async findMe() {
    const { data } = await axios.get<AuthUser>("/users/me:authorized");
    return data;
  },

  async getByUsername(username: string) {
    const { data } = await axios.get<PublicUser>(`/users/${username}`);

    return data;
  },
};
