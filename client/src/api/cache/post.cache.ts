import { Post } from "@/@types/post";
import { unstable_cache } from "next/cache";
import { PostService } from "../services/post.service";

export const PostServiceCached = {
  getById(id: number): Promise<Post> {
    const cachedFn = unstable_cache(
      async (): Promise<Post> => await PostService.getById(id),
      ["post", String(id)],
      { revalidate: 3600 }
    );

    return cachedFn();
  },
};
