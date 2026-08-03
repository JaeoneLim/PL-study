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
