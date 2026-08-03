export type Locale = "ko" | "en";

export type Bilingual = {
  ko: string;
  en: string;
};

export type StudyStep = {
  id: string;
  covers: string;
  title: Bilingual;
  summary: Bilingual;
  detail: Bilingual;
  checkpoint: Bilingual;
  notation?: string;
};

export type QuizQuestion = {
  question: Bilingual;
  options: Bilingual[];
  correct: number;
  explanation: Bilingual;
};

export type StudyUnit = {
  number: string;
  slug: string;
  part: 1 | 2 | 3 | 4;
  pages: string;
  minutes: number;
  title: Bilingual;
  eyebrow: Bilingual;
  overview: Bilingual;
  goals: Bilingual[];
  keyTerms: Bilingual[];
  steps: StudyStep[];
  quiz: QuizQuestion[];
  bridge: Bilingual;
};

export const b = (ko: string, en: string): Bilingual => ({ ko, en });
