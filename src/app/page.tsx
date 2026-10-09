import Marquee from "@/components/Marquee";
import MainNews from "@/components/MainNews";
import NewsCard from "@/components/NewsCard";
import React from "react";
import MostRead from "@/components/MostRead";

const Homepage = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 300 },
  });

  let sections = [];
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
    <div>
    
      <div className="grid gap-5 grid-cols-3 max-w-7xl mx-auto mt-5 px-4">
        {/* News Section */}
        <div className="col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-8 mt-8">
            {otherSections.map((section) => (
              <div key={section.curationId}>
                <h2 className="text-xl font-bold border-b-2 border-red-700 pb-2 mb-4">
                  {section.title}
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  {section.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Read Section */}
        <div className="col-span-1">
          <MostRead />
        </div>
      </div>
    </div>
  );
};

export default Homepage;