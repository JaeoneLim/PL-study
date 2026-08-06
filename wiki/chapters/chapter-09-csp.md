---
type: chapter
title: "09. 통신 순차 프로세스"
title_en: "Communicating Sequential Processes"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "181–193"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-06-transition-semantics]]"
  - "[[chapter-07-nondeterminism]]"
  - "[[chapter-08-shared-variable-concurrency]]"
---

# 09. 통신 순차 프로세스 (Communicating Sequential Processes)

> [!abstract] 한눈에 보기
> 프로세스가 채널의 동기식 입력·출력으로만 상호작용하는 CSP식 언어를 정의하고, 통신 전이·교착·공정성을 분석한다.
>
> **English:** A CSP-like language lets processes interact only through synchronous channel input and output, enabling analysis of communication transitions, deadlock, and fairness.

## 학습 목표

- 동기식 rendezvous 규칙을 유도한다.
  - EN: Derive the synchronous rendezvous rule.
- 통신 구조에서 교착 순환을 찾는다.
  - EN: Find deadlock cycles in communication structure.
- 공유 변수와 메시지 전달의 관찰 모델을 비교한다.
  - EN: Compare shared-variable and message-passing observation models.

## 핵심 용어

- **CSP (communicating sequential processes)**
- **랑데부 (rendezvous)**
- **채널 (channel)**
- **동기식 통신 (synchronous communication)**
- **통신 교착 (communication deadlock)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 공유 변수 대신 동기적 통신으로 프로세스를 결합하고, 통신 가능성·데드락·공정성을 사건 중심으로 분석한다.
>
> **English:** Composes processes through synchronous communication instead of shared variables and analyzes communication, deadlock, and fairness through events.

### §9.1–9.2 · 프로세스 syntax과 동기 전이

입력·출력 가드와 병렬 프로세스를 정의한다. 대응하는 송신과 수신이 동시에 준비될 때 하나의 통신 전이가 일어나며 값 전달과 두 프로세스의 진행이 함께 발생한다.

**English — Process syntax and synchronized transitions:** Defines input/output guards and parallel processes. A communication transition occurs only when matching send and receive actions are ready, transferring a value and advancing both sides.

### §9.3 · 언어 설계 제한의 선택

채널 연결 형태, 한 채널의 송수신자 수, 가드 안 명령 허용 범위를 제한하면 구현과 추론은 단순해지지만 표현력도 달라진다.

**English — Choosing language restrictions:** Restricting channel topology, numbers of senders and receivers, or commands inside guards simplifies implementation and reasoning while changing expressive power.

### §9.4 · 통신 프로토콜 예제

파이프라인, 버퍼, 반복 서버 같은 예에서 프로세스 내부 상태와 외부 메시지 순서를 분리해 설계한다. 채널 방향과 종료 프로토콜이 전체 동작을 결정한다.

**English — Communication protocol examples:** Pipelines, buffers, and repeated servers separate private process state from external message order. Channel direction and termination protocol determine global behavior.

### §9.5–9.6 · 통신 데드락과 공정성

모든 프로세스가 맞지 않는 통신을 기다리면 데드락이다. 여러 통신이 가능한 반복 선택에서는 특정 파트너가 영원히 무시되지 않도록 공정성 조건을 구분한다.

**English — Communication deadlock and fairness:** Deadlock occurs when every process waits for unmatched communication. Repeated choices among enabled communications require fairness conditions so a partner is not ignored forever.

## 반드시 남겨야 할 핵심

- CSP의 핵심 관찰은 메모리 셀이 아니라 프로세스 사이의 통신 사건이다.
  - EN: CSP’s central observations are communication events between processes, not shared memory cells.
- 동기 통신은 데이터 전달과 제어 동기화를 한 사건으로 결합한다.
  - EN: Synchronous communication combines data transfer and control synchronization in one event.
- 프로세스의 지역적 진행 가능성이 전체 시스템의 진행 가능성을 뜻하지 않는다.
  - EN: Local readiness of processes does not imply global system progress.

> [!warning] 자주 생기는 혼동
> - 비동기 메시지 큐 모델을 이 장의 동기 rendezvous 모델과 섞지 않는다.
>   - EN: Do not mix an asynchronous message-queue model with this chapter’s synchronous rendezvous model.
> - 통신 값뿐 아니라 통신 순서와 상대 프로세스도 관찰의 일부다.
>   - EN: The order and partner of communications matter, not only the transmitted values.

## 1단계 — 통신을 가드로 사용 — §9.1

입력과 출력은 상대 프로세스가 맞는 동작을 준비했을 때만 함께 진행한다.

프로세스는 로컬 상태를 갖고 채널 사건으로 동기화한다. 통신 가드를 가진 선택은 상대방의 준비 상태까지 활성 여부에 포함하므로 스케줄과 통신 가능성이 결합된다.

> [!question] 책을 덮고 답해 보기
> 버퍼 없는 채널에서 출력 프로세스만 준비된 경우 왜 전이할 수 없는가?

### English companion

An input and output proceed together only when matching processes are both ready.

Processes have local state and synchronize through channel events. A communication-guarded choice is enabled only when a partner is ready, coupling scheduling with communication availability.

---

## 2단계 — 두 로컬 단계를 하나의 통신 전이로 — §9.2

한쪽의 `h!e`와 다른 쪽의 `h?v`가 만나면 값 전달과 수신 상태 갱신이 하나의 전체 전이가 된다.

채널 이름과 방향이 맞아야 하고 표현식은 송신자 상태에서 평가된다. 개별 통신은 단독 전이가 없으며 병렬 구성 규칙이 상보적 동작을 동시에 소비한다.

> [!question] 책을 덮고 답해 보기
> 전달되는 값은 송신자 상태와 수신자 상태 중 어디에서 계산되어야 하는가?

### English companion

Matching `h!e` and `h?v` actions combine into one global transition that transfers a value and updates the receiver.

Channel and direction must match, and the expression is evaluated in the sender's state. Neither communication has an independent step; the parallel rule consumes complementary actions together.

---

## 3단계 — 프로토콜을 프로세스로 분해 — §9.3–9.4

파이프라인, 필터, 중계 프로세스는 채널 토폴로지로 데이터 흐름과 동기화를 함께 표현한다.

가능한 제한은 채널 연결·입출력 방향·가드 형태를 단순화해 정적 분석을 돕는다. 예제는 작은 순차 구성요소가 통신 규약을 통해 전체 동작을 만든다는 점을 보여 준다.

> [!question] 책을 덮고 답해 보기
> 파이프라인 중간 단계가 입력 후 출력을 기다릴 때 backpressure가 어떻게 생기는가?

### English companion

Pipelines, filters, and relay processes use channel topology to express both dataflow and synchronization.

Restrictions on connectivity, direction, and guarded forms simplify static analysis. The examples show how small sequential components combine through a protocol into global behavior.

---

## 4단계 — 교착과 공정성 분리 — §9.5–9.6

교착은 맞물릴 통신이 전혀 없는 상태이고, 불공정성은 가능한 통신이 계속 선택되지 않는 실행이다.

대기 그래프의 순환은 교착 후보를 드러내지만 모든 순환이 실제 교착인 것은 아니다. 공정성은 가능한 rendezvous의 장기 선택에 대한 추가 가정이다.

> [!question] 책을 덮고 답해 보기
> 가능한 통신이 하나 있는데 다른 통신만 무한히 선택되는 경우는 교착인가 기아인가?

### English companion

Deadlock is a state with no matching communication; unfairness is an execution that repeatedly ignores an available communication.

Cycles in a wait-for graph expose deadlock candidates, though not every cycle is an actual deadlock. Fairness is an additional assumption about the long-run selection of possible rendezvous events.

## 자체 점검 퀴즈

### Q1. 동기식 채널 출력이 완료되는 시점은?

When does a synchronous channel output complete?

- A. 송신자가 값을 계산한 즉시 / As soon as the sender computes the value
- B. 맞는 수신자가 동시에 참여할 때 / When a matching receiver participates
- C. 타이머가 끝날 때 / When a timer expires

> [!success]- 정답과 해설
> **B.** rendezvous는 송수신 양쪽의 공동 전이다.
>
> EN: A rendezvous is a joint sender-receiver transition.

### Q2. CSP에서 주된 동기화 수단은?

What is the main synchronization mechanism in CSP?

- A. 공유 변수 잠금 / Shared-variable locks
- B. 채널 통신 / Channel communication
- C. 타입 추론 / Type inference

> [!success]- 정답과 해설
> **B.** 통신 사건이 데이터 전달과 동기화를 동시에 수행한다.
>
> EN: Communication events transfer data and synchronize at once.

### Q3. 교착과 기아의 차이는?

How do deadlock and starvation differ?

- A. 교착은 진행 가능한 전이가 없고, 기아는 있지만 특정 참여자가 계속 제외됨 / Deadlock has no possible progress; starvation has progress but indefinitely excludes a participant
- B. 둘은 완전히 같다 / They are identical
- C. 기아는 syntax error다 / Starvation is a syntax error

> [!success]- 정답과 해설
> **A.** 시스템 전체의 정지와 개별 진행의 부재를 구분한다.
>
> EN: It separates global inability to move from individual lack of progress.

## 다음 개념으로

명령형 계산과 동시성을 마친 뒤, 책은 상태를 없애고 함수 적용과 치환만으로 계산을 설명하는 람다 계산으로 전환한다.

**English:** After imperative computation and concurrency, the book removes state and turns to the lambda calculus, where application and substitution explain computation.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 181–193.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
