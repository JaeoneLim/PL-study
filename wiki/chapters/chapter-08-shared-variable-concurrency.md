---
type: chapter
title: "08. 공유 변수 동시성"
title_en: "Shared-Variable Concurrency"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "155–180"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-06-transition-semantics]]"
  - "[[chapter-07-nondeterminism]]"
  - "[[chapter-09-csp]]"
---

# 08. 공유 변수 동시성 (Shared-Variable Concurrency)

> [!abstract] 한눈에 보기
> 병렬 구성의 인터리빙 의미를 출발점으로 임계 구역, 상호 배제, 교착, 공정성, 재개 의미, 전이 흔적을 다룬다.
>
> **English:** Starting from interleaving semantics for parallel composition, the chapter studies critical regions, mutual exclusion, deadlock, fairness, resumptions, and transition traces.

## 학습 목표

- 원자적 단계와 가능한 인터리빙을 열거한다.
  - EN: Enumerate atomic steps and possible interleavings.
- 상호 배제·교착 없음·공정성을 구분한다.
  - EN: Distinguish mutual exclusion, deadlock freedom, and fairness.
- 전이 흔적에서 stuttering과 mumbling의 역할을 설명한다.
  - EN: Explain stuttering and mumbling in transition traces.

## 핵심 용어

- **인터리빙 (interleaving)**
- **임계 구역 (critical region)**
- **상호 배제 (mutual exclusion)**
- **교착 (deadlock)**
- **공정성 (fairness)**
- **말더듬/뭉개기 (stuttering/mumbling)**

## 1단계 — 병렬 실행을 인터리빙으로 — §8.1

각 프로세스는 한 번에 한 원자적 전이를 수행하며 스케줄러가 순서를 비결정적으로 고른다.

`c₀ ‖ c₁`의 규칙은 어느 한쪽의 단계를 전체 병렬 구성의 단계로 올린다. 실제 동시 수행을 모든 허용된 순차 인터리빙의 집합으로 추상화한다.

> [!question] 책을 덮고 답해 보기
> 두 프로세스가 각각 두 번 대입할 때 원자적 대입만 가정하면 가능한 순서 수를 생각해 보라.

### English companion

Each process performs one atomic transition at a time, with the scheduler choosing the order nondeterministically.

Rules for `c₀ ‖ c₁` lift a step from either side to the entire parallel command. True simultaneity is abstracted as the set of all allowed sequential interleavings.

---

## 2단계 — 원자성과 접근 제어 — §8.2–8.4

임계 구역은 공유 상태에 대한 복합 동작을 원자적으로 만들고 조건부 임계 구역은 진입 조건까지 결합한다.

상호 배제는 동시에 둘이 임계 구역에 있지 않다는 안전성이고, 교착 없음은 일부 프로세스가 계속 진행할 수 있다는 진행 성질이다. 하나가 다른 하나를 자동으로 보장하지 않는다.

> [!question] 책을 덮고 답해 보기
> 두 락을 반대 순서로 잡는 프로그램은 상호 배제를 지키면서도 어떻게 교착하는가?

### English companion

Critical regions make compound shared-state actions atomic; conditional critical regions also guard entry.

Mutual exclusion is the safety property that two processes are never simultaneously in a critical region. Deadlock freedom is a progress property. Neither automatically implies the other.

---

## 3단계 — 가능한 실행에서 공정한 실행으로 — §8.5

공정성은 영원히 기회가 있는 프로세스가 무한히 무시되지 않도록 스케줄을 제한한다.

약한 공정성과 강한 공정성은 '계속 활성'과 '무한히 자주 활성'을 다르게 다룬다. 공정성은 프로그램 코드가 아니라 스케줄 가정이므로 명세에 명시해야 한다.

> [!question] 책을 덮고 답해 보기
> 어떤 명령이 무한히 자주 활성화되지만 매번 곧 비활성화된다면 약한 공정성만으로 실행이 보장되는가?

### English companion

Fairness restricts schedules so that a process with continuing opportunities is not ignored forever.

Weak and strong fairness differ over continuously enabled versus infinitely often enabled actions. Fairness is an assumption about scheduling, not just program text, and must be stated in a specification.

---

## 4단계 — 환경 간섭을 포함한 합성적 흔적 — §8.6–8.8

전이 흔적은 프로그램 단계 사이의 상태 쌍을 기록하고 환경의 간섭을 조합 가능하게 만든다.

stuttering은 관찰 가능한 변화가 없는 단계를 삽입하고, mumbling은 인접한 내부 단계를 합친다. 이 닫힘 조건은 구성요소 의미를 병렬 문맥에서도 안정적으로 조합하기 위한 추상화다.

> [!question] 책을 덮고 답해 보기
> 흔적 의미론이 최종 상태 집합보다 병렬 합성에 유리한 이유는?

### English companion

Transition traces record state pairs around program steps and make environmental interference compositional.

Stuttering inserts a step with no observable change; mumbling combines adjacent internal steps. Closure under both abstractions makes component meanings stable and compositional in parallel contexts.

## 자체 점검 퀴즈

### Q1. 상호 배제는 어떤 종류의 성질인가?

What kind of property is mutual exclusion?

- A. 안전성 / Safety
- B. 종료 시간 / Runtime complexity
- C. 구문 성질 / Syntax

> [!success]- 정답과 해설
> **A.** 나쁜 동시 진입 상태가 결코 일어나지 않음을 말한다.
>
> EN: It says a bad simultaneous-entry state never occurs.

### Q2. 공정성이 주로 제한하는 것은?

What does fairness primarily restrict?

- A. 변수 이름 / Variable names
- B. 스케줄 / Schedules
- C. 타입 생성자 / Type constructors

> [!success]- 정답과 해설
> **B.** 가능한 인터리빙 중 부당한 기아 실행을 제외한다.
>
> EN: It excludes unfair starvation schedules from possible interleavings.

### Q3. mumbling의 직관은?

What is the intuition behind mumbling?

- A. 인접 내부 단계를 한 단계로 추상화 / Abstract adjacent internal steps as one
- B. 무한 루프 삽입 / Insert an infinite loop
- C. 모든 상태 삭제 / Delete all states

> [!success]- 정답과 해설
> **A.** 내부 세부 단계의 경계를 관찰 불가능한 것으로 본다.
>
> EN: It treats boundaries between internal detail steps as unobservable.

## 다음 개념으로

공유 메모리를 제거하고 통신 사건 자체를 동기화 지점으로 삼으면 CSP 스타일의 메시지 전달 동시성으로 이동한다.

**English:** Removing shared memory and using communication events as synchronization points leads to CSP-style message-passing concurrency.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 155–180.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
