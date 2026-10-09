import Image from "next/image";
import Link from "next/link";

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
};

const MainNews = ({ news }: { news: Article[] }) => {
  const articles = news.filter((item) => !item.isLive);
  const [firstNews, ...otherNews] = articles;

  if (!firstNews) {
    return <p>কোনো খবর পাওয়া যায়নি</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 items-start">
      {/* বাঁ পাশের বড় কার্ড */}
      <Link href={`/news/${firstNews.id}`} className="block">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <div className="relative aspect-video bg-gray-100">
            {firstNews.imageUrl && (
              <Image
                priority
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                src={firstNews.imageUrl}
                alt={firstNews.imageAlt ?? firstNews.title}
                className="object-cover"
              />
            )}
          </div>

          <div className="p-5">
            <p className="text-xs font-semibold text-red-700">
              {firstNews.category}
            </p>
            <h2 className="text-2xl font-bold leading-snug mt-2">
              {firstNews.title}
            </h2>
            <p className="text-sm text-gray-500 mt-3">
              {firstNews.description}
            </p>
            {firstNews.firstPublished && (
              <p className="text-xs text-gray-400 mt-3">
                {new Date(firstNews.firstPublished).toLocaleString("bn-BD", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Asia/Dhaka",
                })}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* মাঝের ৪টা খবর */}
      <div className="border border-gray-200 rounded-lg bg-white">
        {otherNews.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="p-4 border-b border-gray-200 last:border-b-0"
          >
            <p className="text-xs font-semibold text-red-700">
              {item.category}
            </p>
            <Link
              href={`/news/${item.id}`}
              className="block mt-1 font-medium hover:text-red-700"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews;