import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { bookOverview } from "../content/book-overview";
import { chapterGuides } from "../content/chapter-guides";
import { units } from "../content/course";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors: string[] = [];

function assert(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

assert(units.length === 20, `expected 20 units, found ${units.length}`);
assert(new Set(units.map((unit) => unit.slug)).size === units.length, "unit slugs must be unique");
assert(new Set(units.map((unit) => unit.number)).size === units.length, "unit numbers must be unique");
assert(Object.keys(chapterGuides).length === units.length, `expected ${units.length} detailed chapter guides, found ${Object.keys(chapterGuides).length}`);
assert(bookOverview.arcs.length === 4, `expected 4 whole-book arcs, found ${bookOverview.arcs.length}`);
assert(bookOverview.semanticSpine.length >= 5, "whole-book overview needs a complete semantic spine");
assert(bookOverview.recurringLenses.length >= 6, "whole-book overview needs recurring conceptual lenses");

for (const unit of units) {
  const guide = chapterGuides[unit.slug];
  assert(Boolean(guide), `${unit.slug}: missing detailed chapter guide`);
  assert(unit.title.ko.length > 0 && unit.title.en.length > 0, `${unit.slug}: missing bilingual title`);
  assert(unit.overview.ko.length > 38 && unit.overview.en.length > 72, `${unit.slug}: overview is too thin`);
  assert(unit.goals.length >= 3, `${unit.slug}: expected at least 3 goals`);
  assert(unit.steps.length >= 4, `${unit.slug}: expected at least 4 guided steps`);
  assert(unit.quiz.length >= 3, `${unit.slug}: expected at least 3 quiz questions`);
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
  console.log(`Content lint passed: ${units.length} units, ${sectionCount} detailed section briefs, ${chapterFiles.length} wiki pages, ${quizCount} quizzes, 0 broken wikilinks.`);
}
