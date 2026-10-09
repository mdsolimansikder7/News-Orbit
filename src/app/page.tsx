
import MainNews from "@/components/MainNews";
import NewsCard from "@/components/NewsCard";
import MostRead from "@/components/MostRead";

type Article = {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  isLive: boolean;
  firstPublished: string | null;
  type?: string;
};

type NewsSection = {
  curationId: string;
  title: string;
  articles: Article[];
};

const Homepage = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    {
      next: { revalidate: 300 },
    }
  );

  let sections: NewsSection[] = [];

  if (res.ok) {
    const data = await res.json();
    sections = data?.data ?? [];
  }

  const mainNews = sections[0]?.articles ?? [];

  const otherSections = sections
    .slice(1)
    .filter((section) =>
      section.articles.some((article) => article.type !== "link")
    );

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* News Section */}
        <div className="lg:col-span-2 min-w-0">
          <MainNews news={mainNews} />

          <div className="grid gap-8 mt-8">
            {otherSections.map((section) => (
              <div key={section.curationId}>
                <h2 className="text-xl font-bold border-b-2 border-red-700 pb-2 mb-4">
                  {section.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.articles
                    .filter((article) => article.type !== "link")
                    .map((news) => (
                      <NewsCard key={news.id} news={news} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Read Section */}
        <aside className="min-w-0">
          <MostRead />
        </aside>
      </div>
    </div>
  );
};

export default Homepage;
