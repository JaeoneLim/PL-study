import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${encodeURIComponent(pathname)}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const chapterSlugs = [
  "predicate-logic",
  "simple-imperative-language",
  "program-specifications",
  "arrays",
  "failure-io-continuations",
  "transition-semantics",
  "nondeterminism",
  "shared-variable-concurrency",
  "communicating-sequential-processes",
  "lambda-calculus",
  "eager-functional-language",
  "functional-continuations",
  "iswim-like-languages",
  "normal-order-language",
  "simple-type-system",
  "subtypes-intersection-types",
  "polymorphism",
  "module-specification",
  "algol-like-languages",
  "mathematical-background",
];

test("renders the bilingual language gateway", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Theories of PL/);
  assert.match(html, /한국어로 공부하기/);
  assert.match(html, /Study in English/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders the Korean course map with every unit", async () => {
  const response = await render("/ko");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /과정 지도/);
  assert.match(html, /술어 논리/);
  assert.match(html, /Algol 계열 언어/);
  assert.match(html, /수학적 배경/);
  assert.match(html, /책 전체 개요부터/);
  assert.match(html, /60 min\+/);
  assert.match(html, /요약본/);
});

test("renders a whole-book overview in both languages", async () => {
  const [koResponse, enResponse] = await Promise.all([render("/ko/overview"), render("/en/overview")]);
  assert.equal(koResponse.status, 200);
  assert.equal(enResponse.status, 200);
  const [ko, en] = await Promise.all([koResponse.text(), enResponse.text()]);
  assert.match(ko, /한 권의 논증으로 읽는 프로그래밍 언어 이론/);
  assert.match(ko, /책 전체를 관통하는 질문/);
  assert.match(ko, /각 장이 전체 논증에서 맡는 자리/);
  assert.match(en, /Programming language theory as one connected argument/);
  assert.match(en, /Four connected arcs/i);
  assert.match(en, /Complete chapter itinerary/i);
});

test("renders an English chapter lesson and quiz", async () => {
  const response = await render("/en/chapter/lambda-calculus");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /The Lambda Calculus/);
  assert.match(html, /Step 1 — A minimal language with binding/);
  assert.match(html, /Concept check/);
  assert.match(html, /beta-reduction/i);
  assert.match(html, /What this chapter actually covers/);
  assert.match(html, /Normal-order evaluation/);
  assert.match(html, /COMMON CONFUSIONS/);
});

test("renders engineer-friendly chapter glossaries in both languages", async () => {
  const [koResponse, enResponse] = await Promise.all([
    render("/ko/chapter/predicate-logic/glossary"),
    render("/en/chapter/predicate-logic/glossary"),
  ]);
  assert.equal(koResponse.status, 200);
  assert.equal(enResponse.status, 200);
  const [ko, en] = await Promise.all([koResponse.text(), enResponse.text()]);
  assert.match(ko, /술어 논리 용어집/);
  assert.match(ko, /엔지니어 관점/);
  assert.match(ko, /하드웨어 예시는 첫 mental model/);
  assert.match(ko, /semantics/);
  assert.match(en, /Predicate Logic glossary/);
  assert.match(en, /ENGINEERING VIEW/);
  assert.match(en, /simulator uses to turn RTL into signal values/);
  assert.match(en, /capture-avoiding substitution/);
});

test("links every Korean and English chapter lesson to its glossary", async () => {
  for (const locale of ["ko", "en"]) {
    for (const slug of chapterSlugs) {
      const response = await render(`/${locale}/chapter/${slug}`);
      assert.equal(response.status, 200, `${locale}/${slug} should render`);
      const html = await response.text();
      assert.match(
        html,
        new RegExp(`href="/${locale}/chapter/${slug}/glossary"`),
        `${locale}/${slug} should link to its glossary`,
      );
    }
  }
});

test("renders Chapter 1 as a complete longform lesson", async () => {
  const response = await render("/ko/chapter/predicate-logic");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /1장 완전 학습 본문/);
  assert.match(html, /60.*분 읽기/s);
  assert.match(html, /운반집합·constructor·초기 대수/);
  assert.match(html, /syntax, semantics, statement, assertion, constructor/);
  assert.match(html, /일치 정리\(Coincidence Theorem\)/);
  assert.match(html, /치환 정리\(Substitution Theorem\)/);
  assert.match(html, /정의에서 손으로 계산하고 증명하기/);
  assert.match(html, /압축 복습/);
});

test("keeps copyrighted source material out of the tracked surface", async () => {
  const [gitignore, rawReadme] = await Promise.all([
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../.raw/README.md", import.meta.url), "utf8"),
  ]);
  assert.match(gitignore, /\/\.raw\/private\//);
  assert.match(gitignore, /\*\.pdf/);
  assert.match(rawReadme, /not the book text/i);
});
