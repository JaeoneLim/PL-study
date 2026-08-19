import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { bookOverview } from "../content/book-overview";
import { chapterGuides } from "../content/chapter-guides";
import { chapterGlossaries } from "../content/chapter-glossaries";
import { chapterLongforms } from "../content/chapter-longforms";
import { parts, units } from "../content/course";
import type { LessonBlock } from "../content/longform-types";
import type { Locale } from "../content/types";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-08-03";
const sourcePath = ".raw/private/reynolds-theories-of-programming-languages-2009.pdf";
const chapterTwoSlug = "simple-imperative-language";
const englishHeadingSlugs = new Set(["predicate-logic", chapterTwoSlug]);

const filenames: Record<string, string> = {
  "predicate-logic": "chapter-01-predicate-logic",
  "simple-imperative-language": "chapter-02-simple-imperative-language",
  "program-specifications": "chapter-03-program-specifications",
  arrays: "chapter-04-arrays",
  "failure-io-continuations": "chapter-05-failure-io-continuations",
  "transition-semantics": "chapter-06-transition-semantics",
  nondeterminism: "chapter-07-nondeterminism",
  "shared-variable-concurrency": "chapter-08-shared-variable-concurrency",
  "communicating-sequential-processes": "chapter-09-csp",
  "lambda-calculus": "chapter-10-lambda-calculus",
  "eager-functional-language": "chapter-11-eager-functional-language",
  "functional-continuations": "chapter-12-functional-continuations",
  "iswim-like-languages": "chapter-13-iswim-like-languages",
  "normal-order-language": "chapter-14-normal-order-language",
  "simple-type-system": "chapter-15-simple-type-system",
  "subtypes-intersection-types": "chapter-16-subtypes-intersection-types",
  polymorphism: "chapter-17-polymorphism",
  "module-specification": "chapter-18-module-specification",
  "algol-like-languages": "chapter-19-algol-like-languages",
  "mathematical-background": "appendix-mathematical-background",
};

async function write(relative: string, body: string) {
  const target = join(root, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${body.trim()}\n`, "utf8");
}

function asCallout(type: string, title: string, body: string) {
  return `> [!${type}] ${title}\n${body.split("\n").map((line) => line ? `> ${line}` : ">").join("\n")}`;
}

function longformBlockMarkdown(block: LessonBlock, locale: Locale, headingLocale: Locale = locale) {
  if (block.kind === "subsection") {
    return `### ${block.title[headingLocale]} — ${block.covers}\n\n*${block.lead[locale]}*`;
  }

  if (block.kind === "prose") {
    return block.paragraphs.map((paragraph) => paragraph[locale]).join("\n\n");
  }

  if (block.kind === "list") {
    const heading = block.title ? `### ${block.title[headingLocale]}\n\n` : "";
    return `${heading}${block.items.map((item) => `- ${item[locale]}`).join("\n")}`;
  }

  if (block.kind === "notation") {
    return `### ${block.title[headingLocale]}\n\n\`\`\`text\n${block.notation}\n\`\`\`\n\n${block.explanation[locale]}`;
  }

  if (block.kind === "example") {
    const body = `${block.setup[locale]}\n\n${block.steps.map((step, index) => `${index + 1}. ${step[locale]}`).join("\n")}\n\n**${locale === "ko" ? "결론" : "Conclusion"}:** ${block.conclusion[locale]}`;
    return asCallout("example", block.title[headingLocale], body);
  }

  const type = block.tone === "warning" ? "warning" : block.tone === "proof" ? "abstract" : "tip";
  return asCallout(type, block.title[headingLocale], block.paragraphs.map((paragraph) => paragraph[locale]).join("\n\n"));
}

function longformMarkdown(slug: string) {
  const lesson = chapterLongforms[slug];
  if (!lesson) return "";
  const headingsInEnglish = englishHeadingSlugs.has(slug);
  const headingLocale: Locale = headingsInEnglish ? "en" : "ko";
  const heading = (ko: string, en: string) => headingsInEnglish ? en : ko;

  const sections = lesson.sections.map((lessonSection, index) => {
    const textbookSectionNumber = lessonSection.covers.match(/^§(\d+\.\d+)/)?.[1];
    const wikiSectionTitle = textbookSectionNumber
      ? lessonSection.title[headingLocale]
      : `${String(index + 1).padStart(2, "0")}. ${lessonSection.title[headingLocale]}`;
    const koreanBlocks = lessonSection.blocks.map((block) => longformBlockMarkdown(block, "ko", headingLocale)).join("\n\n");
    const englishBlocks = lessonSection.blocks.map((block) => longformBlockMarkdown(block, "en")).join("\n\n");
    const koreanChecks = lessonSection.checkpoints.map((checkpoint, checkIndex) => `${checkIndex + 1}. ${checkpoint.ko}`).join("\n");
    const englishChecks = lessonSection.checkpoints.map((checkpoint, checkIndex) => `${checkIndex + 1}. ${checkpoint.en}`).join("\n");

    return `## ${wikiSectionTitle} — ${lessonSection.covers} · ${lessonSection.minutes} ${heading("분", "min")}

> [!abstract] ${heading("이 절의 중심", "Section focus")}
> ${lessonSection.lead.ko}

${koreanBlocks}

${asCallout("question", heading("이 절을 덮고 확인하기", "Retrieval check"), koreanChecks)}

### English companion — ${lessonSection.title.en}

*${lessonSection.lead.en}*

${englishBlocks}

${asCallout("question", "Retrieval check", englishChecks)}`;
  }).join("\n\n---\n\n");

  return `# ${lesson.title[headingLocale]} (${lesson.readingMinutes} ${heading("분 읽기", "MIN READ")})

${lesson.introduction.map((paragraph) => paragraph.ko).join("\n\n")}

> [!info] English introduction
${lesson.introduction.map((paragraph) => `> ${paragraph.en}`).join("\n>\n")}

${sections}`;
}

function chapterNote(unit: (typeof units)[number]) {
  const guide = chapterGuides[unit.slug];
  const glossary = chapterGlossaries[unit.slug];
  const headingsInEnglish = englishHeadingSlugs.has(unit.slug);
  const headingLocale: Locale = headingsInEnglish ? "en" : "ko";
  const heading = (ko: string, en: string) => headingsInEnglish ? en : ko;
  const chapterTitle = headingsInEnglish || unit.title.ko === unit.title.en
    ? unit.title.en
    : `${unit.title.ko} (${unit.title.en})`;
  const related = units
    .filter((candidate) => candidate.part === unit.part && candidate.slug !== unit.slug)
    .slice(0, 3)
    .map((candidate) => `  - "[[${filenames[candidate.slug]}]]"`)
    .join("\n");
  const goals = unit.goals.map((goal) => `- ${goal.ko}\n  - EN: ${goal.en}`).join("\n");
  const terms = unit.keyTerms.map((term) => headingsInEnglish || term.ko === term.en
    ? `- **${term.en}**`
    : `- **${term.ko} (${term.en})**`).join("\n");
  const glossaryEntries = glossary.map((entry) => {
    const alternate = headingsInEnglish
      ? entry.term.en
      : entry.term.ko === entry.term.en ? entry.term.ko : `${entry.term.ko} (${entry.term.en})`;
    const notation = entry.notation ? `\n\n\`\`\`text\n${entry.notation}\n\`\`\`` : "";
    return `### ${alternate}\n\n${entry.definition.ko}\n\n> [!example] ${heading("엔지니어 관점", "Engineering view")}\n> ${entry.engineerView.ko}\n\n**English definition:** ${entry.definition.en}\n\n> [!example] Engineering view\n> ${entry.engineerView.en}${notation}`;
  }).join("\n\n");
  const detailedContents = guide.sections.map((item) => `### ${item.covers} · ${item.title[headingLocale]}\n\n${item.detail.ko}\n\n**English — ${item.title.en}:** ${item.detail.en}`).join("\n\n");
  const takeaways = guide.takeaways.map((item) => `- ${item.ko}\n  - EN: ${item.en}`).join("\n");
  const cautions = guide.cautions.map((item) => `- ${item.ko}\n  - EN: ${item.en}`).join("\n");
  const termPrimer = guide.termPrimer
    ? `## ${guide.termPrimer.title[headingLocale]}\n\n> [!tip] ${heading("처음 읽는 용어 연결 지도", "First-pass terminology map")}\n> ${guide.termPrimer.lead.ko}\n>\n> **English:** ${guide.termPrimer.lead.en}\n\n${guide.termPrimer.connections.map((item) => `### \`${item.path}\`\n\n${item.explanation.ko}\n\n**English:** ${item.explanation.en}`).join("\n\n")}`
    : "";
  const completeLesson = longformMarkdown(unit.slug);
  const steps = unit.steps.map((step) => `## ${step.title[headingLocale]} — ${step.covers}\n\n${step.summary.ko}\n\n${step.detail.ko}\n\n> [!question] ${heading("책을 덮고 답해 보기", "Close the book and answer")}\n> ${step.checkpoint.ko}\n\n### English companion\n\n${step.summary.en}\n\n${step.detail.en}`).join("\n\n---\n\n");
  const quiz = unit.quiz.map((question, index) => {
    const options = question.options.map((option, optionIndex) => `- ${String.fromCharCode(65 + optionIndex)}. ${option.ko} / ${option.en}`).join("\n");
    const companionQuestion = headingsInEnglish ? question.question.ko : question.question.en;
    return `### Q${index + 1}. ${question.question[headingLocale]}\n\n${companionQuestion}\n\n${options}\n\n> [!success]- ${heading("정답과 해설", "Answer and explanation")}\n> **${String.fromCharCode(65 + question.correct)}.** ${question.explanation.ko}\n>\n> EN: ${question.explanation.en}`;
  }).join("\n\n");

  return `---
type: chapter
title: "${unit.number}. ${unit.title[headingLocale]}"
title_en: "${unit.title.en}"
created: ${date}
updated: ${date}
status: evergreen
volatile: low
pages: "${unit.pages}"
source: "${sourcePath}"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
${related || "  - \"[[reynolds-theories-of-programming-languages]]\""}
---

# ${unit.number}. ${chapterTitle}

> [!abstract] ${heading("한눈에 보기", "At a glance")}
> ${unit.overview.ko}
>
> **English:** ${unit.overview.en}

## ${heading("학습 목표", "Learning objectives")}

${goals}

## ${heading("핵심 용어", "Key terms")}

${terms}

## ${heading("장별 용어 해설", "Chapter glossary")}

> [!info] ${heading("비유 사용법", "How to use analogies")}
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

${glossaryEntries}

## ${heading("장 전체 내용 지도", "Detailed chapter map")}

> [!abstract] ${heading("이 장의 역할", "This chapter's role")}
> ${guide.purpose.ko}
>
> **English:** ${guide.purpose.en}

${termPrimer ? `${termPrimer}\n\n` : ""}${detailedContents}

## ${heading("반드시 남겨야 할 핵심", "What to retain")}

${takeaways}

> [!warning] ${heading("자주 생기는 혼동", "Common confusions")}
${cautions.split("\n").map((line) => `> ${line}`).join("\n")}

${completeLesson ? `${completeLesson}\n\n# ${heading("압축 복습", "Condensed review")}\n\n` : ""}${steps}

## ${heading("자체 점검 퀴즈", "Self-check quiz")}

${quiz}

## ${heading("다음 개념으로", "Next concept")}

${unit.bridge.ko}

**English:** ${unit.bridge.en}

## ${heading("출처 경계", "Source boundary")}

- Source: \`${sourcePath}\`, pp. ${unit.pages}.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
`;
}

await write("wiki/sources/reynolds-theories-of-programming-languages.md", `---
type: source
title: "Theories of Programming Languages"
author: "John C. Reynolds"
created: ${date}
updated: ${date}
published: 1998
edition: "Digitally printed 2009"
status: ingested
volatile: low
source: "${sourcePath}"
tags:
  - book
  - programming-languages
  - semantics
---

# Theories of Programming Languages — source map

> [!abstract] Source summary
> Reynolds presents programming-language theory as a unified toolkit rather than a catalog of surface syntax. The recurring tools are compositional semantics, binding structure, domains and fixed points, transition systems, and inference rules.

## 저자의 문제 설정

기존 자료가 semantics·검증의 한 접근만 깊게 다루거나 언어의 피상적 차이를 나열하는 경향을 보인다는 문제에서 출발한다. 이 책은 기본 원리를 일관된 용어와 표기로 연결하는 폭넓은 대학원 수준의 입문을 목표로 한다.

## 논지의 흐름

1. Predicate Logic에서 abstract syntax, semantic function, inference rule, binding을 분리한다.
2. 작은 명령형 언어를 상태 변환, 도메인, 고정점, 프로그램 논리로 확장한다.
3. 실패·입출력·비결정성·동시성을 계속, 재개, 전이, 흔적으로 설명한다.
4. 람다 계산에서 적극/정상 순서 함수형 언어와 평가 기계를 유도한다.
5. 단순 타입에서 서브타이핑, 교차 타입, 다형성, 실존 모듈로 추상화를 확장한다.
6. Algol식 구절 타입과 블록 구조에서 함수형·명령형 관점을 다시 결합한다.

## 이 학습 저장소의 판단

- 강점: 동일한 작은 언어를 여러 semantics로 반복 해석해 관점 간 대응을 드러낸다.
- 주의: 표기와 일부 언어 예시는 역사적이며, 현대 도구의 표준 표기와 다를 수 있다.
- 범위 밖: Hindley–Milner 알고리즘, 논리적 관계와 parametricity, propositions-as-types, temporal logic, π-calculus, logic programming, linear logic 등은 후속 학습 주제다.

## 파트 지도

- [[chapter-01-predicate-logic|01 Predicate Logic]] → [[chapter-05-failure-io-continuations|05 계속과 I/O]]
- [[chapter-06-transition-semantics|06 transition semantics]] → [[chapter-09-csp|09 CSP]]
- [[chapter-10-lambda-calculus|10 람다 계산]] → [[chapter-14-normal-order-language|14 정상 순서]]
- [[chapter-15-simple-type-system|15 단순 타입]] → [[chapter-19-algol-like-languages|19 Algol]]
- [[appendix-mathematical-background|수학 부록]]

## 저작권과 출처 경계

PDF와 전체 텍스트 추출물은 Git에서 제외된 로컬 경로에만 둔다. 공개 저장소에는 독립 요약, 설명, 학습 구조, 자체 제작 퀴즈만 포함한다.
`);

for (const unit of units) {
  await write(`wiki/chapters/${filenames[unit.slug]}.md`, chapterNote(unit));
}

const indexEntries = units.map((unit) => `- [[${filenames[unit.slug]}|${unit.number}. ${unit.title.ko}]] — ${unit.eyebrow.ko}`).join("\n");
await write("wiki/index.md", `# Wiki index

## Source

- [[reynolds-theories-of-programming-languages|Theories of Programming Languages]] — 513-page source map and ingestion boundary

## Chapter notes

${indexEntries}

## Meta

- [[overview|Course overview]]
- [[hot|Hot context]]
- [[glossary|Glossary]]
- [[log|Operation log]]
`);

const overviewArcs = bookOverview.arcs.map((arc) => `## ${arc.number}. ${arc.title.ko} (${arc.title.en}) — Ch. ${arc.chapters}\n\n**핵심 질문:** ${arc.question.ko}\n\n${arc.summary.ko}\n\n**English:** ${arc.summary.en}\n\n> [!success] 이 흐름을 마치면\n> ${arc.outcome.ko}\n>\n> EN: ${arc.outcome.en}`).join("\n\n---\n\n");
const overviewSpine = bookOverview.semanticSpine.map((stage) => `${stage.number}. **${stage.title.ko} (${stage.title.en})**\n   - ${stage.detail.ko}\n   - EN: ${stage.detail.en}`).join("\n");
const overviewLenses = bookOverview.recurringLenses.map((lens) => `- **${lens.title.ko} (${lens.title.en})** — ${lens.detail.ko}\n  - EN: ${lens.detail.en}`).join("\n");
const overviewMethod = bookOverview.studyMethod.map((step, index) => `${index + 1}. ${step.ko}\n   - EN: ${step.en}`).join("\n");
const overviewItinerary = parts.map((part) => `### ${part.number}부 · ${part.ko} (${part.en})\n\n${units.filter((unit) => unit.part === part.number).map((unit) => `- [[${filenames[unit.slug]}|${unit.number}. ${unit.title.ko}]] — ${unit.eyebrow.ko}`).join("\n")}`).join("\n\n");

await write("wiki/overview.md", `---
type: overview
title: "Theories of Programming Languages — Course Overview"
created: ${date}
updated: ${date}
status: evergreen
source: "[[reynolds-theories-of-programming-languages]]"
tags:
  - programming-languages
  - semantics
  - study-map
---

# 책 전체 개요 (Whole-book overview)

> [!abstract] 이 책은 무엇을 하려는가
> ${bookOverview.lead.ko}
>
> **English:** ${bookOverview.lead.en}

## 책의 중심 논지

${bookOverview.thesis.ko}

**English:** ${bookOverview.thesis.en}

> [!question] 책 전체를 관통하는 질문
> ${bookOverview.drivingQuestion.ko}
>
> EN: ${bookOverview.drivingQuestion.en}

# 네 개의 개념 흐름

${overviewArcs}

# 반복되는 사고 순서

${overviewSpine}

# 장을 넘어 반복되는 관점

${overviewLenses}

# 전체 장별 여정

${overviewItinerary}

# 권장 학습 순서

${overviewMethod}

Every chapter page now contains a detailed section map, Korean-first explanation, English companion, precise takeaways, common-confusion notes, retrieval prompts, and original quizzes. The [[reynolds-theories-of-programming-languages|source page]] records the ingestion and copyright boundary.
`);

await write("wiki/hot.md", `# Hot context

- Current source: [[reynolds-theories-of-programming-languages]].
- Current deliverable: bilingual HTML course generated from structured TypeScript content.
- Coverage: Chapters 1–19 plus the mathematical appendix.
- Public boundary: no PDF or verbatim extraction in Git.
- Next maintenance action: verify any corrected theorem statement directly against the local PDF before editing a load-bearing claim.
`);

await write("wiki/log.md", `# Wiki log

## ${date} ingest | Theories of Programming Languages

- source: \`${sourcePath}\`
- created: source map, 19 chapter pages, mathematical appendix page
- updated: index, overview, hot cache, glossary
- derived: bilingual study website with 20 units and 60 original concept checks
- notes: copyrighted PDF and extracted text remain local and ignored by Git
`);

const glossaryIndex = units.map((unit) => {
  const headingsInEnglish = unit.slug === chapterTwoSlug;
  const entries = chapterGlossaries[unit.slug].map((entry) => {
    const alternate = headingsInEnglish
      ? entry.term.en
      : entry.term.ko === entry.term.en ? entry.term.ko : `${entry.term.ko} (${entry.term.en})`;
    return `### ${alternate}\n\n${entry.definition.ko}\n\n**English:** ${entry.definition.en}`;
  }).join("\n\n");
  const glossaryAnchor = headingsInEnglish ? "Chapter glossary" : "장별 용어 해설";
  return `## [[${filenames[unit.slug]}#${glossaryAnchor}|${unit.number}. ${unit.title.ko}]]\n\n${entries}`;
}).join("\n\n---\n\n");

await write("wiki/glossary.md", `# Glossary

> [!info] 용어 정책과 읽는 법
> 한국어 학습 노트에서도 syntax, semantics, statement, assertion, constructor, Predicate Logic, initial algebra와 그 표준 파생 표현은 영문으로 쓴다. 영문 term은 바로 이어지는 한국어 설명과 구현 예제로 뜻을 익힌다. 각 장의 링크를 열면 정확한 definition, English companion, 하드웨어 중심의 엔지니어 관점을 함께 볼 수 있다.

${glossaryIndex}
`);

console.log(`Generated ${units.length + 6} wiki files from ${units.length} study units.`);
