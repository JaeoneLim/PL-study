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

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### 인터리빙 (interleaving)

여러 실행 주체의 원자 단계를 각각의 내부 순서는 유지한 채 하나의 전체 순서로 섞어 동시 실행을 모델링하는 방식이다.

> [!example] 엔지니어 관점
> 두 bus master의 transaction이 시간축에서 번갈아 나타나는 모든 합법적 schedule을 열거하는 것과 같다. 실제 병렬 동작을 가능한 직렬 순서들의 집합으로 본다.

**English definition:** A model of concurrency that mixes atomic steps from several participants into one total order while preserving each participant’s internal order.

> [!example] Engineering view
> It is like enumerating every legal schedule in which transactions from two bus masters alternate on a timeline. Real parallel activity is represented by a set of possible serial orders.

### 임계 구역 (critical region)

공유 자원의 일관성을 지키기 위해 다른 경쟁 실행과 섞이지 않고 원자적으로 수행되어야 하는 코드 구간이다.

> [!example] 엔지니어 관점
> 공유 control register의 read-modify-write가 다른 master의 접근 사이에 끼어들지 못하도록 bus lock을 거는 구간과 같다.

**English definition:** A section of code that must execute atomically, without interleaving with competitors, to preserve a shared resource’s consistency.

> [!example] Engineering view
> It is like locking a bus around a shared control-register read–modify–write so another master cannot intervene between the read and write.

### 상호 배제 (mutual exclusion)

한 시점에 최대 하나의 실행 주체만 특정 임계 구역에 들어갈 수 있다는 안전 성질이다.

> [!example] 엔지니어 관점
> one-hot grant가 보장되어 두 master가 동시에 단일-port SRAM을 구동하지 않는 조건이다. 누군가 언젠가 grant를 받는다는 공정성과는 별개다.

**English definition:** A safety property stating that at most one participant can occupy a particular critical region at any time.

> [!example] Engineering view
> It is the one-hot-grant condition preventing two masters from driving a single-port SRAM simultaneously. It is separate from fairness, which concerns eventual service.

### 교착 (deadlock)

둘 이상의 실행 주체가 서로가 가진 자원이나 사건을 기다려 어느 쪽도 다음 단계로 갈 수 없는 상태다.

> [!example] 엔지니어 관점
> master A가 lock X를 잡고 Y를 기다리며, master B가 Y를 잡고 X를 기다리는 순환 대기와 같다. 단순히 오래 걸리는 상태와 구분해야 한다.

**English definition:** A state where two or more participants wait on resources or events held by one another, so none can take a next step.

> [!example] Engineering view
> It is the circular wait where master A holds lock X and waits for Y while master B holds Y and waits for X. This differs from a merely slow state.

### 공정성 (fairness)

계속 실행 가능하거나 반복해서 요청하는 참여자가 scheduler에 의해 영원히 무시되지 않는다는 실행 가정이다.

> [!example] 엔지니어 관점
> round-robin arbiter가 지속되는 request에 결국 grant를 준다는 보장과 같다. mutual exclusion은 동시에 둘을 허용하지 않는 안전이고, 공정성은 starvation을 막는 진행 조건이다.

**English definition:** An assumption that a participant which remains enabled, or requests repeatedly, is not ignored forever by the scheduler.

> [!example] Engineering view
> It is the guarantee that a round-robin arbiter eventually grants a persistent request. Mutual exclusion is safety; fairness is the progress condition that prevents starvation.

### 말더듬/뭉개기 (stuttering/mumbling)

말더듬은 관찰상 변화 없는 단계를 trace에 추가하는 것이고, 뭉개기는 여러 내부 단계를 하나의 큰 단계로 합치는 것이다.

> [!example] 엔지니어 관점
> waveform에 idle cycle을 더 넣어도 protocol 의미가 같다고 보거나, 여러 micro-operation을 하나의 architectural transaction으로 묶어 보는 추상화와 같다.

**English definition:** Stuttering inserts steps with no observable change into a trace; mumbling combines several internal steps into one larger step.

> [!example] Engineering view
> It resembles treating extra idle cycles as protocol-equivalent, or abstracting several micro-operations into one architectural transaction.

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 공유 저장소에서 명령들이 뒤섞여 실행될 때 상호 배제, 데드락, 공정성, 관찰 동치를 어떻게 정의하는지 다룬다.
>
> **English:** Explains mutual exclusion, deadlock, fairness, and observational equivalence when commands interleave over a shared store.

### §8.1 · 병렬 합성과 인터리빙

C₁ ∥ C₂는 어느 쪽의 다음 원자 단계도 선택할 수 있다. 가능한 실행은 각 구성요소의 순서를 보존하면서 서로 섞인 전이 경로다.

**English — Parallel composition and interleaving:** In C₁ ∥ C₂, either component may take the next atomic step. Executions are interleavings that preserve each component’s local order.

### §8.2–8.3 · 임계 구역과 상호 배제

공유 불변식을 깨뜨릴 수 있는 코드 조각을 원자적으로 보호한다. 조건부 임계 구역은 가드가 참일 때만 진입하며 상호 배제와 대기를 함께 표현한다.

**English — Critical regions and mutual exclusion:** Code that could violate a shared invariant is protected atomically. Conditional critical regions combine mutual exclusion with waiting until a guard holds.

### §8.4–8.5 · 데드락과 공정성

데드락은 종료하지 않았지만 아무 전이도 없는 전역 상태다. 공정성은 계속 가능하거나 반복 가능해지는 구성요소가 영원히 선택에서 배제되지 않도록 실행 경로를 제한한다.

**English — Deadlock and fairness:** Deadlock is a nonterminal global state with no transition. Fairness restricts paths so a component that remains or repeatedly becomes enabled is not postponed forever.

### §8.6 · 재개를 이용한 병렬 의미

각 명령의 가능한 다음 단계와 나머지 행동을 재개 나무로 표현한 뒤, 두 나무를 섞어 병렬 실행의 선택 구조를 만든다.

**English — Resumption semantics for parallelism:** Each command’s possible next steps and residual behavior form a resumption tree; combining two trees constructs the choices of a parallel execution.

### §8.7 · 전이 흔적

흔적은 외부에서 보이는 상태 변화의 연속으로 프로그램을 비교한다. 중간 상태를 포함하면 간섭 가능성과 원자성 경계가 드러난다.

**English — Transition traces:** Traces compare programs by sequences of externally visible state changes. Intermediate states expose interference opportunities and atomicity boundaries.

### §8.8 · 머뭇거림과 뭉개짐

내부적으로 아무 변화가 없는 단계를 삽입하는 stuttering과 연속 내부 단계를 하나로 합치는 mumbling 아래에서 닫힌 흔적 의미를 사용해 관찰 세분화 차이를 제거한다.

**English — Stuttering and mumbling:** Trace sets are closed under inserting unchanged steps (stuttering) and combining adjacent internal steps (mumbling), abstracting from irrelevant granularity.

## 반드시 남겨야 할 핵심

- 병렬 정확성은 각 스레드의 단독 정확성만으로 얻어지지 않는다. 간섭을 함께 분석해야 한다.
  - EN: Parallel correctness does not follow from isolated thread correctness; interference must be analyzed.
- 안전성은 나쁜 일이 일어나지 않음을, 생존성은 좋은 일이 결국 일어남을 말한다.
  - EN: Safety says bad things never happen; liveness says good things eventually happen.
- 공정성은 프로그램 코드가 아니라 허용할 스케줄에 대한 semantic 가정이다.
  - EN: Fairness is a semantic assumption about admitted schedules, not merely a property of program text.

> [!warning] 자주 생기는 혼동
> - 원자성의 단위를 명시하지 않으면 가능한 인터리빙 집합이 결정되지 않는다.
>   - EN: Without an explicit atomicity granularity, the set of possible interleavings is undefined.
> - 데드락 없음이 기아 없음이나 공정성을 자동으로 보장하지 않는다.
>   - EN: Freedom from deadlock does not automatically guarantee freedom from starvation or fairness.

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
> trace semantics이 최종 상태 집합보다 병렬 합성에 유리한 이유는?

### English companion

Transition traces record state pairs around program steps and make environmental interference compositional.

Stuttering inserts a step with no observable change; mumbling combines adjacent internal steps. Closure under both abstractions makes component meanings stable and compositional in parallel contexts.

## 자체 점검 퀴즈

### Q1. 상호 배제는 어떤 종류의 성질인가?

What kind of property is mutual exclusion?

- A. 안전성 / Safety
- B. 종료 시간 / Runtime complexity
- C. syntax 성질 / Syntax

> [!success]- 정답과 해설
> **A.** 나쁜 동시 진입 상태가 결코 일어나지 않음을 말한다.
>
> EN: It says a bad simultaneous-entry state never occurs.

### Q2. 공정성이 주로 제한하는 것은?

What does fairness primarily restrict?

- A. 변수 이름 / Variable names
- B. 스케줄 / Schedules
- C. 타입 constructor / Type constructors

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
