import { predicateLogicLongform } from "./chapter-01-longform";
import type { ChapterLongform } from "./longform-types";

export const chapterLongforms: Partial<Record<string, ChapterLongform>> = {
  [predicateLogicLongform.slug]: predicateLogicLongform,
};
