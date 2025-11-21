"use client";
import PostCardContainer from "@/components/templates/Post/Card/CardContainer";
import PostCardSkeleton from "@/components/templates/Post/Card/CardSkeleton";
import Loading from "@/components/ui/Loading";
import Tabs from "@/components/ui/Tabs";
import { Tab } from "@/components/ui/Tabs/types";
import { usePostsInfinite } from "@/hooks/usePostsInfinite";
import { useState } from "react";

type TagProps = {
  name: string;
};

const tabs: Tab[] = [
  {
    key: "popular",
    text: "Popular",
  },
  {
    key: "new",
    text: "New",
  },
];

const TagClient = ({ name }: TagProps) => {
  const [tab, setTab] = useState("popular");
  const { data, status, hasNextPage, ref } = usePostsInfinite({
    tagName: name,
    sort: tab,
  });

  return (
    <div className="space-y-5">
      <div className="text-[20px] text-white/70 font-medium p-3 border-1 border-stone-900/70 hover:border-blue-500 transition-colors rounded-xl">
        #️⃣ {name}
      </div>

      <Tabs onChange={setTab} value={tab} tabs={tabs} />

      <div className="space-y-6">
        {status === "pending" &&
          [...Array(3)].map((_, key) => <PostCardSkeleton key={key} />)}{" "}
        {status === "error" && "Error loading posts"}
        {status === "success" &&
          data?.pages.map((page, pageIndex) => (
            <PostCardContainer
              key={pageIndex}
              data={page.data}
              loadMoreRef={ref}
              hasNextPage={hasNextPage}
            />
          ))}
      </div>
    </div>
  );
};

export default TagClient;
