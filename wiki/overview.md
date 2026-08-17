---
type: overview
title: "Theories of Programming Languages — Course Overview"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
source: "[[reynolds-theories-of-programming-languages]]"
tags:
  - programming-languages
  - semantics
  - study-map
---

# 책 전체 개요 (Whole-book overview)

> [!abstract] 이 책은 무엇을 하려는가
> 이 책은 언어 목록이나 문법 모음이 아니다. 프로그램을 수학적 대상으로 만들고, 그 의미와 실행을 설명하고, 올바름과 추상화를 증명하는 여러 이론이 어떻게 서로 이어지는지를 보여 주는 지도다.
>
> **English:** This is not a catalog of languages or a collection of grammars. It is a map of how programs become mathematical objects, how their meaning and execution are described, and how theories of correctness and abstraction connect.

## 책의 중심 논지

Reynolds의 중심 생각은 하나의 언어를 이해하려면 syntax만 읽어서는 안 된다는 것이다. 어떤 수학적 세계가 의미를 담는지, 프로그램이 그 세계에서 어떻게 행동하는지, 그리고 그 설명으로 무엇을 증명할 수 있는지를 함께 보아야 한다. 책은 같은 작은 언어를 표시적·전이적·논리적 관점으로 거듭 비추며 각 관점의 힘과 한계를 비교한다.

**English:** Reynolds’s central idea is that syntax alone cannot explain a language. We must also ask which mathematical world carries meaning, how programs behave in that world, and what the account lets us prove. The book repeatedly views small languages through denotational, transition-based, and logical lenses so that the power and limits of each become visible.

> [!question] 책 전체를 관통하는 질문
> syntax, 의미, 실행, 증명, 타입을 어떻게 하나의 일관된 설명으로 연결할 것인가?
>
> EN: How can syntax, meaning, execution, proof, and types form one coherent account?

# 네 개의 개념 흐름

## 01. 기초와 명령형 semantics (Foundations and imperative semantics) — Ch. 1–5 + Appendix

**핵심 질문:** 프로그램의 뜻을 수학적으로 정의하고 그 올바름을 어떻게 증명할까?

수학 부록과 술어 논리에서 집합·함수·관계·바인딩·추론 규칙을 준비한다. 이어 작은 명령형 언어를 상태 변환으로 해석하고, 재귀를 도메인과 최소 고정점으로 다루며, Hoare식 명세와 검증 조건으로 의미를 증명에 연결한다. 배열, 실패, 입출력은 단순 상태 변환이 부족해지는 지점을 드러내고 계속과 재개를 부른다.

**English:** The appendix and predicate logic prepare sets, functions, relations, binding, and inference rules. A small imperative language is then interpreted as state transformation; domains and least fixed points handle recursion; Hoare-style specifications and verification conditions connect meaning to proof. Arrays, failure, and I/O expose the limits of plain state transformers and motivate continuations and resumptions.

> [!success] 이 흐름을 마치면
> ‘프로그램은 무엇을 뜻하는가?’에 답하는 기본 어휘
>
> EN: A basic vocabulary for answering “What does a program mean?”

---

## 02. 시간 속 행동과 동시성 (Behavior over time and concurrency) — Ch. 6–9

**핵심 질문:** 결과 하나가 아니라 가능한 실행 과정 전체를 어떻게 설명할까?

의미를 한 단계 전이 관계로 바꾸면 중간 상태와 실행 경로가 보인다. 이 틀은 비결정적 선택, 데드락, 공정성, 공유 변수 동시성을 표현하고, 마침내 CSP에서 공유 상태 대신 통신 사건과 흔적으로 프로세스의 관찰 가능한 행동을 설명한다.

**English:** One-step transition relations make intermediate states and execution paths explicit. This framework captures nondeterministic choice, deadlock, fairness, and shared-variable concurrency. CSP then replaces shared state with communication events and traces to describe the observable behavior of processes.

> [!success] 이 흐름을 마치면
> ‘프로그램은 어떻게 움직이는가?’를 경로와 관찰로 설명하는 법
>
> EN: A way to answer “How does a program move?” with paths and observations

---

## 03. 함수, 평가, 제어 (Functions, evaluation, and control) — Ch. 10–14

**핵심 질문:** 함수와 바인딩만으로 계산을 만들고 평가 전략의 차이를 어떻게 드러낼까?

람다 계산이 함수형 계산의 최소 핵심을 제공한다. 이를 적극 평가 언어로 확장하면서 환경과 클로저를 도입하고, 계속과 저장소를 함수 자체로 표현한다. ISWIM 계열 언어와 정상 순서 언어를 비교하면 call-by-value, call-by-name, lazy evaluation이 종료·효율·관찰 가능한 결과에 미치는 영향이 분명해진다.

**English:** The lambda calculus supplies a minimal core of functional computation. Extending it to an eager language introduces environments and closures, while continuations and stores can themselves be represented functionally. Comparing ISWIM-like and normal-order languages reveals how call-by-value, call-by-name, and lazy evaluation affect termination, efficiency, and observable results.

> [!success] 이 흐름을 마치면
> 바인딩과 평가 순서가 언어 설계를 바꾸는 이유
>
> EN: Why binding and evaluation order reshape language design

---

## 04. 타입, 추상화, Algol (Types, abstraction, and Algol) — Ch. 15–19

**핵심 질문:** 안전한 프로그램과 감춰진 구현을 어떻게 정적으로 표현할까?

단순 타입의 유도 규칙과 건전성에서 시작해 서브타이핑·교차 타입으로 사용 가능성을 세밀하게 표현한다. 전칭 다형성은 여러 타입에서 균일한 코드를, 실존 타입은 표현 타입을 감춘 모듈을 설명한다. 마지막 Algol 계열 언어에서는 표현식·수용자·명령 같은 구절 타입과 블록 구조가 함수형 추상화와 가변 상태를 한 체계로 결합한다.

**English:** Typing rules and soundness for simple types lead to subtyping and intersection types, which refine where terms may be used. Universal polymorphism explains uniform code across types; existential types explain modules that hide representation. The final Algol-like language combines functional abstraction and mutable state through phrase types—expressions, acceptors, and commands—and block structure.

> [!success] 이 흐름을 마치면
> ‘어떤 프로그램이 안전하게 조합되는가?’에 대한 정적 설명
>
> EN: A static account of “Which programs compose safely?”

# 반복되는 사고 순서

01. **syntax을 분리한다 (Separate the syntax)**
   - 구체 표기에서 abstract syntax을 떼어 내고, 자유 변수와 바인딩 범위를 명시한다.
   - EN: Detach abstract syntax from notation and make free variables and binding scopes explicit.
02. **의미의 세계를 고른다 (Choose a world of meanings)**
   - 값, 상태 변환, 도메인, 전이, 흔적 중 무엇이 관찰을 담는지 결정한다.
   - EN: Decide whether values, state transformers, domains, transitions, or traces carry the relevant observations.
03. **syntax과 의미를 연결한다 (Connect syntax to meaning)**
   - 의미 함수나 전이 규칙을 합성적으로 정의해 복합 구절의 뜻을 부분에서 만든다.
   - EN: Define semantic functions or transition rules compositionally so compound phrases derive meaning from their parts.
04. **행동을 추론한다 (Reason about behavior)**
   - 구조적 귀납법, 고정점 귀납법, 불변식, 검증 조건으로 원하는 성질을 증명한다.
   - EN: Use structural and fixed-point induction, invariants, and verification conditions to prove desired properties.
05. **안전하게 추상화한다 (Abstract safely)**
   - 타입, 다형성, 모듈, 블록 구조로 허용되는 조합과 감춰야 할 구현을 표현한다.
   - EN: Use types, polymorphism, modules, and block structure to express legal composition and hidden implementation.

# 장을 넘어 반복되는 관점

- **바인딩과 치환 (Binding and substitution)** — 람다, 양화사, 선언은 모두 이름의 범위와 캡처 회피를 요구한다.
  - EN: Lambdas, quantifiers, and declarations all require scope and capture avoidance.
- **합성성 (Compositionality)** — 전체의 의미를 부분의 의미에서 만들 수 있어야 언어 정의가 확장 가능하다.
  - EN: Language definitions scale when the meaning of a whole is built from the meanings of its parts.
- **재귀와 고정점 (Recursion and fixed points)** — 자기 참조 프로그램의 의미를 근사들의 극한과 최소 해로 구성한다.
  - EN: Self-referential programs receive meaning through limits of approximations and least solutions.
- **문맥과 관찰 (Context and observation)** — 동일한 결과처럼 보여도 종료, 실패, I/O, 흔적을 관찰하면 프로그램은 달라질 수 있다.
  - EN: Programs with the same apparent result may differ once termination, failure, I/O, or traces become observable.
- **제어와 상태 (Control and state)** — 계속, 재개, 저장소는 ‘다음에 할 일’과 ‘지금 기억하는 것’을 의미 속에 드러낸다.
  - EN: Continuations, resumptions, and stores expose ‘what happens next’ and ‘what is remembered now’ inside meaning.
- **타입과 표현 독립성 (Types and representation independence)** — 정적 규칙은 잘못된 조합을 막고, 추상 타입은 클라이언트가 구현 세부에 의존하지 못하게 한다.
  - EN: Static rules reject invalid combinations, while abstract types prevent clients from depending on representation details.

# 전체 장별 여정

### 1부 · 기초 · 명령형 semantics (Foundations · Imperative Semantics)

- [[chapter-01-predicate-logic|01. 술어 논리]] — 언어를 설명하는 네 가지 도구
- [[chapter-02-simple-imperative-language|02. The Simple Imperative Language]] — State transformers and least fixed points
- [[chapter-03-program-specifications|03. 프로그램 명세와 증명]] — 부분 정확성, 전체 정확성, 불변식
- [[chapter-04-arrays|04. 배열]] — 업데이트되는 함수와 higher-order assertion
- [[chapter-05-failure-io-continuations|05. 실패, 입출력, 계속]] — 결과에서 상호작용 과정으로
- [[appendix-mathematical-background|A. 수학적 배경]] — 집합, 관계, 함수, 곱과 합의 도구상자

### 2부 · 연산 · 비결정성 · 동시성 (Operational · Nondeterminism · Concurrency)

- [[chapter-06-transition-semantics|06. transition semantics]] — 실행을 작은 단계로 분해하기
- [[chapter-07-nondeterminism|07. 비결정성과 보호 명령]] — 하나의 프로그램, 여러 가능한 결과
- [[chapter-08-shared-variable-concurrency|08. 공유 변수 동시성]] — 인터리빙, 원자성, 공정성
- [[chapter-09-csp|09. 통신 순차 프로세스]] — 공유 상태 대신 동기식 메시지

### 3부 · 함수형 언어와 제어 (Functional Languages · Control)

- [[chapter-10-lambda-calculus|10. 람다 계산]] — 함수, 치환, 평가 전략의 핵심
- [[chapter-11-eager-functional-language|11. 적극 함수형 언어]] — 람다 핵심에서 패턴·재귀·자료구조로
- [[chapter-12-functional-continuations|12. 함수형 언어의 계속]] — 제어 문맥을 값과 기계로 바꾸기
- [[chapter-13-iswim-like-languages|13. ISWIM 계열 언어]] — 클로저, 저장소, 제어 효과의 결합
- [[chapter-14-normal-order-language|14. 정상 순서 언어]] — 필요할 때 계산하고 결과를 공유하기

### 4부 · 타입 · 추상화 · Algol (Types · Abstraction · Algol)

- [[chapter-15-simple-type-system|15. 단순 타입 체계]] — 판단, 건전성, 타입의 두 관점
- [[chapter-16-subtypes-intersection-types|16. 서브타입과 교차 타입]] — 대체 가능성, 오버로딩, 의미의 일관성
- [[chapter-17-polymorphism|17. 다형성]] — 타입을 추상화하고 모든 타입에서 재사용하기
- [[chapter-18-module-specification|18. 모듈 명세]] — 표현을 숨기고 인터페이스만 약속하기
- [[chapter-19-algol-like-languages|19. Algol 계열 언어]] — 블록 구조와 스택 규율의 semantics

# 권장 학습 순서

1. 먼저 이 개요에서 현재 장이 전체 논증에서 맡은 역할을 찾는다.
   - EN: First locate the chapter’s role in the book’s overall argument on this overview.
2. 장 페이지의 핵심 질문을 읽고 syntax → 의미 → 증명 순서를 따라간다.
   - EN: Read the chapter’s driving question and follow the syntax → meaning → proof sequence.
3. 표기보다 모델의 선택에 집중한다. 무엇을 관찰하고 무엇을 추상화했는지 묻는다.
   - EN: Focus on the choice of model rather than notation: ask what is observed and what is abstracted away.
4. 체크포인트와 퀴즈를 책 없이 풀고, 틀린 개념만 원문 정의와 증명으로 돌아가 확인한다.
   - EN: Answer checkpoints and quizzes without the book, then return to the original definitions and proofs only for weak concepts.

Every chapter page now contains a detailed section map, Korean-first explanation, English companion, precise takeaways, common-confusion notes, retrieval prompts, and original quizzes. The [[reynolds-theories-of-programming-languages|source page]] records the ingestion and copyright boundary.
