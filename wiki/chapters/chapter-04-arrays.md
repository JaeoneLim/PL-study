---
type: chapter
title: "04. 배열"
title_en: "Arrays"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "81–96"
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

# 04. 배열 (Arrays)

> [!abstract] 한눈에 보기
> 정수 첨자의 1차원 배열을 상태 속 함수로 모델링하고, 범위 검사·원소 갱신·이진 탐색·배열 불변식을 다룬다.
>
> **English:** One-dimensional integer-indexed arrays are modeled as functions in the state, covering bounds, element update, binary search, and array invariants.

## 학습 목표

- 배열 읽기와 쓰기의 의미를 함수 적용과 함수 갱신으로 설명한다.
  - EN: Explain array reads and writes as function application and functional update.
- 범위 오류가 명령 의미에 미치는 영향을 추적한다.
  - EN: Trace how bounds errors affect command meanings.
- 구간 전체를 말하는 배열 불변식을 작성한다.
  - EN: Write array invariants that quantify over ranges.

## 핵심 용어

- **함수 갱신 (functional update)**
- **정의역 (domain)**
- **범위 오류 (bounds error)**
- **이진 탐색 (binary search)**
- **higher-order assertion (higher-order assertion)**

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### 함수 갱신 (functional update)

기존 배열을 직접 바꾸는 대신 한 인덱스에서만 새 값을 돌려주고 나머지에서는 기존 값과 같은 새 함수를 만드는 관점이다.

> [!example] 엔지니어 관점
> 레지스터 파일의 next-state 함수를 생각하면 된다. write address와 일치하는 엔트리만 새 data를 받고 나머지 엔트리는 이전 값을 유지한다.

**English definition:** A view of array update that creates a new function returning the new value at one index and the old values everywhere else, rather than mutating the old array in place.

> [!example] Engineering view
> Think of a register file’s next-state function: only the entry matching the write address receives new data; every other entry retains its previous value.

```text
a[i ↦ v](j) = if i=j then v else a(j)
```

### 정의역 (domain)

함수가 입력으로 받을 수 있도록 정의된 값들의 집합이다. 배열을 함수로 보면 유효한 인덱스 집합이 정의역이 된다.

> [!example] 엔지니어 관점
> 깊이 16인 메모리의 유효 주소가 0부터 15까지인 것과 같다. ‘도메인 이론’의 도메인과 같은 영어 단어지만 여기서는 단순히 입력 범위를 뜻한다.

**English definition:** The set of inputs on which a function is defined. When an array is viewed as a function, its valid index set is the domain.

> [!example] Engineering view
> It is the valid address set 0 through 15 for a depth-16 memory. This use of “domain” means input set, not the domain-theory structure from Chapter 2.

### 범위 오류 (bounds error)

배열의 정의역 밖 인덱스로 읽거나 쓰려고 할 때 생기는 오류다. semantics은 이를 실패, 중단, 또는 미정의 동작 중 하나로 명시해야 한다.

> [!example] 엔지니어 관점
> 실제 SRAM에 없는 주소를 내거나 버스 address decoder의 빈 구간을 접근하는 상황과 비슷하다. 모델이 어떤 응답을 내는지 정하지 않으면 검증 결과도 모호해진다.

**English definition:** An error caused by reading or writing an index outside an array’s domain. A semantics must say whether this means failure, abort, or undefined behavior.

> [!example] Engineering view
> It resembles addressing beyond a physical SRAM or hitting an unmapped bus region. Verification becomes ambiguous unless the model specifies the response.

### 이진 탐색 (binary search)

정렬된 배열에서 중간 원소와 비교해 후보 구간을 매 단계 절반으로 줄이는 탐색 알고리즘이다.

> [!example] 엔지니어 관점
> successive-approximation ADC가 비교 결과로 탐색 범위를 절반씩 줄이는 과정과 닮았다. 정확성 증명에서는 목표가 아직 남아 있는 구간을 불변식으로 둔다.

**English definition:** A search algorithm for sorted arrays that compares the middle element and halves the candidate interval at every step.

> [!example] Engineering view
> It resembles a successive-approximation ADC narrowing its search range by half after each comparison. A proof keeps “the target is still inside this interval” as an invariant.

### higher-order assertion

값뿐 아니라 함수나 predicate 자체를 변수로 받아 그 성질을 표현하는 assertion이다.

> [!example] 엔지니어 관점
> 특정 메모리 내용 하나가 아니라 ‘어떤 주소 변환 함수가 주어져도 이 인터페이스 법칙을 만족한다’고 쓰는 상위 수준 검증 계약에 가깝다.

**English definition:** An assertion that can quantify over or otherwise describe functions and predicates themselves, not only ordinary data values.

> [!example] Engineering view
> It is like a higher-level verification contract saying “for any address-mapping function, this interface law holds,” rather than checking one concrete memory image.

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 배열을 포함하도록 상태와 assertion 논리를 확장하고, 이진 탐색을 통해 데이터 구조 불변식과 범위 추론을 연습한다.
>
> **English:** Extends states and assertion logic with arrays, using binary search to practice data-structure invariants and range reasoning.

### §4.1–4.2 · 배열 syntax과 함수적 저장

배열 읽기와 갱신을 core syntax에 추가하고, 배열 값을 인덱스에서 원소로 가는 유한 함수로 본다. 갱신은 새 배열 값을 만들되 나머지 인덱스를 보존한다.

**English — Array syntax and functional stores:** Adds array selection and update, treating an array value as a finite function from indices to elements. Update creates a new array value while preserving all other indices.

### §4.3 · 이진 탐색과 구간 불변식

검색 후보가 현재 경계 사이에만 존재한다는 불변식과 정렬 가정을 결합한다. 각 분기는 후보 구간을 줄이면서 목표 원소의 가능성을 보존한다.

**English — Binary search and interval invariants:** Combines sortedness with an invariant that any candidate lies within the current bounds. Each branch shrinks the interval while preserving the possibility of the target.

### §4.4 · 배열 대입의 추론 규칙

스칼라 대입의 단순 치환 대신 배열 갱신 식을 assertion에 반영한다. 선택-갱신 관계는 같은 인덱스와 다른 인덱스의 경우를 나눈다.

**English — Inference rules for array assignment:** Replaces scalar substitution with array-update expressions inside assertions. Selection after update splits into equal-index and unequal-index cases.

### §4.5 · 배열 전체에 대한 higher-order assertion

정렬됨, 구간 내 일치, 모든 원소의 성질처럼 인덱스를 양화하는 assertion을 사용한다. assertion language가 배열 함수와 양화를 충분히 표현해야 증명 규칙이 유용하다.

**English — Higher-order assertions about arrays:** Uses quantified assertions for sortedness, interval agreement, and elementwise properties. Useful proof rules require an assertion language expressive enough for arrays and quantification.

## 반드시 남겨야 할 핵심

- 배열은 여러 독립 변수의 묶음이 아니라 인덱스 함수로 모델링할 수 있다.
  - EN: An array can be modeled as an indexed function rather than a bundle of unrelated variables.
- 배열 알고리즘의 불변식은 값뿐 아니라 유효 인덱스 구간을 함께 추적한다.
  - EN: Array-algorithm invariants track valid index ranges as well as values.
- 데이터 구조가 풍부해지면 assertion language의 표현력도 함께 확장되어야 한다.
  - EN: As data structures grow richer, the assertion language must grow with them.

> [!warning] 자주 생기는 혼동
> - 배열 갱신이 기존 배열의 모든 위치를 파괴한다고 생각하지 않는다.
>   - EN: Do not treat array update as destroying every existing element.
> - 경계 밖 접근과 정렬 가정은 알고리즘 증명에서 별도 의무다.
>   - EN: Bounds safety and the sortedness assumption are separate proof obligations.

## 1단계 — 배열을 유한 함수로 모델링 — §4.1–4.2

배열 값은 첨자 집합에서 정수로 가는 함수이며, 배열 변수는 상태가 그런 함수를 배정하는 이름이다.

`X(i)`는 현재 함수 X를 i에 적용한다. `X(i):=a`는 i에서만 a를 반환하고 다른 첨자에서는 옛 X와 같은 새 함수를 만든다. i가 정의역 밖이면 오류 결과로 간다.

> [!question] 책을 덮고 답해 보기
> X=[4↦10,5↦20]에서 X(5):=7 뒤의 함수를 써 보라.

### English companion

An array value is a function from an index set to integers, and a state maps an array variable to such a function.

`X(i)` applies the current function X to i. `X(i):=a` creates a new function returning a at i and the old X elsewhere. If i is outside the domain, evaluation produces an error result.

---

## 2단계 — 이진 탐색을 명세에서 이해 — §4.3

탐색 구간 불변식은 목표 값이 있을 수 있는 위치를 계속 좁힌다.

정렬 조건과 경계 관계를 사전조건으로 두고, 매 반복에서 중간 원소 비교로 한쪽 구간을 제거한다. 불변식은 제거한 구간에는 답이 없음을 기록하고 변량은 남은 구간 길이다.

> [!question] 책을 덮고 답해 보기
> `lo≤target-index<hi`를 직접 모를 때 어떤 논리적 불변식으로 후보 구간을 표현할 수 있는가?

### English companion

A search-interval invariant continually narrows the positions where the target may occur.

Start from sortedness and boundary conditions. Each comparison removes half the interval; the invariant records that eliminated positions cannot contain the answer, and the variant is the remaining interval length.

---

## 3단계 — 배열 대입 규칙 — §4.4

스칼라 치환과 달리 배열 갱신은 모든 배열 읽기에 대한 조건부 효과를 반영해야 한다.

사후조건의 X를 변형된 함수 X[i↦a]로 바꾸는 관점이 안전하다. 첨자 식 자체가 X를 읽을 수 있으므로 평가 순서와 오류 조건도 선행조건에 포함해야 한다.

> [!question] 책을 덮고 답해 보기
> 왜 `X(i):=a`를 단순히 사후조건의 `X(i)`만 a로 바꾸어 처리하면 안 되는가?

### English companion

Unlike scalar substitution, an array update has a conditional effect on every array read.

A safe view replaces X in the postcondition by the updated function X[i↦a]. Because the index expression may itself read X, evaluation order and error conditions must also enter the precondition.

---

## 4단계 — 배열 전체를 양화하기 — §4.5

정렬, 순열 보존 같은 성질은 정수 변수만의 1차 assertion보다 함수 자체를 양화하는 higher-order assertion이 자연스럽다.

배열의 옛 값을 함수 변수 X₀로 보존하면 최종 배열이 같은 원소를 갖는지, 특정 구간만 바뀌었는지 표현할 수 있다. 표현력이 커지는 만큼 추론과 자동화는 어려워진다.

> [!question] 책을 덮고 답해 보기
> 정렬 알고리즘의 사후조건에 정렬성 외에 반드시 넣어야 할 보존 성질은?

### English companion

Properties such as sortedness and permutation preservation naturally require higher-order assertions quantifying over functions.

Binding the old array to a function variable X₀ lets us state that the final array has the same elements or differs only on a region. The greater expressiveness makes inference and automation harder.

## 자체 점검 퀴즈

### Q1. 배열 원소 갱신의 표시적 모델은?

What is the denotational model of an array-element update?

- A. 원래 함수를 삭제 / Delete the old function
- B. 한 점에서만 다른 새 함수 / A new function differing at one index
- C. 첨자를 문자열로 변환 / Convert the index to a string

> [!success]- 정답과 해설
> **B.** 불변 데이터 관점의 함수 갱신으로 상태 변화를 표현한다.
>
> EN: State change is represented by functional update in an immutable mathematical model.

### Q2. 이진 탐색 종료 증명에 적합한 변량은?

Which is a suitable variant for binary search?

- A. 배열 원소 합 / Sum of array elements
- B. 남은 후보 구간 길이 / Length of the remaining candidate interval
- C. 목표 값 자체 / The target value

> [!success]- 정답과 해설
> **B.** 각 반복에서 후보 구간이 엄격히 줄어든다.
>
> EN: The candidate interval strictly shrinks each iteration.

### Q3. higher-order assertion이 특히 필요한 성질은?

Which property especially motivates higher-order assertions?

- A. 한 변수의 현재 값 / The current value of one variable
- B. 배열 전체의 순열 보존 / Permutation preservation of an entire array
- C. 키워드 철자 / Keyword spelling

> [!success]- 정답과 해설
> **B.** 배열을 함수 값으로 비교하거나 양화해야 하기 때문이다.
>
> EN: It requires quantifying over or comparing arrays as function values.

## 다음 개념으로

배열 오류는 정상 종료 외의 결과를 드러낸다. 다음 장은 실패, 입출력, 비종료를 하나의 의미 구조에 담기 위해 연속성과 계속을 확장한다.

**English:** Array errors expose outcomes beyond normal termination. The next chapter unifies failure, I/O, and nontermination using richer domains and continuations.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 81–96.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
