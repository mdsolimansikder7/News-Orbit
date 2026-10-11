"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

import { Check, CircleXmark, CircleCheck } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

// ফিল্ডগুলোর স্টাইল এক জায়গায় রাখলাম, যাতে বারবার লিখতে না হয়
const labelStyle = "mb-1.5 block text-sm font-semibold text-gray-700";
const inputStyle =
  "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-red-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-100";
const descriptionStyle = "mt-1.5 text-xs font-normal text-gray-500";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isBusy = loading || googleLoading;

  const handleSignInWithGoogle = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Google দিয়ে প্রবেশ করা যায়নি। আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      setErrorMessage(
        "Google মাধ্যমে প্রবেশ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (password !== confirmPassword) {
      setErrorMessage("দুটি পাসওয়ার্ড এক নয়।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name!,
        email: email!,
        password: password!,
      });

      if (error) {
        setErrorMessage(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      setSuccessMessage(
        "অ্যাকাউন্ট তৈরি সফল হয়েছে! প্রবেশের পাতায় নেওয়া হচ্ছে..."
      );

      setTimeout(() => {
        router.push("/sign-in");
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
        {/* ওপরের লাল পট্টি */}
        <div className="h-2 w-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400" />

        <div className="p-7 sm:p-8">
          {/* লোগো ও শিরোনাম */}
          <div className="mb-7 flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-2xl font-extrabold text-white shadow-lg shadow-red-200">
              N
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              News Orbit-এ যোগ দিন, সব খবর এক জায়গায় পান।
            </p>
          </div>

          {/* error বার্তা */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <CircleXmark width={20} height={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">অ্যাকাউন্ট তৈরি করা যায়নি</p>
                <p className="mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* সফল বার্তা */}
          {successMessage && (
            <div
              role="status"
              className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
            >
              <CircleCheck width={20} height={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">সফল হয়েছে</p>
                <p className="mt-1">{successMessage}</p>
              </div>
            </div>
          )}

          {/* ফর্ম */}
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <TextField isRequired name="name">
              <Label className={labelStyle}>আপনার নাম</Label>
              <Input
                className={inputStyle}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                autoComplete="name"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "সঠিক ইমেইল ঠিকানা লিখুন।";
                }

                return null;
              }}
            >
              <Label className={labelStyle}>ইমেইল</Label>
              <Input
                className={inputStyle}
                placeholder="আপনার ইমেইল লিখুন"
                autoComplete="email"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
                }

                if (!/[A-Z]/.test(value)) {
                  return "পাসওয়ার্ডে অন্তত একটি ইংরেজি বড় হাতের অক্ষর থাকতে হবে।";
                }

                if (!/[0-9]/.test(value)) {
                  return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।";
                }

                return null;
              }}
            >
              <Label className={labelStyle}>পাসওয়ার্ড</Label>
              <Input
                className={inputStyle}
                placeholder="পাসওয়ার্ড লিখুন"
                autoComplete="new-password"
              />
              <Description className={descriptionStyle}>
                কমপক্ষে ৮ অক্ষর, একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা দিন।
              </Description>
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <TextField isRequired name="confirmPassword" type="password">
              <Label className={labelStyle}>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input
                className={inputStyle}
                placeholder="আবার পাসওয়ার্ড লিখুন"
                autoComplete="new-password"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            {/* বাটন */}
            <div className="mt-1 flex w-full gap-3">
              <Button
                type="submit"
                isDisabled={isBusy}
                className="flex h-11 flex-[2] items-center justify-center gap-2 rounded-xl bg-red-700 font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-800 disabled:opacity-60"
              >
                <Check width={18} height={18} />
                {loading ? "তৈরি হচ্ছে..." : "সাইন আপ"}
              </Button>

              <Button
                type="reset"
                variant="outline"
                isDisabled={isBusy}
                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-gray-200 font-medium text-gray-600 transition hover:bg-gray-50"
                onPress={() => {
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
              >
                মুছুন
              </Button>
            </div>
          </Form>

          {/* অথবা */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google বাটন */}
          <Button
            type="button"
            onPress={handleSignInWithGoogle}
            isDisabled={isBusy}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-gray-300 bg-white font-medium text-gray-800 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <FcGoogle size={20} />
            {googleLoading ? "সংযোগ করা হচ্ছে..." : "Google দিয়ে প্রবেশ করুন"}
          </Button>

          {/* sign-in লিংক */}
          <p className="mt-6 text-center text-sm text-gray-600">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <NextLink
              href="/sign-in"
              className="font-semibold text-red-700 hover:underline"
            >
              সাইন ইন করুন
            </NextLink>
          </p>
        </div>
      </div>
    </main>
  );
}