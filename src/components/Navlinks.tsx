import React from "react";
import Link from "next/link";

type Category = {
  slug: string;
  title: string;
  scrapable: boolean;
};

const Navlinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    next: { revalidate: 3600 },
  });

  let categories: Category[] = [];
  if (res.ok) {
    const data = await res.json();
    categories = data?.data ?? [];
  }

  const filteredCategories = categories.filter((category) => category.scrapable);

  return (
    <nav className="flex flex-wrap justify-center gap-6 px-4 py-3 text-sm whitespace-nowrap">
      {/* হোম লিংক একবারই */}
      <Link href="/" className="hover:text-red-700">
        হোম
      </Link>

      {filteredCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="hover:text-red-700"
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;