import { UserService } from "@/api/services/user.service";
import { notFound } from "next/navigation";
import UserClient from "./client";
import { Metadata } from "next";
import { UserServiceCached } from "@/api/cache/user.cache";

type UserPageProps = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { username } = await params;
  const data = await UserServiceCached.getByUsername(username);

  const title = `${data.username} - ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  try {
    const data = await UserService.getByUsername(username);
    return <UserClient user={data} />;
  } catch {
    notFound();
  }
};

export default UserPage;
