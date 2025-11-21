"use client";
import { Topic } from "@/@types/topic";
import TopicItem from "@/components/templates/Topic/Item";
import { setTopics } from "@/redux/reducers/topic/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Clock, Flame } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Section = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

const sections: Section[] = [
  {
    text: "Popular",
    icon: <Flame />,
    path: "/",
  },
  {
    text: "New",
    icon: <Clock />,
    path: "/new",
  },
];

interface SidebarProps {
  topics: Topic[];
}

const Sidebar = ({ topics }: SidebarProps) => {
  const { isVisible } = useAppSelector((state) => state.ui.sidebar);
  const user = useAppSelector((state) => state.user.data);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (topics.length) {
      dispatch(setTopics(topics));
    }
  }, [topics, dispatch]);

  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      className={`${
        isVisible ? "block" : "hidden"
      } z-100 fixed border-r-1 border-stone-800 bg-stone-950 bottom-0 top-16 w-55 p-4 lg:block lg:relative lg:border-none lg:top-0 lg:p-0 lg:w-auto`}
    >
      <div className="lg:sticky lg:top-20">
        <div className="flex flex-col gap-1">
          {sections.map((obj, index) => {
            const isActive = obj.path === pathname;

            return (
              <Link
                key={index}
                className={`flex items-center text-lg gap-3 hover:bg-zinc-900 py-2.5 px-3 rounded-xl group ml-[-15px] ${
                  isActive && "bg-zinc-900"
                }`}
                href={obj.path}
              >
                <span
                  className={`${
                    isActive && "text-blue-500"
                  } group-hover:text-blue-500`}
                >
                  {obj.icon}
                </span>
                <span>{obj.text}</span>
              </Link>
            );
          })}
        </div>

        {Boolean(user?.topicFollows.length) && (
          <div className="mt-7 flex flex-col gap-1">
            <span className="text-[15px] mb-1 ml-[-4px] text-stone-400">
              Following
            </span>

            {user?.topicFollows.map((t) => {
              const topic = topics.find((obj) => obj.id === t.topicId);
              if (!topic) return null;

              return (
                <TopicItem
                  key={topic.id}
                  data={topic}
                  isActive={"/t/" + topic.slug === pathname}
                />
              );
            })}
          </div>
        )}

        <div className="mt-7 flex flex-col gap-1">
          <span className="text-[15px] mb-1 ml-[-4px] text-stone-400">
            Topics
          </span>
          {topics.map((topic) => (
            <TopicItem
              key={topic.id}
              data={topic}
              isActive={"/t/" + topic.slug === pathname}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
