---
type: chapter
title: "01. 술어 논리"
title_en: "Predicate Logic"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "1–23"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-02-simple-imperative-language]]"
  - "[[chapter-03-program-specifications]]"
  - "[[chapter-04-arrays]]"
---

# 01. 술어 논리 (Predicate Logic)

> [!abstract] 한눈에 보기
> 익숙한 술어 논리를 실험대로 삼아 추상 구문, 표시적 의미론, 추론 규칙, 바인딩을 분리해 본다. 이 네 도구는 뒤의 모든 언어 정의에서 반복된다.
>
> **English:** Predicate logic is used as a familiar laboratory for separating abstract syntax, denotational semantics, inference rules, and binding. The same four tools recur throughout the book.

## 학습 목표

- 구체 표기와 추상 구문 트리를 구분한다.
  - EN: Distinguish concrete notation from abstract syntax trees.
- 상태를 입력으로 받는 의미 함수로 식과 단언을 해석한다.
  - EN: Interpret expressions and assertions as semantic functions of states.
- 자유 변수, 캡처 회피 치환, α-이름변경의 관계를 설명한다.
  - EN: Explain free variables, capture-avoiding substitution, and alpha-renaming.

## 핵심 용어

- **추상 구문 (abstract syntax)**
- **합성성 (compositionality)**
- **타당성 (validity)**
- **구조적 귀납법 (structural induction)**
- **캡처 회피 치환 (capture-avoiding substitution)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 이후 모든 장에서 사용할 세 가지 층위—구문, 의미, 증명—를 분리하고 다시 연결하는 법을 세운다.
>
> **English:** Establishes how to separate and reconnect the three layers used throughout the book: syntax, semantics, and proof.

### §1.1 · 추상 구문과 구조적 정의

논리식의 표면 표기 대신 항과 공식의 생성자를 정의한다. 이 구조는 재귀 함수와 구조적 귀납법의 기준이 된다.

**English — Abstract syntax and structural definition:** Defines constructors for terms and formulas independently of surface notation. That structure supports recursive functions and structural induction.

### §1.2 · 환경을 통한 표시적 의미

변수 환경과 기호 해석을 입력으로 받아 항은 값으로, 공식은 진릿값으로 보낸다. 의미 함수의 각 절은 구문 생성자에 대응한다.

**English — Denotational meaning through environments:** Given a variable environment and an interpretation of symbols, terms denote values and formulas denote truth values. Each semantic clause follows a syntax constructor.

### §1.3 · 타당성과 추론

한 해석에서 참인 것, 모든 환경에서 참인 것, 모든 해석에서 타당한 것을 구분한다. 추론 규칙은 전제가 참일 때 결론도 참이라는 건전성 기준으로 평가한다.

**English — Validity and inference:** Distinguishes truth in one interpretation, truth under every environment, and validity across interpretations. Inference rules are judged by sound preservation of truth.

### §1.4 · 바인딩, 이름 변경, 치환

자유·결박 변수를 정의하고 캡처 회피 치환을 구성한다. 대입 보조정리는 구문 치환과 환경 갱신이 같은 의미 효과를 낸다는 연결 고리다.

**English — Binding, renaming, and substitution:** Defines free and bound variables and constructs capture-avoiding substitution. The substitution lemma connects syntactic replacement with semantic environment update.

## 반드시 남겨야 할 핵심

- 추상 구문은 파싱 결과이며, 의미와 증명은 그 트리 위에서 재귀적으로 정의된다.
  - EN: Abstract syntax is the result of parsing; semantics and proofs are recursively defined over that tree.
- 의미는 기호 자체가 아니라 해석과 환경에 상대적이다.
  - EN: Meaning is relative to an interpretation and an environment, not inherent in a symbol.
- 치환 정리는 이후 선언, 함수 호출, 베타 축약의 정확성을 지탱한다.
  - EN: Substitution results later support declarations, function calls, and beta-reduction.

> [!warning] 자주 생기는 혼동
> - 공식이 특정 환경에서 참이라는 말과 논리적으로 타당하다는 말을 혼동하지 않는다.
>   - EN: Do not confuse truth under one environment with logical validity.
> - 문자열 치환은 변수를 포획할 수 있으므로 바인더 이름 변경이 필요하다.
>   - EN: Textual replacement can capture variables, so bound-variable renaming may be required.

## 1단계 — 표기에서 구조를 떼어내기 — §1.1

추상 문법은 괄호·우선순위 같은 표기상의 우연을 버리고 생성자와 부분구조만 남긴다.

표현식은 문자열이 아니라 생성자로 만든 트리다. 따라서 의미 함수와 증명은 문자열 모양이 아닌 트리의 구성 방식에 따라 정의할 수 있다. 이것이 구문 지향 정의와 구조적 귀납법의 기반이다.

> [!question] 책을 덮고 답해 보기
> `x + y × z`를 구체 표기와 생성자 트리 두 방식으로 써 보라.

### English companion

An abstract grammar discards notational accidents such as parentheses and precedence, retaining constructors and substructure.

An expression is a tree built by constructors, not a character string. Semantics and proofs can therefore follow the way the tree is built. This supports syntax-directed definitions and structural induction.

---

## 2단계 — 상태에서 의미로 — §1.2

자유 변수가 있는 식의 의미는 값 하나가 아니라 상태를 값으로 보내는 함수다.

상태 σ가 각 변수에 정수를 배정한다면 정수식은 Σ→ℤ, 단언은 Σ→𝔹로 해석된다. 각 생성자의 의미를 부분식의 의미만으로 정의하면 의미론은 합성적이다.

> [!question] 책을 덮고 답해 보기
> σ(x)=2, σ(y)=5일 때 `x+y<10`의 의미를 계산하라.

### English companion

The meaning of an open expression is not one value but a function from states to values.

If a state σ assigns an integer to every variable, integer expressions denote Σ→ℤ and assertions denote Σ→𝔹. Defining each constructor from only the meanings of its immediate parts makes the semantics compositional.

---

## 3단계 — 진리와 증명을 분리하기 — §1.3

타당성은 모든 상태에서 참이라는 의미론적 개념이고, 유도 가능성은 규칙으로 증명할 수 있다는 구문론적 개념이다.

건전성은 증명 가능한 것이 모두 타당함을 보장한다. 더 강한 단언은 더 적은 상태를 허용한다는 역방향 포함 관계도 이후 프로그램 명세 규칙에서 중요해진다.

> [!question] 책을 덮고 답해 보기
> `false`가 모든 단언보다 강하고 `true`가 모든 단언보다 약한 이유를 상태 집합으로 설명하라.

### English companion

Validity is semantic truth in every state; derivability is the syntactic existence of a proof from rules.

Soundness guarantees that every derivable assertion is valid. The reverse-inclusion intuition for stronger assertions becomes important in later program-specification rules.

---

## 4단계 — 이름 포획을 피하는 치환 — §1.4

바인더는 범위를 만들며, 단순한 텍스트 치환은 자유 변수를 우연히 묶을 수 있다.

치환 전에 충돌하는 바운드 변수를 새 이름으로 바꾸고, 자유 변수에만 동시에 치환한다. 일치 정리, 치환 정리, 이름변경 정리는 구문 조작과 의미가 맞물린다는 핵심 안전장치다.

> [!question] 책을 덮고 답해 보기
> `∀y. x<y`에 `y+1`을 x 대신 넣을 때 왜 먼저 y를 바꿔야 하는가?

### English companion

A binder creates a scope, and naive textual substitution can accidentally bind a free variable.

Rename conflicting bound variables before simultaneously replacing free occurrences. Coincidence, substitution, and renaming theorems are the key guarantees that syntax manipulation respects meaning.

## 자체 점검 퀴즈

### Q1. 합성적 의미론의 핵심 조건은?

What is the defining condition of compositional semantics?

- A. 의미가 소스 문자열 길이에 의존한다 / Meaning depends on source-string length
- B. 구성물의 의미가 직접 부분식의 의미로 결정된다 / A construct's meaning is determined by meanings of its immediate parts
- C. 모든 프로그램이 종료한다 / Every program terminates

> [!success]- 정답과 해설
> **B.** 합성성은 표현 방식이 아니라 부분구조의 의미만을 사용한다.
>
> EN: Compositionality uses the meanings of substructures, not representational details.

### Q2. 캡처 회피 치환이 필요한 직접적인 이유는?

Why is capture-avoiding substitution necessary?

- A. 연산 우선순위를 정하려고 / To choose operator precedence
- B. 자유 변수가 새 바인더에 묶여 의미가 바뀌는 일을 막으려고 / To prevent a free variable from becoming bound and changing meaning
- C. 정수 오버플로를 막으려고 / To prevent integer overflow

> [!success]- 정답과 해설
> **B.** 치환은 자유 변수의 지위를 보존해야 한다.
>
> EN: Substitution must preserve which occurrences are free.

### Q3. 타당성과 유도 가능성의 올바른 관계는?

Which correctly relates validity and derivability?

- A. 둘은 정의상 같다 / They are identical by definition
- B. 타당성은 의미론적이고 유도 가능성은 구문론적이다 / Validity is semantic; derivability is syntactic
- C. 둘 다 상태 하나에서의 실행 결과다 / Both are outcomes in one state

> [!success]- 정답과 해설
> **B.** 건전성·완전성은 서로 다른 두 개념을 연결하는 성질이다.
>
> EN: Soundness and completeness connect these distinct notions.

## 다음 개념으로

이제 의미가 단순한 진릿값이 아니라, 종료하지 않을 수 있는 상태 변환이 되면서 도메인 이론이 필요해진다.

**English:** Next, meanings become possibly nonterminating state transformations, which forces us to introduce domain theory.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 1–23.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
