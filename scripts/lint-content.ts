import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { bookOverview } from "../content/book-overview";
import { chapterGuides } from "../content/chapter-guides";
import { chapterGlossaries } from "../content/chapter-glossaries";
import { chapterLongforms } from "../content/chapter-longforms";
import { units } from "../content/course";
import { longformReadingMinutes } from "../content/longform-status";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors: string[] = [];

function assert(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

function collectKoreanCopy(value: unknown, output: string[]) {
  if (Array.isArray(value)) {
    for (const item of value) collectKoreanCopy(item, output);
    return;
  }
  if (!value || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  if (typeof record.ko === "string" && typeof record.en === "string") {
    output.push(record.ko);
    return;
  }
  for (const item of Object.values(record)) collectKoreanCopy(item, output);
}

async function collectFiles(path: string): Promise<string[]> {
  const entries = await readdir(path, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const entryPath = join(path, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(entryPath));
    else if (/\.(?:md|ts|tsx)$/.test(entry.name)) files.push(entryPath);
  }
  return files;
}

assert(units.length === 20, `expected 20 units, found ${units.length}`);
assert(new Set(units.map((unit) => unit.slug)).size === units.length, "unit slugs must be unique");
assert(new Set(units.map((unit) => unit.number)).size === units.length, "unit numbers must be unique");
assert(Object.keys(chapterGuides).length === units.length, `expected ${units.length} detailed chapter guides, found ${Object.keys(chapterGuides).length}`);
assert(Object.keys(chapterGlossaries).length === units.length, `expected ${units.length} chapter glossaries, found ${Object.keys(chapterGlossaries).length}`);
assert(bookOverview.arcs.length === 4, `expected 4 whole-book arcs, found ${bookOverview.arcs.length}`);
assert(bookOverview.semanticSpine.length >= 5, "whole-book overview needs a complete semantic spine");
assert(bookOverview.recurringLenses.length >= 6, "whole-book overview needs recurring conceptual lenses");
assert(Boolean(chapterLongforms["predicate-logic"]), "Chapter 1 must have a complete longform lesson");

const koreanCopy: string[] = [];
collectKoreanCopy({ bookOverview, chapterGlossaries, chapterGuides, chapterLongforms, units }, koreanCopy);
const koreanCopyText = koreanCopy.join("\n");
for (const term of ["syntax", "semantics", "statement", "assertion", "constructor"]) {
  assert(new RegExp(`\\b${term}\\b`, "i").test(koreanCopyText), `Korean edition must preserve the English term ${term}`);
}

for (const [slug, lesson] of Object.entries(chapterLongforms)) {
  if (!lesson) continue;
  const koreanCharacterCount = (JSON.stringify(lesson).match(/[가-힣]/g) ?? []).length;
  const plannedMinutes = lesson.sections.reduce((total, section) => total + section.minutes, 0);
  assert(lesson.readingMinutes >= 30, `${slug}: longform lesson must be at least a 30-minute read`);
  assert(longformReadingMinutes[slug] === lesson.readingMinutes, `${slug}: longform status reading time is out of sync`);
  assert(plannedMinutes >= lesson.readingMinutes, `${slug}: section reading times do not support the chapter estimate`);
  assert(koreanCharacterCount >= lesson.minimumKoreanCharacters, `${slug}: longform Korean body is too short (${koreanCharacterCount}/${lesson.minimumKoreanCharacters} characters)`);
  assert(lesson.sections.length >= 8, `${slug}: expected at least 8 longform sections`);
  assert(new Set(lesson.sections.map((section) => section.id)).size === lesson.sections.length, `${slug}: longform section ids must be unique`);
  for (const [index, section] of lesson.sections.entries()) {
    assert(section.blocks.length >= 2, `${slug} longform section ${index + 1}: expected multiple explanation blocks`);
    assert(section.checkpoints.length >= 2, `${slug} longform section ${index + 1}: expected at least 2 retrieval checks`);
  }
}

for (const unit of units) {
  const guide = chapterGuides[unit.slug];
  const glossary = chapterGlossaries[unit.slug];
  assert(Boolean(guide), `${unit.slug}: missing detailed chapter guide`);
  assert(Boolean(glossary), `${unit.slug}: missing chapter glossary`);
  assert(unit.title.ko.length > 0 && unit.title.en.length > 0, `${unit.slug}: missing bilingual title`);
  assert(unit.overview.ko.length > 38 && unit.overview.en.length > 72, `${unit.slug}: overview is too thin`);
  assert(unit.goals.length >= 3, `${unit.slug}: expected at least 3 goals`);
  assert(unit.steps.length >= 4, `${unit.slug}: expected at least 4 guided steps`);
  assert(unit.quiz.length >= 3, `${unit.slug}: expected at least 3 quiz questions`);
  if (glossary) {
    assert(glossary.length >= unit.keyTerms.length, `${unit.slug}: glossary is thinner than the key-term list`);
    assert(new Set(glossary.map((entry) => entry.id)).size === glossary.length, `${unit.slug}: glossary entry ids must be unique`);
    for (const term of unit.keyTerms) {
      assert(glossary.some((entry) => entry.term.en === term.en), `${unit.slug}: glossary is missing key term ${term.en}`);
    }
    for (const entry of glossary) {
      assert(entry.definition.ko.length > 35 && entry.definition.en.length > 55, `${unit.slug}/${entry.id}: glossary definition is too thin`);
      assert(entry.engineerView.ko.length > 35 && entry.engineerView.en.length > 55, `${unit.slug}/${entry.id}: engineering explanation is too thin`);
    }
  }
  if (guide) {
    assert(guide.purpose.ko.length > 45 && guide.purpose.en.length > 70, `${unit.slug}: detailed guide purpose is too thin`);
    assert(guide.sections.length >= 3, `${unit.slug}: expected at least 3 section-map entries`);
    assert(guide.takeaways.length >= 3, `${unit.slug}: expected at least 3 precise takeaways`);
    assert(guide.cautions.length >= 2, `${unit.slug}: expected at least 2 common-confusion notes`);
    for (const [index, section] of guide.sections.entries()) {
      assert(section.detail.ko.length > 45 && section.detail.en.length > 70, `${unit.slug} section ${index + 1}: detailed contents are too thin`);
    }
  }
  for (const [index, step] of unit.steps.entries()) {
    assert(step.summary.ko.length > 20 && step.summary.en.length > 25, `${unit.slug} step ${index + 1}: thin summary`);
    assert(step.detail.ko.length > 70 && step.detail.en.length > 70, `${unit.slug} step ${index + 1}: thin explanation`);
    assert(step.checkpoint.ko.length > 15 && step.checkpoint.en.length > 15, `${unit.slug} step ${index + 1}: missing checkpoint`);
  }
  for (const [index, quiz] of unit.quiz.entries()) {
    assert(quiz.options.length >= 3, `${unit.slug} quiz ${index + 1}: fewer than 3 options`);
    assert(quiz.correct >= 0 && quiz.correct < quiz.options.length, `${unit.slug} quiz ${index + 1}: invalid answer index`);
    assert(quiz.explanation.ko.length > 15 && quiz.explanation.en.length > 15, `${unit.slug} quiz ${index + 1}: thin explanation`);
  }
}

for (const foundation of ["predicate logic", "syntax", "semantics", "assertion", "constructor"]) {
  assert(chapterGlossaries["predicate-logic"]?.some((entry) => entry.term.en === foundation), `predicate-logic glossary must explain ${foundation}`);
}

const wikiRoot = join(root, "wiki");
const chapterFiles = (await readdir(join(wikiRoot, "chapters"))).filter((file) => file.endsWith(".md"));
assert(chapterFiles.length === 20, `expected 20 chapter wiki pages, found ${chapterFiles.length}`);

const wikiFiles: string[] = [];
for (const folder of ["", "chapters", "sources"]) {
  const folderPath = join(wikiRoot, folder);
  for (const file of await readdir(folderPath)) {
    if (file.endsWith(".md")) wikiFiles.push(join(folderPath, file));
  }
}

const knownNotes = new Set(wikiFiles.map((file) => basename(file, ".md")));
for (const file of wikiFiles) {
  const body = await readFile(file, "utf8");
  for (const match of body.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) {
    const target = basename(match[1]);
    assert(knownNotes.has(target), `${file.replace(`${root}/`, "")}: broken wikilink [[${match[1]}]]`);
  }
}

const terminologyFiles = [
  join(root, "README.md"),
  join(root, ".raw/README.md"),
  join(root, "scripts/build-wiki.ts"),
  ...await collectFiles(join(root, "content")),
  ...await collectFiles(join(root, "app")),
  ...await collectFiles(join(root, "wiki")),
];
const forbiddenTranslations = [
  { translated: "구문", preferred: "syntax" },
  { translated: "의미론", preferred: "semantics" },
  { translated: "단언", preferred: "assertion" },
  { translated: "생성자", preferred: "constructor" },
];
for (const file of terminologyFiles) {
  const body = await readFile(file, "utf8");
  for (const { translated, preferred } of forbiddenTranslations) {
    assert(!body.includes(translated), `${relative(root, file)}: use ${preferred} instead of the translated technical term`);
  }
}

const manifest = JSON.parse(await readFile(join(root, ".raw/.manifest.json"), "utf8"));
const source = manifest.sources[".raw/private/reynolds-theories-of-programming-languages-2009.pdf"];
assert(source?.pages === 513, "manifest must record the 513-page source");
assert(source?.pages_created?.length === 21, "manifest must record source page plus 20 study pages");

if (errors.length) {
  console.error(`Content lint failed with ${errors.length} finding(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const quizCount = units.reduce((total, unit) => total + unit.quiz.length, 0);
  const sectionCount = Object.values(chapterGuides).reduce((total, guide) => total + guide.sections.length, 0);
  const glossaryCount = Object.values(chapterGlossaries).reduce((total, glossary) => total + glossary.length, 0);
  console.log(`Content lint passed: ${units.length} units, ${sectionCount} detailed section briefs, ${glossaryCount} glossary entries, ${chapterFiles.length} wiki pages, ${quizCount} quizzes, 0 broken wikilinks.`);
}
