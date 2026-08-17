import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? "https://semantic-atlas-reynolds.jae-one-lim.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Theories of PL — Theories of Programming Languages",
    template: "%s · Theories of PL",
  },
  description:
    "A bilingual Korean–English study companion for John C. Reynolds' Theories of Programming Languages.",
  applicationName: "Theories of PL",
  authors: [{ name: "Community study companion" }],
  openGraph: {
    title: "Theories of PL — Theories of Programming Languages",
    description: "20 guided units, bilingual explanations, and self-check quizzes.",
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Theories of PL study course" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theories of PL — Theories of Programming Languages",
    description: "20 guided units, bilingual explanations, and self-check quizzes.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
