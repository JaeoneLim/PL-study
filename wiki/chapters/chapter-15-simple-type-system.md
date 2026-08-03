---
type: chapter
title: "15. 단순 타입 체계"
title_en: "The Simple Type System"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "315–348"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-16-subtypes-intersection-types]]"
  - "[[chapter-17-polymorphism]]"
  - "[[chapter-18-module-specification]]"
---

# 15. 단순 타입 체계 (The Simple Type System)

> [!abstract] 한눈에 보기
> 타입 문맥과 추론 규칙으로 단순 타입 람다 계산을 만들고, 명시적 타입·외재적/내재적 의미·집합론적 의미·재귀 타입을 비교한다.
>
> **English:** Typing contexts and inference rules define the simply typed lambda calculus, followed by explicit types, extrinsic and intrinsic semantics, set-theoretic semantics, and recursive types.

## 학습 목표

- 타입 판단 Γ⊢e:τ를 유도한다.
  - EN: Derive typing judgments Γ⊢e:τ.
- 진행·보존 관점의 타입 안전성을 설명한다.
  - EN: Explain type safety through progress and preservation.
- 외재적·내재적 타입 의미를 비교한다.
  - EN: Compare extrinsic and intrinsic meanings of types.

## 핵심 용어

- **타입 문맥 (typing context)**
- **타입 판단 (typing judgment)**
- **보존 (preservation)**
- **진행 (progress)**
- **외재적 의미 (extrinsic semantics)**
- **내재적 의미 (intrinsic semantics)**
- **재귀 타입 (recursive type)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 타입 판단을 추론 규칙으로 정의하고, 타입 안전성을 외재적·내재적·집합론적 관점에서 비교한다.
>
> **English:** Defines typing judgments by inference rules and compares extrinsic, intrinsic, and set-theoretic accounts of type safety.

### §15.1–15.2 · 타입, 문맥, 판단, 규칙

Γ ⊢ e : τ는 문맥 Γ가 자유 변수 타입을 가정할 때 e가 τ형이라는 유도 가능한 주장이다. 변수·함수·적용·곱·합 규칙이 구문 구조를 따른다.

**English — Types, contexts, judgments, and rules:** Γ ⊢ e : τ is a derivable claim that e has type τ under assumptions Γ for free variables. Rules for variables, functions, application, products, and sums follow syntax structure.

### §15.3 · 명시적 타입 표기

람다 매개변수와 재귀 지점에 타입을 기록하면 타입 검사 규칙의 선택이 구문에 드러난다. 암시적 추론과 달리 유도 탐색의 모호성이 줄어든다.

**English — Explicit typing:** Annotating lambda parameters and recursive points exposes typing choices in syntax and reduces ambiguity compared with implicit inference.

### §15.4 · 외재적 타입 의미

먼저 존재하는 비타입 언어의 항 중 안전하게 행동하는 항을 타입별로 분류한다. 보존과 진행 성질은 잘 타입된 닫힌 항이 타입 오류에 걸리지 않음을 뒷받침한다.

**English — Extrinsic meaning of types:** Classifies safe terms inside an already existing untyped language. Preservation and progress support the claim that closed well-typed terms do not encounter type errors.

### §15.5 · 내재적 관점

타입 유도 자체를 프로그램 구문의 일부로 보아 잘 타입된 항만 언어에 존재하게 한다. 같은 표면 항도 서로 다른 유도에 따라 다른 내재 객체가 될 수 있다.

**English — Intrinsic view:** Treats typing derivations as part of program syntax so only well-typed terms inhabit the language. One surface term may correspond to different intrinsic objects through different derivations.

### §15.6 · 집합론적 해석

각 타입을 값 집합으로, 함수 타입을 적절한 함수 집합으로 해석하고 타입 규칙이 의미 포함을 보존함을 확인한다.

**English — Set-theoretic semantics:** Interprets each type as a set of values and function types as suitable function sets, checking that typing rules preserve membership.

### §15.7 · 재귀 타입

목록·트리처럼 자기 자신을 참조하는 타입을 타입 방정식의 해로 정의한다. fold/unfold의 명시 여부와 양·음의 위치가 건전한 해 구성에 영향을 준다.

**English — Recursive types:** Defines lists and trees as solutions of recursive type equations. Explicit fold/unfold and positive versus negative occurrences affect sound construction.

## 반드시 남겨야 할 핵심

- 타입은 실행 전에 프로그램의 가능한 사용을 제한하는 정적 증명 체계다.
  - EN: A type system is a static proof system restricting how programs may be used before execution.
- 타입 건전성은 ‘잘 타입되면 원하는 모든 결과가 맞다’가 아니라 특정 오류가 배제된다는 주장이다.
  - EN: Type soundness excludes specified errors; it does not claim every well-typed result is otherwise correct.
- 외재적·내재적 의미는 타입과 항 중 무엇을 먼저 두는지 다르다.
  - EN: Extrinsic and intrinsic accounts differ in whether untyped terms or typed constructions come first.

> [!warning] 자주 생기는 혼동
> - 타입 검사 가능성과 타입 추론 가능성을 같은 문제로 보지 않는다.
>   - EN: Do not equate type checking with type inference.
> - 진행은 반드시 종료한다는 뜻이 아니라 다음 단계 또는 값이라는 뜻이다.
>   - EN: Progress does not mean termination; it means a term is a value or can step.

## 1단계 — 타입을 판단으로 말하기 — §15.1–15.2

`Γ ⊢ e : τ`는 문맥 Γ의 가정 아래 e가 타입 τ를 가진다는 유도 가능한 주장이다.

변수 규칙은 문맥을 조회하고, 추상화는 매개변수 가정을 추가하며, 적용은 연산자가 `τ→τ′`, 인수가 τ인지 맞춘다. 타입 유도 트리는 구문 트리를 따라 국소 제약을 조합한다.

> [!question] 책을 덮고 답해 보기
> `λx. x`에 가능한 단순 타입의 일반 모양은?

### English companion

`Γ ⊢ e : τ` is a derivable claim that e has type τ under assumptions Γ.

The variable rule consults Γ, abstraction adds a parameter assumption, and application matches an operator of `τ→τ′` with an operand of τ. A typing derivation combines local constraints along the syntax tree.

---

## 2단계 — 주석으로 유도 모호성 줄이기 — §15.3

명시적 타입은 추상화·구성자에 타입 정보를 적어 검사와 의미 정의를 단순화한다.

타입 검사와 타입 추론은 다른 문제다. 주석이 충분하면 규칙은 거의 결정적으로 검사가 되지만, 주석이 없으면 미지 타입 사이의 방정식을 풀어야 한다.

> [!question] 책을 덮고 답해 보기
> `λx.x`를 검사하려면 x의 타입 주석이 어떤 정보를 주는가?

### English companion

Explicit types annotate abstractions and constructs, simplifying checking and semantic definition.

Type checking and type inference are different tasks. With enough annotations, rules become nearly deterministic checking; without them, one must solve equations among unknown types.

---

## 3단계 — 타입은 부분집합인가, 구문 자체인가 — §15.4–15.6

외재적 관점은 비타입 항 중 잘 타입된 항을 고르고, 내재적 관점은 애초에 타입별 항 집합을 만든다.

외재적 의미는 한 항이 여러 타입 증명을 가질 수 있어 유연하고, 내재적 의미는 잘못 타입된 항을 표현 불가능하게 만든다. 집합론적 의미는 타입을 값 집합, 함수 타입을 적절한 함수 집합으로 해석해 규칙의 건전성을 설명한다.

> [!question] 책을 덮고 답해 보기
> 내재적 표현이 타입 오류 상태를 만들 수 없게 하는 장점과 비용은?

### English companion

The extrinsic view selects well-typed terms from untyped syntax; the intrinsic view builds separate typed syntax from the start.

Extrinsic semantics is flexible because one term may admit different typings; intrinsic semantics makes ill-typed terms unrepresentable. Set-theoretic semantics interprets types as sets of values and function types as suitable function sets, validating the rules.

---

## 4단계 — 자기 참조 자료 타입 — §15.7

리스트와 트리는 타입 방정식의 고정점으로 표현되며 fold/unfold가 재귀 구조와 한 층의 모양을 연결한다.

예를 들어 `List τ ≅ 1 + τ × List τ`다. 등재귀적(equi-recursive) 관점은 두 타입을 같게 보고, 동형재귀적(iso-recursive) 관점은 명시적인 포장과 해제를 요구한다.

> [!question] 책을 덮고 답해 보기
> 리스트 타입 방정식의 `1`과 합 `+`가 각각 nil과 cons를 어떻게 표현하는가?

### English companion

Lists and trees are fixed points of type equations, with fold/unfold connecting a recursive value to one layer of structure.

For example, `List τ ≅ 1 + τ × List τ`. Equi-recursive types identify both sides; iso-recursive types require explicit folding and unfolding.

## 자체 점검 퀴즈

### Q1. 적용 `f a`가 타입을 가지려면?

When is application `f a` typable?

- A. f:τ→τ′이고 a:τ / f:τ→τ′ and a:τ
- B. f와 a의 이름이 같음 / f and a have the same name
- C. a가 반드시 정수 / a must be an integer

> [!success]- 정답과 해설
> **A.** 함수의 입력 타입과 인수 타입이 맞아야 결과 타입 τ′를 얻는다.
>
> EN: The function domain must match the argument type, yielding τ′.

### Q2. 외재적 타입 관점은?

What is the extrinsic view of typing?

- A. 비타입 구문에 타입 성질을 부여 / Assign a typing property to untyped syntax
- B. 타입마다 별도 구문만 생성 / Construct only type-indexed syntax
- C. 실행 후 타입 결정 / Determine type only after execution

> [!success]- 정답과 해설
> **A.** 항은 먼저 존재하고 타입 유도가 그 항을 분류한다.
>
> EN: Terms exist first; typing derivations classify them.

### Q3. 재귀 타입 `List τ`의 한 층 구조는?

What is one layer of `List τ`?

- A. `1 + τ × List τ` / `1 + τ × List τ`
- B. `τ → τ`만 / Only `τ → τ`
- C. `List τ × List τ`만 / Only `List τ × List τ`

> [!success]- 정답과 해설
> **A.** 빈 리스트 또는 머리와 재귀 꼬리의 선택이다.
>
> EN: It is a choice between empty and a head paired with a recursive tail.

## 다음 개념으로

단순 타입은 정확한 모양을 요구한다. 다음 장은 값의 사용 가능성을 보존하면서 더 구체적인 타입을 더 일반적인 타입으로 보는 서브타이핑을 추가한다.

**English:** Simple types demand exact shapes. The next chapter adds subtyping, treating more specific values as usable at more general types while preserving behavior.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 315–348.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
