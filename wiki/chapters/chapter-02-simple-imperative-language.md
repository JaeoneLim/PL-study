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
- **syntactic sugar (syntactic sugar)**
- **완전 추상성 (full abstraction)**

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 작은 명령형 언어를 완전한 수학적 대상으로 만들고, 반복과 재귀에 의미를 부여하는 도메인 이론의 최소 도구를 도입한다.
>
> **English:** Turns a small imperative language into a complete mathematical object and introduces the minimum domain theory needed to interpret iteration and recursion.

### §2.1–2.2 · syntax, 상태, 의미 함수

식은 상태에서 값으로, 명령은 상태에서 상태로 가는 부분 함수로 해석된다. 정의되지 않음은 산술 오류가 아니라 비종료를 먼저 나타낸다.

**English — Syntax, states, and semantic functions:** Expressions map states to values, while commands are partial functions from states to states. Undefinedness initially represents nontermination rather than arithmetic failure.

### §2.3–2.4 · 도메인, 연속성, 최소 고정점

부분 정보를 순서화하고 증가 사슬의 최소 상계를 사용한다. 연속 함수의 최소 고정점은 while 의미를 유한한 반복 근사의 극한으로 구성한다.

**English — Domains, continuity, and least fixed points:** Partial information is ordered and increasing chains receive least upper bounds. A continuous function’s least fixed point constructs while-loop meaning as the limit of finite approximations.

### §2.5–2.6 · 선언, 치환, 문법 설탕

지역 변수 선언의 의미를 환경 확장과 치환으로 비교한다. for 문은 핵심 언어로 번역되는 파생 형식이며 번역이 변수 포획과 평가 횟수를 보존해야 한다.

**English — Declarations, substitution, and syntactic sugar:** Local declarations are compared through environment extension and substitution. A for-command is derived syntax whose translation must preserve binding and evaluation behavior.

### §2.7 · 산술 오류의 명시화

비종료와 오류를 같은 미정의 값으로 합치면 관찰을 잃는다. 결과 도메인에 오류를 별도 경우로 추가해 두 현상을 구분한다.

**English — Making arithmetic errors explicit:** Collapsing divergence and arithmetic error into one undefined result loses observations. Extending the result domain with an explicit error separates them.

### §2.8 · 건전성과 완전 추상성

의미가 실행 관찰을 보존하는지, 그리고 문맥이 구별할 수 없는 프로그램만 의미적으로 같게 두는지 검사한다. 완전 추상성은 의미 동치와 문맥 동치의 일치를 요구한다.

**English — Soundness and full abstraction:** Checks whether denotations preserve operational observations and identify only programs no context can distinguish. Full abstraction asks denotational and contextual equivalence to coincide.

## 반드시 남겨야 할 핵심

- 명령의 핵심 의미 객체는 상태 변환이며 비종료 때문에 보통 부분적이다.
  - EN: A command’s central semantic object is a state transformer, generally partial because of divergence.
- while은 방정식의 아무 해가 아니라 유한 실행에서 접근 가능한 최소 해를 취한다.
  - EN: A while-loop takes the least solution of its semantic equation—the one approximated by finite executions.
- 언어 확장은 새 관찰을 의미 도메인에 추가하게 만든다.
  - EN: Language extensions force new observations into the semantic domain.

> [!warning] 자주 생기는 혼동
> - ⊥를 자동으로 ‘오류’라 부르지 않는다. 이 장의 기본 모델에서는 비종료다.
>   - EN: Do not automatically read bottom as ‘error’; in the basic model it denotes nontermination.
> - 고정점 방정식만 쓰는 것으로는 부족하다. 왜 최소 고정점인지 설명해야 한다.
>   - EN: Writing a fixed-point equation is insufficient; explain why the least fixed point is selected.

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

semantics은 선언 전 값을 저장하고 범위가 끝날 때 복원하는 효과를 모델링한다. syntactic substitution은 바인더 이름을 피해야 할 뿐 아니라, 서로 다른 변수를 하나로 합치는 치환이 대입 효과를 바꿀 수 있음을 고려해야 한다.

> [!question] 책을 덮고 답해 보기
> 입력과 출력 매개변수가 같은 변수로 치환될 때 팩토리얼 프로그램이 깨질 수 있는 이유는?

### English companion

A local declaration binds a name; aliasing occurs when different names designate the same storage.

The semantics models saving the old value and restoring it after the scope. Syntactic substitution must avoid binders and must account for substitutions that merge distinct variables, changing assignment effects.

---

## 4단계 — 확장과 관찰 가능성 — §2.6–2.8

for 같은 구성은 핵심 언어로 번역할 수 있고, 산술 오류를 넣으면 관찰 가능한 결과 공간이 달라진다.

syntactic sugar의 정의는 새 의미 규칙 없이 번역으로 정당화된다. 건전성은 의미적으로 같은 핵심 번역을 보장하고, 완전 추상성은 문맥이 구별하는 프로그램과 semantics이 구별하는 프로그램이 정확히 일치하는지 묻는다.

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

- A. syntax error / A syntax error
- B. 비종료 또는 아직 없는 정보 / Nontermination or absent information
- C. 빈 상태 / An empty state

> [!success]- 정답과 해설
> **B.** 종료 상태를 생산하지 못하는 계산을 표현한다.
>
> EN: It represents a computation that produces no final state.

### Q3. syntactic sugar의 가장 좋은 설명은?

What best describes syntactic sugar?

- A. 핵심 언어로 의미 보존 번역되는 convenience syntax / Convenient syntax translated meaning-preservingly into a core language
- B. 파서가 무시하는 주석 / A comment ignored by the parser
- C. 새로운 하드웨어 명령 / A new hardware instruction

> [!success]- 정답과 해설
> **A.** convenience syntax은 표현력을 반드시 늘리지 않는다.
>
> EN: Convenience syntax need not increase expressive power.

## 다음 개념으로

상태 변환의 의미를 얻었으니, 다음에는 그 변환이 원하는 사양을 만족함을 syntactic 규칙으로 증명한다.

**English:** With state-transformer meanings in hand, we next prove syntactically that those transformations meet specifications.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 24–53.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
