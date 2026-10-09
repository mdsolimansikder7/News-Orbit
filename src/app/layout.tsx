import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Navlinks from "../components/Navlinks";
import Marquee from "../components/Marquee";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "News Orbit",
  description: "বাংলা ভাষায় সর্বশেষ খবর",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light" className={notoSerifBengali.className}>
      <body>
        <div>
          <Header />
          <Navlinks />
        </div>

        <Marquee />

        <main>{children}</main>
      </body>
    </html>
  );
}