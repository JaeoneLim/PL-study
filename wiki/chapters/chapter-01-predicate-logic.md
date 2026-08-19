---
type: chapter
title: "01. Predicate Logic"
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

# 01. Predicate Logic

> [!abstract] At a glance
> 익숙한 Predicate Logic을 작은 object language로 삼아 abstract syntax, denotational semantics, inference rule, binding을 분리한다. AST, evaluator, verifier에서 이미 접한 구현 문제를 정확한 definition과 연결하며, 이 네 도구는 뒤의 모든 언어 정의에서 반복된다.
>
> **English:** Predicate logic is used as a familiar laboratory for separating abstract syntax, denotational semantics, inference rules, and binding. The same four tools recur throughout the book.

## Learning objectives

- 구체 표기와 abstract syntax 트리를 구분한다.
  - EN: Distinguish concrete notation from abstract syntax trees.
- state를 입력으로 받는 semantic function으로 expression과 assertion을 해석한다.
  - EN: Interpret expressions and assertions as semantic functions of states.
- free variable, capture-avoiding substitution, alpha-renaming의 관계를 설명한다.
  - EN: Explain free variables, capture-avoiding substitution, and alpha-renaming.

## Key terms

- **abstract syntax**
- **initial algebra**
- **compositionality**
- **validity**
- **structural induction**
- **capture-avoiding substitution**

## Chapter glossary

> [!info] How to use analogies
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### predicate logic

대상의 값과 관계를 변수, 논리 연산자, 그리고 ‘모든’·‘어떤’ 같은 수량자로 표현하는 논리 체계다. 명제가 한 비트의 참·거짓이라면, predicate는 입력값에 따라 참·거짓이 달라지는 조건이다.

> [!example] Engineering view
> SystemVerilog assertion에서 `req |-> ack`가 신호에 대한 조건을 쓰듯, `x < y`는 x와 y가 정해질 때 판정되는 조건이다. `∀x`는 가능한 모든 x를 검사한다는 수학적 표현이다.

**English definition:** A logic for expressing values and relationships with variables, logical connectives, and quantifiers such as “for every” and “there exists.” If a proposition is one true/false bit, a predicate is a condition whose bit depends on its inputs.

> [!example] Engineering view
> Like a SystemVerilog assertion such as `req |-> ack`, `x < y` states a condition on signals or values. The quantifier `∀x` says the condition must pass for every possible x.

```text
∀x. P(x)    ∃x. P(x)
```

### syntax

어떤 표현이 언어의 올바른 모양인지 정하는 규칙이다. 아직 그 표현이 무엇을 계산하는지는 말하지 않는다.

> [!example] Engineering view
> HDL 문법이 `always_ff` 블록의 허용 형태를 정하지만 실제 회로 동작은 별도로 정의되는 것과 같다. 파서가 받아들인다는 사실과 설계가 원하는 동작을 한다는 사실은 다르다.

**English definition:** The rules that determine which expressions are well-formed in a language. Syntax alone does not say what those expressions compute.

> [!example] Engineering view
> An HDL grammar determines the legal shape of an `always_ff` block, while circuit behavior is defined separately. Being accepted by a parser is not the same as behaving as intended.

### semantics

올바른 syntax에 정확한 의미를 부여하는 규칙 또는 수학적 함수다. 프로그램이 어떤 결과, 상태 변화, 또는 관찰 가능한 동작을 만드는지 설명한다.

> [!example] Engineering view
> RTL 텍스트가 주어졌을 때 시뮬레이터가 시간에 따른 신호 값을 정하는 규칙에 가깝다. 같은 syntax라도 선택한 semantics이 다르면 초기화나 동시 실행을 다르게 해석할 수 있다.

**English definition:** Rules or mathematical functions that assign precise meanings to well-formed syntax. They explain the result, state change, or observable behavior produced by a program.

> [!example] Engineering view
> Think of the rules a simulator uses to turn RTL into signal values over time. The same-looking syntax can behave differently under different semantic rules for initialization or concurrency.

```text
⟦syntax⟧ = meaning
```

### state

특정 순간에 각 변수에 저장된 값을 한꺼번에 나타낸 지도다. 식의 의미는 대개 상태를 입력받아 값을 내놓는 함수로 정의된다.

> [!example] Engineering view
> 한 클록 경계에서 레지스터 파일 전체를 찍은 스냅샷을 떠올리면 된다. `σ(x)=3`은 상태 σ에서 변수 x의 값이 3이라는 뜻이다.

**English definition:** A map containing the value stored in every variable at one instant. The meaning of an expression is often defined as a function from a state to a value.

> [!example] Engineering view
> Picture a snapshot of the complete register file at a clock boundary. `σ(x)=3` says that variable x contains 3 in state σ.

```text
σ : Variable → Value
```

### assertion

상태가 만족해야 하는 참·거짓 조건이다. 프로그램 명령이 아니라 프로그램이나 상태에 관해 우리가 확인하려는 주장이다.

> [!example] Engineering view
> `fifo_count <= DEPTH` 같은 설계 속성에 해당한다. assertion 자체가 FIFO를 제어하지는 않지만, 현재 상태가 안전 조건을 지키는지 판정한다.

**English definition:** A true-or-false condition that a state may satisfy. It is a claim about a program or state, not a command executed by the program.

> [!example] Engineering view
> It corresponds to a design property such as `fifo_count <= DEPTH`. The assertion does not control the FIFO; it checks whether the current state obeys a safety condition.

### abstract syntax

괄호, 공백, 우선순위처럼 표기에만 필요한 부분을 버리고 표현의 실제 트리 구조만 남긴 것이다.

> [!example] Engineering view
> 회로도에서 선의 색이나 블록 배치를 지우고 인스턴스와 연결 관계만 남긴 netlist와 비슷하다. `x+y*z`는 Add(x, Mul(y,z))라는 구조로 보존된다.

**English definition:** The tree structure of an expression after discarding notational details such as parentheses, whitespace, and precedence conventions.

> [!example] Engineering view
> It resembles a netlist that keeps instances and connectivity while discarding drawing layout and wire colors. `x+y*z` becomes the structure Add(x, Mul(y,z)).

### constructor

abstract syntax 트리에서 한 종류의 노드를 만드는 기본 형식이다. 상수, 덧셈, 수량자 등이 각각 constructor가 된다.

> [!example] Engineering view
> netlist의 AND 게이트나 플립플롭 셀 종류처럼, constructor는 노드가 무엇이며 몇 개의 하위 부품을 받는지 정한다. Add는 두 하위 식을 받는다.

**English definition:** A basic form that creates one kind of node in an abstract syntax tree. Constants, addition, and quantification are examples of constructors.

> [!example] Engineering view
> Like AND-gate or flip-flop cell kinds in a netlist, a constructor determines what a node is and how many children it takes. Add takes two subexpressions.

### carrier set

한 종류의 syntax node나 semantic value가 가질 수 있는 값을 모두 모은 집합이다. Chapter 1에서는 `IntExp`와 `Assert`가 각각 integer expression과 assertion을 담는 carrier set이다.

> [!example] Engineering view
> TypeScript의 `type Expr = Const | Add | Neg`가 가질 수 있는 모든 runtime value를 수학적 집합으로 본 것과 가깝다. constructor signature는 이 집합을 입력이나 출력으로 사용한다.

**English definition:** The set containing every possible value of one syntactic or semantic sort. In Chapter 1, `IntExp` and `Assert` are carrier sets for integer expressions and assertions.

> [!example] Engineering view
> Think of all runtime values admitted by a TypeScript union such as `type Expr = Const | Add | Neg`, viewed as a mathematical set. Constructor signatures use these sets as inputs and outputs.

```text
C+ : IntExp × IntExp → IntExp
```

### initial algebra

constructor로 유한하게 만들 수 있는 syntax만 담고, constructor가 강제하지 않은 추가 equality는 넣지 않은 구조다. 각 constructor를 처리하는 case를 정하면 다른 algebra로 가는 homomorphism이 정확히 하나 정해진다.

> [!example] Engineering view
> algebraic data type과 exhaustive fold를 떠올리면 된다. `Const`와 `Add` case의 handler를 모두 주면 evaluator든 pretty-printer든 전체 AST를 처리하는 recursive function이 하나로 결정된다.

**English definition:** A structure containing exactly the finite syntax generated by its constructors, with no extra equalities. Once every constructor is interpreted in a target algebra, exactly one homomorphism to that target is determined.

> [!example] Engineering view
> Think of an algebraic datatype with an exhaustive fold. Supplying handlers for `Const`, `Add`, and every other variant determines one recursive evaluator, pretty-printer, or other fold over the entire AST.

### compositionality

전체 표현의 의미가 바로 아래 부분 표현들의 의미와 현재 constructor만으로 결정되는 성질이다.

> [!example] Engineering view
> 계층형 하드웨어 검증에서 각 IP 블록의 계약과 연결만으로 상위 모듈 동작을 설명하는 방식과 닮았다. 내부 소스 문자열을 다시 들여다볼 필요가 없어야 한다.

**English definition:** The property that the meaning of a whole expression is determined solely by its constructor and the meanings of its immediate parts.

> [!example] Engineering view
> It resembles hierarchical hardware verification: explain a top module from each IP block’s contract and the wiring between them, without reopening their source text.

### validity

assertion이 특정 상태 하나가 아니라 고려하는 모든 상태에서 참인 성질이다. ‘증명 규칙으로 증명했다’는 유도 가능성과는 별개의 semantic 개념이다.

> [!example] Engineering view
> 테스트 벡터 몇 개가 통과한 것이 아니라 모든 합법적인 입력과 상태에서 속성이 성립한다는 요구와 같다. 형식 검증은 이 전칭 요구를 다룬다.

**English definition:** The property that an assertion is true in every state under consideration, not merely one state. It is a semantic notion distinct from derivability by proof rules.

> [!example] Engineering view
> It is the demand that a property hold for all legal inputs and states, rather than just passing a few test vectors. Formal verification targets this universal claim.

```text
⊨ P
```

### structural induction

숫자의 크기가 아니라 syntax 트리가 만들어지는 방식에 따라 성질을 증명한다. 각 기본 constructor와 각 재귀 constructor를 처리하면 모든 유한 트리를 다룬다.

> [!example] Engineering view
> 모든 계층형 설계에 대한 속성을 보이기 위해 leaf 셀을 확인하고, 속성을 만족하는 하위 모듈을 조합한 상위 모듈도 만족함을 확인하는 패턴과 같다.

**English definition:** A proof method that follows how syntax trees are built rather than the size of a number. Cover every base constructor and every recursive constructor to cover all finite trees.

> [!example] Engineering view
> It is like proving a property for every hierarchical design by checking leaf cells and then checking that each composition preserves the property when its submodules have it.

### capture-avoiding substitution

자유 변수를 다른 식으로 바꿀 때 새 식의 자유 이름이 주변 바인더에 우연히 묶이지 않도록 먼저 충돌하는 이름을 바꾸는 치환이다.

> [!example] Engineering view
> 계층을 평탄화할 때 서로 다른 모듈의 내부 신호 이름이 충돌하지 않도록 신호를 고유하게 바꾸는 것과 비슷하다. 텍스트만 복사하면 연결 대상이 달라질 수 있다.

**English definition:** Substitution that first renames conflicting binders so that free names in the inserted expression do not accidentally become bound.

> [!example] Engineering view
> It resembles uniquely renaming internal signals while flattening hierarchy so names from different modules do not collide. Blind textual copying can silently change connectivity.

## Detailed chapter map

> [!abstract] This chapter's role
> 이후 모든 장에서 사용할 세 가지 층위—syntax, 의미, 증명—를 분리하고 다시 연결하는 법을 세운다.
>
> **English:** Establishes how to separate and reconnect the three layers used throughout the book: syntax, semantics, and proof.

## The Chapter 1 vocabulary pipeline

> [!tip] First-pass terminology map
> 각 term은 독립된 암기 항목이 아니라 한 phrase가 글자에서 수학적 의미와 theorem으로 이동하는 과정의 한 단계다. 아래 화살표를 먼저 잡고, longform의 ∀x. x+0=x 예제에서 같은 연결을 확인한다.
>
> **English:** The terms are not isolated vocabulary items. Each names one stage in the path from written text to mathematical meaning and theorem. Learn the arrows first, then follow the same path through the worked ∀x. x+0=x example.

### `concrete syntax → parser → abstract syntax`

concrete syntax은 사람이 쓰는 문자열이고 parser는 표기 세부를 제거한 constructor tree를 만든다. semantics이 읽는 input은 원문 문자열이 아니라 이 abstract phrase다.

**English:** Concrete syntax is the written string. Parsing removes presentation details and produces the constructor tree—the abstract phrase consumed by semantics.

### `carrier set + constructor → initial algebra`

carrier set은 같은 phrase class의 가능한 모든 값을 모으고 constructor는 값을 만든다. constructor로 유한하게 생성된 값만 포함하는 자유로운 전체 구조를 initial algebra라고 한다.

**English:** Carrier sets collect phrases of each sort, while constructors build them. The freely generated structure containing exactly the finite constructor-built values is the initial algebra.

### `initial algebra → unique homomorphism → denotational semantics`

각 constructor를 target operation으로 해석하면 AST 전체를 target으로 보내는 구조 보존 map이 하나 정해진다. target을 state-dependent value function으로 선택한 경우가 denotational semantics이다.

**English:** Interpreting every constructor in a target determines one structure-preserving map over the whole AST. Choosing state-dependent value functions as the target yields denotational semantics.

### `state → truth in a state → validity`

state는 free variable의 값을 공급한다. assertion denotation을 state 하나에 적용하면 그 state에서의 truth를 얻고, 모든 state에서 true인지 물으면 validity가 된다.

**English:** A state supplies values for free variables. Applying an assertion denotation to one state gives truth there; requiring truth in every state gives validity.

### `inference rule → derivability → soundness → validity`

inference rule을 유한 번 연결해 proof를 만들 수 있으면 derivable하다. soundness는 derivability가 semantic validity를 보장한다는 방향의 theorem이며 두 definition을 같은 것으로 만들지는 않는다.

**English:** Finite use of inference rules gives derivability. Soundness is the theorem that derivability implies semantic validity; it does not collapse the two definitions.

### `binder → scope → free/bound occurrence → substitution`

binder는 scope 안의 occurrence를 bound로 만든다. substitution은 free occurrence만 바꾸며, replacement의 free variable이 새 binder에 capture되지 않도록 fresh renaming을 사용한다.

**English:** A binder makes governed occurrences bound. Substitution rewrites free occurrences and uses fresh renaming to prevent replacement variables from being captured by a binder.

### §1.1 · Abstract syntax and structural definition

논리식의 표면 표기 대신 항과 공식의 constructor를 정의한다. 이 구조는 재귀 함수와 구조적 귀납법의 기준이 된다.

**English — Abstract syntax and structural definition:** Defines constructors for terms and formulas independently of surface notation. That structure supports recursive functions and structural induction.

### §1.2 · Denotational meaning through environments

변수 환경과 기호 해석을 입력으로 받아 항은 값으로, 공식은 진릿값으로 보낸다. 의미 함수의 각 절은 syntax constructor에 대응한다.

**English — Denotational meaning through environments:** Given a variable environment and an interpretation of symbols, terms denote values and formulas denote truth values. Each semantic clause follows a syntax constructor.

### §1.3 · Validity and inference

한 해석에서 참인 것, 모든 환경에서 참인 것, 모든 해석에서 타당한 것을 구분한다. 추론 규칙은 전제가 참일 때 결론도 참이라는 건전성 기준으로 평가한다.

**English — Validity and inference:** Distinguishes truth in one interpretation, truth under every environment, and validity across interpretations. Inference rules are judged by sound preservation of truth.

### §1.4 · Binding, renaming, and substitution

자유·결박 변수를 정의하고 캡처 회피 치환을 구성한다. 대입 보조정리는 syntactic substitution과 환경 갱신이 같은 의미 효과를 낸다는 연결 고리다.

**English — Binding, renaming, and substitution:** Defines free and bound variables and constructs capture-avoiding substitution. The substitution lemma connects syntactic replacement with semantic environment update.

## What to retain

- abstract syntax은 파싱 결과이며, 의미와 증명은 그 트리 위에서 재귀적으로 정의된다.
  - EN: Abstract syntax is the result of parsing; semantics and proofs are recursively defined over that tree.
- 의미는 기호 자체가 아니라 해석과 환경에 상대적이다.
  - EN: Meaning is relative to an interpretation and an environment, not inherent in a symbol.
- 치환 정리는 이후 선언, 함수 호출, 베타 축약의 정확성을 지탱한다.
  - EN: Substitution results later support declarations, function calls, and beta-reduction.

> [!warning] Common confusions
> - 공식이 특정 환경에서 참이라는 말과 논리적으로 타당하다는 말을 혼동하지 않는다.
>   - EN: Do not confuse truth under one environment with logical validity.
> - 문자열 치환은 변수를 포획할 수 있으므로 바인더 이름 변경이 필요하다.
>   - EN: Textual replacement can capture variables, so bound-variable renaming may be required.

# Chapter 1 complete study text (65 MIN READ)

이 본문은 PL 이론이나 수리논리학을 배운 적 없는 엔지니어를 기준 독자로 삼는다. AST, 함수, map, unit test처럼 익숙한 구현 개념에서 시작해 definition과 proof로 이동한다. 수학 notation이 먼저 나왔더라도 외우지 말고, 바로 뒤의 코드 관점 설명과 worked example에서 어떤 문제를 해결하는지 확인하자.

1장의 목적은 Predicate Logic 자체를 깊이 공부하는 데만 있지 않다. 익숙한 정수식과 논리식을 작은 object language로 삼아 abstract syntax, denotational semantics, inference rule, binding을 서로 분리한다. 2장 이후에는 object language만 바뀌고 같은 질문이 반복된다. 어떤 syntax을 허용하는가? 그 syntax은 무엇을 뜻하는가? 어떤 statement를 rule로 증명할 수 있는가? scope와 substitution은 의미를 어떻게 보존하는가?

한국어 본문에서도 canonical technical term은 번역하지 않는다. syntax, semantics, statement, assertion, constructor뿐 아니라 Predicate Logic, carrier set, initial algebra, homomorphism도 영문 표기를 유지한다. 영문을 아는 것이 이해라고 가정하지는 않는다. term이 처음 등장할 때 한국어 문장으로 역할을 풀고, 구현 예와 수식에서 같은 개념을 다시 연결한다. 이 정책은 장과 절 제목에도 적용한다. 목차와 원문을 나란히 놓았을 때 같은 이름을 바로 찾을 수 있고, 번역어와 원어를 다시 대응시키는 비용을 크게 줄일 수 있다.

각 절은 ‘왜 필요한가 → 정확한 definition → 손으로 따라가는 example → retrieval check’ 순서로 읽는다. 처음 읽을 때 proof의 모든 세부를 재현하지 못해도 괜찮다. 입력이 무엇이고 출력이 무엇인지, 그리고 definition이 어떤 ambiguity나 bug를 막는지만 설명할 수 있으면 다음 절로 진행해도 된다. 막히면 가장 가까운 worked example로 돌아가 입력을 바꿔 다시 계산해 보자.

읽는 흐름도 미리 잡아 두자. 먼저 문자열을 AST와 분리하고, AST를 특정 클래스 구현이 아닌 constructor의 계약으로 설명한다. 다음으로 AST를 state-dependent function에 연결해 meaning을 계산한다. 그 뒤 ‘모든 state에서 참’과 ‘rule로 증명 가능’을 분리하고, 마지막으로 binder 아래에서 이름을 안전하게 바꾸는 방법을 배운다. 앞부분은 compiler front end와 interpreter에, 뒷부분은 type checker, optimizer, verifier에 직접 이어진다. 한 절을 마칠 때마다 새 term의 사전식 번역을 암기하는 대신, 익숙한 도구의 어느 책임에 대응하는지 한 문장으로 말해 보자. 그 연결을 설명할 수 있으면 notation의 세부를 잠시 잊어도 다음 학습에서 다시 복구할 수 있다.

> [!info] English introduction
> This lesson assumes an engineer who knows ordinary programming but has not studied PL theory or mathematical logic. It starts from familiar implementation ideas—ASTs, functions, maps, and tests—and then moves to definitions and proofs. When notation appears, use the explanation and worked example to identify the problem it solves before trying to memorize it.
>
> The goal is not merely to review predicate logic. A familiar logic serves as a laboratory for four tools—abstract syntax, denotational semantics, inference rules, and binding. Later chapters change the object language but repeatedly ask the same questions: which phrases exist, what they mean, what can be proved by rules, and how scope and substitution preserve meaning.
>
> The Korean text preserves canonical technical terms rather than translating them: syntax, semantics, statement, assertion, constructor, Predicate Logic, carrier set, initial algebra, and homomorphism. The same policy applies to chapter and section headings so readers can align the study guide with the source table of contents. English labels are still explained in plain language and connected to implementation examples and notation.
>
> Read each section in the order: motivation → precise definition → worked example → retrieval check. On a first pass, reproducing every proof detail is unnecessary. Move on once you can name the inputs and outputs of a definition and explain which ambiguity or bug it prevents.
>
> The reading path is: separate strings from ASTs; describe ASTs by constructor contracts rather than one class implementation; map ASTs to state-dependent meanings; distinguish truth in all states from provability by rules; and finally manipulate names safely under binders. The first half connects to compiler front ends and interpreters, the second to type checkers, optimizers, and verifiers.

## 01. Why a programming-languages book begins with Predicate Logic — 도입 · pp. 1 · 9 min

> [!abstract] Section focus
> 낯선 방법을 익숙한 대상에 먼저 적용하면 방법 자체를 선명하게 볼 수 있다.

컴파일러 pipeline을 떠올려 보자. source string은 parser를 지나 AST가 되고, evaluator나 code generator는 그 AST의 동작을 정하며, type checker나 verifier는 별도의 rule로 판단을 만든다. 이 층들을 한꺼번에 설명하면 괄호를 어디에 붙이는 문제, 무엇을 계산하는 문제, 계산이 옳다고 보이는 문제가 뒤섞인다. 1장은 작은 언어 하나를 사용해 이 층들을 의도적으로 분리한 뒤 다시 연결한다.

Predicate Logic은 이 연습에 알맞은 첫 object language다. 정수식과 Boolean condition은 엔지니어에게 이미 익숙하므로 새 언어 기능보다 설명 방법에 집중할 수 있다. 또한 이 장의 식은 항상 정수나 truth value를 내므로 nontermination과 partial information은 잠시 미룬다. 3장에서는 여기서 만든 assertion language를 명령형 프로그램의 precondition과 postcondition에 그대로 사용한다.

이 책의 용어는 전통 논리학과 조금 다르다. 논리학의 항(term)은 정수식(integer expression), 잘 형성된 공식은 assertion, 변수에 값을 배정하는 assignment는 상태(state)라고 부른다. 이런 명칭은 곧 등장할 프로그래밍 언어와 어휘를 맞추려는 선택이다. 여기서 상태는 프로그램 메모리를 아직 뜻하지 않고, 각 변수 이름에 정수 하나를 대응시키는 함수다.

> [!tip] Chapter 1 vocabulary map: from source text to theorem
> concrete syntax (구체 표기)는 사람이 쓰는 문자열과 괄호·우선순위 같은 표기 규칙이다. parser는 이를 읽어 abstract syntax (추상 구조), 즉 표기법을 지운 phrase structure (구절 구조)를 만든다. `x+0`이라는 source text와 `Add(Var(x),Const(0))`이라는 AST는 같은 phrase를 서로 다른 층에서 나타낸다. 따라서 syntax은 단순히 ‘코드 문자열’이 아니라 어떤 phrase가 존재하고 어떻게 구성되는지를 정하는 구조다.
>
> carrier set (운반 집합)은 한 phrase class에 속하는 모든 abstract phrase의 모음이고, constructor (구성자)는 그 원소를 만드는 operation이다. constructor만 유한 번 적용해 얻는 자유로운 구조가 initial algebra다. 각 constructor를 target mathematical operation으로 해석하면 AST 전체를 target으로 보내는 unique homomorphism (유일 준동형), 즉 구조를 보존하는 fold가 정해진다. target이 integer와 Boolean function이면 그 fold가 denotational semantics (denotation 기반 의미 정의)다.
>
> state (상태)는 free variable (자유 변수)의 값을 공급하는 input이고, denotation (지시 대상)은 phrase가 나타내는 수학적 object다. 따라서 free variable이 있는 expression의 denotation은 정수 하나가 아니라 `state → integer` function이다. assertion의 denotation을 한 state에 apply하면 truth in that state (그 상태에서의 참)를 얻고, 모든 state에서 true인지 물으면 validity (타당성)를 얻는다. inference rules (추론 규칙)로 finite proof를 만들 수 있는지는 derivability (유도 가능성)이며, soundness (건전성)가 `derivable ⇒ valid`를 연결한다.
>
> binder (바인더)는 scope (범위)를 만들고 그 안의 같은-name occurrence를 bound occurrence (결속 출현)로 만든다. binder가 지배하지 않는 occurrence는 free occurrence (자유 출현)이며 state에서 값을 읽는다. substitution (치환)은 free occurrence만 바꾸고, 새 binder가 교체식의 free variable을 붙잡는 variable capture (변수 포획)를 피해야 한다. 이 연결 때문에 binding은 인쇄된 이름의 문제가 아니라 denotation을 보존하기 위한 syntax 구조다.

> [!example] One assertion traced through the vocabulary
> assertion `∀x. x+0=x` 하나를 source text에서 theorem까지 추적한다.
>
> 1. 문자열과 precedence rule은 concrete syntax이다. parsing 뒤 가장 바깥 node는 quantifier constructor이고 body에는 equality와 addition constructor가 중첩된다. 이 constructor tree가 abstract syntax이다.
> 2. `Assert`와 `IntExp`가 carrier set이고 `Forall`, `Equal`, `Add`, `Var`, `Const`가 constructor다. 이 tree가 모두 finite constructor application으로 만들어졌다는 사실이 initial-algebra 관점이다.
> 3. semantic homomorphism은 각 constructor case를 따라 tree를 해석한다. `∀x`는 임의의 state `σ`에서 모든 integer `n`을 시험하도록 state를 `[σ|x:n]`으로 update하고, body는 `n+0=n`으로 계산된다.
> 4. 모든 `n`과 모든 original state에서 body가 true이므로 assertion은 valid하다. 이는 semantic statement `⊨ ∀x. x+0=x`다.
> 5. proof system이 이를 derive하면 `⊢ ∀x. x+0=x`라고 쓴다. soundness는 이 proof가 validity를 보장하지만, validity의 definition 자체가 proof라는 뜻은 아니다.
> 6. binder `x`를 fresh `z`로 바꾼 `∀z. z+0=z`는 α-renaming으로 같은 denotation을 갖는다. 이 예에는 free occurrence가 없으므로 바깥 state의 variable value는 result에 영향을 주지 않는다.
>
> **결론:** 이 한 예에서 syntax는 ‘무엇이 만들어졌는가’, semantics은 ‘그것이 무엇을 뜻하는가’, proof system은 ‘어떤 rule로 그 truth를 인증하는가’, binding은 ‘어떤 occurrence가 state 대신 binder의 값을 쓰는가’를 각각 담당한다.

### Four questions to ask of every later language

- syntax: 어떤 종류의 구절이 있으며 어떤 constructor로 만들어지는가?
- semantics: 각 구절은 어떤 수학적 대상을 나타내는가?
- 증명: 어떤 형식의 판단을 어떤 규칙으로 유도할 수 있는가?
- 바인딩: 이름을 묶는 syntax은 범위·자유 변수·치환을 어떻게 바꾸는가?

> [!tip] Reading lens
> 이 장에서 나오는 정의를 논리학 상식의 반복으로 넘기지 말자. 각각은 뒤에서 명령, 함수, 타입, 모듈을 설명할 때 그대로 재사용되는 설계 패턴이다. 특히 ‘syntax을 먼저 정하고, 그 구조를 따라 의미 함수를 정의한다’는 순서는 책 전체의 뼈대다.

> [!question] Retrieval check
> 1. Predicate Logic에서는 당장 다루지 않아도 되지만 2장에서 반드시 추가해야 하는 계산 현상은 무엇인가?
> 2. 전통 논리학의 term, formula, assignment를 이 책은 각각 무엇이라 부르는가?

### English companion — Why a programming-languages book begins with Predicate Logic

*Applying unfamiliar methods to a familiar object makes the methods themselves easier to see.*

A rigorous account of a programming language needs more than intuition about source code. The same program has surface notation, parsed structure, mathematical meaning, execution rules, and a proof system. Chapter 1 deliberately separates these layers and then reconnects them.

Predicate logic is a good first object for three reasons. Its arithmetic and logical notation are familiar; every expression receives an ordinary value, postponing divergence and partial information; and the assertion language becomes the specification language for imperative programs in Chapter 3.

The terminology is chosen to align logic with later programming languages: terms become integer expressions, formulas become assertions, and assignments of values to variables become states. At this point a state is simply a function from variable names to integers, not yet a machine store.

> [!tip] Chapter 1 vocabulary map: from source text to theorem
> Concrete syntax is the written string together with parsing conventions such as parentheses and precedence. A parser turns it into abstract syntax—the phrase structure with presentation details removed. The source `x+0` and the AST `Add(Var(x),Const(0))` represent one phrase at different layers. Syntax therefore specifies which phrases exist and how they are built, not merely which strings can be typed.
>
> A carrier set contains all abstract phrases of one syntactic class, and constructors build its members. The freely generated structure obtained by finitely applying constructors is the initial algebra. Once every constructor is interpreted by a target mathematical operation, a unique structure-preserving fold—a homomorphism—maps every AST into that target. When the target consists of integer- and Boolean-valued functions, that fold is the denotational semantics.
>
> A state supplies values for free variables, while a denotation is the mathematical object represented by a phrase. An open expression therefore denotes a function from states to integers, not one integer. Applying an assertion denotation to one state gives truth in that state; quantifying over every state gives validity. Derivability asks whether inference rules build a finite proof, and soundness connects the axes by guaranteeing `derivable ⇒ valid`.
>
> A binder creates a scope and makes governed same-name occurrences bound. An occurrence not governed by a binder is free and obtains its value from the state. Substitution rewrites only free occurrences and must avoid variable capture, where a new binder accidentally governs a variable introduced by the replacement. Binding is therefore semantic structure, not merely a property of printed names.

> [!example] One assertion traced through the vocabulary
> Trace the assertion `∀x. x+0=x` from source text to theorem.
>
> 1. The string and precedence rules belong to concrete syntax. After parsing, the outer node is a quantifier constructor whose body nests equality and addition constructors. That constructor tree is the abstract syntax.
> 2. `Assert` and `IntExp` are carrier sets; `Forall`, `Equal`, `Add`, `Var`, and `Const` are constructors. The fact that the tree is built entirely by finite constructor applications is the initial-algebra view.
> 3. The semantic homomorphism interprets the tree constructor by constructor. In an arbitrary state `σ`, `∀x` tests every integer `n` by updating the state to `[σ|x:n]`; the body evaluates to `n+0=n`.
> 4. Because the body is true for every `n` and every original state, the assertion is valid: the semantic statement `⊨ ∀x. x+0=x`.
> 5. If the proof system derives it, we write `⊢ ∀x. x+0=x`. Soundness ensures that such a proof implies validity; it does not identify validity with proof.
> 6. Renaming binder `x` to fresh `z` gives `∀z. z+0=z`, with the same denotation by alpha-renaming. The phrase has no free occurrences, so values supplied by the outer state cannot affect its result.
>
> **Conclusion:** In one example, syntax says what was built, semantics says what it means, the proof system says how its truth may be certified by rules, and binding says which occurrences obtain values from a binder rather than the outer state.

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

## Separating strings from syntactic structure — §1.1 · pp. 1–3 · 6 min

> [!abstract] Section focus
> 프로그램은 문자로 입력되지만 의미가 붙는 대상은 문자 배열이 아니라 파싱된 syntax structure다.

자연수 12는 문자 ‘1’과 ‘2’의 연결 그 자체가 아니다. 십진 문자열, 이진 문자열, 로마 숫자는 같은 수를 서로 다르게 나타낸다. 마찬가지로 `x + y`, `add(x,y)`, 루트가 `+`인 트리는 하나의 덧셈 구조를 다른 방식으로 표현한다. 의미 함수를 문자 위치와 괄호 개수에 맞추어 정의하면 표현을 바꿀 때마다 semantics도 다시 써야 한다. 그래서 semantics의 입력은 구체 문자열이 아니라 추상 구절이어야 한다.

보통의 문맥 자유 문법은 어떤 문자열이 허용되는지 말하는 데 훌륭하지만, syntax structure와 표기상의 선택을 함께 적는다. 변수의 철자, 연산자가 앞에 오는지 가운데 오는지, 우선순위와 결합 방향은 파서에는 중요해도 덧셈이라는 구성의 본질은 아니다. 추상 문법은 비단말 기호와 부분구절의 배열로 구조를 드러내면서도, 사람이 읽을 최소한의 표기를 곁들인 절충 형식이다.

실무에서는 이 경계를 parser API에서 확인할 수 있다. parser test는 공백이나 괄호가 다른 두 source가 같은 AST를 만드는지 검사할 수 있고, optimizer test는 AST 이후 단계만 다룬다. pretty-printer가 다시 문자열을 만들더라도 원래 공백과 괄호를 그대로 복원할 필요는 없다. source의 표기 정보와 이후 단계에 필요한 구조 정보가 서로 다른 책임이라는 뜻이다. 이 구분을 해 두면 grammar를 바꿔도 evaluator와 proof를 다시 설계할 필요가 줄어든다.

### Core phrase classes in Chapter 1

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

> [!example] From surface notation to a constructor tree
> `x + y × z < 10 ∧ ¬(x = 0)`을 구조로 읽어 보자.
>
> 1. 곱셈이 덧셈보다 먼저 묶이므로 왼쪽 정수식은 `x + (y × z)`다.
> 2. 관계 연산 `<`가 두 정수식을 받아 assertion `x + (y × z) < 10`을 만든다.
> 3. `¬`가 등식 assertion `x = 0`을 감싸고, 마지막으로 `∧`가 두 assertion을 결합한다.
> 4. constructor expression으로는 대략 `C∧(C<(C+(Cvar(x), C×(Cvar(y), Cvar(z))), C10), C¬(C=(Cvar(x), C0)))`이다.
>
> **결론:** 이 트리가 확정된 뒤에는 중위 표기나 우선순위가 달라져도 같은 abstract syntax을 가리킬 수 있다.

> [!warning] Do not confuse BNF with the AST
> 문법에 `e + e`라고 적혀 있다는 사실은 `+` 문자가 추상 구절 안에 저장된다는 뜻이 아니다. 추상 구절에는 ‘두 정수식으로 덧셈을 구성했다’는 정보만 있으면 된다. 괄호와 우선순위는 파싱 과정에서 할 일을 마친다.

> [!question] Retrieval check
> 1. `¬x = 0 ∨ y < 3`에 필요한 괄호를 모두 복원하고 가장 바깥 constructor를 말해 보라.
> 2. 연산자 우선순위가 semantics이 아니라 concrete syntax의 문제인 이유를 설명하라.

### English companion — Separating strings from syntactic structure

*Programs arrive as characters, but semantics is assigned to parsed syntactic structure rather than raw strings.*

The natural number twelve is not identical to the characters ‘1’ and ‘2’; decimal, binary, and Roman notation can represent the same number. Likewise, `x + y`, `add(x,y)`, and a tree rooted at `+` can represent one addition structure. Semantic functions should consume abstract phrases rather than character positions and parentheses.

A context-free grammar is excellent for recognizing strings but mixes structural information with representational choices: spelling, prefix versus infix notation, precedence, and associativity. An abstract grammar keeps the sorts and subphrase pattern while retaining only enough notation to remain readable.

This boundary appears in a parser API. Parser tests may check that differently spaced or parenthesized sources produce the same AST, while optimizer tests start from the AST. A pretty-printer need not recover the original whitespace. Separating notation from structure lets grammar changes leave evaluators and proofs intact.

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

## Carriers, constructors, and the initial-algebra view — §1.1 · pp. 3–8 · 7 min

> [!abstract] Section focus
> 이 절의 algebra 용어는 AST 구현을 더 추상적으로 설명하는 interface라고 읽으면 된다.

Rust enum이나 TypeScript discriminated union으로 AST를 정의한다고 생각하자. `IntExp`와 `Assert`는 각 node 종류의 모든 가능한 값을 모은 type에 가깝다. algebra에서는 이런 집합을 carrier set이라고 한다. grammar production은 carrier set 사이의 constructor function이 된다. 예를 들어 `Cvar : Var → IntExp`, `C+ : IntExp × IntExp → IntExp`, `C∀ : Var × Assert → Assert`다. 이 표기는 각 constructor가 무엇을 입력받고 어떤 phrase kind를 만드는지 적은 API signature다.

상수처럼 child가 없는 constructor도 0-argument factory로 보면 어렵지 않다. 수학에서는 원소가 하나인 집합 `1`에서 carrier set으로 가는 함수 `C0 : 1 → IntExp`로 쓴다. 구현에서는 보통 모든 정수 상수를 `Const(n)` 하나로 합친다. 표기가 달라도 constructor의 arity와 argument type이 직접 child를 정한다는 점은 같다.

여기서 세 층을 섞지 않는 것이 중요하다. carrier set은 만들 수 있는 값들의 전체 범위이고, constructor는 그 값 하나를 만드는 조립 방법이며, concrete tree나 object는 그 조립 방법을 실제로 적용한 결과다. 예를 들어 `IntExp`는 가능한 모든 정수식의 범위이고, `C+`는 두 정수식으로 새 정수식을 만드는 방법이며, `C+(Cvar(x), C0())`는 그 방법으로 만든 한 값이다. class, pointer, tag를 어떻게 배치할지는 이 계약의 바깥에 있으므로 여러 구현이 같은 abstract syntax을 실현할 수 있다.

### Three conditions for a realization of abstract syntax

- injectivity: 같은 constructor result라면 argument도 같아야 한다. `C+(e₀,e₁)=C+(e₂,e₃)`이면 `e₀=e₂`, `e₁=e₃`이다. 즉 node에서 child를 유일하게 복원할 수 있다.
- disjoint ranges: 서로 다른 constructor의 result가 겹치지 않는다. 한 node가 동시에 `Add`와 `Multiply` variant일 수 없다.
- finite generation: 모든 phrase는 constructor를 유한 번 적용해 만들어진다. 메모리에 만들 수도, source로 쓸 수도 없는 무한 깊이의 phantom phrase는 포함하지 않는다.

앞의 두 조건은 안전한 pattern matching을 보장한다. assertion이 `p₀ ∧ p₁` 꼴이면 최상위 variant와 두 child가 유일하다. finite generation은 child를 따라 내려가면 결국 constant나 variable에 도착한다고 보장한다. 그래서 recursive evaluator가 모든 node를 처리하고 종료하며, structural induction이 모든 finite AST를 덮을 수 있다.

finite generation을 수식으로 쓰려면 depth별 approximation을 만든다. depth 0에서 시작해, stage `j+1`에는 stage `j`까지 만든 phrase에 constructor를 한 번 더 적용한 결과를 넣는다. 모든 finite stage의 union이 전체 carrier set이다. 여기서 핵심은 ‘constructor로 정당화되는 값만 넣는 smallest solution’이라는 점이다. 2장의 least fixed point도 같은 construction pattern을 사용한다.

### Integer expressions as depth approximants

```text
IntExp⁽⁰⁾ = ∅
IntExp⁽ʲ⁺¹⁾ = { Cₙ() | n ∈ ℕ }
              ∪ { Cvar(v) | v ∈ Var }
              ∪ { C−(e) | e ∈ IntExp⁽ʲ⁾ }
              ∪ { C+(e₀,e₁), … | e₀,e₁ ∈ IntExp⁽ʲ⁾ }
IntExp = ⋃ⱼ≥0 IntExp⁽ʲ⁾
```

각 단계는 이전 단계에서 만들 수 있던 구절보다 한 층 더 깊은 구절을 허용한다. 합집합은 임의로 깊지만 언제나 유한한 구절만 포함한다.

> [!example] One abstract syntax, several realizations
> 구조 `(0 - 1) + (-2)`를 세 방식으로 실현해 보자.
>
> 1. 완전 괄호 중위 문자열: `((0) - (1)) + (-(2))`
> 2. 접두 함수 문자열: `add(subtract(0,1), negate(2))`
> 3. syntax tree: 루트 `+`, 왼쪽 자식은 루트 `-binary`와 잎 0·1, 오른쪽 자식은 루트 `-unary`와 잎 2
> 4. 대수적 자료형 값: `Plus(Sub(Const(0), Const(1)), Neg(Const(2)))`
>
> **결론:** 표현은 다르지만 각 constructor의 단사성, 서로소 치역, 유한 생성이라는 같은 계약을 만족하므로 이후 의미 정의와 증명을 공유한다.

> [!abstract] Intuition for ‘initial algebra’
> initial algebra는 constructor로 만들 수 있는 finite syntax만 담고, 별도의 equation으로 서로 다른 tree를 억지로 같게 만들지 않은 구조다. 엔지니어 관점에서는 AST type과 그 exhaustive `fold` interface를 떠올리면 된다. 각 constructor case를 target value로 바꾸는 handler를 모두 주면, 모든 AST를 target으로 보내는 recursive function이 정확히 하나 정해진다.
>
> 예를 들어 `Const` handler는 정수를, `Add` handler는 두 child result의 합을 돌려주게 하면 그 fold가 evaluator다. handler를 pretty-printing용 문자열 조합으로 바꾸면 같은 AST에서 printer를 얻는다. constructor structure를 보존하는 이 fold를 homomorphism이라고 하며, ‘handler를 정하면 fold가 하나뿐’이라는 성질이 initial algebra의 실용적인 핵심이다.
>
> 왜 굳이 이 성질을 이름 붙이는가? 새 constructor를 추가했을 때 evaluator, printer, free-variable collector처럼 AST 전체를 소비하는 함수가 새 case를 요구한다는 사실을 한 번에 말할 수 있기 때문이다. 반대로 AST에 constructor로 만들 수 없는 특별한 값을 몰래 넣거나, 서로 다른 두 tree를 이유 없이 같은 값으로 취급하면 exhaustive fold의 보장이 깨진다. initial algebra는 구현 기법 하나가 아니라 이런 소비 함수들이 의존하는 공통 계약이다.

> [!warning] Even ‘tree’ is a representation
> 그림으로 그린 트리가 abstract syntax 그 자체라고 말하면 편리하지만 엄밀히는 트리도 하나의 실현이다. 핵심은 노드의 메모리 배치나 라벨 철자가 아니라 constructor를 유일하게 분해할 수 있는 구조다. 이 구분 덕분에 컴파일러 AST, 증명 보조기의 귀납 자료형, 종이 위의 constructor expression이 같은 이론을 공유한다.

> [!question] Retrieval check
> 1. constructor의 injectivity와 disjoint ranges가 각각 어떤 pattern-match ambiguity를 막는지 설명하라.
> 2. finite generation이 없으면 recursive evaluator와 structural induction에 각각 어떤 문제가 생기는가?
> 3. initial algebra의 unique homomorphism을 AST의 exhaustive fold로 설명해 보라.

### English companion — Carriers, constructors, and the initial-algebra view

*Abstract syntax is a structural contract satisfied by any correct representation, not one privileged tree implementation.*

A genuinely abstract syntax does not commit to one tree data structure. It specifies a carrier for each phrase sort and a constructor function for each production. Here we have `Var`, `IntExp`, and `Assert`, with constructors such as `Cvar : Var → IntExp`, `C+ : IntExp × IntExp → IntExp`, and `C∀ : Var × Assert → Assert`.

A nullary constructor can be viewed as a function from the one-element set into a carrier. Implementations often combine all numeric constants into `Const(n)`, but the structural role is the same: constructor arity and argument sorts determine the immediate subphrases.

Keep three levels separate: a carrier set is the full range of possible values, a constructor is a way to assemble one value, and a concrete tree or object is the result of applying constructors. Memory layout, pointers, and runtime tags remain implementation choices outside this contract.

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
>
> If the `Const` handler returns an integer and the `Add` handler sums child results, the fold is an evaluator. Replacing those handlers with string-building operations gives a pretty-printer. This constructor-preserving fold is a homomorphism; the practical content of initiality is that the handlers determine exactly one such fold.
>
> Naming this property exposes a shared contract: adding a constructor requires a new case in every total consumer, such as an evaluator, printer, or free-variable collector. Smuggling in values not generated by constructors, or identifying unrelated trees, breaks that contract.

> [!warning] Even ‘tree’ is a representation
> A drawn tree is a convenient realization, not the essence of abstract syntax. What matters is unique decomposition by constructors, allowing compiler ASTs, inductive datatypes, and paper notation to share the same theory.

> [!question] Retrieval check
> 1. Explain which ambiguity is prevented by constructor injectivity and which by disjoint ranges.
> 2. Why would structural induction fail without finite generation?
> 3. Explain the unique homomorphism from an initial algebra as an exhaustive fold over an AST.

---

## Denotational meaning as a function of state — §1.2 · pp. 8–10 · 7 min

> [!abstract] Section focus
> free variable이 있는 expression의 denotation은 정수 하나가 아니라 state가 주어질 때 정수를 돌려주는 function이다.

닫힌 식 `2 + 3`은 상태와 무관하게 5를 낸다. 반면 `x + 3`의 값은 `x`가 무엇인지 알아야 정해진다. 그러므로 모든 정수식에 같은 종류의 의미를 주려면 의미를 `상태 → 정수` 함수로 잡아야 한다. assertion도 같은 이유로 `상태 → 진릿값` 함수가 된다. 상태 집합을 `Σ = Var → ℤ`, 진릿값 집합을 `𝔹 = {true,false}`라 두면 의미 함수의 형식이 선명해진다.

denotational semantics은 syntax을 이미 이해한다고 가정하고 그 syntax이 나타내는 수학적 대상을 지정한다. 이 장에서 정수식의 의미 대상은 `Σ → ℤ`, assertion의 의미 대상은 `Σ → 𝔹`이다. 의미 괄호 `⟦e⟧exp σ`는 상태 `σ`에서 식 `e`의 값을, `⟦p⟧assert σ`는 같은 상태에서 assertion `p`의 진릿값을 뜻한다. 괄호 안은 대상 언어, 괄호 밖 계산은 메타언어에 속한다.

여기서 function은 실제 evaluator 구현과 같아도 되지만 같아야 하는 것은 아니다. 구현은 cache, machine integer, exception을 사용할 수 있고 evaluation order도 정해야 한다. denotation은 그런 구현 detail을 지운 specification이다. 두 evaluator가 같은 denotation을 구현한다면 내부 algorithm이 달라도 이 장에서 관찰하는 meaning은 같다. 따라서 semantic equation은 코드를 그대로 옮긴 pseudocode가 아니라 구현이 만족해야 할 수학적 contract로 읽어야 한다.

### Semantic functions and state update

```text
⟦·⟧exp    : IntExp → (Σ → ℤ)
⟦·⟧assert : Assert → (Σ → 𝔹)
Σ = Var → ℤ
[σ | v : n](v) = n
[σ | v : n](w) = σ(w)    when w ≠ v
```

`[σ | v : n]`은 `v`에만 새 값 `n`을 주고 나머지 변수에는 `σ`와 같은 값을 주는 상태다. 수량자의 의미에서 묶인 변수의 가능한 값을 하나씩 시험할 때 쓰인다.

### Core semantic equations following the constructors

- 상수: `⟦n⟧exp σ = n`. 상태를 받지만 사용하지 않는다.
- 변수: `⟦v⟧exp σ = σ(v)`. 변수의 의미는 현재 상태에서 조회한다.
- 단항·이항 산술: `⟦-e⟧exp σ = -⟦e⟧exp σ`, `⟦e₀+e₁⟧exp σ = ⟦e₀⟧exp σ + ⟦e₁⟧exp σ`.
- 관계: `⟦e₀<e₁⟧assert σ = (⟦e₀⟧exp σ < ⟦e₁⟧exp σ)`.
- 논리 연결사: `⟦p₀∧p₁⟧assert σ = ⟦p₀⟧assert σ ∧ ⟦p₁⟧assert σ`이며 다른 연결사도 같은 모양이다.
- 수량자: `⟦∀v.p⟧assert σ = true` iff 모든 `n∈ℤ`에 대해 `⟦p⟧assert[σ|v:n]=true`다. `∃`는 적어도 한 `n`을 요구한다.

> [!example] A calculation using semantic equations
> `σ(x)=3`, `σ(y)=7`일 때 `(x + 2 < y) ∧ ¬(x = 0)`을 계산한다.
>
> 1. `⟦x+2⟧exp σ = σ(x)+2 = 5`이고 `⟦y⟧exp σ = 7`이다.
> 2. 따라서 `⟦x+2<y⟧assert σ = (5<7) = true`다.
> 3. `⟦x=0⟧assert σ = (3=0)=false`, 그러므로 부정은 `true`다.
> 4. 마지막 논리곱은 `true ∧ true = true`다.
>
> **결론:** 계산은 언제나 최상위 constructor의 방정식을 선택하고 직접 부분구절로 내려간 뒤, 얻은 의미를 다시 조합하는 방식으로 진행된다.

> [!example] A quantifier overrides the state
> 임의의 상태 `σ`에서 `∀x. x + 0 = x`의 의미를 계산한다.
>
> 1. 전칭 수량자는 모든 정수 `n`에 대해 본문을 상태 `[σ|x:n]`에서 검사한다.
> 2. 그 상태에서 `x`의 값은 원래 `σ(x)`가 아니라 `n`이다.
> 3. 본문은 `n+0=n`이므로 모든 `n`에서 참이다.
> 4. 따라서 전체 assertion은 원래 상태가 무엇이든 참이다.
>
> **결론:** 이 계산은 바인더가 변수의 현재 값을 읽는 대신 범위 안에서 새로운 값을 지정한다는 사실을 보여 준다.

> [!warning] Do not identify state with store too early
> 여기서 상태는 모든 변수에 정수를 배정하는 전체 함수다. 아직 주소, 할당, 별칭, 수명은 없다. 뒤에서 환경과 저장소가 분리될 때 이 단순한 상태 개념이 왜 충분하지 않은지 보게 된다.

> [!question] Retrieval check
> 1. `σ(x)=2`, `σ(y)=-1`일 때 `∃z. x+z=y`의 의미를 상태 갱신 표기로 계산하라.
> 2. 닫힌 assertion의 의미가 상태와 무관해야 하는 이유를 직관적으로 설명하라.
> 3. 정수식과 assertion의 의미 함수 공역이 왜 다른가?

### English companion — Denotational meaning as a function of state

*An open expression denotes not one integer but a function that returns an integer when supplied a state.*

A closed expression such as `2 + 3` always yields five, while `x + 3` needs a value for `x`. A uniform semantics therefore maps every integer expression to a function `State → Integer` and every assertion to `State → Boolean`. Let `Σ = Var → ℤ` and `𝔹 = {true,false}`.

Denotational semantics assigns mathematical objects to already parsed syntax. Here integer expressions denote elements of `Σ → ℤ`, assertions elements of `Σ → 𝔹`. Inside the semantic brackets is object-language syntax; outside is metalanguage mathematics.

The function need not be the evaluator implementation itself. An implementation may use caches, machine integers, exceptions, and a chosen evaluation order. A denotation erases those details and acts as a mathematical specification that multiple evaluators may implement.

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

## Syntax direction, uniqueness, and compositionality — §1.2 · pp. 9–12 · 6 min

> [!abstract] Section focus
> semantic equation은 example별 처리 코드가 아니라 모든 AST node에 정확히 하나의 의미를 주는 recursive definition이다.

interpreter에서 AST variant 하나를 빼먹으면 runtime에서 처리하지 못하는 node가 생긴다. semantic definition도 같다. 첫째, abstract grammar의 production마다 equation이 하나 있어야 한다. 둘째, 한 node의 의미는 그 node의 constructor와 직접 child들의 의미만으로 계산해야 한다. 따라서 어떤 구절을 만나도 최상위 constructor를 pattern match해 적용할 equation을 고를 수 있다.

이런 definition을 syntax-directed 또는 homomorphic이라고 한다. evaluator의 recursion이 syntax tree의 모양을 그대로 따른다는 뜻이다. addition node에서는 두 child의 integer meaning을 더하고, conjunction node에서는 두 Boolean meaning을 결합하며, quantifier node에서는 갱신된 state마다 body meaning을 적용한다. compiler에서 exhaustive pattern match로 AST visitor를 작성하는 구조와 같다.

> [!abstract] Why the solution is unique
> 구절 깊이에 대한 귀납법을 생각하자. 깊이 0에는 구절이 없어 자명하다. 깊이 `j+1`의 구절 `p`는 유한 생성 조건 때문에 어떤 constructor로 만들어졌다. 서로소 치역 때문에 그 constructor의 종류가 하나뿐이고, 단사성 때문에 직접 부분구절도 하나의 튜플로 정해진다. 각 부분구절은 더 얕으므로 귀납가정에 따라 의미가 유일하다. 해당 constructor에 대응하는 의미 방정식이 그 의미들을 결합하는 방법을 하나로 정하므로 `p`의 의미도 유일하다.
>
> existence도 같은 argument에서 얻는다. constructor와 child를 분해할 수 있고 child meaning이 이미 존재하며 오른쪽의 metalanguage operation이 값을 돌려주므로, 현재 node의 meaning도 존재한다. 이를 algebra의 언어로 압축하면 ‘syntax는 initial algebra이고 semantics는 target algebra로 가는 unique homomorphism이다’가 된다. 앞 절의 AST-fold 설명과 여기의 depth induction은 같은 사실을 구현 관점과 proof 관점에서 본 것이다.

syntax-directedness는 compositionality를 준다. compositional semantics에서 전체 meaning은 직접 child의 meaning만으로 정해진다. child source가 얼마나 길었는지, 어떤 최적화 과정을 거쳤는지처럼 meaning 밖의 정보를 엿보지 않는다. 그래서 context 안의 한 subphrase를 같은 denotation을 가진 다른 subphrase로 바꾸어도 전체 meaning이 유지된다.

예를 들어 모든 상태에서 `e`와 `e'`가 같은 정수를 낸다면 `e+1<10`, `∀x. e=x`, `e=e∧p`처럼 `e`를 품은 어떤 올바른 syntactic context에서도 `e'`로 바꾸어 의미를 보존한다. 이 대체 원리는 최적화의 정확성, 등식 추론, 모듈 구현 교체를 뒷받침한다. 다만 ‘현재 한 상태에서 값이 같다’가 아니라 의미 함수 전체가 같아야 함에 주의하자.

> [!example] Semantic equivalence and contextual replacement
> 정수식 `x+0`과 `x`는 모든 상태에서 같은 의미를 갖는다.
>
> 1. 임의의 `σ`에서 `⟦x+0⟧σ = σ(x)+0 = σ(x) = ⟦x⟧σ`다.
> 2. 따라서 문맥 `[-]×y<z`에 넣은 `(x+0)×y<z`와 `x×y<z`도 같은 assertion 의미를 갖는다.
> 3. 문맥이 여러 층이어도 각 층의 의미 방정식이 부분 의미만 사용하므로 동치가 바깥까지 전달된다.
>
> **결론:** compositionality는 ‘같은 meaning을 가진 부품은 교체할 수 있다’는 원리를 수학적으로 보장한다.

의미 방정식에는 대상 언어와 메타언어가 동시에 등장한다. `⟦e₀+e₁⟧σ = ⟦e₀⟧σ + ⟦e₁⟧σ`에서 괄호 안의 `+`는 정의할 언어의 constructor이고, 괄호 밖의 `+`는 이미 알고 있는 정수 덧셈이다. 대상 언어(object language)는 설명 대상, 메타언어(metalanguage)는 설명을 적는 수학 언어다. `e`, `p`, `σ`, `n`은 대상 언어에 실제로 쓰이는 변수가 아니라 구절·상태·정수를 가리키는 메타변수다.

대상 언어의 기능을 매우 비슷한 메타언어 기능으로 설명하는 방식을 메타순환적(metacircular)이라고 한다. 익숙한 정수 덧셈에는 간결하고 유용하지만, 메타언어 연산을 잘못 이해하면 오해가 그대로 대상 언어로 전달된다. 그래서 낯선 연산은 진리표나 별도 수학 정의로 풀어야 한다. 인터프리터가 구현 언어의 함수 호출로 대상 언어의 함수 호출을 설명할 때도 같은 위험이 생긴다.

> [!warning] The crack exposed by division by zero
> 이 장의 의미 함수 형식은 모든 정수식이 모든 상태에서 정수 하나를 내야 한다고 약속한다. 그러나 보통의 정수 나눗셈과 나머지는 제수가 0이면 값이 없다. 이를 무시하면 의미 함수가 실제로는 전체 함수가 아니다. 지금은 문제를 보류하지만, 2장에서는 오류와 비종료를 의미 영역에 어떻게 반영할지 다시 묻는다. 의미의 공역을 먼저 정하는 일이 언어 설계상의 오류 정책까지 강제한다는 좋은 사례다.

> [!question] Retrieval check
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

## Truth in a state, validity, and formal proof — §1.3 · pp. 12–15 · 8 min

> [!abstract] Section focus
> semantics가 truth를 정하고 proof system이 derivability를 정한다. test result와 verifier의 proof obligation을 구분하는 것과 비슷하다.

assertion `p`가 한 state `σ`에서 true라는 것은 `⟦p⟧σ=true`라는 뜻이다. 이는 특정 test fixture에서 assertion이 통과한 것과 같다. 반면 `p`의 validity는 모든 state에서 true라는 property다. `x>0`은 어떤 state에서는 true지만 valid하지 않다. `x=x`와 `x+0=x`는 모든 state에서 true이므로 valid하다. 모든 state에서 false인 assertion은 unsatisfiable하다.

`p₀ ⇒ p₁`이 타당하면 `p₀`를 만족하는 모든 상태가 `p₁`도 만족한다. 이때 `p₀`가 `p₁`보다 강하고, `p₁`이 `p₀`보다 약하다고 한다. 강한 조건일수록 허용하는 상태 집합이 작다. `false`는 아무 상태도 허용하지 않으므로 모든 assertion보다 강하고, `true`는 모든 상태를 허용하므로 모든 assertion보다 약하다. 두 assertion이 서로보다 강하면 같은 상태 집합을 기술하므로 의미적으로 동치다.

이제 질문 축이 둘이라는 점을 분명히 하자. `⊨p`는 semantic model을 기준으로 모든 state를 양화한 statement이고, `⊢p`는 주어진 proof rule로 끝나는 finite proof tree가 존재한다는 statement다. model checker가 property를 확인하는 일과 proof checker가 certificate를 검증하는 일이 관련은 있지만 같은 definition은 아닌 것과 같다. soundness와 completeness는 이 두 축 사이에 어느 방향의 보증이 있는지 나타내는 별도 theorem이다.

### Reading assertions as sets of states

```text
Sat(p) = { σ ∈ Σ | ⟦p⟧assert σ = true }
p₀ is stronger than p₁  ⇔  Sat(p₀) ⊆ Sat(p₁)
p₀ ≡ p₁                 ⇔  Sat(p₀) = Sat(p₁)
Sat(false) = ∅
Sat(true)  = Σ
```

‘강하다’는 말이 역방향처럼 느껴질 수 있지만 정보량으로 보면 자연스럽다. `x=3`은 `x>0`보다 더 많은 정보를 주고 더 적은 상태만 남긴다.

inference rule은 0개 이상의 premise와 하나의 conclusion으로 이루어진 schema다. type checker rule에서 child expression의 typing judgment가 premise이고 parent expression의 judgment가 conclusion인 모습을 떠올리면 된다. metavariable에 실제 object-language phrase를 넣으면 rule instance가 된다. premise가 없는 rule은 axiom schema이고, metavariable도 없어 instance가 하나뿐이면 axiom이다. side condition이 있으면 그 조건을 만족하는 replacement만 허용한다.

형식 증명은 각 줄이 앞선 줄들을 전제로 하는 어떤 규칙 인스턴스의 결론인 유한한 assertion 열이다. 마지막 줄이 증명한 assertion이다. 같은 내용을 증명 트리로 그리면 결론이 아래 뿌리에 있고 그 규칙의 전제 증명들이 위쪽 가지가 된다. 트리는 의존 구조를 직접 보여 주지만 큰 증명은 넓어지므로 실제 문서에서는 번호가 매겨진 열과 규칙 주석을 자주 쓴다.

> [!example] Distinguishing a rule, an instance, and a proof step
> 대칭성 스키마와 전건 긍정형 규칙을 단순화해 사용한다.
>
> 1. 공리 스키마: 임의의 정수식 `e₀,e₁`에 대해 `(e₀=e₁) ⇒ (e₁=e₀)`.
> 2. 한 인스턴스: `(x+0=x) ⇒ (x=x+0)`.
> 3. 이미 `x+0=x`를 증명했다면 두 전제를 연결하는 규칙으로 `x=x+0`을 결론 내릴 수 있다.
> 4. 마지막으로 타당한 assertion을 전칭 일반화하는 규칙을 적용해 `∀x. x=x+0`을 얻을 수 있다.
>
> **결론:** 스키마는 무한히 많은 규칙 인스턴스를 압축하고, 증명은 그 인스턴스들을 유한 번 연결한다.

> [!tip] Soundness bridges syntax and semantics
> rule의 soundness는 모든 instance에서 premise가 모두 valid하면 conclusion도 valid하다는 뜻이다. 모든 rule이 sound하면 axiom에서 시작해 rule을 유한 번 적용한 모든 proof line이 valid하다. 즉 `⊢p`이면 `⊨p`다. soundness는 verifier가 증명한 statement를 semantic model이 반박하지 않는다는 보증이다. 모든 true statement를 verifier가 반드시 찾는다는 보증은 아니다.
>
> 규칙의 건전성 증명도 의미 방정식을 사용한다. 임의의 상태를 하나 잡고, 전제의 타당성으로 그 상태에서 전제들이 참임을 얻은 뒤, 연결사의 진리표나 수량자의 의미 방정식으로 결론이 참임을 보인다. 상태가 임의였으므로 결론이 모든 상태에서 참이다. 이 ‘임의의 상태’ 단계가 빠지면 타당성 대신 특정 상태의 참만 증명하게 된다.

> [!warning] Do not confuse inference with implication
> 함의 `p⇒q`는 한 assertion 안의 대상 언어 연결사이며 한 상태에서 진릿값을 갖는다. 추론 `p / q`는 두 증명 단계 사이의 메타언어 관계다. 한 상태에서 `p`가 참이라고 해서 그 상태에서 `∀x.p`도 참인 것은 아니므로 ‘현재 참인 `p`에서 `∀x.p`를 결론 내린다’는 읽기는 틀리다. 전칭 일반화 규칙이 건전한 이유는 전제 `p`가 한 상태에서 참이어서가 아니라 모든 상태에서 타당하다고 가정하기 때문이다.

completeness는 반대 방향을 묻는다. semantically valid한 모든 assertion을 rule로 derive할 수 있으면 proof system이 complete하다. 여기서는 integer arithmetic의 interpretation을 고정했기 때문에 모든 arithmetic truth를 finite rule set으로 포착할 수 없다는 incompleteness 문제가 생긴다. program verification은 보통 실제 integer operation을 고정하므로, logic rule만으로 모든 arithmetic fact를 해결하려 하지 않고 SMT solver의 arithmetic theory나 별도 lemma에 맡긴다.

> [!question] Retrieval check
> 1. `x=3`, `x>0`, `true`를 강한 순서부터 나열하고 상태 집합 포함 관계로 정당화하라.
> 2. soundness와 completeness를 각각 `⊢`와 `⊨`를 사용해 한 줄로 써 보라.
> 3. 왜 `x>0`은 형식 증명의 독립된 한 줄로 올 수 없지만 `(x>0)⇒(x≥0)`은 올 수 있는가?

### English companion — Truth in a state, validity, and formal proof

*Semantics determines what is true; an inference system determines what can be proved by rules.*

An assertion is true in a state `σ` when its denotation there is true. It is valid when true in every state. Thus `x>0` may be true but is not valid; `x=x` is valid. An assertion false in every state is unsatisfiable.

If `p₀ ⇒ p₁` is valid, every state satisfying `p₀` also satisfies `p₁`; `p₀` is stronger and `p₁` weaker. Stronger assertions admit fewer states. `false` is strongest, `true` weakest. Mutual strength is semantic equivalence.

There are two axes. `⊨p` quantifies over all states in the semantic model; `⊢p` says that a finite proof tree ending in `p` exists under the proof rules. Soundness and completeness are separate theorems relating these two definitions.

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

## Binding, free variables, and the Coincidence Theorem — §1.4 · pp. 15–18 · 8 min

> [!abstract] Section focus
> 변수의 의미는 철자만으로 정해지지 않는다. 어느 바인더가 그 발생을 지배하는지가 syntax structure의 일부다.

`∀v.p`와 `∃v.p`에서 수량자 바로 뒤의 `v` 발생은 바인딩 발생, 즉 바인더다. 그 바인더의 범위는 본문 `p`다. 범위 안에 있는 같은 이름의 비바인딩 발생은 그 바인더에 묶인다. 같은 이름의 바인더가 중첩되어 있으면 가장 작은 범위, 즉 가장 가까운 안쪽 바인더가 지배한다. 어느 바인더에도 묶이지 않은 발생은 자유 발생이다. 자유 발생이 하나도 없는 구절을 닫힌 구절이라고 한다.

자유인지 묶였는지는 변수 이름 자체가 아니라 ‘구절 안의 특정 발생’에 붙는 성질이다. 한 구절 안에서 같은 이름이 자유로도, 묶인 채로도 나타날 수 있다. 또 전체 구절에서는 묶인 발생이 어떤 부분구절만 떼어 보면 자유일 수 있다. 예컨대 `∀x.(x<y ∧ ∃y.x<y)`에서 첫 `x`와 마지막 `x`는 바깥 `∀x`에 묶이고, 첫 `y`는 자유이며, 마지막 `y`는 안쪽 `∃y`에 묶인다. 안쪽 본문 `x<y`만 떼면 그 안에서는 두 이름 모두 자유다.

> [!example] Tracing binding structure without a diagram
> assertion `∀x. (x<y ∨ ∃y. (x=y ∧ ∀x. x>y))`를 바깥에서 안쪽으로 읽는다.
>
> 1. 맨 앞 `∀x`는 큰 괄호 전체를 범위로 하며, 안쪽 `∀x` 범위 밖에 있는 `x` 발생들을 묶는다.
> 2. 첫 비교 `x<y`의 `y`는 아직 `y` 바인더 범위에 들어가지 않았으므로 자유다.
> 3. `∃y`는 자기 본문의 `y`들을 묶으며, 맨 안쪽 `∀x`의 본문에서도 `y`에 대한 더 가까운 바인더는 없으므로 계속 지배한다.
> 4. 맨 안쪽 `∀x`는 자기 본문의 `x`만 새로 묶어 바깥 `∀x`를 가린다.
>
> **결론:** 전체 assertion의 자유 변수 집합은 `{y}`다.

자유 변수 집합 함수 `FV`는 syntax을 따라 재귀적으로 정의한다. 상수와 진리 상수에는 자유 변수가 없고, 변수 `v`의 자유 변수는 `{v}`다. 단항 constructor는 자식의 집합을 그대로 전달하고, 이항 constructor는 두 집합의 합집합을 취한다. 수량자는 본문의 자유 변수 집합에서 자신이 묶는 이름 하나를 제거한다. 이 정의도 의미 정의는 아니지만 syntax-directed이므로 모든 구절에 유일한 결과를 준다.

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

다른 산술 연산, 관계, 이항 연결사는 같은 모양의 방정식을 갖는다. 수량자 절에서만 집합에서 이름을 빼는 바인딩 특유의 동작이 나타난다.

> [!tip] Coincidence Theorem
> 구절 `p`의 자유 변수들에 대해 두 상태 `σ`, `σ'`가 같은 값을 준다면 `p`의 의미도 두 상태에서 같다. 식과 assertion 모두에 대해 성립한다. 즉 의미 계산은 상태 전체를 받는 것처럼 보이지만 실제로는 유한 집합 `FV(p)`의 값만 관찰한다. 닫힌 구절은 자유 변수가 없으므로 어떤 두 상태에서도 의미가 같다.
>
> 이 정리는 자유 변수의 정의가 단순한 syntax 목록이 아니라 의미 의존성의 정확한 상한임을 보여 준다. 이후 최적화나 환경 축소에서 ‘이 구절이 읽을 수 있는 이름은 무엇인가’를 정당화하며, 함수 클로저가 어떤 환경을 보존해야 하는지 이해하는 바탕이 된다.

> [!abstract] Skeleton of the structural-induction proof
> 임의의 구절 `p`를 잡고 직접 부분구절들에 대해서는 일치 정리가 이미 성립한다고 가정한다. 상수는 상태를 읽지 않으므로 자명하고, 변수는 `FV(v)={v}`이므로 두 상태가 그 변수에서 일치한다. 단항·이항 구성에서는 자유 변수 집합의 같음이나 합집합 성질로 각 자식에 귀납가정을 적용한 뒤 의미 방정식으로 결과를 조합한다.
>
> 수량자 경우가 핵심이다. `p=∀v.q`이고 `σ`, `σ'`가 `FV(q)−{v}`에서 일치한다고 하자. 임의의 정수 `n`을 골라 두 상태를 각각 `[σ|v:n]`, `[σ'|v:n]`으로 갱신하면, 이제 `v`에서도 둘 다 `n`이고 나머지 자유 변수에서도 원래부터 일치하므로 `FV(q)` 전체에서 일치한다. 귀납가정으로 본문 의미가 같고, 이것이 모든 `n`에 대해 성립하므로 전칭 수량자 의미도 같다. 존재 수량자도 같은 논리다.

구조적 귀납법은 자연수 귀납법의 변형이 아니라 그 위에 정당화된다. 구절의 깊이를 자연수로 보고 직접 부분구절의 깊이가 항상 더 작다는 사실을 사용한다. 실무적으로는 ‘각 constructor 경우를 모두 다루고, 자식에 대해 명제를 가정한다’는 방식으로 쓴다. constructor 하나를 빼먹으면 모든 구절을 덮지 못하고, 바인더 경우를 비바인더처럼 처리하면 상태 갱신 때문에 증명이 깨진다.

> [!question] Retrieval check
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

## Capture-avoiding substitution and the Substitution Theorem — §1.4 · pp. 18–21 · 10 min

> [!abstract] Section focus
> substitution은 글자를 바꾸는 작업이 아니라 free variable의 semantic relationship을 보존하는 syntactic operation이다.

`p`의 자유 변수 `v`에 식 `e`를 넣는다는 직관은 간단해 보인다. 하지만 `e`에 자유롭게 등장하는 이름이 `p` 안의 바인더와 같으면 단순 텍스트 교체가 그 이름을 새로 묶어 버린다. 이를 변수 포획(capture)이라 한다. 포획은 단지 이름이 보기 싫게 겹치는 문제가 아니라 결과 assertion의 의미를 바꾼다.

이 문제는 논리식에만 머물지 않는다. macro expansion, inlining, lambda calculus의 beta-reduction, compiler IR의 variable rename도 모두 binder 아래에 code를 옮긴다. 문자열 검색과 교체로 구현하면 우연히 주변 scope의 이름을 가리키는 hygiene bug가 생긴다. capture-avoiding substitution은 그런 transformation이 어느 declaration을 참조하는지 보존하기 위한 최소 조건이며, 뒤의 theorem은 이 조건이 실제 meaning 보존으로 이어짐을 확인한다.

> [!example] How capture can turn truth into falsehood
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

### Simultaneous substitution under a quantifier

```text
(∀v. p) / S = ∀v_new. ( p / [S | v : v_new] )

Choose v_new so that
v_new ∉ ⋃ { FVexp(S(w)) | w ∈ FVassert(p) − {v} }.

Single substitution:
p / v ↦ e  abbreviates  p / [Cvar | v : e].
```

`[S|v:v_new]`은 바인더가 지배하던 `v` 발생을 새 변수식 `v_new`로 보내고 다른 변수에는 원래 `S`를 적용한다. 새 이름 조건은 밖에서 들어오는 교체식의 자유 변수가 포획되지 않도록 한다.

> [!tip] Three syntactic properties of substitution
> 첫째, 두 치환 맵이 `FV(p)`의 변수들에서만 같아도 `p/S`와 `p/S'`는 같다. 구절은 자유롭게 등장하지 않는 변수에 대한 치환을 관찰하지 못한다. 둘째, 각 변수를 자기 자신을 나타내는 변수식으로 보내는 `Cvar`는 항등 치환이다. 셋째, 치환 결과의 자유 변수 집합은 원래 자유 변수 각각의 교체식 자유 변수 집합을 모두 합친 것이다. 캡처 회피 정의가 올바르기 때문에 이 정확한 등식이 성립한다.

> [!abstract] Substitution Theorem
> 치환 정리는 syntactic substitution과 의미 상태 구성을 연결한다. 상태 `σ`에서 치환된 구절 `p/S`를 해석하는 것은, 각 원래 자유 변수 `w`의 값을 `σ'`에서 교체식 `S(w)`를 계산한 값으로 정한 상태에서 원래 `p`를 해석하는 것과 같다. 더 간단히 쓰면 새 상태 `σ_S(w)=⟦S(w)⟧σ'`에 대해 `⟦p/S⟧σ' = ⟦p⟧σ_S`다. 필요한 자유 변수에서만 두 상태가 일치하면 충분하다.
>
> 증명은 다시 `p`에 대한 구조적 귀납이다. 비바인더 경우는 의미 방정식과 귀납가정으로 곧바로 끝난다. 수량자 경우에는 캡처 회피 조건이 결정적으로 쓰인다. 새 바인더 이름이 교체식들에 자유롭게 나타나지 않으므로 `σ'`에서 그 이름만 수량자 값 `n`으로 바꾸어도 교체식의 의미는 변하지 않는다. 그래서 syntax 쪽 이름변경과 의미 쪽 원래 변수 상태 갱신이 정확히 맞물린다.

> [!example] Using the finite substitution corollary
> `p ≡ x+z<y`에서 `x↦y+1`, `z↦2`를 동시에 치환한다.
>
> 1. syntax 결과는 `(y+1)+2<y`다. 원래 `y`는 치환 대상이 아니므로 그대로 남는다.
> 2. 상태 `σ`에서 결과를 계산하는 것과, 원래 `p`를 `x` 값은 `⟦y+1⟧σ`, `z` 값은 2로 갱신한 상태에서 계산하는 것이 같다.
> 3. 이 등식은 컴파일러가 이름 기반 치환을 환경 기반 평가로 구현해도 되는 이유를 축약해서 보여 준다.
>
> **결론:** 유한 치환 정리는 한 변수 또는 유한 변수 목록을 쓰는 실전 표기의 의미 보존 근거다.

치환 정리에서 전칭 수량자 인스턴스화의 건전성도 따라온다. `∀v.p`가 한 상태에서 참이면 모든 정수 `n`으로 `v`를 갱신해도 `p`가 참이다. 특히 `e`가 그 상태에서 내는 정수로 갱신한 경우도 참이고, 유한 치환 정리에 따라 이것은 `p/v↦e`가 그 상태에서 참이라는 말과 같다. 따라서 `(∀v.p)⇒(p/v↦e)`는 모든 상태에서 타당하다.

이름변경 정리는 바인더 이름을 본문에서 충돌하지 않는 새 이름으로 바꾸어도 의미가 같다고 말한다. `∀x.x+y>0`과 `∀z.z+y>0`은 같은 바인딩 구조를 갖는다. 이런 교체를 알파 변환(α-conversion)이라 한다. 더 나아가 고차 abstract syntax 관점은 알파 변환으로 연결되는 표현들을 애초에 하나의 추상 구절로 본다. 바운드 이름의 철자는 의미 없는 구체 표기라는 생각이다.

> [!warning] Distinguish three kinds of replacement
> 대상 변수에 대상 구절을 넣는 치환은 포획 회피가 필요한 형식적 syntactic operation이다. 메타언어 안에서 메타변수 식을 다른 메타언어 식으로 바꾸는 작업도 메타언어의 바인딩 규칙을 따른다. 반면 추론 규칙 스키마의 메타변수 `p`에 구체 대상 assertion을 넣어 인스턴스를 만드는 것은 대상 언어 치환이 아니라 스키마 변수에 값을 정하는 일이다. 대상 변수와 메타변수를 섞으면 불필요한 이름변경을 하거나 실제 포획을 놓치게 된다.

> [!question] Retrieval check
> 1. `(∀y. x<y)/x↦y+1`을 캡처 없이 계산하고, 잘못된 단순 치환 결과와 의미를 비교하라.
> 2. 동시 치환 `x↦y, y↦x`와 순차 치환 `x↦y` 후 `y↦x`가 왜 다른지 `x+y`로 보이라.
> 3. 치환 정리의 양변에서 syntactic manipulation과 상태 조작이 각각 어디에 나타나는가?
> 4. 알파 변환에서 새 이름이 신선해야 하는 이유를 반례로 설명하라.

### English companion — Capture-avoiding substitution and the Substitution Theorem

*Substitution is not character replacement; it is a syntactic operation designed to preserve semantic relationships among free variables.*

Replacing free occurrences of `v` in `p` by an expression `e` seems simple until a binder inside `p` uses a name occurring freely in `e`. Naive textual replacement then captures that occurrence and changes meaning.

The same issue appears in macro expansion, inlining, beta-reduction, and compiler-IR renaming. Blind text replacement creates hygiene bugs by changing which declaration a name refers to. Capture avoidance is the minimum discipline needed to preserve those references.

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

## 09. Practice workshop: calculate and prove from the definitions — 연습 워크숍 · pp. 22–23의 주제 확장 · 10 min

> [!abstract] Section focus
> 답을 읽는 것보다 먼저 종이에 풀고, 아래 해설로 정의를 적용한 순서를 검산하자.

> [!example] Practice 1 — Translate a counting statement
> ‘0보다 크고 4보다 작은 서로 다른 정수가 적어도 두 개 있다’를 이 장의 assertion으로 적어 보라.
>
> 1. 두 증인을 나타낼 변수 `x`, `y`를 존재 수량자로 도입한다.
> 2. 각 증인이 범위 안에 있다는 조건 `0<x ∧ x<4`, `0<y ∧ y<4`를 적는다.
> 3. ‘서로 다른’을 잊지 않고 `x≠y`를 논리곱한다.
> 4. 한 답은 `∃x.∃y.(0<x ∧ x<4 ∧ 0<y ∧ y<4 ∧ x≠y)`다.
> 5. ‘많아야 두 개’라면 세 임의의 후보가 모두 조건을 만족할 때 적어도 두 후보가 같다는 전칭 구조로 바꿀 수 있다.
>
> **결론:** 개수 조건은 증인의 존재와 서로 다름, 또는 너무 많은 후보 사이의 필연적 일치로 번역한다.

> [!example] Practice 2 — Divisibility and primality without division
> 변수들이 자연수만 돈다고 가정하고 `÷`, `rem` 없이 `d`가 `n`의 약수임을 적어 보라.
>
> 1. 약수의 정의를 몫의 존재로 바꾼다: 어떤 자연수 `k`에 대해 `n=d×k`다.
> 2. 따라서 `Divides(d,n) ≡ ∃k. n=d×k`로 약어를 둘 수 있다.
> 3. `p`가 소수라는 말은 보통 `p>1`이고 모든 약수 `d`가 1 또는 `p`라는 뜻이다.
> 4. `Prime(p) ≡ p>1 ∧ ∀d.((∃k.p=d×k)⇒(d=1∨d=p))`라고 쓸 수 있다.
> 5. 자연수 전제가 없고 정수 전체라면 음의 약수와 부호를 추가로 처리해야 한다.
>
> **결론:** 사용 금지된 연산의 의미를 존재 수량자와 허용된 연산으로 다시 정의하는 것이 핵심이다.

> [!example] Practice 3 — Simultaneous substitution with minimal renaming
> `∀x.∃z.(x<y ∧ y<z)`에 `y↦x+z`를 치환하라.
>
> 1. 교체식 `x+z`의 자유 변수는 `{x,z}`다.
> 2. 바깥 `∀x`와 안쪽 `∃z` 모두 교체식의 자유 변수를 포획할 수 있으므로 둘 다 새 이름이 필요하다.
> 3. 신선한 이름을 `u`, `w`로 고르면 먼저 구조는 `∀u.∃w.(u<y ∧ y<w)`가 된다.
> 4. 이제 자유 `y`에만 `x+z`를 넣어 `∀u.∃w.(u<x+z ∧ x+z<w)`를 얻는다.
> 5. 결과의 자유 변수 집합은 치환의 자유 변수 공식대로 `{x,z}`다.
>
> **결론:** 바인더를 무조건 모두 바꾸는 것도 의미는 보존하지만, 충돌하는 이름만 바꾸면 계산과 비교가 쉬워진다.

> [!example] Practice 4 — Design a new binding construct
> 합 `sum v from e₀ to e₁ of e₂`를 정수식으로 추가한다고 하자. 어떤 항목을 정의해야 하는가?
>
> 1. abstract syntax: `v`, 아래·위 경계식 `e₀,e₁`, 본문 `e₂`를 받는 constructor를 추가한다. `v`는 본문에서만 바인더이고 경계식에서는 자유로 읽는 설계를 명시한다.
> 2. 의미: 먼저 현재 상태에서 두 경계를 계산하고, 그 정수 구간의 각 `n`에 대해 본문을 `[σ|v:n]`에서 계산해 합한다.
> 3. 자유 변수: `FV(e₀)∪FV(e₁)∪(FV(e₂)−{v})`다.
> 4. 치환: 경계식에는 그대로 적용하고, 본문에는 수량자와 같은 신선한 이름 선택 및 수정된 치환 맵을 적용한다.
> 5. 그 뒤 일치 정리와 치환 정리의 새 constructor 경우를 증명해야 언어 확장이 기존 메타이론과 호환된다.
>
> **결론:** 바인더를 추가한다는 것은 문법 한 줄을 더하는 일이 아니라 의미·자유 변수·치환·정리를 함께 확장하는 일이다.

> [!example] Practice 5 — Apply the Coincidence Theorem
> `p ≡ ∀x.(x+y<z)`이고 두 상태가 `y`, `z`에서만 같다고 하자. `p`의 의미가 같음을 보여라.
>
> 1. 본문의 자유 변수는 `{x,y,z}`지만 수량자가 `x`를 제거하므로 `FV(p)={y,z}`다.
> 2. 가정이 정확히 `FV(p)`에서의 상태 일치를 준다.
> 3. 따라서 일치 정리를 즉시 적용해 `⟦p⟧σ=⟦p⟧σ'`를 얻는다.
> 4. 직접 증명한다면 각 `n`에 대해 두 상태를 `x:n`으로 갱신한 후 본문 변수 세 개에서 일치함을 확인해야 한다.
>
> **결론:** 정리는 반복되는 상태 추론을 한 번의 자유 변수 계산으로 압축한다.

> [!abstract] Challenge — Strategy for substitution composition
> `(p/S)/S'`를 한 번의 치환 `p/S''`와 비교하려면 각 원래 자유 변수 `w`에서 `S''(w)`를 `(S(w))/S'`로 정의한다. 비바인더 constructor는 구조적 귀납으로 바로 맞아떨어진다. 바인더에서는 두 계산이 서로 다른 신선한 이름을 고를 수 있으므로 결과가 글자 그대로 같다고 기대하면 안 된다. 대신 이름변경 정리를 사용해 두 결과가 알파 동치임을 보이는 것이 정확한 결론이다.

### Self-check after the workshop

- 수량자 개수 조건에서 증인, 범위, 서로 다름을 빠뜨리지 않았다.
- 치환 전 교체식의 자유 변수 집합부터 계산했다.
- 수량자 본문에서만 묶이는 이름과 경계식에서 자유인 이름을 구분했다.
- 정리 이름만 쓰지 않고 가정이 정리의 전제와 어떻게 맞는지 밝혔다.
- syntactic 동일성과 알파 동치를 구분했다.

> [!question] Retrieval check
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

## 10. Connecting the four tools into one workflow — 1장 종합 · 4 min

> [!abstract] Section focus
> 1장의 개별 정의는 하나의 언어를 설계하고 검증하는 반복 가능한 절차를 이룬다.

### The complete argument of Chapter 1

- 먼저 source string과 독립된 phrase kind와 constructor를 정한다. injectivity, disjoint ranges, finite generation이 recursion과 induction의 토대를 만든다.
- 각 구절 종류에 알맞은 의미 영역을 고르고, 모든 constructor에 syntax-directed 의미 방정식을 하나씩 준다.
- syntax-directedness와 initial algebra property로 semantic function의 existence, uniqueness, compositionality를 얻는다.
- semantics로 truth와 validity를 정의하고, inference rule의 soundness로 derivability를 semantic truth에 연결한다.
- binder가 있으면 free variable과 capture-avoiding substitution을 구조적으로 정의하고, Coincidence·Substitution·Renaming Theorem으로 name manipulation이 meaning을 보존함을 증명한다.

이 workflow는 뒤에서 그대로 확대된다. 2장은 assertion 대신 command를 추가하고 semantic domain을 partial state transformer로 바꾼다. 3장은 valid arithmetic assertion을 이용해 program specification의 inference rule을 만든다. 10장에서는 quantifier 대신 lambda가 name을 bind하고 beta-reduction이 substitution을 요구한다. 11장에서는 syntactic substitution 대신 environment와 closure가 같은 semantic effect를 구현한다. type chapter에서는 value meaning 대신 typing judgment를 constructor에 맞춘 rule로 derive한다.

1장을 제대로 이해했다는 기준은 기호를 외우는 것이 아니다. 처음 보는 언어 기능을 만났을 때 ‘추상 constructor는 무엇인가, 의미 함수의 형식은 무엇인가, 각 constructor의 방정식은 부분 의미만 쓰는가, 어떤 이름을 묶는가, 치환 정리가 계속 성립하는가’를 스스로 묻는다면 이 장의 도구를 얻은 것이다.

> [!tip] Question to carry into Chapter 2
> assertion은 모든 state에서 즉시 truth value를 내는 total function으로 해석할 수 있었다. 하지만 `while true do skip` 같은 command는 final state를 내지 않는다. syntax-directedness와 compositionality를 유지하면서 ‘result가 없음’을 semantics에 넣으려면 어떤 value와 order structure가 필요한가? 이 질문이 domain과 least fixed point로 이어진다.

> [!question] Retrieval check
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

# Condensed review

## Step 1 — Separate notation from structure — §1.1

추상 문법은 괄호·우선순위 같은 표기상의 우연을 버리고 constructor와 부분구조만 남긴다.

expression은 문자열이 아니라 constructor로 만든 tree다. algebraic data type의 variant처럼 각 node를 유일하게 분해할 수 있고 모든 tree가 유한하게 만들어진다는 조건이 initial algebra의 핵심이다. semantic function과 structural induction은 이 constructor structure를 그대로 따라간다.

> [!question] Close the book and answer
> `x + y × z`를 구체 표기와 constructor 트리 두 방식으로 써 보라.

### English companion

An abstract grammar discards notational accidents such as parentheses and precedence, retaining constructors and substructure.

An expression is a tree built by constructors, not a character string. Semantics and proofs can therefore follow the way the tree is built. This supports syntax-directed definitions and structural induction.

---

## Step 2 — From states to meanings — §1.2

free variable이 있는 expression의 meaning은 값 하나가 아니라 state를 value로 보내는 function이다.

state `σ`가 각 variable에 integer를 배정한다면 integer expression은 `Σ→ℤ`, assertion은 `Σ→𝔹`로 해석된다. 각 constructor의 meaning을 직접 child의 meaning만으로 정의하면 semantics는 compositional하다.

> [!question] Close the book and answer
> σ(x)=2, σ(y)=5일 때 `x+y<10`의 의미를 계산하라.

### English companion

The meaning of an open expression is not one value but a function from states to values.

If a state σ assigns an integer to every variable, integer expressions denote Σ→ℤ and assertions denote Σ→𝔹. Defining each constructor from only the meanings of its immediate parts makes the semantics compositional.

---

## Step 3 — Separate truth from proof — §1.3

validity는 모든 state에서 참이라는 semantic notion이고, derivability는 inference rule로 proof를 만들 수 있다는 syntactic notion이다.

soundness는 derivable한 assertion이 모두 valid함을 보장한다. 더 strong한 assertion일수록 더 적은 state를 허용한다는 reverse-inclusion 관계는 이후 program specification rule에서 중요해진다.

> [!question] Close the book and answer
> `false`가 모든 assertion보다 강하고 `true`가 모든 assertion보다 약한 이유를 상태 집합으로 설명하라.

### English companion

Validity is semantic truth in every state; derivability is the syntactic existence of a proof from rules.

Soundness guarantees that every derivable assertion is valid. The reverse-inclusion intuition for stronger assertions becomes important in later program-specification rules.

---

## Step 4 — Substitute without capturing names — §1.4

binder는 scope를 만들며, 단순한 text replacement는 free variable을 우연히 묶을 수 있다.

substitution 전에 충돌하는 bound variable을 fresh name으로 바꾸고, free occurrence에만 동시에 replacement를 적용한다. Coincidence, Substitution, Renaming Theorem은 이 syntactic operation이 semantics를 보존한다는 핵심 보증이다.

> [!question] Close the book and answer
> `∀y. x<y`에 `y+1`을 x 대신 넣을 때 왜 먼저 y를 바꿔야 하는가?

### English companion

A binder creates a scope, and naive textual substitution can accidentally bind a free variable.

Rename conflicting bound variables before simultaneously replacing free occurrences. Coincidence, substitution, and renaming theorems are the key guarantees that syntax manipulation respects meaning.

## Self-check quiz

### Q1. What is the defining condition of compositional semantics?

합성적 semantics의 핵심 조건은?

- A. 의미가 소스 문자열 길이에 의존한다 / Meaning depends on source-string length
- B. 구성물의 의미가 직접 부분식의 의미로 결정된다 / A construct's meaning is determined by meanings of its immediate parts
- C. 모든 프로그램이 종료한다 / Every program terminates

> [!success]- Answer and explanation
> **B.** compositionality는 표면 표기가 아니라 직접 child의 meaning만을 사용한다.
>
> EN: Compositionality uses the meanings of substructures, not representational details.

### Q2. Why is capture-avoiding substitution necessary?

capture-avoiding substitution이 필요한 직접적인 이유는?

- A. operator precedence를 정하려고 / To choose operator precedence
- B. free variable이 새 binder에 묶여 meaning이 바뀌는 일을 막으려고 / To prevent a free variable from becoming bound and changing meaning
- C. integer overflow를 막으려고 / To prevent integer overflow

> [!success]- Answer and explanation
> **B.** substitution은 어떤 occurrence가 free인지 보존해야 한다.
>
> EN: Substitution must preserve which occurrences are free.

### Q3. Which correctly relates validity and derivability?

validity와 derivability의 올바른 관계는?

- A. 둘은 definition상 같다 / They are identical by definition
- B. validity는 semantic이고 derivability는 syntactic이다 / Validity is semantic; derivability is syntactic
- C. 둘 다 state 하나에서의 execution result다 / Both are outcomes in one state

> [!success]- Answer and explanation
> **B.** soundness와 completeness는 서로 다른 두 notion을 연결하는 property다.
>
> EN: Soundness and completeness connect these distinct notions.

## Next concept

이제 의미가 단순한 진릿값이 아니라 possibly nonterminating state transformer가 되면서 domain theory가 필요해진다.

**English:** Next, meanings become possibly nonterminating state transformations, which forces us to introduce domain theory.

## Source boundary

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 1–23.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
