---
type: chapter
title: "02. 단순 명령형 언어"
title_en: "The Simple Imperative Language"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "24–53"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-01-predicate-logic]]"
  - "[[chapter-03-program-specifications]]"
  - "[[chapter-04-arrays]]"
---

# 02. 단순 명령형 언어 (The Simple Imperative Language)

> [!abstract] 한눈에 보기
> 대입, 순차 실행, 조건문, while, 지역 변수로 이루어진 작은 언어를 정의하고 비종료를 포함한 표시적 의미를 만든다.
>
> **English:** A small language of assignment, sequencing, conditionals, while loops, and local variables is given a denotational semantics that includes nontermination.

## 학습 목표

- 명령을 부분적인 상태 변환으로 해석한다.
  - EN: Interpret commands as partial state transformations.
- while의 의미가 최소 고정점인 이유를 설명한다.
  - EN: Explain why a while loop denotes a least fixed point.
- 지역 변수와 별칭이 치환을 어렵게 만드는 방식을 추적한다.
  - EN: Trace how local variables and aliasing complicate substitution.

## 핵심 용어

- **도메인 (domain)**
- **연속 함수 (continuous function)**
- **최소 고정점 (least fixed point)**
- **구문 설탕 (syntactic sugar)**
- **완전 추상성 (full abstraction)**

## 1단계 — 명령을 상태 변환으로 읽기 — §2.1–2.2

식은 상태를 관찰하고, 명령은 상태를 바꾼다.

대입은 한 변수만 갱신하고, 순차 실행은 두 변환을 합성하며, 조건문은 불 표현식의 값으로 분기한다. 비종료는 결과 없음으로 나타나므로 명령의 의미에는 바닥값 ⊥가 필요하다.

> [!question] 책을 덮고 답해 보기
> `x:=x+1; y:=x`의 의미를 두 상태 변환의 합성으로 써 보라.

### English companion

Expressions observe a state; commands transform it.

Assignment updates one variable, sequencing composes transformations, and conditionals branch on a Boolean expression. Nontermination is represented by the absence of a final state, introducing the bottom value ⊥.

---

## 2단계 — 근사와 최소 고정점 — §2.3–2.4

도메인의 순서는 계산 결과의 정보량을 나타내고, 연속 함수는 증가하는 근사의 극한을 보존한다.

while의 의미 함수 F를 0회, 1회, 2회… 펼친 근사에서 시작한다. ⊥에서 F를 반복해 얻는 사슬의 최소 상한이 `fix F`이며, 이것이 불필요한 추가 동작을 넣지 않는 가장 작은 해다.

> [!question] 책을 덮고 답해 보기
> 무한 루프의 모든 유한 근사가 왜 최종 상태를 주지 않는지 설명하라.

### English companion

A domain order represents information content, and continuous functions preserve limits of increasing approximations.

Approximate a while loop by allowing zero, one, two, and more unfoldings. Iterating F from ⊥ yields a chain whose least upper bound is `fix F`, the least solution that adds no unjustified behavior.

---

## 3단계 — 선언, 범위, 별칭 — §2.5

지역 변수 선언은 이름을 묶고, 매개 이름을 같은 저장 위치에 대응시키면 별칭이 생긴다.

의미론은 선언 전 값을 저장하고 범위가 끝날 때 복원하는 효과를 모델링한다. 구문 치환은 바인더 이름을 피해야 할 뿐 아니라, 서로 다른 변수를 하나로 합치는 치환이 대입 효과를 바꿀 수 있음을 고려해야 한다.

> [!question] 책을 덮고 답해 보기
> 입력과 출력 매개변수가 같은 변수로 치환될 때 팩토리얼 프로그램이 깨질 수 있는 이유는?

### English companion

A local declaration binds a name; aliasing occurs when different names designate the same storage.

The semantics models saving the old value and restoring it after the scope. Syntactic substitution must avoid binders and must account for substitutions that merge distinct variables, changing assignment effects.

---

## 4단계 — 확장과 관찰 가능성 — §2.6–2.8

for 같은 구성은 핵심 언어로 번역할 수 있고, 산술 오류를 넣으면 관찰 가능한 결과 공간이 달라진다.

구문 설탕의 정의는 새 의미 규칙 없이 번역으로 정당화된다. 건전성은 의미적으로 같은 핵심 번역을 보장하고, 완전 추상성은 문맥이 구별하는 프로그램과 의미론이 구별하는 프로그램이 정확히 일치하는지 묻는다.

> [!question] 책을 덮고 답해 보기
> 어떤 두 프로그램의 의미 함수가 다르지만 어떤 언어 문맥도 차이를 관찰하지 못한다면 완전 추상성에 어떤 문제가 생기는가?

### English companion

Constructs such as `for` can be translated into the core language, while arithmetic errors enlarge the space of observable results.

Syntactic sugar is justified by translation rather than new semantic machinery. Soundness validates the translation; full abstraction asks whether contextual and semantic distinctions coincide exactly.

## 자체 점검 퀴즈

### Q1. while 의미의 최소 고정점을 택하는 이유는?

Why choose the least fixed point for a while loop?

- A. 가장 빠른 구현이어서 / Because it is the fastest implementation
- B. 유한 전개가 정당화하는 동작만 포함하기 위해 / To include only behavior justified by finite unfoldings
- C. 모든 루프를 종료시키기 위해 / To make every loop terminate

> [!success]- 정답과 해설
> **B.** 최소성은 방정식만 만족하는 임의의 추가 동작을 배제한다.
>
> EN: Leastness excludes arbitrary extra behavior that merely satisfies the equation.

### Q2. 명령 의미에 ⊥가 나타내는 것은?

What does ⊥ represent in command semantics?

- A. 구문 오류 / A syntax error
- B. 비종료 또는 아직 없는 정보 / Nontermination or absent information
- C. 빈 상태 / An empty state

> [!success]- 정답과 해설
> **B.** 종료 상태를 생산하지 못하는 계산을 표현한다.
>
> EN: It represents a computation that produces no final state.

### Q3. 구문 설탕의 가장 좋은 설명은?

What best describes syntactic sugar?

- A. 핵심 언어로 의미 보존 번역되는 편의 구문 / Convenient syntax translated meaning-preservingly into a core language
- B. 파서가 무시하는 주석 / A comment ignored by the parser
- C. 새로운 하드웨어 명령 / A new hardware instruction

> [!success]- 정답과 해설
> **A.** 편의 구문은 표현력을 반드시 늘리지 않는다.
>
> EN: Convenience syntax need not increase expressive power.

## 다음 개념으로

상태 변환의 의미를 얻었으니, 다음에는 그 변환이 원하는 사양을 만족함을 구문적 규칙으로 증명한다.

**English:** With state-transformer meanings in hand, we next prove syntactically that those transformations meet specifications.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 24–53.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
