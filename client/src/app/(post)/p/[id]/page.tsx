import { PostServiceCached } from "@/api/cache/post.cache";
import { Metadata } from "next";
import PostClient from "./client";

type PostPageProps = {
  params: Promise<{
    id: number;
  }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await PostServiceCached.getById(id);

  const title = `${data.title} - ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: data.image ? [data.image] : [],
    },
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { id } = await params;

  return <PostClient id={id} />;
};

export default PostPage;
