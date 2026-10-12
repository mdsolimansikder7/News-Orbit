import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthButtons from "./AuthButton";
import MobileMenu from "./MobileMenu";

type Category = {
  slug: string;
  title: string;
  scrapable: boolean;
};

const Headerpage = async () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  // সার্ভার সাইড থেকে ক্যাটেগরি ফেচ
  let categories: Category[] = [];
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      categories = (data?.data ?? []).filter(
        (c: Category) => c.scrapable
      );
    }
  } catch {
    categories = [];
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 sm:py-4">

        {/* ─── Left side ─── */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* হ্যামবার্গার — শুধু মোবাইলে, বাম পাশে */}
          <MobileMenu categories={categories} />

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-3"
          >
            <Image
              src="/news.png"
              alt="নিউজ অরবিট লোগো"
              width={50}
              height={50}
              priority
              className="h-8 w-8 object-contain sm:h-12 sm:w-12"
            />

            <div>
              <h1 className="whitespace-nowrap text-base font-extrabold tracking-tight text-red-700 sm:text-3xl">
                News Orbit
              </h1>

              <p className="mt-0.5 text-[9px] text-gray-500 sm:mt-1 sm:text-xs">
                {date}
              </p>
            </div>
          </Link>
        </div>

        {/* ─── Right side: Auth (সব সময় — সাইন ইন / প্রোফাইল) ─── */}
        <nav
          aria-label="অ্যাকাউন্ট নেভিগেশন"
          className="flex items-center"
        >
          <AuthButtons />
        </nav>

      </div>
    </header>
  );
};

export default Headerpage;