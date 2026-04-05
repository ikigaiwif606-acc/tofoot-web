import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ToFoot 火光足球 | 法國人帶你看歐洲足球",
  description:
    "法國人在台灣，用中文帶你看懂歐洲足球。2026世界盃預測、賽事分析、球員故事、足球文化。",
  keywords: [
    "足球",
    "歐洲足球",
    "世界盃",
    "2026",
    "法國",
    "台灣",
    "football",
    "ToFoot",
  ],
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
      className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <body className="page-wrapper min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  );
}
