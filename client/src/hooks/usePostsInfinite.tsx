"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "@/components/providers/RootProvider";
import { PostService } from "@/api/services/post.service";
import useIsVisible from "@/hooks/useIsVisible";

const limit = Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE);

export function usePostsInfinite(params: Record<string, any>) {
  const initialPage = { page: 1, limit, ...params };
  const queryKey = ["posts", params];

  useEffect(() => {
    queryClient.setQueryData(queryKey, () => ({
      pageParams: [initialPage],
      pages: [],
    }));
  }, [JSON.stringify(params)]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (params.sort === "new") {
        return await PostService.getNew(pageParam);
      }
      return await PostService.getPopular(pageParam);
    },
    getNextPageParam: (last) =>
      last.nextPage ? { page: last.nextPage, limit, ...params } : undefined,
    initialPageParam: initialPage,
  });

  const { ref } = useIsVisible(() => query.fetchNextPage());

  return { ...query, ref };
}
