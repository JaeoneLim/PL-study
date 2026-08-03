---
type: chapter
title: "16. 서브타입과 교차 타입"
title_en: "Subtypes and Intersection Types"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "349–378"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-15-simple-type-system]]"
  - "[[chapter-17-polymorphism]]"
  - "[[chapter-18-module-specification]]"
---

# 16. 서브타입과 교차 타입 (Subtypes and Intersection Types)

> [!abstract] 한눈에 보기
> 서브타이핑 추론 규칙을 곱·합·함수 타입에 확장하고 교차 타입, 외재적 의미, 일반 연산자, 내재적 의미를 비교한다.
>
> **English:** Subtyping rules are extended across products, sums, and functions, then related to intersection types, extrinsic semantics, generic operators, and intrinsic semantics.

## 학습 목표

- 함수 타입의 반공변·공변 규칙을 적용한다.
  - EN: Apply contravariance and covariance for function types.
- 교차 타입을 여러 사용 능력의 결합으로 읽는다.
  - EN: Read intersection types as combined capabilities.
- 암시적 coercion의 coherence 문제를 설명한다.
  - EN: Explain coherence for implicit coercions.

## 핵심 용어

- **서브타이핑 (subtyping)**
- **대체 가능성 (substitutability)**
- **공변성 (covariance)**
- **반공변성 (contravariance)**
- **교차 타입 (intersection type)**
- **일관성 (coherence)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 타입을 정확히 같아야 하는 분류에서 안전한 대체 관계로 확장하고, 교차 타입으로 한 값의 여러 사용 능력을 표현한다.
>
> **English:** Extends typing from exact classification to safe substitutability and uses intersection types to describe multiple capabilities of one value.

### §16.1 · 서브타이핑 규칙과 변성

τ <: υ는 τ 값을 υ가 필요한 곳에 쓸 수 있다는 관계다. 함수 매개변수는 반공변, 결과는 공변이며 추이성과 반사성이 유도를 구성한다.

**English — Subtyping rules and variance:** τ <: υ means a τ-value may be used where υ is expected. Function parameters are contravariant and results covariant; reflexivity and transitivity compose derivations.

### §16.2 · 이름 있는 곱과 합

레코드는 더 많은 필드를 가진 값의 폭 서브타이핑과 필드 타입의 깊이 서브타이핑을 제공한다. variant는 허용 태그 방향이 레코드와 반대다.

**English — Named products and sums:** Records support width subtyping from extra fields and depth subtyping in field types. Variant subtyping reverses the relevant direction because it controls possible tags.

### §16.3 · 교차 타입

τ ∧ υ는 동일한 값이 두 타입의 요구를 모두 만족함을 나타낸다. 오버로딩과 사용별 세분화를 표현하지만 단순 집합 교집합 이상의 유도 구조가 필요할 수 있다.

**English — Intersection types:** τ ∧ υ states that the same value satisfies both type requirements. It expresses overload-like capabilities and usage refinement, with derivational structure beyond a bare set intersection.

### §16.4–16.5 · 외재 의미와 제네릭 연산

서브타입을 의미 집합 포함으로 읽고, 여러 타입 사례를 가진 연산을 교차 타입으로 부여한다. 적용 가능한 사례 선택이 일관된 결과를 내야 한다.

**English — Extrinsic semantics and generic operations:** Reads subtyping as inclusion of semantic value sets and gives intersection types to operations with several type cases. Overlapping applicable cases must yield coherent behavior.

### §16.6 · 내재 의미와 강제 변환의 일관성

서브타이핑 유도를 명시적 강제 함수로 해석하면 같은 τ <: υ에 여러 유도 경로가 생긴다. 모든 경로가 관찰상 같은 변환을 해야 의미가 유도 선택에 의존하지 않는다.

**English — Intrinsic semantics and coercion coherence:** Interpreting subtype derivations as coercions creates multiple paths for the same τ <: υ. Coherence requires all paths to be observationally equivalent.

## 반드시 남겨야 할 핵심

- 서브타이핑의 의미는 집합 포함보다 ‘문맥에서 안전한 대체’가 우선이다.
  - EN: The primary meaning of subtyping is safe contextual replacement, not merely set inclusion.
- 함수 입력의 반공변성은 호출자가 제공할 수 있는 인수 범위를 보존한다.
  - EN: Contravariance of function inputs preserves the arguments callers are entitled to provide.
- 교차 타입은 하나의 항에 동시에 성립하는 여러 정적 관점을 보존한다.
  - EN: Intersection types preserve several simultaneous static views of one term.

> [!warning] 자주 생기는 혼동
> - 상속 계층과 서브타이핑을 자동으로 동일시하지 않는다.
>   - EN: Do not automatically identify inheritance with subtyping.
> - 레코드와 variant의 폭 서브타이핑 방향을 반대로 기억하지 않도록 대체 상황을 직접 확인한다.
>   - EN: Derive width-subtyping directions for records and variants from substitutability rather than memorizing them.

## 1단계 — 더 구체적인 값을 안전하게 사용 — §16.1

`S <: T`는 S 값을 T가 기대되는 모든 곳에서 안전하게 쓸 수 있다는 판단이다.

반사성과 추이성 위에 구조 규칙을 둔다. 함수 `S₁→S₂ <: T₁→T₂`에는 입력이 반공변 `T₁<:S₁`, 출력이 공변 `S₂<:T₂`이어야 호출 안전성이 보존된다.

> [!question] 책을 덮고 답해 보기
> Animal→Dog 함수가 Dog→Animal이 기대되는 곳에 안전한지 규칙으로 판단하라.

### English companion

`S <: T` says every S value may safely be used wherever T is expected.

Structural rules extend reflexivity and transitivity. For functions, `S₁→S₂ <: T₁→T₂` requires contravariant inputs `T₁<:S₁` and covariant outputs `S₂<:T₂` to preserve call safety.

---

## 2단계 — 이름 있는 곱과 합 — §16.2

레코드의 추가 필드와 variant의 선택지 관계는 서로 다른 방향의 대체 가능성을 만든다.

더 많은 필드를 가진 레코드는 필요한 필드를 모두 제공하므로 폭 서브타입이 된다. 반대로 더 적은 대안을 가진 variant는 더 많은 대안을 처리하는 문맥에서 안전하다.

> [!question] 책을 덮고 답해 보기
> 레코드 폭 서브타이핑과 variant 폭 서브타이핑의 방향이 반대인 이유는?

### English companion

Extra record fields and variant alternatives induce different directions of substitutability.

A record with more fields is a width subtype because it provides every required field. Conversely, a variant with fewer alternatives is safe in a context prepared to handle more alternatives.

---

## 3단계 — 한 값의 여러 타입 능력 — §16.3

`S ∩ T`는 같은 값이 S와 T의 요구를 모두 만족함을 나타낸다.

교차 타입은 오버로드 함수, 정밀한 흐름 정보, 동일 항의 여러 사용법을 표현한다. 단순한 곱 `S×T`와 달리 두 별도 값을 담는 것이 아니라 하나의 값에 두 판단이 겹친다.

> [!question] 책을 덮고 답해 보기
> `(Int→Int) ∩ (Bool→Bool)`과 두 함수의 쌍의 차이를 설명하라.

### English companion

`S ∩ T` means the same value satisfies both S and T.

Intersection types express overloaded functions, precise flow information, and multiple uses of one term. Unlike product `S×T`, they do not pair two values; two typings overlap on one value.

---

## 4단계 — coercion 경로가 의미를 바꾸지 않게 — §16.4–16.6

서브타입 증명을 실행 가능한 coercion으로 해석하면 같은 판단의 여러 증명 경로가 같은 동작을 해야 한다.

외재적 의미는 비타입 값의 부분집합 관계로 단순화할 수 있지만 일반 연산자와 내재적 의미에서는 삽입되는 coercion이 드러난다. coherence는 타입 유도 선택이 런타임 관찰을 바꾸지 않음을 요구한다.

> [!question] 책을 덮고 답해 보기
> 한 서브타입 판단에 서로 다른 coercion 경로가 있고 결과가 다르면 왜 타입 체계가 비결정적으로 보이는가?

### English companion

If subtype proofs elaborate to executable coercions, different proof paths for one judgment must behave the same.

Extrinsic semantics can use subset relationships among untyped values, but generic operators and intrinsic semantics expose inserted coercions. Coherence requires that choosing a typing derivation not change runtime observations.

## 자체 점검 퀴즈

### Q1. 함수 입력 타입의 분산은?

What is the variance of function input types?

- A. 공변 / Covariant
- B. 반공변 / Contravariant
- C. 항상 무관 / Always irrelevant

> [!success]- 정답과 해설
> **B.** 더 일반적인 입력을 받을 수 있는 함수가 더 안전하게 대체된다.
>
> EN: A function accepting more general inputs is the safer substitute.

### Q2. 교차 타입과 곱 타입의 핵심 차이는?

What is the key difference between intersection and product types?

- A. 교차는 한 값의 두 능력, 곱은 두 값을 쌍으로 묶음 / Intersection gives one value two capabilities; product pairs two values
- B. 둘은 완전히 같다 / They are identical
- C. 교차는 런타임 오류만 표현 / Intersection expresses only runtime errors

> [!success]- 정답과 해설
> **A.** 교차는 동일 항에 대한 복수 판단이다.
>
> EN: Intersection is multiple typing information about the same term.

### Q3. coherence가 보장하는 것은?

What does coherence guarantee?

- A. 모든 프로그램이 같은 타입 / All programs have one type
- B. 타입 유도 경로 선택이 관찰 의미를 바꾸지 않음 / Choice of typing derivation does not change observable meaning
- C. 모든 함수가 종료 / All functions terminate

> [!success]- 정답과 해설
> **B.** 암시적 coercion의 경로 독립성을 요구한다.
>
> EN: It requires path independence of implicit coercions.

## 다음 개념으로

한 항에 여러 타입 능력을 주는 생각은 타입 자체를 매개변수화하는 전칭 다형성으로 이어진다.

**English:** Giving one term reusable typing capabilities leads naturally to universal polymorphism, where types themselves become parameters.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 349–378.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
