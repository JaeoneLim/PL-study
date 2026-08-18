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
> 이 책은 새 언어의 syntax를 외우는 안내서가 아니다. parser가 만든 트리에 의미를 붙이고, interpreter의 실행을 설명하고, type checker와 verifier가 내린 판단을 정당화하는 원리를 한 흐름으로 배운다. PL 이론이 처음인 엔지니어도 익숙한 구현 문제에서 출발해 수학적 모델로 이동할 수 있도록 읽는 순서를 잡는다.
>
> **English:** This is not a guide to memorizing the syntax of new languages. It connects familiar engineering artifacts—parser trees, interpreters, type checkers, and verifiers—to the mathematical models that explain and justify them. The reading path starts from implementation problems and assumes no prior PL theory.

## 책의 중심 논지

Reynolds의 출발점은 syntax만으로 언어를 설명할 수 없다는 것이다. 예를 들어 `x + 1`은 parser에게는 constructor 트리이고, evaluator에게는 state에서 정수로 가는 계산이며, verifier에게는 증명해야 할 assertion의 일부다. 책은 작은 언어를 denotational semantics, transition semantics, program logic의 관점에서 반복해 설명한다. 각 관점이 무엇을 잘 보여 주고 무엇을 숨기는지 비교하는 것이 핵심이다.

**English:** Reynolds starts from the claim that syntax alone cannot explain a language. For a parser, `x + 1` is a constructor tree; for an evaluator, it is a computation from a state to an integer; for a verifier, it may be part of an assertion to prove. The book revisits small languages through denotational semantics, transition semantics, and program logic, comparing what each view reveals and hides.

> [!question] 책 전체를 관통하는 질문
> syntax, semantics, execution, proof, type을 어떻게 하나의 일관된 설명으로 연결할 것인가?
>
> EN: How can syntax, meaning, execution, proof, and types form one coherent account?

# 네 개의 개념 흐름

## 01. 기초와 명령형 semantics (Foundations and imperative semantics) — Ch. 1–5 + Appendix

**핵심 질문:** 프로그램의 뜻을 수학적으로 정의하고 그 올바름을 어떻게 증명할까?

수학 부록과 Predicate Logic에서 집합, 함수, relation, binding, inference rule을 준비한다. 이어 작은 명령형 언어를 state transformer로 해석하고, recursion을 domain과 least fixed point로 다룬다. Hoare-style specification과 verification condition은 semantics를 proof와 연결한다. 배열, 실패, I/O는 단순한 state transformer만으로 설명할 수 없는 동작을 드러내고 continuation과 resumption을 요구한다.

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

01. **abstract syntax을 정한다 (Separate the syntax)**
   - 소스 문자열을 parser가 다룰 concrete syntax와 이후 단계가 공유할 constructor tree로 나눈다. free variable과 binding scope도 이 구조에서 명시한다.
   - EN: Detach abstract syntax from notation and make free variables and binding scopes explicit.
02. **semantic domain을 고른다 (Choose a world of meanings)**
   - value, state transformer, domain, transition, trace 가운데 어떤 수학적 대상이 관찰할 동작을 담는지 정한다.
   - EN: Decide whether values, state transformers, domains, transitions, or traces carry the relevant observations.
03. **syntax와 semantics를 연결한다 (Connect syntax to meaning)**
   - 각 constructor에 semantic equation이나 transition rule을 대응시켜, 복합 구절의 의미를 직접 부분구절의 의미에서 만든다.
   - EN: Define semantic functions or transition rules compositionally so compound phrases derive meaning from their parts.
04. **behavior를 증명한다 (Reason about behavior)**
   - structural induction, fixed-point induction, invariant, verification condition으로 원하는 program property를 증명한다.
   - EN: Use structural and fixed-point induction, invariants, and verification conditions to prove desired properties.
05. **abstraction을 안전하게 만든다 (Abstract safely)**
   - type, polymorphism, module, block structure로 허용할 조합과 감출 구현 detail을 표현한다.
   - EN: Use types, polymorphism, modules, and block structure to express legal composition and hidden implementation.

# 장을 넘어 반복되는 관점

- **binding과 substitution (Binding and substitution)** — lambda, quantifier, declaration은 모두 이름의 scope와 capture avoidance를 정확히 다뤄야 한다.
  - EN: Lambdas, quantifiers, and declarations all require scope and capture avoidance.
- **compositionality (Compositionality)** — 전체 semantics를 직접 부분구절의 semantics에서 만들 수 있어야 언어 정의와 구현을 함께 확장할 수 있다.
  - EN: Language definitions scale when the meaning of a whole is built from the meanings of its parts.
- **recursion과 fixed point (Recursion and fixed points)** — 자기 참조 프로그램의 semantics를 유한 approximation의 limit와 least solution으로 구성한다.
  - EN: Self-referential programs receive meaning through limits of approximations and least solutions.
- **context와 observation (Context and observation)** — 같은 결과를 내는 것처럼 보여도 termination, failure, I/O, trace를 관찰하면 두 프로그램을 구별할 수 있다.
  - EN: Programs with the same apparent result may differ once termination, failure, I/O, or traces become observable.
- **control과 state (Control and state)** — continuation, resumption, store는 ‘다음에 할 일’과 ‘지금 기억하는 것’을 semantics 안에 드러낸다.
  - EN: Continuations, resumptions, and stores expose ‘what happens next’ and ‘what is remembered now’ inside meaning.
- **type과 representation independence (Types and representation independence)** — static rule은 잘못된 조합을 막고, abstract type은 client code가 구현 detail에 의존하지 못하게 한다.
  - EN: Static rules reject invalid combinations, while abstract types prevent clients from depending on representation details.

# 전체 장별 여정

### 1부 · 기초 · 명령형 semantics (Foundations · Imperative Semantics)

- [[chapter-01-predicate-logic|01. Predicate Logic]] — Four tools for describing languages
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

1. 먼저 이 개요에서 현재 장이 어떤 engineering problem을 설명하는지 찾는다. 처음부터 모든 수학 용어를 알 필요는 없다.
   - EN: First locate the engineering problem that the current chapter explains. You do not need to know every mathematical term in advance.
2. 영문 technical term은 번역할 단어가 아니라 검색과 토론에 쓸 label로 읽는다. 뜻은 바로 이어지는 한국어 설명과 예제로 확인한다.
   - EN: Treat each English technical term as a stable label for search and discussion; learn its meaning from the explanation and example that follow.
3. 장 페이지에서 concrete example → abstract syntax → semantics → proof 순서를 따라가며, 각 모델이 무엇을 관찰하고 무엇을 버리는지 묻는다.
   - EN: Follow the path concrete example → abstract syntax → semantics → proof, asking what each model observes and abstracts away.
4. checkpoint와 quiz를 책 없이 풀고, 막힌 개념만 원문 definition과 proof로 돌아가 확인한다.
   - EN: Answer checkpoints and quizzes without the book, then return to the original definitions and proofs only for weak concepts.

Every chapter page now contains a detailed section map, Korean-first explanation, English companion, precise takeaways, common-confusion notes, retrieval prompts, and original quizzes. The [[reynolds-theories-of-programming-languages|source page]] records the ingestion and copyright boundary.
