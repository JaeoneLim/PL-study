---
type: chapter
title: "05. Failure, Input-Output, and Continuations"
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

# 05. Failure, Input-Output, and Continuations

> [!abstract] At a glance
> 실패와 중간 입출력을 추가하면 최종 상태 하나만으로는 동작을 설명할 수 없다. 시퀀스·재개·재귀 도메인·continuation semantics으로 관찰 가능한 실행 과정을 모델링한다.
>
> **English:** Failure and intermediate I/O cannot be described by one final state. Sequences, resumptions, recursive domains, and continuation semantics model the observable course of execution.

## Learning objectives

- 정상 종료, 실패, 비종료를 구분하는 결과 도메인을 읽는다.
  - EN: Read result domains that distinguish normal termination, failure, and divergence.
- 유한 관찰과 연속성의 물리적 논증을 설명한다.
  - EN: Explain the physical argument from finite observation to continuity.
- direct semantics과 continuation semantics의 정보 흐름을 비교한다.
  - EN: Compare information flow in direct and continuation semantics.

## Key terms

- **sequence domain**
- **recursive domain isomorphism**
- **resumption**
- **continuation**
- **continuation-passing style**

## Chapter glossary

> [!info] How to use analogies
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### sequence domain

유한 또는 무한한 관찰 순서를 원소로 삼고, 짧은 prefix가 긴 실행의 근사가 되도록 순서를 둔 도메인이다.

> [!example] Engineering view
> logic analyzer trace를 앞의 10사이클, 100사이클, 계속된 전체 trace 순으로 점점 더 많이 아는 것으로 보는 방식이다. 비종료 실행도 무한 trace로 표현할 수 있다.

**English definition:** A domain whose elements are finite or infinite observation sequences, ordered so that a shorter prefix approximates a longer execution.

> [!example] Engineering view
> Think of knowing a logic-analyzer trace for 10 cycles, then 100 cycles, then the entire ongoing trace. An infinite trace can represent a nonterminating interaction.

### recursive domain isomorphism

정의하려는 의미 공간이 자기 자신을 포함하는 방정식의 해라는 뜻이다. 펼쳤다가 다시 접을 수 있는 구조적 대응으로 재귀 데이터를 엄밀히 만든다.

> [!example] Engineering view
> linked-list 노드 타입이 payload와 다음 노드 포인터를 포함하는 것과 비슷하다. 여기서는 단순 주소 대신 수학적 공간 자체가 재귀 방정식을 만족한다.

**English definition:** A meaning space defined as a solution to an equation that contains the space itself. A structural correspondence for unfolding and folding makes recursive data precise.

> [!example] Engineering view
> It resembles a linked-list node type containing a payload and a pointer to another node. Here, the mathematical space itself satisfies a recursive equation.

```text
D ≅ F(D)
```

### resumption

입출력 하나를 내보낸 뒤 환경의 응답에 따라 계산을 이어 가는 나머지 동작을 담은 재귀적 의미 구조다.

> [!example] Engineering view
> 버스 요청을 낸 뒤 응답 데이터에 따라 다음 상태로 이동하는 정지된 FSM 상태와 닮았다. 단순 결과가 아니라 상호작용 후 계속할 방법까지 보존한다.

**English definition:** A recursive semantic structure that emits one interaction and contains the remaining computation to resume after the environment responds.

> [!example] Engineering view
> It resembles a paused FSM after issuing a bus request, with the next state determined by response data. It stores how to continue, not just a final result.

### continuation

현재 계산이 값을 만든 뒤 수행할 나머지 계산을 함수나 데이터로 나타낸 것이다.

> [!example] Engineering view
> 파이프라인 단계가 결과와 함께 다음 단계의 destination과 제어 정보를 넘기거나, CPU가 return address를 보관하는 것과 비슷하다.

**English definition:** A representation, as a function or data structure, of the rest of the computation to perform after the current computation produces a value.

> [!example] Engineering view
> It resembles a pipeline stage forwarding destination/control metadata with its result, or a CPU saving a return address that says where execution continues.

```text
k : Result → Answer
```

### continuation-passing style

함수가 결과를 직접 반환하지 않고, 그 결과를 받을 계속 함수를 명시적 인수로 받아 호출하는 프로그램 형태다.

> [!example] Engineering view
> 모듈이 출력값만 반환하는 대신 `done` 핸드셰이크와 다음 처리 블록을 명시적으로 구동하도록 인터페이스를 바꾼 것과 닮았다. 제어 흐름이 데이터 경로처럼 드러난다.

**English definition:** A program form in which a function does not return directly; instead it receives an explicit continuation function and calls it with the result.

> [!example] Engineering view
> It resembles changing a module interface so that it explicitly drives a `done` handshake and the next processing stage instead of merely returning a value. Control flow becomes explicit like a datapath.

## Detailed chapter map

> [!abstract] This chapter's role
> 종료 상태 하나로는 설명할 수 없는 실패·중간 출력·입력을 모델링하고, 계속과 재개가 복잡한 제어를 어떻게 통일하는지 보인다.
>
> **English:** Models failure, intermediate output, and input—effects a single final state cannot express—and shows how continuations and resumptions unify complex control.

### §5.1 · Failure as a distinct result

fail은 정상 종료나 비종료와 다른 관찰이다. 의미 결과에 실패 표식을 추가하고, 순차 합성이 실패 이후 계산을 실행하지 않도록 전파 규칙을 정한다.

**English — Failure as a distinct result:** Failure is observable apart from normal termination and divergence. The result domain gains a failure case, and sequencing propagates failure without running the remainder.

### §5.2–5.3 · Intermediate output and the physical case for continuity

출력은 유한 또는 무한 관찰 시퀀스로 나타난다. 유한 시간에 얻는 정보는 유한 입력 정보에만 의존해야 한다는 계산 가능성 직관이 연속성 요구를 뒷받침한다.

**English — Intermediate output and the physical case for continuity:** Output is represented by finite or infinite observation sequences. The idea that finite-time output depends only on finite input information motivates semantic continuity.

### §5.4–5.5 · Products, sums, and recursive domain equations

여러 결과 성분은 곱으로, 대안 결과는 태그 있는 합으로 조립한다. 자기 참조하는 상호작용 구조는 도메인 동형 방정식의 최소 해로 구성한다.

**English — Products, sums, and recursive domain equations:** Products combine result components; tagged sums represent alternatives. Self-referential interaction structures are constructed as solutions to recursive domain isomorphisms.

### §5.6 · Input and resumptions

입력을 요청한 계산은 끝난 것이 아니라 가능한 각 입력에 대한 다음 계산을 기다린다. 재개는 출력, 입력 요청, 종료를 단계적으로 담는 나무형 의미다.

**English — Input and resumptions:** A computation requesting input has not finished; it awaits a continuation for each possible input. A resumption is a tree-like meaning containing output, input requests, and termination step by step.

### §5.7 · Continuation semantics

command는 continuation과 initial state를 받아 전체 계산의 결과를 만든다. 순차 구성은 뒤 command로 만든 continuation을 앞 command에 넘기며, while은 고정된 continuation 아래에서 least fixed point로 해석한다.

**English — Continuation semantics:** A command accepts a continuation and an initial state to produce the whole computation's result. Sequencing passes the continuation built from the second command to the first; while uses a least fixed point with its continuation fixed.

### §5.8 · Two continuations and effect extensions

output과 input은 resumption constructor로 표현한다. fail이 normal continuation을 건너뛰어도 local variable을 복원하도록 normal continuation과 failure continuation을 분리하고, local declaration이 양쪽을 모두 감싼다.

**English — Two continuations and effect extensions:** Output and input use resumption constructors. Separate normal and failure continuations let local declarations restore variables on both exits, even when fail bypasses the normal continuation.

## What to retain

- 관찰 가능한 효과가 늘 때마다 단순 state-transformer semantics의 결과형이 부족해진다.
  - EN: Each new observable effect exposes missing structure in plain state-transformer semantics.
- 재개는 상호작용의 가능한 미래를 데이터 구조로, 계속은 남은 계산을 함수로 나타낸다.
  - EN: Resumptions represent possible interactive futures as data; continuations represent the remaining computation as a function.
- continuity는 유한 시간의 output이 유한 input 정보로 정당화되어야 한다는 조건이다. 연속이라는 사실만으로 유한 프로그램에 의한 computability가 보장되지는 않는다.
  - EN: Continuity requires finite-time output to be justified by finite input information. Continuity alone does not guarantee computability by a finite program.

> [!warning] Common confusions
> - fail, 비종료, 산술 오류를 모두 같은 ⊥로 합치면 필요한 관찰을 잃는다.
>   - EN: Collapsing failure, divergence, and arithmetic error into one bottom loses required observations.
> - 계속은 단순한 함수 호출 스택이 아니라 관찰하려는 나머지 계산의 의미다.
>   - EN: A continuation is not merely a runtime call stack; it is the semantic rest of the computation being observed.

# Chapter 5 complete study text (60 MIN READ)

이 독립 학습 본문은 failure, intermediate output, intermediate input을 더할 때 command의 관찰 대상이 어떻게 바뀌는지 추적한다. 처음에는 실행의 마지막 state만 필요했지만, 이제 종료 방식과 이미 전달된 output, 앞으로 받을 input에 따른 행동까지 설명해야 한다. 따라서 언어의 기능 하나를 추가하는 일은 equation 한 줄을 늘리는 데 그치지 않는다. 어떤 차이를 보존할지 먼저 정하고, 그 차이를 담을 domain을 고른 다음, sequencing과 local variable의 규칙을 다시 검토한다.

§§5.1–5.8의 모든 주제를 다루되 교재 문장을 옮기거나 기존 문제를 번역하지 않는다. 아래의 장부, 센서, 작업 경계 예시는 이 본문을 위해 새로 구성했으며, 계산 결과와 반례를 함께 제공한다. 수식은 추론을 확인할 수 있도록 정확히 적고 한국어 본문에서도 state, bottom, predomain, resumption, continuation 같은 canonical technical term을 유지한다. section별 예상 시간에는 손으로 equation을 전개하고 checkpoint를 풀어 보는 시간이 포함된다.

표기는 다음과 같다. Σ는 integer variable의 state 집합이고 σ[v↦n]은 v만 n으로 바꾼 state다. D⟦c⟧는 direct meaning, C⟦c⟧는 single-continuation meaning, C₂⟦c⟧는 two-continuation meaning이다. E⟦e⟧σ와 B⟦b⟧σ는 각각 integer expression과 Boolean expression의 값을 나타낸다. 이 장에서는 expression 자체가 failure나 I/O를 일으키지 않는다고 가정한다. 함수 공간의 화살표는 domain을 다룰 때 continuous function을 뜻하고, discrete state 집합에서 나가는 함수에는 그 조건이 자동으로 성립한다.

> [!info] English introduction
> This independent lesson tracks how failure and intermediate output and input change what we observe about commands. A final state alone no longer suffices: we need an exit mode, irreversible output, and behavior conditional on future input. Adding a feature therefore requires choosing observations and a suitable domain before revisiting sequencing and locality.
>
> Every topic in §§5.1–5.8 is covered through independent explanations, new examples, and derived answers rather than a translation of the chapter or its exercises. Canonical technical terms remain English in the Korean prose. Section timings include working through equations and checkpoints.
>
> Σ is the set of integer-variable states; σ[v↦n] changes only v. D, C, and C₂ denote direct, single-continuation, and two-continuation command meanings. E and B evaluate integer and Boolean expressions, assumed effect-free here. Function-space arrows between predomains denote continuous functions; functions out of discrete state sets are automatically continuous.

## Failure is an exit, not bottom — §5.1 · pp. 97–100 · 5 min

> [!abstract] Section focus
> 계산이 끝나지 않는 것과 실패하면서 끝나는 것을 먼저 다른 관찰로 분리한다.

창고 검사를 수행하는 command를 생각하자. 검사가 거절되어 fail에 도달하면 담당자는 거절 직전의 장부 state를 읽을 수 있다. 반대로 검사 loop가 영원히 돌면 마지막 장부는 없다. 두 상황을 모두 bottom으로 나타내면 이 차이는 모델에서 사라진다. 여기서 failure는 예외를 잡아 계속하는 일반 exception 전체가 아니라, 뒤의 ordinary command를 건너뛰고 abortive termination을 만드는 특정 control effect다. failure state를 남기는 선택은 뒤에서 local variable을 복원해야 하는 이유가 된다.

Σ̂는 normal state와 abort-tagged state를 서로 겹치지 않게 합친 집합이다. 여기에 새 least element를 추가한 Σ̂⊥가 결과 domain이다. state σ와 (abort,σ)는 저장된 integer가 같아도 다른 결과다. 같은 final store를 남겨도 다음 command로 control을 넘길 수 있는지가 다르기 때문이다. bottom은 이 둘보다 정보가 적지만 failure보다 더 나쁜 숫자나 특별한 store가 아니다. 이 단계의 domain은 모든 non-bottom 원소가 서로 비교되지 않는 flat domain으로 볼 수 있다.

sequencing에서 후속 함수가 아무 입력이나 정상 state로 바꾸게 두면 fail도 사라질 수 있다. 따라서 f 자체가 아니라 extension f*를 앞 command의 결과에 적용한다. 이 extension은 normal state에만 f를 실행하고 failure와 bottom은 그대로 보존한다. 이 정의는 후속 command의 내부를 검사해서 막는 방법이 아니다. 결과의 종류를 보고 control이 실제로 전달되었는지를 한곳에서 판정하는 방법이다. while의 반복 경로에도 똑같은 extension이 필요하다.

### Failure-aware composition

```text
Σ̂ = Σ ⊎ ({abort} × Σ); D⟦fail⟧σ = (abort,σ). D⟦c₀;c₁⟧σ = (D⟦c₁⟧)*(D⟦c₀⟧σ).
```

f:Σ→Σ̂⊥에 대해 normal, abortive, divergent 결과를 각각 처리한다. 아래의 f*는 state를 새로 만드는 cleanup 함수가 아니라 다음 command를 이어 붙이는 extension이다.

> [!example] A rejected update
> x=2에서 `x:=x+4; fail; x:=100`을 실행한다.
>
> 1. 첫 assignment 뒤 σ₁=σ[x↦6]이다. fail의 결과는 (abort,σ₁)이다.
> 2. 마지막 assignment의 extension은 abort tag를 만나므로 호출되지 않는다. 결과는 (abort,σ[x↦6])이다. 반면 `while true do skip; fail`은 bottom이다.
>
> **결론:** failure는 관찰 가능한 종료이고 bottom은 final result의 부재다. 두 경우 모두 다음 command를 실행하지 않지만 같은 결과는 아니다.

> [!question] Retrieval check
> 1. 왜 constant state transformer를 직접 합성하는 것만으로 fail을 보존할 수 없는가?
> 2. x=2에서 rejected update의 exit mode와 final x를 구하고, 마지막 assignment가 실행되지 않는 equation을 쓰라.

### English companion — Failure is an exit, not bottom

*Separate never finishing from finishing by failure before defining composition.*

A rejected warehouse check reaches fail and leaves an inspectable ledger state; an endless check has no final ledger. Identifying both with bottom would erase that observation. Failure here is a particular abortive exit, not a complete language of catchable exceptions. Retaining its state will force us to restore local variables.

Σ̂ consists of disjoint normal and abort-tagged states; lifting adds bottom. σ and (abort,σ) differ even when their stores agree because only the former transfers control to the next command. Bottom is less informative than either, not a special store or a numerical severity level. This result domain is flat.

An unrestricted successor function could overwrite a failure result. Sequencing therefore applies f*, which invokes f only on normal states and preserves both failure and bottom. This is a uniform test of whether control was transferred, not an inspection of the following command. Loop iteration needs the same extension.

### Failure-aware composition

```text
Σ̂ = Σ ⊎ ({abort} × Σ); D⟦fail⟧σ = (abort,σ). D⟦c₀;c₁⟧σ = (D⟦c₁⟧)*(D⟦c₀⟧σ).
```

For f:Σ→Σ̂⊥, distinguish normal, abortive, and divergent arguments. This f* attaches a successor command; it is not a cleanup transformation.

> [!example] A rejected update
> Run `x:=x+4; fail; x:=100` from x=2.
>
> 1. The assignment yields σ₁=σ[x↦6], then fail yields (abort,σ₁).
> 2. The final assignment's extension sees the abort tag and never calls that assignment. The result is (abort,σ[x↦6]); `while true do skip; fail` instead denotes bottom.
>
> **Conclusion:** Failure is an observable exit; bottom is absence of a final result. Both block the successor but remain distinct.

> [!question] Retrieval check
> 1. Why can plain composition with a constant state transformer erase failure?
> 2. Give the rejected update's exit mode and final x from x=2, and identify the equation blocking its last assignment.

---

## Local restoration crosses both exit paths — §5.1 · pp. 99–100 · 5 min

> [!abstract] Section focus
> 다음 command를 건너뛰는 것과 scope를 빠져나갈 때 바깥 값을 복원하는 것은 다른 작업이다.

local declaration의 body가 실패하면 ordinary sequencing은 멈춰야 하지만 local scope의 흔적까지 바깥 state에 남겨서는 안 된다. 바깥 x가 12인데 local x를 3으로 바꾸었다면, body 안에서 보이는 x와 바깥에서 보이는 x는 다른 binding이다. 실패 시 local x의 값이 그대로 final store에 노출되면 local name을 tmp로 바꾼 프로그램과 결과가 달라진다. 이름만 바꾸어도 바깥 변수의 값이 달라지는 모델은 locality를 잘못 표현한다. 이 문제는 normal exit에서만 실행되는 후속 assignment로 해결할 수 없다.

복원 함수 r은 initial state의 바깥 값을 미리 기억하고 final state의 해당 자리만 되돌린다. body가 다른 variable에 남긴 변경은 유지한다. 따라서 이것은 transaction rollback이 아니다. 실패했다고 모든 assignment를 취소하지 않으며 output을 지우지도 않는다. 복원의 범위는 declaration이 가린 binding 하나다. nested declaration에서는 안쪽 scope부터 바깥쪽 scope 순서로 복원이 쌓이고, 마지막에는 각 바깥 binding의 값이 다시 보인다. body가 끝없이 실행되면 final state 자체가 없으므로 복원된 결과도 없다.

이를 위해 f*와 구별되는 r†를 쓴다. r은 Σ에서 Σ로 가는 total state transformation이고, r†는 normal state뿐 아니라 abort pair 안의 state에도 r을 적용한다. tag는 그대로 남는다. 즉 cleanup을 했다고 failure가 성공으로 변하지 않는다. f*는 failure를 통과시키면서 그 안을 건드리지 않고, r†는 failure를 보존하면서 그 안의 store를 바꾼다. 위첨자 모양이 비슷하더라도 함수의 type과 사용 목적을 먼저 확인하면 잘못된 extension을 선택하지 않을 수 있다.

### Restoration equation

```text
rσ,v(τ)=τ[v↦σ(v)]; D⟦newvar v:=e in c⟧σ = rσ,v†(D⟦c⟧(σ[v↦E⟦e⟧σ])).
```

initializer는 declaration 진입 전 σ에서 계산한다. restoration의 기억값 역시 같은 σ(v)다.

> [!example] A local name is not a transaction
> x=12,y=0에서 `newvar x:=3 in (y:=x+2; x:=8; fail)`을 실행한다.
>
> 1. body는 x=8,y=5인 state τ에서 실패한다. τ는 아직 바깥에서 관찰할 final state가 아니다.
> 2. rσ,x†(abort,τ)=(abort,τ[x↦12])이므로 답은 failure, x=12,y=5다. local x를 fresh tmp로 바꾸어도 이 결과가 유지된다.
>
> **결론:** y의 변경은 남고 x의 local 변경만 가려진다. f*를 대신 썼다면 x=8이 새어 나와 renaming을 깨뜨린다.

> [!question] Retrieval check
> 1. 위 body의 fail을 skip으로 바꾸면 final state와 exit tag가 어떻게 바뀌는가?
> 2. local restoration과 transaction rollback의 차이를 y의 final value로 설명하라.

### English companion — Local restoration crosses both exit paths

*Skipping a successor and restoring an outer binding are different operations.*

Failure stops ordinary sequencing but must not leak a local binding into the outer state. With outer x=12 and local x=3, the two x occurrences denote different bindings. Exposing local x in a failure store makes renaming it to tmp change the outer observation. A successor assignment cannot repair this because failure skips that successor.

The restoration function captures the outer value at entry and changes only that component of the exit state. Other updates survive. This is not transaction rollback, and it does not retract output. Nested declarations compose restorations from inner to outer scope. Divergence supplies no exit state to restore.

Use r†, distinct from f*. Here r:Σ→Σ is a total state transformation; r† applies it to both normal and abortive exit stores without changing the exit tag. f* preserves failure untouched, whereas r† preserves failure while transforming its store. Types and purpose distinguish these operations despite their similar notation.

### Restoration equation

```text
rσ,v(τ)=τ[v↦σ(v)]; D⟦newvar v:=e in c⟧σ = rσ,v†(D⟦c⟧(σ[v↦E⟦e⟧σ])).
```

Evaluate the initializer and capture the restored value in the same entry state σ.

> [!example] A local name is not a transaction
> From x=12,y=0 run `newvar x:=3 in (y:=x+2; x:=8; fail)`.
>
> 1. The body fails at τ with x=8,y=5; τ is not yet the outer exit store.
> 2. rσ,x†(abort,τ)=(abort,τ[x↦12]), giving failure with x=12,y=5. Renaming local x to fresh tmp preserves this answer.
>
> **Conclusion:** The y update survives while local x is hidden. Substituting f* would leak x=8 and break renaming.

> [!question] Retrieval check
> 1. Replace fail by skip: how do the final store and exit mode change?
> 2. Use the final value of y to distinguish local restoration from transaction rollback.

---

## Correctness depends on the chosen observations — §5.1 · p. 100 · 4 min

> [!abstract] Section focus
> partial correctness는 정상 종료한 경우만 검사하며 total correctness는 정상 종료까지 요구한다.

이 장의 specification 정책에서는 failure를 partial correctness의 반례로 세지 않는다. precondition을 만족한 입력에서 정상 종료했다면 postcondition을 만족해야 한다는 조건이기 때문이다. 실패와 divergence는 정상 종료한 경우가 아니므로 이 검사에서 빠진다. 이것은 failure가 안전하다거나 실제 서비스에서 허용해야 한다는 주장이 아니다. specification이 관찰하는 사건을 그렇게 정했다는 뜻이다. 실패 금지라는 요구가 있으면 total correctness를 사용하거나 exit tag를 직접 언급하는 더 풍부한 specification이 필요하다.

수식을 쓸 때 q를 bottom이나 abort pair에 적용하지 않는 것이 좋다. q는 state에 대한 조건이므로 정상 결과 τ를 분리한 뒤 q(τ)를 묻는다. total correctness는 모든 precondition state에서 그런 τ가 존재해야 한다. 따라서 fail에 대한 total specification은 실제로 들어올 입력이 없을 때만 성립한다. partial correctness의 공허함과 total correctness의 불가능함을 구별해야 검증 결과를 과장하지 않는다. loop가 끝나지 않아서 잘못된 답을 내지 않는다는 설명은 total correctness의 증거가 아니다.

failure는 기존 program law도 바꾼다. 이전 언어에서 c 뒤에 무한 loop를 붙이면 어떤 final state도 없었다. 이제 c가 fail이면 뒤의 loop에 도달하기 전에 abortive result가 나온다. 관찰이 넓어지면 예전에 같던 두 프로그램이 달라질 수 있다. 따라서 확장된 언어의 rewrite rule을 검토할 때에는 새 기능의 equation뿐 아니라 예전 equivalence가 사용한 관찰 가정도 다시 확인해야 한다. output을 더하면 같은 문제가 한 번 더 나타난다.

### Normal-exit formulations

```text
Partial: ∀σ,τ. p(σ) ∧ D⟦c⟧σ=τ ⇒ q(τ). Total: ∀σ. p(σ) ⇒ ∃τ∈Σ. D⟦c⟧σ=τ ∧ q(τ).
```

normal state τ만 양화하므로 failure와 bottom은 partial 조건을 위반하지 않지만 total 조건을 충족하지 못한다.

> [!example] A specification that says too little
> `if x<0 then fail else y:=x*x`에 p=true, q=(y≥0)를 사용한다.
>
> 1. x≥0인 입력은 y=x²≥0으로 정상 종료한다. x<0인 입력은 실패하므로 partial 검사의 normal-exit 전제가 거짓이다. 따라서 partial specification은 성립한다.
> 2. total specification은 x=-2에서 실패하므로 거짓이다. p를 x≥0으로 강화하면 정상 종료와 y≥0을 모두 확보한다.
>
> **결론:** 실패 입력을 무시한 partial 증명과 실패 입력을 배제한 total 증명은 서로 다른 보장을 준다.

> [!question] Retrieval check
> 1. `fail; while true do skip`과 `while true do skip`의 결과를 각각 쓰라.
> 2. 예제의 partial specification이 실패 금지를 보장하지 못하는 이유와 total specification을 만족하는 precondition을 쓰라.

### English companion — Correctness depends on the chosen observations

*Partial correctness checks normal exits; total correctness requires one.*

Under this chapter's policy, failure is not a counterexample to partial correctness: only a normal exit must satisfy the postcondition. Neither failure nor divergence is a normal exit. This does not claim failure is safe for an application. A no-failure requirement needs total correctness or a richer specification mentioning exit modes.

Avoid applying q to bottom or an abort pair: q is a condition on states. Partial correctness quantifies over normal exit stores τ; total correctness requires such a τ to exist. A total specification for fail can hold only with no admissible inputs. Never mistake absence of a wrong terminating answer for termination evidence.

Failure changes old program laws. Previously, putting an endless loop after c removed every final state. If c now fails, execution exits before that loop. Enlarging observations can distinguish programs previously equivalent, so language extensions require auditing the observation assumptions behind existing rewrites, not merely adding equations.

### Normal-exit formulations

```text
Partial: ∀σ,τ. p(σ) ∧ D⟦c⟧σ=τ ⇒ q(τ). Total: ∀σ. p(σ) ⇒ ∃τ∈Σ. D⟦c⟧σ=τ ∧ q(τ).
```

Quantifying over normal states makes failure and bottom harmless to the partial condition but unable to satisfy the total one.

> [!example] A specification that says too little
> Use p=true and q=(y≥0) for `if x<0 then fail else y:=x*x`.
>
> 1. For x≥0, normal termination gives y=x²≥0. For x<0, failure makes the partial specification's normal-exit premise false. The partial specification holds.
> 2. The total specification fails at x=-2. Strengthening p to x≥0 establishes both normal termination and y≥0.
>
> **Conclusion:** Ignoring failed executions in a partial proof and excluding failing inputs in a total proof give different guarantees.

> [!question] Retrieval check
> 1. Give the results of `fail; while true do skip` and `while true do skip`.
> 2. Explain why the example's partial specification does not prohibit failure and give a precondition establishing total correctness.

---

## Output turns divergence into observable behavior — §5.2 · pp. 101–107 · 6 min

> [!abstract] Section focus
> 끝나지 않는 계산도 유한한 output을 남기거나 끝없는 output을 생산할 수 있다.

output이 돌이킬 수 없이 사용자에게 전달된다고 가정하면 final state가 없다는 이유로 모든 divergence를 하나로 합칠 수 없다. 알림 6을 한 번 보낸 뒤 멈추지 않는 서버와 아무 알림도 보내지 않는 서버는 다르다. 알림을 계속 보내는 서버도 이 둘과 다르다. 그러므로 결과에는 이미 전달된 integer의 순서가 남아야 한다. 여기서 시간이 얼마나 흘렀는지나 output 간 지연 시간은 관찰하지 않는다. 동일한 순서를 다른 속도로 출력하는 계산은 이 모델에서 구별하지 않는다.

sequence domain Ω에는 세 부류가 있다. integer만 있는 finite word는 그만큼 출력하고 더 이상 관찰 가능한 일을 하지 않는 divergence를 나타낼 수 있다. finite word 뒤에 normal 또는 abortive final state가 붙으면 종료까지 기록한 결과다. infinite integer sequence는 끝없는 output이다. integer만 있는 finite word를 정상 종료로 읽어서는 안 된다. 종료 여부는 명시적 final marker가 있어야 알 수 있다. empty word ε는 아무 output도 없는 divergence이며 이 domain의 bottom이다.

prefix order는 이전 관찰이 이후 관찰에 포함되는 관계다. final marker가 나온 뒤에는 더 연장할 수 없고 infinite sequence도 maximal하다. 반면 finite integer word는 더 긴 word나 final marker가 붙은 결과로 확장될 수 있다. chain이 어느 finite word에서 정체하면 그 word가 lub이고, 길이가 끝없이 늘어나면 각 자리의 integer가 결국 고정되어 유일한 infinite sequence를 이룬다. 같은 finite word가 한동안 반복되어도 limit는 달라지지 않는다. 이것이 정보의 증가와 실행 속도를 분리하는 이유다.

### Three forms, one prefix order

```text
Ω = ℤ* ∪ (ℤ*·Σ̂) ∪ ℤ^ω; w⊑w′ iff w is a prefix of w′; ⊥Ω=ε.
```

세 부류의 symbol은 type상 구별한다. 예를 들어 output integer 4와 4를 저장한 state는 같은 마지막 symbol이 아니다.

> [!example] Three alarm services
> 같은 initial state에서 output command를 `!e`로 쓴다.
>
> 1. `!6; while true do skip`의 결과는 ⟨6⟩이다. `!6; skip`의 결과는 ⟨6,σ⟩이고 둘은 같지 않으며 ⟨6⟩⊑⟨6,σ⟩다.
> 2. `while true do !6`의 결과는 ⟨6,6,6,…⟩이다. n회까지의 finite approximant는 6을 n개 출력한 marker 없는 word이고, 이 chain의 lub가 infinite output이다.
>
> **결론:** finite divergent prefix와 infinite output을 모두 보존해야 유용하지만 끝나지 않는 process를 설명할 수 있다.

sequence를 직접 잘라 붙여도 되지만 tterm, tabort, tout라는 injection으로 쓰면 input을 추가할 때 equation을 재사용하기 쉽다. tterm σ는 output 없이 정상 종료하고 tabort σ는 output 없이 실패한다. tout(n,w)는 먼저 n을 출력한 뒤 w처럼 행동한다. 특히 tout(n,⊥)는 bottom이 아니다. 최소한 n이 출력되었다는 정보가 이미 있기 때문이다. output의 존재와 이후 계산의 진행 여부가 분리되어 있다는 점이 recursive equation을 읽는 기준이다.

f*는 output을 지나 normal marker까지 내려간 뒤 그 자리를 fσ로 교체한다. marker 없는 finite prefix에서는 더 진행할 정보가 없으므로 같은 prefix를 돌려주고 infinite output도 그대로 남긴다. r†는 output을 똑같이 지나가지만 normal과 abortive marker 양쪽의 state를 고친다. 이때 local body가 출력한 숫자는 복원하지 않는다. 숫자는 이미 외부 관찰이며 바깥 binding의 값과는 별개다. local variable을 출력한 뒤 숨기더라도 그 variable의 이전 출력까지 비밀이 되는 것은 아니다.

finite 구조에 대한 equation만 쓰면 infinite output에서 함수값을 임의로 정할 여지가 있다. continuous solution을 요구하면 infinite sequence는 finite prefix chain의 lub이므로 그 위의 함수값도 결정된다. 이 원리는 추상적인 domain에서도 같은 extension을 유일하게 정하는 근거가 된다. while도 유한 횟수의 unfold로 얻은 approximant의 lub로 해석한다. body의 output은 다음 approximant로 갈수록 더 드러나며 정상 탈출이 확인되기 전에는 final marker를 임의로 붙이지 않는다.

### Output-aware extensions

```text
f*⊥=⊥; f*(tterm σ)=fσ; f*(tabort σ)=tabort σ; f*(tout(n,w))=tout(n,f*w). r† handles both stores.
```

f:Σ→Ω, r:Σ→Σ다. f*와 r†는 모두 Ω→Ω이지만 tag 처리 규칙이 다르다.

> [!example] Output survives cleanup
> x=20에서 `newvar x:=4 in (!x; x:=9; fail); !100`을 계산한다.
>
> 1. body는 tout(4,tabort(σ[x↦9]))를 만든다. restoration은 이를 tout(4,tabort σ)로 바꾼다.
> 2. 뒤의 !100을 붙이는 f*는 output 4를 통과하지만 abort marker에서 멈춘다. 최종 결과는 output ⟨4⟩, failure, x=20이다.
>
> **결론:** scope는 store를 복원하고 failure는 successor를 제거한다. 어느 쪽도 이미 나온 4를 취소하지 않는다.

### User views and properties

- output을 집합으로 보는 μ(w)는 나타난 integer의 집합이다. 순서와 중복과 exit marker를 잊으며 μ(⊔wᵢ)=⋃μ(wᵢ)이다. 이 abstraction은 continuous하지만 원래 sequence의 모든 차이를 보존하지 않는다.
- 이 장의 safety는 downward closed이며 chain lub에도 닫힌 property다. ‘음수를 출력하지 않는다’가 예다. liveness는 upward closed property로 읽으며 ‘언젠가 8을 출력한다’가 예다. 이 domain 기준을 다른 시간 논리의 정의와 무조건 동일시하지 않는다.

> [!question] Retrieval check
> 1. 왜 ⟨6,σ⟩와 ⟨6,7⟩ 사이에는 prefix 비교가 없는가?
> 2. 세 alarm service의 결과 중 정상 종료 marker를 가진 것은 무엇이며 infinite output의 finite approximant는 무엇인가?

### English companion — Output turns divergence into observable behavior

*A nonterminating computation may leave finite output or produce output forever.*

With irreversible output, absence of a final state no longer identifies all divergences. A server that emits 6 once and then runs silently differs from a silent server and from one emitting forever. We retain integer order, but not elapsed time or delays: computations producing the same behavior at different speeds are identified.

Ω contains finite integer words, finite integer words followed by a normal or abortive exit marker, and infinite integer sequences. A finite word with no marker can describe divergence after that output; it is not normal termination. The empty word ε denotes silent divergence and is bottom.

Prefix order says earlier observations remain valid later. A marked finite result and an infinite sequence are maximal. An unmarked finite word may acquire more output or an exit marker. A stabilizing chain has its stable value as lub; an unbounded-length chain determines one infinite sequence coordinate by coordinate. Repeating snapshots changes pace, not the limit.

### Three forms, one prefix order

```text
Ω = ℤ* ∪ (ℤ*·Σ̂) ∪ ℤ^ω; w⊑w′ iff w is a prefix of w′; ⊥Ω=ε.
```

Symbols are typed: output integer 4 and a state storing 4 are not the same terminal symbol.

> [!example] Three alarm services
> Write output as `!e` and use the same initial state.
>
> 1. `!6; while true do skip` yields ⟨6⟩. `!6; skip` yields ⟨6,σ⟩. They differ, with ⟨6⟩⊑⟨6,σ⟩.
> 2. `while true do !6` yields ⟨6,6,6,…⟩. Its n-iteration approximant is the unmarked word containing n copies of 6; their lub is the infinite output.
>
> **Conclusion:** Both finite divergent prefixes and infinite output must survive the model of useful nonterminating processes.

Injections make the equations reusable when input is added. tterm σ terminates normally, tabort σ fails, and tout(n,w) emits n before behaving as w. In particular, tout(n,⊥) is not bottom: the output has already occurred even though subsequent behavior provides no further information.

f* traverses output and replaces only a normal marker with fσ, preserving unmarked divergent prefixes and infinite output. r† traverses output too, but changes stores at both exit markers. It never restores emitted integers: these are external observations, not bindings. Hiding a local variable does not undo values already printed from it.

Equations on finite structures alone leave infinite behavior underdetermined. Continuity determines an infinite sequence from its finite prefixes. This also underlies unique extensions on the canonical abstract domain. A while loop is the lub of finite unfoldings, exposing more output without inventing an exit marker before termination is established.

### Output-aware extensions

```text
f*⊥=⊥; f*(tterm σ)=fσ; f*(tabort σ)=tabort σ; f*(tout(n,w))=tout(n,f*w). r† handles both stores.
```

f:Σ→Ω and r:Σ→Σ. Both extensions map Ω to Ω but use different exit rules.

> [!example] Output survives cleanup
> From x=20 evaluate `newvar x:=4 in (!x; x:=9; fail); !100`.
>
> 1. The body produces tout(4,tabort(σ[x↦9])). Restoration yields tout(4,tabort σ).
> 2. The extension attaching !100 passes output 4 but stops at the abort marker. The final behavior is output ⟨4⟩, failure, x=20.
>
> **Conclusion:** Scope restores the store and failure removes the successor; neither retracts 4.

### User views and properties

- μ(w) collects emitted integers, forgetting order, multiplicity, and exit markers. It is continuous: μ(⊔wᵢ)=⋃μ(wᵢ), but loses sequence distinctions.
- Here safety means downward closed and closed under chain lubs, as in never outputting a negative. Liveness means upward closed, as in eventually outputting 8. Do not silently identify these domain-relative definitions with every temporal-logic convention.

> [!question] Retrieval check
> 1. Why are ⟨6,σ⟩ and ⟨6,7⟩ incomparable?
> 2. Which alarm service has a normal exit marker, and what are the finite approximants of the infinite-output service?

---

## Continuity is finite evidence, not an algorithm — §5.3 · pp. 107–108 · 5 min

> [!abstract] Section focus
> 미래 입력을 미리 알 수 없고 output을 취소할 수 없다는 가정이 continuity를 요구한다.

observer는 입력 process의 output을 받아 자기 output을 만드는 장치다. finite time에 받은 정보는 입력 전체가 아니라 finite approximation이다. input이 나중에 더 이어질 가능성을 배제하지 못하므로 지금 내보낸 output은 그 가능성 모두와 양립해야 한다. 여기에는 미래를 예측할 수 없고, 무한한 정보를 finite time에 받을 수 없고, output 사건은 finite time에 일어난다는 가정이 들어 있다. input이 끝났음을 알려 주는 별도 신호가 없다면 오래 기다렸다는 사실만으로 끝났다고 판단하지 않는다.

monotonicity는 입력 정보를 더 알게 되어도 이전 output 정보를 철회하지 않는다는 조건이다. continuity는 limit에서만 갑자기 생기는 output 사실을 금지한다. chain의 limit에 대한 어떤 유한 관찰이 참이면 그 사실을 뒷받침할 만큼의 정보가 어느 finite 단계에도 있어야 한다. 두 조건을 함께 보면 프로그램이 끝없는 입력을 실제로 다 읽은 뒤 첫 숫자를 출력한다는 설명이 왜 문제인지 드러난다. 끝없는 입력의 뒤라는 finite 시점은 존재하지 않는다.

이 주장은 finite program으로 구현 가능한지를 판정하는 완전한 기준이 아니다. discrete input에 대해 계산 불가능한 집합의 membership을 알려 주는 함수도 수학적으로는 continuous할 수 있다. discrete domain의 증가 chain은 같은 원소를 반복하기 때문이다. 따라서 continuous라는 사실만으로 알고리즘을 얻었다고 말할 수 없다. continuity는 이 관찰 모델의 물리적 통신 제약이 주는 필요조건이고 computability는 표현 가능성과 효과적인 계산 절차에 대한 추가 제약을 요구한다.

### Preservation of observation limits

```text
x₀⊑x₁⊑… implies f(⊔xₙ)=⊔f(xₙ), with f monotone.
```

monotonicity는 오른쪽 lub가 왼쪽 이하임을 준다. finite evidence 논증은 왼쪽의 output도 finite stage들에서 이미 뒷받침됨을 보여 반대 부등식을 준다.

> [!example] An impossible infinity detector
> H(w)는 w가 infinite integer sequence이면 ⟨1⟩, 그 밖에는 ε라고 정의한다.
>
> 1. xₙ=⟨0,…,0⟩에 0이 n개 있다고 하자. 각 xₙ은 finite이므로 H(xₙ)=ε이고 오른쪽 lub도 ε다.
> 2. 그러나 ⊔xₙ=⟨0,0,…⟩이므로 H(⊔xₙ)=⟨1⟩이다. ε≠⟨1⟩이어서 H는 monotone이지만 continuous하지 않다.
>
> **결론:** 무한함을 확정하는 1은 어느 finite prefix에서도 정당화되지 않는다. monotonicity만으로는 이 문제를 잡지 못한다.

> [!question] Retrieval check
> 1. ‘8을 보면 1을 출력한다’와 ‘8을 영원히 못 보면 1을 출력한다’의 finite evidence 차이는 무엇인가?
> 2. infinity detector가 monotone이면서 continuous하지 않은 chain을 쓰고, continuity와 computability가 다른 조건인 이유를 말하라.

### English companion — Continuity is finite evidence, not an algorithm

*No foresight and irreversible output force continuity under finite communication.*

An observer transforms one process's output into another. At finite time it has only finite input evidence, and any irrevocable output must remain compatible with possible extensions. The assumptions are no foresight, no infinite communication in finite time, and output events occurring at finite times. Silence is not an end-of-input signal.

Monotonicity forbids retracting output when input information grows. Continuity forbids output evidence appearing only at a chain's limit with no finite-stage support. Together they explain why reading an entire endless input before emitting a first integer is not a realizable finite-time action: there is no finite instant after endless input.

This is not a complete characterization of finite-program computability. On a discrete input domain, even a function deciding membership in an uncomputable set is continuous: increasing chains are constant. Continuity is a necessary communication constraint in this model, not a sufficient algorithmic criterion. Computability imposes additional effective constraints.

### Preservation of observation limits

```text
x₀⊑x₁⊑… implies f(⊔xₙ)=⊔f(xₙ), with f monotone.
```

Monotonicity gives the right side below the left; finite evidence supports the reverse inequality.

> [!example] An impossible infinity detector
> Define H(w)=⟨1⟩ for an infinite integer sequence and H(w)=ε otherwise.
>
> 1. Let xₙ contain n zeros. Every xₙ is finite, so H(xₙ)=ε and their image lub is ε.
> 2. Yet ⊔xₙ is the infinite zero stream, so H(⊔xₙ)=⟨1⟩. Since ε≠⟨1⟩, H is monotone but not continuous.
>
> **Conclusion:** No finite prefix justifies the 1 certifying infinity. Monotonicity alone misses the problem.

> [!question] Retrieval check
> 1. Compare finite evidence for emitting 1 upon seeing 8 versus emitting 1 if 8 never arrives.
> 2. Give the chain showing that the infinity detector is monotone but discontinuous, and explain why continuity and computability are distinct.

---

## Products, disjoint sums, and lifting — §5.4 · pp. 109–110 · 5 min

> [!abstract] Section focus
> recursive domain을 쓰기 전에 각 조립 연산이 order와 lub를 어떻게 운반하는지 정한다.

predomain은 여기서 증가하는 countable chain마다 lub를 갖는 partial order다. domain은 거기에 least element까지 있는 구조다. 모든 predomain에 bottom이 있다고 가정하면 disjoint sum에서 곧 모순이 생긴다. product P×Q는 두 좌표의 정보를 따로 비교하고 chain의 lub도 좌표별로 계산한다. 두 component가 domain이면 bottom pair가 전체 bottom이 된다. 한 좌표만 덜 알려진 pair도 존재하므로 product bottom 하나와 모든 partial pair를 혼동하지 않는다.

disjoint sum은 tag가 같은 component 안에서만 비교한다. 양쪽에 모두 integer 0이 있어도 왼쪽 0과 오른쪽 0은 다른 값이다. chain은 tag를 바꾸어 이동할 수 없으므로 하나의 component 안에서 limit를 구한다. 각 component가 domain이어도 서로 다른 tag의 bottom은 비교되지 않는다. 따라서 두 개 이상의 비어 있지 않은 component를 가진 sum에는 공통 least element가 없다. 이 때문에 sum을 만든 뒤 lifting으로 새로운 bottom을 더하는 단계가 별도로 필요하다.

lifting P⊥는 P의 모든 값을 위에 두는 새 bottom을 추가하고 기존 order는 보존한다. P에 이미 least element가 있어도 새 bottom과 기존 least element의 injection은 서로 다르다. 예를 들어 output tag를 선택했지만 tail은 아직 bottom인 값은 output tag도 선택하지 못한 전체 bottom보다 정보가 많다. 이 차이를 지우면 첫 output은 확인했으나 이후 행동을 모르는 process를 표현할 수 없게 된다. domain equation의 괄호와 lifting 위치는 그래서 장식이 아니다.

### Orders and limits

```text
(p,q)⊑(p′,q′) iff p⊑p′ and q⊑q′. (i,x)⊑(j,y) iff i=j and x⊑ᵢy.
```

projection, pairing, component별 map, injection, case analysis는 continuous component function에서 continuous function을 만든다. 이 성질로 복잡한 equation의 continuity를 조립식으로 확인한다.

> [!example] A tagged partial observation
> Ω의 output component를 ℤ×Ω로 조립하고 ℤ는 discrete로 둔다.
>
> 1. (7,⊥)⊑(7,tterm σ)이지만 (7,⊥)와 (8,⊥)는 비교되지 않는다. integer tag가 바뀌는 것은 정보 보강이 아니라 다른 관찰이다.
> 2. disjoint sum에 이를 넣고 lifting하면 output-7-with-unknown-tail는 전체 bottom보다 위에 놓인다. 이 값은 tout(7,⊥)로 나타나며 실제로 첫 output을 구별한다.
>
> **결론:** tag는 행동의 종류를, product는 그 행동의 payload와 이후 행동을, lifting은 아직 아무 행동도 보이지 않음을 표현한다.

> [!question] Retrieval check
> 1. domain P,Q에 대해 P+Q의 두 tagged bottom을 하나로 합치는 것은 왜 disjoint sum의 정의가 아닌가?
> 2. tout(7,⊥)와 전체 bottom이 다른 이유를 product, tag, lifting의 세 단계로 설명하라.

### English companion — Products, disjoint sums, and lifting

*Specify how each construction transports order and lubs before solving recursive domains.*

A predomain here is a partial order with lubs of increasing countable chains; a domain additionally has a least element. Products compare information componentwise and take lubs coordinatewise. If both components are domains, their bottom pair is the least element, but partially defined pairs also exist and must not be collapsed to that bottom.

A disjoint sum compares values only within the same tag. Left 0 and right 0 differ. A chain cannot switch components, so its lub stays in one component. Even if both components are domains, their tagged bottoms are incomparable; a sum with multiple nonempty components has no global least element. Lifting must add one separately.

Lifting P adds a fresh bottom below all old values, preserving their order. Even if P already has a least element, its injected copy differs from the new bottom. Knowing an output tag with an unknown tail is more informative than not knowing any tag. Parentheses and the position of lifting therefore carry behavioral content.

### Orders and limits

```text
(p,q)⊑(p′,q′) iff p⊑p′ and q⊑q′. (i,x)⊑(j,y) iff i=j and x⊑ᵢy.
```

Projections, pairing, componentwise maps, injections, and case analysis preserve continuity, allowing compositional checks of larger equations.

> [!example] A tagged partial observation
> Build the output component as ℤ×Ω, with discrete integers.
>
> 1. (7,⊥)⊑(7,tterm σ), but (7,⊥) and (8,⊥) are incomparable. Changing the emitted integer is not information refinement.
> 2. After sum injection and lifting, output-7-with-unknown-tail lies strictly above global bottom. This is tout(7,⊥), which distinguishes the first emitted value.
>
> **Conclusion:** Tags select behavior, products carry payload and future behavior, and lifting represents absence of any visible action.

> [!question] Retrieval check
> 1. For domains P and Q, why is merging the two tagged bottoms not the disjoint-sum construction?
> 2. Use product, tagging, and lifting to explain why tout(7,⊥) differs from global bottom.

---

## Recursive isomorphism is not set equality — §5.5 · pp. 111–112 · 5 min

> [!abstract] Section focus
> process의 한 단계 모양을 벗기거나 다시 싸는 continuous bijection으로 recursive structure를 표현한다.

output process는 아무 정보가 없거나, 끝났거나, 한 integer를 내보낸 뒤 또 output process가 된다. 이 관찰은 Ω≅(Σ̂+(ℤ×Ω))⊥로 쓸 수 있다. 여기서 ≅는 같은 집합이라는 선언이 아니다. 왼쪽 process를 오른쪽 한 단계의 tagged 구조로 바꾸는 unfold와 그 역방향 fold가 있으며 두 함수가 continuous하고 서로의 inverse라는 뜻이다. sequence로 만든 concrete Ω는 이 equation의 한 모델이고, injection을 이용하면 sequence의 내부 표현을 직접 만지지 않고도 program equation을 적을 수 있다.

이 equation을 finite syntax를 만드는 규칙으로만 읽으면 infinite output이 빠진다. 반대로 ‘자기 자신을 포함하니 아무 집합이나 된다’고 읽어도 order와 continuity 조건을 놓친다. finite approximant를 보존하고 그 limit를 알맞게 넣는 domain construction이 필요하다. 교재가 기대는 일반 해법은 inverse-limit 계열의 construction이며 이 본문에서 그 존재 증명을 대신하지 않는다. function space가 포함되는 경우에도 단순한 cardinality 계산으로 해를 얻는다고 주장해서는 안 된다.

또한 isomorphism equation을 만족한다는 사실만으로 원하는 모든 재귀적 함수 equation이 유일해지는 것은 아니다. 같은 모양의 equation에 여러 solution이 있을 수 있다. finite approximation으로 생성되는 canonical solution과 적절한 initiality 성질이 extension의 유일성을 뒷받침한다. 따라서 뒤에서 f*가 유일한 continuous solution이라고 말할 때에는 이 canonical choice를 전제한다. ‘≅를 만족하는 임의의 domain에서도 자동으로 유일하다’는 더 강한 주장은 하지 않는다. 이는 existence, choice of model, uniqueness of definitions를 서로 분리하는 훈련이다.

### Fold and unfold

```text
T(X)=(Σ̂+(ℤ×X))⊥; unfold:Ω→T(Ω), fold:T(Ω)→Ω; fold∘unfold=idΩ, unfold∘fold=idT(Ω).
```

tterm, tabort, tout는 해당 tag의 injection, lifting injection, fold를 합성해 만든다. 그러므로 이 함수들은 continuous하고 서로 다른 행동의 range는 겹치지 않는다.

> [!warning] Two different fixed-point questions
> F(f)=f는 이미 주어진 function domain 안에서 원소 f를 고르는 문제다. Ω≅T(Ω)는 어떤 domain 구조를 만들지에 관한 문제다. while의 least fixed point와 recursive domain의 canonical solution은 연결되지만 같은 type의 equation은 아니다. 두 문제 모두 무작정 가장 작은 집합을 골라 해결한다고 설명하면 infinite behavior와 continuity가 사라진다.

> [!question] Retrieval check
> 1. fold와 unfold를 연달아 적용하면 왜 원래 process로 돌아와야 하는가?
> 2. while의 fixed point와 recursive domain isomorphism이 각각 고르는 대상의 type을 비교하라.

### English companion — Recursive isomorphism is not set equality

*Express recursive structure through continuous inverse maps that expose or package one behavior layer.*

An output process is unknown, terminated, or an integer followed by another process: Ω≅(Σ̂+(ℤ×Ω))⊥. This asserts an isomorphism, not ordinary set equality. Continuous inverse unfold and fold maps expose and package one behavior layer. The concrete sequence domain is a model, while injections let program equations ignore its representation.

Reading this only as finite syntax omits infinite output; reading it as arbitrary self-containing sets omits order and continuity. A domain construction must preserve finite approximants and supply their limits. The general inverse-limit construction is not proved here, and function-space equations cannot be justified by naive cardinal arithmetic.

Satisfying a domain isomorphism alone does not guarantee uniqueness of all recursively defined maps. Multiple domain solutions may exist. The canonical finite-approximation solution, with the appropriate initiality property, supports uniqueness of the extensions. Subsequent uniqueness claims assume that choice rather than every possible isomorphic solution.

### Fold and unfold

```text
T(X)=(Σ̂+(ℤ×X))⊥; unfold:Ω→T(Ω), fold:T(Ω)→Ω; fold∘unfold=idΩ, unfold∘fold=idT(Ω).
```

Compose tagged injections, the lifting injection, and fold to obtain tterm, tabort, and tout. They are continuous and distinguish the alternative behavior forms.

> [!warning] Two different fixed-point questions
> F(f)=f selects an element of an existing function domain; Ω≅T(Ω) constructs a domain structure. Loop least fixed points and canonical recursive domains are related but are not equations of the same type. Neither should be explained as simply choosing a smallest ordinary set.

> [!question] Retrieval check
> 1. Why must folding after unfolding return the original process?
> 2. Compare the types of the objects selected by a loop fixed point and a recursive domain isomorphism.

---

## Input creates resumptions, not nondeterminism — §5.6 · pp. 113–115 · 6 min

> [!abstract] Section focus
> input node는 가능한 입력값마다 다음 행동을 정해 두는 함수다.

input command ?v는 지금 어느 integer가 들어올지 모른다. 그렇다고 하나의 integer를 임의로 골라 계산을 계속하는 내부 선택을 모델에 넣지는 않는다. 대신 입력 k가 주어지면 어떻게 재개할지를 나타내는 함수 g:ℤ→Ω를 만든다. tin(g)는 입력을 요구하는 행동이고 g(k)는 환경이 k를 제공한 뒤의 행동이다. 한 initial state에서 나온 denotation은 이 모든 응답을 담는 하나의 tree다. 실행 중 실제로 따라갈 branch는 환경의 입력으로 정해지며 같은 입력 history에서 program의 답은 하나다.

이 tree를 resumption이라고 부르는 이유는 I/O 사건 뒤에 계산이 재개되는 구조가 반복되기 때문이다. output node에는 하나의 continuation-like tail이 있고 input node에는 integer로 index된 tail family가 있다. future behavior는 이미 최종 결과의 일부이므로 ‘final result’보다 ‘total behavior’라는 이름이 정확할 수 있다. 입력이 영원히 오지 않는 현실적인 대기와 내부 silent divergence를 같다고 단정하지 않는다. tin node는 입력 요청이 준비되었다는 관찰을 보존하고 bottom은 그런 행동조차 드러내지 않는다.

sequencing과 restoration은 새로운 input node를 만났을 때 각 branch 안으로 내려간다. f*는 g(k)의 정상 끝에만 다음 command를 붙이고 r†는 g(k)의 양쪽 종료 state를 복원한다. 입력값마다 이 규칙을 적용하는 것은 여러 branch를 동시에 실행한다는 뜻이 아니다. 실제로 실행하지 않은 branch도 hypothetical behavior로 tree에 포함한다는 뜻이다. integer domain은 discrete이므로 ℤ에서 Ω로 가는 branch function은 각 integer 사이의 인위적인 크기 순서를 따를 필요가 없다.

### The resumption domain

```text
Ω ≅ (Σ̂ + (ℤ×Ω) + (ℤ→Ω))⊥; D⟦?v⟧σ=tin(λk.tterm(σ[v↦k])).
```

output-only domain과 같은 기호 Ω를 쓰되 이제 input component까지 포함한 canonical resumption domain을 뜻한다.

> [!example] A deterministic branching reader
> `?x; if x<0 then fail else !(x+3)`를 해석한다.
>
> 1. 입력 branch 함수는 g(k)=tabort(σ[x↦k]) if k<0, 그렇지 않으면 tout(k+3,tterm(σ[x↦k]))다.
> 2. 입력 -4에서는 output 없이 failure이고 x=-4다. 입력 2에서는 5를 출력하고 x=2로 정상 종료한다. 이 둘 중 하나를 program이 비결정적으로 고른 것이 아니다.
>
> **결론:** 하나의 tree와 그 tree에서 환경이 고른 하나의 실행 경로를 구별한다.

예제로 센서가 보내는 delta를 받아 매번 누적값을 두 배로 증폭한 뒤 delta를 더하는 process를 만들자. 초기 x는 1이고 한 cycle은 ?d; x:=2*x+d; !x다. 이 예는 입력을 단순히 모으는 것이 아니라 이전 state와 새 입력을 함께 쓰므로, input branch가 어느 state에서 재개되는지 계산해야 한다. output 뒤에 같은 initial state로 돌아가면 잘못된 답이 나온다. loop tail은 갱신된 x와 d를 모두 담은 state에서 실행된다.

least fixed point를 구할 때 W₀는 입력을 요청하지도 못하는 everywhere-bottom 함수다. W₁은 한 번 입력을 받고 한 번 출력한 뒤 bottom tail에 도달한다. W₂는 두 cycle을 보이고 그 뒤는 아직 모른다. Wₙ은 n번째 output에서 정상 종료한 프로그램이 아니라 그 지점까지 드러난 정보다. 각 approximant 끝에 tterm을 붙이면 끝없는 loop가 매번 종료할 수 있다는 잘못된 관찰을 추가한다. 이 차이는 finite approximation을 timeout 실행 결과처럼 읽을 때 특히 놓치기 쉽다.

아래 recurrence의 결과는 입력 history가 주어졌을 때 출력 path를 결정한다. 모든 입력 branch에 대해 같은 방식으로 finite tree depth가 커지고 pointwise lub가 전체 process를 만든다. concrete 입력 세 개를 계산하는 것만으로 infinite tree의 모든 branch를 검사한 것은 아니다. 그러나 한 cycle equation과 recurrence를 증명하면 임의 길이의 입력 history에 대한 계산을 정당화할 수 있다. 이것이 sample execution과 denotation 도출 사이의 역할 분담이다.

### One cycle and its approximants

```text
W₀(σ)=⊥; Wₘ₊₁(σ)=tin(λk.tout(2σ(x)+k,Wₘ(σ[d↦k,x↦2σ(x)+k]))).
```

x와 d는 서로 다른 variable이다. x₀=1, xⱼ₊₁=2xⱼ+kⱼ이고 j번째 입력 뒤의 output은 xⱼ₊₁이다.

> [!example] Three sensor readings
> 입력 history가 3,-2,1로 시작한다고 하자.
>
> 1. 첫 cycle은 x₁=2·1+3=5를 출력한다. 두 번째는 x₂=2·5-2=8을 출력한다. 세 번째는 x₃=2·8+1=17을 출력한다.
> 2. closed form에서도 x₃=8+4·3+2·(-2)+1=17이다. W₃의 해당 path는 input 3, output 5, input -2, output 8, input 1, output 17, bottom이다.
>
> **결론:** 전체 W에서는 마지막 bottom이 다음 input request로 더 정교해진다. 예제는 세 번째 output 뒤의 termination을 주장하지 않는다.

> [!question] Retrieval check
> 1. tin(λk.⊥)와 ⊥는 어떤 첫 관찰에서 다른가?
> 2. sensor 예제의 입력 3,-2,1에서 output을 계산하고 W₃의 끝에 tterm을 붙이면 왜 잘못인지 설명하라.

### English companion — Input creates resumptions, not nondeterminism

*An input node specifies one future behavior for each possible supplied value.*

Input ?v does not know the arriving integer, but it does not make an internal arbitrary choice. It constructs g:ℤ→Ω, and tin(g) requests input before resuming as g(k). One initial state denotes a whole response tree. The environment selects the realized branch; the program has one response for each input history.

Resumptions repeatedly describe behavior after I/O. An output node has one tail; an input node has an integer-indexed family of tails. Since future behavior belongs to the result, total behavior is a better name than final result. A pending input request is not silently identified with internal divergence: tin records readiness, whereas bottom reveals no action.

Sequencing and restoration act pointwise under input: f* attaches the successor at normal ends of g(k), while r† restores both exit stores. This describes hypothetical branches, not simultaneous execution. Discrete integers impose no artificial numeric monotonicity on the branch function.

### The resumption domain

```text
Ω ≅ (Σ̂ + (ℤ×Ω) + (ℤ→Ω))⊥; D⟦?v⟧σ=tin(λk.tterm(σ[v↦k])).
```

From here Ω denotes the canonical resumption domain including input, not merely the earlier sequence domain.

> [!example] A deterministic branching reader
> Interpret `?x; if x<0 then fail else !(x+3)`.
>
> 1. Its branch function is g(k)=tabort(σ[x↦k]) for k<0, otherwise tout(k+3,tterm(σ[x↦k])).
> 2. Input -4 gives failure without output and x=-4. Input 2 emits 5 and terminates normally with x=2. The program did not nondeterministically choose between these.
>
> **Conclusion:** Distinguish the one response tree from the one path selected by an environment.

Consider a sensor process starting at x=1 with each cycle `?d; x:=2*x+d; !x`. Because each cycle uses both old state and new input, its branch must resume from the updated store. Restarting the loop from the original state gives a wrong answer: the tail carries both updated x and d.

W₀ is the everywhere-bottom function. W₁ exposes one input and output, W₂ exposes two cycles, and so on. Wₙ is information through the nth output, not a program terminating there. Appending tterm to every approximant would invent termination. Finite approximation must not be confused with an execution forcibly stopped by timeout.

The recurrence determines the output path for each input history. Increasing depth on all branches yields the total process by pointwise lub. Testing three inputs does not inspect the whole infinite tree; deriving the cycle equation and recurrence justifies arbitrary finite histories. Samples illustrate, whereas the recurrence explains.

### One cycle and its approximants

```text
W₀(σ)=⊥; Wₘ₊₁(σ)=tin(λk.tout(2σ(x)+k,Wₘ(σ[d↦k,x↦2σ(x)+k]))).
```

x and d are distinct variables. Set x₀=1 and xⱼ₊₁=2xⱼ+kⱼ; the output after input j is xⱼ₊₁.

> [!example] Three sensor readings
> Let the input history begin 3,-2,1.
>
> 1. The cycles output x₁=2·1+3=5, x₂=2·5-2=8, and x₃=2·8+1=17.
> 2. The closed form agrees: x₃=8+4·3+2·(-2)+1=17. The corresponding W₃ path is input 3, output 5, input -2, output 8, input 1, output 17, bottom.
>
> **Conclusion:** In W the final bottom is refined by another input request, not a termination claim.

> [!question] Retrieval check
> 1. What first observation distinguishes tin(λk.⊥) from bottom?
> 2. Compute the sensor outputs for 3,-2,1 and explain why appending tterm to W₃ is wrong.

---

## A continuation gives meaning to the rest — §5.7 · pp. 115–118 · 5 min

> [!abstract] Section focus
> command는 중간 결과만 돌려주는 대신 나머지 계산의 의미를 인자로 받는다.

direct meaning에서는 앞 command의 결과 tree를 나중에 f*로 순회하여 뒤 command를 붙였다. continuation meaning에서는 나머지 계산 κ:Σ→Ω를 처음부터 앞 command에 준다. command가 정상적으로 control을 놓으면 κ를 final local state에 적용하고, control을 놓지 않으면 κ를 쓰지 않는다. κ는 반드시 실제 stack을 구현한 자료구조라는 뜻이 아니다. 여기서는 앞으로 수행될 전체 행동을 state별로 정한 수학적 함수다. 이 관점으로 sequencing을 읽으면 앞 command가 먼저 control을 가진다는 순서가 수식에 직접 드러난다.

C⟦c₀;c₁⟧κ에서는 c₁의 continuation을 먼저 구성하지만 c₁을 먼저 실행하는 것은 아니다. C⟦c₁⟧κ는 state를 기다리는 함수이며 c₀가 정상 state를 넘겨줄 때만 거기서 시작한다. function composition의 글자 순서와 실제 실행 순서를 혼동하지 않는다. assignment와 skip은 κ를 호출하는 방법만 달라진다. conditional은 같은 κ를 두 branch에 전달하고 현재 state의 Boolean 값으로 하나를 고른다. expression의 evaluation은 여전히 direct이고 그 내부를 CPS로 바꾸는 것은 이 장의 과제가 아니다.

while에서 고정한 κ는 loop 전체가 끝난 뒤 할 일을 나타낸다. body가 정상 종료하면 다시 loop를 실행하므로 body에 넘기는 continuation은 κ가 아니라 loop의 현재 approximant w다. guard가 false일 때만 κ를 호출한다. κ가 고정된 채 recurrence가 진행되므로 더 높은 continuation-transformer type 전체가 아니라 Σ→Ω에서 least fixed point를 구할 수 있다. local declaration은 body의 normal continuation을 감싸 바깥 값 복원 후 κ를 호출하게 한다. 아직 failure가 없다면 이것으로 충분하다.

### Single-continuation equations

```text
C⟦c⟧:(Σ→Ω)→Σ→Ω; C⟦c₀;c₁⟧κ=C⟦c₀⟧(C⟦c₁⟧κ).
```

기본 언어에서 C⟦c⟧κσ=κ⊥(D⟦c⟧σ)이며 κ⊥는 bottom을 bottom으로 보내는 strict extension이다. 이를 이 장의 restoration †와 혼동하지 않는다.

> [!example] Read composition from the left command
> κ(τ)=tout(τ(x),tterm τ)로 두고 `x:=2; x:=x+5`를 해석한다.
>
> 1. 안쪽 continuation C⟦x:=x+5⟧κ는 τ를 받으면 κ(τ[x↦τ(x)+5])를 계산한다.
> 2. 앞 assignment가 τ=σ[x↦2]를 넘기면 κ(σ[x↦7])가 되어 output 7 뒤 정상 종료한다.
>
> **결론:** 뒤 계산을 함수로 미리 구성하는 것과 뒤 계산을 미리 실행하는 것은 다르다.

> [!question] Retrieval check
> 1. while body에 κ를 바로 넘기면 첫 iteration 뒤 어떤 잘못된 control transfer가 생기는가?
> 2. C⟦c₁⟧κ를 먼저 구성하는 것과 c₁을 먼저 실행하는 것의 차이를 설명하라.

### English companion — A continuation gives meaning to the rest

*A command receives the meaning of the remaining computation rather than merely returning an intermediate result.*

Direct semantics traverses a result tree with f* to attach its successor. Continuation semantics supplies κ:Σ→Ω beforehand. A normal exit applies κ to its store; a command retaining control does not use κ. This mathematical description of future behavior is not necessarily an implementation of a stack, but it makes control ownership explicit.

In C⟦c₀;c₁⟧κ, constructing C⟦c₁⟧κ first does not execute c₁ first: it is a function awaiting c₀'s normal exit store. Assignment and skip differ only in how they invoke κ. Conditionals pass the same κ to the selected branch. Expressions remain direct; this is CPS for commands, not yet for expression evaluation.

Fix κ as the behavior after the entire loop. A successful body repeats the loop, so it receives w, the current loop approximant, not κ. A false guard invokes κ. Because κ stays fixed, the least fixed point can be taken in Σ→Ω. Without failure, a local declaration needs only to wrap its normal continuation with restoration.

### Single-continuation equations

```text
C⟦c⟧:(Σ→Ω)→Σ→Ω; C⟦c₀;c₁⟧κ=C⟦c₀⟧(C⟦c₁⟧κ).
```

For the base language, C⟦c⟧κσ=κ⊥(D⟦c⟧σ), with κ⊥ the strict extension. Do not confuse this with the restoration † defined above.

> [!example] Read composition from the left command
> Take κ(τ)=tout(τ(x),tterm τ) and interpret `x:=2; x:=x+5`.
>
> 1. C⟦x:=x+5⟧κ awaits τ and computes κ(τ[x↦τ(x)+5]).
> 2. The first assignment supplies τ=σ[x↦2], producing κ(σ[x↦7]): output 7, then normal termination.
>
> **Conclusion:** Preparing future computation as a function is not executing it early.

> [!question] Retrieval check
> 1. What goes wrong after the first iteration if the body receives κ directly?
> 2. Distinguish constructing C⟦c₁⟧κ first from executing c₁ first.

---

## Two continuations restore locals on failure — §5.8 · pp. 118–120 · 6 min

> [!abstract] Section focus
> normal exit와 failure exit는 다른 나머지 계산을 갖되 둘 다 scope 복원을 통과해야 한다.

single CPS에서 output은 tout(E⟦e⟧σ,κσ), input은 tin(λk.κ(σ[v↦k]))로 간단하다. 그러나 fail을 tabort σ로 고정하면 κ를 완전히 무시하여 local declaration이 κ에 설치한 복원도 건너뛴다. output과 input equation이 깔끔해졌다는 이유만으로 failure 문제까지 해결됐다고 말할 수 없다. single CPS와 direct meaning의 일치식을 쓸 때에도 복원이 normal exit에만 적용되는 잘못된 local 정책과 일치할 뿐이라는 한계를 밝혀야 한다. 우리가 원하는 locality는 더 강한 조건이다.

수정은 normal continuation κt와 failure continuation κf를 따로 받게 하는 것이다. fail은 κf를 호출하고 assignment, skip, input, output은 정상 진행을 κt로 넘긴다. sequencing은 c₀의 normal continuation에 c₁을 끼워 넣지만 failure continuation은 그대로 전달한다. 그러면 앞 command의 failure가 뒤 ordinary command를 실행하지 않는다는 성질이 type과 equation에서 드러난다. κf가 존재한다고 failure를 잡아서 정상 실행으로 되돌리는 새 command가 언어에 생긴 것은 아니다. 이 continuation은 scope를 빠져나가며 cleanup한 뒤 바깥 failure를 계속 전파하는 데 사용된다.

local declaration은 두 continuation을 같은 restoration r로 각각 감싼다. 중요한 것은 r을 body가 시작되기 전 state에서 만든다는 점이다. nested scope 안에서 실패하면 안쪽 κf wrapper가 먼저 실행되고 바깥 κf wrapper가 그 결과를 받는다. 모든 scope를 빠져나간 뒤 top-level tabort가 호출된다. body가 output이나 input을 수행하더라도 wrapper는 각 branch의 exit 때 실행될 함수로 남아 있으므로 local 값의 복원과 interactive behavior가 충돌하지 않는다. 이미 나온 output은 계속 보존된다.

### Control routing and cleanup

```text
C₂⟦c⟧:(Σ→Ω)→(Σ→Ω)→Σ→Ω; C₂⟦fail⟧κtκfσ=κfσ.
```

r=rσ,v로 두며, guard와 initializer는 여전히 현재 state에서 effect 없이 계산한다.

### Remaining two-continuation equations

```text
Assignment and skip use κt; both conditional branches share κt,κf; loop body receives w,κf.
```

loop가 정상적으로 guard를 빠져나갈 때에만 κt를 부른다. body failure는 어떤 반복 단계에서도 같은 κf로 간다.

> [!example] Failure unwinds two bindings
> x=30,y=40에서 `newvar x:=1 in (newvar y:=2 in (x:=7; fail))`을 실행한다.
>
> 1. fail 직전은 x=7,y=2다. 안쪽 failure wrapper는 y를 40으로 복원하여 x=7,y=40을 바깥 wrapper로 보낸다.
> 2. 바깥 wrapper는 x를 30으로 복원한 뒤 tabort를 부른다. final behavior는 tabort σ이며 두 local 값은 모두 숨겨진다.
>
> **결론:** failure continuation은 ordinary successor를 실행하지 않으면서도 scope 경계의 복원을 수행한다.

> [!question] Retrieval check
> 1. 왜 local declaration에서 κf만 감싸거나 κt만 감싸면 충분하지 않은가?
> 2. nested binding 예제에서 안쪽 failure wrapper와 바깥 wrapper가 각각 바꾸는 variable과 기억값을 쓰라.

### English companion — Two continuations restore locals on failure

*Normal and failure exits have different futures, but both must pass through scope restoration.*

Single CPS makes output and input simple, but defining fail as tabort σ ignores κ and bypasses any restoration installed there. Clean I/O equations do not solve failure cleanup. Its direct/CPS correspondence matches the normal-only restoration policy, not the required renaming-preserving semantics.

The repair supplies κt for normal exit and κf for failure. Fail invokes κf; assignment, skip, input, and output continue normally through κt. Sequencing inserts c₁ only in c₀'s normal path and passes κf unchanged. This does not add a catch command; κf supports cleanup while propagating failure outward.

A declaration wraps both continuations with the restoration captured before entering its body. Nested failure invokes inner and then outer wrappers before top-level tabort. I/O leaves these wrappers installed for the eventual exit on each branch, preserving locality without retracting prior output.

### Control routing and cleanup

```text
C₂⟦c⟧:(Σ→Ω)→(Σ→Ω)→Σ→Ω; C₂⟦fail⟧κtκfσ=κfσ.
```

Use r=rσ,v; guards and initializers are still evaluated without effects in the appropriate current state.

### Remaining two-continuation equations

```text
Assignment and skip use κt; both conditional branches share κt,κf; loop body receives w,κf.
```

Only a false loop guard invokes κt. A body failure uses the same κf at every iteration.

> [!example] Failure unwinds two bindings
> From x=30,y=40 run `newvar x:=1 in (newvar y:=2 in (x:=7; fail))`.
>
> 1. Just before fail, x=7,y=2. The inner failure wrapper restores y=40, passing x=7,y=40 outward.
> 2. The outer wrapper restores x=30 before invoking tabort. Final behavior is tabort σ; both local values are hidden.
>
> **Conclusion:** The failure continuation performs scope cleanup without executing the ordinary successor.

> [!question] Retrieval check
> 1. Why is wrapping only κf or only κt insufficient for a local declaration?
> 2. Identify the variable and captured value used by each failure wrapper in the nested-binding example.

---

## 11. Workshop: verify one behavior in two styles — §§5.1–5.8 · independent workshop · 6 min

> [!abstract] Section focus
> 같은 interactive command를 direct extension과 two-continuation routing으로 각각 계산한다.

두 표현을 비교하려면 direct result tree를 정상 끝과 실패 끝에서 각각 다른 continuation으로 해석하는 함수 H를 정의한다. H는 output과 input을 보존하며 leaf에서 κt 또는 κf를 호출한다. 이 함수는 c 자체의 실행 규칙이 아니라 이미 만들어진 behavior를 읽는 interpreter다. 앞에서 f*가 normal leaf만 교체했다면 H는 두 leaf를 모두 매개변수화한다. canonical resumption domain에서 continuity를 요구하면 finite approximation에서 정해진 동작이 infinite behavior까지 이어진다.

top-level continuation을 tterm과 tabort로 선택하면 H는 identity가 된다. 원래 leaf를 같은 leaf로 돌려놓고 I/O 구조도 바꾸지 않기 때문이다. 따라서 이 선택에서 two CPS의 결과는 restoration을 올바르게 수행하는 direct meaning과 같다. 다른 continuation을 넣으면 더 큰 context에서 실행하는 효과가 생긴다. 예를 들어 κt가 final x를 추가로 출력할 수 있고 κf는 별도의 failure 보고 행동을 만들 수 있다. 그러나 그런 context가 추가되었다는 사실과 command 자체의 denotation을 혼동하지 않는다.

아래 workshop은 정상 branch와 실패 branch를 모두 계산한다. 한 branch에서만 복원이 맞는 예시는 충분한 검사가 아니다. input이 local variable과 겹칠 때 바깥 값이 남는지, body가 갱신한 free variable은 유지되는지, 실패 뒤 output이 사라지는지, 실패 전 output은 남는지를 각각 확인한다. 손계산이 끝나면 local binder를 fresh name으로 바꾸어 같은 observation이 나오는지도 확인한다. 이것은 arbitrary program equivalence의 증명은 아니지만 locality 오류를 드러내는 작은 검증 패턴이다.

### The correspondence interpreter

```text
C₂⟦c⟧κtκfσ=Hκt,κf(D⟦c⟧σ); Htterm,tabort=idΩ.
```

두 leaf handler와 I/O traversal을 명시하면 direct와 CPS의 대응을 검사할 수 있다.

> [!example] A checked temporary input
> x=9,y=0에서 `newvar x:=0 in (?x; y:=x+1; !y; if x<0 then fail else skip); !y`를 계산한다.
>
> 1. 입력 k 뒤 body state는 x=k,y=k+1이다. 먼저 k+1을 출력한다. k<0이면 abortive leaf, k≥0이면 normal leaf가 나온다.
> 2. direct 방식은 rσ,x†로 두 leaf 모두의 x를 9로 바꾼다. 뒤 !y의 extension은 normal leaf에만 붙는다. k=-3의 답은 output ⟨-2⟩, failure, x=9,y=-2다.
> 3. k=4의 답은 output ⟨5,5⟩, normal exit, x=9,y=5다. CPS 방식에서 body의 κt는 ‘x 복원 후 !y’, κf는 ‘x 복원 후 tabort’이므로 같은 두 답을 얻는다.
>
> **결론:** 전체 결과는 이 branch들을 담은 tin(g)다. k 하나의 trace와 모든 k를 포함하는 resumption을 구별해야 한다.

### Short answers for further practice

- 센서 예제에서 다음 입력 0의 output은 34다. W₃는 세 cycle까지만 보여 주므로 네 번째 output은 W₄부터 드러난다.
- μ(⟨3,3,5⟩)=μ(⟨5,3,σ⟩)={3,5}다. 순서, 중복, 종료 여부를 잃었다. ⟨6,σ⟩와 ⟨6,7⟩는 두 번째 symbol의 type이 달라 서로 prefix가 아니다.
- 처음 restoration 예제의 fail을 skip으로 바꾸면 x=12,y=5로 정상 종료한다. x를 복원하는 규칙은 바뀌지 않고 exit mode만 바뀐다.

> [!question] Retrieval check
> 1. workshop의 local x를 fresh z로 일관되게 바꾼 뒤 k=-3 branch에서 바깥 x=9가 보존됨을 확인하라.
> 2. H의 두 leaf handler를 final continuation으로 고르면 input과 output node에서도 identity가 유지되는 이유를 설명하라.

### English companion — Workshop: verify one behavior in two styles

*Calculate the same interactive command with direct extensions and with two-continuation routing.*

Compare the styles by defining H to interpret normal and failure leaves of a direct result using κt and κf. It preserves I/O and invokes the selected continuation at a leaf. H interprets an already constructed behavior; unlike f*, it parameterizes both exit forms. On the canonical domain, continuity extends finite-approximation behavior to infinite behavior.

With top-level continuations tterm and tabort, H is the identity: it restores each leaf unchanged and preserves I/O. Thus two CPS agrees with the correctly restoring direct semantics. Other continuations embed the command in a larger future context, perhaps printing x on normal exit or reporting failure, and must not be confused with the command alone.

The workshop checks both exit branches: restoration of an input local, survival of free-variable updates, removal of output after failure, and preservation of output before failure. Renaming the local binder supplies a further locality check. This is not a general equivalence proof, but a useful small pattern for detecting semantic mistakes.

### The correspondence interpreter

```text
C₂⟦c⟧κtκfσ=Hκt,κf(D⟦c⟧σ); Htterm,tabort=idΩ.
```

Explicit leaf handlers and I/O traversal make the direct/CPS correspondence checkable.

> [!example] A checked temporary input
> From x=9,y=0 calculate `newvar x:=0 in (?x; y:=x+1; !y; if x<0 then fail else skip); !y`.
>
> 1. After input k, the body store is x=k,y=k+1 and it first emits k+1. The body ends abortively for k<0 and normally for k≥0.
> 2. Direct semantics restores x=9 in both leaves with rσ,x† and attaches the last !y only at the normal leaf. For k=-3 the answer is output ⟨-2⟩, failure, x=9,y=-2.
> 3. For k=4 the answer is output ⟨5,5⟩, normal exit, x=9,y=5. In CPS the body receives normal future ‘restore x, then !y’ and failure future ‘restore x, then tabort’, yielding exactly these answers.
>
> **Conclusion:** The total result is tin(g) containing all these branches, not just the trace for one chosen k.

### Short answers for further practice

- The sensor's next output for input 0 is 34. W₃ exposes only three cycles, so the fourth output first appears in W₄.
- Both μ examples give {3,5}, losing order, multiplicity, and termination. ⟨6,σ⟩ and ⟨6,7⟩ are incomparable because their second symbols have different types.
- Replacing fail by skip in the first restoration example gives normal exit with x=12,y=5: the restoration stays the same; only the exit mode changes.

> [!question] Retrieval check
> 1. Rename workshop local x consistently to fresh z and verify that outer x=9 survives the k=-3 branch.
> 2. Explain why choosing final continuations as H's leaf handlers also preserves input and output nodes.

---

## 12. Synthesis: observations choose the architecture — §§5.1–5.8 · synthesis · 4 min

> [!abstract] Section focus
> domain, extension, continuation은 별도 기법 목록이 아니라 같은 관찰을 조직하는 세 층이다.

전체 흐름을 한 사례로 읽어 보자. 작업 서버가 입력을 받아 output을 보낸 뒤 실패할 수 있다면 결과는 integer 하나나 final state 하나가 아니다. 어떤 입력을 요청했는지, 입력값마다 어떤 output을 보냈는지, 어느 scope를 빠져나가며 어떤 바깥 store가 남았는지가 합쳐진 행동이다. direct 방식은 그 행동을 domain 원소로 만든 뒤 extension으로 연결하고, CPS 방식은 이후 행동을 continuation으로 미리 전달한다. 둘의 차이는 관찰 결과가 아니라 결과를 조립하는 위치에 있다.

모델의 경계도 결과만큼 분명해야 한다. prefix order는 wall-clock 시간을 기록하지 않으며 input branch는 scheduler의 비결정적 선택이 아니다. local restoration은 output 취소나 transaction rollback이 아니고, 두 continuation은 user-level exception handler 문법을 자동으로 제공하지 않는다. continuity는 모든 값을 효과적으로 계산할 수 있다는 보장이 아니며 recursive isomorphism은 집합을 아무 제약 없이 자기 자신과 같게 놓는 표기가 아니다. 이 경계를 지키면 더 큰 언어를 배울 때 비슷한 기호를 보아도 성급히 동일시하지 않게 된다.

새 effect를 검토할 때 먼저 작은 반례를 만든다. 이전 결과 공간에서 구별할 수 없는 두 실행이 사용자에게 다르게 보이는지 묻는다. 다음으로 successor가 실행되어야 하는 exit와 실행되면 안 되는 exit를 나눈다. 마지막으로 local scope의 진입 시점에 기억해야 할 값과 모든 exit에서 수행해야 할 복원을 찾는다. 이 세 질문에 답하면 domain을 확장해야 할지 continuation 인자를 더해야 할지 판단할 실마리가 생긴다. 단, 설계가 그럴듯하다는 것과 대응 정리가 증명되었다는 것은 다른 주장이다.

### Coverage and recall map

- §5.1: failure와 bottom을 분리하고 f*와 r†, partial와 total correctness를 구별한다. failure state에도 local restoration을 적용해야 renaming을 보존한다.
- §§5.2–5.3: finite divergent prefix, marked termination, infinite output을 prefix domain에 넣고 finite evidence로 continuity를 설명한다. 사용자 집합 관찰과 safety/liveness의 domain 기준도 함께 검토한다.
- §§5.4–5.6: product, disjoint sum, lifting으로 recursive isomorphism을 조립하고 canonical solution의 역할을 구분한다. input은 환경값으로 index된 deterministic resumption branch를 더한다.
- §§5.7–5.8: single CPS는 rest of computation을 인자로 전달하고 two CPS는 normal과 failure route를 분리하여 둘 다 local cleanup을 통과시킨다. final continuations를 선택하면 올바른 direct result를 되찾는다.

> [!abstract] A final independent check
> 백지에 Ω의 다섯 가지 행동을 적고 각 행동에서 f*, r†, H가 무엇을 하는지 설명하라. 이어서 local input 뒤 실패하는 짧은 program을 만들고 정상 입력과 실패 입력의 결과를 각각 계산하라. 다섯 행동 중 하나라도 빠지거나 failure에서 r†가 state를 바꾸지 않는다면 아직 대응식의 전제를 만족하지 못한다. 설명을 외우는 대신 type, exit mode, prefix, captured outer value를 매 단계 적는 것이 가장 짧은 검산법이다.

> [!question] Retrieval check
> 1. 새 effect가 추가되면 ‘무엇을 관찰하는가’, ‘누가 control을 받는가’, ‘어떤 scope를 복원하는가’를 각각 한 문장으로 답하라.
> 2. 같은 behavior를 direct와 CPS로 계산할 때 각각 어디에서 successor와 cleanup을 연결하는지 비교하라.

### English companion — Synthesis: observations choose the architecture

*Domains, extensions, and continuations are three layers organizing the same observations.*

A server accepting input, emitting output, and possibly failing denotes neither one integer nor one final state. Its behavior combines input requests, responses for each value, and stores exposed after scope exit. Direct semantics constructs this behavior and attaches futures with extensions; CPS passes the future in beforehand. They differ in assembly, not in the chosen observations.

Keep the boundaries explicit: prefix order omits clock time; input branching is not scheduler nondeterminism; restoration is not rollback; two continuations do not automatically add user-level handlers. Continuity does not ensure effective computation, and recursive isomorphism is not unconstrained self-equality of sets. These distinctions prevent false identifications in richer languages.

For a new effect, first seek two executions users distinguish but the old domain identifies. Then classify exits that should run the successor. Finally identify entry-time values and cleanup required on every scope exit. These questions guide domain and continuation changes, while remaining distinct from a proof of correspondence.

### Coverage and recall map

- §5.1 separates failure from bottom, sequencing from restoration, and partial from total correctness. Restoring failure stores preserves renaming.
- §§5.2–5.3 organize finite divergent prefixes, marked termination, and infinite output in a prefix domain, motivate continuity through finite evidence, and examine set observations and domain-relative safety/liveness.
- §§5.4–5.6 build recursive isomorphisms from products, sums, and lifting, distinguish the canonical solution, and add deterministic input-indexed resumption branches.
- §§5.7–5.8 pass future computation through single CPS, then separate normal and failure routes so both traverse cleanup. Choosing final continuations recovers the correct direct result.

> [!abstract] A final independent check
> On a blank page, list Ω's five behavior forms and explain f*, r†, and H on each. Then derive normal and failing branches of a short program with local input. Omitting a form or leaving a failure store unrestored breaks the correspondence assumptions. Track type, exit mode, prefix, and captured outer value rather than memorizing prose.

> [!question] Retrieval check
> 1. For a new effect, answer separately: what is observed, who receives control, and which scopes are restored?
> 2. Compare where direct and CPS semantics attach the successor and cleanup while describing the same behavior.

# Condensed review

## Step 1 — Make failure an explicit result — §5.1

`fail`은 정상 상태와 다른 관찰 가능한 종료이며 비종료와도 구별될 수 있다.

결과 공간에 `(abort,σ)`를 추가하면 실패 순간의 상태를 보존할 수 있다. 순차 구성은 앞 명령이 정상 종료할 때만 뒤 명령을 실행하고, 실패나 비종료는 그대로 전파한다.

> [!question] Close the book and answer
> 실패를 비종료와 같은 ⊥로 합치면 catch 같은 구성을 설명할 때 어떤 정보를 잃는가?

### English companion

`fail` is an observable termination distinct from both a normal state and divergence.

Adding `(abort,σ)` to the result space preserves the state at failure. Sequencing runs its second command only after normal termination; failure and divergence propagate.

---

## Step 2 — From finite observations to continuity — §5.2–5.5

출력은 유한 또는 무한 시퀀스로 누적되고, 유한 시간의 관찰은 유한한 계산 근사에만 의존해야 한다.

접두사 순서는 출력 정보의 증가를 나타낸다. 제품과 분리합으로 복합 결과를 만들고, 재귀 도메인 방정식으로 무한 행동을 유한 단계 구조의 극한으로 정의한다. 연속성은 무한 정보를 갑자기 검사하는 비현실적 함수를 배제한다.

> [!question] Close the book and answer
> 출력 스트림의 어떤 유한 접두사를 결정하는 데 전체 무한 입력이 필요하다면 왜 비연속적인가?

### English companion

Output accumulates as finite or infinite sequences, and any finite-time observation must depend on only a finite computation approximation.

Prefix order represents growing output information. Products and disjoint unions assemble results, while recursive domain equations describe infinite behavior as limits of finite structure. Continuity rules out unrealistic functions that inspect infinite information at once.

---

## Step 3 — Computations that wait for input — §5.6

입력 명령은 한 값이 아니라 가능한 각 입력 뒤의 나머지 계산을 가진 재개 노드다.

재개 도메인은 종료, 실패, 출력 후 계속, 입력별 계속 같은 constructor를 재귀적으로 묶는다. 프로그램 의미는 최종 결과가 아니라 환경과 주고받는 잠재적으로 무한한 트리다.

> [!question] Close the book and answer
> 출력은 하나의 다음 재개를 갖지만 입력은 함수 형태의 여러 다음 재개를 갖는 이유는?

### English companion

An input command is a resumption node containing the rest of the computation for every possible input.

A resumption domain recursively combines termination, failure, output-and-continue, and input-indexed continuation constructors. A program denotes a potentially infinite interaction tree rather than a single final result.

---

## Step 4 — Pass the rest of the computation explicitly — §5.7–5.8

계속은 현재 명령 뒤에 무엇을 할지 나타내는 함수이며, 각 syntax의 의미가 그 계속을 받아 전체 결과를 만든다.

순차 구성에서 `c₀;c₁`은 c₁의 의미를 현재 계속과 결합한 뒤 c₀에 넘긴다. 실패는 정상 계속을 무시하고 실패 경로로 빠지므로 예외·탈출·제어 효과를 direct semantics보다 자연스럽게 표현한다.

> [!question] Close the book and answer
> CPS에서 순차 구성의 계산 순서가 계속의 중첩 순서로 어떻게 나타나는가?

### English companion

A continuation represents what happens after the current command; each construct receives it and produces the overall result.

For `c₀;c₁`, combine c₁ with the current continuation and pass that to c₀. Failure ignores the normal continuation and follows an abort path, making exceptions, exits, and control effects more natural than in direct style.

## Self-check quiz

### Q1. When is resumption semantics needed beyond final-state semantics?

resumption semantics이 final-state semantics보다 필요한 경우는?

- A. 중간 입출력을 관찰할 때 / When intermediate I/O is observable
- B. 변수 이름을 짧게 할 때 / When shortening variable names
- C. 문법에 괄호가 있을 때 / When syntax has parentheses

> [!success]- Answer and explanation
> **A.** 상호작용 과정 자체가 관찰되므로 최종 상태만으로 부족하다.
>
> EN: The interaction process itself is observable, so a final state is insufficient.

### Q2. What does prefix order represent?

접두사 순서가 표현하는 것은?

- A. 더 긴 시퀀스가 더 많은 관찰 정보를 가짐 / A longer sequence carries more observed information
- B. 정수의 대소 관계 / Integer magnitude
- C. 소스 파일 순서 / Source-file order

> [!success]- Answer and explanation
> **A.** 유한 출력은 무한 출력의 근사다.
>
> EN: Finite outputs approximate an infinite output.

### Q3. What is the intuition for a continuation?

계속의 직관은?

- A. 현재까지의 로그 / A log of the past
- B. 현재 계산 뒤에 할 일 / What to do after the current computation
- C. 변수의 타입 / A variable's type

> [!success]- Answer and explanation
> **B.** 계속은 미래의 계산 문맥을 함수 값으로 표현한다.
>
> EN: A continuation represents the future computation context as a function.

## Next concept

도메인 방정식으로 계산 과정을 기술했으니, 다음에는 한 번의 실행 단계를 추론 규칙으로 직접 정의하는 transition semantics으로 관점을 바꾼다.

**English:** Having described processes denotationally, we next switch to transition semantics, defining one execution step directly by inference rules.

## Source boundary

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 97–125.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
