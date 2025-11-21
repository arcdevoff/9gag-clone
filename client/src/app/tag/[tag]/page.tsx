import TagClient from "./client";

type TagPageParams = {
  params: Promise<{
    tag: string;
  }>;
};

const TagPage = async ({ params }: TagPageParams) => {
  const { tag } = await params;

  return <TagClient name={tag} />;
};

export default TagPage;
