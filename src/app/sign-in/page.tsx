"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import toast from "react-hot-toast";

import { Check } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import Spinner from "@/components/Spinner";

const labelStyle = "mb-1.5 block text-sm font-semibold text-gray-700";
const inputStyle =
  "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-red-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-100";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isBusy = loading || googleLoading;

  const handleSignInWithGoogle = async () => {
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error("Google দিয়ে সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google দিয়ে সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      setGoogleLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    setLoading(true);
    const toastId = toast.loading("সাইন ইন হচ্ছে...");

    try {
      const { error } = await authClient.signIn.email({
        email: email!,
        password: password!,
      });

      if (error) {
        toast.error("সাইন ইন ব্যর্থ হয়েছে। ইমেইল বা পাসওয়ার্ড ঠিক নয়।", {
          id: toastId,
        });
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!", { id: toastId });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      lang="bn"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-10"
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl shadow-red-100/50">
        <div className="h-2 w-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400" />

        <div className="p-7 sm:p-8">
          <div className="mb-7 flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-2xl font-extrabold text-white shadow-lg shadow-red-200">
              N
            </div>
            <h1 className="text-2xl font-bold text-gray-900">সাইন ইন করুন</h1>
            <p className="mt-1 text-sm text-gray-500">
              আপনার অ্যাকাউন্টে প্রবেশ করে সব খবর পড়ুন।
            </p>
          </div>

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <TextField isRequired name="email" type="email">
              <Label className={labelStyle}>ইমেইল</Label>
              <Input
                className={inputStyle}
                placeholder="আপনার ইমেইল লিখুন"
                autoComplete="email"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <TextField isRequired name="password" type="password">
              <Label className={labelStyle}>পাসওয়ার্ড</Label>
              <Input
                className={inputStyle}
                placeholder="পাসওয়ার্ড লিখুন"
                autoComplete="current-password"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              isDisabled={isBusy}
              className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-700 font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-800 disabled:opacity-60"
            >
              {loading ? <Spinner /> : <Check width={18} height={18} />}
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>
          </Form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            type="button"
            onPress={handleSignInWithGoogle}
            isDisabled={isBusy}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-gray-300 bg-white font-medium text-gray-800 transition hover:bg-gray-50 disabled:opacity-60"
          >
            {googleLoading ? <Spinner size={20} /> : <FcGoogle size={20} />}
            {googleLoading ? "সংযোগ করা হচ্ছে..." : "Google দিয়ে প্রবেশ করুন"}
          </Button>

          <p className="mt-6 text-center text-sm text-gray-600">
            নতুন ব্যবহারকারী?{" "}
            <NextLink
              href="/sign-up"
              className="font-semibold text-red-700 hover:underline"
            >
              সাইন আপ করুন
            </NextLink>
          </p>
        </div>
      </div>
    </main>
  );
}