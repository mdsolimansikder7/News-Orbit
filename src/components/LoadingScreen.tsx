import Image from "next/image";

type LoadingScreenProps = {
  message?: string;
};

export default function LoadingScreen({
  message = "সর্বশেষ খবর আনা হচ্ছে...",
}: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-white via-white to-red-50/60 px-4"
    >
      <style>{`
        @keyframes no-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes no-bar {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
        .no-orbit { animation: no-orbit 2.4s linear infinite; }
        .no-orbit-slow { animation: no-orbit 16s linear infinite reverse; }
        .no-bar { animation: no-bar 1.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .no-orbit, .no-orbit-slow, .no-bar { animation: none; }
        }
      `}</style>

      <div className="relative h-36 w-36">
        <div className="no-orbit-slow absolute inset-0 rounded-full border-2 border-dashed border-red-200" />

        <div className="no-orbit absolute inset-3 rounded-full border border-red-100">
          <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-300" />
        </div>

        <div className="absolute inset-7 animate-pulse rounded-full bg-red-100/80" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/news.png"
            alt="নিউজ অরবিট"
            width={56}
            height={56}
            priority
            className="h-14 w-14 object-contain"
          />
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-red-700">
        News Orbit
      </h2>

      <p className="mt-2 text-sm text-gray-500">{message}</p>

      <div className="mt-6 h-1.5 w-52 overflow-hidden rounded-full bg-red-100">
        <div className="no-bar h-full w-1/3 rounded-full bg-gradient-to-r from-red-500 via-red-700 to-orange-400" />
      </div>
    </div>
  );
}