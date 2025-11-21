import { Topic } from "@/@types/topic";
import { TopicService } from "@/api/services/topic.service";
import Header from "@/components/layouts/Main/Header";
import Sidebar from "@/components/layouts/Main/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const topics: Topic[] = await TopicService.getAll();

  return (
    <div className="container mx-auto px-3 lg:px-25 mb-12">
      <Header />

      <div className="grid grid-cols-[1fr] lg:grid-cols-[0.25fr_0.75fr] xl:grid-cols-[0.15fr_0.55fr_0.30fr] gap-10 mt-24">
        <Sidebar topics={topics} />

        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
