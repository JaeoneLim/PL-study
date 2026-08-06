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

test("renders Chapter 1 as a complete longform lesson", async () => {
  const response = await render("/ko/chapter/predicate-logic");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /1장 완전 학습 본문/);
  assert.match(html, /60.*분 읽기/s);
  assert.match(html, /운반집합·생성자·초기 대수/);
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
