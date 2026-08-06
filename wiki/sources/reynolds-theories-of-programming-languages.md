---
type: source
title: "Theories of Programming Languages"
author: "John C. Reynolds"
created: 2026-08-03
updated: 2026-08-03
published: 1998
edition: "Digitally printed 2009"
status: ingested
volatile: low
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
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

1. 술어 논리에서 abstract syntax, 의미 함수, 추론 규칙, 바인딩을 분리한다.
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

- [[chapter-01-predicate-logic|01 술어 논리]] → [[chapter-05-failure-io-continuations|05 계속과 I/O]]
- [[chapter-06-transition-semantics|06 transition semantics]] → [[chapter-09-csp|09 CSP]]
- [[chapter-10-lambda-calculus|10 람다 계산]] → [[chapter-14-normal-order-language|14 정상 순서]]
- [[chapter-15-simple-type-system|15 단순 타입]] → [[chapter-19-algol-like-languages|19 Algol]]
- [[appendix-mathematical-background|수학 부록]]

## 저작권과 출처 경계

PDF와 전체 텍스트 추출물은 Git에서 제외된 로컬 경로에만 둔다. 공개 저장소에는 독립 요약, 설명, 학습 구조, 자체 제작 퀴즈만 포함한다.
