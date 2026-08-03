import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { units } from "../content/course";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors: string[] = [];

function assert(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

assert(units.length === 20, `expected 20 units, found ${units.length}`);
assert(new Set(units.map((unit) => unit.slug)).size === units.length, "unit slugs must be unique");
assert(new Set(units.map((unit) => unit.number)).size === units.length, "unit numbers must be unique");

for (const unit of units) {
  assert(unit.title.ko.length > 0 && unit.title.en.length > 0, `${unit.slug}: missing bilingual title`);
  assert(unit.overview.ko.length > 38 && unit.overview.en.length > 72, `${unit.slug}: overview is too thin`);
  assert(unit.goals.length >= 3, `${unit.slug}: expected at least 3 goals`);
  assert(unit.steps.length >= 4, `${unit.slug}: expected at least 4 guided steps`);
  assert(unit.quiz.length >= 3, `${unit.slug}: expected at least 3 quiz questions`);
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
  console.log(`Content lint passed: ${units.length} units, ${chapterFiles.length} wiki pages, ${quizCount} quizzes, 0 broken wikilinks.`);
}
