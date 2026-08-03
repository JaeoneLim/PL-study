---
type: chapter
title: "03. 프로그램 명세와 증명"
title_en: "Program Specifications and Their Proofs"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "54–80"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-01-predicate-logic]]"
  - "[[chapter-02-simple-imperative-language]]"
  - "[[chapter-04-arrays]]"
---

# 03. 프로그램 명세와 증명 (Program Specifications and Their Proofs)

> [!abstract] 한눈에 보기
> Hoare식 명세를 의미론으로 정의한 뒤, 프로그램 구조를 따라 증명하는 추론 규칙을 세운다. 피보나치와 빠른 거듭제곱이 불변식 설계의 사례가 된다.
>
> **English:** Hoare-style specifications are defined semantically and then proved by syntax-directed rules. Fibonacci and fast exponentiation serve as case studies in invariant design.

## 학습 목표

- 부분 정확성과 전체 정확성을 구분한다.
  - EN: Distinguish partial from total correctness.
- 대입·순차·조건·while 규칙을 역방향으로 사용한다.
  - EN: Use assignment, sequencing, conditional, and while rules backward.
- 사후조건에서 루프 불변식과 변량을 설계한다.
  - EN: Design loop invariants and variants from a postcondition.

## 핵심 용어

- **Hoare 삼중항 (Hoare triple)**
- **루프 불변식 (loop invariant)**
- **변량 함수 (variant function)**
- **결과 규칙 (rule of consequence)**
- **건전성 (soundness)**

## 1단계 — 명세가 약속하는 것 — §3.1

부분 정확성은 종료했을 때의 결과를, 전체 정확성은 종료와 결과를 함께 약속한다.

전제 p를 만족하는 초기 상태에서 실행한 뒤 정상 종료 상태가 q를 만족하면 `{p} c {q}`가 성립한다. 전체 정확성 표기는 여기에 모든 p-상태에서 종료한다는 조건을 더한다.

> [!question] 책을 덮고 답해 보기
> 무한 루프가 `{true} c {false}`를 부분 정확성으로 만족할 수 있는 이유는?

### English companion

Partial correctness promises the result if execution terminates; total correctness promises termination as well.

`{p} c {q}` holds when every normally terminating run from a p-state ends in a q-state. Total correctness adds termination from every p-state.

---

## 2단계 — 프로그램을 따라 증명하기 — §3.2–3.3

각 구문 생성자에는 그 동작을 반영하는 증명 규칙이 대응한다.

대입 규칙은 사후조건 q에서 v를 e로 치환해 필요한 사전조건을 계산한다. 순차 규칙은 중간 단언을 찾는 문제이며, 결과 규칙은 사전조건을 강화하거나 사후조건을 약화한다.

> [!question] 책을 덮고 답해 보기
> `{?} x:=x+1 {x>0}`의 가장 직접적인 사전조건을 계산하라.

### English companion

Each syntax constructor has a proof rule reflecting its behavior.

The assignment rule computes a precondition by substituting e for v in q. Sequencing asks for an intermediate assertion; consequence strengthens a precondition or weakens a postcondition.

---

## 3단계 — 불변식과 종료 증명 — §3.4–3.5

불변식은 반복마다 보존되는 사실이고, 변량은 종료까지 엄격히 감소하는 자연수 척도다.

부분 정확성은 I∧b에서 본문이 I를 보존함을 보인다. 전체 정확성은 여기에 음수가 되지 않는 변량 t가 반복마다 감소함을 보태 무한 반복을 배제한다.

> [!question] 책을 덮고 답해 보기
> 배열 길이 n을 향해 k를 증가시키는 루프에서 자연스러운 변량은 무엇인가?

### English companion

An invariant is preserved by each iteration; a variant is a natural-number measure that strictly decreases toward termination.

Partial correctness proves that the body preserves I under I∧b. Total correctness also proves that a nonnegative variant t decreases each time, excluding infinite iteration.

---

## 4단계 — 알고리즘에서 불변식 뽑기 — §3.6–3.8

피보나치와 빠른 거듭제곱은 중간 변수들이 최종 수학 관계를 어떻게 분해해 유지하는지 보여 준다.

좋은 불변식은 사후조건의 일부를 반복 중에도 참이 되도록 일반화한다. 증명 규칙의 한계는 어떤 유용한 규칙이 비합성적이거나, 단언 언어가 필요한 성질을 표현하지 못할 수 있다는 점이다.

> [!question] 책을 덮고 답해 보기
> 빠른 거듭제곱에서 `acc × base^exp = 원래 값` 형태가 왜 좋은 불변식인가?

### English companion

Fibonacci and fast exponentiation show how intermediate variables preserve a decomposition of the final mathematical relationship.

A good invariant generalizes part of the postcondition so that it remains true during iteration. Limitations include noncompositional rules and assertion languages too weak to express needed properties.

## 자체 점검 퀴즈

### Q1. 부분 정확성에 종료가 포함되는가?

Does partial correctness include termination?

- A. 항상 포함된다 / Always
- B. 포함되지 않는다 / No
- C. while이 없을 때만 포함된다 / Only without while

> [!success]- 정답과 해설
> **B.** 부분 정확성은 종료한 실행의 결과만 제한한다.
>
> EN: Partial correctness constrains results only for terminating executions.

### Q2. 대입 규칙에서 사전조건을 얻는 연산은?

What operation produces the assignment precondition?

- A. 사후조건에 대입될 식을 치환 / Substitute the assigned expression into the postcondition
- B. 불변식을 삭제 / Delete the invariant
- C. 상태를 무작위 선택 / Choose a random state

> [!success]- 정답과 해설
> **A.** 실행 뒤 q가 참이려면 실행 전에는 q[v↦e]가 참이어야 한다.
>
> EN: For q to hold after assignment, q[v↦e] must hold before it.

### Q3. 전체 정확성 while 증명에 추가로 필요한 것은?

What extra ingredient is needed for total correctness of while?

- A. 더 강한 파서 / A stronger parser
- B. 감소하는 하한 있는 변량 / A decreasing, lower-bounded variant
- C. 동적 바인딩 / Dynamic binding

> [!success]- 정답과 해설
> **B.** 변량이 무한히 감소할 수 없으므로 종료를 얻는다.
>
> EN: A well-founded decreasing variant cannot decrease forever.

## 다음 개념으로

스칼라 변수에서 익힌 명세와 증명 규칙을 다음 장에서 유한 함수로 모델링되는 배열까지 확장한다.

**English:** The next chapter extends these specification and proof techniques from scalar variables to arrays modeled as finite functions.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 54–80.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
