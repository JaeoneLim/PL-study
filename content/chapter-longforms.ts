import { predicateLogicLongform } from "./chapter-01-longform";
import { simpleImperativeLanguageLongform } from "./chapter-02-longform";
import { programSpecificationsLongform } from "./chapter-03-longform";
import type { ChapterLongform } from "./longform-types";

export const chapterLongforms: Partial<Record<string, ChapterLongform>> = {
  [predicateLogicLongform.slug]: predicateLogicLongform,
  [simpleImperativeLanguageLongform.slug]: simpleImperativeLanguageLongform,
  [programSpecificationsLongform.slug]: programSpecificationsLongform,
};
