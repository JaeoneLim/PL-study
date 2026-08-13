---
type: chapter
title: "19. Algol 계열 언어"
title_en: "Algol-like Languages"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "415–446"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-15-simple-type-system]]"
  - "[[chapter-16-subtypes-intersection-types]]"
  - "[[chapter-17-polymorphism]]"
---

# 19. Algol 계열 언어 (Algol-like Languages)

> [!abstract] 한눈에 보기
> 데이터 타입과 구절 타입을 구분해 명령형·함수형 구성을 통합하고, 배열·선언자·변수·프로시저의 스택 기반 의미를 정교화한다.
>
> **English:** Data types and phrase types unify imperative and functional constructs, followed by arrays, declarators, variables, procedures, and a semantics that embodies stack discipline.

## 학습 목표

- 값 타입과 구절 타입을 구분한다.
  - EN: Distinguish data types from phrase types.
- expression·acceptor·variable·command의 관계를 설명한다.
  - EN: Explain relationships among expression, acceptor, variable, and command phrase types.
- 스택 규율이 가능한 탈출과 저장 수명을 제한하는 방식을 설명한다.
  - EN: Explain how stack discipline limits escape and storage lifetime.

## 핵심 용어

- **구절 타입 (phrase type)**
- **acceptor (acceptor)**
- **variable (variable)**
- **선언자 (declarator)**
- **스택 규율 (stack discipline)**
- **Algol (Algol)**

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### 구절 타입 (phrase type)

저장되는 데이터의 종류가 아니라 expression, 쓰기 대상, command, procedure처럼 프로그램 조각이 제공하는 계산 능력을 분류하는 타입이다.

> [!example] 엔지니어 관점
> 같은 32-bit data라도 source-only port, sink-only port, 양방향 register interface가 다른 capability type을 갖는 것과 같다.

**English definition:** A type classifying the computational capability provided by a program phrase—expression, writable target, command, or procedure—rather than the kind of stored data.

> [!example] Engineering view
> It is like giving different capability types to a source-only port, sink-only port, and bidirectional register interface even though all carry 32-bit data.

### acceptor

주어진 타입의 값을 받아 저장하거나 반영할 수 있는 쓰기 능력을 나타내는 구절이다. 값을 읽어 내는 expression과 반대 방향이다.

> [!example] 엔지니어 관점
> write-only register port나 ready를 가진 data sink와 같다. 값을 어디서 읽는지는 제공하지 않고 값을 보낼 수 있는 endpoint만 제공한다.

**English definition:** A phrase representing the capability to accept and store or otherwise act on a value of a given type. Its direction contrasts with an expression that produces a value.

> [!example] Engineering view
> It is like a write-only register port or a data sink with ready. It provides an endpoint for sending a value, not a way to read one back.

```text
acc[τ]
```

### variable

같은 저장 대상을 읽는 expression 능력과 쓰는 acceptor 능력을 함께 제공하는 구절이다.

> [!example] 엔지니어 관점
> read data port와 write data/enable port가 한 register abstraction을 이루는 것과 같다. 단순 값이 아니라 읽기와 쓰기라는 두 동작을 묶는다.

**English definition:** A phrase combining an expression capability for reading a storage object with an acceptor capability for writing it.

> [!example] Engineering view
> It is like the read-data and write-data/enable ports together forming one register abstraction. A variable packages two operations, not just a value.

```text
var[τ] ≈ exp[τ] × acc[τ]
```

### 선언자 (declarator)

새 저장 공간과 그 이름 또는 능력을 만들고, 정해진 본문 범위에 제공한 뒤 범위가 끝나면 회수하는 프로그램 구성이다.

> [!example] 엔지니어 관점
> submodule 진입 시 local scratchpad를 할당해 내부 datapath에만 연결하고 작업이 끝나면 재사용 가능하게 만드는 lifetime controller와 비슷하다.

**English definition:** A program construct that allocates fresh storage and a name or capability for it, supplies it within a body scope, and reclaims it when that scope ends.

> [!example] Engineering view
> It resembles a lifetime controller allocating a local scratchpad for one submodule operation, wiring it only to the internal datapath, then reclaiming it afterward.

### 스택 규율 (stack discipline)

나중에 할당된 지역 저장이 먼저 해제되고, 지역 위치가 그 범위보다 오래 살아남지 못하도록 하는 LIFO 수명 규칙이다.

> [!example] 엔지니어 관점
> nested procedure마다 stack frame을 push하고 return 때 pop하는 CPU runtime과 같다. local address가 밖으로 escape하면 pop 뒤 dangling reference가 생겨 규율이 깨진다.

**English definition:** A LIFO lifetime rule under which later local allocations are released first and no local location survives beyond its scope.

> [!example] Engineering view
> It is the CPU runtime pattern of pushing a stack frame for each nested procedure and popping it on return. An escaping local address would become a dangling reference after the pop.

### Algol

block structure, lexical scope, 지역 변수, procedure를 현대적 형태로 정립한 초기 언어 계열이다. 이 장에서는 그 설계 원리를 의미와 타입으로 분석한다.

> [!example] 엔지니어 관점
> 현대 HDL의 nested scope, automatic variable, task/function 같은 기능의 역사적 조상 중 하나로 볼 수 있다. 특정 최신 언어 문법을 배우는 장은 아니다.

**English definition:** An early language family that established modern forms of block structure, lexical scope, local variables, and procedures. This chapter studies its design principles semantically and through types.

> [!example] Engineering view
> It can be viewed as one historical ancestor of nested scope, automatic variables, and task/function concepts found in modern HDLs. The chapter is not a tutorial for one modern language.

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 함수형 추상화와 지역 가변 상태를 구절 타입 및 스택 수명 규율 아래 결합해 Algol식 언어의 의미와 구현 원리를 설명한다.
>
> **English:** Combines functional abstraction with local mutable state under phrase types and stack lifetimes to explain Algol-like meaning and implementation.

### §19.1–19.2 · 데이터 타입과 구절 타입

데이터 타입은 저장되는 값의 종류를, 구절 타입은 표현식·수용자·변수·명령·프로시저처럼 계산이 제공하는 능력을 분류한다. 타입 규칙은 읽기와 쓰기를 분리한다.

**English — Data types and phrase types:** Data types classify stored values; phrase types classify capabilities such as expressions, acceptors, variables, commands, and procedures. Typing separates reading from writing.

### §19.3 · 매개변수 전달과 예제

값·이름·프로시저 매개변수를 구절 타입으로 비교한다. 실제 인수를 값이 아니라 계산 구절로 전달하면 재평가와 부작용이 호출 문맥에 남는다.

**English — Parameter passing and examples:** Compares value, name, and procedure parameters through phrase types. Passing an actual argument as a computation rather than a value preserves re-evaluation and effects in the calling context.

### §19.4 · 배열과 선언자

배열은 인덱스에서 변수 구절로 가는 값으로, 선언자는 신선한 지역 저장을 본문에 제공하는 고차 구절로 본다. 범위 종료 시 위치 수명도 끝나야 한다.

**English — Arrays and declarators:** Arrays map indices to variable phrases; declarators are higher-order phrases supplying fresh local storage to a body. Location lifetime must end with scope.

### §19.5 · 스택 규율을 내장한 의미

지역 위치가 결과나 장수 클로저를 통해 탈출하지 못하도록 의미 범주를 제한한다. 중첩 선언의 할당과 해제가 후입선출이 됨을 의미 수준에서 정당화한다.

**English — Semantics enforcing stack discipline:** Semantic categories prevent local locations from escaping through results or longer-lived closures, justifying last-in-first-out allocation and deallocation for nested declarations.

### §19.6–19.7 · 변수와 프로시저 의미

변수는 읽는 expression과 쓰는 acceptor의 쌍으로, 프로시저는 인수 구절을 받아 결과 구절을 만드는 고차 의미로 해석한다. 별칭과 호출 방식이 이 구조에서 드러난다.

**English — Meaning of variables and procedures:** Variables pair a readable expression with a writable acceptor; procedures are higher-order meanings from argument phrases to result phrases. Aliasing and calling modes become explicit.

### §19.8 · 확장과 단순화의 대가

재귀 프로시저, 복합 데이터, 매개변수 방식 같은 확장을 넣을 때 구절 타입, 수명, 평가 규칙 중 무엇이 바뀌는지 추적한다. 단순화는 표현력이나 안전 보장을 줄일 수 있다.

**English — Tradeoffs in extensions and simplifications:** Tracks which phrase types, lifetimes, and evaluation rules change when adding recursion, richer data, or parameter modes. Simplification can reduce expressiveness or safety guarantees.

## 반드시 남겨야 할 핵심

- 구절 타입은 값의 종류보다 프로그램 조각이 제공하는 사용 능력을 분류한다.
  - EN: Phrase types classify the capabilities offered by program fragments rather than only kinds of values.
- 스택 할당의 정당성은 지역 참조가 범위를 탈출하지 않는다는 의미·타입 성질에 달려 있다.
  - EN: Justifying stack allocation depends on a semantic or typing guarantee that local references do not escape.
- Algol식 결합은 함수와 상태의 단순 이론을 함께 놓을 때 생기는 긴장을 드러낸다.
  - EN: The Algol-like combination exposes tensions that arise when the simple theories of functions and state meet.

> [!warning] 자주 생기는 혼동
> - variable을 단순 위치와 동일시하지 않는다. 읽기와 쓰기 능력의 쌍으로 본다.
>   - EN: Do not identify a variable with a bare location; treat it as paired read and write capabilities.
> - call-by-name 매개변수는 값이 아니므로 사용 횟수만큼 실제 인수가 다시 계산될 수 있다.
>   - EN: A call-by-name parameter is not a value, so its actual argument may be recomputed at each use.

## 1단계 — 값과 계산 능력의 타입 분리 — §19.1–19.2

데이터 타입은 저장되는 값의 종류를, 구절 타입은 식·대입 대상·명령·프로시저 같은 사용 방식을 분류한다.

읽기 가능한 expression과 쓰기 가능한 acceptor를 짝지으면 variable이 된다. 타입 규칙은 읽기·쓰기 능력을 분리해 aliasing과 매개변수 전달을 더 정밀하게 표현한다.

> [!question] 책을 덮고 답해 보기
> 읽기 전용 매개변수와 쓰기 전용 매개변수를 phrase type으로 어떻게 구분할 수 있는가?

### English companion

Data types classify stored values; phrase types classify modes of use such as expressions, acceptors, commands, and procedures.

Pairing a readable expression with a writable acceptor yields a variable. Typing rules separate read and write capabilities, representing aliasing and parameter passing more precisely.

---

## 2단계 — 구절 타입으로 선언과 배열 읽기 — §19.3–19.4

배열·선언자는 값 하나가 아니라 범위 안에서 새 저장과 이름을 만드는 계산 구성이다.

배열 변수는 첨자에서 variable 구절로 가는 구조로 이해할 수 있다. 선언자는 본문에 신선한 저장 능력을 공급한 뒤 범위가 끝나면 회수하므로 단순 함수 값과 다르다.

> [!question] 책을 덮고 답해 보기
> 배열을 `index → var[τ]`로 보는 것이 읽기와 쓰기를 함께 설명하는 이유는?

### English companion

Arrays and declarators are not mere values; they create fresh storage and names within a scope.

An array variable can be viewed as mapping indices to variable phrases. A declarator supplies fresh storage capabilities to its body and reclaims them on scope exit, unlike an ordinary value.

---

## 3단계 — semantics에 스택 수명 넣기 — §19.5

지역 저장이 범위 밖으로 탈출하지 못하게 하면 할당과 해제가 후입선출 규율을 따른다.

일반 저장소 의미는 지역 위치가 클로저나 참조로 살아남는 heap 동작도 허용한다. Algol식 의미는 타입·범주 또는 가능 세계 구조로 범위 밖 참조를 막아 스택 구현을 정당화한다.

> [!question] 책을 덮고 답해 보기
> 지역 변수 주소를 반환할 수 있다면 스택 규율이 깨지는 이유는?

### English companion

Preventing local storage from escaping its scope enforces last-in-first-out allocation and deallocation.

A general store semantics allows local locations to survive through closures or references, behaving like a heap. Algol-like semantics uses types, categories, or world structure to prevent out-of-scope references, justifying stack implementation.

---

## 4단계 — 변수와 프로시저의 이중성 — §19.6–19.8

변수는 읽기·쓰기 동작의 쌍이고, 프로시저는 구절을 받아 명령을 만드는 고차 구절이다.

call-by-name류 매개변수는 값이 아니라 계산 능력을 전달해 Jensen's device 같은 패턴을 가능하게 한다. 확장 규칙은 복사 규칙, 범위, 평가 시점이 결합될 때 생기는 미묘함을 드러낸다.

> [!question] 책을 덮고 답해 보기
> 값 매개변수와 이름 매개변수가 부작용 있는 실제 인수를 몇 번 평가하는지 비교하라.

### English companion

A variable pairs read and write actions; a procedure is a higher-order phrase accepting phrases and producing commands.

Call-by-name-like parameters pass computational capabilities rather than values, enabling patterns such as Jensen's device. Extensions expose subtle interactions among copying rules, scope, and evaluation time.

## 자체 점검 퀴즈

### Q1. phrase type이 분류하는 것은?

What do phrase types classify?

- A. 값의 비트 폭만 / Only bit widths of values
- B. 표현식·대입 대상·명령 같은 계산 사용 방식 / Computational modes such as expressions, acceptors, and commands
- C. 파일 확장자 / File extensions

> [!success]- 정답과 해설
> **B.** 데이터 종류와 그 데이터를 사용하는 능력을 분리한다.
>
> EN: They separate data kinds from capabilities for using data.

### Q2. Algol식 스택 규율의 핵심 제한은?

What is the key restriction behind Algol-like stack discipline?

- A. 지역 저장 위치가 범위 밖으로 탈출하지 않음 / Local storage locations do not escape their scope
- B. 재귀를 금지 / Recursion is forbidden
- C. 모든 변수가 전역 / All variables are global

> [!success]- 정답과 해설
> **A.** 그래야 블록 종료 시 저장을 안전하게 회수할 수 있다.
>
> EN: Then storage can be safely reclaimed when the block exits.

### Q3. `var[τ]`의 직관은?

What is the intuition for `var[τ]`?

- A. 읽기 expression과 쓰기 acceptor의 결합 / A readable expression combined with a writable acceptor
- B. 정수 상수 / An integer constant
- C. 타입 변수만 / Only a type variable

> [!success]- 정답과 해설
> **A.** 변수의 두 관찰 가능한 능력을 함께 제공한다.
>
> EN: It combines the two observable capabilities of a variable.

## 다음 개념으로

19개 장의 공통 언어는 집합·관계·함수다. 부록은 책 전체의 표기와 증명에 필요한 수학 기초를 빠르게 복습한다.

**English:** Sets, relations, and functions are the common language of all 19 chapters. The appendix provides a compact review of the notation and mathematics used throughout.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 415–446.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
