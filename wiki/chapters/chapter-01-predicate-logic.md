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
> 익숙한 술어 논리를 실험대로 삼아 abstract syntax, denotational semantics, 추론 규칙, 바인딩을 분리해 본다. 이 네 도구는 뒤의 모든 언어 정의에서 반복된다.
>
> **English:** Predicate logic is used as a familiar laboratory for separating abstract syntax, denotational semantics, inference rules, and binding. The same four tools recur throughout the book.

## 학습 목표

- 구체 표기와 abstract syntax 트리를 구분한다.
  - EN: Distinguish concrete notation from abstract syntax trees.
- 상태를 입력으로 받는 의미 함수로 식과 assertion을 해석한다.
  - EN: Interpret expressions and assertions as semantic functions of states.
- 자유 변수, 캡처 회피 치환, α-이름변경의 관계를 설명한다.
  - EN: Explain free variables, capture-avoiding substitution, and alpha-renaming.

## 핵심 용어

- **abstract syntax (abstract syntax)**
- **합성성 (compositionality)**
- **타당성 (validity)**
- **구조적 귀납법 (structural induction)**
- **캡처 회피 치환 (capture-avoiding substitution)**

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### 술어 논리 (predicate logic)

대상의 값과 관계를 변수, 논리 연산자, 그리고 ‘모든’·‘어떤’ 같은 수량자로 표현하는 논리 체계다. 명제가 한 비트의 참·거짓이라면, predicate는 입력값에 따라 참·거짓이 달라지는 조건이다.

> [!example] 엔지니어 관점
> SystemVerilog assertion에서 `req |-> ack`가 신호에 대한 조건을 쓰듯, `x < y`는 x와 y가 정해질 때 판정되는 조건이다. `∀x`는 가능한 모든 x를 검사한다는 수학적 표현이다.

**English definition:** A logic for expressing values and relationships with variables, logical connectives, and quantifiers such as “for every” and “there exists.” If a proposition is one true/false bit, a predicate is a condition whose bit depends on its inputs.

> [!example] Engineering view
> Like a SystemVerilog assertion such as `req |-> ack`, `x < y` states a condition on signals or values. The quantifier `∀x` says the condition must pass for every possible x.

```text
∀x. P(x)    ∃x. P(x)
```

### syntax

어떤 표현이 언어의 올바른 모양인지 정하는 규칙이다. 아직 그 표현이 무엇을 계산하는지는 말하지 않는다.

> [!example] 엔지니어 관점
> HDL 문법이 `always_ff` 블록의 허용 형태를 정하지만 실제 회로 동작은 별도로 정의되는 것과 같다. 파서가 받아들인다는 사실과 설계가 원하는 동작을 한다는 사실은 다르다.

**English definition:** The rules that determine which expressions are well-formed in a language. Syntax alone does not say what those expressions compute.

> [!example] Engineering view
> An HDL grammar determines the legal shape of an `always_ff` block, while circuit behavior is defined separately. Being accepted by a parser is not the same as behaving as intended.

### semantics

올바른 syntax에 정확한 의미를 부여하는 규칙 또는 수학적 함수다. 프로그램이 어떤 결과, 상태 변화, 또는 관찰 가능한 동작을 만드는지 설명한다.

> [!example] 엔지니어 관점
> RTL 텍스트가 주어졌을 때 시뮬레이터가 시간에 따른 신호 값을 정하는 규칙에 가깝다. 같은 syntax라도 선택한 semantics이 다르면 초기화나 동시 실행을 다르게 해석할 수 있다.

**English definition:** Rules or mathematical functions that assign precise meanings to well-formed syntax. They explain the result, state change, or observable behavior produced by a program.

> [!example] Engineering view
> Think of the rules a simulator uses to turn RTL into signal values over time. The same-looking syntax can behave differently under different semantic rules for initialization or concurrency.

```text
⟦syntax⟧ = meaning
```

### 상태 (state)

특정 순간에 각 변수에 저장된 값을 한꺼번에 나타낸 지도다. 식의 의미는 대개 상태를 입력받아 값을 내놓는 함수로 정의된다.

> [!example] 엔지니어 관점
> 한 클록 경계에서 레지스터 파일 전체를 찍은 스냅샷을 떠올리면 된다. `σ(x)=3`은 상태 σ에서 변수 x의 값이 3이라는 뜻이다.

**English definition:** A map containing the value stored in every variable at one instant. The meaning of an expression is often defined as a function from a state to a value.

> [!example] Engineering view
> Picture a snapshot of the complete register file at a clock boundary. `σ(x)=3` says that variable x contains 3 in state σ.

```text
σ : Variable → Value
```

### assertion

상태가 만족해야 하는 참·거짓 조건이다. 프로그램 명령이 아니라 프로그램이나 상태에 관해 우리가 확인하려는 주장이다.

> [!example] 엔지니어 관점
> `fifo_count <= DEPTH` 같은 설계 속성에 해당한다. assertion 자체가 FIFO를 제어하지는 않지만, 현재 상태가 안전 조건을 지키는지 판정한다.

**English definition:** A true-or-false condition that a state may satisfy. It is a claim about a program or state, not a command executed by the program.

> [!example] Engineering view
> It corresponds to a design property such as `fifo_count <= DEPTH`. The assertion does not control the FIFO; it checks whether the current state obeys a safety condition.

### abstract syntax

괄호, 공백, 우선순위처럼 표기에만 필요한 부분을 버리고 표현의 실제 트리 구조만 남긴 것이다.

> [!example] 엔지니어 관점
> 회로도에서 선의 색이나 블록 배치를 지우고 인스턴스와 연결 관계만 남긴 netlist와 비슷하다. `x+y*z`는 Add(x, Mul(y,z))라는 구조로 보존된다.

**English definition:** The tree structure of an expression after discarding notational details such as parentheses, whitespace, and precedence conventions.

> [!example] Engineering view
> It resembles a netlist that keeps instances and connectivity while discarding drawing layout and wire colors. `x+y*z` becomes the structure Add(x, Mul(y,z)).

### constructor

abstract syntax 트리에서 한 종류의 노드를 만드는 기본 형식이다. 상수, 덧셈, 수량자 등이 각각 constructor가 된다.

> [!example] 엔지니어 관점
> netlist의 AND 게이트나 플립플롭 셀 종류처럼, constructor는 노드가 무엇이며 몇 개의 하위 부품을 받는지 정한다. Add는 두 하위 식을 받는다.

**English definition:** A basic form that creates one kind of node in an abstract syntax tree. Constants, addition, and quantification are examples of constructors.

> [!example] Engineering view
> Like AND-gate or flip-flop cell kinds in a netlist, a constructor determines what a node is and how many children it takes. Add takes two subexpressions.

### 합성성 (compositionality)

전체 표현의 의미가 바로 아래 부분 표현들의 의미와 현재 constructor만으로 결정되는 성질이다.

> [!example] 엔지니어 관점
> 계층형 하드웨어 검증에서 각 IP 블록의 계약과 연결만으로 상위 모듈 동작을 설명하는 방식과 닮았다. 내부 소스 문자열을 다시 들여다볼 필요가 없어야 한다.

**English definition:** The property that the meaning of a whole expression is determined solely by its constructor and the meanings of its immediate parts.

> [!example] Engineering view
> It resembles hierarchical hardware verification: explain a top module from each IP block’s contract and the wiring between them, without reopening their source text.

### 타당성 (validity)

assertion이 특정 상태 하나가 아니라 고려하는 모든 상태에서 참인 성질이다. ‘증명 규칙으로 증명했다’는 유도 가능성과는 별개의 semantic 개념이다.

> [!example] 엔지니어 관점
> 테스트 벡터 몇 개가 통과한 것이 아니라 모든 합법적인 입력과 상태에서 속성이 성립한다는 요구와 같다. 형식 검증은 이 전칭 요구를 다룬다.

**English definition:** The property that an assertion is true in every state under consideration, not merely one state. It is a semantic notion distinct from derivability by proof rules.

> [!example] Engineering view
> It is the demand that a property hold for all legal inputs and states, rather than just passing a few test vectors. Formal verification targets this universal claim.

```text
⊨ P
```

### 구조적 귀납법 (structural induction)

숫자의 크기가 아니라 syntax 트리가 만들어지는 방식에 따라 성질을 증명한다. 각 기본 constructor와 각 재귀 constructor를 처리하면 모든 유한 트리를 다룬다.

> [!example] 엔지니어 관점
> 모든 계층형 설계에 대한 속성을 보이기 위해 leaf 셀을 확인하고, 속성을 만족하는 하위 모듈을 조합한 상위 모듈도 만족함을 확인하는 패턴과 같다.

**English definition:** A proof method that follows how syntax trees are built rather than the size of a number. Cover every base constructor and every recursive constructor to cover all finite trees.

> [!example] Engineering view
> It is like proving a property for every hierarchical design by checking leaf cells and then checking that each composition preserves the property when its submodules have it.

### 캡처 회피 치환 (capture-avoiding substitution)

자유 변수를 다른 식으로 바꿀 때 새 식의 자유 이름이 주변 바인더에 우연히 묶이지 않도록 먼저 충돌하는 이름을 바꾸는 치환이다.

> [!example] 엔지니어 관점
> 계층을 평탄화할 때 서로 다른 모듈의 내부 신호 이름이 충돌하지 않도록 신호를 고유하게 바꾸는 것과 비슷하다. 텍스트만 복사하면 연결 대상이 달라질 수 있다.

**English definition:** Substitution that first renames conflicting binders so that free names in the inserted expression do not accidentally become bound.

> [!example] Engineering view
> It resembles uniquely renaming internal signals while flattening hierarchy so names from different modules do not collide. Blind textual copying can silently change connectivity.

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 이후 모든 장에서 사용할 세 가지 층위—syntax, 의미, 증명—를 분리하고 다시 연결하는 법을 세운다.
>
> **English:** Establishes how to separate and reconnect the three layers used throughout the book: syntax, semantics, and proof.

### §1.1 · abstract syntax과 구조적 정의

논리식의 표면 표기 대신 항과 공식의 constructor를 정의한다. 이 구조는 재귀 함수와 구조적 귀납법의 기준이 된다.

**English — Abstract syntax and structural definition:** Defines constructors for terms and formulas independently of surface notation. That structure supports recursive functions and structural induction.

### §1.2 · 환경을 통한 표시적 의미

변수 환경과 기호 해석을 입력으로 받아 항은 값으로, 공식은 진릿값으로 보낸다. 의미 함수의 각 절은 syntax constructor에 대응한다.

**English — Denotational meaning through environments:** Given a variable environment and an interpretation of symbols, terms denote values and formulas denote truth values. Each semantic clause follows a syntax constructor.

### §1.3 · 타당성과 추론

한 해석에서 참인 것, 모든 환경에서 참인 것, 모든 해석에서 타당한 것을 구분한다. 추론 규칙은 전제가 참일 때 결론도 참이라는 건전성 기준으로 평가한다.

**English — Validity and inference:** Distinguishes truth in one interpretation, truth under every environment, and validity across interpretations. Inference rules are judged by sound preservation of truth.

### §1.4 · 바인딩, 이름 변경, 치환

자유·결박 변수를 정의하고 캡처 회피 치환을 구성한다. 대입 보조정리는 syntactic substitution과 환경 갱신이 같은 의미 효과를 낸다는 연결 고리다.

**English — Binding, renaming, and substitution:** Defines free and bound variables and constructs capture-avoiding substitution. The substitution lemma connects syntactic replacement with semantic environment update.

## 반드시 남겨야 할 핵심

- abstract syntax은 파싱 결과이며, 의미와 증명은 그 트리 위에서 재귀적으로 정의된다.
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

# 1장 완전 학습 본문 (60분 읽기)

이 본문은 교재 1장의 순서를 따라가되 문장을 옮겨 적는 번역본이 아니라, 정의가 왜 필요한지부터 계산과 증명에 어떻게 쓰이는지까지 독립적으로 풀어 쓴 학습 해설이다. 앞의 절을 이해해야 뒤의 절이 자연스럽게 이어지므로 처음 읽을 때는 순서대로 진행하는 편이 좋다.

1장의 목적은 술어 논리 자체를 깊이 공부하는 데만 있지 않다. 익숙한 논리를 실험대로 삼아 언어 이론의 네 도구, 곧 abstract syntax·denotational semantics·추론 규칙·바인딩을 정확히 분리하는 것이 핵심이다. 2장 이후에는 대상 언어만 바뀌고 이 네 질문이 계속 돌아온다. 어떤 syntax을 허용하는가, 그 syntax은 무엇을 뜻하는가, 어떤 주장을 규칙으로 증명할 수 있는가, 이름의 범위와 치환은 의미를 어떻게 보존하는가를 묻는 습관이 이 장의 진짜 성과다.

스터디에서 함께 말하고 검색할 때 표현이 어긋나지 않도록 syntax, semantics, statement, assertion, constructor는 한국어로 옮기지 않고 영문 표기를 유지한다. 파생 표현도 abstract syntax, denotational semantics, syntax-directed처럼 해당 분야에서 통용되는 영문 형태를 쓴다.

> [!info] English introduction
> This is an independently written study explanation that follows the conceptual order of Chapter 1. Rather than reproducing the textbook, it develops why each definition is needed and how it is used in calculations and proofs. The sections are cumulative, so a first reading should proceed in order.
>
> The goal is not merely to review predicate logic. A familiar logic serves as a laboratory for four tools—abstract syntax, denotational semantics, inference rules, and binding. Later chapters change the object language but repeatedly ask the same questions: which phrases exist, what they mean, what can be proved by rules, and how scope and substitution preserve meaning.
>
> To keep discussion and search vocabulary consistent across the study group, the Korean edition preserves syntax, semantics, statement, assertion, and constructor in English, including standard compounds such as abstract syntax, denotational semantics, and syntax-directed.

## 01. 왜 프로그래밍 언어 책이 술어 논리로 시작하는가 — 도입 · pp. 1 · 4분

> [!abstract] 이 절의 중심
> 낯선 방법을 익숙한 대상에 먼저 적용하면 방법 자체를 선명하게 볼 수 있다.

프로그래밍 언어를 엄밀하게 설명하려면 소스 코드를 읽는 직관만으로는 부족하다. 같은 프로그램도 표면 표기, 파싱된 구조, 수학적 의미, 실행 규칙, 증명 체계라는 여러 층에서 볼 수 있기 때문이다. 이 층들을 한꺼번에 다루면 괄호를 어디에 붙이는 문제와 프로그램이 무엇을 계산하는 문제, 계산이 옳다는 것을 어떻게 보이는 문제가 뒤섞인다. 1장은 이들을 의도적으로 분리한 다음 서로 연결한다.

술어 논리는 이 작업에 알맞은 첫 대상이다. 첫째, 정수식과 논리식은 이미 익숙하므로 새 표기보다 설명 방법에 집중할 수 있다. 둘째, 이 장의 논리식은 언제나 정수나 진릿값을 내므로 비종료와 부분 정보라는 어려움을 잠시 미룰 수 있다. 셋째, 3장에서 명령형 프로그램의 사전조건과 사후조건을 바로 이 assertion language로 적게 된다. 따라서 1장은 예비 지식이면서 동시에 이후 증명 체계의 실제 부품이다.

이 책의 용어는 전통 논리학과 조금 다르다. 논리학의 항(term)은 정수식(integer expression), 잘 형성된 공식은 assertion, 변수에 값을 배정하는 assignment는 상태(state)라고 부른다. 이런 명칭은 곧 등장할 프로그래밍 언어와 어휘를 맞추려는 선택이다. 여기서 상태는 프로그램 메모리를 아직 뜻하지 않고, 각 변수 이름에 정수 하나를 대응시키는 함수다.

### 앞으로 모든 언어에 던질 네 질문

- syntax: 어떤 종류의 구절이 있으며 어떤 constructor로 만들어지는가?
- semantics: 각 구절은 어떤 수학적 대상을 나타내는가?
- 증명: 어떤 형식의 판단을 어떤 규칙으로 유도할 수 있는가?
- 바인딩: 이름을 묶는 syntax은 범위·자유 변수·치환을 어떻게 바꾸는가?

> [!tip] 읽는 관점
> 이 장에서 나오는 정의를 논리학 상식의 반복으로 넘기지 말자. 각각은 뒤에서 명령, 함수, 타입, 모듈을 설명할 때 그대로 재사용되는 설계 패턴이다. 특히 ‘syntax을 먼저 정하고, 그 구조를 따라 의미 함수를 정의한다’는 순서는 책 전체의 뼈대다.

> [!question] 이 절을 덮고 확인하기
> 1. 술어 논리에서는 당장 다루지 않아도 되지만 2장에서 반드시 추가해야 하는 계산 현상은 무엇인가?
> 2. 전통 논리학의 term, formula, assignment를 이 책은 각각 무엇이라 부르는가?

### English companion — Why a programming-languages book begins with predicate logic

*Applying unfamiliar methods to a familiar object makes the methods themselves easier to see.*

A rigorous account of a programming language needs more than intuition about source code. The same program has surface notation, parsed structure, mathematical meaning, execution rules, and a proof system. Chapter 1 deliberately separates these layers and then reconnects them.

Predicate logic is a good first object for three reasons. Its arithmetic and logical notation are familiar; every expression receives an ordinary value, postponing divergence and partial information; and the assertion language becomes the specification language for imperative programs in Chapter 3.

The terminology is chosen to align logic with later programming languages: terms become integer expressions, formulas become assertions, and assignments of values to variables become states. At this point a state is simply a function from variable names to integers, not yet a machine store.

### Four questions to ask of every later language

- Syntax: What kinds of phrases exist, and which constructors build them?
- Semantics: What mathematical object does each phrase denote?
- Proof: What judgments can be derived, and by which rules?
- Binding: How do binders affect scope, free variables, and substitution?

> [!tip] Reading lens
> Do not treat the definitions as a review of elementary logic. Each is a design pattern reused for commands, functions, types, and modules. The sequence ‘define syntax, then follow that structure when defining meaning’ is the spine of the book.

> [!question] Retrieval check
> 1. Which computational phenomenon can be postponed in predicate logic but must be added in Chapter 2?
> 2. What names does this book use for term, formula, and assignment?

---

## 02. 문자열과 syntax structure를 분리하기 — §1.1 · pp. 1–3 · 6분

> [!abstract] 이 절의 중심
> 프로그램은 문자로 입력되지만 의미가 붙는 대상은 문자 배열이 아니라 파싱된 syntax structure다.

자연수 12는 문자 ‘1’과 ‘2’의 연결 그 자체가 아니다. 십진 문자열, 이진 문자열, 로마 숫자는 같은 수를 서로 다르게 나타낸다. 마찬가지로 `x + y`, `add(x,y)`, 루트가 `+`인 트리는 하나의 덧셈 구조를 다른 방식으로 표현한다. 의미 함수를 문자 위치와 괄호 개수에 맞추어 정의하면 표현을 바꿀 때마다 semantics도 다시 써야 한다. 그래서 semantics의 입력은 구체 문자열이 아니라 추상 구절이어야 한다.

보통의 문맥 자유 문법은 어떤 문자열이 허용되는지 말하는 데 훌륭하지만, syntax structure와 표기상의 선택을 함께 적는다. 변수의 철자, 연산자가 앞에 오는지 가운데 오는지, 우선순위와 결합 방향은 파서에는 중요해도 덧셈이라는 구성의 본질은 아니다. 추상 문법은 비단말 기호와 부분구절의 배열로 구조를 드러내면서도, 사람이 읽을 최소한의 표기를 곁들인 절충 형식이다.

### 1장에서 사용하는 핵심 구절 종류

```text
intexp e ::= n | v | -e | e + e | e - e | e × e | e ÷ e | e rem e
assert p ::= true | false
           | e = e | e ≠ e | e < e | e ≤ e | e > e | e ≥ e
           | ¬p | p ∧ p | p ∨ p | p ⇒ p | p ⇔ p
           | ∀v. p | ∃v. p
```

`var`는 별도 생성 규칙으로 만드는 구절이 아니라 미리 주어진 셀 수 있는 무한 집합이다. 정수 상수도 실제 구현에서는 자연수 하나를 받는 상수 constructor로 묶을 수 있다. 문법의 각 선택지는 뒤에서 하나의 constructor와 하나의 의미 방정식에 대응한다.

추상 문법을 읽을 때 터미널과 메타변수를 구분해야 한다. 위 문법의 `+`, `∀`, 마침표는 표기 패턴을 이루는 기호이고, `e`, `p`, `v`는 그 자리에 올 부분구절의 종류를 가리킨다. 같은 왼쪽 종류를 만드는 서로 다른 생산 규칙은 터미널 패턴이나 부분구절 개수가 달라야 한다. 그래야 완전히 괄호 친 표현을 보았을 때 어느 생성 규칙을 썼는지 유일하게 복구할 수 있다.

실제로 글을 쓸 때 모든 부분구절에 괄호를 붙이지는 않는다. 그래서 우선순위와 왼쪽/오른쪽 결합 규칙이 구체 표기의 보조 장치로 필요하다. 하지만 이 규칙은 abstract syntax이 아니라 문자열을 트리로 읽기 위한 파싱 약속이다. `x + y × z`가 `x + (y × z)`로 파싱되고 나면 semantics은 곱셈이 높은 우선순위였다는 사실을 더 이상 알 필요가 없다.

수량자의 본문 범위는 특히 주의해야 한다. `∀x. p`의 본문은 정해진 멈춤 기호나 둘러싼 구절의 끝까지 뻗는다. 따라서 표면 문자열만 보고 범위를 추측하지 말고 먼저 괄호를 복원해야 한다. 뒤의 언어에서는 `do`, `else`, `in`, 쉼표 같은 기호도 이런 범위를 멈추는 역할을 한다. 범위 규칙은 바인딩을 결정하므로 단순한 인쇄 취향이 아니다.

> [!example] 표면 표기에서 constructor 트리로
> `x + y × z < 10 ∧ ¬(x = 0)`을 구조로 읽어 보자.
>
> 1. 곱셈이 덧셈보다 먼저 묶이므로 왼쪽 정수식은 `x + (y × z)`다.
> 2. 관계 연산 `<`가 두 정수식을 받아 assertion `x + (y × z) < 10`을 만든다.
> 3. `¬`가 등식 assertion `x = 0`을 감싸고, 마지막으로 `∧`가 두 assertion을 결합한다.
> 4. constructor expression으로는 대략 `C∧(C<(C+(Cvar(x), C×(Cvar(y), Cvar(z))), C10), C¬(C=(Cvar(x), C0)))`이다.
>
> **결론:** 이 트리가 확정된 뒤에는 중위 표기나 우선순위가 달라져도 같은 abstract syntax을 가리킬 수 있다.

> [!warning] BNF를 AST로 착각하지 않기
> 문법에 `e + e`라고 적혀 있다는 사실은 `+` 문자가 추상 구절 안에 저장된다는 뜻이 아니다. 추상 구절에는 ‘두 정수식으로 덧셈을 구성했다’는 정보만 있으면 된다. 괄호와 우선순위는 파싱 과정에서 할 일을 마친다.

> [!question] 이 절을 덮고 확인하기
> 1. `¬x = 0 ∨ y < 3`에 필요한 괄호를 모두 복원하고 가장 바깥 constructor를 말해 보라.
> 2. 연산자 우선순위가 semantics이 아니라 concrete syntax의 문제인 이유를 설명하라.

### English companion — Separating strings from syntactic structure

*Programs arrive as characters, but semantics is assigned to parsed syntactic structure rather than raw strings.*

The natural number twelve is not identical to the characters ‘1’ and ‘2’; decimal, binary, and Roman notation can represent the same number. Likewise, `x + y`, `add(x,y)`, and a tree rooted at `+` can represent one addition structure. Semantic functions should consume abstract phrases rather than character positions and parentheses.

A context-free grammar is excellent for recognizing strings but mixes structural information with representational choices: spelling, prefix versus infix notation, precedence, and associativity. An abstract grammar keeps the sorts and subphrase pattern while retaining only enough notation to remain readable.

### Core phrase classes in Chapter 1

```text
intexp e ::= n | v | -e | e + e | e - e | e × e | e ÷ e | e rem e
assert p ::= true | false
           | e = e | e ≠ e | e < e | e ≤ e | e > e | e ≥ e
           | ¬p | p ∧ p | p ∨ p | p ⇒ p | p ⇔ p
           | ∀v. p | ∃v. p
```

Variables form a predefined countably infinite set rather than being generated by productions. An implementation may combine the integer constants into one constructor taking a natural number. Each grammatical alternative will correspond to a constructor and a semantic equation.

The terminal pattern must be distinguished from metavariables for subphrases. Alternatives producing the same sort need distinguishable terminal patterns or arities, so a fully parenthesized representation can be decoded into a unique constructor application.

Precedence and associativity are parsing conventions for convenient surface notation. Once `x + y × z` has been parsed as `x + (y × z)`, semantics need not remember why that tree was selected.

Quantifier bodies extend to a stopping symbol or the end of the enclosing phrase. Scope should be recovered during parsing rather than guessed from typography. Later languages introduce additional stopping symbols such as `do`, `else`, `in`, and commas.

> [!example] From surface notation to a constructor tree
> Parse `x + y × z < 10 ∧ ¬(x = 0)` structurally.
>
> 1. Multiplication binds before addition, giving `x + (y × z)`.
> 2. The relation `<` consumes two integer expressions and produces an assertion.
> 3. Negation wraps `x = 0`, and conjunction combines the two assertions.
> 4. A constructor expression is roughly `C∧(C<(C+(Cvar(x), C×(Cvar(y), Cvar(z))), C10), C¬(C=(Cvar(x), C0)))`.
>
> **Conclusion:** Once the tree is fixed, different infix or prefix notations may still represent the same abstract phrase.

> [!warning] Do not confuse BNF with the AST
> Writing `e + e` in a grammar does not imply that the `+` character is stored inside the abstract phrase. The AST only needs to record that an addition constructor was applied to two integer-expression children.

> [!question] Retrieval check
> 1. Fully parenthesize `¬x = 0 ∨ y < 3` and identify the outermost constructor.
> 2. Explain why precedence belongs to concrete syntax rather than semantics.

---

## 03. 운반집합·constructor·초기 대수 — §1.1 · pp. 3–8 · 7분

> [!abstract] 이 절의 중심
> abstract syntax은 특정 트리 구현이 아니라, 어떤 올바른 구현도 만족해야 하는 구조적 계약이다.

syntax을 진짜로 추상화하려면 ‘구절은 트리다’라고 특정 자료구조까지 고정해서는 안 된다. 대신 각 구절 종류에 운반집합(carrier)을 두고, 생산 규칙마다 운반집합 사이의 constructor 함수를 둔다. 이 장에는 변수 집합 `Var`, 정수식 집합 `IntExp`, assertion 집합 `Assert`가 있다. 예를 들어 변수 constructor는 `Cvar : Var → IntExp`, 덧셈 constructor는 `C+ : IntExp × IntExp → IntExp`, 전칭 수량자 constructor는 `C∀ : Var × Assert → Assert`의 형식을 가진다.

상수처럼 자식이 없는 constructor는 빈 곱, 즉 원소가 하나뿐인 집합에서 운반집합으로 가는 함수로 볼 수 있다. `C0 : 1 → IntExp`라고 쓰면 `C0()`이 상수 0 구절이다. 구현 언어에서는 보통 `Const(0)`처럼 정수 하나를 받는 constructor로 모든 상수를 합치지만, 수학적 구조는 동일하다. constructor의 인자 수와 인자 종류가 구절의 직접 부분구절을 정확히 정한다.

### 올바른 abstract syntax 구현이 만족해야 할 세 조건

- 단사성: 같은 constructor의 결과가 같으면 각 인자도 같아야 한다. `C+(e₀,e₁)=C+(e₂,e₃)`이면 `e₀=e₂`, `e₁=e₃`이다.
- 서로소 치역: 같은 운반집합으로 들어가는 서로 다른 constructor의 결과는 겹치지 않는다. 덧셈 구절이 동시에 곱셈 구절일 수 없다.
- 유한 생성: 미리 주어진 집합의 원소를 제외한 모든 구절은 constructor를 유한 번 적용해 만들어져야 한다. 무한 깊이의 유령 구절은 허용하지 않는다.

첫 두 조건은 구절을 분해할 수 있게 한다. 어떤 assertion이 `p₀ ∧ p₁` 꼴이라면 최상위 constructor가 논리곱이라는 사실과 두 직접 sub-assertion `p₀`, `p₁`이 유일하다. 따라서 ‘구절의 모양에 따른 경우 분석’이 가능하다. 세 번째 조건은 이 분해를 반복하면 반드시 바닥의 상수나 변수에 도착함을 보장한다. 재귀 함수 정의와 구조적 귀납 증명이 바로 이 성질에 기대고 있다.

유한 생성을 더 엄밀히 말하려면 깊이별 근사를 만든다. 깊이 0에는 아무 구절도 두지 않고, 깊이 `j+1`에는 깊이 `j` 이하의 구절들을 인자로 constructor를 한 번 적용해 얻는 구절을 넣는다. 모든 유한 깊이 집합의 합집합이 전체 운반집합이다. 이 정의는 2장에서 반복문의 의미를 근사하고 최소 고정점을 취하는 방식과 같은 모양을 갖는다. syntax 자체도 ‘생성 방정식의 최소 해’로 이해할 수 있다.

### 깊이 근사로 보는 정수식

```text
IntExp⁽⁰⁾ = ∅
IntExp⁽ʲ⁺¹⁾ = { Cₙ() | n ∈ ℕ }
              ∪ { Cvar(v) | v ∈ Var }
              ∪ { C−(e) | e ∈ IntExp⁽ʲ⁾ }
              ∪ { C+(e₀,e₁), … | e₀,e₁ ∈ IntExp⁽ʲ⁾ }
IntExp = ⋃ⱼ≥0 IntExp⁽ʲ⁾
```

각 단계는 이전 단계에서 만들 수 있던 구절보다 한 층 더 깊은 구절을 허용한다. 합집합은 임의로 깊지만 언제나 유한한 구절만 포함한다.

> [!example] 하나의 abstract syntax, 여러 실현
> 구조 `(0 - 1) + (-2)`를 세 방식으로 실현해 보자.
>
> 1. 완전 괄호 중위 문자열: `((0) - (1)) + (-(2))`
> 2. 접두 함수 문자열: `add(subtract(0,1), negate(2))`
> 3. syntax tree: 루트 `+`, 왼쪽 자식은 루트 `-binary`와 잎 0·1, 오른쪽 자식은 루트 `-unary`와 잎 2
> 4. 대수적 자료형 값: `Plus(Sub(Const(0), Const(1)), Neg(Const(2)))`
>
> **결론:** 표현은 다르지만 각 constructor의 단사성, 서로소 치역, 유한 생성이라는 같은 계약을 만족하므로 이후 의미 정의와 증명을 공유한다.

> [!abstract] 초기 대수라는 말의 직관
> abstract syntax은 constructor가 요구하는 것 외에는 아무것도 추가하지 않은 가장 자유로운 대수다. constructor 방정식을 만족하는 어떤 목표 대수를 주어도, 각 syntax을 그 대수의 값으로 보내는 구조 보존 함수가 정확히 하나 존재한다. 다음 절의 의미 함수가 유일하게 정해지는 이유를 이 한 문장이 압축한다.

> [!warning] ‘트리’도 하나의 표현이다
> 그림으로 그린 트리가 abstract syntax 그 자체라고 말하면 편리하지만 엄밀히는 트리도 하나의 실현이다. 핵심은 노드의 메모리 배치나 라벨 철자가 아니라 constructor를 유일하게 분해할 수 있는 구조다. 이 구분 덕분에 컴파일러 AST, 증명 보조기의 귀납 자료형, 종이 위의 constructor expression이 같은 이론을 공유한다.

> [!question] 이 절을 덮고 확인하기
> 1. constructor의 단사성과 서로소 치역이 각각 어떤 종류의 모호성을 막는지 구분해서 설명하라.
> 2. 유한 생성 조건이 없으면 구조적 귀납법이 왜 정당화되지 않는가?
> 3. 대수적 자료형의 각 variant가 추상 문법의 무엇에 대응하는가?

### English companion — Carriers, constructors, and the initial-algebra view

*Abstract syntax is a structural contract satisfied by any correct representation, not one privileged tree implementation.*

A genuinely abstract syntax does not commit to one tree data structure. It specifies a carrier for each phrase sort and a constructor function for each production. Here we have `Var`, `IntExp`, and `Assert`, with constructors such as `Cvar : Var → IntExp`, `C+ : IntExp × IntExp → IntExp`, and `C∀ : Var × Assert → Assert`.

A nullary constructor can be viewed as a function from the one-element set into a carrier. Implementations often combine all numeric constants into `Const(n)`, but the structural role is the same: constructor arity and argument sorts determine the immediate subphrases.

### Three conditions for a realization of abstract syntax

- Injectivity: equal results of one constructor imply equal corresponding arguments.
- Disjoint ranges: distinct constructors into one carrier never produce the same phrase.
- Finite generation: every non-predefined phrase is built by finitely many constructor applications; no infinitely deep phantom phrases are included.

The first two conditions make decomposition unique: if an assertion has the form `p₀ ∧ p₁`, its outer constructor and two children are uniquely determined. Finite generation guarantees that repeated decomposition reaches constants or variables. Recursive definitions and structural induction rely on exactly these facts.

Finite generation can be formalized by depth approximants. Start with no phrases at depth zero; at stage `j+1`, apply constructors to phrases available by stage `j`; take the union of all finite stages. This mirrors the least-fixed-point construction used for loops in Chapter 2.

### Integer expressions as depth approximants

```text
IntExp⁽⁰⁾ = ∅
IntExp⁽ʲ⁺¹⁾ = { Cₙ() | n ∈ ℕ }
              ∪ { Cvar(v) | v ∈ Var }
              ∪ { C−(e) | e ∈ IntExp⁽ʲ⁾ }
              ∪ { C+(e₀,e₁), … | e₀,e₁ ∈ IntExp⁽ʲ⁾ }
IntExp = ⋃ⱼ≥0 IntExp⁽ʲ⁾
```

Each stage permits one more constructor layer than the preceding stage. The union contains phrases of arbitrary but always finite depth.

> [!example] One abstract syntax, several realizations
> Realize the structure `(0 - 1) + (-2)` in three ways.
>
> 1. Fully parenthesized infix string: `((0) - (1)) + (-(2))`.
> 2. Prefix functional string: `add(subtract(0,1), negate(2))`.
> 3. Syntax tree: root `+`; a binary-minus subtree over 0 and 1; a unary-minus subtree over 2.
> 4. Algebraic-data-type value: `Plus(Sub(Const(0), Const(1)), Neg(Const(2)))`.
>
> **Conclusion:** The representations differ, but each satisfies injectivity, disjointness, and finite generation, so one semantic definition and proof discipline applies to all of them.

> [!abstract] Intuition for ‘initial algebra’
> Abstract syntax is the freely generated algebra containing nothing beyond what constructors require. For any target algebra interpreting those constructors, there is exactly one structure-preserving map from syntax to that target. This is the algebraic reason the next section's semantic function is unique.

> [!warning] Even ‘tree’ is a representation
> A drawn tree is a convenient realization, not the essence of abstract syntax. What matters is unique decomposition by constructors, allowing compiler ASTs, inductive datatypes, and paper notation to share the same theory.

> [!question] Retrieval check
> 1. Explain which ambiguity is prevented by constructor injectivity and which by disjoint ranges.
> 2. Why would structural induction fail without finite generation?
> 3. What does each variant of an algebraic datatype correspond to in an abstract grammar?

---

## 04. 상태를 입력으로 받는 표시적 의미 — §1.2 · pp. 8–10 · 7분

> [!abstract] 이 절의 중심
> 자유 변수가 있는 식의 의미는 정수 하나가 아니라, 상태가 주어질 때 정수를 돌려주는 함수다.

닫힌 식 `2 + 3`은 상태와 무관하게 5를 낸다. 반면 `x + 3`의 값은 `x`가 무엇인지 알아야 정해진다. 그러므로 모든 정수식에 같은 종류의 의미를 주려면 의미를 `상태 → 정수` 함수로 잡아야 한다. assertion도 같은 이유로 `상태 → 진릿값` 함수가 된다. 상태 집합을 `Σ = Var → ℤ`, 진릿값 집합을 `𝔹 = {true,false}`라 두면 의미 함수의 형식이 선명해진다.

denotational semantics은 syntax을 이미 이해한다고 가정하고 그 syntax이 나타내는 수학적 대상을 지정한다. 이 장에서 정수식의 의미 대상은 `Σ → ℤ`, assertion의 의미 대상은 `Σ → 𝔹`이다. 의미 괄호 `⟦e⟧exp σ`는 상태 `σ`에서 식 `e`의 값을, `⟦p⟧assert σ`는 같은 상태에서 assertion `p`의 진릿값을 뜻한다. 괄호 안은 대상 언어, 괄호 밖 계산은 메타언어에 속한다.

### 의미 함수와 상태 갱신

```text
⟦·⟧exp    : IntExp → (Σ → ℤ)
⟦·⟧assert : Assert → (Σ → 𝔹)
Σ = Var → ℤ
[σ | v : n](v) = n
[σ | v : n](w) = σ(w)    when w ≠ v
```

`[σ | v : n]`은 `v`에만 새 값 `n`을 주고 나머지 변수에는 `σ`와 같은 값을 주는 상태다. 수량자의 의미에서 묶인 변수의 가능한 값을 하나씩 시험할 때 쓰인다.

### syntax constructor를 따라가는 핵심 의미 방정식

- 상수: `⟦n⟧exp σ = n`. 상태를 받지만 사용하지 않는다.
- 변수: `⟦v⟧exp σ = σ(v)`. 변수의 의미는 현재 상태에서 조회한다.
- 단항·이항 산술: `⟦-e⟧exp σ = -⟦e⟧exp σ`, `⟦e₀+e₁⟧exp σ = ⟦e₀⟧exp σ + ⟦e₁⟧exp σ`.
- 관계: `⟦e₀<e₁⟧assert σ = (⟦e₀⟧exp σ < ⟦e₁⟧exp σ)`.
- 논리 연결사: `⟦p₀∧p₁⟧assert σ = ⟦p₀⟧assert σ ∧ ⟦p₁⟧assert σ`이며 다른 연결사도 같은 모양이다.
- 수량자: `⟦∀v.p⟧assert σ = true` iff 모든 `n∈ℤ`에 대해 `⟦p⟧assert[σ|v:n]=true`다. `∃`는 적어도 한 `n`을 요구한다.

> [!example] 의미 방정식으로 실제 계산하기
> `σ(x)=3`, `σ(y)=7`일 때 `(x + 2 < y) ∧ ¬(x = 0)`을 계산한다.
>
> 1. `⟦x+2⟧exp σ = σ(x)+2 = 5`이고 `⟦y⟧exp σ = 7`이다.
> 2. 따라서 `⟦x+2<y⟧assert σ = (5<7) = true`다.
> 3. `⟦x=0⟧assert σ = (3=0)=false`, 그러므로 부정은 `true`다.
> 4. 마지막 논리곱은 `true ∧ true = true`다.
>
> **결론:** 계산은 언제나 최상위 constructor의 방정식을 선택하고 직접 부분구절로 내려간 뒤, 얻은 의미를 다시 조합하는 방식으로 진행된다.

> [!example] 수량자는 상태를 덮어쓴다
> 임의의 상태 `σ`에서 `∀x. x + 0 = x`의 의미를 계산한다.
>
> 1. 전칭 수량자는 모든 정수 `n`에 대해 본문을 상태 `[σ|x:n]`에서 검사한다.
> 2. 그 상태에서 `x`의 값은 원래 `σ(x)`가 아니라 `n`이다.
> 3. 본문은 `n+0=n`이므로 모든 `n`에서 참이다.
> 4. 따라서 전체 assertion은 원래 상태가 무엇이든 참이다.
>
> **결론:** 이 계산은 바인더가 변수의 현재 값을 읽는 대신 범위 안에서 새로운 값을 지정한다는 사실을 보여 준다.

> [!warning] 상태와 저장소를 너무 일찍 동일시하지 않기
> 여기서 상태는 모든 변수에 정수를 배정하는 전체 함수다. 아직 주소, 할당, 별칭, 수명은 없다. 뒤에서 환경과 저장소가 분리될 때 이 단순한 상태 개념이 왜 충분하지 않은지 보게 된다.

> [!question] 이 절을 덮고 확인하기
> 1. `σ(x)=2`, `σ(y)=-1`일 때 `∃z. x+z=y`의 의미를 상태 갱신 표기로 계산하라.
> 2. 닫힌 assertion의 의미가 상태와 무관해야 하는 이유를 직관적으로 설명하라.
> 3. 정수식과 assertion의 의미 함수 공역이 왜 다른가?

### English companion — Denotational meaning as a function of state

*An open expression denotes not one integer but a function that returns an integer when supplied a state.*

A closed expression such as `2 + 3` always yields five, while `x + 3` needs a value for `x`. A uniform semantics therefore maps every integer expression to a function `State → Integer` and every assertion to `State → Boolean`. Let `Σ = Var → ℤ` and `𝔹 = {true,false}`.

Denotational semantics assigns mathematical objects to already parsed syntax. Here integer expressions denote elements of `Σ → ℤ`, assertions elements of `Σ → 𝔹`. Inside the semantic brackets is object-language syntax; outside is metalanguage mathematics.

### Semantic functions and state update

```text
⟦·⟧exp    : IntExp → (Σ → ℤ)
⟦·⟧assert : Assert → (Σ → 𝔹)
Σ = Var → ℤ
[σ | v : n](v) = n
[σ | v : n](w) = σ(w)    when w ≠ v
```

`[σ | v : n]` agrees with `σ` everywhere except at `v`, where it returns `n`. Quantifier semantics uses this update to test possible values for a bound variable.

### Core semantic equations following the constructors

- Constant: `⟦n⟧exp σ = n`; the state is accepted but ignored.
- Variable: `⟦v⟧exp σ = σ(v)`; look up the variable in the state.
- Arithmetic: recursively interpret operands, then apply the corresponding mathematical operation.
- Relation: compare the denotations of the two integer-expression children.
- Logical connectives combine the Boolean denotations of their assertion children.
- Quantifier: `∀v.p` holds in `σ` exactly when `p` holds in `[σ|v:n]` for every integer `n`; `∃` requires at least one such `n`.

> [!example] A calculation using semantic equations
> Evaluate `(x + 2 < y) ∧ ¬(x = 0)` when `σ(x)=3` and `σ(y)=7`.
>
> 1. `⟦x+2⟧exp σ = σ(x)+2 = 5`, while `⟦y⟧exp σ = 7`.
> 2. Hence `⟦x+2<y⟧assert σ = (5<7) = true`.
> 3. `⟦x=0⟧assert σ = false`, so its negation is true.
> 4. The final conjunction is `true ∧ true = true`.
>
> **Conclusion:** Evaluation always chooses the equation for the outer constructor, descends to immediate children, and combines their denotations.

> [!example] A quantifier overrides the state
> Evaluate `∀x. x + 0 = x` in an arbitrary state `σ`.
>
> 1. The universal quantifier checks its body in `[σ|x:n]` for every integer `n`.
> 2. In that updated state, `x` has value `n`, not the original `σ(x)`.
> 3. The body becomes `n+0=n`, true for every integer `n`.
> 4. Therefore the entire assertion is true regardless of the original state.
>
> **Conclusion:** The calculation shows that a binder supplies a new value within its scope rather than reading the variable's old state value.

> [!warning] Do not identify state with store too early
> Here a state is a total function assigning an integer to every variable. There are no addresses, allocation, aliasing, or lifetimes yet. Later chapters separate environments from stores when this simple model becomes insufficient.

> [!question] Retrieval check
> 1. Evaluate `∃z. x+z=y` when `σ(x)=2` and `σ(y)=-1`, explicitly using state update.
> 2. Explain intuitively why the denotation of a closed assertion must be independent of state.
> 3. Why do integer expressions and assertions have different semantic codomains?

---

## 05. syntax-directedness, 유일성, 합성성 — §1.2 · pp. 9–12 · 6분

> [!abstract] 이 절의 중심
> 의미 방정식은 예시 계산법의 모음이 아니라 모든 구절에 정확히 하나의 의미를 주는 재귀 정의다.

아무 방정식이나 의미 정의가 되는 것은 아니다. 이 책에서 의미 방정식은 두 조건을 지킨다. 첫째, 추상 문법의 생산 규칙마다 대응하는 방정식이 하나씩 있어야 한다. 둘째, 구성된 구절의 의미는 직접 부분구절의 의미만으로 계산되어야 한다. 변수처럼 미리 주어진 종류는 부분구절 자체를 사용할 수 있다. 이 대응 때문에 어떤 구절을 만나도 최상위 constructor를 보고 적용할 방정식을 바로 고를 수 있다.

이런 정의를 syntax-directed 또는 준동형적(homomorphic)이라고 한다. 이름은 의미 계산의 재귀 모양이 syntax tree의 모양을 그대로 따른다는 뜻이다. 덧셈 노드에서는 두 자식의 정수 의미를 더하고, 논리곱 노드에서는 두 자식의 진릿값을 논리곱하며, 수량자 노드에서는 본문의 의미를 갱신된 상태들에 적용한다. syntax structure와 의미 계산 구조가 평행하다.

> [!abstract] 왜 해가 정확히 하나인가
> 구절 깊이에 대한 귀납법을 생각하자. 깊이 0에는 구절이 없어 자명하다. 깊이 `j+1`의 구절 `p`는 유한 생성 조건 때문에 어떤 constructor로 만들어졌다. 서로소 치역 때문에 그 constructor의 종류가 하나뿐이고, 단사성 때문에 직접 부분구절도 하나의 튜플로 정해진다. 각 부분구절은 더 얕으므로 귀납가정에 따라 의미가 유일하다. 해당 constructor에 대응하는 의미 방정식이 그 의미들을 결합하는 방법을 하나로 정하므로 `p`의 의미도 유일하다.
>
> 존재성도 같은 논증에서 얻는다. constructor와 부분구절을 분해할 수 있고, 부분구절 의미가 이미 존재하며, 오른쪽의 메타언어 연산이 값을 돌려주므로 새 의미가 존재한다. 따라서 syntax 집합이 초기 대수이고 의미 함수가 목표 대수로 가는 유일한 준동형이라는 대수적 statement와 깊이 귀납 설명은 같은 사실의 두 얼굴이다.

syntax-directedness은 합성성(compositionality)을 낳는다. 합성적 semantics에서는 전체 의미가 직접 부분구절의 의미만으로 정해진다. 부분구절이 얼마나 길었는지, 어떤 변수 이름을 썼는지, 어떤 과정을 거쳐 만들어졌는지처럼 의미 이외의 속성을 엿보지 않는다. 그 결과 어떤 문맥 안의 부분구절을 의미가 같은 다른 구절로 바꾸어도 전체 의미가 변하지 않는다.

예를 들어 모든 상태에서 `e`와 `e'`가 같은 정수를 낸다면 `e+1<10`, `∀x. e=x`, `e=e∧p`처럼 `e`를 품은 어떤 올바른 syntactic context에서도 `e'`로 바꾸어 의미를 보존한다. 이 대체 원리는 최적화의 정확성, 등식 추론, 모듈 구현 교체를 뒷받침한다. 다만 ‘현재 한 상태에서 값이 같다’가 아니라 의미 함수 전체가 같아야 함에 주의하자.

> [!example] 의미 동치와 문맥 대체
> 정수식 `x+0`과 `x`는 모든 상태에서 같은 의미를 갖는다.
>
> 1. 임의의 `σ`에서 `⟦x+0⟧σ = σ(x)+0 = σ(x) = ⟦x⟧σ`다.
> 2. 따라서 문맥 `[-]×y<z`에 넣은 `(x+0)×y<z`와 `x×y<z`도 같은 assertion 의미를 갖는다.
> 3. 문맥이 여러 층이어도 각 층의 의미 방정식이 부분 의미만 사용하므로 동치가 바깥까지 전달된다.
>
> **결론:** 합성성은 ‘동일 의미를 동일하게 취급한다’는 교체 가능성을 수학적으로 보장한다.

의미 방정식에는 대상 언어와 메타언어가 동시에 등장한다. `⟦e₀+e₁⟧σ = ⟦e₀⟧σ + ⟦e₁⟧σ`에서 괄호 안의 `+`는 정의할 언어의 constructor이고, 괄호 밖의 `+`는 이미 알고 있는 정수 덧셈이다. 대상 언어(object language)는 설명 대상, 메타언어(metalanguage)는 설명을 적는 수학 언어다. `e`, `p`, `σ`, `n`은 대상 언어에 실제로 쓰이는 변수가 아니라 구절·상태·정수를 가리키는 메타변수다.

대상 언어의 기능을 매우 비슷한 메타언어 기능으로 설명하는 방식을 메타순환적(metacircular)이라고 한다. 익숙한 정수 덧셈에는 간결하고 유용하지만, 메타언어 연산을 잘못 이해하면 오해가 그대로 대상 언어로 전달된다. 그래서 낯선 연산은 진리표나 별도 수학 정의로 풀어야 한다. 인터프리터가 구현 언어의 함수 호출로 대상 언어의 함수 호출을 설명할 때도 같은 위험이 생긴다.

> [!warning] 0으로 나누기라는 균열
> 이 장의 의미 함수 형식은 모든 정수식이 모든 상태에서 정수 하나를 내야 한다고 약속한다. 그러나 보통의 정수 나눗셈과 나머지는 제수가 0이면 값이 없다. 이를 무시하면 의미 함수가 실제로는 전체 함수가 아니다. 지금은 문제를 보류하지만, 2장에서는 오류와 비종료를 의미 영역에 어떻게 반영할지 다시 묻는다. 의미의 공역을 먼저 정하는 일이 언어 설계상의 오류 정책까지 강제한다는 좋은 사례다.

> [!question] 이 절을 덮고 확인하기
> 1. syntax-directed 의미 방정식의 두 조건을 말하고, 각각이 빠졌을 때 생길 문제를 설명하라.
> 2. ‘한 상태에서 값이 같다’와 ‘두 식의 의미가 같다’를 구분하는 반례를 만들어 보라.
> 3. 메타순환성이 간결하면서도 위험한 이유는 무엇인가?

### English companion — Syntax direction, uniqueness, and compositionality

*Semantic equations are not a collection of examples; they recursively assign exactly one meaning to every phrase.*

Not every collection of equations defines semantics. There must be one equation per syntactic production, and the meaning of a constructed phrase must be computed only from the meanings of its immediate subphrases, except for predefined items such as variable names.

Such a definition is syntax-directed, or homomorphic: recursion in the semantic function follows the syntax tree. Addition combines integer meanings; conjunction combines Boolean meanings; a quantifier applies its body meaning to updated states.

> [!abstract] Why the solution is unique
> Induct on phrase depth. A phrase at depth `j+1` has one outer constructor by disjoint ranges and one tuple of children by injectivity. The children have unique meanings by induction, and the one semantic equation for that constructor uniquely combines them.
>
> The same argument gives existence. This depth-induction account is the concrete face of the algebraic statement that syntax is initial and semantics is its unique homomorphism into the chosen target algebra.

Syntax direction yields compositionality: a whole phrase depends only on the denotations of its immediate children. Consequently, replacing a subphrase by another with the same denotation preserves the meaning of every enclosing context.

If `e` and `e'` return the same integer in every state, replacing one with the other in any well-formed context preserves meaning. This supports optimization, equational reasoning, and implementation replacement. Equality in one state is not enough; the entire denotation must agree.

> [!example] Semantic equivalence and contextual replacement
> The integer expressions `x+0` and `x` have equal denotations in every state.
>
> 1. For arbitrary `σ`, `⟦x+0⟧σ = σ(x)+0 = σ(x) = ⟦x⟧σ`.
> 2. Putting either expression in the context `[-]×y<z` produces equivalent assertions.
> 3. The equivalence propagates through arbitrarily many context layers because each equation uses only child meanings.
>
> **Conclusion:** Compositionality mathematically guarantees substitutability of equal meanings.

Semantic equations mix object language and metalanguage. In `⟦e₀+e₁⟧σ = ⟦e₀⟧σ + ⟦e₁⟧σ`, the `+` inside brackets is an object-language constructor; the one outside is mathematical integer addition. Symbols such as `e`, `p`, `σ`, and `n` are metavariables.

Explaining an object-language feature with an analogous metalanguage feature is metacircular. It is concise for familiar arithmetic but can merely transfer misunderstandings. Unfamiliar operations should be made explicit, for example by truth tables.

> [!warning] The crack exposed by division by zero
> The declared semantic type says every expression returns an integer in every state, but ordinary division and remainder are undefined when the divisor is zero. Chapter 1 postpones this mismatch; later semantics must decide how errors and divergence appear in the result domain.

> [!question] Retrieval check
> 1. State the two requirements on syntax-directed equations and explain what can fail without each.
> 2. Construct an example distinguishing equality in one state from equality of denotations.
> 3. Why is metacircularity both concise and potentially dangerous?

---

## 06. 상태에서의 참, 타당성, 형식 증명 — §1.3 · pp. 12–15 · 8분

> [!abstract] 이 절의 중심
> semantics이 무엇이 참인지 정한다면, 추론 체계는 무엇을 규칙으로 증명할 수 있는지 정한다.

assertion `p`가 한 상태 `σ`에서 참이라는 것은 `⟦p⟧σ=true`라는 뜻이다. ‘`p`가 `σ`를 기술한다’, ‘`σ`가 `p`를 만족한다’도 같은 말이다. 반면 `p`가 타당(valid)하다는 것은 모든 상태에서 참이라는 뜻이다. `x>0`은 어떤 상태에서는 참이지만 타당하지 않다. `x=x`와 `x+0=x`는 모든 상태에서 참이므로 타당하다. 모든 상태에서 거짓인 assertion은 만족 불가능(unsatisfiable)하다고 한다.

`p₀ ⇒ p₁`이 타당하면 `p₀`를 만족하는 모든 상태가 `p₁`도 만족한다. 이때 `p₀`가 `p₁`보다 강하고, `p₁`이 `p₀`보다 약하다고 한다. 강한 조건일수록 허용하는 상태 집합이 작다. `false`는 아무 상태도 허용하지 않으므로 모든 assertion보다 강하고, `true`는 모든 상태를 허용하므로 모든 assertion보다 약하다. 두 assertion이 서로보다 강하면 같은 상태 집합을 기술하므로 의미적으로 동치다.

### assertion을 상태 집합으로 읽기

```text
Sat(p) = { σ ∈ Σ | ⟦p⟧assert σ = true }
p₀ is stronger than p₁  ⇔  Sat(p₀) ⊆ Sat(p₁)
p₀ ≡ p₁                 ⇔  Sat(p₀) = Sat(p₁)
Sat(false) = ∅
Sat(true)  = Σ
```

‘강하다’는 말이 역방향처럼 느껴질 수 있지만 정보량으로 보면 자연스럽다. `x=3`은 `x>0`보다 더 많은 정보를 주고 더 적은 상태만 남긴다.

추론 규칙은 0개 이상의 전제와 하나의 결론으로 이루어진 틀이다. 전제와 결론에는 구체 assertion 대신 적절한 구절을 받을 메타변수가 들어갈 수 있다. 메타변수에 실제 대상 언어 구절을 넣으면 규칙의 인스턴스가 된다. 전제가 하나도 없는 규칙은 공리 스키마이고, 메타변수마저 없어 가능한 인스턴스가 하나뿐이면 단순히 공리라고 한다. 부가 조건이 붙은 규칙은 그 조건을 만족하는 교체만 인스턴스로 인정한다.

형식 증명은 각 줄이 앞선 줄들을 전제로 하는 어떤 규칙 인스턴스의 결론인 유한한 assertion 열이다. 마지막 줄이 증명한 assertion이다. 같은 내용을 증명 트리로 그리면 결론이 아래 뿌리에 있고 그 규칙의 전제 증명들이 위쪽 가지가 된다. 트리는 의존 구조를 직접 보여 주지만 큰 증명은 넓어지므로 실제 문서에서는 번호가 매겨진 열과 규칙 주석을 자주 쓴다.

> [!example] 규칙, 인스턴스, 증명 단계 구분
> 대칭성 스키마와 전건 긍정형 규칙을 단순화해 사용한다.
>
> 1. 공리 스키마: 임의의 정수식 `e₀,e₁`에 대해 `(e₀=e₁) ⇒ (e₁=e₀)`.
> 2. 한 인스턴스: `(x+0=x) ⇒ (x=x+0)`.
> 3. 이미 `x+0=x`를 증명했다면 두 전제를 연결하는 규칙으로 `x=x+0`을 결론 내릴 수 있다.
> 4. 마지막으로 타당한 assertion을 전칭 일반화하는 규칙을 적용해 `∀x. x=x+0`을 얻을 수 있다.
>
> **결론:** 스키마는 무한히 많은 규칙 인스턴스를 압축하고, 증명은 그 인스턴스들을 유한 번 연결한다.

> [!tip] 건전성은 syntax과 의미 사이의 다리
> 규칙이 건전하다는 것은 모든 인스턴스에서 전제들이 모두 타당하면 결론도 타당하다는 뜻이다. 모든 규칙이 건전하면 공리에서 시작해 규칙을 유한 번 적용한 모든 증명 줄이 타당하다. 즉 `⊢p`이면 `⊨p`다. 건전성은 증명기가 거짓을 증명하지 않는다는 보증이지, 모든 참을 반드시 증명한다는 보증은 아니다.
>
> 규칙의 건전성 증명도 의미 방정식을 사용한다. 임의의 상태를 하나 잡고, 전제의 타당성으로 그 상태에서 전제들이 참임을 얻은 뒤, 연결사의 진리표나 수량자의 의미 방정식으로 결론이 참임을 보인다. 상태가 임의였으므로 결론이 모든 상태에서 참이다. 이 ‘임의의 상태’ 단계가 빠지면 타당성 대신 특정 상태의 참만 증명하게 된다.

> [!warning] 추론과 함의를 혼동하지 않기
> 함의 `p⇒q`는 한 assertion 안의 대상 언어 연결사이며 한 상태에서 진릿값을 갖는다. 추론 `p / q`는 두 증명 단계 사이의 메타언어 관계다. 한 상태에서 `p`가 참이라고 해서 그 상태에서 `∀x.p`도 참인 것은 아니므로 ‘현재 참인 `p`에서 `∀x.p`를 결론 내린다’는 읽기는 틀리다. 전칭 일반화 규칙이 건전한 이유는 전제 `p`가 한 상태에서 참이어서가 아니라 모든 상태에서 타당하다고 가정하기 때문이다.

완전성은 건전성의 반대 방향이다. 의미적으로 타당한 모든 assertion이 규칙으로 증명 가능하면 추론 체계가 완전하다. 여기서는 정수 산술 연산의 의미를 고정했기 때문에 산술적 타당성 전체를 유한 규칙으로 포착할 수 없다는 불완전성 문제가 생긴다. 반면 연산 해석까지 임의로 바꾸어도 참인 논리적 타당성에는 완전한 일차 논리 계산이 존재한다. 프로그램 검증에서는 보통 실제 정수 연산을 고정해야 하므로, 논리 규칙만으로 모든 산술 사실을 해결하겠다는 기대를 버리고 필요한 산술 추론을 별도 이론이나 자동화에 맡긴다.

> [!question] 이 절을 덮고 확인하기
> 1. `x=3`, `x>0`, `true`를 강한 순서부터 나열하고 상태 집합 포함 관계로 정당화하라.
> 2. 건전성과 완전성을 각각 `⊢`와 `⊨`를 사용해 한 줄로 써 보라.
> 3. 왜 `x>0`은 형식 증명의 독립된 한 줄로 올 수 없지만 `(x>0)⇒(x≥0)`은 올 수 있는가?

### English companion — Truth in a state, validity, and formal proof

*Semantics determines what is true; an inference system determines what can be proved by rules.*

An assertion is true in a state `σ` when its denotation there is true. It is valid when true in every state. Thus `x>0` may be true but is not valid; `x=x` is valid. An assertion false in every state is unsatisfiable.

If `p₀ ⇒ p₁` is valid, every state satisfying `p₀` also satisfies `p₁`; `p₀` is stronger and `p₁` weaker. Stronger assertions admit fewer states. `false` is strongest, `true` weakest. Mutual strength is semantic equivalence.

### Reading assertions as sets of states

```text
Sat(p) = { σ ∈ Σ | ⟦p⟧assert σ = true }
p₀ is stronger than p₁  ⇔  Sat(p₀) ⊆ Sat(p₁)
p₀ ≡ p₁                 ⇔  Sat(p₀) = Sat(p₁)
Sat(false) = ∅
Sat(true)  = Σ
```

The order may feel reversed, but it follows information content: `x=3` says more than `x>0` and therefore leaves fewer possible states.

An inference rule is a schema with zero or more premises and one conclusion. Replacing metavariables by suitable object-language phrases gives an instance. A zero-premise rule is an axiom schema; without metavariables it is simply an axiom.

A formal proof is a finite sequence in which every line concludes a rule instance whose premises appeared earlier. A proof tree displays the same dependency structure directly, though sequences scale better typographically.

> [!example] Distinguishing a rule, an instance, and a proof step
> Use a symmetry schema and a modus-ponens-shaped rule.
>
> 1. Axiom schema: `(e₀=e₁) ⇒ (e₁=e₀)` for arbitrary integer expressions.
> 2. One instance: `(x+0=x) ⇒ (x=x+0)`.
> 3. Given a proof of `x+0=x`, modus ponens yields `x=x+0`.
> 4. Universal generalization of the valid assertion yields `∀x. x=x+0`.
>
> **Conclusion:** A schema compresses infinitely many instances; a proof connects finitely many of them.

> [!tip] Soundness bridges syntax and semantics
> A rule is sound when every instance preserves validity from all premises to its conclusion. If every rule is sound, derivability implies validity: `⊢p` entails `⊨p`. Soundness prevents false theorems; it does not guarantee that every truth is derivable.
>
> A soundness proof fixes an arbitrary state, invokes validity of the premises there, and uses semantic equations to establish the conclusion. Because the state was arbitrary, the conclusion is valid.

> [!warning] Do not confuse inference with implication
> Implication `p⇒q` is an object-language connective with a truth value in one state. Inference is a metalanguage relationship between proof steps. Universal generalization relies on validity of its premise, not mere truth in the current state.

Completeness asks the converse: is every semantically valid assertion derivable? With fixed integer arithmetic, no finite rule set captures every arithmetical truth. First-order logical validity under arbitrary interpretations has complete calculi, but program verification normally fixes the intended arithmetic and uses additional mathematical reasoning or automation.

> [!question] Retrieval check
> 1. Order `x=3`, `x>0`, and `true` from strongest to weakest and justify the order by state-set inclusion.
> 2. Write soundness and completeness as implications using `⊢` and `⊨`.
> 3. Why cannot `x>0` appear as a standalone proof line while `(x>0)⇒(x≥0)` can?

---

## 07. 바인딩, 자유 변수, 일치 정리 — §1.4 · pp. 15–18 · 8분

> [!abstract] 이 절의 중심
> 변수의 의미는 철자만으로 정해지지 않는다. 어느 바인더가 그 발생을 지배하는지가 syntax structure의 일부다.

`∀v.p`와 `∃v.p`에서 수량자 바로 뒤의 `v` 발생은 바인딩 발생, 즉 바인더다. 그 바인더의 범위는 본문 `p`다. 범위 안에 있는 같은 이름의 비바인딩 발생은 그 바인더에 묶인다. 같은 이름의 바인더가 중첩되어 있으면 가장 작은 범위, 즉 가장 가까운 안쪽 바인더가 지배한다. 어느 바인더에도 묶이지 않은 발생은 자유 발생이다. 자유 발생이 하나도 없는 구절을 닫힌 구절이라고 한다.

자유인지 묶였는지는 변수 이름 자체가 아니라 ‘구절 안의 특정 발생’에 붙는 성질이다. 한 구절 안에서 같은 이름이 자유로도, 묶인 채로도 나타날 수 있다. 또 전체 구절에서는 묶인 발생이 어떤 부분구절만 떼어 보면 자유일 수 있다. 예컨대 `∀x.(x<y ∧ ∃y.x<y)`에서 첫 `x`와 마지막 `x`는 바깥 `∀x`에 묶이고, 첫 `y`는 자유이며, 마지막 `y`는 안쪽 `∃y`에 묶인다. 안쪽 본문 `x<y`만 떼면 그 안에서는 두 이름 모두 자유다.

> [!example] 그림 없이 바인딩 구조 추적하기
> assertion `∀x. (x<y ∨ ∃y. (x=y ∧ ∀x. x>y))`를 바깥에서 안쪽으로 읽는다.
>
> 1. 맨 앞 `∀x`는 큰 괄호 전체를 범위로 하며, 안쪽 `∀x` 범위 밖에 있는 `x` 발생들을 묶는다.
> 2. 첫 비교 `x<y`의 `y`는 아직 `y` 바인더 범위에 들어가지 않았으므로 자유다.
> 3. `∃y`는 자기 본문의 `y`들을 묶으며, 맨 안쪽 `∀x`의 본문에서도 `y`에 대한 더 가까운 바인더는 없으므로 계속 지배한다.
> 4. 맨 안쪽 `∀x`는 자기 본문의 `x`만 새로 묶어 바깥 `∀x`를 가린다.
>
> **결론:** 전체 assertion의 자유 변수 집합은 `{y}`다.

자유 변수 집합 함수 `FV`는 syntax을 따라 재귀적으로 정의한다. 상수와 진리 상수에는 자유 변수가 없고, 변수 `v`의 자유 변수는 `{v}`다. 단항 constructor는 자식의 집합을 그대로 전달하고, 이항 constructor는 두 집합의 합집합을 취한다. 수량자는 본문의 자유 변수 집합에서 자신이 묶는 이름 하나를 제거한다. 이 정의도 의미 정의는 아니지만 syntax-directed이므로 모든 구절에 유일한 결과를 준다.

### 자유 변수 집합의 대표 방정식

```text
FVexp(n) = ∅
FVexp(v) = {v}
FVexp(-e) = FVexp(e)
FVexp(e₀+e₁) = FVexp(e₀) ∪ FVexp(e₁)
FVassert(true) = ∅
FVassert(e₀=e₁) = FVexp(e₀) ∪ FVexp(e₁)
FVassert(¬p) = FVassert(p)
FVassert(p₀∧p₁) = FVassert(p₀) ∪ FVassert(p₁)
FVassert(∀v.p) = FVassert(p) − {v}
FVassert(∃v.p) = FVassert(p) − {v}
```

다른 산술 연산, 관계, 이항 연결사는 같은 모양의 방정식을 갖는다. 수량자 절에서만 집합에서 이름을 빼는 바인딩 특유의 동작이 나타난다.

> [!tip] 일치 정리(Coincidence Theorem)
> 구절 `p`의 자유 변수들에 대해 두 상태 `σ`, `σ'`가 같은 값을 준다면 `p`의 의미도 두 상태에서 같다. 식과 assertion 모두에 대해 성립한다. 즉 의미 계산은 상태 전체를 받는 것처럼 보이지만 실제로는 유한 집합 `FV(p)`의 값만 관찰한다. 닫힌 구절은 자유 변수가 없으므로 어떤 두 상태에서도 의미가 같다.
>
> 이 정리는 자유 변수의 정의가 단순한 syntax 목록이 아니라 의미 의존성의 정확한 상한임을 보여 준다. 이후 최적화나 환경 축소에서 ‘이 구절이 읽을 수 있는 이름은 무엇인가’를 정당화하며, 함수 클로저가 어떤 환경을 보존해야 하는지 이해하는 바탕이 된다.

> [!abstract] 구조적 귀납 증명의 뼈대
> 임의의 구절 `p`를 잡고 직접 부분구절들에 대해서는 일치 정리가 이미 성립한다고 가정한다. 상수는 상태를 읽지 않으므로 자명하고, 변수는 `FV(v)={v}`이므로 두 상태가 그 변수에서 일치한다. 단항·이항 구성에서는 자유 변수 집합의 같음이나 합집합 성질로 각 자식에 귀납가정을 적용한 뒤 의미 방정식으로 결과를 조합한다.
>
> 수량자 경우가 핵심이다. `p=∀v.q`이고 `σ`, `σ'`가 `FV(q)−{v}`에서 일치한다고 하자. 임의의 정수 `n`을 골라 두 상태를 각각 `[σ|v:n]`, `[σ'|v:n]`으로 갱신하면, 이제 `v`에서도 둘 다 `n`이고 나머지 자유 변수에서도 원래부터 일치하므로 `FV(q)` 전체에서 일치한다. 귀납가정으로 본문 의미가 같고, 이것이 모든 `n`에 대해 성립하므로 전칭 수량자 의미도 같다. 존재 수량자도 같은 논리다.

구조적 귀납법은 자연수 귀납법의 변형이 아니라 그 위에 정당화된다. 구절의 깊이를 자연수로 보고 직접 부분구절의 깊이가 항상 더 작다는 사실을 사용한다. 실무적으로는 ‘각 constructor 경우를 모두 다루고, 자식에 대해 명제를 가정한다’는 방식으로 쓴다. constructor 하나를 빼먹으면 모든 구절을 덮지 못하고, 바인더 경우를 비바인더처럼 처리하면 상태 갱신 때문에 증명이 깨진다.

> [!question] 이 절을 덮고 확인하기
> 1. `∃x.(x<z ∧ ∀z.z<x+y)`의 자유 변수 집합을 방정식 순서대로 계산하라.
> 2. 일치 정리에서 수량자 경우에 원래 상태가 아닌 갱신된 두 상태를 귀납가정에 넣어야 하는 이유는 무엇인가?
> 3. 일치 정리로 닫힌 assertion의 상태 독립성을 한 줄로 유도하라.

### English companion — Binding, free variables, and the Coincidence Theorem

*The meaning of a variable occurrence is not determined by spelling alone; its governing binder is part of the syntax.*

In `∀v.p` and `∃v.p`, the occurrence after the quantifier is a binder whose scope is `p`. Matching nonbinding occurrences in the scope are bound by it; under nested binders, the innermost one wins. All other occurrences are free. A phrase with no free occurrences is closed.

Free and bound are properties of occurrences, not names in isolation. The same name can occur both freely and bound, and an occurrence bound in a whole phrase may be free in a selected subphrase.

> [!example] Tracing binding structure without a diagram
> Analyze `∀x. (x<y ∨ ∃y. (x=y ∧ ∀x. x>y))` from outside inward.
>
> 1. The outer `∀x` scopes over the large parenthesis and binds `x` occurrences not shadowed by the inner `∀x`.
> 2. The `y` in the first comparison is free because it precedes the existential's scope.
> 3. The existential binds the `y` occurrences in its body, including under the innermost universal.
> 4. The innermost `∀x` shadows the outer binder only within its own body.
>
> **Conclusion:** The free-variable set of the whole assertion is `{y}`.

The free-variable function `FV` is syntax-directed. Constants contribute none; a variable `v` contributes `{v}`; unary constructors preserve the child's set; binary constructors take unions; a quantifier removes the name it binds from the body's set.

### Representative free-variable equations

```text
FVexp(n) = ∅
FVexp(v) = {v}
FVexp(-e) = FVexp(e)
FVexp(e₀+e₁) = FVexp(e₀) ∪ FVexp(e₁)
FVassert(true) = ∅
FVassert(e₀=e₁) = FVexp(e₀) ∪ FVexp(e₁)
FVassert(¬p) = FVassert(p)
FVassert(p₀∧p₁) = FVassert(p₀) ∪ FVassert(p₁)
FVassert(∀v.p) = FVassert(p) − {v}
FVassert(∃v.p) = FVassert(p) − {v}
```

Other operations follow the same unary or binary patterns. Only binders subtract a name from the body's free-variable set.

> [!tip] Coincidence Theorem
> If states `σ` and `σ'` agree on every variable in `FV(p)`, then `p` has the same denotation in both states. A closed phrase therefore has state-independent meaning.
>
> The theorem turns `FV` from bookkeeping into a semantic dependency bound. It later justifies environment restriction and clarifies which bindings a closure must retain.

> [!abstract] Skeleton of the structural-induction proof
> Induct on `p`. Constants ignore the state; variables use agreement at their one free variable; unary and binary cases apply induction to children and combine equal child meanings with the semantic equation.
>
> For `∀v.q`, update both states with the same arbitrary integer `n`. The updated states agree on all of `FV(q)`: at `v` by construction and elsewhere by the original hypothesis. Induction equates the body meanings for every `n`, so the quantified meanings agree.

Structural induction is justified by induction on phrase depth. In practice, cover every constructor and assume the proposition for immediate children. Binder cases require special handling because semantics changes the state.

> [!question] Retrieval check
> 1. Compute the free-variable set of `∃x.(x<z ∧ ∀z.z<x+y)` step by step.
> 2. Why does the quantifier case apply induction to updated states rather than the original states?
> 3. Derive state independence of a closed assertion from the Coincidence Theorem.

---

## 08. 캡처 회피 치환과 치환 정리 — §1.4 · pp. 18–21 · 10분

> [!abstract] 이 절의 중심
> 치환은 글자를 바꾸는 작업이 아니라 자유 변수의 의미 관계를 보존하는 syntactic operation이다.

`p`의 자유 변수 `v`에 식 `e`를 넣는다는 직관은 간단해 보인다. 하지만 `e`에 자유롭게 등장하는 이름이 `p` 안의 바인더와 같으면 단순 텍스트 교체가 그 이름을 새로 묶어 버린다. 이를 변수 포획(capture)이라 한다. 포획은 단지 이름이 보기 싫게 겹치는 문제가 아니라 결과 assertion의 의미를 바꾼다.

> [!example] 포획이 참을 거짓으로 바꾸는 과정
> `∃y. y>x`에서 자유 변수 `x`를 식 `y+1`로 바꾸고 싶다고 하자.
>
> 1. 잘못된 문자 교체는 `∃y. y>y+1`을 만든다.
> 2. 삽입한 식의 자유 `y`가 원래 존재 수량자의 `y`에 붙잡혔다.
> 3. 원래 의도는 현재 상태의 `y+1`보다 큰 정수가 존재한다는 말이어서 항상 참이지만, 포획된 결과는 어떤 정수도 자기보다 1 클 수 없다는 거짓 assertion이다.
> 4. 먼저 바운드 변수만 새 이름 `z`로 바꿔 `∃z.z>x`로 만든 뒤 치환하면 `∃z.z>y+1`이 되어 의도가 보존된다.
>
> **결론:** 치환 전에 필요한 이름변경을 수행하는 것이 캡처 회피의 핵심이다.

책은 한 변수 치환보다 모든 변수에 대한 동시 치환을 먼저 정의한다. 치환 맵 `S : Var → IntExp`는 각 변수 `v`를 넣을 정수식 `S(v)`에 대응시킨다. `p/S`는 `p`에 등장하는 모든 자유 변수 발생을 동시에 해당 식으로 바꾼 결과다. ‘동시에’라는 말은 먼저 바꾼 결과를 다음 치환이 다시 건드리지 않는다는 뜻이다. 예컨대 `x+y`에서 `x↦y`, `y↦x`를 동시 적용하면 `y+x`이지 `x+x`가 아니다.

상수는 그대로이고, 변수 `v`는 `S(v)`가 되며, 비바인딩 constructor에서는 자식들에 같은 치환을 재귀 적용한다. 어려운 절은 수량자다. `(∀v.p)/S`를 계산할 때 새 바인더 `v_new`를 고르되, 본문에서 자유롭게 남아 치환될 각 변수 `w`의 교체식 `S(w)`에 `v_new`가 자유롭게 나타나지 않게 해야 한다. 가능하면 기존 `v`를 유지하고, 충돌할 때만 표준 순서에서 처음 나오는 신선한 이름을 골라 정의 자체를 결정적으로 만든다.

### 수량자 아래 동시 치환

```text
(∀v. p) / S = ∀v_new. ( p / [S | v : v_new] )

Choose v_new so that
v_new ∉ ⋃ { FVexp(S(w)) | w ∈ FVassert(p) − {v} }.

Single substitution:
p / v ↦ e  abbreviates  p / [Cvar | v : e].
```

`[S|v:v_new]`은 바인더가 지배하던 `v` 발생을 새 변수식 `v_new`로 보내고 다른 변수에는 원래 `S`를 적용한다. 새 이름 조건은 밖에서 들어오는 교체식의 자유 변수가 포획되지 않도록 한다.

> [!tip] 치환의 세 syntax 성질
> 첫째, 두 치환 맵이 `FV(p)`의 변수들에서만 같아도 `p/S`와 `p/S'`는 같다. 구절은 자유롭게 등장하지 않는 변수에 대한 치환을 관찰하지 못한다. 둘째, 각 변수를 자기 자신을 나타내는 변수식으로 보내는 `Cvar`는 항등 치환이다. 셋째, 치환 결과의 자유 변수 집합은 원래 자유 변수 각각의 교체식 자유 변수 집합을 모두 합친 것이다. 캡처 회피 정의가 올바르기 때문에 이 정확한 등식이 성립한다.

> [!abstract] 치환 정리(Substitution Theorem)
> 치환 정리는 syntactic substitution과 의미 상태 구성을 연결한다. 상태 `σ`에서 치환된 구절 `p/S`를 해석하는 것은, 각 원래 자유 변수 `w`의 값을 `σ'`에서 교체식 `S(w)`를 계산한 값으로 정한 상태에서 원래 `p`를 해석하는 것과 같다. 더 간단히 쓰면 새 상태 `σ_S(w)=⟦S(w)⟧σ'`에 대해 `⟦p/S⟧σ' = ⟦p⟧σ_S`다. 필요한 자유 변수에서만 두 상태가 일치하면 충분하다.
>
> 증명은 다시 `p`에 대한 구조적 귀납이다. 비바인더 경우는 의미 방정식과 귀납가정으로 곧바로 끝난다. 수량자 경우에는 캡처 회피 조건이 결정적으로 쓰인다. 새 바인더 이름이 교체식들에 자유롭게 나타나지 않으므로 `σ'`에서 그 이름만 수량자 값 `n`으로 바꾸어도 교체식의 의미는 변하지 않는다. 그래서 syntax 쪽 이름변경과 의미 쪽 원래 변수 상태 갱신이 정확히 맞물린다.

> [!example] 유한 치환 정리로 계산 검산하기
> `p ≡ x+z<y`에서 `x↦y+1`, `z↦2`를 동시에 치환한다.
>
> 1. syntax 결과는 `(y+1)+2<y`다. 원래 `y`는 치환 대상이 아니므로 그대로 남는다.
> 2. 상태 `σ`에서 결과를 계산하는 것과, 원래 `p`를 `x` 값은 `⟦y+1⟧σ`, `z` 값은 2로 갱신한 상태에서 계산하는 것이 같다.
> 3. 이 등식은 컴파일러가 이름 기반 치환을 환경 기반 평가로 구현해도 되는 이유를 축약해서 보여 준다.
>
> **결론:** 유한 치환 정리는 한 변수 또는 유한 변수 목록을 쓰는 실전 표기의 의미 보존 근거다.

치환 정리에서 전칭 수량자 인스턴스화의 건전성도 따라온다. `∀v.p`가 한 상태에서 참이면 모든 정수 `n`으로 `v`를 갱신해도 `p`가 참이다. 특히 `e`가 그 상태에서 내는 정수로 갱신한 경우도 참이고, 유한 치환 정리에 따라 이것은 `p/v↦e`가 그 상태에서 참이라는 말과 같다. 따라서 `(∀v.p)⇒(p/v↦e)`는 모든 상태에서 타당하다.

이름변경 정리는 바인더 이름을 본문에서 충돌하지 않는 새 이름으로 바꾸어도 의미가 같다고 말한다. `∀x.x+y>0`과 `∀z.z+y>0`은 같은 바인딩 구조를 갖는다. 이런 교체를 알파 변환(α-conversion)이라 한다. 더 나아가 고차 abstract syntax 관점은 알파 변환으로 연결되는 표현들을 애초에 하나의 추상 구절로 본다. 바운드 이름의 철자는 의미 없는 구체 표기라는 생각이다.

> [!warning] 세 종류의 ‘바꾸기’를 구분하라
> 대상 변수에 대상 구절을 넣는 치환은 포획 회피가 필요한 형식적 syntactic operation이다. 메타언어 안에서 메타변수 식을 다른 메타언어 식으로 바꾸는 작업도 메타언어의 바인딩 규칙을 따른다. 반면 추론 규칙 스키마의 메타변수 `p`에 구체 대상 assertion을 넣어 인스턴스를 만드는 것은 대상 언어 치환이 아니라 스키마 변수에 값을 정하는 일이다. 대상 변수와 메타변수를 섞으면 불필요한 이름변경을 하거나 실제 포획을 놓치게 된다.

> [!question] 이 절을 덮고 확인하기
> 1. `(∀y. x<y)/x↦y+1`을 캡처 없이 계산하고, 잘못된 단순 치환 결과와 의미를 비교하라.
> 2. 동시 치환 `x↦y, y↦x`와 순차 치환 `x↦y` 후 `y↦x`가 왜 다른지 `x+y`로 보이라.
> 3. 치환 정리의 양변에서 syntactic manipulation과 상태 조작이 각각 어디에 나타나는가?
> 4. 알파 변환에서 새 이름이 신선해야 하는 이유를 반례로 설명하라.

### English companion — Capture-avoiding substitution and the Substitution Theorem

*Substitution is not character replacement; it is a syntactic operation designed to preserve semantic relationships among free variables.*

Replacing free occurrences of `v` in `p` by an expression `e` seems simple until a binder inside `p` uses a name occurring freely in `e`. Naive textual replacement then captures that occurrence and changes meaning.

> [!example] How capture can turn truth into falsehood
> Substitute `y+1` for the free variable `x` in `∃y. y>x`.
>
> 1. Naive character replacement produces `∃y. y>y+1`.
> 2. The free `y` in the inserted expression has been captured by the existential binder.
> 3. The intended claim says some integer exceeds the state's current `y+1`, which is true; the captured result says some integer exceeds itself plus one, which is false.
> 4. First alpha-rename the bound `y` to fresh `z`, then substitute, yielding `∃z.z>y+1`.
>
> **Conclusion:** Capture avoidance renames conflicting binders before replacement.

The chapter defines simultaneous substitution first. A map `S : Var → IntExp` assigns a replacement expression to each variable, and `p/S` replaces all free occurrences at once. Earlier replacements are not recursively processed by later ones; swapping `x↦y` and `y↦x` in `x+y` yields `y+x`.

Constants remain unchanged, variables map through `S`, and nonbinding constructors recurse. For a quantifier, choose a binder `v_new` that is absent from the free variables of every replacement expression that may enter the body. Keep `v` when safe; otherwise choose a canonical fresh name.

### Simultaneous substitution under a quantifier

```text
(∀v. p) / S = ∀v_new. ( p / [S | v : v_new] )

Choose v_new so that
v_new ∉ ⋃ { FVexp(S(w)) | w ∈ FVassert(p) − {v} }.

Single substitution:
p / v ↦ e  abbreviates  p / [Cvar | v : e].
```

`[S|v:v_new]` sends occurrences governed by the old binder to the fresh variable expression and otherwise behaves like `S`. Freshness prevents free variables of incoming replacements from being captured.

> [!tip] Three syntactic properties of substitution
> Substitution depends only on replacements for variables free in the phrase; mapping every variable to itself is the identity substitution; and the free variables of `p/S` are exactly the union of free variables of `S(w)` for `w` free in `p`.

> [!abstract] Substitution Theorem
> The Substitution Theorem connects syntax with semantic state composition. Interpreting `p/S` in `σ'` equals interpreting `p` in the state `σ_S` defined by `σ_S(w)=⟦S(w)⟧σ'`, at least on variables free in `p`.
>
> The proof is structural. In the binder case, freshness ensures that updating `σ'` at the new binder name does not alter any incoming replacement expression, allowing syntactic renaming and semantic state update to align.

> [!example] Using the finite substitution corollary
> In `p ≡ x+z<y`, simultaneously substitute `x↦y+1` and `z↦2`.
>
> 1. The syntactic result is `(y+1)+2<y`; the original `y` remains.
> 2. Evaluating the result in `σ` equals evaluating `p` in the state updated with `x=⟦y+1⟧σ` and `z=2`.
> 3. This equality captures why an implementation may realize syntactic substitution through environment-based evaluation.
>
> **Conclusion:** The finite corollary justifies practical notation for one or finitely many replacements.

The theorem validates universal instantiation. If `∀v.p` holds, then `p` holds when `v` receives the value denoted by any expression `e`; the finite substitution result identifies that with `p/v↦e`.

The Renaming Theorem says that changing a binder to a fresh name preserves meaning. This alpha-conversion motivates higher-order abstract syntax, where alpha-related representations may be treated as one abstract phrase.

> [!warning] Distinguish three kinds of replacement
> Object-variable substitution is a capture-avoiding syntactic operation. Metalanguage replacement follows metalanguage binding. Instantiating a rule schema by assigning an object phrase to a metavariable is neither of those object-language substitutions.

> [!question] Retrieval check
> 1. Compute `(∀y. x<y)/x↦y+1` capture-free and compare it with naive textual replacement.
> 2. Show on `x+y` why simultaneous swapping differs from sequential substitution.
> 3. Identify the syntactic operation and the semantic state operation on the two sides of the Substitution Theorem.
> 4. Give a counterexample showing why an alpha-renaming target must be fresh.

---

## 09. 정의에서 손으로 계산하고 증명하기 — 연습 워크숍 · pp. 22–23의 주제 확장 · 10분

> [!abstract] 이 절의 중심
> 답을 읽는 것보다 먼저 종이에 풀고, 아래 해설로 정의를 적용한 순서를 검산하자.

> [!example] 연습 1 — 자연어 statement를 수량자 구조로
> ‘0보다 크고 4보다 작은 서로 다른 정수가 적어도 두 개 있다’를 이 장의 assertion으로 적어 보라.
>
> 1. 두 증인을 나타낼 변수 `x`, `y`를 존재 수량자로 도입한다.
> 2. 각 증인이 범위 안에 있다는 조건 `0<x ∧ x<4`, `0<y ∧ y<4`를 적는다.
> 3. ‘서로 다른’을 잊지 않고 `x≠y`를 논리곱한다.
> 4. 한 답은 `∃x.∃y.(0<x ∧ x<4 ∧ 0<y ∧ y<4 ∧ x≠y)`다.
> 5. ‘많아야 두 개’라면 세 임의의 후보가 모두 조건을 만족할 때 적어도 두 후보가 같다는 전칭 구조로 바꿀 수 있다.
>
> **결론:** 개수 조건은 증인의 존재와 서로 다름, 또는 너무 많은 후보 사이의 필연적 일치로 번역한다.

> [!example] 연습 2 — 나눗셈 기호 없이 약수와 소수
> 변수들이 자연수만 돈다고 가정하고 `÷`, `rem` 없이 `d`가 `n`의 약수임을 적어 보라.
>
> 1. 약수의 정의를 몫의 존재로 바꾼다: 어떤 자연수 `k`에 대해 `n=d×k`다.
> 2. 따라서 `Divides(d,n) ≡ ∃k. n=d×k`로 약어를 둘 수 있다.
> 3. `p`가 소수라는 말은 보통 `p>1`이고 모든 약수 `d`가 1 또는 `p`라는 뜻이다.
> 4. `Prime(p) ≡ p>1 ∧ ∀d.((∃k.p=d×k)⇒(d=1∨d=p))`라고 쓸 수 있다.
> 5. 자연수 전제가 없고 정수 전체라면 음의 약수와 부호를 추가로 처리해야 한다.
>
> **결론:** 사용 금지된 연산의 의미를 존재 수량자와 허용된 연산으로 다시 정의하는 것이 핵심이다.

> [!example] 연습 3 — 동시 치환과 불필요한 이름변경 피하기
> `∀x.∃z.(x<y ∧ y<z)`에 `y↦x+z`를 치환하라.
>
> 1. 교체식 `x+z`의 자유 변수는 `{x,z}`다.
> 2. 바깥 `∀x`와 안쪽 `∃z` 모두 교체식의 자유 변수를 포획할 수 있으므로 둘 다 새 이름이 필요하다.
> 3. 신선한 이름을 `u`, `w`로 고르면 먼저 구조는 `∀u.∃w.(u<y ∧ y<w)`가 된다.
> 4. 이제 자유 `y`에만 `x+z`를 넣어 `∀u.∃w.(u<x+z ∧ x+z<w)`를 얻는다.
> 5. 결과의 자유 변수 집합은 치환의 자유 변수 공식대로 `{x,z}`다.
>
> **결론:** 바인더를 무조건 모두 바꾸는 것도 의미는 보존하지만, 충돌하는 이름만 바꾸면 계산과 비교가 쉬워진다.

> [!example] 연습 4 — 새 바인딩 syntax 설계
> 합 `sum v from e₀ to e₁ of e₂`를 정수식으로 추가한다고 하자. 어떤 항목을 정의해야 하는가?
>
> 1. abstract syntax: `v`, 아래·위 경계식 `e₀,e₁`, 본문 `e₂`를 받는 constructor를 추가한다. `v`는 본문에서만 바인더이고 경계식에서는 자유로 읽는 설계를 명시한다.
> 2. 의미: 먼저 현재 상태에서 두 경계를 계산하고, 그 정수 구간의 각 `n`에 대해 본문을 `[σ|v:n]`에서 계산해 합한다.
> 3. 자유 변수: `FV(e₀)∪FV(e₁)∪(FV(e₂)−{v})`다.
> 4. 치환: 경계식에는 그대로 적용하고, 본문에는 수량자와 같은 신선한 이름 선택 및 수정된 치환 맵을 적용한다.
> 5. 그 뒤 일치 정리와 치환 정리의 새 constructor 경우를 증명해야 언어 확장이 기존 메타이론과 호환된다.
>
> **결론:** 바인더를 추가한다는 것은 문법 한 줄을 더하는 일이 아니라 의미·자유 변수·치환·정리를 함께 확장하는 일이다.

> [!example] 연습 5 — 일치 정리 직접 적용
> `p ≡ ∀x.(x+y<z)`이고 두 상태가 `y`, `z`에서만 같다고 하자. `p`의 의미가 같음을 보여라.
>
> 1. 본문의 자유 변수는 `{x,y,z}`지만 수량자가 `x`를 제거하므로 `FV(p)={y,z}`다.
> 2. 가정이 정확히 `FV(p)`에서의 상태 일치를 준다.
> 3. 따라서 일치 정리를 즉시 적용해 `⟦p⟧σ=⟦p⟧σ'`를 얻는다.
> 4. 직접 증명한다면 각 `n`에 대해 두 상태를 `x:n`으로 갱신한 후 본문 변수 세 개에서 일치함을 확인해야 한다.
>
> **결론:** 정리는 반복되는 상태 추론을 한 번의 자유 변수 계산으로 압축한다.

> [!abstract] 도전 — 치환 합성 법칙의 증명 전략
> `(p/S)/S'`를 한 번의 치환 `p/S''`와 비교하려면 각 원래 자유 변수 `w`에서 `S''(w)`를 `(S(w))/S'`로 정의한다. 비바인더 constructor는 구조적 귀납으로 바로 맞아떨어진다. 바인더에서는 두 계산이 서로 다른 신선한 이름을 고를 수 있으므로 결과가 글자 그대로 같다고 기대하면 안 된다. 대신 이름변경 정리를 사용해 두 결과가 알파 동치임을 보이는 것이 정확한 결론이다.

### 워크숍을 마친 뒤 스스로 확인할 기준

- 수량자 개수 조건에서 증인, 범위, 서로 다름을 빠뜨리지 않았다.
- 치환 전 교체식의 자유 변수 집합부터 계산했다.
- 수량자 본문에서만 묶이는 이름과 경계식에서 자유인 이름을 구분했다.
- 정리 이름만 쓰지 않고 가정이 정리의 전제와 어떻게 맞는지 밝혔다.
- syntactic 동일성과 알파 동치를 구분했다.

> [!question] 이 절을 덮고 확인하기
> 1. 위 연습을 보지 않고 약수와 소수의 assertion을 다시 구성하라.
> 2. 새 바인딩 syntax을 추가할 때 함께 확장해야 하는 다섯 요소를 나열하라.
> 3. 치환 합성 결과가 문자 그대로 같지 않고 이름변경까지만 같을 수 있는 이유는 무엇인가?

### English companion — Practice workshop: calculate and prove from the definitions

*Work each problem on paper before reading the solution, then verify the order in which definitions were applied.*

> [!example] Practice 1 — Translate a counting statement
> Express: ‘There are at least two distinct integers greater than zero and less than four.’
>
> 1. Introduce existential variables `x` and `y` for the witnesses.
> 2. State the range constraints for both witnesses.
> 3. Include `x≠y` to enforce distinctness.
> 4. One answer is `∃x.∃y.(0<x ∧ x<4 ∧ 0<y ∧ y<4 ∧ x≠y)`.
> 5. ‘At most two’ can be expressed by universally quantifying three candidates and requiring an equality whenever all qualify.
>
> **Conclusion:** Counting claims become witness existence plus distinctness, or forced equality among too many candidates.

> [!example] Practice 2 — Divisibility and primality without division
> Assuming variables range over natural numbers, express that `d` divides `n` without division or remainder.
>
> 1. Use existence of a quotient: for some natural `k`, `n=d×k`.
> 2. Define the abbreviation `Divides(d,n) ≡ ∃k. n=d×k`.
> 3. A prime `p` is greater than one and has no divisors other than one and itself.
> 4. Thus `Prime(p) ≡ p>1 ∧ ∀d.((∃k.p=d×k)⇒(d=1∨d=p))`.
> 5. Over all integers rather than naturals, negative divisors and signs require additional care.
>
> **Conclusion:** The key technique is to reconstruct a forbidden operation through quantification over allowed operations.

> [!example] Practice 3 — Simultaneous substitution with minimal renaming
> Substitute `y↦x+z` into `∀x.∃z.(x<y ∧ y<z)`.
>
> 1. The replacement has free variables `{x,z}`.
> 2. Both binders conflict with those free variables and must be renamed.
> 3. With fresh `u,w`, alpha-rename to `∀u.∃w.(u<y ∧ y<w)`.
> 4. Replace only free `y`, yielding `∀u.∃w.(u<x+z ∧ x+z<w)`.
> 5. The resulting free-variable set is `{x,z}`, as predicted by the substitution law.
>
> **Conclusion:** Renaming every binder can preserve meaning, but renaming only conflicts keeps calculations readable.

> [!example] Practice 4 — Design a new binding construct
> Add an integer expression `sum v from e₀ to e₁ of e₂`. What must be defined?
>
> 1. Add a constructor receiving `v,e₀,e₁,e₂`, specifying that `v` binds only in the body, not in the bounds.
> 2. Evaluate bounds in the current state, then sum body values in `[σ|v:n]` over the integer interval.
> 3. Free variables are `FV(e₀)∪FV(e₁)∪(FV(e₂)−{v})`.
> 4. Substitute normally in the bounds; in the body use the same fresh-name discipline as a quantifier.
> 5. Prove new cases of the Coincidence and Substitution Theorems to show compatibility with existing metatheory.
>
> **Conclusion:** Adding a binder means extending syntax, semantics, free variables, substitution, and metatheory together.

> [!example] Practice 5 — Apply the Coincidence Theorem
> Let `p ≡ ∀x.(x+y<z)` and suppose two states agree only at `y` and `z`. Show that `p` has the same meaning.
>
> 1. The body's free variables are `{x,y,z}`, and the quantifier removes `x`, giving `FV(p)={y,z}`.
> 2. The hypothesis gives agreement exactly on `FV(p)`.
> 3. The theorem immediately yields `⟦p⟧σ=⟦p⟧σ'`.
> 4. A direct proof would update both states at `x` with each `n` and establish agreement on all three body variables.
>
> **Conclusion:** The theorem compresses repeated state reasoning into one free-variable calculation.

> [!abstract] Challenge — Strategy for substitution composition
> To compare `(p/S)/S'` with one substitution, define `S''(w)=(S(w))/S'` on variables free in `p`. Nonbinding cases follow structurally. Binder cases may choose different fresh names, so the correct result is equality up to alpha-renaming rather than literal syntax equality.

### Self-check after the workshop

- Counting formulas include witnesses, ranges, and distinctness.
- Before substitution, the replacement's free-variable set was computed.
- Binder scope was distinguished from expressions outside the scope.
- Applications of theorems explicitly matched hypotheses to theorem premises.
- Literal syntactic equality was distinguished from alpha-equivalence.

> [!question] Retrieval check
> 1. Reconstruct the divisibility and primality assertions without looking back.
> 2. List five components that must be extended when adding a new binding construct.
> 3. Why may substitution composition agree only up to renaming rather than literal syntax equality?

---

## 10. 네 도구를 하나의 흐름으로 연결하기 — 1장 종합 · 4분

> [!abstract] 이 절의 중심
> 1장의 개별 정의는 하나의 언어를 설계하고 검증하는 반복 가능한 절차를 이룬다.

### 1장의 전체 논증

- 먼저 표면 문자열에서 독립된 구절 종류와 constructor를 정한다. 단사성·서로소 치역·유한 생성이 재귀와 귀납의 토대를 만든다.
- 각 구절 종류에 알맞은 의미 영역을 고르고, 모든 constructor에 syntax-directed 의미 방정식을 하나씩 준다.
- syntax-directedness과 초기성으로 의미 함수의 존재·유일성과 합성성을 얻는다.
- semantics으로 상태에서의 참과 타당성을 정의하고, 추론 규칙의 건전성으로 증명 가능성을 의미적 참에 연결한다.
- 바인더가 있으면 자유 변수와 캡처 회피 치환을 구조적으로 정의하고, 일치·치환·이름변경 정리로 이름 조작이 의미를 보존함을 증명한다.

이 흐름은 뒤에서 그대로 확대된다. 2장은 assertion 대신 명령을 추가하고 의미 영역을 부분 상태 변환으로 바꾼다. 3장은 타당한 산술 assertion을 이용해 프로그램 명세의 추론 규칙을 만든다. 10장에서는 수량자 대신 람다가 이름을 묶고 베타 축약이 치환을 요구한다. 11장에서는 syntactic substitution 대신 환경과 클로저가 같은 의미 효과를 구현한다. 타입 장에서는 ‘의미 값’ 대신 타입 판단을 constructor에 맞춘 규칙으로 유도한다.

1장을 제대로 이해했다는 기준은 기호를 외우는 것이 아니다. 처음 보는 언어 기능을 만났을 때 ‘추상 constructor는 무엇인가, 의미 함수의 형식은 무엇인가, 각 constructor의 방정식은 부분 의미만 쓰는가, 어떤 이름을 묶는가, 치환 정리가 계속 성립하는가’를 스스로 묻는다면 이 장의 도구를 얻은 것이다.

> [!tip] 2장으로 가져갈 질문
> 논리식은 모든 상태에서 즉시 진릿값을 내는 전체 함수로 해석할 수 있었다. 하지만 `while true do skip` 같은 명령은 최종 상태를 내지 않는다. syntax-directedness과 합성성을 유지하면서 ‘결과가 없음’을 수학적 의미에 넣으려면 어떤 값과 어떤 순서 구조가 필요한가? 이 질문이 도메인과 최소 고정점으로 이어진다.

> [!question] 이 절을 덮고 확인하기
> 1. 처음 보는 `let v=e in p` syntax을 추가한다면 1장의 순서에 따라 무엇부터 무엇까지 정의할지 설계안을 써 보라.
> 2. 1장의 네 도구 가운데 2장에서 가장 직접적으로 수정될 도구와 그 이유를 말하라.

### English companion — Connecting the four tools into one workflow

*The chapter's definitions form a repeatable workflow for designing and validating a language.*

### The complete argument of Chapter 1

- Define phrase sorts and constructors independently of surface strings; injectivity, disjointness, and finite generation support recursion and induction.
- Choose semantic domains and give one syntax-directed equation per constructor.
- Syntax direction and initiality give existence, uniqueness, and compositionality.
- Use semantics to define truth and validity, then soundness to connect derivability with semantic truth.
- For binders, define free variables and capture-avoiding substitution, then prove coincidence, substitution, and renaming results.

The same workflow scales. Chapter 2 adds commands and partial state transformers; Chapter 3 builds program-proof rules; lambda abstraction introduces another binder and beta-reduction uses substitution; closures implement equivalent environment behavior; type systems derive judgments by syntax-directed rules.

Mastery is not symbol memorization. It is the habit of asking of a new construct: what is its abstract constructor, what semantic type is appropriate, is the equation compositional, which names are bound, and does substitution still respect meaning?

> [!tip] Question to carry into Chapter 2
> Assertions could be interpreted as total functions, but a command such as `while true do skip` produces no final state. How can absence of a result be represented while preserving syntax direction and compositionality? This leads to domains and least fixed points.

> [!question] Retrieval check
> 1. Design the additions needed for a new construct `let v=e in p`, following the chapter's workflow.
> 2. Which of the four tools changes most directly in Chapter 2, and why?

# 압축 복습

## 1단계 — 표기에서 구조를 떼어내기 — §1.1

추상 문법은 괄호·우선순위 같은 표기상의 우연을 버리고 constructor와 부분구조만 남긴다.

표현식은 문자열이 아니라 constructor로 만든 트리다. 따라서 의미 함수와 증명은 문자열 모양이 아닌 트리의 구성 방식에 따라 정의할 수 있다. 이것이 syntax-directed definition과 구조적 귀납법의 기반이다.

> [!question] 책을 덮고 답해 보기
> `x + y × z`를 구체 표기와 constructor 트리 두 방식으로 써 보라.

### English companion

An abstract grammar discards notational accidents such as parentheses and precedence, retaining constructors and substructure.

An expression is a tree built by constructors, not a character string. Semantics and proofs can therefore follow the way the tree is built. This supports syntax-directed definitions and structural induction.

---

## 2단계 — 상태에서 의미로 — §1.2

자유 변수가 있는 식의 의미는 값 하나가 아니라 상태를 값으로 보내는 함수다.

상태 σ가 각 변수에 정수를 배정한다면 정수식은 Σ→ℤ, assertion은 Σ→𝔹로 해석된다. 각 constructor의 의미를 부분식의 의미만으로 정의하면 semantics은 합성적이다.

> [!question] 책을 덮고 답해 보기
> σ(x)=2, σ(y)=5일 때 `x+y<10`의 의미를 계산하라.

### English companion

The meaning of an open expression is not one value but a function from states to values.

If a state σ assigns an integer to every variable, integer expressions denote Σ→ℤ and assertions denote Σ→𝔹. Defining each constructor from only the meanings of its immediate parts makes the semantics compositional.

---

## 3단계 — 진리와 증명을 분리하기 — §1.3

타당성은 모든 상태에서 참이라는 semantic 개념이고, 유도 가능성은 규칙으로 증명할 수 있다는 syntactic 개념이다.

건전성은 증명 가능한 것이 모두 타당함을 보장한다. 더 강한 assertion은 더 적은 상태를 허용한다는 역방향 포함 관계도 이후 프로그램 명세 규칙에서 중요해진다.

> [!question] 책을 덮고 답해 보기
> `false`가 모든 assertion보다 강하고 `true`가 모든 assertion보다 약한 이유를 상태 집합으로 설명하라.

### English companion

Validity is semantic truth in every state; derivability is the syntactic existence of a proof from rules.

Soundness guarantees that every derivable assertion is valid. The reverse-inclusion intuition for stronger assertions becomes important in later program-specification rules.

---

## 4단계 — 이름 포획을 피하는 치환 — §1.4

바인더는 범위를 만들며, 단순한 텍스트 치환은 자유 변수를 우연히 묶을 수 있다.

치환 전에 충돌하는 바운드 변수를 새 이름으로 바꾸고, 자유 변수에만 동시에 치환한다. 일치 정리, 치환 정리, 이름변경 정리는 syntactic manipulation과 의미가 맞물린다는 핵심 안전장치다.

> [!question] 책을 덮고 답해 보기
> `∀y. x<y`에 `y+1`을 x 대신 넣을 때 왜 먼저 y를 바꿔야 하는가?

### English companion

A binder creates a scope, and naive textual substitution can accidentally bind a free variable.

Rename conflicting bound variables before simultaneously replacing free occurrences. Coincidence, substitution, and renaming theorems are the key guarantees that syntax manipulation respects meaning.

## 자체 점검 퀴즈

### Q1. 합성적 semantics의 핵심 조건은?

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
- B. 타당성은 semantic이고 유도 가능성은 syntactic이다 / Validity is semantic; derivability is syntactic
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
