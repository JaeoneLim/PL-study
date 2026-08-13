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

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### 전칭 다형성 (universal polymorphism)

하나의 항이 모든 타입 α에 대해 같은 구조로 동작함을 `∀α.T`로 표현하는 타입 체계 기능이다.

> [!example] 엔지니어 관점
> data width나 payload type을 parameter로 받되 control 구조는 동일한 재사용 IP와 비슷하다. 특정 타입 내부 표현에 의존하면 진정한 전칭 동작이 아니다.

**English definition:** A type-system feature, written `∀α.T`, stating that one term works uniformly for every choice of type α.

> [!example] Engineering view
> It resembles reusable IP parameterized by data width or payload type while keeping the same control structure. Depending on a specific type’s representation would violate uniformity.

```text
∀α. T
```

### 타입 추상화 (type abstraction)

타입 변수를 매개변수로 묶어, 나중에 어떤 타입을 넣을지 정하는 다형적 값을 만드는 항이다.

> [!example] 엔지니어 관점
> 아직 WIDTH를 정하지 않은 parameterized module definition과 같다. 정의 안에서는 특정 폭에만 가능한 연산을 가정할 수 없다.

**English definition:** A term that binds a type variable as a parameter, creating a polymorphic value whose concrete type argument will be chosen later.

> [!example] Engineering view
> It is like a parameterized module definition before WIDTH has been chosen. Its body cannot assume operations available only at one concrete width.

```text
Λα. e
```

### 타입 적용 (type application)

다형적 값의 타입 매개변수에 구체 타입을 넣어 해당 인스턴스로 사용하는 항이다.

> [!example] 엔지니어 관점
> parameterized IP를 `WIDTH=32`로 elaborate해 32-bit 인스턴스를 얻는 것과 같다. 실행 데이터 인수를 넣는 일반 함수 적용과는 구분된다.

**English definition:** A term that supplies a concrete type argument to a polymorphic value, selecting an instance for that type.

> [!example] Engineering view
> It is like elaborating parameterized IP with `WIDTH=32` to obtain a 32-bit instance. This differs from supplying ordinary runtime data.

```text
e [τ]
```

### System F

타입 추상화와 타입 적용을 명시적으로 포함하는, 전칭 다형성의 핵심 람다 계산이다. 2차 람다 계산이라고도 한다.

> [!example] 엔지니어 관점
> typed IR에서 data operand뿐 아니라 type parameter의 binding과 instantiation까지 노드로 드러낸 최소 intermediate language에 가깝다.

**English definition:** The core lambda calculus of universal polymorphism, with explicit type abstraction and type application. It is also called the second-order lambda calculus.

> [!example] Engineering view
> It resembles a minimal typed IR in which binding and instantiation of type parameters are explicit nodes alongside ordinary data operands.

### 다형적 인코딩 (polymorphic encoding)

별도 primitive data type 없이 전칭 다형 함수의 사용 규칙만으로 Boolean, pair, list 같은 구조를 표현하는 방법이다.

> [!example] 엔지니어 관점
> 새 storage primitive를 추가하지 않고 표준 ready/valid 조합 패턴만으로 queue나 selector protocol을 표현하는 구조적 encoding과 비슷하다.

**English definition:** A method of representing structures such as Booleans, pairs, or lists using only the behavior of universally polymorphic functions, without primitive data types.

> [!example] Engineering view
> It resembles structurally encoding a queue or selector protocol from standard ready/valid composition patterns without adding a new storage primitive.

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 타입을 매개변수로 추상화하는 System F식 다형성을 정의하고, 하나의 프로그램이 여러 타입에서 균일하게 작동하는 방식을 설명한다.
>
> **English:** Defines System F-style abstraction over types and explains how one program acts uniformly at many types.

### §17.1 · 타입 추상화와 적용 규칙

Λα.e는 타입 α에 대해 일반화된 항이고 e[τ]는 이를 특정 타입에 인스턴스화한다. 전칭 타입 ∀α.τ의 도입 규칙은 α가 값 문맥 가정에 의존하지 않는다는 신선성 조건을 요구한다.

**English — Type abstraction and application:** Λα.e generalizes a term over type α, while e[τ] instantiates it. Introduction of ∀α.τ requires a freshness condition so α does not depend on value-context assumptions.

### §17.2 · 다형적 프로그래밍과 데이터 인코딩

다형 항등 함수, 조합자, 목록 연산을 한 정의로 여러 원소 타입에 사용한다. 불리언·쌍·목록 같은 추상 자료를 다형 함수의 사용 규약으로 인코딩할 수도 있다.

**English — Polymorphic programming and data encodings:** One definition of identity, combinators, and list operations works at many element types. Booleans, pairs, and lists can also be encoded by the polymorphic ways clients may consume them.

### §17.3 · 외재적 의미와 비술어성

전칭 타입의 값은 모든 타입 인스턴스에서 요구를 만족해야 한다. 타입이 자기 자신을 포함한 넓은 타입 우주를 양화하는 비술어성은 단순 집합론 해석을 어렵게 만든다.

**English — Extrinsic semantics and impredicativity:** A universal value must satisfy its specification at every type instance. Impredicative quantification over a universe containing the quantified type itself complicates naive set-theoretic semantics.

## 반드시 남겨야 할 핵심

- 매개변수 다형성은 타입별 분기 없이 균일한 구현을 재사용한다.
  - EN: Parametric polymorphism reuses one uniform implementation without type-specific branching.
- ∀ 도입과 제거는 값 수준 함수의 λ 추상화와 적용에 대응하는 타입 수준 구조다.
  - EN: Universal introduction and elimination are type-level analogues of value-level lambda abstraction and application.
- 다형 타입 자체가 프로그램 행동에 강한 제약을 준다.
  - EN: A polymorphic type alone places strong constraints on program behavior.

> [!warning] 자주 생기는 혼동
> - 매개변수 다형성과 서브타입 다형성·오버로딩을 구분한다.
>   - EN: Distinguish parametric polymorphism from subtype polymorphism and overloading.
> - 일반화할 타입 변수가 환경 가정에 자유롭게 나타나면 건전하지 않다.
>   - EN: Generalizing a type variable that occurs free in assumptions is unsound.

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
