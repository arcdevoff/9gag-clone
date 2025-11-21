import { unstable_cache } from "next/cache";
import { UserService } from "../services/user.service";
import { PublicUser } from "@/@types/user";

export const UserServiceCached = {
  getByUsername(username: string): Promise<PublicUser> {
    const cachedFn = unstable_cache(
      async (): Promise<PublicUser> =>
        await UserService.getByUsername(username),
      ["user", username],
      {
        revalidate: 3600,
      }
    );

    return cachedFn();
  },
};
