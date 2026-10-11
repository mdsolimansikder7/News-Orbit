"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        setError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("প্রবেশ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.error) {
        setError("Google দিয়ে প্রবেশ করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch {
      setError("Google মাধ্যমে প্রবেশ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="fieldset w-full max-w-sm rounded-box border border-red-200 bg-white p-6 shadow-lg"
      >
        <legend className="fieldset-legend text-xl font-bold text-red-700">
          সাইন ইন
        </legend>

        <label className="label text-gray-700">ইমেইল</label>
        <input
          name="email"
          type="email"
          className="input w-full border-gray-300 focus:border-red-600"
          placeholder="আপনার ইমেইল লিখুন"
          required
        />

        <label className="label text-gray-700">পাসওয়ার্ড</label>
        <input
          name="password"
          type="password"
          className="input w-full border-gray-300 focus:border-red-600"
          placeholder="আপনার পাসওয়ার্ড লিখুন"
          required
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn mt-4 w-full border-none bg-red-700 text-white hover:bg-red-800 disabled:opacity-60"
        >
          {loading ? "প্রবেশ করা হচ্ছে..." : "প্রবেশ করুন"}
        </button>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="mt-4 w-full border border-gray-200 bg-white font-medium text-gray-800 hover:bg-gray-50 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {googleLoading ? "সংযোগ করা হচ্ছে..." : "Google দিয়ে প্রবেশ করুন"}
        </button>
      </form>
    </div>
  );
}