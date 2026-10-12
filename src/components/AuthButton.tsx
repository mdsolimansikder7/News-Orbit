"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import Spinner from "./Spinner";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const toastId = toast.loading("লগ আউট হচ্ছে...");

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগ আউট হয়েছে।", { id: toastId });
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("লগ আউট করা যায়নি। আবার চেষ্টা করুন।", { id: toastId });
        },
      },
    });

    setLoggingOut(false);
  };

  if (isPending) {
    return (
      <div className="flex h-9 w-40 items-center justify-end text-red-700">
        <Spinner size={20} />
      </div>
    );
  }

  if (session) {
    const user = session.user;

    return (
      <div className="flex items-center gap-1.5 sm:gap-3">
        <NextLink
          href="/profile"
          className="flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 py-0.5 pl-0.5 pr-0.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 sm:py-1 sm:pl-1 sm:pr-4 sm:text-sm"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
            />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="hidden sm:inline">আমার প্রোফাইল</span>
        </NextLink>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-600 transition hover:text-red-700 disabled:opacity-60 sm:gap-1.5 sm:text-sm"
        >
          {loggingOut && <Spinner size={14} />}
          <span className="hidden sm:inline">লগ আউট</span>
          {/* মোবাইলে শুধু আইকন */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <NextLink
        href="/sign-in"
        className="rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-red-700 sm:px-4 sm:py-2 sm:text-sm"
      >
        সাইন ইন
      </NextLink>

      <NextLink
        href="/sign-up"
        className="whitespace-nowrap rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-800 sm:px-5 sm:py-2.5 sm:text-sm"
      >
        সাইন আপ
      </NextLink>
    </div>
  );
}