---
type: chapter
title: "A. 수학적 배경"
title_en: "Mathematical Background"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "447–466"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-01-predicate-logic]]"
  - "[[chapter-02-simple-imperative-language]]"
  - "[[chapter-03-program-specifications]]"
---

# A. 수학적 배경 (Mathematical Background)

> [!abstract] 한눈에 보기
> 책의 의미론과 증명에서 쓰는 집합론 표기, 관계, 함수, 곱, 분리합, 폐쇄 연산을 한곳에 정리한다.
>
> **English:** The appendix consolidates the set-theoretic notation, relations, functions, products, disjoint unions, and closure operations used in the semantics and proofs.

## 학습 목표

- 집합 연산과 함수 공간 표기를 정확히 읽는다.
  - EN: Read set operations and function-space notation accurately.
- 관계의 합성·역·폐쇄를 계산한다.
  - EN: Compute relational composition, converse, and closure.
- 곱과 분리합을 의미 도메인 구성에 적용한다.
  - EN: Apply products and disjoint unions to semantic domains.

## 핵심 용어

- **멱집합 (powerset)**
- **관계 합성 (relational composition)**
- **부분 함수 (partial function)**
- **데카르트 곱 (Cartesian product)**
- **분리합 (disjoint union)**
- **반사·추이 폐쇄 (reflexive-transitive closure)**

## 1단계 — 집합 표기 안정시키기 — §A.1

원소, 부분집합, 합집합, 교집합, 차집합, 멱집합을 이후 의미 도메인의 기본 문법으로 사용한다.

타입이나 구문 범주를 집합으로, 의미를 그 집합 사이의 함수로 읽는다. 포함 순서가 정보 순서로 재사용될 수 있으므로 원소 관계와 부분집합 관계를 혼동하지 않는다.

> [!question] 책을 덮고 답해 보기
> `x∈P(S)`와 `x⊆S`가 동치인 이유를 설명하라.

### English companion

Membership, subset, union, intersection, difference, and powerset form the basic notation of later semantic domains.

Types and syntax categories are treated as sets, with meanings as functions between them. Since inclusion can become an information order, do not confuse membership with subset.

---

## 2단계 — 관계와 실행 경로 — §A.2, A.6

이항 관계는 비결정적 한 단계 이동을 표현하고 합성·폐쇄는 여러 단계 실행을 만든다.

역관계는 화살표 방향을 바꾸고, 반사·추이 폐쇄 R*는 0회 이상의 R 단계를, 추이 폐쇄 R+는 1회 이상을 나타낸다. 전이 의미론 표기의 수학적 기반이다.

> [!question] 책을 덮고 답해 보기
> R*가 항상 항등 관계를 포함하는 이유는?

### English companion

A binary relation represents nondeterministic one-step movement; composition and closure build multi-step execution.

Converse reverses arrows; reflexive-transitive closure R* means zero or more R steps, and transitive closure R+ means one or more. This underlies transition-semantics notation.

---

## 3단계 — 함수도 특별한 관계로 보기 — §A.3–A.4

함수는 각 입력에 정확히 하나의 출력을 대응시키는 관계이며 부분 함수는 일부 입력에서만 정의된다.

함수 합성의 순서, 제한, 갱신 표기는 상태와 환경 의미론에서 반복된다. 고차 함수 공간은 함수 자체를 원소로 다루며 도메인 이론과 람다 의미의 기반이 된다.

> [!question] 책을 덮고 답해 보기
> 상태 갱신 `σ[x↦v]`가 원래 σ와 어디에서 다른지 정의하라.

### English companion

A function is a relation assigning exactly one output to each input; a partial function is defined only on some inputs.

Composition order, restriction, and update recur in state and environment semantics. Higher-order function spaces treat functions as elements, supporting domain theory and lambda semantics.

---

## 4단계 — 함께 있음과 선택을 구분 — §A.5

곱 S×T는 S와 T 값을 함께 담고, 분리합 S+T는 어느 쪽 값인지 태그와 함께 담는다.

상태-명령 구성에는 곱이, 정상 결과 또는 실패 같은 대안에는 분리합이 적합하다. 태그가 없으면 두 집합에 같은 원소가 있을 때 어느 경우인지 잃는다.

> [!question] 책을 덮고 답해 보기
> `State + (abort×State)`에서 분리합 태그가 필요한 이유는?

### English companion

Product S×T contains both an S and a T; disjoint union S+T contains a tagged value from one side.

Products suit command-state configurations; disjoint unions suit alternatives such as normal result or failure. Tags preserve the source side when the component sets overlap.

## 자체 점검 퀴즈

### Q1. R*가 의미하는 것은?

What does R* mean?

- A. R의 0회 이상 반복 / Zero or more R steps
- B. R의 역만 / Only the converse of R
- C. R의 원소 수 / The cardinality of R

> [!success]- 정답과 해설
> **A.** 반사·추이 폐쇄는 길이 0인 경로도 포함한다.
>
> EN: Reflexive-transitive closure includes paths of length zero.

### Q2. 곱과 분리합의 차이는?

How do product and disjoint union differ?

- A. 곱은 둘 다, 분리합은 태그된 한쪽 / Product contains both; disjoint union a tagged one side
- B. 둘은 같은 집합 / They are identical
- C. 곱만 함수를 포함 / Only products may contain functions

> [!success]- 정답과 해설
> **A.** 동시 구성과 대안 선택을 구분하는 기본 생성자다.
>
> EN: They are basic constructors for combination versus alternatives.

### Q3. 부분 함수가 전체 함수와 다른 점은?

How does a partial function differ from a total function?

- A. 일부 입력에서 결과가 정의되지 않을 수 있음 / It may be undefined on some inputs
- B. 출력이 두 개씩 있음 / It has two outputs per input
- C. 합성할 수 없음 / It cannot be composed

> [!success]- 정답과 해설
> **A.** 비종료나 오류를 부분성으로 모델링할 수 있다.
>
> EN: Partiality can model nontermination or errors.

## 다음 개념으로

이 부록은 필요할 때 되돌아오는 참조 페이지다. 준비가 되면 1장부터 네 가지 언어 설명 도구를 다시 연결해 보라.

**English:** Treat this appendix as a page to revisit on demand. When ready, return to Chapter 1 and reconnect the four tools for describing languages.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 447–466.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
