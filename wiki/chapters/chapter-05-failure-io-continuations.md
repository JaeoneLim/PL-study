---
type: chapter
title: "05. 실패, 입출력, 계속"
title_en: "Failure, Input-Output, and Continuations"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "97–125"
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

# 05. 실패, 입출력, 계속 (Failure, Input-Output, and Continuations)

> [!abstract] 한눈에 보기
> 실패와 중간 입출력을 추가하면 최종 상태 하나만으로는 동작을 설명할 수 없다. 시퀀스·재개·재귀 도메인·계속 의미론으로 관찰 가능한 실행 과정을 모델링한다.
>
> **English:** Failure and intermediate I/O cannot be described by one final state. Sequences, resumptions, recursive domains, and continuation semantics model the observable course of execution.

## 학습 목표

- 정상 종료, 실패, 비종료를 구분하는 결과 도메인을 읽는다.
  - EN: Read result domains that distinguish normal termination, failure, and divergence.
- 유한 관찰과 연속성의 물리적 논증을 설명한다.
  - EN: Explain the physical argument from finite observation to continuity.
- 직접 의미론과 계속 의미론의 정보 흐름을 비교한다.
  - EN: Compare information flow in direct and continuation semantics.

## 핵심 용어

- **시퀀스 도메인 (sequence domain)**
- **재귀 도메인 동형 (recursive domain isomorphism)**
- **재개 (resumption)**
- **계속 (continuation)**
- **CPS (continuation-passing style)**

## 1단계 — 실패를 결과로 만들기 — §5.1

`fail`은 정상 상태와 다른 관찰 가능한 종료이며 비종료와도 구별될 수 있다.

결과 공간에 `(abort,σ)`를 추가하면 실패 순간의 상태를 보존할 수 있다. 순차 구성은 앞 명령이 정상 종료할 때만 뒤 명령을 실행하고, 실패나 비종료는 그대로 전파한다.

> [!question] 책을 덮고 답해 보기
> 실패를 비종료와 같은 ⊥로 합치면 catch 같은 구성을 설명할 때 어떤 정보를 잃는가?

### English companion

`fail` is an observable termination distinct from both a normal state and divergence.

Adding `(abort,σ)` to the result space preserves the state at failure. Sequencing runs its second command only after normal termination; failure and divergence propagate.

---

## 2단계 — 유한 관찰에서 연속성으로 — §5.2–5.5

출력은 유한 또는 무한 시퀀스로 누적되고, 유한 시간의 관찰은 유한한 계산 근사에만 의존해야 한다.

접두사 순서는 출력 정보의 증가를 나타낸다. 제품과 분리합으로 복합 결과를 만들고, 재귀 도메인 방정식으로 무한 행동을 유한 단계 구조의 극한으로 정의한다. 연속성은 무한 정보를 갑자기 검사하는 비현실적 함수를 배제한다.

> [!question] 책을 덮고 답해 보기
> 출력 스트림의 어떤 유한 접두사를 결정하는 데 전체 무한 입력이 필요하다면 왜 비연속적인가?

### English companion

Output accumulates as finite or infinite sequences, and any finite-time observation must depend on only a finite computation approximation.

Prefix order represents growing output information. Products and disjoint unions assemble results, while recursive domain equations describe infinite behavior as limits of finite structure. Continuity rules out unrealistic functions that inspect infinite information at once.

---

## 3단계 — 입력을 기다리는 계산 — §5.6

입력 명령은 한 값이 아니라 가능한 각 입력 뒤의 나머지 계산을 가진 재개 노드다.

재개 도메인은 종료, 실패, 출력 후 계속, 입력별 계속 같은 생성자를 재귀적으로 묶는다. 프로그램 의미는 최종 결과가 아니라 환경과 주고받는 잠재적으로 무한한 트리다.

> [!question] 책을 덮고 답해 보기
> 출력은 하나의 다음 재개를 갖지만 입력은 함수 형태의 여러 다음 재개를 갖는 이유는?

### English companion

An input command is a resumption node containing the rest of the computation for every possible input.

A resumption domain recursively combines termination, failure, output-and-continue, and input-indexed continuation constructors. A program denotes a potentially infinite interaction tree rather than a single final result.

---

## 4단계 — 나머지 계산을 매개변수로 — §5.7–5.8

계속은 현재 명령 뒤에 무엇을 할지 나타내는 함수이며, 각 구문의 의미가 그 계속을 받아 전체 결과를 만든다.

순차 구성에서 `c₀;c₁`은 c₁의 의미를 현재 계속과 결합한 뒤 c₀에 넘긴다. 실패는 정상 계속을 무시하고 실패 경로로 빠지므로 예외·탈출·제어 효과를 직접 의미론보다 자연스럽게 표현한다.

> [!question] 책을 덮고 답해 보기
> CPS에서 순차 구성의 계산 순서가 계속의 중첩 순서로 어떻게 나타나는가?

### English companion

A continuation represents what happens after the current command; each construct receives it and produces the overall result.

For `c₀;c₁`, combine c₁ with the current continuation and pass that to c₀. Failure ignores the normal continuation and follows an abort path, making exceptions, exits, and control effects more natural than in direct style.

## 자체 점검 퀴즈

### Q1. 재개 의미론이 최종 상태 의미론보다 필요한 경우는?

When is resumption semantics needed beyond final-state semantics?

- A. 중간 입출력을 관찰할 때 / When intermediate I/O is observable
- B. 변수 이름을 짧게 할 때 / When shortening variable names
- C. 문법에 괄호가 있을 때 / When syntax has parentheses

> [!success]- 정답과 해설
> **A.** 상호작용 과정 자체가 관찰되므로 최종 상태만으로 부족하다.
>
> EN: The interaction process itself is observable, so a final state is insufficient.

### Q2. 접두사 순서가 표현하는 것은?

What does prefix order represent?

- A. 더 긴 시퀀스가 더 많은 관찰 정보를 가짐 / A longer sequence carries more observed information
- B. 정수의 대소 관계 / Integer magnitude
- C. 소스 파일 순서 / Source-file order

> [!success]- 정답과 해설
> **A.** 유한 출력은 무한 출력의 근사다.
>
> EN: Finite outputs approximate an infinite output.

### Q3. 계속의 직관은?

What is the intuition for a continuation?

- A. 현재까지의 로그 / A log of the past
- B. 현재 계산 뒤에 할 일 / What to do after the current computation
- C. 변수의 타입 / A variable's type

> [!success]- 정답과 해설
> **B.** 계속은 미래의 계산 문맥을 함수 값으로 표현한다.
>
> EN: A continuation represents the future computation context as a function.

## 다음 개념으로

도메인 방정식으로 계산 과정을 기술했으니, 다음에는 한 번의 실행 단계를 추론 규칙으로 직접 정의하는 전이 의미론으로 관점을 바꾼다.

**English:** Having described processes denotationally, we next switch to transition semantics, defining one execution step directly by inference rules.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 97–125.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
