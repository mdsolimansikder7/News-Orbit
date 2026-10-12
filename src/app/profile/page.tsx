"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Check } from "@gravity-ui/icons";

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
import Spinner from "@/components/Spinner";
import LoadingScreen from "@/components/LoadingScreen";

const labelStyle = "mb-1.5 block text-sm font-semibold text-gray-700";
const inputStyle =
  "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-red-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-100";
const descriptionStyle = "mt-1.5 text-xs font-normal text-gray-500";

const EMPTY_TEXT = "যোগ করা হয়নি";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [tab, setTab] = useState<"info" | "edit">("info");

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  const [imageError, setImageError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
      setPhone(session.user.phone || "");
      setBirthDate(session.user.birthDate || "");
      setAddress(session.user.address || "");
      setBio(session.user.bio || "");
    }
  }, [session]);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }

    setSaving(true);
    const toastId = toast.loading("সংরক্ষণ হচ্ছে...");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || null,
        phone: phone.trim(),
        birthDate: birthDate.trim(),
        address: address.trim(),
        bio: bio.trim(),
      });

      if (error) {
        toast.error(
          error.message || "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।",
          { id: toastId }
        );
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!", { id: toastId });
      setTab("info");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("প্রোফাইল আপডেটে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !session) {
    return <LoadingScreen message="আপনার প্রোফাইল লোড হচ্ছে..." />;
  }

  const user = session.user;

  const joinedDate = new Date(user.createdAt).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const birthDateText = user.birthDate
    ? new Date(user.birthDate).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const showImage = user.image && !imageError;

  const infoRows = [
    { label: "নাম", value: user.name },
    { label: "ইমেইল", value: user.email },
    { label: "ফোন নম্বর", value: user.phone },
    { label: "জন্মতারিখ", value: birthDateText },
    { label: "ঠিকানা", value: user.address },
    { label: "যোগ দিয়েছেন", value: joinedDate },
  ];

  return (
    <main
      lang="bn"
      className="min-h-[80vh] bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-10"
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl shadow-red-100/50">
        <div className="h-32 w-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400" />

        <div className="px-6 pb-8 sm:px-8">
          <div className="-mt-14 flex flex-col items-center text-center sm:flex-row sm:items-end sm:gap-5 sm:text-left">
            {showImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image!}
                alt={user.name}
                onError={() => setImageError(true)}
                className="h-28 w-28 shrink-0 rounded-full border-4 border-white bg-white object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-red-700 text-4xl font-bold text-white shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="mt-3 min-w-0 sm:mb-2 sm:mt-0">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {user.name}
              </h1>
              <p className="truncate text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {user.bio && (
            <p className="mt-5 rounded-2xl bg-red-50/60 px-4 py-3 text-center text-sm leading-relaxed text-gray-700 sm:text-left">
              {user.bio}
            </p>
          )}

          <div className="mt-6 flex gap-2 rounded-xl bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setTab("info")}
              className={`flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === "info"
                  ? "bg-white text-red-700 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              আমার তথ্য
            </button>
            <button
              type="button"
              onClick={() => setTab("edit")}
              className={`flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === "edit"
                  ? "bg-white text-red-700 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              প্রোফাইল আপডেট
            </button>
          </div>

          {tab === "info" && (
            <div className="mt-6">
              <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <span className="shrink-0 text-sm text-gray-500">
                      {row.label}
                    </span>
                    <span
                      className={`text-right text-sm ${
                        row.value
                          ? "font-semibold text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {row.value || EMPTY_TEXT}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="text-sm text-gray-500">ইমেইল যাচাই</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.emailVerified
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {user.emailVerified ? "যাচাই করা হয়েছে" : "যাচাই করা হয়নি"}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setTab("edit")}
                  className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-xl bg-red-700 font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-800"
                >
                  প্রোফাইল আপডেট করুন
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
                >
                  {loggingOut && <Spinner size={16} />}
                  লগ আউট
                </button>
              </div>
            </div>
          )}

          {tab === "edit" && (
            <div className="mt-6">
              <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <TextField
                  isRequired
                  name="name"
                  value={name}
                  onChange={setName}
                >
                  <Label className={labelStyle}>আপনার নাম</Label>
                  <Input
                    className={inputStyle}
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    autoComplete="name"
                  />
                  <FieldError className="mt-1 text-xs text-red-600" />
                </TextField>

                <TextField isDisabled name="email" value={user.email}>
                  <Label className={labelStyle}>ইমেইল</Label>
                  <Input
                    className={`${inputStyle} cursor-not-allowed opacity-60`}
                  />
                  <Description className={descriptionStyle}>
                    ইমেইল এখান থেকে বদলানো যাবে না।
                  </Description>
                </TextField>

                <TextField
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  validate={(value) => {
                    if (!value) return null;

                    if (!/^(\+?88)?01[3-9]\d{8}$/.test(value)) {
                      return "সঠিক ফোন নম্বর লিখুন (যেমন: 01712345678)।";
                    }

                    return null;
                  }}
                >
                  <Label className={labelStyle}>ফোন নম্বর</Label>
                  <Input
                    className={inputStyle}
                    placeholder="01XXXXXXXXX"
                    autoComplete="tel"
                  />
                  <FieldError className="mt-1 text-xs text-red-600" />
                </TextField>

                <TextField
                  name="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={setBirthDate}
                >
                  <Label className={labelStyle}>জন্মতারিখ</Label>
                  <Input className={inputStyle} autoComplete="bday" />
                </TextField>

                <TextField
                  name="address"
                  value={address}
                  onChange={setAddress}
                >
                  <Label className={labelStyle}>ঠিকানা</Label>
                  <Input
                    className={inputStyle}
                    placeholder="আপনার ঠিকানা লিখুন"
                    autoComplete="street-address"
                  />
                </TextField>

                <div>
                  <label htmlFor="bio" className={labelStyle}>
                    নিজের সম্পর্কে
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    maxLength={200}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="নিজের সম্পর্কে কিছু লিখুন..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-red-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-100"
                  />
                  <p className="mt-1.5 text-right text-xs text-gray-500">
                    {bio.length}/200
                  </p>
                </div>

                <TextField name="image" value={imageUrl} onChange={setImageUrl}>
                  <Label className={labelStyle}>প্রোফাইল ছবির লিংক</Label>
                  <Input
                    className={inputStyle}
                    placeholder="https://example.com/my-photo.jpg"
                  />
                  <Description className={descriptionStyle}>
                    ছবির লিংক (URL) পেস্ট করুন। নিচে preview দেখতে পাবেন।
                  </Description>
                </TextField>

                <div className="flex items-center gap-4 rounded-2xl border border-dashed border-red-200 bg-red-50/50 p-4">
                  {imageUrl && !imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt="preview"
                      onError={() => setImageError(true)}
                      className="h-16 w-16 rounded-full border-2 border-white object-cover shadow"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-2xl font-bold text-white">
                      {name ? name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">ছবির preview</p>
                    <p className="text-xs text-gray-500">
                      {imageError
                        ? "এই লিংকের ছবি দেখানো যাচ্ছে না, লিংক ঠিক আছে কিনা দেখুন।"
                        : "সংরক্ষণ করলে এই ছবিটাই আপনার প্রোফাইলে থাকবে।"}
                    </p>
                  </div>
                </div>

                <div className="mt-1 flex w-full gap-3">
                  <Button
                    type="submit"
                    isDisabled={saving}
                    className="flex h-11 flex-[2] items-center justify-center gap-2 rounded-xl bg-red-700 font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-800 disabled:opacity-60"
                  >
                    {saving ? <Spinner /> : <Check width={18} height={18} />}
                    {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    isDisabled={saving}
                    className="flex h-11 flex-1 items-center justify-center rounded-xl border border-gray-200 font-medium text-gray-600 transition hover:bg-gray-50"
                    onPress={() => {
                      setName(user.name || "");
                      setImageUrl(user.image || "");
                      setPhone(user.phone || "");
                      setBirthDate(user.birthDate || "");
                      setAddress(user.address || "");
                      setBio(user.bio || "");
                      setTab("info");
                    }}
                  >
                    বাতিল
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}