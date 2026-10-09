import Image from "next/image";
import { notFound } from "next/navigation";

type BodyBlock = {
  type: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
  text?: string;
};

const NewsDetailsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const news = data?.data;

  if (!news) {
    notFound();
  }

  const descriptionText: string | undefined =
    typeof news.description === "string"
      ? news.description
      : news.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const body: BodyBlock[] = Array.isArray(news.body) ? news.body : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {typeof news.category === "string" && (
        <p className="text-sm font-semibold text-red-700">{news.category}</p>
      )}

      <h1 className="text-3xl font-bold leading-snug mt-2">{news.title}</h1>

      {news.firstPublished && (
        <p className="text-sm text-gray-500 mt-3">
          {new Date(news.firstPublished).toLocaleString("bn-BD", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Asia/Dhaka",
          })}
        </p>
      )}

      {news.imageUrl && (
        <div className="relative aspect-video mt-6 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            priority
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            src={news.imageUrl}
            alt={news.imageAlt ?? news.title}
            className="object-cover"
          />
        </div>
      )}

      {descriptionText && (
        <p className="mt-6 text-lg font-medium leading-relaxed text-gray-800">
          {descriptionText}
        </p>
      )}

    
      <div className="mt-6">
        {body.map((block, i) => {
         
          if (block.type === "image" && block.url) {
            if (block.url === news.imageUrl) {
              return null;
            }
            return (
              <figure key={i} className="my-6">
                <Image
                  src={block.url}
                  alt={block.altText ?? ""}
                  width={block.width ?? 1024}
                  height={block.height ?? 576}
                  className="w-full h-auto rounded-lg"
                />
                {block.caption && (
                  <figcaption className="text-sm text-gray-500 mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

         
          if (block.type === "text" && typeof block.text === "string") {
            return block.text
              .split(/\n+/)
              .filter((line) => line.trim() !== "")
              .map((line, j) => (
                <p key={`${i}-${j}`} className="mt-4 leading-relaxed text-gray-700">
                  {line}
                </p>
              ));
          }

          return null;
        })}
      </div>

      {news.link && (
        <a
          href={news.link}
          target="_blank"
          className="inline-block mt-8 text-sm text-red-700 hover:underline"
        >
          সূত্র: {news.source ?? "মূল লেখা"}
        </a>
      )}
    </div>
  );
};

export default NewsDetailsPage;