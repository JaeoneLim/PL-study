---
type: chapter
title: "11. 적극 함수형 언어"
title_en: "An Eager Functional Language"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "222–250"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-10-lambda-calculus]]"
  - "[[chapter-12-functional-continuations]]"
  - "[[chapter-13-iswim-like-languages]]"
---

# 11. 적극 함수형 언어 (An Eager Functional Language)

> [!abstract] 한눈에 보기
> 엄격 평가 함수형 언어를 concrete syntax과 평가 판단으로 정의하고, 정의·패턴·재귀·리스트·트리·direct semantics·동적 바인딩을 살핀다.
>
> **English:** A strict functional language is defined with concrete syntax and evaluation judgments, then extended with definitions, patterns, recursion, lists, trees, direct semantics, and dynamic binding.

## 학습 목표

- 큰 단계 평가 유도를 구성한다.
  - EN: Construct big-step evaluation derivations.
- 패턴 매칭과 재귀 정의의 환경 효과를 설명한다.
  - EN: Explain the environment effects of pattern matching and recursive definitions.
- 정적 바인딩과 동적 바인딩을 반례로 구분한다.
  - EN: Distinguish static and dynamic binding with a counterexample.

## 핵심 용어

- **evaluation semantics (evaluation semantics)**
- **클로저 (closure)**
- **패턴 매칭 (pattern matching)**
- **재귀 환경 (recursive environment)**
- **동적 바인딩 (dynamic binding)**

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### evaluation semantics

식이 여러 작은 단계를 거치는 대신 어떤 값으로 평가되는지를 직접 나타내는 판단 규칙 체계다. 환경과 식에서 시작해 값으로 끝나는 큰 단계 설명으로 자주 쓴다.

> [!example] 엔지니어 관점
> 조합 논리의 내부 gate 전파를 모두 기록하지 않고 입력 벡터와 안정된 출력값 사이의 관계만 적는 behavioral model과 비슷하다.

**English definition:** A system of judgment rules that directly relates an expression to the value it evaluates to, often as a big-step description from environment and expression to value.

> [!example] Engineering view
> It resembles a behavioral model that relates an input vector directly to the stable output without recording every internal gate-propagation step.

```text
ρ ⊢ e ⇓ v
```

### 클로저 (closure)

함수의 코드와 그 함수가 정의될 때 자유 변수 값을 찾을 환경을 함께 묶은 실행 값이다.

> [!example] 엔지니어 관점
> parameterized IP 인스턴스가 공통 RTL 본문뿐 아니라 자기 parameter 설정값도 함께 가져야 정확히 동작하는 것과 비슷하다. 코드만 복사하면 정의 당시 문맥을 잃는다.

**English definition:** A runtime value pairing function code with the environment used to resolve the function’s free variables when it was defined.

> [!example] Engineering view
> It resembles an instantiated parameterized IP needing both shared RTL and its own parameter settings. Copying only the code loses the context captured at definition time.

```text
⟨λx.e, ρ⟩
```

### 패턴 매칭 (pattern matching)

값의 constructor 모양을 검사하고 그 안의 구성 요소에 이름을 붙여 알맞은 분기를 선택하는 연산이다.

> [!example] 엔지니어 관점
> packet header의 opcode를 decode해 형식별 datapath로 보내고 field를 뽑는 것과 같다. 단순 비교를 넘어 구조 분해와 이름 연결을 함께 한다.

**English definition:** An operation that inspects a value’s constructor shape, binds names to its components, and selects the corresponding branch.

> [!example] Engineering view
> It is like decoding a packet opcode, routing to a format-specific datapath, and extracting fields. Pattern matching combines selection with structural unpacking and name binding.

### 재귀 환경 (recursive environment)

함수 이름이 자기 자신이나 같은 그룹의 다른 함수를 가리킬 수 있도록 고정점으로 묶인 환경이다.

> [!example] 엔지니어 관점
> 서로 연결된 FSM 블록의 symbolic name을 먼저 마련한 뒤 feedback 연결을 닫는 것과 비슷하다. 정의가 완성되기 전에 이름을 참조할 수 있어야 한다.

**English definition:** An environment tied as a fixed point so a function name can refer to itself or to other functions in the same recursive group.

> [!example] Engineering view
> It resembles allocating symbolic names for mutually connected FSM blocks before closing their feedback wiring. Names must be referable while the definitions are being completed.

### 동적 바인딩 (dynamic binding)

자유 변수의 값을 함수가 정의된 위치가 아니라 함수가 호출된 시점의 호출 환경에서 찾는 이름 해석 방식이다.

> [!example] 엔지니어 관점
> 고정된 module hierarchy의 parameter를 쓰는 대신 현재 debug context나 호출 stack에서 같은 이름의 설정을 찾아 쓰는 것에 가깝다. 호출자에 따라 함수 동작이 바뀔 수 있다.

**English definition:** A name-resolution strategy that looks up a function’s free variables in the caller’s environment at call time rather than where the function was defined.

> [!example] Engineering view
> It is closer to reading a same-named setting from the current debug context or call stack than using a fixed module-hierarchy parameter. Behavior may change with the caller.

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 람다 계산을 실제 프로그래밍에 가까운 적극 평가 언어로 확장하고, 환경·클로저·패턴·재귀의 평가와 표시적 의미를 비교한다.
>
> **English:** Extends lambda calculus into a practical eager language and compares evaluation and denotational accounts of environments, closures, patterns, and recursion.

### §11.1–11.2 · concrete syntax과 큰 단계 평가

표면 프로그램을 핵심 식으로 파싱하고, 환경 아래 식이 값으로 평가된다는 판단을 규칙으로 정의한다. 함수 값은 코드와 정의 환경을 묶은 클로저다.

**English — Concrete syntax and big-step evaluation:** Parses surface programs into core expressions and defines judgments that evaluate an expression to a value under an environment. Function values are closures pairing code with the defining environment.

### §11.3 · 정의, 패턴, 재귀

패턴 매칭은 값의 구조를 검사하며 성공 시 여러 이름을 동시에 바인딩한다. 상호 재귀 정의는 각 클로저가 자기 자신과 동료 정의를 볼 수 있는 재귀 환경을 만든다.

**English — Definitions, patterns, and recursion:** Pattern matching inspects value structure and binds multiple names on success. Mutually recursive definitions create an environment in which closures see themselves and their peers.

### §11.4–11.5 · 목록과 함수형 예제

목록 constructor와 패턴을 이용해 map, fold류 재귀 처리와 정렬·탐색 예제를 표현한다. 데이터 구조 재귀와 함수 재귀의 모양이 맞물린다.

**English — Lists and functional examples:** List constructors and patterns express recursive processing such as map- and fold-like functions, sorting, and search. Data recursion aligns with function recursion.

### §11.6 · 직접 표시적 의미

평가 규칙과 별도로 식을 환경에서 도메인 값으로 보내는 합성적 함수를 정의한다. 재귀 정의는 다시 환경 방정식의 최소 고정점이 된다.

**English — Direct denotational semantics:** Independently of the evaluation rules, a compositional function maps expressions and environments to domain values. Recursive definitions again become least fixed points of environment equations.

### §11.7 · 정적 바인딩과 동적 바인딩

정적 바인딩은 정의 환경을 클로저에 저장하고, 동적 바인딩은 호출 시점 환경에서 자유 변수를 찾는다. 같은 syntax이 호출 문맥에 따라 달라지는 이유를 비교한다.

**English — Static versus dynamic binding:** Static binding stores the defining environment in a closure; dynamic binding resolves free variables in the caller’s environment. The comparison shows how identical syntax can change meaning with call context.

## 반드시 남겨야 할 핵심

- 클로저는 렉시컬 스코프를 런타임 값으로 구현한다.
  - EN: Closures implement lexical scope as runtime values.
- evaluation semantics과 denotational semantics은 같은 언어를 다른 목적에 맞게 설명한다.
  - EN: Evaluation and denotational semantics describe the same language for different purposes.
- 재귀 환경은 자기 참조를 값 생성 이전에 연결해야 한다.
  - EN: Recursive environments must tie self-reference before the values are fully constructed.

> [!warning] 자주 생기는 혼동
> - 함수 본문의 자유 변수를 호출자 환경에서 찾으면 정적 바인딩이 아니다.
>   - EN: Resolving a function body’s free variables in the caller’s environment is not static binding.
> - 패턴 실패와 전체 프로그램 실패의 의미를 구분한다.
>   - EN: Distinguish failure of one pattern match from failure of the whole program.

## 1단계 — 구체 프로그램에서 값까지 — §11.1–11.2

큰 단계 판단은 환경에서 표현식이 어떤 값으로 평가되는지를 한 번에 연결한다.

적용은 연산자를 클로저로, 인수를 값으로 평가한 뒤 클로저가 저장한 정의 환경을 매개변수 바인딩으로 확장한다. 이 저장된 환경이 정적 범위를 구현한다.

> [!question] 책을 덮고 답해 보기
> 클로저에 코드뿐 아니라 환경이 필요한 예를 하나 들어라.

### English companion

A big-step judgment relates an expression in an environment directly to its resulting value.

Application evaluates the operator to a closure and the operand to a value, then extends the closure's saved definition environment with the parameter. The saved environment implements lexical scope.

---

## 2단계 — 정의, 패턴, 재귀의 매듭 — §11.3

패턴은 값을 여러 바인딩으로 분해하고, 재귀 정의는 함수가 자신을 포함한 환경을 보게 한다.

비재귀 정의는 우변을 먼저 평가한 뒤 환경을 확장한다. 재귀 정의는 클로저와 환경을 상호 참조하도록 고정점을 묶어야 하며, 실패하는 패턴은 평가 결과나 선택 규칙에 영향을 준다.

> [!question] 책을 덮고 답해 보기
> 재귀 함수의 클로저가 함수 이름 바인딩 전에 만들어지면 왜 자기 호출이 실패하는가?

### English companion

Patterns decompose a value into bindings, while recursive definitions let a function see an environment containing itself.

A nonrecursive definition evaluates its right side before extending the environment. A recursive definition ties a fixed-point knot between closure and environment; pattern failure affects evaluation or branch selection.

---

## 3단계 — 리스트와 트리로 재귀 연습 — §11.4–11.5

constructor와 패턴이 대수적 자료를 만들고 구조적 재귀가 그 자료를 소비한다.

map, reduce, append와 트리 순회는 기본 사례다. 종료 논증은 입력 자료의 구조가 작아지는지 확인하고, 축약 순서가 결합 법칙이나 결과에 미치는 영향도 구분한다.

> [!question] 책을 덮고 답해 보기
> 리스트 재귀에서 길이가 자연스러운 변량이 되는 이유는?

### English companion

Constructors and patterns build algebraic data, and structural recursion consumes it.

Map, reduce, append, and tree traversals are central examples. Termination follows when recursive calls consume structurally smaller data; fold direction can affect association and results.

---

## 4단계 — direct semantics과 바인딩 규율 — §11.6–11.7

direct denotational semantics은 평가 규칙과 같은 결과를 함수로 주며, 동적 바인딩은 호출 환경에서 자유 변수를 찾는다.

정적 바인딩은 이름변경과 지역 추론을 안정적으로 보존하지만, 동적 바인딩은 호출 경로가 자유 변수의 의미를 바꾼다. 그래서 단순한 α-이름변경조차 동작을 바꿀 수 있다.

> [!question] 책을 덮고 답해 보기
> 정의 위치와 호출 위치에서 x 값이 다를 때 두 바인딩 전략의 결과를 비교하라.

### English companion

Direct denotational semantics gives the same outcomes as functions; dynamic binding resolves free variables in the caller's environment.

Lexical binding preserves renaming and local reasoning; dynamic binding lets the call path change the meaning of free variables. Even alpha-renaming can then change behavior.

## 자체 점검 퀴즈

### Q1. 클로저가 저장하는 것은?

What does a closure store?

- A. 함수 코드와 정의 환경 / Function code and its definition environment
- B. 최종 출력만 / Only the final output
- C. 호출 횟수만 / Only a call count

> [!success]- 정답과 해설
> **A.** 자유 변수의 정적 바인딩을 보존한다.
>
> EN: It preserves lexical bindings of free variables.

### Q2. big-step semantics의 특징은?

What characterizes big-step semantics?

- A. 모든 중간 한 단계를 명시 / It lists every intermediate step
- B. 표현식과 최종 값을 직접 연결 / It directly relates an expression to its result
- C. 타입만 계산 / It computes only types

> [!success]- 정답과 해설
> **B.** 중간 전이를 추상화하고 최종 평가 관계를 정의한다.
>
> EN: It abstracts intermediate transitions into a direct evaluation relation.

### Q3. 동적 바인딩에서 자유 변수는 어디서 해석되는가?

Where is a free variable resolved under dynamic binding?

- A. 함수 정의 환경 / The function's definition environment
- B. 현재 호출 환경 / The current calling environment
- C. 전역 타입 표 / A global type table

> [!success]- 정답과 해설
> **B.** 호출 경로가 이름의 의미에 영향을 준다.
>
> EN: The call path affects the name's meaning.

## 다음 개념으로

함수 호출 뒤의 계산을 값처럼 조작하려면 평가기를 계속 전달 방식으로 바꿔야 한다. 이것이 다음 장의 주제다.

**English:** To manipulate what happens after a call as a value, the evaluator is transformed into continuation-passing form.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 222–250.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
