---
type: chapter
title: "12. 함수형 언어의 계속"
title_en: "Continuations in a Functional Language"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "251–272"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-10-lambda-calculus]]"
  - "[[chapter-11-eager-functional-language]]"
  - "[[chapter-13-iswim-like-languages]]"
---

# 12. 함수형 언어의 계속 (Continuations in a Functional Language)

> [!abstract] 한눈에 보기
> 함수형 평가를 CPS로 바꾸고 계속을 일급 값으로 노출한 뒤, defunctionalization을 통해 일차 의미론과 추상 기계를 유도한다.
>
> **English:** Functional evaluation is transformed into CPS, continuations are exposed as first-class values, and defunctionalization derives a first-order semantics and abstract machine.

## 학습 목표

- 직접 스타일 평가 규칙을 CPS로 변환한다.
  - EN: Transform direct-style evaluation rules into CPS.
- callcc/throw의 비지역 제어를 추적한다.
  - EN: Trace nonlocal control with callcc/throw.
- 고차 계속을 일차 프레임 자료형으로 defunctionalize한다.
  - EN: Defunctionalize higher-order continuations into a first-order frame datatype.

## 핵심 용어

- **계속 전달 방식 (continuation-passing style)**
- **일급 계속 (first-class continuation)**
- **call/cc (call/cc)**
- **비지역 탈출 (nonlocal exit)**
- **비함수화 (defunctionalization)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 적극 함수형 언어의 제어 흐름을 계속 전달 방식으로 명시하고, 계속을 값으로 노출하거나 일차 평가기로 변환하는 과정을 보인다.
>
> **English:** Makes control flow explicit through continuation passing, exposes continuations as values, and derives a first-order evaluator from them.

### §12.1 · 계속 전달 의미론

식의 의미는 값 하나가 아니라 결과를 받아 다음 계산을 수행할 계속을 인수로 받는다. 평가 순서는 계속이 중첩되는 순서에 명시적으로 나타난다.

**English — Continuation semantics:** An expression meaning accepts a continuation that consumes its value and performs the rest of the computation. Evaluation order becomes explicit in continuation nesting.

### §12.2–12.3 · 일급 계속과 프로그래밍 기법

현재 계속을 값으로 캡처하면 이후 호출 시 현재 문맥을 버리고 저장된 제어 지점으로 이동할 수 있다. 조기 탈출, 코루틴, 탐색 같은 비지역 제어를 구성한다.

**English — First-class continuations as a technique:** Capturing the current continuation as a value permits later invocation to discard the current context and resume a saved control point, implementing early exit, coroutines, and search.

### §12.4 · 비함수화로 일차 상태 만들기

실제로 만들어지는 계속 함수의 유한한 형태를 태그 있는 데이터 생성자로 바꾸고, 이를 해석하는 apply 단계로 분리한다. 고차 의미가 명시적 제어 스택을 가진 기계가 된다.

**English — Defunctionalization into first-order states:** Replaces the finite family of continuation functions with tagged data constructors plus an apply operation. The higher-order semantics becomes a machine with an explicit control stack.

### §12.5 · 일차 평가 기계의 구성

제어 식, 환경, 계속 프레임 사이를 이동하는 상태 전이로 평가를 요약한다. 각 프레임은 아직 평가하지 않은 문맥의 정확한 종류를 기록한다.

**English — Structure of the first-order evaluator:** Evaluation is summarized as transitions among a control expression, environment, and continuation frames. Each frame records the exact pending context.

### §12.6 · 두 의미론의 대응

일차 프레임을 다시 계속 함수로 해석하는 대응을 정의하고 각 기계 단계가 계속 의미를 보존함을 보여 두 설명의 동치를 정당화한다.

**English — Relating the two semantics:** Interprets first-order frames back as continuation functions and shows each machine step preserves continuation meaning, justifying equivalence of the accounts.

## 반드시 남겨야 할 핵심

- CPS는 숨은 평가 문맥과 순서를 함수 인수로 노출한다.
  - EN: CPS exposes hidden evaluation context and order as a function argument.
- 비함수화는 의미 정의에서 추상 기계와 구현을 체계적으로 유도한다.
  - EN: Defunctionalization systematically derives an abstract machine and implementation from a semantic definition.
- 일급 계속은 ‘돌아갈 곳’을 복사·저장·호출할 수 있는 값으로 만든다.
  - EN: First-class continuations make ‘where to return’ a value that can be copied, stored, and invoked.

> [!warning] 자주 생기는 혼동
> - 저장된 계속을 호출하는 것은 일반 함수 호출처럼 현재 위치로 다시 돌아오지 않는다.
>   - EN: Invoking a saved continuation does not return to the invocation point like an ordinary function call.
> - CPS의 결과형과 원래 식의 값형을 같은 것으로 보지 않는다.
>   - EN: Do not conflate the CPS answer type with the original expression’s value type.

## 1단계 — 모든 결과를 계속에 넘기기 — §12.1

평가기는 값을 반환하는 대신 그 값을 받을 함수 k를 호출한다.

적용에서는 연산자 평가 계속 안에 인수 평가 계속을 넣고, 그 안에서 함수 본문을 평가한다. 이 중첩이 제어 순서를 데이터 흐름으로 명시한다.

> [!question] 책을 덮고 답해 보기
> `f a`의 적극 평가에서 f, a, 본문 순서를 세 개의 중첩 계속으로 써 보라.

### English companion

Instead of returning a value, the evaluator calls a function k that receives the value.

For application, the operand continuation is nested inside the operator continuation, and body evaluation inside that. The nesting makes control order explicit as dataflow.

---

## 2단계 — 현재 미래를 캡처하기 — §12.2–12.3

callcc는 현재 계속을 값으로 넘기고 throw는 현재 문맥을 버린 채 저장된 계속으로 이동한다.

이 기능으로 조기 반환, 깊은 탐색 탈출, 코루틴 같은 제어 패턴을 라이브러리 수준에서 표현할 수 있다. 저장된 계속이 어느 상태·자원과 함께 재사용되는지는 효과 설계의 핵심 경계다.

> [!question] 책을 덮고 답해 보기
> throw가 호출 지점의 남은 계산을 실행하지 않는 이유를 계속 관점에서 설명하라.

### English companion

callcc passes the current continuation as a value; throw discards the current context and resumes a saved continuation.

This expresses early return, deep search escape, and coroutine-like control patterns at library level. Whether a saved continuation can be reused with state and resources is a key effect boundary.

---

## 3단계 — 함수를 프레임 자료형으로 — §12.4–12.5

평가기에서 실제로 만들어지는 계속 함수의 모양은 유한하므로 태그된 프레임 자료형으로 바꿀 수 있다.

각 람다 계속을 생성자와 저장 필드로 바꾸고, 하나의 apply-cont 함수가 태그를 해석한다. 고차 정의가 스택을 명시적으로 다루는 일차 인터프리터 또는 추상 기계가 된다.

> [!question] 책을 덮고 답해 보기
> 함수 적용 평가에서 '연산자 결과 대기' 프레임이 저장해야 할 정보는?

### English companion

Only finitely many continuation-function shapes arise in the evaluator, so they can be replaced by a tagged frame datatype.

Replace each continuation lambda by a constructor with saved fields, and interpret tags in one apply-cont function. The higher-order evaluator becomes a first-order interpreter or abstract machine with an explicit stack.

---

## 4단계 — 두 의미론의 상태 대응 — §12.6

CPS 상태와 일차 기계 상태 사이의 표현 관계를 세우면 두 평가기가 같은 답을 냄을 보일 수 있다.

한쪽의 함수 계속을 다른 쪽의 프레임 목록으로 읽고 각 전이 또는 호출이 대응함을 보인다. 이는 구현 유도가 단순한 직관이 아니라 의미 보존 변환임을 확립한다.

> [!question] 책을 덮고 답해 보기
> 시뮬레이션 관계가 보존되어야 하는 한 단계 조건을 말하라.

### English companion

A representation relation between CPS states and machine states proves that both evaluators produce the same answers.

Interpret a functional continuation as a frame list and show corresponding calls or transitions. This establishes the implementation derivation as a semantics-preserving transformation rather than intuition.

## 자체 점검 퀴즈

### Q1. CPS 함수가 추가로 받는 인수는?

What extra argument does a CPS function receive?

- A. 계속 / A continuation
- B. 타입 증명 / A type proof
- C. 파일 이름 / A filename

> [!success]- 정답과 해설
> **A.** 결과를 어디에 전달할지를 명시한다.
>
> EN: It states where the result should go.

### Q2. defunctionalization의 결과는?

What does defunctionalization produce?

- A. 고차 함수 대신 태그된 자료와 apply 함수 / Tagged data and an apply function instead of higher-order functions
- B. 모든 함수를 인라인 / Inline every function
- C. 타입을 제거 / Remove all types

> [!success]- 정답과 해설
> **A.** 계속을 명시적 스택 프레임으로 바꾼다.
>
> EN: It turns continuations into explicit stack frames.

### Q3. throw의 동작은?

What does throw do?

- A. 현재 계속을 이어서 실행 / Continue with the current continuation
- B. 현재 계속을 버리고 지정된 계속을 재개 / Discard the current continuation and resume a specified one
- C. 프로그램을 항상 종료 / Always terminate the program

> [!success]- 정답과 해설
> **B.** 비지역 제어 이동의 핵심이다.
>
> EN: That is the essence of nonlocal control transfer.

## 다음 개념으로

계속 기계를 얻었으니, 다음 장은 여기에 저장소와 참조를 결합해 함수형·명령형 효과를 한 언어에서 다룬다.

**English:** With the continuation machine in hand, the next chapter combines it with a store and references to support functional and imperative effects together.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 251–272.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
