"use client";
import PostCardContainer from "@/components/templates/Post/Card/CardContainer";
import PostCardSkeleton from "@/components/templates/Post/Card/CardSkeleton";
import Loading from "@/components/ui/Loading";
import { usePostsInfinite } from "@/hooks/usePostsInfinite";
import { setMessage } from "@/redux/reducers/ui/slice";
import { useAppDispatch } from "@/redux/store";
import React from "react";

const NewClient = () => {
  const dispatch = useAppDispatch();
  const { data, status, hasNextPage, ref } = usePostsInfinite({ sort: "new" });

  if (status === "pending") {
    return [...Array(3)].map((_, key) => <PostCardSkeleton key={key} />);
  }

  if (status === "error") {
    dispatch(setMessage({ text: "Error loading posts", status: false }));
    return <div>Error loading posts</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-[20px] text-white/70 font-medium p-3 border-1 border-stone-900/70 hover:border-blue-500 transition-colors rounded-xl">
        🕝 New
      </div>

      {data?.pages.map((page, pageIndex) => (
        <PostCardContainer
          key={pageIndex}
          data={page.data}
          loadMoreRef={ref}
          hasNextPage={hasNextPage}
        />
      ))}
    </div>
  );
};

export default NewClient;
