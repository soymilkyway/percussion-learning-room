import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { siteUrl } from "./lib/site-url";

const fontCss = `
@font-face{font-family:"Percussion Noto Sans TC";src:url("${siteUrl("/fonts/NotoSansTC-site.woff2")}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap}
@font-face{font-family:"Percussion Noto Serif TC";src:url("${siteUrl("/fonts/NotoSerifTC-site.woff2")}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap}
`;

export async function generateMetadata(): Promise<Metadata> {
  let origin = process.env.NEXT_PUBLIC_SITE_ORIGIN;
  if (!origin) {
    const incoming = await headers();
    const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
    origin = host === "percussion-learning-room.boichen1512.chatgpt.site"
      ? `https://${host}` : "http://localhost:3000";
  }
  const image = new URL(siteUrl("/og-v3.png"), origin).href;
  return {
    title: { default: "打擊樂器學習室", template: "%s｜打擊樂器學習室" },
    description: "給零基礎學員的打擊樂器行動筆記：認識樂理、演奏、樂器、管樂團配置與推薦曲目。",
    openGraph: {
      title: "打擊樂器學習室",
      description: "聽見節拍，開始你的打擊旅程。",
      type: "website",
      images: [{ url: image, width: 1731, height: 909, alt: "打擊樂器學習室－給剛加入管樂打擊的你" }],
    },
    twitter: { card: "summary_large_image", title: "打擊樂器學習室", description: "聽見節拍，開始你的打擊旅程。", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><head><style>{fontCss}</style></head><body>{children}</body></html>;
}
