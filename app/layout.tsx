import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://semantic-atlas-reynolds.jae-one-lim.chatgpt.site"),
  title: {
    default: "Semantic Atlas — Theories of Programming Languages",
    template: "%s · Semantic Atlas",
  },
  description:
    "A bilingual Korean–English study companion for John C. Reynolds' Theories of Programming Languages.",
  applicationName: "Semantic Atlas",
  authors: [{ name: "Community study companion" }],
  openGraph: {
    title: "Semantic Atlas — Theories of Programming Languages",
    description: "20 guided units, bilingual explanations, and self-check quizzes.",
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Semantic Atlas study course" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Semantic Atlas — Theories of Programming Languages",
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
