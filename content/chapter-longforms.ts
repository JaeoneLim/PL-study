import { predicateLogicLongform } from "./chapter-01-longform";
import { simpleImperativeLanguageLongform } from "./chapter-02-longform";
import type { ChapterLongform } from "./longform-types";

export const chapterLongforms: Partial<Record<string, ChapterLongform>> = {
  [predicateLogicLongform.slug]: predicateLogicLongform,
  [simpleImperativeLanguageLongform.slug]: simpleImperativeLanguageLongform,
};
