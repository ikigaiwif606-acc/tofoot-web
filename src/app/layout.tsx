import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToFoot 火光足球 | 法國人帶你看歐洲足球",
  description:
    "法國人在台灣，用中文帶你看懂歐洲足球。2026世界盃預測、賽事分析、球員故事、足球文化。",
  keywords: ["足球", "歐洲足球", "世界盃", "2026", "法國", "台灣", "football", "ToFoot"],
  openGraph: {
    title: "ToFoot 火光足球",
    description: "法國人在台灣，用中文帶你看懂歐洲足球",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
