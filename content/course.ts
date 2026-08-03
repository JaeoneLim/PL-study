import { units01to05 } from "./units-01-05";
import { units06to10 } from "./units-06-10";
import { units11to15 } from "./units-11-15";
import { units16toAppendix } from "./units-16-appendix";
import type { Locale, StudyUnit } from "./types";

export type { Bilingual, Locale, QuizQuestion, StudyStep, StudyUnit } from "./types";

export const units: StudyUnit[] = [
  ...units01to05,
  ...units06to10,
  ...units11to15,
  ...units16toAppendix,
];

export const parts = [
  { number: 1, ko: "기초 · 명령형 의미론", en: "Foundations · Imperative Semantics", range: "01–05 + A" },
  { number: 2, ko: "연산 · 비결정성 · 동시성", en: "Operational · Nondeterminism · Concurrency", range: "06–09" },
  { number: 3, ko: "함수형 언어와 제어", en: "Functional Languages · Control", range: "10–14" },
  { number: 4, ko: "타입 · 추상화 · Algol", en: "Types · Abstraction · Algol", range: "15–19" },
] as const;

export function isLocale(value: string): value is Locale {
  return value === "ko" || value === "en";
}

export function getUnit(slug: string): StudyUnit | undefined {
  return units.find((unit) => unit.slug === slug);
}

export function getUnitNeighbors(slug: string) {
  const index = units.findIndex((unit) => unit.slug === slug);
  return {
    previous: index > 0 ? units[index - 1] : undefined,
    next: index >= 0 && index < units.length - 1 ? units[index + 1] : undefined,
  };
}
