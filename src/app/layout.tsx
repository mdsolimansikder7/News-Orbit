import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Navlinks from "../components/Navlinks";
import Marquee from "../components/Marquee";
import ToasterProvider from "../components/ToastProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "News Orbit",
  description: "বাংলা ভাষায় সর্বশেষ খবর",
  icons: {
    icon: "/NO.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light" className={notoSerifBengali.className}>
      <body>
        <ToasterProvider />

        <div>
          <Header />
          <Navlinks />
        </div>

        <Marquee />

        <div>{children}</div>
        <SpeedInsights/>
      </body>
    </html>
  );
}