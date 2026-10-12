"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Category = {
  slug: string;
  title: string;
};

type MobileMenuProps = {
  categories: Category[];
};

const MobileMenu = ({ categories }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // মেনু ওপেন থাকলে body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ☰ হ্যামবার্গার বাটন — শুধু মোবাইলে, বাম পাশে */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none md:hidden"
        aria-label="মেনু খুলুন"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* ─── ওভারলে মেনু ─── */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      {/* Slide-in Panel — বাম দিক থেকে আসবে */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] w-full max-w-sm transform overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ─── প্যানেল হেডার: লোগো + ✕ ─── */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <Image
              src="/news.png"
              alt="নিউজ অরবিট লোগো"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="text-lg font-extrabold text-red-700">
              News Orbit
            </span>
          </Link>

          <button
            onClick={closeMenu}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="মেনু বন্ধ করুন"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ─── ক্যাটেগরি লিস্ট ─── */}
        <nav aria-label="ক্যাটেগরি নেভিগেশন" className="px-4 py-2">
          <ul className="divide-y divide-gray-100">
            {/* হোম */}
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 py-3.5 text-base font-medium text-gray-800 transition-colors hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
                  />
                </svg>
                হোম
              </Link>
            </li>

            {/* সার্ভার থেকে আসা ক্যাটেগরি */}
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-3.5 text-base font-medium text-gray-800 transition-colors hover:text-red-700"
                >
                  {category.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
