---
type: chapter
title: "14. 정상 순서 언어"
title_en: "A Normal-Order Language"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "298–314"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-10-lambda-calculus]]"
  - "[[chapter-11-eager-functional-language]]"
  - "[[chapter-12-functional-continuations]]"
---

# 14. 정상 순서 언어 (A Normal-Order Language)

> [!abstract] 한눈에 보기
> 정상 순서 함수형 언어의 평가 규칙과 직접 의미를 정의하고, 축약과의 관계 및 lazy evaluation의 공유 구현을 설명한다.
>
> **English:** A normal-order functional language is defined by evaluation rules and direct semantics, related to reduction, and implemented with sharing through lazy evaluation.

## 학습 목표

- call-by-name 평가 규칙을 적극 평가와 비교한다.
  - EN: Compare call-by-name rules with eager evaluation.
- 무한 리스트가 유한 관찰을 제공하는 방식을 설명한다.
  - EN: Explain how infinite lists support finite observations.
- thunk의 지연·강제·메모화를 추적한다.
  - EN: Trace thunk delay, forcing, and memoization.

## 핵심 용어

- **이름에 의한 호출 (call-by-name)**
- **지연 평가 (lazy evaluation)**
- **썽크 (thunk)**
- **강제 (forcing)**
- **메모화 (memoization)**
- **무한 리스트 (infinite list)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 인수를 먼저 계산하지 않는 정상 순서 언어를 정의하고, 이름 호출과 필요 호출의 의미·비용·공유 차이를 분석한다.
>
> **English:** Defines a normal-order language and analyzes the meaning, cost, and sharing differences among call-by-name and call-by-need.

### §14.1 · 정상 순서 평가 판단

함수 적용은 평가되지 않은 인수 식과 그 환경을 본문에 전달한다. 인수가 실제로 필요할 때마다 해당 환경에서 평가된다.

**English — Normal-order evaluation judgments:** Function application passes an unevaluated argument expression with its environment into the body. The argument is evaluated in that environment whenever demanded.

### §14.2–14.3 · derived syntax과 무한 구조 예제

조건, 목록, 재귀를 정상 순서 핵심으로 표현하면 사용하지 않는 분기를 피하고 잠재적으로 무한한 목록의 유한 접두사를 소비할 수 있다.

**English — Derived forms and infinite structures:** Encoding conditionals, lists, and recursion in the normal-order core avoids unused branches and permits finite consumption of potentially infinite lists.

### §14.4 · 직접 표시적 의미

식 의미가 필요한 정보만 근사하도록 비엄격 함수 공간을 사용한다. 엄격성 여부는 인수의 ⊥가 결과를 반드시 ⊥로 만드는지로 드러난다.

**English — Direct denotational semantics:** Uses non-strict function spaces so expression meanings demand only needed information. Strictness is visible in whether a bottom argument necessarily yields bottom.

### §14.5 · 축약과 환경 평가의 대응

치환 기반 정상 순서 축약과 환경·서스펜션 기반 평가가 같은 관찰 결과를 주는 관계를 비교한다. 구현은 반복 치환을 피한다.

**English — Relating reduction and environment evaluation:** Relates substitution-based normal-order reduction to evaluation using environments and suspensions. Implementations avoid repeated textual substitution while preserving observations.

### §14.6 · 필요 호출과 공유

처음 강제한 인수 결과를 저장해 이후 사용이 같은 값을 재사용하게 한다. 이는 이름 호출의 의미를 유지하면서 중복 평가를 줄이지만 메모이제이션 저장소가 필요하다.

**English — Call-by-need and sharing:** Caches the result when an argument is first forced, so later uses share the value. This preserves call-by-name results while reducing repeated work, at the cost of memoization state.

## 반드시 남겨야 할 핵심

- 정상 순서는 정규형이 존재할 때 찾지만 같은 계산을 반복할 수 있다.
  - EN: Normal order finds a normal form when one exists but may repeat work.
- 지연 평가는 정상 순서의 비엄격성과 결과 공유를 결합한다.
  - EN: Lazy evaluation combines normal-order non-strictness with sharing.
- 무한 자료 구조는 전체를 생성하지 않고 요구된 부분만 관찰한다.
  - EN: Infinite data structures are observed by producing only demanded portions.

> [!warning] 자주 생기는 혼동
> - call-by-name과 call-by-need는 결과가 같아도 평가 횟수와 공간 동작이 다르다.
>   - EN: Call-by-name and call-by-need may agree on results while differing in evaluation count and space behavior.
> - ‘지연’이 항상 효율적이라는 뜻은 아니다. 유지되는 thunk가 공간 누수를 만들 수 있다.
>   - EN: ‘Lazy’ does not always mean efficient; retained thunks can cause space leaks.

## 1단계 — 인수를 값이 아닌 식으로 전달 — §14.1–14.2

함수 적용은 인수를 먼저 평가하지 않고 본문에서 필요할 때 정의 환경과 함께 평가한다.

매개변수 바인딩은 값 대신 썽크와 비슷한 `(식,환경)`을 저장한다. 이 때문에 사용되지 않는 인수의 발산과 효과를 피하지만, 순수하지 않은 효과와 결합할 때 의미 정책이 복잡해진다.

> [!question] 책을 덮고 답해 보기
> 적극 평가와 정상 순서에서 인수 평가 시점을 각각 말하라.

### English companion

Function application does not evaluate the argument first; it evaluates it on demand in the body with its environment.

A parameter binding stores an expression-environment pair rather than a value. This avoids divergence and effects of unused arguments, but interaction with impure effects requires careful policy.

---

## 2단계 — 무한 자료를 유한하게 관찰 — §14.3

리스트의 꼬리를 필요할 때만 계산하면 무한 리스트에서도 앞의 유한 부분을 얻을 수 있다.

생산자와 소비자를 분리해도 소비자가 요구한 만큼만 생산한다. short-circuit, 무한 수열, 생성기 파이프라인은 이 수요 주도 평가의 대표 사례다.

> [!question] 책을 덮고 답해 보기
> 무한 자연수 리스트에서 처음 10개만 취하는 계산이 종료하는 조건은?

### English companion

Computing a list tail only when demanded lets programs obtain finite prefixes of infinite lists.

Producer and consumer can be separated while only demanded elements are produced. Short-circuiting, infinite sequences, and generator pipelines exemplify demand-driven evaluation.

---

## 3단계 — 직접 의미와 축약 연결 — §14.4–14.5

환경 기반 평가와 치환 기반 정상 축약이 같은 관찰 결과를 준다는 대응을 세운다.

direct semantics에서는 함수가 인수 의미를 지연된 방식으로 받는다. 축약 관점은 syntax 변환을, 평가 의미는 구현 가능한 환경 조작을 강조하므로 두 설명의 일치가 중요하다.

> [!question] 책을 덮고 답해 보기
> substitution-based semantics과 environment-based semantics이 각각 피하는 비용은 무엇인가?

### English companion

Environment-based evaluation is related to substitution-based normal reduction through their common observable results.

Direct semantics lets functions receive argument meanings non-strictly. Reduction emphasizes syntax transformation; evaluation semantics emphasizes implementable environment manipulation, making their agreement important.

---

## 4단계 — call-by-need로 중복 계산 제거 — §14.6

lazy evaluation은 썽크를 처음 강제할 때 계산하고 결과로 셀을 갱신해 이후 사용이 공유되게 한다.

call-by-name과 종료 행동은 비슷하지만 계산량은 크게 다를 수 있다. 메모화에는 변경 가능한 셀이 필요하므로 순수 언어 구현 안에서 제한된 상태 효과가 사용된다.

> [!question] 책을 덮고 답해 보기
> 인수가 본문에 세 번 나타날 때 call-by-name과 call-by-need의 평가 횟수를 비교하라.

### English companion

Lazy evaluation computes a thunk on first force, updates its cell with the result, and shares that result on later uses.

Call-by-name and call-by-need have similar termination behavior but can differ greatly in work. Memoization uses mutable cells internally, a disciplined state effect implementing a pure language.

## 자체 점검 퀴즈

### Q1. lazy evaluation이 call-by-name에 추가하는 핵심은?

What does lazy evaluation add to call-by-name?

- A. 결과 공유/메모화 / Sharing and memoization
- B. 모든 인수 선평가 / Eager evaluation of all arguments
- C. 동적 바인딩 / Dynamic binding

> [!success]- 정답과 해설
> **A.** 한번 강제한 썽크의 결과를 재사용한다.
>
> EN: A forced thunk's result is reused.

### Q2. 무한 리스트를 다룰 수 있는 이유는?

Why can infinite lists be useful?

- A. 전체를 먼저 생성해서 / Because the entire list is generated first
- B. 소비자가 요구한 유한 부분만 평가해서 / Because only the finite demanded portion is evaluated
- C. 리스트가 실제로 유한해서 / Because the list is secretly finite

> [!success]- 정답과 해설
> **B.** 비엄격성은 관찰에 필요한 부분만 계산한다.
>
> EN: Non-strictness computes only what observation demands.

### Q3. 썽크에 보통 들어가는 것은?

What does a thunk typically contain?

- A. 지연된 식과 그 환경 / A delayed expression and its environment
- B. 완료된 출력 파일 / A completed output file
- C. 타입 오류 / A type error

> [!success]- 정답과 해설
> **A.** 나중 평가 시 자유 변수의 바인딩을 보존해야 한다.
>
> EN: The environment preserves free-variable bindings for later evaluation.

## 다음 개념으로

평가 전략을 이해했으니, 다음에는 어떤 식이 어떤 종류의 값을 낼 수 있는지 실행 전에 판단하는 단순 타입 체계를 세운다.

**English:** With evaluation strategies understood, the next chapter builds a simple type system that predicts what kind of value an expression can produce before execution.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 298–314.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
