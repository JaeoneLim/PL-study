---
type: chapter
title: "A. 수학적 배경"
title_en: "Mathematical Background"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "447–466"
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

# A. 수학적 배경 (Mathematical Background)

> [!abstract] 한눈에 보기
> 책의 semantics과 증명에서 쓰는 집합론 표기, 관계, 함수, 곱, 분리합, 폐쇄 연산을 한곳에 정리한다.
>
> **English:** The appendix consolidates the set-theoretic notation, relations, functions, products, disjoint unions, and closure operations used in the semantics and proofs.

## 학습 목표

- 집합 연산과 함수 공간 표기를 정확히 읽는다.
  - EN: Read set operations and function-space notation accurately.
- 관계의 합성·역·폐쇄를 계산한다.
  - EN: Compute relational composition, converse, and closure.
- 곱과 분리합을 의미 도메인 구성에 적용한다.
  - EN: Apply products and disjoint unions to semantic domains.

## 핵심 용어

- **멱집합 (powerset)**
- **관계 합성 (relational composition)**
- **부분 함수 (partial function)**
- **데카르트 곱 (Cartesian product)**
- **분리합 (disjoint union)**
- **반사·추이 폐쇄 (reflexive-transitive closure)**

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### 멱집합 (powerset)

집합 S에서 만들 수 있는 모든 부분집합을 원소로 갖는 집합이다. 빈 집합과 S 자체도 포함한다.

> [!example] 엔지니어 관점
> 가능한 interrupt source 집합 S가 있을 때, 한 순간 활성화될 수 있는 모든 source 조합의 집합이 `P(S)`다. source가 n개면 멱집합 원소는 2ⁿ개다.

**English definition:** The set of every subset that can be formed from S, including the empty set and S itself.

> [!example] Engineering view
> If S is the set of possible interrupt sources, `P(S)` is the set of every combination that could be active at one instant. For n sources it has 2ⁿ elements.

```text
P(S) = { X | X ⊆ S }
```

### 관계 합성 (relational composition)

관계 R로 한 번 이동하고 이어서 관계 S로 이동할 수 있을 때 시작과 끝을 직접 연결하는 새 관계를 만드는 연산이다.

> [!example] 엔지니어 관점
> 한 클록의 next-state relation을 두 번 합성해 2클록 뒤 가능한 상태 관계를 얻는 것과 같다. 함수 합성과 달리 중간값이 여러 개일 수 있다.

**English definition:** An operation forming a new relation between start and end points whenever one can first follow relation R and then relation S through an intermediate point.

> [!example] Engineering view
> It is like composing a one-clock next-state relation with itself to obtain possible states two clocks later. Unlike function composition, several intermediate states may exist.

### 부분 함수 (partial function)

정의역의 일부 입력에서는 결과가 존재하지 않을 수 있는 함수다. 결과가 존재하는 입력에서는 여전히 하나의 결과만 갖는다.

> [!example] 엔지니어 관점
> 일부 opcode나 address에서만 유효한 decoder table과 비슷하다. 프로그램 semantics에서는 비종료나 오류 때문에 최종 결과가 없는 경우를 나타낼 수 있다.

**English definition:** A function that may have no result for some inputs in its intended input set. Wherever it is defined, it still has only one result.

> [!example] Engineering view
> It resembles a decoder table valid only for selected opcodes or addresses. In program semantics, undefinedness can represent nontermination or failure to produce a final result.

```text
f : A ⇀ B
```

### 데카르트 곱 (Cartesian product)

A의 원소 하나와 B의 원소 하나를 순서쌍으로 함께 담는 모든 경우의 집합이다.

> [!example] 엔지니어 관점
> address 집합 A와 data 집합 D의 곱 `A×D`는 가능한 모든 address-data pair의 type과 같다. 둘 중 하나를 고르는 것이 아니라 둘을 동시에 담는다.

**English definition:** The set of every ordered pair containing one element from A together with one element from B.

> [!example] Engineering view
> The product `A×D` of address set A and data set D is the type of every possible address–data pair. It contains both components, not a choice between them.

```text
A × B = { (a,b) | a∈A, b∈B }
```

### 분리합 (disjoint union)

A의 값 또는 B의 값 중 하나를, 어느 쪽에서 왔는지 나타내는 tag와 함께 담는 집합이다.

> [!example] 엔지니어 관점
> packet payload를 `{tag, normal_data}` 또는 `{tag, error_code}` 형식으로 보내는 tagged union과 같다. 양쪽 bit pattern이 같아도 tag 덕분에 경우를 구분한다.

**English definition:** A set containing either a value from A or a value from B together with a tag recording which side it came from.

> [!example] Engineering view
> It is a tagged union carrying either `{tag, normal_data}` or `{tag, error_code}`. The tag preserves the case even when both sides could use the same bit pattern.

```text
A + B
```

### 반사·추이 폐쇄 (reflexive-transitive closure)

관계 R을 0회 이상 이어서 도달할 수 있는 모든 쌍을 포함하는 가장 작은 관계다. 0회 경로 때문에 각 원소는 자기 자신과도 관계된다.

> [!example] 엔지니어 관점
> 한 사이클 전이 R에서 임의의 사이클 수 뒤 도달 가능성을 구한 `R*`와 같다. reset 직후 그대로 있는 0사이클 경우도 반드시 포함한다.

**English definition:** The smallest relation containing every pair reachable by following R zero or more times. Zero-length paths make every element related to itself.

> [!example] Engineering view
> It is `R*`, reachability after any number of cycles from a one-cycle relation R. It necessarily includes the zero-cycle case of remaining in the current state.

```text
R* = I ∪ R ∪ R² ∪ …
```

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 책의 의미 함수, 전이 관계, 도메인 구성에 반복 사용되는 집합·관계·함수·곱·분리합 표기를 준비한다.
>
> **English:** Prepares the set, relation, function, product, and disjoint-union notation repeatedly used in semantic functions, transition relations, and domain constructions.

### §A.1 · 집합과 멱집합

원소, 부분집합, 합집합, 교집합, 차집합, 멱집합을 정의한다. syntax category·상태 공간·가능 결과 집합을 읽는 기본 표기다.

**English — Sets and powersets:** Defines membership, subset, union, intersection, difference, and powerset—the base notation for syntax categories, state spaces, and sets of outcomes.

### §A.2, A.6 · 관계, 합성, 폐쇄

이항 관계의 역·합성·거듭제곱과 반사·대칭·추이 성질을 다룬다. 반사-추이 폐쇄는 0회 이상의 실행 단계를 표현한다.

**English — Relations, composition, and closure:** Covers converse, composition, powers of binary relations, and reflexive, symmetric, and transitive properties. Reflexive-transitive closure represents zero or more execution steps.

### §A.3–A.4 · 전체·부분 함수와 함수 연산

함수를 특별한 관계로 보고 정의역·치역·합성·제한·갱신을 정의한다. 부분 함수는 비종료나 정의되지 않은 연산의 첫 모델이 된다.

**English — Total and partial functions:** Treats functions as special relations and defines domain, range, composition, restriction, and update. Partial functions provide the first model of divergence or undefined operations.

### §A.5 · 곱과 분리합

곱은 여러 성분이 함께 존재함을, 분리합은 태그가 붙은 대안 중 하나임을 표현한다. 구성·환경에는 곱이, 정상·오류 결과에는 분리합이 반복 사용된다.

**English — Products and disjoint unions:** Products express simultaneous components; disjoint unions express one tagged alternative. Products recur in configurations and environments, sums in normal-versus-error results.

## 반드시 남겨야 할 핵심

- semantics 표기는 대부분 집합 사이의 함수와 관계를 정밀하게 조합한 것이다.
  - EN: Most semantic notation precisely combines functions and relations between sets.
- 부분 함수와 관계는 각각 결정적 계산과 여러 가능한 계산의 자연스러운 모델이다.
  - EN: Partial functions and relations naturally model deterministic and multiply possible computations, respectively.
- 곱과 합의 차이는 ‘모두 있음’과 ‘경우 중 하나’를 구분한다.
  - EN: The difference between products and sums is the difference between ‘all components’ and ‘one of several cases.’

> [!warning] 자주 생기는 혼동
> - x ∈ S와 X ⊆ S, 함수 적용과 관계 합성을 표기상 구분한다.
>   - EN: Keep membership versus subset, and function application versus relation composition, notationally distinct.
> - 분리합의 태그를 생략하면 겹치는 집합의 원소가 어느 경우에서 왔는지 잃는다.
>   - EN: Without tags in a disjoint union, an element shared by both sets loses its originating case.

## 1단계 — 집합 표기 안정시키기 — §A.1

원소, 부분집합, 합집합, 교집합, 차집합, 멱집합을 이후 의미 도메인의 기본 문법으로 사용한다.

타입이나 syntax category를 집합으로, 의미를 그 집합 사이의 함수로 읽는다. 포함 순서가 정보 순서로 재사용될 수 있으므로 원소 관계와 부분집합 관계를 혼동하지 않는다.

> [!question] 책을 덮고 답해 보기
> `x∈P(S)`와 `x⊆S`가 동치인 이유를 설명하라.

### English companion

Membership, subset, union, intersection, difference, and powerset form the basic notation of later semantic domains.

Types and syntax categories are treated as sets, with meanings as functions between them. Since inclusion can become an information order, do not confuse membership with subset.

---

## 2단계 — 관계와 실행 경로 — §A.2, A.6

이항 관계는 비결정적 한 단계 이동을 표현하고 합성·폐쇄는 여러 단계 실행을 만든다.

역관계는 화살표 방향을 바꾸고, 반사·추이 폐쇄 R*는 0회 이상의 R 단계를, 추이 폐쇄 R+는 1회 이상을 나타낸다. transition semantics 표기의 수학적 기반이다.

> [!question] 책을 덮고 답해 보기
> R*가 항상 항등 관계를 포함하는 이유는?

### English companion

A binary relation represents nondeterministic one-step movement; composition and closure build multi-step execution.

Converse reverses arrows; reflexive-transitive closure R* means zero or more R steps, and transitive closure R+ means one or more. This underlies transition-semantics notation.

---

## 3단계 — 함수도 특별한 관계로 보기 — §A.3–A.4

함수는 각 입력에 정확히 하나의 출력을 대응시키는 관계이며 부분 함수는 일부 입력에서만 정의된다.

함수 합성의 순서, 제한, 갱신 표기는 상태와 환경 semantics에서 반복된다. 고차 함수 공간은 함수 자체를 원소로 다루며 도메인 이론과 람다 의미의 기반이 된다.

> [!question] 책을 덮고 답해 보기
> 상태 갱신 `σ[x↦v]`가 원래 σ와 어디에서 다른지 정의하라.

### English companion

A function is a relation assigning exactly one output to each input; a partial function is defined only on some inputs.

Composition order, restriction, and update recur in state and environment semantics. Higher-order function spaces treat functions as elements, supporting domain theory and lambda semantics.

---

## 4단계 — 함께 있음과 선택을 구분 — §A.5

곱 S×T는 S와 T 값을 함께 담고, 분리합 S+T는 어느 쪽 값인지 태그와 함께 담는다.

상태-명령 구성에는 곱이, 정상 결과 또는 실패 같은 대안에는 분리합이 적합하다. 태그가 없으면 두 집합에 같은 원소가 있을 때 어느 경우인지 잃는다.

> [!question] 책을 덮고 답해 보기
> `State + (abort×State)`에서 분리합 태그가 필요한 이유는?

### English companion

Product S×T contains both an S and a T; disjoint union S+T contains a tagged value from one side.

Products suit command-state configurations; disjoint unions suit alternatives such as normal result or failure. Tags preserve the source side when the component sets overlap.

## 자체 점검 퀴즈

### Q1. R*가 의미하는 것은?

What does R* mean?

- A. R의 0회 이상 반복 / Zero or more R steps
- B. R의 역만 / Only the converse of R
- C. R의 원소 수 / The cardinality of R

> [!success]- 정답과 해설
> **A.** 반사·추이 폐쇄는 길이 0인 경로도 포함한다.
>
> EN: Reflexive-transitive closure includes paths of length zero.

### Q2. 곱과 분리합의 차이는?

How do product and disjoint union differ?

- A. 곱은 둘 다, 분리합은 태그된 한쪽 / Product contains both; disjoint union a tagged one side
- B. 둘은 같은 집합 / They are identical
- C. 곱만 함수를 포함 / Only products may contain functions

> [!success]- 정답과 해설
> **A.** 동시 구성과 대안 선택을 구분하는 기본 constructor다.
>
> EN: They are basic constructors for combination versus alternatives.

### Q3. 부분 함수가 전체 함수와 다른 점은?

How does a partial function differ from a total function?

- A. 일부 입력에서 결과가 정의되지 않을 수 있음 / It may be undefined on some inputs
- B. 출력이 두 개씩 있음 / It has two outputs per input
- C. 합성할 수 없음 / It cannot be composed

> [!success]- 정답과 해설
> **A.** 비종료나 오류를 부분성으로 모델링할 수 있다.
>
> EN: Partiality can model nontermination or errors.

## 다음 개념으로

이 부록은 필요할 때 되돌아오는 참조 페이지다. 준비가 되면 1장부터 네 가지 언어 설명 도구를 다시 연결해 보라.

**English:** Treat this appendix as a page to revisit on demand. When ready, return to Chapter 1 and reconnect the four tools for describing languages.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 447–466.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
