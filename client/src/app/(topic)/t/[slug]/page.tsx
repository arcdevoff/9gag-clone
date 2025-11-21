import { Metadata } from "next";
import TopicClient from "./client";
import { TopicServiceCached } from "@/api/cache/topic.cache";
import { TopicService } from "@/api/services/topic.service";

type TopicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await TopicServiceCached.getBySlug(slug);

  const title = `${data.name} - ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

const TopicPage = async ({ params }: TopicPageProps) => {
  const { slug } = await params;
  const data = await TopicService.getBySlug(slug);

  return <TopicClient topic={data} />;
};

export default TopicPage;
