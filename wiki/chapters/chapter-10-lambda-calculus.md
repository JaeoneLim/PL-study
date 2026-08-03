---
type: chapter
title: "10. 람다 계산"
title_en: "The Lambda Calculus"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "194–221"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-11-eager-functional-language]]"
  - "[[chapter-12-functional-continuations]]"
  - "[[chapter-13-iswim-like-languages]]"
---

# 10. 람다 계산 (The Lambda Calculus)

> [!abstract] 한눈에 보기
> 순수한 비타입 람다 계산의 구문과 β-축약을 정의하고 정상 순서·적극 평가·표시적 의미·함수형 프로그래밍 인코딩을 연결한다.
>
> **English:** The pure untyped lambda calculus is developed through syntax, beta-reduction, normal-order and eager evaluation, denotational semantics, and functional encodings.

## 학습 목표

- α-동치와 캡처 회피 β-축약을 수행한다.
  - EN: Perform alpha-equivalence and capture-avoiding beta-reduction.
- 정상 순서와 적극 평가의 종료 차이를 예측한다.
  - EN: Predict termination differences between normal-order and eager evaluation.
- 함수·불리언·자연수 인코딩의 동작을 추적한다.
  - EN: Trace encodings of functions, Booleans, and natural numbers.

## 핵심 용어

- **람다 추상화 (lambda abstraction)**
- **β-축약 (beta-reduction)**
- **정상 순서 (normal order)**
- **적극 평가 (eager evaluation)**
- **고정점 결합자 (fixed-point combinator)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 함수 정의와 적용만으로 계산을 표현하는 최소 언어를 세우고, 축약 전략·표시적 의미·데이터 인코딩을 연결한다.
>
> **English:** Builds a minimal language of function definition and application, connecting reduction strategy, denotational meaning, and data encodings.

### §10.1–10.2 · 람다 구문과 축약

변수, 추상화, 적용으로 항을 만들고 자유 변수와 α-동치를 정의한다. β-축약은 함수 적용을 캡처 회피 치환으로 계산하며 여러 redex 중 어디를 줄일지 선택할 수 있다.

**English — Lambda syntax and reduction:** Terms contain variables, abstraction, and application, with free variables and alpha-equivalence. Beta-reduction computes application by capture-avoiding substitution and permits choices among redexes.

### §10.3 · 정상 순서 평가

가장 바깥쪽 왼쪽 redex를 먼저 줄이는 전략은 정규형이 존재할 때 이를 찾는 성질이 있다. 사용되지 않는 인수는 평가하지 않을 수 있다.

**English — Normal-order evaluation:** Reducing the leftmost outermost redex first finds a normal form when one exists and can avoid evaluating unused arguments.

### §10.4 · 적극 평가

함수 본문에 대입하기 전에 인수를 값으로 평가한다. 실제 구현과 잘 맞지만 정상 순서가 종료하는 일부 항에서 발산할 수 있다.

**English — Eager evaluation:** Arguments are evaluated to values before substitution into a function body. This suits conventional implementations but may diverge on terms normal order can normalize.

### §10.5 · 함수 도메인의 표시적 의미

람다 항을 환경에서 의미 값으로 보내고 적용을 의미 함수 적용으로 해석한다. 자기 적용을 포함하려면 값 도메인이 자신의 함수 공간과 연결되는 재귀 구조가 필요하다.

**English — Denotational semantics over function domains:** Maps lambda terms and environments to semantic values, interpreting application as semantic function application. Self-application requires a domain recursively related to its own function space.

### §10.6 · 람다 계산 안의 프로그래밍

불리언, 자연수, 쌍, 목록, 재귀를 고차 함수로 인코딩한다. 표현 가능성은 높지만 평가 비용과 타입 안전성은 별도 문제다.

**English — Programming inside the lambda calculus:** Encodes booleans, naturals, pairs, lists, and recursion as higher-order functions. Expressiveness is high, while evaluation cost and type safety remain separate concerns.

## 반드시 남겨야 할 핵심

- β-축약은 단순 문자열 치환이 아니라 바인딩을 보존하는 계산 규칙이다.
  - EN: Beta-reduction is a binding-preserving computation rule, not textual replacement.
- 평가 전략은 같은 항의 종료 여부와 비용을 바꿀 수 있다.
  - EN: Evaluation strategy can change termination and cost for the same term.
- 최소 언어에서도 데이터와 제어는 고차 함수로 표현할 수 있다.
  - EN: Even a minimal language can represent data and control through higher-order functions.

> [!warning] 자주 생기는 혼동
> - 정규형이 존재한다는 것과 모든 축약 순서가 정규형에 도달한다는 것은 다르다.
>   - EN: Existence of a normal form does not mean every reduction order reaches it.
> - α-동치인 항은 바인더 철자만 다르며 의미상 같은 바인딩 구조다.
>   - EN: Alpha-equivalent terms differ only in binder spelling and have the same binding structure.

## 1단계 — 바인더가 있는 최소 언어 — §10.1–10.2

변수, 추상화 `λx.e`, 적용 `e₀ e₁`만으로 계산 언어를 만든다.

β-축약 `(λx.e) a → e[x↦a]`는 함수 호출을 치환으로 설명한다. 치환은 1장의 규율대로 캡처를 피해야 하며, α-동치인 바인더 이름 차이는 계산 의미가 없다.

> [!question] 책을 덮고 답해 보기
> `(λx. λy. x) y`를 안전하게 한 단계 축약하라.

### English companion

Variables, abstractions `λx.e`, and applications `e₀ e₁` form a complete computational language.

Beta-reduction `(λx.e) a → e[x↦a]` explains calls by substitution. The substitution must avoid capture as in Chapter 1, while alpha-equivalent binder names are computationally irrelevant.

---

## 2단계 — 가장 바깥부터: 정상 순서 — §10.3

정상 순서는 가장 왼쪽의 바깥 redex를 먼저 줄이며, 정상형이 존재하면 찾아낸다.

사용되지 않는 인수는 평가하지 않으므로 발산하는 인수를 무시할 수 있다. 대신 같은 인수가 여러 번 사용되면 같은 계산을 반복할 수 있어 call-by-name과 lazy evaluation의 차이가 생긴다.

> [!question] 책을 덮고 답해 보기
> `(λx.1) Ω`가 정상 순서에서는 끝나는 이유는?

### English companion

Normal order reduces the leftmost outermost redex and finds a normal form whenever one exists.

Unused arguments are not evaluated, so a diverging argument may be ignored. But a used argument can be recomputed, motivating the distinction between call-by-name and lazy evaluation.

---

## 3단계 — 인수부터: 적극 평가 — §10.4

적극 평가는 적용 전에 연산자와 인수를 값으로 만들며 현대 엄격 함수형 언어의 핵심 전략이다.

인수를 한 번 평가해 재사용하기 쉽지만 사용하지 않는 인수도 평가한다. 따라서 β-동치만으로 같은 두 식이 특정 평가 전략에서 같은 종료 행동을 보인다고 결론 내리면 안 된다.

> [!question] 책을 덮고 답해 보기
> 적극 평가에서 `Ω`가 인수로 나타나면 함수 본문이 x를 쓰지 않아도 어떤 일이 일어나는가?

### English companion

Eager evaluation evaluates operator and operand to values before application, matching strict functional languages.

It naturally evaluates an argument once for reuse but also evaluates unused arguments. Beta-convertibility alone does not guarantee identical termination behavior under a chosen strategy.

---

## 4단계 — 자기 적용을 의미와 프로그램으로 — §10.5–10.6

람다 항의 의미에는 함수 공간과 값 공간이 재귀적으로 맞물리는 도메인이 필요하다.

재귀 도메인과 최소 고정점으로 재귀 함수를 해석한다. Church식 불리언·쌍·자연수는 데이터가 그 소비 방식인 함수로 표현될 수 있음을 보여 주지만, 평가 전략에 따라 인코딩의 실용성이 달라진다.

> [!question] 책을 덮고 답해 보기
> Church 불리언이 값을 저장하기보다 두 선택지 중 하나를 고르는 함수라는 설명을 해 보라.

### English companion

Giving lambda terms denotations requires a domain tied recursively to its own function space.

Recursive domains and least fixed points interpret recursion. Church-style Booleans, pairs, and naturals show that data can be represented by its eliminators, though usefulness depends on evaluation strategy.

## 자체 점검 퀴즈

### Q1. β-축약의 본질은?

What is the essence of beta-reduction?

- A. 함수 본문에 인수를 캡처 없이 치환 / Capture-avoiding substitution of an argument into a function body
- B. 변수 타입을 삭제 / Delete variable types
- C. 메모리를 할당 / Allocate memory

> [!success]- 정답과 해설
> **A.** 람다 계산에서 함수 호출은 치환으로 계산된다.
>
> EN: Function application computes by substitution in lambda calculus.

### Q2. 정상형이 존재할 때 그것을 찾는 전략은?

Which strategy finds a normal form whenever one exists?

- A. 정상 순서 / Normal order
- B. 항상 적극 평가 / Always eager evaluation
- C. 무작위 축약 / Random reduction

> [!success]- 정답과 해설
> **A.** 정상 순서 정리가 이 성질을 준다.
>
> EN: The normal-order theorem provides this property.

### Q3. `(λx.1) Ω`의 적극 평가 결과는?

What happens to `(λx.1) Ω` under eager evaluation?

- A. 즉시 1 / Immediately 1
- B. Ω 평가 때문에 발산 / It diverges while evaluating Ω
- C. 구문 오류 / Syntax error

> [!success]- 정답과 해설
> **B.** 적극 평가는 사용 여부와 무관하게 인수를 먼저 평가한다.
>
> EN: Eager evaluation evaluates the argument first even when unused.

## 다음 개념으로

순수 계산 핵심을 얻었으니, 다음 장은 이를 구체 구문·패턴·재귀·리스트를 갖춘 실용적 적극 함수형 언어로 확장한다.

**English:** With the pure core established, the next chapter grows it into a practical eager functional language with concrete syntax, patterns, recursion, and lists.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 194–221.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
