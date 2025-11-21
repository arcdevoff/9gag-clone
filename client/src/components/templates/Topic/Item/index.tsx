import { Topic } from "@/@types/topic";
import Image from "next/image";
import Link from "next/link";

type TopicItemProps = {
  data: Topic;
  isActive: boolean;
};

const TopicItem = ({ data, isActive = false }: TopicItemProps) => {
  return (
    <Link
      key={data.id}
      className={`flex items-center text-lg gap-3 hover:bg-zinc-900 p-2 px-3 rounded-xl ml-[-15px] ${
        isActive && "bg-zinc-900"
      }`}
      href={`/t/${data.slug}`}
    >
      <Image
        className="rounded-full size-8"
        alt="avatar"
        src={data.avatar}
        width={100}
        height={100}
        quality={100}
      />
      <span>{data.name}</span>
    </Link>
  );
};

export default TopicItem;
