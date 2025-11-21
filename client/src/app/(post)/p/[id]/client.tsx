"use client";
import type { Post } from "@/@types/post";
import { PostService } from "@/api/services/post.service";
import PostCardContainer from "@/components/templates/Post/Card/CardContainer";
import PostCardSkeleton from "@/components/templates/Post/Card/CardSkeleton";
import Loading from "@/components/ui/Loading";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PostProps = {
  id: number;
};

const PostClient = ({ id }: PostProps) => {
  const [data, setData] = useState<null | Post>(null);
  const router = useRouter();

  useEffect(() => {
    PostService.getById(id)
      .then((data) => setData(data))
      .catch(() => router.replace("/404"));
  }, [id, router]);

  return (
    <div>
      <button
        className="bg-stone-900 p-2 rounded-full mb-3"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </button>
      {!data?.id && <PostCardSkeleton />}
      {data?.id && <PostCardContainer data={[data]} />}

      <div className="text-white/60 text-lg mt-8 p-3 pl-5 rounded-full border-1 border-stone-900">
        Comments soon...
      </div>
    </div>
  );
};

export default PostClient;
