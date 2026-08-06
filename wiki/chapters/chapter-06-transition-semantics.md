---
type: chapter
title: "06. transition semantics"
title_en: "Transition Semantics"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "126–135"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-07-nondeterminism]]"
  - "[[chapter-08-shared-variable-concurrency]]"
  - "[[chapter-09-csp]]"
---

# 06. transition semantics (Transition Semantics)

> [!abstract] 한눈에 보기
> structural operational semantics을 사용해 프로그램 실행을 구성 사이의 한 단계 전이로 정의한다. 실패와 입출력은 종료 구성과 전이 라벨을 확장한다.
>
> **English:** Structural operational semantics defines execution as one-step transitions between configurations. Failure and I/O extend terminal configurations and transition labels.

## 학습 목표

- 구성, 전이, 실행을 구분한다.
  - EN: Distinguish configurations, transitions, and executions.
- 프로그램 syntax별 전이 규칙을 읽고 유도한다.
  - EN: Read and derive syntax-directed transition rules.
- 라벨 있는 전이로 입출력을 표현한다.
  - EN: Represent I/O with labeled transitions.

## 핵심 용어

- **구성 (configuration)**
- **small-step semantics (small-step semantics)**
- **전이 폐쇄 (transition closure)**
- **결정성 (determinacy)**
- **라벨 전이 (labeled transition)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 프로그램 실행을 최종 함수가 아니라 작은 단계들의 관계로 설명하여 중간 상태, 실패, 입출력을 직접 관찰하게 한다.
>
> **English:** Describes execution as a relation of small steps rather than a final function, making intermediate state, failure, and I/O directly observable.

### §6.1 · 구성과 전이 관계

구성은 남은 명령과 현재 상태를 함께 담는다. 한 단계 전이는 한 구성에서 다음 구성으로의 가능한 실행 움직임이다.

**English — Configurations and transitions:** A configuration pairs the command still to execute with the current state. A one-step transition is one possible execution move between configurations.

### §6.2 · 구조적 실행 규칙

대입, 순차 합성, 조건, 반복의 실행을 추론 규칙으로 정의한다. 복합 명령의 단계는 직접 하위 명령의 단계에서 유도되므로 syntax structure를 따른다.

**English — Structural execution rules:** Inference rules define execution of assignment, sequencing, conditionals, and loops. Steps of a compound command are derived from steps of its immediate subcommands.

### §6.3 · 실패 구성

실패는 더 진행할 수 없는 정상 종료와 구별되는 종착 구성이 된다. 주변 규칙은 이 구성을 순차 문맥 밖으로 전파한다.

**English — Failure configurations:** Failure becomes a terminal configuration distinct from normal completion. Context rules propagate it outward through sequencing.

### §6.4 · 입출력 표지 전이

전이에 입력 또는 출력 사건을 붙이면 실행 경로가 관찰 흔적을 생성한다. 외부 환경과의 상호작용을 내부 상태 변경과 분리할 수 있다.

**English — Labeled input/output transitions:** Labeling transitions with input or output events makes execution paths generate observable traces and separates environment interaction from internal state change.

## 반드시 남겨야 할 핵심

- denotational semantics은 전체 결과를, transition semantics은 결과가 만들어지는 과정을 강조한다.
  - EN: Denotational semantics emphasizes whole results; transition semantics emphasizes the process that produces them.
- 실행기는 전이 규칙을 반복 적용하는 것으로 이해할 수 있다.
  - EN: An interpreter can be understood as repeatedly applying transition rules.
- 라벨이 있는 전이는 동시성과 통신에서 관찰 가능한 사건의 기반이 된다.
  - EN: Labeled transitions become the basis for observable events in concurrency and communication.

> [!warning] 자주 생기는 혼동
> - 진행할 규칙이 없는 상태가 항상 정상 종료는 아니다. stuck 상태와 종료를 구분한다.
>   - EN: A configuration with no applicable rule is not necessarily successful; distinguish stuck states from termination.
> - 메타언어의 규칙 적용 순서와 대상 언어의 실행 순서를 혼동하지 않는다.
>   - EN: Do not confuse the metalanguage’s rule application with the object language’s execution order.

## 1단계 — 실행 상태를 구성으로 만들기 — §6.1

비종료 구성은 남은 명령과 상태를, 종료 구성은 결과 상태를 담는다.

한 단계 관계 `γ → γ′`를 반복하면 유한 또는 무한 실행이 된다. 반사·추이 폐쇄 `→*`는 0회 이상의 이동을, 무한 전이열은 발산을 표현한다.

> [!question] 책을 덮고 답해 보기
> `→`와 `→*`가 각각 답하는 질문을 한 문장씩 써 보라.

### English companion

A nonterminal configuration contains the remaining command and state; a terminal configuration is a result state.

Repeating the one-step relation `γ → γ′` yields finite or infinite executions. Its reflexive-transitive closure `→*` represents zero or more steps, while an infinite transition sequence represents divergence.

---

## 2단계 — 규칙으로 인터프리터 읽기 — §6.2

대입과 skip은 즉시 움직이고, 복합 명령은 부분 명령의 한 단계를 바깥 문맥으로 올린다.

순차 규칙은 왼쪽 명령이 끝나면 오른쪽으로 넘어가고, 아직 끝나지 않았으면 왼쪽의 한 단계를 전체의 한 단계로 전파한다. 규칙의 적용 가능성이 겹치지 않으면 언어는 결정적이다.

> [!question] 책을 덮고 답해 보기
> `(skip;c,σ)→(c,σ)`와 `c₀`의 내부 단계를 올리는 규칙의 역할 차이는?

### English companion

Assignment and skip move immediately; compound commands lift a subcommand step through an outer context.

Sequencing moves to the right command when the left terminates; otherwise it propagates one left-hand step to the whole command. If applicable rules never conflict, the language is deterministic.

---

## 3단계 — 비정상 종료 전파 — §6.3

실패는 `(abort,σ)`라는 별도 종료 구성을 만들고 복합 syntax은 이를 바깥으로 전파한다.

정상 상태만 전제로 한 기존 규칙에 실패 전파 규칙을 추가해야 한다. 이 작업은 새 효과를 언어에 넣을 때 기존 모든 평가 문맥을 다시 점검해야 함을 보여 준다.

> [!question] 책을 덮고 답해 보기
> 순차 구성에서 앞 명령이 실패하면 뒤 명령을 실행하면 안 되는 이유를 규칙으로 표현하라.

### English companion

Failure produces a distinct terminal configuration `(abort,σ)`, which compound constructs propagate outward.

Rules written only for normal states need companion abort-propagation rules. This illustrates why adding an effect requires auditing every existing evaluation context.

---

## 4단계 — 관찰을 전이에 라벨링 — §6.4

침묵 전이와 입력 `?n`, 출력 `!n` 전이를 구분하면 실행 흔적이 외부 상호작용을 기록한다.

입력은 환경이 고른 n마다 가능한 전이를 만들고, 출력은 현재 식 값으로 라벨이 결정된다. 복합 명령 규칙은 부분 명령의 라벨을 그대로 보존해야 한다.

> [!question] 책을 덮고 답해 보기
> 출력 전이가 상태 변경 없이도 의미 있는 이유는?

### English companion

Distinguishing silent transitions from input `?n` and output `!n` transitions records external interaction in an execution trace.

Input permits a transition for every n supplied by the environment; output determines its label from the current expression value. Compound-command rules must preserve the subcommand label.

## 자체 점검 퀴즈

### Q1. small-step semantics의 기본 판단은?

What is the basic judgment of small-step semantics?

- A. 한 구성이 한 단계 뒤 어떤 구성으로 가는가 / Which configuration follows in one step
- B. 프로그램의 타입은 무엇인가 / What type a program has
- C. 최종 값만 무엇인가 / Only what the final value is

> [!success]- 정답과 해설
> **A.** 다단계 실행은 한 단계 관계의 반복으로 얻는다.
>
> EN: Multi-step execution is built by iterating the one-step relation.

### Q2. 결정적 transition semantics에서 가능한 다음 구성의 수는?

In deterministic transition semantics, how many next configurations are possible?

- A. 항상 무한 개 / Always infinitely many
- B. 최대 하나 / At most one
- C. 정확히 두 개 / Exactly two

> [!success]- 정답과 해설
> **B.** 한 비종료 구성에서 서로 다른 두 다음 단계가 없어야 한다.
>
> EN: A nonterminal configuration cannot have two distinct next steps.

### Q3. 입출력 라벨의 목적은?

What is the purpose of I/O labels?

- A. 외부 관찰 사건을 전이열에 보존 / Preserve external observations in the transition sequence
- B. 변수 범위를 정함 / Determine variable scope
- C. 루프를 최적화 / Optimize loops

> [!success]- 정답과 해설
> **A.** 상태 변화만으로 보이지 않는 상호작용을 기록한다.
>
> EN: They record interactions invisible in state changes alone.

## 다음 개념으로

전이가 함수가 아닌 관계가 되도록 허용하면 여러 가능한 실행을 갖는 비결정적 언어를 설명할 수 있다.

**English:** Allowing transition to be a relation rather than a function opens the door to nondeterministic languages with many possible executions.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 126–135.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
