import type { Bilingual } from "./types";

export type LessonProseBlock = {
  kind: "prose";
  paragraphs: Bilingual[];
};

export type LessonListBlock = {
  kind: "list";
  title?: Bilingual;
  items: Bilingual[];
};

export type LessonNotationBlock = {
  kind: "notation";
  title: Bilingual;
  notation: string;
  latex?: string;
  explanation: Bilingual;
};

export type LessonExampleBlock = {
  kind: "example";
  title: Bilingual;
  setup: Bilingual;
  steps: Bilingual[];
  conclusion: Bilingual;
};

export type LessonCalloutBlock = {
  kind: "callout";
  tone: "key" | "warning" | "proof";
  title: Bilingual;
  paragraphs: Bilingual[];
};

export type LessonSubsectionBlock = {
  kind: "subsection";
  id: string;
  covers: string;
  title: Bilingual;
  lead: Bilingual;
};

export type LessonBlock =
  | LessonProseBlock
  | LessonListBlock
  | LessonNotationBlock
  | LessonExampleBlock
  | LessonCalloutBlock
  | LessonSubsectionBlock;

export type LongformSection = {
  id: string;
  covers: string;
  minutes: number;
  title: Bilingual;
  lead: Bilingual;
  blocks: LessonBlock[];
  checkpoints: Bilingual[];
};

export type ChapterLongform = {
  slug: string;
  readingMinutes: number;
  minimumKoreanCharacters: number;
  title: Bilingual;
  introduction: Bilingual[];
  sections: LongformSection[];
};
