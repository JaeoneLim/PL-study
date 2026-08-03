---
type: chapter
title: "07. 비결정성과 보호 명령"
title_en: "Nondeterminism and Guarded Commands"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "136–154"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-06-transition-semantics]]"
  - "[[chapter-08-shared-variable-concurrency]]"
  - "[[chapter-09-csp]]"
---

# 07. 비결정성과 보호 명령 (Nondeterminism and Guarded Commands)

> [!abstract] 한눈에 보기
> Dijkstra의 보호 명령을 통해 비결정적 선택과 반복을 도입하고, 전이 관계·파워도메인·명세·최약 전제조건을 연결한다.
>
> **English:** Dijkstra's guarded commands introduce nondeterministic choice and iteration, connecting transition relations, powerdomains, specifications, and weakest preconditions.

## 학습 목표

- 선택 가능성과 선택 결과를 구분한다.
  - EN: Distinguish enabled choices from selected outcomes.
- may와 must 관찰의 차이를 설명한다.
  - EN: Explain the difference between may and must observations.
- 최약 전제조건을 명세와 계산 양쪽에서 사용한다.
  - EN: Use weakest preconditions both as specifications and calculations.

## 핵심 용어

- **보호 명령 (guarded command)**
- **비결정성 (nondeterminism)**
- **파워도메인 (powerdomain)**
- **교착 (deadlock)**
- **최약 전제조건 (weakest precondition)**

## 1단계 — 활성 가드 중 하나를 고르기 — §7.1

여러 가드가 참이면 어느 분기든 실행될 수 있고, 모두 거짓이면 선택문은 교착하거나 반복문은 끝난다.

전이 관계는 동일 구성에서 여러 다음 구성을 허용한다. 비결정성은 확률을 말하지 않으며, 단지 구현이나 환경이 허용된 선택 중 하나를 고른다는 뜻이다.

> [!question] 책을 덮고 답해 보기
> `if b₁→c₁ ▯ b₂→c₂ fi`에서 두 가드가 모두 참이면 무엇이 보장되고 무엇은 보장되지 않는가?

### English companion

If several guards are true, any corresponding branch may run; if all are false, selection deadlocks while guarded iteration terminates.

The transition relation permits multiple next configurations from one state. Nondeterminism is not probability; it merely leaves the choice among allowed branches unspecified.

---

## 2단계 — 결과 집합의 정보 순서 — §7.2–7.3

비결정적 의미는 결과 하나가 아니라 가능한 결과들의 집합이며, 발산 가능성까지 보존하는 순서가 필요하다.

단순 멱집합만으로는 근사·발산·유한 관찰을 올바르게 표현하기 어렵다. 제한된 비결정성 아래 파워도메인은 may 결과와 반드시 보장되는 must 성질을 구분할 수 있게 한다.

> [!question] 책을 덮고 답해 보기
> 가능한 결과에 좋은 상태 하나가 있다는 것과 모든 가능한 결과가 좋다는 것은 어떤 차이인가?

### English companion

A nondeterministic meaning is a set of possible results, ordered so that potential divergence is not lost.

A plain powerset mishandles approximation, divergence, and finite observation. Under bounded nondeterminism, a powerdomain supports distinctions between may outcomes and properties that must hold.

---

## 3단계 — 악의적인 선택자에 대해 증명하기 — §7.4

전체 정확성은 허용된 모든 선택이 안전하고 종료함을 보여야 한다.

선택 규칙은 각 활성 분기의 사양을 증명하고, 보호 반복의 변량은 어느 분기를 택해도 감소해야 한다. 한 번의 좋은 실행을 제시하는 것으로는 보편적 명세가 증명되지 않는다.

> [!question] 책을 덮고 답해 보기
> 비결정적 프로그램의 테스트 한 번이 전체 정확성 증거가 될 수 없는 이유는?

### English companion

Total correctness must show that every allowed choice is safe and terminating.

The choice rule proves the specification for each enabled branch, and a guarded-loop variant must decrease for every possible branch. Exhibiting one good execution does not establish a universal specification.

---

## 4단계 — 사후조건에서 최약 전제조건 계산 — §7.5

`wp(c,q)`는 c가 반드시 종료해 q를 만족하게 하는 가장 약한 초기 조건이다.

순차 구성의 wp는 안쪽부터 합성하고, 비결정적 선택은 모든 가능한 분기의 wp를 만족해야 한다. 이렇게 의미론적 사양이 프로그램 구조를 따라 계산되는 단언 변환기로 바뀐다.

> [!question] 책을 덮고 답해 보기
> `wp(c₀;c₁,q)=wp(c₀,wp(c₁,q))`를 실행 순서로 설명하라.

### English companion

`wp(c,q)` is the weakest initial condition ensuring that c terminates and establishes q.

Sequential wp composes from the inside out; nondeterministic choice requires the wp of every possible branch. A semantic specification becomes a syntax-directed predicate transformer.

## 자체 점검 퀴즈

### Q1. 비결정성은 무엇과 다른가?

Nondeterminism is distinct from what?

- A. 확률적 선택 / Probabilistic choice
- B. 여러 가능한 실행 / Multiple possible executions
- C. 전이 관계 / A transition relation

> [!success]- 정답과 해설
> **A.** 비결정성만으로 각 선택의 확률은 주어지지 않는다.
>
> EN: Nondeterminism assigns no probability to alternatives.

### Q2. 보편적 안전성 명세에서 필요한 관점은?

Which viewpoint is needed for universal safety?

- A. 한 성공 실행 / One successful execution
- B. 모든 허용된 실행 / All allowed executions
- C. 가장 짧은 실행만 / Only the shortest execution

> [!success]- 정답과 해설
> **B.** 선택자는 가장 불리한 허용 분기를 택할 수 있다.
>
> EN: The chooser may select any allowed branch, including the worst one.

### Q3. wp의 'weakest' 의미는?

What does 'weakest' mean in wp?

- A. 가장 적은 초기 상태를 허용 / Allows the fewest initial states
- B. 정확성을 보장하면서 가장 많은 초기 상태를 허용 / Allows the most initial states while guaranteeing correctness
- C. 증명할 수 없는 조건 / An unprovable condition

> [!success]- 정답과 해설
> **B.** 논리적으로 약한 조건일수록 더 많은 상태가 만족한다.
>
> EN: A logically weaker assertion is satisfied by more states.

## 다음 개념으로

여러 전이가 서로 다른 프로세스의 한 단계라면, 비결정성은 공유 변수 동시성의 인터리빙으로 해석된다.

**English:** When alternatives are steps of different processes, nondeterminism becomes interleaving concurrency over shared variables.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 136–154.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
