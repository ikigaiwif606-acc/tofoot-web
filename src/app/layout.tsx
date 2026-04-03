import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  );
}
