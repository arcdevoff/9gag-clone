"use client";
import { DeletePostParams, Post, VotePostParams } from "@/@types/post";
import Dropdown from "@/components/ui/Dropdown";
import {
  ChevronDown,
  ChevronUp,
  Circle,
  Ellipsis,
  Flag,
  Share,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  data: Post;
  onVote: (params: VotePostParams) => void;
  onDelete: (params: DeletePostParams) => void;
};

const PostCard = ({ data, onVote, onDelete }: PostCardProps) => {
  return (
    <div className="bg-stone-900  p-4 pt-3 rounded-xl relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <Link href={`/t/${data.topic.slug}`}>
              <Image
                src={data.topic.avatar}
                width={34}
                height={34}
                className="rounded-full"
                alt={`${data.topic.name} avatar`}
              />
            </Link>

            <div className="flex flex-col">
              <Link
                href={`/t/${data.topic.slug}`}
                className="flex items-center gap-2"
              >
                <span className="font-medium">{data.topic.name}</span>
              </Link>

              <div className="flex items-center flex-row text-sm text-stone-500 gap-1.5">
                <Link href={`/u/${data.author.username}`}>
                  {data.author.username}
                </Link>

                <Circle
                  fill="10"
                  strokeWidth={0}
                  className="size-1 fill-stone-500"
                />

                <span>
                  {new Date(data.createdAt).toLocaleString("en", {
                    hour12: false,
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Dropdown
            items={[
              ...(data?.isOwnPost
                ? [
                    {
                      label: "Delete",
                      icon: <Trash size={17} />,
                      onClick: () => onDelete({ id: data.id }),
                    },
                  ]
                : []),
              {
                label: "Report",
                icon: <Flag size={17} />,
                onClick: () => alert("Soon"),
              },
            ]}
            dropdownClassName="bg-stone-950/50 backdrop-blur-2xl border-1 border-stone-800"
            itemClassName="hover:bg-stone-900"
            trigger={
              <div className="p-1 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors">
                <Ellipsis />
              </div>
            }
          />
        </div>
      </div>

      <Link href={`/p/${data.id}`} className="mt-2 block text-xl font-medium">
        {data.title}
      </Link>

      <div className="mt-4">
        {data.video && (
          <video className="w-full rounded-sm" src={data.video} controls />
        )}

        {data.image && (
          <Image
            src={data.image}
            className="w-full rounded-sm"
            alt="image"
            width={500}
            height={500}
          />
        )}
      </div>

      {data.tags && data.tags?.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 mt-4">
          {data.tags.map((tag, index) => (
            <Link
              className="font-medium bg-stone-800 p-1 px-3 rounded-lg"
              href={`/tag/${tag.name}`}
              key={index}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <button
            onClick={async () => onVote({ type: "like", id: data.id })}
            className={`flex flex-row items-center gap-0.5 rounded-r-none py-1 px-2 rounded-lg bg-stone-950 hover:bg-green-500 transition-colors ${
              data?.vote === "like" && "!bg-green-500"
            }`}
          >
            <ChevronUp />
            <span>{data.votes.likes}</span>
          </button>
          <button
            onClick={async () => onVote({ type: "dislike", id: data.id })}
            className={`flex flex-row items-center py-1 px-2 rounded-l-none rounded-lg gap-0.5 bg-stone-950 hover:bg-red-400 transition-colors ${
              data?.vote === "dislike" && "!bg-red-400"
            }`}
          >
            <ChevronDown />
            <span>{data.votes.dislikes}</span>
          </button>
        </div>

        <button
          onClick={() =>
            navigator.share({
              title: data.title,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${data.id}`,
            })
          }
          className="flex gap-2  py-1 px-2.5 flex-row items-center bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors"
        >
          <Share width={19} height={19} />
          <span className="font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
