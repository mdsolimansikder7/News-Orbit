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
  firstPublished: string | null;
};

const NewsCard = ({ news }: { news: Article }) => {
  return (
    <Link href={`/news/${news.id}`} className="block">
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white h-full">
        <div className="relative aspect-video bg-gray-100">
          {news.imageUrl && (
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              src={news.imageUrl}
              alt={news.imageAlt ?? news.title}
              className="object-cover"
            />
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold text-red-700">{news.category}</p>
          <h3 className="mt-1 font-bold leading-snug">{news.title}</h3>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {news.description}
          </p>
          {news.firstPublished && (
            <p className="mt-3 text-xs text-gray-400">
              {new Date(news.firstPublished).toLocaleString("bn-BD", {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "Asia/Dhaka",
              })}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;