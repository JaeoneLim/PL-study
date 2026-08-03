---
type: chapter
title: "17. 다형성"
title_en: "Polymorphism"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "379–397"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-15-simple-type-system]]"
  - "[[chapter-16-subtypes-intersection-types]]"
  - "[[chapter-18-module-specification]]"
---

# 17. 다형성 (Polymorphism)

> [!abstract] 한눈에 보기
> System F식 전칭 타입, 타입 추상화·적용, 다형적 프로그래밍 인코딩과 외재적 의미를 다룬다.
>
> **English:** System-F-style universal types, type abstraction and application, polymorphic encodings, and extrinsic semantics are developed.

## 학습 목표

- 타입 추상화와 타입 적용을 유도한다.
  - EN: Derive type abstraction and type application.
- 전칭 타입이 단순한 여러 단형 타입 목록보다 강한 이유를 설명한다.
  - EN: Explain why a universal type is stronger than a list of monomorphic typings.
- 다형적 데이터 인코딩의 생산자·소비자 구조를 읽는다.
  - EN: Read producer-consumer structure in polymorphic data encodings.

## 핵심 용어

- **전칭 다형성 (universal polymorphism)**
- **타입 추상화 (type abstraction)**
- **타입 적용 (type application)**
- **System F (System F)**
- **다형적 인코딩 (polymorphic encoding)**

## 1단계 — 타입 변수도 바인딩하기 — §17.1

`Λα.e`는 타입 α를 추상화하고 `e [T]`는 다형적 항을 구체 타입 T에서 사용한다.

`∀α.T` 도입 시 α가 항 문맥의 가정에 자유롭게 의존하지 않아야 한다. 제거는 T 안의 α를 원하는 타입으로 치환한다. 항 수준 바인딩과 마찬가지로 타입 변수도 캡처 회피가 필요하다.

> [!question] 책을 덮고 답해 보기
> 다형적 항등함수 `Λα. λx:α.x`의 타입과 Int에서의 인스턴스를 써 보라.

### English companion

`Λα.e` abstracts over a type α; `e [T]` instantiates a polymorphic term at concrete type T.

Introducing `∀α.T` requires α not to depend freely on term-context assumptions. Elimination substitutes a chosen type for α. Type variables need capture avoidance just like term variables.

---

## 2단계 — 모든 타입에서 같은 코드 — §17.1

전칭 타입은 각 타입마다 별도 구현이 있다는 뜻이 아니라 하나의 항이 임의 타입에서 잘 동작한다는 뜻이다.

타입 추상화 안에서는 α 값의 내부 구조를 알 수 없으므로 가능한 동작이 제한된다. 이 균일성은 이후 parametricity로 정교해지지만 책에서는 규칙과 의미 수준에서 기반을 마련한다.

> [!question] 책을 덮고 답해 보기
> 종료하는 순수 함수가 `∀α. α→α`라면 왜 사실상 항등함수여야 하는지 직관을 말하라.

### English companion

A universal type does not mean separate implementations per type; one term works at arbitrary types.

Inside a type abstraction, code cannot inspect the unknown structure of α, restricting possible behavior. This uniformity anticipates parametricity, though the book develops the foundation through rules and semantics.

---

## 3단계 — 함수로 자료 표현하기 — §17.2

불리언, 자연수, 리스트 같은 자료를 모든 결과 타입의 소비자를 받는 다형 함수로 표현할 수 있다.

전칭 타입은 비타입 Church 인코딩에 잘못된 소비를 막는 규율을 더한다. 데이터의 타입은 어떤 제거 연산을 허용하는지 명시하고, fold가 중심 인터페이스가 된다.

> [!question] 책을 덮고 답해 보기
> 다형적 리스트 인코딩에서 nil과 cons가 fold 소비자에게 각각 무엇을 전달하는가?

### English companion

Booleans, naturals, and lists can be represented as polymorphic functions accepting consumers at any result type.

Universal types add discipline to untyped Church encodings, ruling out invalid consumers. A data type specifies its allowed eliminations, with fold as the central interface.

---

## 4단계 — 다형성의 외재적 의미 — §17.3

다형 타입은 모든 타입 해석에 걸쳐 같은 비타입 항이 조건을 만족하는 교집합 성질로 읽힌다.

단순 집합 의미만으로 impredicative 전칭을 다루면 크기·자기참조 문제가 생긴다. 의미 모델은 타입 해석의 범위와 항 동치 관계를 조심스럽게 제한해야 한다.

> [!question] 책을 덮고 답해 보기
> `∀α.T`가 특정 α 하나의 해석만 확인해서는 안 되는 이유는?

### English companion

A polymorphic type is read extrinsically as a property one untyped term satisfies across all type interpretations.

Naive set semantics for impredicative universals encounters size and self-reference problems. A semantic model must carefully control the universe of type interpretations and term equivalence.

## 자체 점검 퀴즈

### Q1. 전칭 타입 제거는 무엇을 하는가?

What does universal-type elimination do?

- A. 타입 변수를 구체 타입으로 인스턴스화 / Instantiate a type variable with a concrete type
- B. 항 변수를 삭제 / Delete a term variable
- C. 저장소를 초기화 / Initialize the store

> [!success]- 정답과 해설
> **A.** 다형적 값을 특정 타입에서 사용한다.
>
> EN: It uses a polymorphic value at a chosen type.

### Q2. `∀α. α→α`의 핵심 제약은?

What is the key constraint of `∀α. α→α`?

- A. α의 내부를 타입별로 검사 가능 / The code may inspect α differently for each type
- B. 임의 α에서 균일하게 동작 / The code must work uniformly for arbitrary α
- C. α는 항상 정수 / α is always Int

> [!success]- 정답과 해설
> **B.** 타입 추상화는 α의 구조를 알 수 없게 한다.
>
> EN: Type abstraction hides α's structure.

### Q3. 다형적 Church 인코딩이 제공하는 것은?

What do polymorphic Church encodings provide?

- A. 소비 방식으로 표현된 타입 안전한 자료 / Type-safe data represented by its consumers
- B. 공유 변수 잠금 / Shared-variable locking
- C. 무조건 상수 시간 실행 / Guaranteed constant time

> [!success]- 정답과 해설
> **A.** 전칭 타입이 허용되는 fold/선택 연산을 규율한다.
>
> EN: Universal types discipline the permitted folds or choices.

## 다음 개념으로

타입을 숨기면서 연산만 공개하면 추상 자료형과 모듈이 된다. 다음 장은 실존 타입으로 이 경계를 명세한다.

**English:** Hiding a representation type while exposing operations gives abstract data types and modules, specified next with existential types.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 379–397.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
