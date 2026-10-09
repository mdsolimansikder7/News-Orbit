import NewsCard from "@/components/NewsCard";
import React from "react";

type Article = {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string;
  firstPublished: string | null;
};

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
    { next: { revalidate: 300 } }
  );

  let data = null;
  let articles: Article[] = [];
  if (res.ok) {
    data = await res.json();
  
    articles = Array.isArray(data?.data) ? data.data : [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {data?.title && (
        <h1 className="text-2xl font-bold border-b-2 border-red-700 pb-1 mb-5">
          {data.title}
        </h1>
      )}

      {articles.length === 0 ? (
        <p>কোনো খবর পাওয়া যায়নি</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {articles.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNews;