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
  assert.match(html, /Semantic Atlas/);
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
});

test("renders an English chapter lesson and quiz", async () => {
  const response = await render("/en/chapter/lambda-calculus");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /The Lambda Calculus/);
  assert.match(html, /Step 1 — A minimal language with binding/);
  assert.match(html, /Concept check/);
  assert.match(html, /beta-reduction/i);
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
