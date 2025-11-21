import { unstable_cache } from "next/cache";
import { TopicService } from "../services/topic.service";
import { Topic } from "@/@types/topic";

export const TopicServiceCached = {
  async getBySlug(slug: string): Promise<Topic> {
    const cachedFn = unstable_cache(
      async (): Promise<Topic> => await TopicService.getBySlug(slug),
      ["topic", slug],
      {
        revalidate: 172800,
      }
    );

    return cachedFn();
  },
};
