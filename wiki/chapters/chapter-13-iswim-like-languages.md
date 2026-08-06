---
type: chapter
title: "13. ISWIM 계열 언어"
title_en: "Iswim-like Languages"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "273–297"
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

# 13. ISWIM 계열 언어 (Iswim-like Languages)

> [!abstract] 한눈에 보기
> 적극 함수형 언어에 참조와 상태를 더해 별칭을 모델링하고, CPS·일차 기계 위에서 예외·백트래킹·입출력을 통합한다.
>
> **English:** References and state are added to the eager functional language, modeling aliasing and integrating exceptions, backtracking, and I/O in CPS and a first-order machine.

## 학습 목표

- 환경과 저장소의 역할을 분리한다.
  - EN: Separate the roles of environment and store.
- 참조 별칭이 관찰 가능한 이유를 설명한다.
  - EN: Explain why reference aliasing is observable.
- 예외·백트래킹·I/O를 계속 조작으로 연결한다.
  - EN: Connect exceptions, backtracking, and I/O to continuation manipulation.

## 핵심 용어

- **위치 (location)**
- **참조 (reference)**
- **저장소 (store)**
- **별칭 (aliasing)**
- **예외 처리기 (exception handler)**
- **백트래킹 (backtracking)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 적극 함수형 언어에 가변 참조를 결합하고, 예외·백트래킹·입출력까지 상태와 계속의 조합으로 설명한다.
>
> **English:** Combines mutable references with an eager functional language and explains exceptions, backtracking, and I/O through the interaction of state and continuations.

### §13.1 · 별칭, 위치, 저장소

참조 값은 저장소 위치를 가리키고 여러 이름이 같은 위치를 가리키면 별칭이 생긴다. 환경은 이름을 값에, 저장소는 위치를 현재 내용에 대응시켜 분리된다.

**English — Aliasing, locations, and stores:** Reference values point to store locations; aliasing occurs when multiple names reach the same location. Environments map names to values, while stores separately map locations to current contents.

### §13.2–13.3 · 상태를 통과시키는 평가와 계속

평가 판단은 값과 함께 갱신된 저장소를 반환한다. continuation semantics에서는 계속이 값과 저장소를 함께 받아 평가 순서와 부작용 순서를 동시에 고정한다.

**English — State-threaded evaluation and continuations:** Evaluation returns an updated store along with a value. In continuation semantics, continuations consume both value and store, fixing evaluation order and effect order together.

### §13.4–13.6 · 문법 설탕, 일차 기계, 예제

대입·블록·반복 같은 convenience syntax을 핵심 참조 연산으로 번역하고, 계속을 비함수화해 환경-저장소-제어 스택 기반 평가기를 얻는다.

**English — Derived forms, first-order machine, and examples:** Translates assignment, blocks, loops, and other conveniences into core reference operations, then defunctionalizes continuations into an evaluator with environment, store, and control stack.

### §13.7 · 예외

정상 계속과 별도의 예외 계속을 사용하면 raise는 정상 나머지 계산을 건너뛰고 가장 가까운 handler로 제어와 값을 전달한다.

**English — Exceptions:** With a separate exception continuation, raise bypasses the normal remainder and transfers control and a value to the nearest handler.

### §13.8 · 백트래킹과 상태 복원

실패 계속은 다음 선택지를 기억한다. 선택 시점의 저장소도 보존할지 결정해야 하며, 복원 정책에 따라 탐색 의미가 달라진다.

**English — Backtracking and state restoration:** A failure continuation remembers the next alternative. Whether the store at the choice point is restored is a semantic decision that changes search behavior.

### §13.9–13.10 · 입출력과 효과 조합의 복잡성

입출력은 외부 세계와 되돌릴 수 없는 관찰을 만든다. 참조, 예외, 백트래킹, I/O를 함께 두면 효과 순서와 복구 가능성이 상호작용해 단순한 등식 추론을 깨뜨린다.

**English — I/O and complications of combining effects:** I/O creates externally visible, often irreversible observations. Combining references, exceptions, backtracking, and I/O makes effect order and recoverability interact, invalidating simple equations.

## 반드시 남겨야 할 핵심

- 환경은 이름의 스코프를, 저장소는 위치 내용의 시간 변화를 설명한다.
  - EN: The environment explains lexical naming; the store explains how location contents change over time.
- 별칭 때문에 한 이름을 통한 갱신이 다른 이름의 관찰을 바꾼다.
  - EN: Aliasing lets an update through one name change observations through another.
- 여러 효과의 조합은 각 효과를 따로 이해한 것보다 더 복잡하다.
  - EN: Combining effects is more complex than understanding each one in isolation.

> [!warning] 자주 생기는 혼동
> - 참조 값과 참조가 가리키는 현재 값을 구분한다.
>   - EN: Distinguish a reference value from the current value stored at its location.
> - 백트래킹이 제어만 되돌리는지 저장소와 출력까지 되돌리는지 모델에서 확인한다.
>   - EN: Check whether backtracking restores only control or also state and output.

## 1단계 — 환경은 위치를, 저장소는 값을 — §13.1–13.2

변수 바인딩과 변경 가능한 셀을 분리하면 참조 생성·읽기·쓰기를 정확히 모델링할 수 있다.

환경 ρ는 이름을 값이나 위치에 연결하고 저장소 μ는 위치를 현재 값에 연결한다. 새 참조는 신선한 위치를 할당하고, 같은 위치를 가리키는 두 참조는 별칭이 되어 한쪽 쓰기가 다른 쪽 읽기에 보인다.

> [!question] 책을 덮고 답해 보기
> 두 참조가 같은 값을 담는 것과 같은 위치를 가리키는 것의 차이는?

### English companion

Separating variable bindings from mutable cells precisely models reference allocation, dereference, and assignment.

Environment ρ maps names to values or locations; store μ maps locations to current values. Allocation chooses a fresh location, and two references to one location alias, so a write through one is visible through the other.

---

## 2단계 — 상태를 CPS와 기계에 통과시키기 — §13.3–13.5

각 평가 단계는 값뿐 아니라 갱신된 저장소를 계속에 넘긴다.

CPS는 제어 흐름을, 저장소 매개변수는 효과 순서를 명시한다. 비함수화하면 제어 스택과 저장소를 가진 CEK류 일차 기계가 되며 구현의 평가 순서가 노출된다.

> [!question] 책을 덮고 답해 보기
> 두 피연산자가 모두 참조를 수정할 수 있을 때 평가 순서가 의미에 영향을 주는 이유는?

### English companion

Every evaluation step passes both a value and an updated store to its continuation.

CPS makes control flow explicit while a store parameter makes effect order explicit. Defunctionalization yields a CEK-like first-order machine with control stack and store, exposing implementation order.

---

## 3단계 — 제어 효과를 계속로 통일 — §13.6–13.9

예외는 실패 계속, 백트래킹은 대안 계속, 입출력은 외부 응답 뒤의 계속으로 볼 수 있다.

정상 계속과 처리기 계속을 분리하면 throw가 가장 가까운 처리기로 이동한다. 백트래킹은 상태 복원 정책까지 필요하며, 입출력은 5장의 재개 관점과 현재 추상 기계를 연결한다.

> [!question] 책을 덮고 답해 보기
> 백트래킹 시 제어만 되돌리고 저장소를 복원하지 않으면 어떤 의미 변화가 생기는가?

### English companion

Exceptions use failure continuations, backtracking stores alternative continuations, and I/O retains continuations after external responses.

Separating normal and handler continuations sends a throw to the nearest handler. Backtracking also needs a store-restoration policy, while I/O connects this machine to Chapter 5's resumption view.

---

## 4단계 — 효과의 상호작용 경계 찾기 — §13.10

계속과 상태를 함께 쓸 때 캡처·복원·중복 실행 정책이 명시되지 않으면 의미가 모호해진다.

일급 계속을 여러 번 호출할 수 있는지, 호출 시 저장소가 캡처 시점으로 돌아가는지, 입출력이 반복되는지에 따라 언어가 크게 달라진다. 효과를 독립적으로 설계한 뒤 단순 결합할 수 없다는 교훈이다.

> [!question] 책을 덮고 답해 보기
> 이미 출력한 뒤 캡처된 계속을 다시 실행할 때 출력을 반복할지 정책이 필요한 이유는?

### English companion

Combining continuations and state is ambiguous unless capture, restoration, and repeated-use policies are explicit.

Whether a first-class continuation is reusable, restores the captured store, or repeats I/O radically changes the language. Effects cannot always be designed independently and then naively combined.

## 자체 점검 퀴즈

### Q1. 저장소가 나타내는 것은?

What does the store represent?

- A. 이름의 철자 / Name spelling
- B. 위치의 현재 값 / Current values of locations
- C. 타입 규칙 목록 / A list of typing rules

> [!success]- 정답과 해설
> **B.** 변경 가능성은 위치에서 값으로 가는 저장소를 갱신한다.
>
> EN: Mutation updates the location-to-value store.

### Q2. 별칭의 조건은?

When do references alias?

- A. 값이 우연히 같을 때 / Whenever values happen to be equal
- B. 같은 위치를 가리킬 때 / When they point to the same location
- C. 이름 길이가 같을 때 / When names have equal length

> [!success]- 정답과 해설
> **B.** 공유 위치 때문에 한쪽의 쓰기가 다른 쪽에서 관찰된다.
>
> EN: A shared location makes writes through one reference visible through the other.

### Q3. 예외를 CPS로 모델링할 때 유용한 구조는?

What CPS structure is useful for exceptions?

- A. 정상 계속과 예외 계속 / Normal and exception continuations
- B. 두 개의 파서 / Two parsers
- C. 무한 타입 / An infinite type

> [!success]- 정답과 해설
> **A.** 정상 반환과 비지역 처리기 이동을 분리한다.
>
> EN: It separates normal return from nonlocal transfer to a handler.

## 다음 개념으로

상태가 있는 적극 언어와 대조하기 위해 다음 장은 정상 순서 언어로 돌아가 call-by-name과 공유하는 lazy evaluation을 구분한다.

**English:** For contrast with stateful eager evaluation, the next chapter returns to normal order and distinguishes call-by-name from sharing-based lazy evaluation.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 273–297.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
