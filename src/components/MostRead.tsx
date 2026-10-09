import Link from "next/link";

type Article = {
  id: string;
  title: string;
  link: string;
  rank: number;
};

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read", {
    next: { revalidate: 300 },
  });

  let mostRead: Article[] = [];
  if (res.ok) {
    const data = await res.json();
    mostRead = data?.data ?? [];
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-5">
      <h2 className="text-xl font-bold mb-4">সর্বাধিক পঠিত</h2>

      <ol className="space-y-4">
        {mostRead.map((m) => (
          <li key={m.id} className="flex gap-3">
            <span className="text-2xl text-red-600 leading-none w-7 shrink-0">
              {m.rank.toLocaleString("bn-BD")}
            </span>
            <Link href={`/news/${m.id}`} className="hover:text-red-700">
              {m.title.trim()}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MostRead;