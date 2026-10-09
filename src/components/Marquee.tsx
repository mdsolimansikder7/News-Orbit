import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";
type Headline = {
  id: string;
  title: string;
  link: string;
};

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
    next: { revalidate: 300 },
  });

  let headlines: Headline[] = [];
  if (res.ok) {
    const data = await res.json();
    headlines = data?.data ?? [];
  }

  if (headlines.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-700 text-white sticky top-0 z-50">
      <div className="flex items-center max-w-7xl mx-auto">
        <div className="bg-red-800 py-1 px-5 font-bold">সর্বশেষ</div>

        <MarqueeText className="py-1" direction="right" duration={10}>
          {headlines.map((h) => (
            <span key={h.id}>
              <a
                href={h.link}
                target="_blank"
                className="font-bold hover:underline"
              >
                <Link href={`/news/${h.id}`} className="hover:underline">
                 {h.title.trim()}
                </Link>
               
              </a>
              <span className="mx-5">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;