import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { bookOverview } from "../content/book-overview";
import { chapterGuides } from "../content/chapter-guides";
import { chapterLongforms } from "../content/chapter-longforms";
import { parts, units } from "../content/course";
import type { LessonBlock } from "../content/longform-types";
import type { Locale } from "../content/types";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-08-03";
const sourcePath = ".raw/private/reynolds-theories-of-programming-languages-2009.pdf";

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

function longformBlockMarkdown(block: LessonBlock, locale: Locale) {
  if (block.kind === "prose") {
    return block.paragraphs.map((paragraph) => paragraph[locale]).join("\n\n");
  }

  if (block.kind === "list") {
    const heading = block.title ? `### ${block.title[locale]}\n\n` : "";
    return `${heading}${block.items.map((item) => `- ${item[locale]}`).join("\n")}`;
  }

  if (block.kind === "notation") {
    return `### ${block.title[locale]}\n\n\`\`\`text\n${block.notation}\n\`\`\`\n\n${block.explanation[locale]}`;
  }

  if (block.kind === "example") {
    const body = `${block.setup[locale]}\n\n${block.steps.map((step, index) => `${index + 1}. ${step[locale]}`).join("\n")}\n\n**${locale === "ko" ? "결론" : "Conclusion"}:** ${block.conclusion[locale]}`;
    return asCallout("example", block.title[locale], body);
  }

  const type = block.tone === "warning" ? "warning" : block.tone === "proof" ? "abstract" : "tip";
  return asCallout(type, block.title[locale], block.paragraphs.map((paragraph) => paragraph[locale]).join("\n\n"));
}

function longformMarkdown(slug: string) {
  const lesson = chapterLongforms[slug];
  if (!lesson) return "";

  const sections = lesson.sections.map((lessonSection, index) => {
    const koreanBlocks = lessonSection.blocks.map((block) => longformBlockMarkdown(block, "ko")).join("\n\n");
    const englishBlocks = lessonSection.blocks.map((block) => longformBlockMarkdown(block, "en")).join("\n\n");
    const koreanChecks = lessonSection.checkpoints.map((checkpoint, checkIndex) => `${checkIndex + 1}. ${checkpoint.ko}`).join("\n");
    const englishChecks = lessonSection.checkpoints.map((checkpoint, checkIndex) => `${checkIndex + 1}. ${checkpoint.en}`).join("\n");

    return `## ${String(index + 1).padStart(2, "0")}. ${lessonSection.title.ko} — ${lessonSection.covers} · ${lessonSection.minutes}분

> [!abstract] 이 절의 중심
> ${lessonSection.lead.ko}

${koreanBlocks}

${asCallout("question", "이 절을 덮고 확인하기", koreanChecks)}

### English companion — ${lessonSection.title.en}

*${lessonSection.lead.en}*

${englishBlocks}

${asCallout("question", "Retrieval check", englishChecks)}`;
  }).join("\n\n---\n\n");

  return `# ${lesson.title.ko} (${lesson.readingMinutes}분 읽기)

${lesson.introduction.map((paragraph) => paragraph.ko).join("\n\n")}

> [!info] English introduction
${lesson.introduction.map((paragraph) => `> ${paragraph.en}`).join("\n>\n")}

${sections}`;
}

function chapterNote(unit: (typeof units)[number]) {
  const guide = chapterGuides[unit.slug];
  const related = units
    .filter((candidate) => candidate.part === unit.part && candidate.slug !== unit.slug)
    .slice(0, 3)
    .map((candidate) => `  - "[[${filenames[candidate.slug]}]]"`)
    .join("\n");
  const goals = unit.goals.map((goal) => `- ${goal.ko}\n  - EN: ${goal.en}`).join("\n");
  const terms = unit.keyTerms.map((term) => `- **${term.ko} (${term.en})**`).join("\n");
  const detailedContents = guide.sections.map((item) => `### ${item.covers} · ${item.title.ko}\n\n${item.detail.ko}\n\n**English — ${item.title.en}:** ${item.detail.en}`).join("\n\n");
  const takeaways = guide.takeaways.map((item) => `- ${item.ko}\n  - EN: ${item.en}`).join("\n");
  const cautions = guide.cautions.map((item) => `- ${item.ko}\n  - EN: ${item.en}`).join("\n");
  const completeLesson = longformMarkdown(unit.slug);
  const steps = unit.steps.map((step) => `## ${step.title.ko} — ${step.covers}\n\n${step.summary.ko}\n\n${step.detail.ko}\n\n> [!question] 책을 덮고 답해 보기\n> ${step.checkpoint.ko}\n\n### English companion\n\n${step.summary.en}\n\n${step.detail.en}`).join("\n\n---\n\n");
  const quiz = unit.quiz.map((question, index) => {
    const options = question.options.map((option, optionIndex) => `- ${String.fromCharCode(65 + optionIndex)}. ${option.ko} / ${option.en}`).join("\n");
    return `### Q${index + 1}. ${question.question.ko}\n\n${question.question.en}\n\n${options}\n\n> [!success]- 정답과 해설\n> **${String.fromCharCode(65 + question.correct)}.** ${question.explanation.ko}\n>\n> EN: ${question.explanation.en}`;
  }).join("\n\n");

  return `---
type: chapter
title: "${unit.number}. ${unit.title.ko}"
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

# ${unit.number}. ${unit.title.ko} (${unit.title.en})

> [!abstract] 한눈에 보기
> ${unit.overview.ko}
>
> **English:** ${unit.overview.en}

## 학습 목표

${goals}

## 핵심 용어

${terms}

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> ${guide.purpose.ko}
>
> **English:** ${guide.purpose.en}

${detailedContents}

## 반드시 남겨야 할 핵심

${takeaways}

> [!warning] 자주 생기는 혼동
${cautions.split("\n").map((line) => `> ${line}`).join("\n")}

${completeLesson ? `${completeLesson}\n\n# 압축 복습\n\n` : ""}${steps}

## 자체 점검 퀴즈

${quiz}

## 다음 개념으로

${unit.bridge.ko}

**English:** ${unit.bridge.en}

## 출처 경계

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

기존 자료가 의미론·검증의 한 접근만 깊게 다루거나 언어의 피상적 차이를 나열하는 경향을 보인다는 문제에서 출발한다. 이 책은 기본 원리를 일관된 용어와 표기로 연결하는 폭넓은 대학원 수준의 입문을 목표로 한다.

## 논지의 흐름

1. 술어 논리에서 추상 구문, 의미 함수, 추론 규칙, 바인딩을 분리한다.
2. 작은 명령형 언어를 상태 변환, 도메인, 고정점, 프로그램 논리로 확장한다.
3. 실패·입출력·비결정성·동시성을 계속, 재개, 전이, 흔적으로 설명한다.
4. 람다 계산에서 적극/정상 순서 함수형 언어와 평가 기계를 유도한다.
5. 단순 타입에서 서브타이핑, 교차 타입, 다형성, 실존 모듈로 추상화를 확장한다.
6. Algol식 구절 타입과 블록 구조에서 함수형·명령형 관점을 다시 결합한다.

## 이 학습 저장소의 판단

- 강점: 동일한 작은 언어를 여러 의미론으로 반복 해석해 관점 간 대응을 드러낸다.
- 주의: 표기와 일부 언어 예시는 역사적이며, 현대 도구의 표준 표기와 다를 수 있다.
- 범위 밖: Hindley–Milner 알고리즘, 논리적 관계와 parametricity, propositions-as-types, temporal logic, π-calculus, logic programming, linear logic 등은 후속 학습 주제다.

## 파트 지도

- [[chapter-01-predicate-logic|01 술어 논리]] → [[chapter-05-failure-io-continuations|05 계속과 I/O]]
- [[chapter-06-transition-semantics|06 전이 의미론]] → [[chapter-09-csp|09 CSP]]
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

await write("wiki/glossary.md", `# Glossary

| 한국어 | English | 학습 메모 |
|---|---|---|
| 추상 구문 | abstract syntax | 표기와 독립된 구문 트리 |
| 표시적 의미론 | denotational semantics | 구문을 수학적 의미로 보내는 함수 |
| 합성성 | compositionality | 전체 의미가 부분 의미로 결정됨 |
| 바인딩 | binding | 이름과 범위를 연결하는 구조 |
| 캡처 회피 치환 | capture-avoiding substitution | 자유 변수의 의도치 않은 결박 방지 |
| 도메인 | domain | 계산 정보의 근사를 순서화한 공간 |
| 최소 고정점 | least fixed point | 재귀 방정식의 최소 해 |
| 부분 정확성 | partial correctness | 종료한 실행의 결과 정확성 |
| 전체 정확성 | total correctness | 종료와 결과 정확성 |
| 계속 | continuation | 현재 계산 뒤에 할 일 |
| 재개 | resumption | 상호작용하는 계산의 다음 단계 구조 |
| 전이 의미론 | transition semantics | 한 단계 실행 관계 기반 의미론 |
| 비결정성 | nondeterminism | 여러 허용 실행 중 선택이 미지정됨 |
| 공정성 | fairness | 계속 가능한 참여자가 영원히 배제되지 않는 스케줄 가정 |
| 클로저 | closure | 함수 코드와 정의 환경의 묶음 |
| 지연 평가 | lazy evaluation | 필요 시 평가하고 결과를 공유하는 전략 |
| 타입 판단 | typing judgment | 문맥 아래 항의 타입에 대한 유도 가능한 주장 |
| 서브타이핑 | subtyping | 기대 타입 자리에 안전하게 대체 가능한 관계 |
| 전칭 다형성 | universal polymorphism | 모든 타입에 대해 균일한 항 |
| 실존 타입 | existential type | 표현 타입을 숨기는 패키지 타입 |
| 구절 타입 | phrase type | expression, acceptor, command 같은 계산 사용 방식의 타입 |
`);

console.log(`Generated ${units.length + 6} wiki files from ${units.length} study units.`);
