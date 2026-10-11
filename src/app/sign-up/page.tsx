
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

import { Check, CircleXmark, CircleCheck } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";

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

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isBusy =
    loading || googleLoading || githubLoading || discordLoading;

  const handleSignInWithDiscord = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setDiscordLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "discord",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Discord দিয়ে প্রবেশ করা যায়নি। আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.error("Discord sign in error:", error);
      setErrorMessage(
        "Discord মাধ্যমে প্রবেশ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setDiscordLoading(false);
    }
  };

  const handleSignInWithGithub = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setGithubLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Github দিয়ে প্রবেশ করা যায়নি। আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.error("Github sign in error:", error);
      setErrorMessage(
        "Github মাধ্যমে প্রবেশ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setGithubLoading(false);
    }
  };

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
          error.message || "Google দিয়ে প্রবেশ করা যায়নি। আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      setErrorMessage(
        "Google মাধ্যমে প্রবেশ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
      setErrorMessage(
        "অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      lang="bn"
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8"
    >
      <div className="w-full max-w-sm rounded-2xl border border-red-100 bg-white p-6 shadow-lg">
        <h1 className="mb-1 text-2xl font-bold text-red-700">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          অ্যাকাউন্ট খুলতে প্রয়োজনীয় তথ্য দিন।
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <CircleXmark
              width={20}
              height={20}
              className="mt-0.5 shrink-0"
            />
            <div>
              <p className="font-semibold">অ্যাকাউন্ট তৈরি করা যায়নি</p>
              <p className="mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            <CircleCheck
              width={20}
              height={20}
              className="mt-0.5 shrink-0"
            />
            <div>
              <p className="font-semibold">সফল হয়েছে</p>
              <p className="mt-1">{successMessage}</p>
            </div>
          </div>
        )}

        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
        >
          <TextField isRequired name="name">
            <Label>আপনার নাম</Label>
            <Input
              placeholder="আপনার পূর্ণ নাম লিখুন"
              autoComplete="name"
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "সঠিক ইমেইল ঠিকানা লিখুন।";
              }

              return null;
            }}
          >
            <Label>ইমেইল </Label>
            <Input
              placeholder="আপনার ইমেইল লিখুন"
              autoComplete="email"
            />
            <FieldError />
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
                return "পাসওয়ার্ডে অন্তত একটি ইংরেজি বড় হাতের অক্ষর থাকতে হবে।";
              }

              if (!/[0-9]/.test(value)) {
                return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।";
              }

              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input
              placeholder="পাসওয়ার্ড লিখুন"
              autoComplete="new-password"
            />
            <Description>
              কমপক্ষে ৮ অক্ষর, একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা দিন।
            </Description>
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
          >
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input
              placeholder="আবার পাসওয়ার্ড লিখুন"
              autoComplete="new-password"
            />
            <FieldError />
          </TextField>

          <div className="flex w-full gap-2">
            <Button
              type="submit"
              isDisabled={isBusy}
              className="flex-1 bg-red-700 font-semibold text-white hover:bg-red-800"
            >
              <Check width={18} height={18} />
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
            </Button>

            <Button
              type="reset"
              variant="bordered"
              isDisabled={isBusy}
              className="flex-1 border-red-200 text-red-700"
              onPress={() => {
                setErrorMessage("");
                setSuccessMessage("");
              }}
            >
              মুছে ফেলুন
            </Button>
          </div>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <NextLink
            href="/sign-in"
            className="font-semibold text-red-700 hover:underline"
          >
            সাইন ইন করুন
          </NextLink>
        </p>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">
            অথবা
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <Button
          type="button"
          onPress={handleSignInWithGoogle}
          isDisabled={isBusy}
          className="w-full border border-gray-200 bg-white font-medium text-gray-800"
        >
          <FcGoogle size={18} />
          {googleLoading
            ? "সংযোগ করা হচ্ছে..."
            : "Google দিয়ে প্রবেশ করুন"}
        </Button>

        <Button
          type="button"
          onPress={handleSignInWithGithub}
          isDisabled={isBusy}
          className="mt-3 w-full border border-gray-200 bg-white font-medium text-gray-800"
        >
          <FaGithub size={18} />
          {githubLoading
            ? "সংযোগ করা হচ্ছে..."
            : "Github দিয়ে প্রবেশ করুন"}
        </Button>

        <Button
          type="button"
          onPress={handleSignInWithDiscord}
          isDisabled={isBusy}
          className="mt-3 w-full border border-gray-200 bg-white font-medium text-gray-800"
        >
          <FaDiscord size={18} />
          {discordLoading
            ? "সংযোগ করা হচ্ছে..."
            : "Discord দিয়ে প্রবেশ করুন"}
        </Button>
      </div>
    </main>
  );
}
