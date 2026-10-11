"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();

  // লগইন করা আছে কিনা সেটা এখান থেকে জানা যায়
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  // লোড হওয়ার সময় কিছু দেখাবে না (যাতে বাটন ঝিলিক না দেয়)
  if (isPending) {
    return <div className="h-9 w-40" />;
  }

  // লগইন করা থাকলে: প্রোফাইল + লগ আউট
  if (session) {
    const user = session.user;

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <NextLink
          href="/profile"
          className="flex items-center gap-2 rounded-full border border-red-100 bg-red-50 py-1 pl-1 pr-1 text-sm sm:pr-4 font-semibold text-red-700 transition hover:bg-red-100"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-700 text-sm font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="hidden sm:inline">আমার প্রোফাইল</span>
        </NextLink>

        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer text-sm font-medium text-gray-600 transition hover:text-red-700"
        >
          লগ আউট
        </button>
      </div>
    );
  }

  // লগইন করা না থাকলে: সাইন ইন + সাইন আপ
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NextLink
        href="/sign-in"
        className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-red-700 sm:px-4"
      >
        সাইন ইন
      </NextLink>

      <NextLink
        href="/sign-up"
        className="whitespace-nowrap rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 sm:px-5 sm:py-2.5"
      >
        সাইন আপ
      </NextLink>
    </div>
  );
}