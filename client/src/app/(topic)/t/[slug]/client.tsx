"use client";
import type { Topic } from "@/@types/topic";
import { TopicService } from "@/api/services/topic.service";
import PostCardContainer from "@/components/templates/Post/Card/CardContainer";
import PostCardSkeleton from "@/components/templates/Post/Card/CardSkeleton";
import Tabs from "@/components/ui/Tabs";
import { Tab } from "@/components/ui/Tabs/types";
import { usePostsInfinite } from "@/hooks/usePostsInfinite";
import { setMessage, setModal } from "@/redux/reducers/ui/slice";
import { addTopicFollow, removeTopicFollow } from "@/redux/reducers/user/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserMinus, UserPlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type TopicProps = {
  topic: Topic;
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

const TopicClient = ({ topic }: TopicProps) => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("popular");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const topicFollows = useAppSelector((state) => state.user.data?.topicFollows);
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const { data, status, hasNextPage, ref } = usePostsInfinite({
    topicId: topic.id,
    sort: tab,
  });

  useEffect(() => {
    if (topicFollows) {
      setIsFollowing(topicFollows.some((obj) => obj.topicId === topic.id));
    } else {
      setIsFollowing(false);
    }
  }, [topic.id, topicFollows]);

  const handleFollow = async () => {
    if (!accessToken) {
      dispatch(setModal({ modal: "loginModal", modalState: { isOpen: true } }));
      return;
    }

    try {
      if (isFollowing) {
        const res = await TopicService.unfollow(topic.id);
        if (res.status === 200) {
          setIsFollowing(false);
          dispatch(removeTopicFollow(topic.id));
        }
      } else {
        const res = await TopicService.follow(topic.id);
        if (res.status === 200) {
          setIsFollowing(true);
          dispatch(addTopicFollow(topic.id));
        }
      }
    } catch {
      dispatch(
        setMessage({
          text: isFollowing ? "Failed to unfollow" : "Failed to follow",
          status: false,
        })
      );
    }
  };

  return (
    <div>
      <div className="p-1 flex flex-row items-center justify-between">
        <div className="flex items-center max-sm:gap-3 gap-5">
          <Image
            src={topic.avatar}
            width={240}
            height={240}
            className="rounded-xl size-19 md:size-21 xl:size-23"
            alt={"avatar"}
          />

          <span className="text-xl md:text-2xl xl:text-3xl font-semibold">
            {topic.name}
          </span>
        </div>

        <div>
          <button
            onClick={handleFollow}
            className={`${
              isFollowing
                ? "bg-stone-700 hover:bg-stone-600"
                : "bg-blue-500 hover:bg-blue-400"
            } transition-colors py-2 px-4 rounded-xl font-bold flex flex-row gap-2 items-center`}
          >
            {isFollowing ? (
              <>
                <UserMinus className="size-5.5" /> Unfollow
              </>
            ) : (
              <>
                <UserPlus className="size-5.5" /> Follow
              </>
            )}
          </button>
        </div>
      </div>

      <Tabs className="mt-8" onChange={setTab} value={tab} tabs={tabs} />

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

export default TopicClient;
