"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Check, CircleXmark, CircleCheck } from "@gravity-ui/icons";

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

export default function ProfilePage() {
  const router = useRouter();

  // লগইন করা user-এর তথ্য
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // লগইন না থাকলে sign-in পেজে পাঠিয়ে দেবে
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  // session আসলে ফর্মে আগের তথ্য বসিয়ে দেবে
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
    }
  }, [session]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("নাম খালি রাখা যাবে না।");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || null,
      });

      if (error) {
        setErrorMessage(
          error.message || "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      setSuccessMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMessage("প্রোফাইল আপডেটে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  // লোড হচ্ছে
  if (isPending || !session) {
    return (
      <main
        lang="bn"
        className="flex min-h-screen items-center justify-center bg-gray-50"
      >
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main
      lang="bn"
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8"
    >
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 shadow-lg">
        <h1 className="mb-1 text-2xl font-bold text-red-700">
          আমার প্রোফাইল
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          আপনার নাম ও ছবি এখান থেকে বদলাতে পারবেন।
        </p>

        {/* প্রোফাইল ছবির preview */}
        <div className="mb-6 flex flex-col items-center gap-2">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="প্রোফাইল ছবি"
              className="h-28 w-28 rounded-full border-4 border-red-100 object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-100 text-4xl font-bold text-red-700">
              {name ? name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <CircleXmark width={20} height={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">আপডেট করা যায়নি</p>
              <p className="mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

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

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="name" value={name} onChange={setName}>
            <Label>আপনার নাম</Label>
            <Input placeholder="আপনার পূর্ণ নাম লিখুন" autoComplete="name" />
            <FieldError />
          </TextField>

          <TextField isDisabled name="email" value={session.user.email}>
            <Label>ইমেইল</Label>
            <Input />
            <Description>ইমেইল এখান থেকে বদলানো যাবে না।</Description>
          </TextField>

          <TextField name="image" value={imageUrl} onChange={setImageUrl}>
            <Label>প্রোফাইল ছবির লিংক</Label>
            <Input placeholder="https://example.com/my-photo.jpg" />
            <Description>
              ছবির লিংক (URL) পেস্ট করুন। ওপরে সাথে সাথে preview দেখবেন।
            </Description>
          </TextField>

          <Button
            type="submit"
            isDisabled={saving}
            className="w-full bg-red-700 font-semibold text-white hover:bg-red-800"
          >
            <Check width={18} height={18} />
            {saving ? "সংরক্ষণ হচ্ছে..." : "প্রোফাইল সংরক্ষণ করুন"}
          </Button>
        </Form>
      </div>
    </main>
  );
}