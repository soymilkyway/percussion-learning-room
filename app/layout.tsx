import type { Metadata } from "next";
import { headers } from "next/headers";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./lib/site-url";

const sans = Noto_Sans_TC({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "700"] });
const serif = Noto_Serif_TC({ variable: "--font-serif", subsets: ["latin"], weight: ["700", "900"] });

export async function generateMetadata(): Promise<Metadata> {
  let origin = process.env.NEXT_PUBLIC_SITE_ORIGIN;
  if (!origin) {
    const incoming = await headers();
    const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
    origin = host === "percussion-learning-room.boichen1512.chatgpt.site"
      ? `https://${host}` : "http://localhost:3000";
  }
  const image = new URL(siteUrl("/og-v2.png"), origin).href;
  return {
    title: { default: "打擊樂器學習室", template: "%s｜打擊樂器學習室" },
    description: "給零基礎學員的打擊樂器行動筆記：認識樂理、演奏、樂器、管樂團配置與推薦曲目。",
    openGraph: { title: "打擊樂器學習室", description: "聽見節拍，開始你的打擊旅程。", type: "website", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: "打擊樂器學習室", description: "聽見節拍，開始你的打擊旅程。", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
