"use client";
import { PublicUser } from "@/@types/user";
import PostCardContainer from "@/components/templates/Post/Card/CardContainer";
import PostCardSkeleton from "@/components/templates/Post/Card/CardSkeleton";
import Tabs from "@/components/ui/Tabs";
import { Tab } from "@/components/ui/Tabs/types";
import { usePostsInfinite } from "@/hooks/usePostsInfinite";
import Image from "next/image";
import { useState } from "react";

type UserProps = {
  user: PublicUser;
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

const UserClient = ({ user }: UserProps) => {
  const [tab, setTab] = useState("popular");
  const { data, status, hasNextPage, ref } = usePostsInfinite({
    userId: user.id,
    sort: tab,
  });

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <Image
          src={user.avatar ? user.avatar : "/images/avatar.jpg"}
          alt="avatar"
          width={120}
          height={120}
          className="rounded-full size-20"
        />

        <div>
          <span className="text-xl font-medium">@{user.username}</span>
          <br />
          <span className="text-white/40 text-[14px]">
            {new Date(user.createdAt).toLocaleString("en", {
              hour12: false,
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>

      {data?.pages[0]?.data[0] && (
        <Tabs onChange={setTab} value={tab} tabs={tabs} className="mt-7" />
      )}

      <div className="mt-5 space-y-6">
        {status === "pending" &&
          [...Array(3)].map((_, key) => <PostCardSkeleton key={key} />)}
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

export default UserClient;
