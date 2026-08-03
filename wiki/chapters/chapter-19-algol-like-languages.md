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

## 3단계 — 의미론에 스택 수명 넣기 — §19.5

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
