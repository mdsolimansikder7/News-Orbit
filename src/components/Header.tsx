
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Headerpage = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-4 px-4 py-4 sm:px-6 md:grid-cols-3">

        {/* বাম পাশ */}
        <div className="hidden md:block" />

        {/* লোগো ও ওয়েবসাইটের নাম */}
        <Link
          href="/"
          className="flex items-center justify-start gap-2 sm:gap-3 md:justify-center"
        >
          <Image
            src="/news.png"
            alt="নিউজ অরবিট লোগো"
            width={50}
            height={50}
            priority
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />

          <div>
            <h1 className="whitespace-nowrap text-xl font-extrabold tracking-tight text-red-700 sm:text-3xl">
             News Orbit
            </h1>

            <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        {/* সাইন ইন ও সাইন আপ */}
        <nav
          aria-label="অ্যাকাউন্ট নেভিগেশন"
          className="flex items-center justify-end gap-2 sm:gap-3"
        >
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-red-700 sm:px-4"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="whitespace-nowrap rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 sm:px-5 sm:py-2.5"
          >
            সাইন আপ
          </Link>
          <Link href="/profile">আমার প্রোফাইল</Link>
        </nav>

      </div>
    </header>
  );
};

export default Headerpage;
