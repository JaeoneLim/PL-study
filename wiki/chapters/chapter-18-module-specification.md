---
type: chapter
title: "18. 모듈 명세"
title_en: "Module Specification"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "398–414"
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

# 18. 모듈 명세 (Module Specification)

> [!abstract] 한눈에 보기
> 타입 정의와 실존 양화를 사용해 모듈이 내부 표현 타입을 숨기면서 연산 계약을 공개하는 방식을 형식화한다.
>
> **English:** Type definitions and existential quantification formalize modules that hide an internal representation type while exposing an operational contract.

## 학습 목표

- 투명·불투명 타입 정의를 구분한다.
  - EN: Distinguish transparent and opaque type definitions.
- 실존 패키지의 pack/unpack 규칙을 사용한다.
  - EN: Use pack and unpack rules for existential packages.
- 한 추상을 다른 추상으로 구현하는 표현 함수를 추적한다.
  - EN: Trace representation functions when implementing one abstraction with another.

## 핵심 용어

- **추상 타입 (abstract type)**
- **실존 타입 (existential type)**
- **패키징 (packing)**
- **개봉 (unpacking)**
- **표현 독립성 (representation independence)**

## 1단계 — 타입 이름에 경계 세우기 — §18.1

타입 정의는 표현 타입에 이름을 주며, 불투명 정의는 클라이언트가 그 등식을 사용하지 못하게 한다.

구현 내부에서는 새 타입과 표현 타입의 변환을 알 수 있지만 인터페이스 밖에서는 제공된 연산만 사용할 수 있다. 이 정보 은닉이 표현 교체 가능성의 기반이다.

> [!question] 책을 덮고 답해 보기
> 추상 stack 타입이 list와 같다는 사실을 공개하면 클라이언트가 어떤 불변식을 깨뜨릴 수 있는가?

### English companion

A type definition names a representation type; an opaque definition prevents clients from using that equality.

Inside the implementation, conversions to the representation are known; outside, only exported operations are available. This information hiding enables representation replacement.

---

## 2단계 — '어떤 표현이 존재한다'로 모듈 쓰기 — §18.2

`∃α.T` 패키지는 숨겨진 표현 타입 α와 그 타입에서 T를 만족하는 구현을 함께 담는다.

pack은 구체 표현 타입과 구현을 봉인한다. unpack은 α를 신선한 추상 타입으로 열어 T의 연산을 쓰게 하지만, α나 그 값이 범위 밖으로 표현을 누설하면 안 된다.

> [!question] 책을 덮고 답해 보기
> unpack의 α 신선성 조건이 필요한 이유는?

### English companion

A package of type `∃α.T` contains a hidden representation α and an implementation satisfying T at that type.

Pack seals a concrete representation and implementation. Unpack opens α as a fresh abstract type for using operations in T, but α and its values must not escape in a way that leaks the representation.

---

## 3단계 — 표현 독립성의 관찰 기준 — §18.2

서로 다른 표현을 가진 두 패키지가 인터페이스의 모든 클라이언트에서 같은 관찰을 내면 같은 모듈로 취급할 수 있다.

클라이언트는 α 값을 직접 분해하지 못하므로 공개 연산이 보존하는 관계만 관찰한다. 추상화 정리는 구현 사이의 관계가 각 연산에서 보존되면 클라이언트 동치가 따름을 보여 주는 방향으로 읽을 수 있다.

> [!question] 책을 덮고 답해 보기
> 리스트 기반 stack과 배열 기반 stack 사이에 어떤 관계를 세우면 같은 인터페이스 구현임을 보일 수 있는가?

### English companion

Two packages with different representations are equivalent when every interface-respecting client observes the same behavior.

Because clients cannot inspect α directly, they observe only relations preserved by exported operations. An abstraction theorem shows that a representation relation preserved by each operation yields client equivalence.

---

## 4단계 — 한 추상화를 다른 추상화로 구현 — §18.3

기존 추상 타입의 연산만 사용해 새 모듈을 만들면 내부 표현 관계를 합성해 정확성을 증명할 수 있다.

구현은 단순 타입 일치 이상으로 연산 법칙을 보존해야 한다. 모듈 명세는 숨겨진 표현과 공개 관찰 사이의 증명 경계를 명확히 한다.

> [!question] 책을 덮고 답해 보기
> 큐를 두 스택으로 구현할 때 타입 일치 외에 보존해야 할 핵심 추상 관계는?

### English companion

Building a module only from operations of an existing abstraction lets representation relations compose into a correctness proof.

An implementation must preserve operational laws, not merely match types. Module specifications clarify the proof boundary between hidden representation and public observations.

## 자체 점검 퀴즈

### Q1. 실존 타입이 모듈에서 숨기는 것은?

What does an existential type hide in a module?

- A. 표현 타입 / The representation type
- B. 모든 연산 이름 / All operation names
- C. 프로그램 종료 여부 / Whether the program terminates

> [!success]- 정답과 해설
> **A.** 클라이언트는 표현을 모르고 공개 연산만 사용한다.
>
> EN: Clients know only exported operations, not the representation.

### Q2. pack의 역할은?

What does pack do?

- A. 구체 표현과 구현을 실존 인터페이스로 봉인 / Seal a representation and implementation behind an existential interface
- B. 모든 타입을 같게 만듦 / Make all types equal
- C. 동적 바인딩 활성화 / Enable dynamic binding

> [!success]- 정답과 해설
> **A.** 구현 세부를 숨기는 도입 연산이다.
>
> EN: It is the introduction form that hides implementation details.

### Q3. 표현 독립성이 허용하는 것은?

What does representation independence permit?

- A. 관찰 동작을 보존하며 내부 표현 교체 / Replace an internal representation while preserving observations
- B. 인터페이스 삭제 / Delete the interface
- C. 모든 클라이언트 수정 / Modify every client

> [!success]- 정답과 해설
> **A.** 추상 경계를 지키는 클라이언트는 차이를 보지 못한다.
>
> EN: Clients respecting the abstraction boundary cannot tell the difference.

## 다음 개념으로

추상 타입과 함수형 모듈의 아이디어를 마지막 장에서는 명령·식·위치·프로시저가 공존하는 Algol식 블록 구조에 적용한다.

**English:** The final chapter applies abstraction and typing ideas to Algol-like block structure, where commands, expressions, locations, and procedures coexist.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 398–414.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
