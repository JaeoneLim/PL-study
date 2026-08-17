---
type: chapter
title: "02. The Simple Imperative Language"
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

# 02. The Simple Imperative Language

> [!abstract] At a glance
> The Simple Imperative Language는 assignment, sequencing, conditional, `while`, local variable로 이루어지며 nontermination을 포함하는 denotational semantics을 갖는다.
>
> **English:** A small language of assignment, sequencing, conditionals, while loops, and local variables is given a denotational semantics that includes nontermination.

## Learning objectives

- command를 possibly nonterminating state transformer (비종료 가능 상태 변환 함수)로 해석한다.
  - EN: Interpret commands as possibly nonterminating state transformers.
- `while`의 denotation이 least fixed point인 이유를 설명한다.
  - EN: Explain why a while loop denotes a least fixed point.
- local variable와 aliasing이 substitution을 어렵게 만드는 방식을 추적한다.
  - EN: Trace how local variables and aliasing complicate substitution.

## Key terms

- **domain**
- **continuous function**
- **least fixed point**
- **syntactic sugar**
- **full abstraction**

## Chapter glossary

> [!info] How to use analogies
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### domain

domain (정보 순서 구조)은 계산 결과의 정보량을 순서로 나타내고 점점 더 정확해지는 approximation의 limit를 담는다. bottom element `⊥`는 아직 결과가 없거나 computation이 nonterminate함을 나타낸다.

> [!example] Engineering view
> 4상태 논리에서 X가 구체적인 0이나 1보다 information이 적다고 보는 관점이 출발점에 가깝다. 단, domain은 단순 signal value를 넘어 program result의 approximation도 다룬다.

**English definition:** A mathematical space that orders computation results by information content and contains limits of increasingly precise approximations. Its bottom element ⊥ represents no result yet, including nontermination.

> [!example] Engineering view
> The starting intuition resembles treating X as less informative than a concrete 0 or 1 in four-state logic. Domains extend that idea to approximations of whole computations.

```text
⊥ ⊑ d
```

### continuous function

continuous function (연속 함수)은 information이 증가하는 chain의 least upper bound (lub)를 보존한다. finite input information에서 갑자기 infinite evidence를 요구하지 않는다는 뜻이다.

> [!example] Engineering view
> 반복 시뮬레이션에서 입력 근사를 조금씩 정교하게 할 때 출력 근사도 일관되게 정교해지고, 그 극한이 완전한 입력의 출력과 맞는 상황을 떠올리면 된다.

**English definition:** A function that preserves least upper bounds of increasing chains of information. Intuitively, it cannot demand infinitely much new information all at once from finite input evidence.

> [!example] Engineering view
> Imagine iterative simulation where refining the input approximation consistently refines the output, and the limit agrees with the output for the fully known input.

### least fixed point

least fixed point (최소 고정점)는 `F(x)=x`를 만족하는 solution 가운데 information order상 가장 작다. recursion이나 `while`의 finite unfolding이 정당화하는 behavior만 포함한다.

> [!example] Engineering view
> 피드백 회로의 값을 미지 상태에서 시작해 전달 규칙을 반복 적용하여 안정점에 도달시키는 해석과 닮았다. ‘최소’는 근거 없는 추가 동작을 넣지 않는다.

**English definition:** The least solution, in the information order, of `F(x)=x`. For recursion or while loops, it includes only behavior justified by some finite unfolding.

> [!example] Engineering view
> It resembles starting a feedback network from an unknown state and repeatedly applying propagation rules until a stable solution is reached. “Least” excludes unsupported extra behavior.

```text
fix(F) = ⨆ₙ Fⁿ(⊥)
```

### syntactic sugar

syntactic sugar는 core language의 기존 construct로 meaning-preserving translation할 수 있는 convenience notation이다. 쓰기 편해지지만 원칙적으로 새 computational power를 추가하지 않는다.

> [!example] Engineering view
> HDL의 generate construct나 repetition macro가 elaboration 뒤 더 basic한 instance set으로 바뀌는 것과 같다. translated form이 original intent를 preserve해야 한다.

**English definition:** Convenient notation that can be translated meaning-preservingly into existing core-language constructs. It improves usability without necessarily adding computational power.

> [!example] Engineering view
> It is like an HDL generate construct or repetition macro elaborating into a more basic set of instances. The elaborated form must preserve the intended behavior.

### full abstraction

full abstraction (완전 추상성)은 semantic equality와 어떤 program context도 둘을 구별하지 못하는 contextual equivalence가 정확히 일치하는 성질이다.

> [!example] Engineering view
> 두 IP가 모든 허용 testbench에서 같은 핀 동작을 보일 때에만 모델도 둘을 같다고 보는 이상적인 대응이다. 모델이 testbench가 볼 수 없는 내부 차이를 구별하면 너무 세밀하다.

**English definition:** The property that semantic equality coincides exactly with indistinguishability by every program context.

> [!example] Engineering view
> Ideally, a model equates two IP blocks exactly when every permitted testbench sees the same pin behavior. A model that distinguishes invisible internal details is too fine-grained.

## Detailed chapter map

> [!abstract] This chapter's role
> The Simple Imperative Language를 완전한 수학적 대상으로 만들고, iteration과 recursion에 의미를 부여하는 domain theory (도메인 이론)의 최소 도구를 도입한다.
>
> **English:** Turns a small imperative language into a complete mathematical object and introduces the minimum domain theory needed to interpret iteration and recursion.

### §2.1–2.2 · Syntax, states, and semantic functions

expression은 state에서 value로, command는 possibly nonterminating state transformer (비종료 가능 상태 변환 함수)로 해석된다. undefinedness는 arithmetic error가 아니라 nontermination을 먼저 나타낸다.

**English — Syntax, states, and semantic functions:** Expressions map states to values, while commands are partial functions from states to states. Undefinedness initially represents nontermination rather than arithmetic failure.

### §2.3–2.4 · Domains, continuity, and least fixed points

partial information을 information order로 정렬하고 chain의 least upper bound (lub)를 사용한다. continuous function의 least fixed point는 `while` denotation을 finite approximant의 limit로 구성한다.

**English — Domains, continuity, and least fixed points:** Partial information is ordered and increasing chains receive least upper bounds. A continuous function’s least fixed point constructs while-loop meaning as the limit of finite approximations.

### §2.5–2.6 · Declarations, substitution, and syntactic sugar

local variable declaration의 denotation을 state update와 restoration으로 설명한다. `for` command는 core language로 desugar되는 derived form이며 translation은 variable capture와 evaluation 횟수를 보존해야 한다.

**English — Declarations, substitution, and syntactic sugar:** Local declarations are compared through environment extension and substitution. A for-command is derived syntax whose translation must preserve binding and evaluation behavior.

### §2.7 · Arithmetic-error policy

unchecked arithmetic은 정확히 지정된 total hardware function을 사용할 수 있다. checked arithmetic은 별도 error result와 propagation rule이 필요하지만, 이 장은 Chapter 3의 predicate-logic assertion language와 연결하기 위해 그 확장을 보류한다.

**English — Arithmetic-error policy:** Unchecked arithmetic can use precisely specified total hardware functions. Checked arithmetic requires explicit error results and propagation rules, but this chapter defers that extension to preserve the connection with Chapter 3's assertion language.

### §2.8 · Soundness and full abstraction

semantic soundness가 observation을 보존하는지 검사한다. full abstraction (완전 추상성)은 semantic equality와 contextual equivalence (문맥 동치)의 정확한 일치를 요구한다.

**English — Soundness and full abstraction:** Checks whether denotations preserve operational observations and identify only programs no context can distinguish. Full abstraction asks denotational and contextual equivalence to coincide.

## What to retain

- command의 핵심 semantic object는 nontermination을 포함하는 state transformer다.
  - EN: A command’s central semantic object is a state transformer, generally partial because of divergence.
- `while`은 semantic equation의 임의의 solution이 아니라 finite execution으로 approximate되는 least fixed point를 취한다.
  - EN: A while-loop takes the least solution of its semantic equation—the one approximated by finite executions.
- language extension은 새 observation을 semantic domain에 추가하게 만든다.
  - EN: Language extensions force new observations into the semantic domain.

> [!warning] Common confusions
> - bottom element `⊥`를 자동으로 error라 부르지 않는다. 이 장의 기본 model에서는 nontermination이다.
>   - EN: Do not automatically read bottom as ‘error’; in the basic model it denotes nontermination.
> - fixed-point equation만 쓰는 것으로는 부족하다. 왜 least fixed point를 선택하는지 설명해야 한다.
>   - EN: Writing a fixed-point equation is insufficient; explain why the least fixed point is selected.

# Chapter 2 complete study text (75 MIN READ)

이 본문은 교재 2장의 논증 순서를 따라가면서 각 정의가 해결하는 문제를 독립적으로 다시 구성한 학습 해설이다. The Simple Imperative Language (단순 명령형 언어)가 익숙해 보여도 핵심은 실행법을 아는 데 있지 않다. possibly nonterminating command (종료하지 않을 수 있는 명령)에 수학적 의미를 주고, iteration (반복)을 finite approximant (유한 근사)의 limit (극한)로 정당화하며, local variable (지역 변수)와 aliasing (별칭)이 substitution law (치환 법칙)를 어떻게 바꾸는지 정확히 설명하는 것이 목표다.

1장에서 확립한 흐름은 그대로 유지된다. 먼저 integer expression·Boolean expression·command의 abstract syntax을 정하고 각 constructor에 semantic equation (의미 방정식)을 대응시킨다. 그러나 `while`은 자기 자신을 다시 언급하므로 structural recursion (구조 재귀)만으로 끝나지 않는다. 이 균열 때문에 information order (정보 순서), continuity (연속성), least fixed point (최소 고정점)가 도입되고, 뒤의 recursive function (재귀 함수)과 infinite computation (무한 계산)을 다룰 공통 도구가 만들어진다.

표기에서 `Σ = Var → ℤ`는 state set (상태 집합), `Σ⊥ = Σ ∪ {⊥}`는 nontermination (비종료)을 추가한 result space (결과 공간)다. `f†`는 state에서 result로 가는 function `f : Σ → Σ⊥`의 strict extension (엄격 확장)이다. order symbol `⊑`는 숫자의 크기가 아니라 정보량을 비교한다. 이 세 표기를 끝까지 구분하면 2장의 계산과 증명이 한 흐름으로 보인다.

한국어 문장은 각 term이 왜 필요한지, equation을 어떤 순서로 계산하는지, 잘못된 번역이 어떤 오해를 만드는지를 설명한다. 그러나 수학적 대상을 가리키는 이름은 English canonical form을 유지한다. 예를 들어 state transformer를 한국어로만 ‘상태 변환’이라 쓰면 state 일부를 update하는 operation으로 좁게 읽을 수 있지만, 이 장의 state transformer는 command 전체가 denote하는 possibly nonterminating function이다. 마찬가지로 domain을 단순한 정의역으로, functional을 functor로, bottom을 빈 state나 arithmetic error로 읽지 않도록 English term과 type을 함께 확인한다. 이 원칙은 한국어 설명을 줄이기 위한 것이 아니라 설명이 정확히 어느 원문 concept을 가리키는지 계속 고정하기 위한 것이다. 본문 전체에서 이 기준을 유지한다.

> [!info] English introduction
> This independent study explanation follows Chapter 2's argumentative order. The small imperative language is familiar, but the point is not merely to know how it runs. The task is to give mathematical meaning to possibly nonterminating commands, justify iteration as a limit of finite approximations, and explain exactly how local variables and aliasing change substitution laws.
>
> The Chapter 1 workflow remains in force: define the abstract syntax of integer expressions, Boolean expressions, and commands, then give semantic equations for their constructors. A `while` command, however, refers back to itself and cannot be handled by ordinary structural recursion alone. That gap motivates information order, continuity, and least fixed points—the same tools later used for recursive functions and infinite computation.
>
> We write `Σ = Var → ℤ` for states and `Σ⊥ = Σ ∪ {⊥}` for results extended with divergence. For `f : Σ → Σ⊥`, `f†` denotes its strict extension that also accepts `⊥`. The order `⊑` compares information, not numeric magnitude. Keeping these three conventions distinct makes the chapter's calculations and proofs cohere.
>
> Korean prose explains motivation, calculation order, and likely misconceptions, while canonical English terms keep each explanation attached to the exact textbook concept. Read the English term together with its type so that state transformer, domain, functional, and bottom are not mistaken for nearby but different notions.

## 01. Isolating imperative computation as state change — Introduction · p. 24 · 4 min

> [!abstract] Section focus
> 익숙한 language를 좁게 만들면 nontermination (비종료)·iteration (반복)·locality (지역성)라는 새 이론만 선명하게 볼 수 있다.

실제 language는 imperative state change (명령형 상태 변화)와 functional computation (함수형 계산)을 섞는다. 2장은 그 상호작용을 잠시 미루고 assignment (대입), sequencing (순차 실행), conditional (조건문), `while`, local variable declaration (지역 변수 선언)만 남긴다. 이 language는 작지만 임의로 오래 실행할 수 있고 integer variable을 갱신할 수 있으므로 imperative computation의 핵심 문제를 이미 품고 있다. 뒤의 array, failure, I/O, nondeterminism, concurrency는 이 core language에 observation (관찰)과 effect (효과)를 하나씩 보태는 extension이다.

1장의 assertion은 모든 state (상태)에서 반드시 truth value (진릿값)를 냈다. 반면 command는 initial state (초기 상태)에서 출발해 final state (최종 상태)를 주지 않을 수 있다. `while true do skip`은 well-formed command지만 어떤 initial state에서도 terminate하지 않는다. 따라서 semantic codomain (의미 공역)을 먼저 바꾸지 않으면 모든 command에 denotation (의미)을 주겠다는 약속부터 실패한다. bottom element `⊥`는 이런 final result의 부재를 semantic domain 안에 드러낸다.

이 장의 두 번째 변화는 name이 읽기 전용이 아니라 writable location (쓰기 가능한 저장 위치)이 된다는 점이다. assertion에서 variable을 다른 expression으로 substitute하는 일은 값을 다시 표현하는 문제였다. command에서 variable은 assignment target (대입 대상)에도 나타나므로 substitution은 storage location 자체를 합치거나 나눌 수 있다. 서로 다른 name을 하나로 보내는 순간 aliasing이 생기고, 원래 독립이던 assignment의 순서가 observable해진다.

### Four problems solved in Chapter 2

- command denotation: initial state (초기 상태)에서 normal final state (정상 최종 상태) 또는 nontermination으로 가는 state transformer (상태 변환 함수)를 정의한다.
- iteration: recursive equation (재귀 방정식)의 여러 solution 중 finite execution (유한 실행)이 정당화하는 least solution을 고른다.
- binding과 substitution: local variable의 scope (범위), restoration (복원), free variable (자유 변수), assignment target, aliasing condition을 분리한다.
- 추상화의 적절성: 선택한 관찰과 context에 비해 semantics이 너무 거칠거나 세밀하지 않은지 검사한다.

> [!tip] How to read the canonical terminology
> 이 장에서는 English canonical term을 먼저 읽고 괄호 안의 한국어를 이해를 돕는 gloss로 읽는다. 예를 들어 state transformer (상태 변환 함수)는 단순히 state의 일부를 바꾼다는 말이 아니라 command의 denotation 전체, 즉 initial state를 받아 final state 또는 nontermination을 돌려주는 function을 가리킨다. 한국어 설명이 자연스럽더라도 이 technical identity를 state transformer라는 이름으로 계속 추적해야 정의와 theorem을 같은 대상으로 연결할 수 있다.
>
> domain, predomain, bottom, lifting, chain, least upper bound (lub), continuous function은 서로 독립된 번역어 목록이 아니라 하나의 수학적 construction을 이루는 용어다. domain은 일반적인 입력 범위가 아니라 information order와 chain limit를 갖는 구조이고, bottom은 빈 state가 아니라 이 장의 lifted result space에서 final result가 없음을 나타내는 least element다. 따라서 각 term을 한국어만으로 바꾸면 function domain이나 arithmetic order 같은 다른 개념과 경계가 흐려질 수 있다.
>
> least fixed point와 functional도 원문 term을 유지한다. `F`는 category theory의 functor가 아니라 command denotation을 입력받아 더 정교한 command denotation을 만드는 higher-order function, 즉 functional이다. semantic soundness와 full abstraction 역시 proof-rule soundness나 일반적인 완전성과 다른 정확한 logical direction을 가지므로 English term을 기준으로 식과 설명을 함께 읽는다.
>
> chapter title과 section heading도 English canonical form을 사용한다. heading은 원문에서 어떤 object와 theorem을 다루는지 찾는 navigation key이므로 한국어 번역으로 바꾸지 않는다. 한국어 본문은 정의의 동기, equation의 읽는 순서, counterexample의 의미를 충분히 설명하되, heading과 technical term을 그대로 검색해 교재·강의 노트·추가 문헌의 같은 개념으로 이동할 수 있게 한다.
>
> Chapter 1의 initial algebra와 predicate logic도 연결 문맥에서 English를 먼저 둔다. initial algebra (초기 대수)는 finite constructor로 생성되는 syntax의 least-solution 관점을, predicate logic (술어 논리)은 Chapter 3 specification에 쓰일 assertion language를 가리킨다. 두 term을 한국어만으로 적으면 Chapter 2의 least fixed point와 executable Boolean expression 사이의 cross-chapter connection을 원문 terminology로 추적하기 어렵다.
>
> theorem name은 특히 축약하지 않는다. Coincidence Theorem for Commands는 initial state가 relevant free variable에서 agree할 때 termination과 relevant result가 함께 agree한다는 clause와 freely unassigned variable을 보존하는 frame clause를 가진다. Substitution Theorem for Commands는 relevant name에 대한 injectivity를 요구하고, Renaming Theorem for Commands는 fresh local binder의 α-renaming을 다룬다. 모두 한국어로 ‘일치 정리·치환 정리·이름변경 정리’라고만 쓰면 Chapter 1 theorem과 command theorem의 서로 다른 hypothesis를 구별하기 어렵다.

> [!tip] Bottom is not an empty state
> state `σ`는 모든 variable에 integer를 배정한다. bottom `⊥`는 그런 배정 중 하나가 아니라 final state가 전혀 생산되지 않았음을 나타내는 별도 result다. 따라서 `σ ⊑ τ`를 variable value의 수치 비교로 읽지 말고 computation result에 관한 정보 비교로 읽어야 한다.

> [!question] Retrieval check
> 1. Chapter 1의 semantic codomain (의미 공역)만으로 `while true do skip`을 해석할 수 없는 이유를 말하라.
> 2. command의 name substitution (이름 치환)이 expression에서보다 위험한 이유를 assignment target (대입 대상)과 연결해 설명하라.

### English companion — Isolating imperative computation as state change

*Restricting a familiar language makes the new theory of divergence, iteration, and locality visible.*

Real languages mix imperative state change with functional computation. Chapter 2 postpones their interaction and retains assignment, sequencing, conditionals, `while`, and local declarations. This language is small but can run arbitrarily long and update integer variables, so it already contains the central semantic problems of imperative computation. Later chapters add arrays, failure, I/O, nondeterminism, and concurrency to this core.

Chapter 1 assertions always produced a truth value. A command may start in a state and never produce a final state: `while true do skip` is perfectly valid syntax but terminates from no initial state. The semantic codomain must therefore change before every command can receive a denotation. Bottom `⊥` makes this absence of a result explicit inside the model.

The second change is that names become writable locations rather than merely readable inputs. In assertions, substitution re-expressed values. In commands, variables also occur on assignment's left side, so substitution may merge or separate storage locations. Mapping distinct names to one name creates aliasing and can make the order of previously independent assignments observable.

### Four problems solved in Chapter 2

- Command meaning: define a function from an initial state to either a normal final state or divergence.
- Iteration: select, among many solutions to a recursive equation, the least one justified by finite execution.
- Binding and substitution: separate scope, restoration, free variables, assigned variables, and aliasing conditions.
- Adequacy of abstraction: check whether semantics is too coarse or too fine for the chosen observations and contexts.

> [!tip] How to read the canonical terminology
> Read the English canonical term first and treat the Korean parenthetical as a gloss. A state transformer is the complete command denotation from an initial state to a final state or nontermination, not merely an update to part of a state. Keeping the English identity visible connects definitions and theorems to the same object.
>
> Domain, predomain, bottom, lifting, chain, least upper bound, and continuous function form one mathematical construction. Here domain is not merely an input range, and bottom is not an empty state. Replacing these terms with Korean-only labels can blur their boundaries with other concepts.
>
> Least fixed point and functional likewise remain canonical. Here `F` is a higher-order function on command denotations, not a category-theoretic functor. Semantic soundness and full abstraction also have exact logical directions distinct from proof-rule soundness and ordinary completeness.
>
> Chapter and section headings remain in their canonical English forms because they are navigation keys into the textbook and related literature. Korean prose supplies motivation and explanation without replacing those searchable terms.
>
> Cross-chapter references likewise retain initial algebra and predicate logic in English. They connect finite syntax generation to least fixed points and executable Boolean expressions to the assertion language used for specifications.
>
> Keep theorem names exact as well. The command Coincidence, Substitution, and Renaming theorems have hypotheses different from their Chapter 1 counterparts, so shortened translated labels obscure which result is being used.

> [!tip] Bottom is not an empty state
> A state `σ` assigns an integer to every variable. Bottom is not one such assignment; it is the separate outcome indicating that no final state is produced. Thus `σ ⊑ τ` is not a numeric comparison of variable values but an information comparison between computation results.

> [!question] Retrieval check
> 1. Why can Chapter 1's semantic codomain not interpret `while true do skip`?
> 2. Why is name substitution more dangerous for commands than expressions? Relate the answer to assignment's left side.

---

## 02. Three phrase classes and command constructors — §2.1 · pp. 24–26 · 5 min

> [!abstract] Section focus
> expression은 상태를 관찰하고 command는 상태를 바꾼다는 형식 구분이 의미 오류를 미리 차단한다.

language에는 integer expression, Boolean expression, command라는 세 carrier set (운반집합)이 있다. integer expression은 Chapter 1의 integer expression과 같고 Boolean expression은 quantifier-free assertion (수량자 없는 assertion)이다. unbounded integer quantification은 일반적으로 runtime guard로 decidable하거나 effectively evaluable하지 않으므로 executable guard에서 제외한다. Chapter 3의 specification에는 더 강한 predicate-logic assertion language를 사용하지만 실행 중 guard는 computable Boolean expression으로 제한한다.

command의 core constructor는 assignment `v := e`, 아무 변화도 만들지 않는 `skip`, sequencing `c₀ ; c₁`, conditional `if b then c₀ else c₁`, loop `while b do c`다. 모든 variable은 integer value만 저장하며 Boolean variable은 없다. 이는 modern language의 complete type system을 흉내 내려는 선택이 아니라 multiple type 때문에 생기는 부수 문제를 Chapter 15까지 미루는 deliberate simplification (의도적 단순화)이다.

표면 표기에서는 `:=`가 expression 연산자보다 약하고 `;`가 그보다 더 약하게 결합한다. `if`의 else-branch, `while`의 body, 뒤에서 나오는 `newvar`의 body는 stopping symbol이나 둘러싼 구절의 끝까지 뻗는다. `;`의 결합 방향은 파싱에는 필요하지만 semantics에서는 순차 합성이 결합법칙을 만족하므로 최종 의미에 영향을 주지 않는다. 이것은 concrete syntax의 차이와 semantic equality를 구분하는 작은 사례다.

### Core abstract grammar

```text
intexp e ::= n | v | -e | e+e | e-e | e×e | e÷e | e rem e
boolexp b ::= true | false | e=e | e≠e | e<e | e≤e | e>e | e≥e
            | ¬b | b∧b | b∨b | b⇒b | b⇔b
comm c ::= v:=e | skip | c;c
         | if b then c else c
         | while b do c
```

각 production은 하나의 constructor와 하나의 의미 절을 요구한다. `while`도 syntax 면에서는 다른 constructor와 같지만, 그 의미 절은 재귀적인 실행을 표현해야 한다는 점에서 특별하다.

> [!example] Reading a string as a command tree
> `x:=x+1; if x<y then y:=x else skip`의 최상위 구조를 찾자.
>
> 1. expression 연산이 먼저 묶이므로 첫 command는 `x := (x+1)`이다.
> 2. `;`가 가장 weak하게 bind하므로 root는 sequencing constructor다.
> 3. right child는 guard `x<y`, then-branch `y:=x`, else-branch `skip`을 가진 conditional이다.
> 4. semantics은 이 트리의 자식 의미를 계산할 뿐 원래 공백이나 우선순위 표를 다시 보지 않는다.
>
> **결론:** 파싱이 확정한 constructor 구조가 이후 의미 계산과 구조적 귀납의 기준이다.

> [!question] Retrieval check
> 1. boolean expression에서 수량자를 제외하면서도 명세용 assertion에는 남겨 둘 수 있는 이유는 무엇인가?
> 2. `c₀;c₁;c₂`의 결합 방향이 denotation을 바꾸지 않으려면 순차 의미가 어떤 법칙을 만족해야 하는가?

### English companion — Three phrase classes and command constructors

*The phrase distinction—expressions observe states, commands change them—rules out many semantic mistakes syntactically.*

The language has three carriers: integer expressions, Boolean expressions, and commands. Integer expressions are inherited from Chapter 1; Boolean expressions are quantifier-free assertions. Quantifiers are excluded because there is no general runtime procedure that searches all integers. Chapter 3 may use a stronger assertion language for specifications, while executable guards remain computable Boolean expressions.

The command constructors are assignment `v := e`, inert `skip`, sequence `c₀ ; c₁`, conditional `if b then c₀ else c₁`, and loop `while b do c`. Every variable stores an integer; there are no Boolean variables. This is a deliberate simplification, not a model of a complete modern type system—the complications of multiple types are postponed until Chapter 15.

In surface notation, `:=` binds less tightly than expression operators, and `;` still less tightly. An `else` branch, loop body, or later `newvar` body extends to a stopping symbol or the end of its enclosing phrase. Parsing needs an associativity convention for `;`, but semantic sequencing is associative, so the chosen parse grouping has no effect on denotation. This is a small example of separating concrete syntax from semantic equality.

### Core abstract grammar

```text
intexp e ::= n | v | -e | e+e | e-e | e×e | e÷e | e rem e
boolexp b ::= true | false | e=e | e≠e | e<e | e≤e | e>e | e≥e
            | ¬b | b∧b | b∨b | b⇒b | b⇔b
comm c ::= v:=e | skip | c;c
         | if b then c else c
         | while b do c
```

Each production requires one constructor and one semantic clause. Syntactically, `while` is an ordinary constructor; semantically, it is special because its clause must account for recursive execution.

> [!example] Reading a string as a command tree
> Find the outer structure of `x:=x+1; if x<y then y:=x else skip`.
>
> 1. Expression operators bind first, so the first command is `x := (x+1)`.
> 2. Because `;` binds least tightly, sequence is the root constructor.
> 3. The right child is a conditional with guard `x<y`, then-branch `y:=x`, and else-branch `skip`.
> 4. Semantics computes meanings of this tree's children and no longer consults the original spacing or precedence table.
>
> **Conclusion:** The constructor structure fixed by parsing drives all later semantic calculations and structural inductions.

> [!question] Retrieval check
> 1. Why can quantifiers be absent from Boolean expressions yet remain available in specification assertions?
> 2. Which law must sequential semantics satisfy for the grouping of `c₀;c₁;c₂` not to change its denotation?

---

## 03. Calculating assignment, sequence, and conditionals as strict state transformers — §2.2 · pp. 26–28 · 8 min

> [!abstract] Section focus
> command는 초기 상태를 받아 정상 최종 상태나 `⊥`를 돌려주는 함수다.

state set을 `Σ = Var → ℤ`라 두면 integer expression은 `Σ → ℤ`, Boolean expression은 `Σ → 𝔹`를 denote한다. 이 둘은 아직 always terminating, error-free total function (항상 종료하고 오류가 없는 전체 함수)으로 가정한다. command만 `Comm → Σ → Σ⊥`로 해석한다. partial function (부분 함수)으로 써도 같은 정보를 표현할 수 있지만 bottom을 명시하면 뒤에서 lifting과 domain constructor로 확장하기 쉽다.

assignment `v:=e`는 expression을 initial state에서 먼저 evaluate한 뒤 그 value로 `v` 하나만 update (갱신)한다. 즉 `⟦v:=e⟧σ = σ[v ↦ ⟦e⟧σ]`다. right-hand expression이 `v`를 읽더라도 갱신 전 value가 쓰인다. `skip`은 identity state transformer (항등 상태 변환 함수)다. 이 두 constructor는 언제나 normal state를 돌려주므로 자체적으로 bottom을 만들지 않는다.

sequencing은 ordinary function composition처럼 보이지만 first command가 bottom을 돌려줄 수 있다는 type 문제가 있다. `⟦c₁⟧`의 input은 state이지 bottom이 아니다. 그래서 `f†(⊥)=⊥`, `f†(σ)=f(σ)`인 strict extension을 사용한다. `⟦c₀;c₁⟧σ = ⟦c₁⟧†(⟦c₀⟧σ)`는 앞이 nonterminate하면 뒤를 실행하지 않고, 앞이 terminate하면 그 final state를 뒤의 initial state로 넘긴다는 두 경우를 한 equation에 담는다.

conditional은 guard를 initial state에서 evaluate하고 정확히 한 branch만 고른다. unselected branch가 nonterminate하더라도 result에는 영향을 주지 않는다. 이 점은 metalanguage conditional을 strict하게 사용할 때 중요하다. 두 branch denotation을 먼저 모두 실행하는 식으로 읽으면 object-language control flow를 보존하지 못한다.

> [!tip] State transformer is the central semantic object
> state transformer라는 term은 assignment 하나의 update operation만 가리키지 않는다. `skip`, sequencing, conditional, `while`, `newvar`를 포함한 모든 command가 하나의 state transformer를 denote한다. assignment는 항상 normal state를 돌려주지만 sequencing이나 `while`은 앞선 computation이 nonterminate하면 bottom을 돌려줄 수 있으므로 전체 function의 codomain은 `Σ⊥`다.
>
> sequencing의 equation에서 strict extension `f†`가 필요한 이유는 type에 있다. first command의 result는 `Σ⊥`에 속하지만 second command의 state transformer는 ordinary state `Σ`를 input으로 받는다. strict extension은 bottom을 bottom으로 propagate하고 normal state에서만 second transformer를 적용해 이 type gap을 메운다. 이를 단순한 error handling으로 읽으면 이 장이 아직 채택하지 않은 arithmetic-error policy를 끌어오게 된다.
>
> conditional의 denotation도 state transformer 관점에서 branch selection을 보존한다. guard는 initial state에서 평가되고 선택된 branch의 transformer 하나만 적용된다. 선택되지 않은 branch의 nontermination은 result와 무관하다. 이 구분은 denotational equation이 object-language control flow를 그대로 표현한다는 것을 확인하는 중요한 type-directed check다.

### Semantic equations for the basic commands

```text
⟦v := e⟧ σ = σ[v ↦ ⟦e⟧ σ]
⟦skip⟧ σ = σ
⟦c₀ ; c₁⟧ σ = ⟦c₁⟧†(⟦c₀⟧ σ)
⟦if b then c₀ else c₁⟧ σ
  = if ⟦b⟧ σ then ⟦c₀⟧ σ else ⟦c₁⟧ σ

f†(r) = if r=⊥ then ⊥ else f(r)
```

`†`는 새 실행 효과가 아니라 nontermination을 전파하도록 함수의 입력 형식을 넓히는 메타언어 연산이다.

> [!example] Calculating sequential assignment by hand
> `x:=x-1; y:=y+x`를 초기 상태 `σ`에 적용하자.
>
> 1. first assignment 뒤 state는 `σ₁ = σ[x ↦ σ(x)-1]`이다.
> 2. 둘째 식 `y+x`는 원래 `σ`가 아니라 `σ₁`에서 평가되어 `σ(y)+σ(x)-1`을 낸다.
> 3. 최종 상태는 `σ[x ↦ σ(x)-1, y ↦ σ(y)+σ(x)-1]`이고 다른 변수는 보존된다.
> 4. 두 command는 항상 종료하므로 이 예제에서는 strict extension의 `⊥` 경우를 사용하지 않는다.
>
> **결론:** 순차 합성에서는 뒤 command의 expression이 갱신된 상태를 읽는다는 점을 매 단계 명시해야 한다.

> [!warning] Do not conflate propagation of bottom with propagation of errors
> 현재 model에서 bottom은 command nontermination만 뜻한다. division by zero나 overflow가 detect되어 abort하는 상황은 아직 semantic domain에 없다. `c₀;c₁`의 strictness를 ‘앞에서 error가 나면 뒤를 건너뛴다’고 설명하면 이 장이 의도적으로 보류한 policy를 몰래 추가하게 된다.

> [!question] Retrieval check
> 1. `⟦c₁⟧(⟦c₀⟧σ)`가 형식상 잘못될 수 있는 경우와 `†`가 고치는 부분을 설명하라.
> 2. unselected conditional branch의 nontermination이 whole result에 영향을 주지 않는 이유를 semantic equation으로 설명하라.
> 3. `x:=y; y:=x`가 일반적으로 swap이 아닌 이유를 상태 계산으로 보여라.

### English companion — Calculating assignment, sequence, and conditionals as strict state transformers

*A command is a function from an initial state to either a normal final state or `⊥`.*

Let `Σ = Var → ℤ`. Integer expressions denote `Σ → ℤ`, Boolean expressions denote `Σ → 𝔹`, and for now both are total and error-free. Commands alone denote `Comm → Σ → Σ⊥`. Partial functions could encode the same behavior, but explicit bottom makes later lifting and domain constructions easier to state.

Assignment `v:=e` first evaluates the expression in the initial state, then updates only `v`: `⟦v:=e⟧σ = σ[v ↦ ⟦e⟧σ]`. If the right side reads `v`, it sees the old value. `skip` is the identity transformation. Both constructs always return a normal state and never introduce bottom by themselves.

Sequence resembles ordinary composition, but the first command may return bottom while the second accepts only states. Use the strict extension `f†`, defined by `f†(⊥)=⊥` and `f†(σ)=f(σ)`. Then `⟦c₀;c₁⟧σ = ⟦c₁⟧†(⟦c₀⟧σ)` says in one equation that the second command is skipped after divergence and otherwise receives the first command's final state.

A conditional evaluates its guard in the initial state and selects exactly one branch. Divergence in the unselected branch is irrelevant. This matters when reading the metalanguage conditional: it must not eagerly execute both branch denotations, or it would fail to represent the object language's control flow.

> [!tip] State transformer is the central semantic object
> State transformer names the denotation of every command, not just the update performed by assignment. Because sequencing and loops may diverge, the codomain is `Σ⊥`.
>
> The strict extension in sequencing closes a type gap: the first command returns `Σ⊥`, while the second transformer accepts `Σ`. It propagates bottom and applies the second transformer only to a normal state; it is not yet arithmetic-error handling.
>
> A conditional evaluates its guard in the initial state and applies exactly one branch transformer. Divergence in the unselected branch is irrelevant, preserving object-language control flow.

### Semantic equations for the basic commands

```text
⟦v := e⟧ σ = σ[v ↦ ⟦e⟧ σ]
⟦skip⟧ σ = σ
⟦c₀ ; c₁⟧ σ = ⟦c₁⟧†(⟦c₀⟧ σ)
⟦if b then c₀ else c₁⟧ σ
  = if ⟦b⟧ σ then ⟦c₀⟧ σ else ⟦c₁⟧ σ

f†(r) = if r=⊥ then ⊥ else f(r)
```

The dagger is not a new runtime effect; it is a metalanguage operation extending a function's input type so that nontermination propagates.

> [!example] Calculating sequential assignment by hand
> Apply `x:=x-1; y:=y+x` to an initial state `σ`.
>
> 1. After the first assignment, `σ₁ = σ[x ↦ σ(x)-1]`.
> 2. The second expression `y+x` is evaluated in `σ₁`, not `σ`, yielding `σ(y)+σ(x)-1`.
> 3. The final state is `σ[x ↦ σ(x)-1, y ↦ σ(y)+σ(x)-1]`; all other variables are preserved.
> 4. Both commands terminate, so this example never enters the bottom case of strict extension.
>
> **Conclusion:** At every sequential step, expressions in the later command read the updated state.

> [!warning] Do not conflate propagation of bottom with propagation of errors
> In the current model, bottom means command divergence only. Detected division by zero or overflow is not yet represented. Explaining strict sequencing merely as 'skip the second command after an error' silently adds an error policy that this chapter intentionally postpones.

> [!question] Retrieval check
> 1. When can `⟦c₁⟧(⟦c₀⟧σ)` be ill-typed, and how does `†` repair it?
> 2. Use the semantic equation to explain why divergence in an unselected conditional branch does not affect the result.
> 3. Show by a state calculation why `x:=y; y:=x` is not generally a swap.

---

## 04. Why the while-unwinding equation is not yet a definition — §2.2 · pp. 28–29 · 6 min

> [!abstract] Section focus
> 자기 참조 방정식은 필요한 성질을 말하지만 의미를 유일하게 정하지 못할 수 있다.

직관적으로 `while b do c`는 guard가 true이면 `c`를 실행하고 다시 같은 loop를 실행하며 false이면 current state로 terminate한다. 이 직관을 쓰면 `Wσ = if ⟦b⟧σ then W†(⟦c⟧σ) else σ`라는 unwinding equation (펼침 방정식)을 얻는다. 여기서 `W`는 whole-loop denotation을 나타내는 unknown semantic function이다. equation 오른쪽에 `W`가 다시 나오므로 immediate subphrase `b`, `c`의 denotation만으로 전체 denotation을 계산하는 syntax-directed clause가 아니다.

방정식을 만족한다는 사실과 방정식이 해를 하나만 갖는다는 사실은 다르다. `while true do skip`에서는 오른쪽이 그냥 `Wσ`가 되어 `W=W`만 남는다. `Σ→Σ⊥`의 모든 함수가 이 식을 만족하지만, 실행 직관이 원하는 것은 모든 상태를 `⊥`로 보내는 함수 하나다. 자기 동일식은 그 함수를 골라내지 못한다.

조금 덜 극단적인 `while x≠0 do x:=x-2`도 같은 문제를 보인다. 양의 짝수에서는 0에 도달하지만 양의 홀수와 음수에서는 종료하지 않는다. 펼침 방정식은 종료하는 입력의 결과를 강제해도 실제로 loop가 끝나지 않는 입력에 임의의 상태를 배정한 가짜 해까지 허용할 수 있다. 우리는 ‘유한 횟수의 실행으로 확인되는 결과만 인정한다’는 추가 기준이 필요하다.

### Factoring unwinding into a functional equation

```text
F : (Σ → Σ⊥) → (Σ → Σ⊥)
F(f)(σ) = if ⟦b⟧σ
          then f†(⟦c⟧σ)
          else σ

while의 후보 의미 W는 F(W)=W를 만족해야 한다.
```

문제는 fixed point의 existence만이 아니라 여러 fixed point 중 execution을 가장 적게 가정하는 solution을 선택하는 것이다.

> [!example] Too many solutions for an infinite loop
> `b=true`, `c=skip`일 때 functional `F`를 simplify한다.
>
> 1. 가드는 모든 `σ`에서 참이고 `⟦skip⟧σ=σ`다.
> 2. 따라서 `F(f)(σ)=f†(σ)=f(σ)`이며 `F`는 함수 공간의 항등 함수다.
> 3. 모든 `f`가 `F(f)=f`를 만족하므로 펼침 방정식만으로는 의미가 정해지지 않는다.
> 4. 정보가 가장 적은 함수 `λσ.⊥`를 고르면 유한 실행으로 얻지 못한 최종 상태를 만들어 내지 않는다.
>
> **결론:** ‘최소’는 구현 속도가 아니라 정당화된 정보량의 최소성을 뜻한다.

> [!question] Retrieval check
> 1. 펼침 방정식이 올바른 필요조건이면서도 충분한 정의가 아닌 이유를 구분해 말하라.
> 2. `while true do skip`의 방정식이 허용하는 가짜 해 하나를 만들고 왜 실행 직관과 어긋나는지 설명하라.
> 3. loop 의미를 직접 구조 재귀로 정의하려 할 때 어느 부분에서 더 작은 syntax으로 내려가지 못하는가?

### English companion — Why the while-unwinding equation is not yet a definition

*A recursive equation states a necessary property but may fail to determine a unique denotation.*

Intuitively, `while b do c` runs `c` and repeats when the guard is true, otherwise returning the current state. This gives the unwinding equation `Wσ = if ⟦b⟧σ then W†(⟦c⟧σ) else σ`, where `W` is the unknown loop denotation. Because `W` occurs on the right, the equation does not compute the whole solely from denotations of the immediate subphrases `b` and `c`; it is not yet a syntax-directed clause.

Satisfying an equation is different from being its unique solution. For `while true do skip`, the right side reduces to `Wσ`, leaving only `W=W`. Every function in `Σ→Σ⊥` satisfies this identity, although operational intuition wants the single function mapping every state to bottom. The identity cannot select it.

The less extreme `while x≠0 do x:=x-2` has the same problem. Positive even inputs reach zero; positive odd and negative inputs diverge. The unwinding equation constrains terminating cases but may admit fake solutions assigning arbitrary states to inputs where the loop never terminates. We need an extra criterion: accept only results justified by some finite number of execution steps.

### Factoring unwinding into a functional equation

```text
F : (Σ → Σ⊥) → (Σ → Σ⊥)
F(f)(σ) = if ⟦b⟧σ
          then f†(⟦c⟧σ)
          else σ

while의 후보 의미 W는 F(W)=W를 만족해야 한다.
```

The problem is not merely to find a fixed point but to select, among possibly many, the solution that assumes the least behavior.

> [!example] Too many solutions for an infinite loop
> Simplify the functional `F` when `b=true` and `c=skip`.
>
> 1. The guard is true in every `σ`, and `⟦skip⟧σ=σ`.
> 2. Thus `F(f)(σ)=f†(σ)=f(σ)`, so `F` is the identity on the function space.
> 3. Every `f` satisfies `F(f)=f`, so unwinding alone does not determine a denotation.
> 4. Choosing the least-informative function `λσ.⊥` invents no final state unsupported by finite execution.
>
> **Conclusion:** Leastness concerns justified information, not implementation speed.

> [!question] Retrieval check
> 1. Why is the unwinding equation a correct necessary condition but not a sufficient definition?
> 2. Construct one fake solution admitted for `while true do skip` and explain why it conflicts with execution intuition.
> 3. Where does a direct structural-recursive definition of loop meaning fail to descend to smaller syntax?

---

## 05. Information order, chains, predomains, and lifting — §2.3 · pp. 29–32 · 7 min

> [!abstract] Section focus
> domain (정보 순서 구조)은 실행값의 크기가 아니라 computation (계산)에 관해 얼마나 많은 result가 알려졌는지를 정렬한다.

domain theory의 order `x ⊑ y`는 `x`가 `y`를 approximate (근사)한다, 즉 `y`가 적어도 `x`만큼의 information을 준다는 뜻이다. 이는 수치 해석의 오차 거리와 다르다. normal state `σ`는 complete final result이므로 다른 normal state `τ`와 incomparable (비교 불가능)하고 자기 자신과만 비교된다. 반면 bottom `⊥`는 final result를 전혀 알려 주지 않으므로 모든 `σ` 아래에 놓인다.

chain (증가 정보 사슬)은 `x₀ ⊑ x₁ ⊑ x₂ ⊑ ···`인 countable increasing sequence다. 그 least upper bound (lub, 최소 상한)는 모든 stage보다 위에 있으면서 그런 upper bound 중 가장 작은 element이고 chain의 limit라 부른다. predomain은 모든 chain의 limit를 포함하는 partially ordered set (부분순서집합)이다. domain은 predomain이면서 least element `⊥`를 가진다. 이 책의 정의는 모든 directed set이 아니라 countable chain만 요구한다.

ordinary set `P`는 equality만을 order로 하는 discrete predomain으로 볼 수 있다. 서로 다른 element가 incomparable하므로 그 chain은 결국 같은 element만 반복하고 limit가 자명하다. lifting `P⊥`는 fresh bottom `⊥`를 모든 element 아래에 추가한다. `Σ`를 discrete predomain으로 보고 lift하면 command-result domain `Σ⊥`를 얻는다. 가능한 chain은 bottom이 몇 번 나오다가 하나의 state `σ`가 계속 반복되는 모양뿐이며, 서로 다른 정상 상태 사이를 오갈 수는 없다.

이 단순한 shape가 loop approximation (반복문 근사)에 정확히 맞는다. 초기 몇 stage에서는 허용된 iteration 횟수가 부족해 bottom만 알 수 있다. 충분한 stage가 되면 특정 final state가 드러나고 이후 더 많은 unfolding도 같은 state를 유지한다. 실제 execution이 nonterminate하면 chain 전체가 bottom이다. limit는 이 두 경우를 하나의 연산으로 결합한다.

> [!tip] Domain-theory terms form one construction
> 먼저 ordinary set `Σ`를 discrete predomain으로 본다. discrete라는 말은 서로 다른 normal state가 information order에서 비교되지 않는다는 뜻이다. 그다음 lifting으로 fresh bottom을 추가해 `Σ⊥`를 만든다. 이 construction을 거치면 command result는 normal final state 하나이거나 bottom 하나이며, 숫자 크기나 state component의 대소가 order에 섞이지 않는다. 이 단계가 state transformer의 codomain을 정확히 정한다.
>
> chain은 computation에 관한 knowledge가 증가하는 sequence이고 least upper bound (lub)는 그 모든 finite stage가 제공한 information을 모으는 가장 작은 upper bound다. flat domain에서는 어떤 final state가 한 번 나타난 뒤 다른 final state로 바뀌는 sequence가 chain일 수 없다. 그래서 limit는 무한히 기다린 뒤 임의의 값을 발명하지 않고, 어떤 finite approximant에서 이미 정당화된 final state만 보존한다.
>
> predomain과 domain의 차이도 이 교재의 definition 그대로 유지한다. predomain은 countable chain의 limit를 포함하고, domain은 여기에 least element를 추가로 갖는다. 다른 문헌에서는 dcpo나 cpo라는 용어와 조건이 조금 다를 수 있으므로, 이 장의 proof에서는 Reynolds가 사용하는 countable-chain definition을 기준으로 삼아야 한다.

### Information order of the flat domain `Σ⊥`

```text
r ⊑ r'  iff
  r = ⊥
  or
  r = r' = σ  for some σ ∈ Σ

⊥ ⊑ σ       for every σ
σ ⊑ τ       iff σ = τ
```

정상 상태끼리는 변수별 대소를 비교하지 않는다. 서로 다른 최종 상태는 서로 다른 완전 정보이므로 incomparable하다.

> [!example] Two shapes of loop-approximation chains
> 한 초기 상태 `σ`에서 유한 전개 의미 `a₀,a₁,…`를 비교한다.
>
> 1. loop가 세 번의 body execution 뒤 terminate하면 early approximant는 `⊥,⊥,⊥`이고 sufficiently advanced approximant부터 같은 final state `τ`다.
> 2. 이 chain의 limit는 `τ`다. 어떤 다른 정상 상태도 `τ`와 비교되지 않으므로 임의의 결과가 섞일 수 없다.
> 3. loop가 nonterminate하면 모든 approximant와 limit가 bottom이다.
> 4. 따라서 limit는 ‘무한히 기다리면 값을 추측한다’가 아니라 어떤 유한 단계에서 이미 드러난 결과를 보존한다.
>
> **결론:** flat domain에서는 종료라는 정보가 한 번 나타나면 더 이상 정교해질 부분이 없다.

> [!warning] ‘Domain of a function’ versus ‘a domain’
> function의 domain은 input set (입력 집합)을 뜻하지만, domain theory의 a domain은 chain limit와 least element를 갖춘 ordered structure (순서 구조)다. function의 input set이 domain일 필요는 없다. 문맥과 전치사 `of`를 보고 두 뜻을 구별한다.

> [!question] Retrieval check
> 1. `Σ⊥`에서 서로 다른 정상 상태가 incomparable해야 하는 이유를 정보 관점에서 설명하라.
> 2. predomain과 domain의 정의 차이, discrete ordering과 lifting의 역할을 각각 말하라.
> 3. terminating loop와 diverging loop의 approximant chain이 각각 어떤 shape인지 써 보라.

### English companion — Information order, chains, predomains, and lifting

*A domain orders how much is known about a computation, not the magnitude of its result.*

The domain order `x ⊑ y` says that `x` approximates `y`: `y` carries at least as much information. This is not numerical distance. A normal state `σ` is a complete final result, so it is comparable with no different normal state `τ`; bottom supplies no final-state information and lies below every `σ`.

A chain is a countable increasing sequence `x₀ ⊑ x₁ ⊑ x₂ ⊑ ···`. Its least upper bound lies above every stage and below every other upper bound; it is called the chain's limit. A predomain contains limits of all chains. A domain is a predomain with a least element `⊥`. The book requires countable chains rather than all directed subsets.

An ordinary set `P` can be viewed as a discrete predomain ordered only by equality. Its chains cannot progress through distinct elements, so their limits are trivial. Lifting `P⊥` adds a fresh element bottom below every member. Viewing `Σ` discretely and lifting yields the command-result domain `Σ⊥`. A chain there consists of some bottoms followed, at most, by one state repeated forever.

This simple shape exactly matches loop approximation. Early stages may allow too few iterations and reveal only bottom. Once enough unfoldings are allowed, a final state appears and all later approximants retain it. If execution never terminates, the entire chain remains bottom. The limit operation combines both cases.

> [!tip] Domain-theory terms form one construction
> First view `Σ` as a discrete predomain, then lift it with a fresh bottom to obtain `Σ⊥`. Command results are then either one normal final state or bottom, with no numeric ordering mixed into the information order.
>
> A chain increases knowledge about a computation, and its least upper bound collects exactly the information justified by finite stages. In a flat domain, a chain cannot switch from one final state to another, so its limit never invents a result.
>
> Preserve the book's distinction: a predomain has limits of countable chains, and a domain additionally has a least element. Other texts may use dcpo or cpo with different conventions, so the chapter's proofs follow Reynolds's countable-chain definition.

### Information order of the flat domain `Σ⊥`

```text
r ⊑ r'  iff
  r = ⊥
  or
  r = r' = σ  for some σ ∈ Σ

⊥ ⊑ σ       for every σ
σ ⊑ τ       iff σ = τ
```

Normal states are not ordered componentwise by numeric size. Distinct final states are distinct complete answers and therefore incomparable.

> [!example] Two shapes of loop-approximation chains
> Compare finite-unfolding meanings `a₀,a₁,…` at one initial state `σ`.
>
> 1. If the loop ends after three body executions, early approximants are `⊥,⊥,⊥`, followed by the same final state `τ`.
> 2. The chain's limit is `τ`. No different normal state is comparable with it, so arbitrary results cannot enter the chain.
> 3. If the loop never ends, every approximant and the limit are bottom.
> 4. Thus a limit does not guess a result after infinite waiting; it preserves a result already revealed at some finite stage.
>
> **Conclusion:** In a flat domain, once termination information appears, there is nothing further to refine.

> [!warning] ‘Domain of a function’ versus ‘a domain’
> The domain of a function is its input set, whereas a domain in domain theory is an ordered structure with chain limits and a least element. A function's input set need not be a domain. Context—and the preposition ‘of’—distinguishes the two uses.

> [!question] Retrieval check
> 1. Why must distinct normal states be incomparable in `Σ⊥`? Explain in terms of information.
> 2. State the difference between a predomain and a domain, and the roles of discrete order and lifting.
> 3. Describe the approximation-chain shape for a terminating loop and a diverging loop.

---

## 06. Continuous functions and pointwise function domains — §2.3 · pp. 32–35 · 7 min

> [!abstract] Section focus
> continuity (연속성)는 점점 정교해지는 input의 limit를 먼저 취하든 function을 각 stage에 먼저 apply하든 result가 같다는 조건이다.

function `f : P → P'`가 monotone (단조)하다는 것은 `x ⊑ y`이면 `f(x) ⊑ f(y)`라는 뜻이다. 더 많은 input information을 주었는데 output information이 사라지지 않는다. continuity는 여기에 chain limit preservation (보존)을 더한다. 모든 chain `x₀⊑x₁⊑···`에 대해 `f(⊔ₙxₙ)=⊔ₙf(xₙ)`이어야 한다. continuous function은 monotone이지만 monotone function이 항상 continuous인 것은 아니다.

직관적으로 continuous function (연속 함수)이 구체적인 finite information을 output했다면 그 output은 input chain의 어떤 finite stage에서 이미 정당화되어야 한다. limit에 도착한 뒤에만 발견할 수 있는 infinite evidence (무한한 증거)를 요구하지 않는다. 이 finite-observation principle (유한 관찰 원리)은 Chapter 5의 I/O와 physical computation에서 더 강한 동기로 돌아온다.

predomain `P`, `P'` 사이의 continuous function을 `P → P'`로 쓰고 pointwise order (점별 순서)를 준다. `f ⊑ g`는 모든 `x`에서 `f(x) ⊑ g(x)`라는 뜻이다. codomain `P'`가 domain이면 이 function space도 domain이며 least function은 모든 input을 bottom으로 보내는 `λx.⊥`다. command denotation이 속한 `Σ → Σ⊥`가 바로 이런 domain이다.

이 pointwise order에서 `f ⊑ g`는 `g`가 `f`가 terminate하던 모든 initial state에서 같은 final state를 주고, 추가 initial state에서도 terminate할 수 있다는 뜻이다. result를 다른 state로 바꾸는 것은 더 많은 information이 아니다. 같은 result에 대한 function domain을 넓히는 것이 approximation의 증가다. loop functional `F`는 이런 의미에서 approximant를 더 정교하게 만든다.

### Continuity and function-space order

```text
f(⊔ₙ xₙ) = ⊔ₙ f(xₙ)

(f ⊑ g)  iff  ∀x. f(x) ⊑ g(x)
(⊔ₙ fₙ)(x) = ⊔ₙ fₙ(x)
⊥₍P→D₎ = λx. ⊥ᴰ
```

function chain의 limit는 각 input에서 result chain의 limit를 취해 만든다. 따라서 `while` approximant 전체를 initial state별로 계산할 수 있다.

> [!example] Comparing information in command denotations
> `f`, `g : Σ→Σ⊥`가 있고 `f`는 `x>0`에서만 종료하며 `g`는 `x≥0`에서 종료한다고 하자.
>
> 1. `x>0`인 모든 상태에서 두 함수가 같은 최종 상태를 준다면 `f`가 가진 정보는 `g`에도 있다.
> 2. `x=0`에서 `f(σ)=⊥`, `g(σ)=τ`이므로 `g`가 추가 종료 정보를 준다.
> 3. 따라서 `f⊑g`다. 반대로 `g⊑f`는 `x=0`에서 성립하지 않는다.
> 4. 만약 `x>0`에서 서로 다른 최종 상태를 준다면 어느 방향으로도 비교할 수 없다.
>
> **결론:** pointwise order는 실행 횟수나 시간보다 ‘어떤 입력에서 어떤 최종 결과가 확인되었는가’를 기록한다.

> [!tip] Strictness and continuity are different properties
> strict 함수는 least element를 least element로 보낸다. continuous 함수는 모든 chain limit를 보존한다. 이 장의 lifting 연산은 strict하고 continuous하지만, 모든 continuous 함수가 strict한 것은 아니다. 예를 들어 입력과 무관하게 고정된 정상 결과를 내는 상수 함수는 continuous하지만 `⊥`도 그 결과로 보내므로 strict하지 않다.

> [!question] Retrieval check
> 1. monotonicity와 continuity의 차이를 chain limit 식으로 설명하라.
> 2. `Σ→Σ⊥`의 least element가 어떤 함수인지, 그리고 왜 least인지 말하라.
> 3. 두 command meaning이 서로 다른 정상 상태를 같은 입력에 돌려주면 pointwise order로 비교되지 않는 이유는 무엇인가?

### English companion — Continuous functions and pointwise function domains

*Continuity says that refining an input and then taking its limit agrees with applying the function stage by stage and taking the output limit.*

A function `f : P → P'` is monotone when `x ⊑ y` implies `f(x) ⊑ f(y)`: supplying more input information cannot erase output information. Continuity additionally preserves chain limits: for every chain `x₀⊑x₁⊑···`, `f(⊔ₙxₙ)=⊔ₙf(xₙ)`. Continuity implies monotonicity, but monotonicity alone need not imply continuity.

Intuitively, whenever a continuous function emits a concrete finite piece of information, some finite stage of the input chain must already justify it. The function cannot demand ‘infinite evidence’ visible only after reaching the limit. Chapter 5 returns to this finite-observation principle for I/O and physical computation.

Write `P → P'` for continuous functions and order them pointwise: `f ⊑ g` iff `f(x) ⊑ g(x)` for every `x`. If `P'` is a domain, this function space is also a domain, whose least function maps every input to bottom. The command-denotation space `Σ → Σ⊥` is exactly such a domain.

Under pointwise order, `f ⊑ g` means that `g` returns the same final state everywhere `f` terminates and may additionally terminate on more initial states. Changing a result to a different state is not ‘more information’; extending the set of inputs with known results is. The loop functional `F` refines approximants in precisely this sense.

### Continuity and function-space order

```text
f(⊔ₙ xₙ) = ⊔ₙ f(xₙ)

(f ⊑ g)  iff  ∀x. f(x) ⊑ g(x)
(⊔ₙ fₙ)(x) = ⊔ₙ fₙ(x)
⊥₍P→D₎ = λx. ⊥ᴰ
```

The limit of a function chain is computed pointwise by taking the result-chain limit at each input. This lets us calculate loop approximants one initial state at a time.

> [!example] Comparing information in command denotations
> Let `f,g : Σ→Σ⊥`, where `f` terminates only for `x>0` and `g` for `x≥0`.
>
> 1. If both functions return the same final state whenever `x>0`, all information in `f` is present in `g`.
> 2. At `x=0`, `f(σ)=⊥` while `g(σ)=τ`, so `g` supplies additional termination information.
> 3. Thus `f⊑g`; the reverse fails at `x=0`.
> 4. If they return different final states for some `x>0`, they are incomparable in either direction.
>
> **Conclusion:** Pointwise order records which final result is known for which input, not execution count or time.

> [!tip] Strictness and continuity are different properties
> A strict function maps least element to least element; a continuous function preserves all chain limits. The lifting operations here are both strict and continuous, but continuity does not imply strictness. A function that constantly returns one normal result is continuous yet non-strict because it maps bottom to that result.

> [!question] Retrieval check
> 1. Explain the difference between monotonicity and continuity using the chain-limit equation.
> 2. What is the least element of `Σ→Σ⊥`, and why is it least?
> 3. Why are two command denotations incomparable if they return different normal states on the same input?

---

## 07. The least fixed-point theorem and finite loop approximants — §2.4 · pp. 35–39 · 9 min

> [!abstract] Section focus
> continuous functional (연속인 고차 함수)은 `⊥, F⊥, F²⊥, …` chain의 limit에서 least fixed point를 갖는다.

domain `D`와 continuous functional `F:D→D`가 주어지면 `⊥⊑F(⊥)`이고 monotonicity (단조성) 때문에 `Fⁿ(⊥)⊑Fⁿ⁺¹(⊥)`가 계속 성립한다. 따라서 `⊥,F⊥,F²⊥,…`는 chain이며 limit `μF = ⊔ₙFⁿ(⊥)`가 존재한다. continuity를 사용하면 `F(μF)=F(⊔ₙFⁿ⊥)=⊔ₙFⁿ⁺¹⊥=μF`이므로 이 limit가 fixed point (고정점)다.

leastness (최소성)도 induction (귀납)으로 얻는다. 임의의 다른 fixed point `y=F(y)`에 대해 `⊥⊑y`다. `Fⁿ⊥⊑y`라면 monotonicity로 `Fⁿ⁺¹⊥⊑F(y)=y`다. 모든 approximant가 `y` 아래이므로 그 limit `μF`도 `y` 아래다. 따라서 theorem은 fixed point 하나를 만드는 데 그치지 않고 모든 fixed point 중 information이 가장 적은 solution을 선택한다.

`while`에는 `D = Σ→Σ⊥`와 앞 절의 functional `F`를 사용한다. `F⁰⊥`는 어떤 input에도 result를 주지 않는 stage-0 approximant (0단계 근사)다. `F¹⊥`는 첫 guard가 false일 때만 current state로 terminate한다. `F²⊥`는 body를 최대 한 번 실행한 뒤 guard가 false가 되는 경우까지 안다. 일반적으로 `Fⁿ⊥`는 bounded unfolding 안에 termination이 확인되는 input에서만 final state를 준다.

approximant를 syntax으로도 나타낼 수 있다. `w₀ = while true do skip`으로 두고 `wₙ₊₁ = if b then (c;wₙ) else skip`이라 하면 `⟦wₙ⟧=Fⁿ⊥`다. 실제 loop가 어떤 state에서 finite test 뒤 terminate하면 충분히 큰 `n`부터 `wₙ`과 같은 result를 낸다. 실제 loop가 nonterminate하면 모든 `wₙ`도 그 state에서 bottom이다. 그러므로 limit가 직관적 execution과 일치한다.

> [!abstract] Why the least fixed point theorem needs each term
> functional `F`는 command denotation 하나를 받아 guard를 한 번 test하고 body를 한 번 execute한 뒤 recursive continuation을 사용하는 새 command denotation을 만든다. 이 `F`가 monotone이면 approximant를 더 정교하게 넣을수록 output approximant의 information이 줄지 않는다. 따라서 bottom에서 시작한 `F⁰⊥, F¹⊥, ...`가 increasing chain을 이룬다는 첫 단계가 성립한다.
>
> continuity는 monotonicity보다 강한 requirement다. monotonicity만으로는 chain이 증가하고 다른 fixed point 아래에 놓인다는 사실을 보일 수 있지만, chain의 limit에 `F`를 적용한 결과가 stage별 result의 limit와 같다는 equation은 얻지 못한다. `F(⊔ₙxₙ)=⊔ₙF(xₙ)`이 있어야 `μF=⊔ₙFⁿ⊥`가 실제 fixed point임을 증명할 수 있다.
>
> leastness는 fixed-point equation을 만족하는 solution 중 finite unfolding이 정당화하지 않은 behavior를 넣지 않는 것을 보장한다. 다른 fixed point `y`가 있으면 induction으로 모든 approximant `Fⁿ⊥`가 `y` 아래에 놓이고, 따라서 그 lub인 `μF`도 `y` 아래에 놓인다. existence, fixed-point property, leastness를 따로 말해야 ‘equation을 만족한다’와 ‘intended loop denotation이다’를 혼동하지 않는다.

### Least fixed point and while meaning

```text
μF = ⊔ₙ≥0 Fⁿ(⊥)
F(μF) = μF
∀y. F(y)=y ⇒ μF ⊑ y

⟦while b do c⟧ = μF
F(f)(σ) = if ⟦b⟧σ then f†(⟦c⟧σ) else σ
```

`μF` 또는 책의 `Y_D F`는 equation을 만족하는 arbitrary solution이 아니라 bottom에서 시작한 finite approximant의 limit다.

> [!abstract] Exactly where continuity enters the proof
> chain이 increasing하고 다른 fixed point 아래에 놓인다는 사실에는 monotonicity가 충분하다. 그러나 limit가 실제 fixed point임을 보이는 `F(⊔ chain)=⊔F(chain)` 단계에는 continuity가 필요하다. 이 구분을 놓치면 ‘monotone이면 least fixed-point theorem이 모두 성립한다’는 잘못된 결론을 내리기 쉽다.

> [!example] Approximating a decrementing loop
> `while x>0 do x:=x-1`을 `x=2`인 상태에서 전개한다.
>
> 1. `F⁰⊥(σ)=⊥`: 0단계는 어떤 실행도 인정하지 않는다.
> 2. `F¹⊥(σ)=⊥`: first guard가 true이고 body 뒤 recursive approximant가 bottom이다.
> 3. `F²⊥(σ)=⊥`: 한 번 감소해도 `x=1`에서 다시 가드가 참이다.
> 4. `F³⊥(σ)=σ[x↦0]`: 두 번 감소한 뒤 세 번째 test가 거짓이라 최종 상태가 확인된다.
> 5. 모든 `n≥3`에서도 같은 상태가 나오므로 chain의 limit는 `σ[x↦0]`다.
>
> **결론:** approximant index는 허용 body count와 정확히 같지 않을 수 있으므로 각 stage가 허용하는 test structure를 equation으로 확인한다.

> [!tip] Abstract syntax is also a least fixed point
> Chapter 1의 depth-indexed syntax set도 empty set에서 시작해 constructor를 한 층씩 적용한 뒤 union을 취했다. powerset domain에서 grammar functional의 least fixed point를 구한 셈이다. constructor가 finite arity (유한 인자 수)를 가지므로 grammar functional은 finitely generated이고 continuous하다. syntax의 finite generation과 loop의 finite unfolding은 같은 수학적 pattern이다.

> [!question] Retrieval check
> 1. least fixed-point theorem의 existence, fixed-point, leastness argument를 각각 한 문장으로 재구성하라.
> 2. `Fⁿ⊥`가 loop 실행의 어떤 유한 정보를 나타내는지 설명하라.
> 3. continuity 없이 증명의 어느 등식이 정당화되지 않는가?
> 4. abstract syntax의 depth approximant와 `while` approximant의 common structure를 말하라.

### English companion — The least fixed-point theorem and finite loop approximants

*A continuous functional has its least fixed point at the limit of `⊥, F⊥, F²⊥, …`.*

Given a domain `D` and continuous `F:D→D`, leastness gives `⊥⊑F(⊥)`, and monotonicity yields `Fⁿ(⊥)⊑Fⁿ⁺¹(⊥)` at every stage. Thus `⊥,F⊥,F²⊥,…` is a chain with limit `μF = ⊔ₙFⁿ(⊥)`. Continuity shows `F(μF)=F(⊔ₙFⁿ⊥)=⊔ₙFⁿ⁺¹⊥=μF`, so the limit is a fixed point.

Leastness follows by induction. For any other fixed point `y=F(y)`, first `⊥⊑y`. If `Fⁿ⊥⊑y`, monotonicity gives `Fⁿ⁺¹⊥⊑F(y)=y`. Every approximant lies below `y`, hence so does their limit `μF`. The theorem therefore does not merely produce a fixed point; it selects the least-informative one.

For `while`, take `D = Σ→Σ⊥` and the functional `F` from the previous section. `F⁰⊥` knows no result for any input. `F¹⊥` terminates only when the first guard is false. `F²⊥` also knows cases where one body execution makes the guard false. In general, `Fⁿ⊥` returns a final state only when termination is witnessed within its finite unfolding budget.

The approximants can also be represented syntactically. Let `w₀ = while true do skip` and `wₙ₊₁ = if b then (c;wₙ) else skip`; then `⟦wₙ⟧=Fⁿ⊥`. If the real loop terminates after finitely many tests, every sufficiently large `wₙ` returns the same result. If it diverges, every `wₙ` returns bottom on that state. Their limit therefore agrees with the intuitive execution.

> [!abstract] Why the least fixed point theorem needs each term
> The functional `F` maps one command denotation to a refined one. Monotonicity ensures that the iterates from bottom form an increasing chain.
>
> Continuity is stronger than monotonicity and is needed to commute `F` with the chain limit, proving that the limit is genuinely a fixed point.
>
> Leastness excludes behavior unsupported by finite unfolding. Induction puts every approximant below any other fixed point, hence the limit below it as well. Existence, fixed-point property, and leastness are distinct proof obligations.

### Least fixed point and while meaning

```text
μF = ⊔ₙ≥0 Fⁿ(⊥)
F(μF) = μF
∀y. F(y)=y ⇒ μF ⊑ y

⟦while b do c⟧ = μF
F(f)(σ) = if ⟦b⟧σ then f†(⟦c⟧σ) else σ
```

`μF`—written `Y_D F` in the book—is not an arbitrary solution but the limit of finite approximants starting at bottom.

> [!abstract] Exactly where continuity enters the proof
> Monotonicity suffices to show that the approximants form an increasing chain and lie below every other fixed point. Continuity is needed at the step `F(⊔ chain)=⊔F(chain)` proving that the limit itself is a fixed point. Missing this distinction invites the false claim that monotonicity alone proves the theorem in this setting.

> [!example] Approximating a decrementing loop
> Unfold `while x>0 do x:=x-1` from a state with `x=2`.
>
> 1. `F⁰⊥(σ)=⊥`: stage zero admits no execution.
> 2. `F¹⊥(σ)=⊥`: the first guard is true and the recursive approximant after the body is bottom.
> 3. `F²⊥(σ)=⊥`: after one decrement, the guard is still true at `x=1`.
> 4. `F³⊥(σ)=σ[x↦0]`: after two decrements, the third test is false and the final state is known.
> 5. Every `n≥3` returns the same state, so the chain limit is `σ[x↦0]`.
>
> **Conclusion:** The approximant index need not equal the body count directly; inspect the tests admitted by each stage.

> [!tip] Abstract syntax is also a least fixed point
> Chapter 1's depth-indexed syntax sets also started from empty sets, applied constructors one layer at a time, and took a union. This is a least fixed point in a powerset domain. Finite constructor arity makes the grammar functional finitely generated and continuous. Finite syntax generation and finite loop unfolding share one mathematical pattern.

> [!question] Retrieval check
> 1. Reconstruct the existence, fixed-point, and leastness parts of the theorem in one sentence each.
> 2. What finite information about loop execution does `Fⁿ⊥` represent?
> 3. Which equation in the proof is unjustified without continuity?
> 4. State the common structure of depth approximants for syntax and approximants for `while`.

---

## 08. Binding, initialization, and restoration of local variables — §2.5 · pp. 39–41 · 7 min

> [!abstract] Section focus
> `newvar v:=e in c`는 초기 상태에서 값을 계산하고, body 안에서만 새 `v`를 사용한 뒤 바깥 값을 복원한다.

local variable declaration (지역 변수 선언)을 추가하는 production은 `comm ::= newvar v := e in c`다. binder는 `v`이고 scope는 body `c`뿐이다. initializer `e`는 scope 밖이므로 같은 name의 outer variable (바깥 변수)을 읽는다. 예를 들어 `newvar x:=x+1 in c`의 오른쪽 `x`는 새로 선언될 `x`가 아니라 declaration 전 state의 `x`다. 이 scope를 잘못 잡으면 initialization equation부터 순환적이 된다.

denotation은 세 단계로 계산한다. 먼저 original state `σ`에서 `n=⟦e⟧σ`를 계산하고 `σ₀=σ[v↦n]`을 만든다. 다음으로 `c`를 `σ₀`에서 실행한다. normal state `σ₁`로 terminate하면 outer value `σ(v)`를 restore (복원)해 `σ₁[v↦σ(v)]`를 돌려준다. body가 nonterminate하면 strict extension 때문에 declaration 전체도 bottom이며 복원된 final state는 관찰되지 않는다.

이 model은 physical address를 새로 allocate하는 implementation을 직접 묘사하지 않는다. language가 variable name과 integer state만 관찰하므로 기존 `v`의 value를 저장했다가 restore하는 state function만으로 lexical locality (어휘적 지역성)를 표현한다. body가 다른 free variable에 준 변화는 유지되고 local `v`의 변화만 가려진다. 이 abstraction이 충분한지는 마지막 section에서 observation과 context를 정한 뒤 판단한다.

초깃값을 명시하는 것은 단순 편의가 아니라 의미 설계 선택이다. 초기값을 지정하지 않으면 실행이 우연히 남아 있던 저장 내용에 의존할 수 있고, 같은 프로그램을 같은 입력으로 실행해도 결과를 재현하기 어렵다. 명시적 initializer는 프로그램 동작을 syntax과 초기 상태만으로 설명할 수 있게 한다. 기본값 0만 허용하는 정책보다 일반적이면서도 deterministic하다.

### Declaration semantics and free variables

```text
⟦newvar v:=e in c⟧ σ
  = restoreᵥ,σ†(⟦c⟧(σ[v ↦ ⟦e⟧σ]))

restoreᵥ,σ(σ') = σ'[v ↦ σ(v)]

FV(newvar v:=e in c)
  = FV(e) ∪ (FV(c) − {v})
```

initializer의 free-variable set (자유 변수 집합)에는 `v`가 남을 수 있지만 body의 `v`는 binder에 bound된다. restoration function (복원 함수)도 bottom에는 strict하게 적용된다.

> [!example] Separating local and global changes
> 초기 상태에서 `x=10`, `y=3`일 때 `newvar x:=x+1 in (x:=x+y; y:=x)`를 계산한다.
>
> 1. initializer는 바깥 상태에서 계산되어 11을 내고 local 상태는 `x=11,y=3`이 된다.
> 2. body의 첫 assignment (대입) 뒤 local `x=14`, 둘째 assignment 뒤 `y=14`다.
> 3. scope를 나가며 `x`만 바깥 값 10으로 복원한다.
> 4. 최종 관찰은 `x=10,y=14`다. local 계산이 `y`에 남긴 효과는 사라지지 않는다.
>
> **결론:** 지역성은 body 전체를 취소하는 것이 아니라 결박된 이름의 바깥 값을 보호한다.

> [!warning] An assignment target is not a binder
> `x:=e`의 `x`는 이후 phrase의 scope를 만들지 않으며 free occurrence (자유 출현)다. 그래서 `FV(x:=e)={x}∪FV(e)`이고 assignment로 변경될 수 있는 freely assigned-variable set은 `FA(x:=e)={x}`다. 반면 `newvar x:=e in c`의 declared `x`는 body의 binder이므로 `FA`를 계산할 때 local `x`를 바깥 assigned-variable set에서 제거한다.

> [!question] Retrieval check
> 1. `newvar v:=e in c`에서 binder의 scope가 `e`를 포함하지 않는 이유를 예제로 설명하라.
> 2. body가 terminate normally (정상 종료)할 때와 nonterminate할 때 restoration function이 각각 어떻게 동작하는가?
> 3. `FV`와 `FA`가 다른 정보를 기록하는 이유를 assignment target과 연결해 설명하라.

### English companion — Binding, initialization, and restoration of local variables

*`newvar v:=e in c` computes an initializer in the old state, uses a new `v` only in the body, and restores the outer value afterward.*

Local declarations add the production `comm ::= newvar v := e in c`. The binder is `v`, and its scope is only the body `c`; the initializer `e` lies outside. Thus the right-hand `x` in `newvar x:=x+1 in c` reads the outer `x`, not the newly declared one. Giving the binder scope over the initializer would make the initialization equation circular.

The semantics has three steps. First compute `n=⟦e⟧σ` in the original state and form `σ₀=σ[v↦n]`. Execute `c` from `σ₀`. If it returns a normal state `σ₁`, restore the outer value `σ(v)` and return `σ₁[v↦σ(v)]`. If the body diverges, strict extension makes the whole declaration bottom; no restored final state is observed.

The model does not literally describe allocating a fresh physical address. Because the language observes only variable names and integer states, saving and restoring the old value of `v` suffices to represent lexical locality. Changes to other free variables remain visible; changes to local `v` are hidden. Whether this abstraction is adequate will depend on the observations and contexts chosen in the final section.

Explicit initialization is a semantic design choice, not mere convenience. Leaving a local uninitialized may make execution depend on accidental storage contents and destroy reproducibility. An explicit initializer keeps behavior explainable from syntax and the initial state. It is more general than mandatory zero initialization while remaining deterministic.

### Declaration semantics and free variables

```text
⟦newvar v:=e in c⟧ σ
  = restoreᵥ,σ†(⟦c⟧(σ[v ↦ ⟦e⟧σ]))

restoreᵥ,σ(σ') = σ'[v ↦ σ(v)]

FV(newvar v:=e in c)
  = FV(e) ∪ (FV(c) − {v})
```

The initializer may contain free `v`, while occurrences of `v` in the body are bound. The restoration function is extended strictly over bottom.

> [!example] Separating local and global changes
> From `x=10`, `y=3`, evaluate `newvar x:=x+1 in (x:=x+y; y:=x)`.
>
> 1. The initializer is evaluated outside the scope, yielding 11 and local state `x=11,y=3`.
> 2. After the first body assignment local `x=14`; after the second, `y=14`.
> 3. On leaving the scope, only `x` is restored to its outer value 10.
> 4. The final observation is `x=10,y=14`; the local computation's effect on `y` remains.
>
> **Conclusion:** Locality does not roll back the whole body; it protects the outer value of the bound name.

> [!warning] An assignment target is not a binder
> The `x` in `x:=e` creates no scope and is a free occurrence. Hence `FV(x:=e)={x}∪FV(e)` and the set of freely assigned variables is `FA(x:=e)={x}`. In `newvar x:=e in c`, the declared `x` binds the body, so local assignments to it are removed when computing the declaration's externally assigned set.

> [!question] Retrieval check
> 1. Use an example to explain why the binder in `newvar v:=e in c` does not scope over `e`.
> 2. How does restoration behave when the body terminates normally versus diverges?
> 3. Why do `FV` and `FA` record different information? Relate the answer to assignment targets.

---

## 09. The Coincidence Theorem for commands and effect boundaries — §2.5 · pp. 41–42 · 5 min

> [!abstract] Section focus
> command 결과 전체는 초기 상태 전체를 포함하지만, 자유롭게 읽고 쓸 수 있는 변수만 결과 차이를 만들 수 있다.

Chapter 1의 expression Coincidence Theorem은 두 state가 free variable에서 agree (일치)하면 expression value도 같다고 말했다. command에는 더 섬세한 statement가 필요하다. `⟦c⟧σ`가 normal state라면 그 result는 command와 무관한 variable의 initial value까지 그대로 담는 total state다. 그래서 whole result state가 오직 `FV(c)`에만 의존한다고 말할 수는 없다. relevant result와 preserved result를 나누어야 한다.

첫 clause는 termination과 free-variable result의 coincidence (일치)다. initial state `σ`,`σ'`가 `FV(c)`의 모든 variable에서 agree하면 두 execution은 함께 nonterminate하거나 함께 terminate normally한다. normal termination이면 result state도 `FV(c)`의 모든 variable에서 agree한다. command의 control flow와 freely computed value는 free variable의 initial value만으로 결정되므로 한쪽만 terminate하거나 관련 result가 갈라질 수 없다.

둘째 clause는 frame property (프레임 성질)다. `c`가 terminate normally하고 `w∉FA(c)`이면 final `w` value는 initial `σ(w)`와 같다. command가 freely assign하지 않은 variable은 바꿀 수 없다. body 안에서 local `w`에 assign했더라도 declaration을 빠져나올 때 restore되므로 바깥 `FA`에서는 제거된다. 이 property는 뒤의 Hoare logic frame-style reasoning과 independent command의 재배치 조건을 준비한다.

두 부분을 합치면 특정 결과 변수 `w`의 의존성을 추적할 수 있다. `w∈FV(c)`이면 그 최종값은 `FV(c)`의 초기값에 의해 결정되고, `w∉FA(c)`이면 아예 자기 초기값이 보존된다. 이 정보는 optimization이 어떤 command를 이동할 수 있는지, 두 command가 공유하는 read/write set이 무엇인지 분석하는 정적 effect 요약의 원형이다.

### Two clauses of command coincidence

```text
σ =FV(c) σ'  ⇒
+  (⟦c⟧σ = ⊥ = ⟦c⟧σ')
+  or
+  (⟦c⟧σ =FV(c) ⟦c⟧σ')
+
⟦c⟧σ ≠ ⊥ ∧ w∉FA(c)  ⇒
+  (⟦c⟧σ)(w) = σ(w)
```

첫 절의 equality는 전체 상태가 아니라 표시된 변수 집합에서의 equality다. 둘째 절은 정상 종료를 전제로 하며 `⊥`에 변수 선택을 적용하지 않는다.

> [!example] Calculating result dependence from read/write sets
> `c = x:=x+z; y:=x+y`를 초기 상태 `σ`에서 실행한다.
>
> 1. `FV(c)={x,y,z}`이고 `FA(c)={x,y}`다.
> 2. 최종 `x=σ(x)+σ(z)`, 최종 `y=σ(x)+σ(z)+σ(y)`이므로 세 자유 초기값에만 의존한다.
> 3. `z∉FA(c)`이므로 최종 `z=σ(z)`다. 다른 모든 `w∉{x,y}`도 자기 초기값을 유지한다.
> 4. 따라서 `x,y,z`에서 같은 두 초기 상태는 관련 결과와 종료 여부가 같고, 무관한 변수 차이는 그대로 운반될 뿐이다.
>
> **결론:** whole result state가 다를 수 있어도 command가 계산한 observable effect (관찰 가능한 효과)는 free-variable boundary 안에서 일치한다.

> [!tip] A sufficient condition for independent commands to commute
> `FV(c₀)∩FA(c₁)=∅`이고 `FA(c₀)∩FV(c₁)=∅`이면 어느 command도 다른 command가 읽는 값을 바꾸지 않는다. 두 command가 모두 deterministic한 현재 언어에서는 이 disjointness를 이용해 `c₀;c₁`과 `c₁;c₀`의 같은 결과를 증명할 수 있다. aliasing substitution이나 concurrency를 추가하면 독립성 가정을 다시 확인해야 한다.

> [!question] Retrieval check
> 1. 왜 command Coincidence Theorem이 결과 상태 전체의 equality를 주장하지 않는가?
> 2. `w∉FA(c)`가 정상 종료 뒤 보장하는 frame 성질을 쓰고 local assignment가 반례가 아닌 이유를 말하라.
> 3. 두 command가 commute하기 위한 read/write disjointness 조건을 `FV`와 `FA`로 써 보라.

### English companion — The Coincidence Theorem for commands and effect boundaries

*A command result is a whole state, but only variables the command can freely read or write can create observable differences.*

Chapter 1's expression Coincidence Theorem said that states agreeing on free variables give the same expression value. Commands need a subtler statement. A normal result `⟦c⟧σ` is a complete state carrying through initial values of variables irrelevant to the command. The entire result state therefore does not depend only on `FV(c)`; relevant output and preserved output must be separated.

The first part concerns termination and free-variable results. If initial states `σ` and `σ'` agree on every variable in `FV(c)`, the executions either both diverge or both terminate. On termination, their result states agree on every variable in `FV(c)`. Control flow and all freely computed values depend only on those initial values, so termination and relevant outputs cannot split.

The second part is a frame property. If `c` terminates and `w∉FA(c)`, final `w` equals initial `σ(w)`. A command cannot change a variable it never freely assigns. Assignments to a local `w` do not count externally because restoration removes them from the declaration's `FA`. This prepares frame-style reasoning and conditions for reordering independent commands.

Together the two parts track dependence of a result variable `w`. If `w∈FV(c)`, its final value is determined by initial values on `FV(c)`; if `w∉FA(c)`, its own initial value is preserved outright. This is an early form of static effect summaries used to decide which commands optimizations may move and which read/write sets they share.

### Two clauses of command coincidence

```text
σ =FV(c) σ'  ⇒
+  (⟦c⟧σ = ⊥ = ⟦c⟧σ')
+  or
+  (⟦c⟧σ =FV(c) ⟦c⟧σ')
+
⟦c⟧σ ≠ ⊥ ∧ w∉FA(c)  ⇒
+  (⟦c⟧σ)(w) = σ(w)
```

Equality in the first clause is restricted to the displayed variable set, not whole-state equality. The second clause assumes normal termination because variable selection is undefined on bottom.

> [!example] Calculating result dependence from read/write sets
> Execute `c = x:=x+z; y:=x+y` from state `σ`.
>
> 1. `FV(c)={x,y,z}` and `FA(c)={x,y}`.
> 2. Final `x=σ(x)+σ(z)` and final `y=σ(x)+σ(z)+σ(y)`, depending only on the three free initial values.
> 3. Since `z∉FA(c)`, final `z=σ(z)`; every other `w∉{x,y}` also retains its initial value.
> 4. Thus states agreeing on `x,y,z` agree on termination and relevant outputs; differences in irrelevant variables are merely carried through.
>
> **Conclusion:** Whole result states may differ, while the command's computed observable effect agrees within the free-variable boundary.

> [!tip] A sufficient condition for independent commands to commute
> If `FV(c₀)∩FA(c₁)=∅` and `FA(c₀)∩FV(c₁)=∅`, neither command changes a value read by the other. In the current deterministic language, this disjointness can prove `c₀;c₁` and `c₁;c₀` equal. Aliasing substitution or concurrency requires the independence assumption to be checked again.

> [!question] Retrieval check
> 1. Why does the command Coincidence Theorem not claim equality of whole result states?
> 2. State the frame property guaranteed by `w∉FA(c)` and explain why local assignment is not a counterexample.
> 3. Write a read/write disjointness condition for two commands to commute using `FV` and `FA`.

---

## 10. Command substitution, fresh renaming, and aliasing — §2.5 · pp. 41–45 · 8 min

> [!abstract] Section focus
> command substitution (command 치환)은 variable만 variable로 보낼 수 있고 semantic preservation (의미 보존)에는 relevant variable에서의 injectivity가 필요하다.

expression substitution은 variable을 임의의 integer expression으로 바꿀 수 있지만 command에는 assignment target이 있다. `x:=x+1`에서 `x`를 `10`으로 substitute하면 `10:=10+1`, `y×z`로 substitute하면 `y×z:=y×z+1`이 되어 abstract syntax을 벗어난다. 따라서 command substitution map은 `S:Var→Var`로 제한한다. 이 map은 read occurrence (읽기 출현)와 write occurrence (쓰기 출현) 모두에 같은 renaming을 적용한다.

binder를 통과할 때는 Chapter 1과 같은 capture avoidance (포획 회피)가 필요하다. `(newvar v:=e in c)/S`에서는 fresh `v_new`를 골라 initializer에는 original `S`를 적용하고 body에는 `S[v↦v_new]`를 적용한다. freshness condition은 body의 다른 free variable이 이미 `S`에 의해 `v_new`로 map되지 않는다는 것이다. 이렇게 해야 new binder가 원래 free였던 name을 capture하지 않는다.

하지만 capture만 피한다고 semantic preservation이 끝나지 않는다. 서로 다른 `x`,`y`를 둘 다 `z`로 보내면 aliasing이 생긴다. `x:=x+1; y:=y×2`와 `y:=y×2; x:=x+1`은 `x`,`y`가 independent일 때 같은 state transformer를 denote한다. substitution 뒤에는 `z:=z+1; z:=z×2`와 `z:=z×2; z:=z+1`이 되어 일반적으로 다른 result를 낸다. denotationally equal한 command의 substitution result가 달라진 것이다.

그래서 Substitution Theorem for Commands는 `S`가 relevant-variable set에서 distinct name을 distinct name으로 보내야 한다는 condition을 둔다. 이 condition 아래 corresponding initial state가 `σ(w)=σ'(S(w))`를 만족하면 두 execution은 함께 nonterminate하거나 normal termination 뒤 relevant-variable value가 계속 대응한다. global injectivity 전체를 요구할 필요는 없고 command가 freely read하거나 write하는 name 사이의 collision만 배제하면 된다.

그럼에도 bound-variable renaming은 의미를 보존한다. `v_new`가 body의 다른 자유 이름과 충돌하지 않으면 `newvar v:=e in c`와 `newvar v_new:=e in c[v↦v_new]`는 같은 command meaning을 갖는다. aliasing 문제는 두 자유 저장 위치를 합칠 때 생기며, 하나의 local binder에 새 이름을 붙이는 α-renaming과는 다르다.

> [!tip] Binding, substitution, and aliasing must stay distinct
> binding은 binder가 scope를 만들고 그 안의 occurrence를 bound occurrence로 바꾸는 구조적 관계다. substitution은 free occurrence를 map에 따라 바꾸는 syntax operation이며 capture avoidance를 지켜야 한다. aliasing은 서로 다른 name이 같은 writable location을 가리키게 되는 semantic phenomenon이다. 세 term을 모두 단순한 ‘이름 바꾸기’로 번역하면 어떤 condition이 syntax well-formedness를 지키고 어떤 condition이 denotation을 지키는지 구별할 수 없다.
>
> Substitution Theorem for Commands는 arbitrary expression substitution을 허용하지 않는다. assignment target은 variable이어야 하므로 map의 type부터 `S:Var→Var`로 제한된다. 또한 relevant free variable 두 개를 같은 target name으로 보내면 independent storage location이 merge되어 원래 commute하던 assignment가 더 이상 commute하지 않을 수 있다. 그래서 theorem의 injectivity condition은 문법적 장식이 아니라 aliasing을 막는 semantic side condition이다.
>
> Renaming Theorem for Commands는 이 aliasing 위험과 다른 경우를 다룬다. 하나의 local binder에 fresh name을 주는 α-renaming은 두 free location을 합치지 않으므로 denotation을 preserve한다. Coincidence Theorem for Commands도 whole-state equality가 아니라 relevant free-variable result의 coincidence와 freely unassigned variable의 frame property를 분리한다. theorem name을 English로 유지하면 Chapter 1의 expression theorem과 전제·결론을 정확히 비교할 수 있다.

### Key clauses of command substitution

```text
(v:=e)/S = S(v) := e/S
(c₀;c₁)/S = (c₀/S);(c₁/S)

(newvar v:=e in c)/S
  = newvar v_new:=e/S in c/(S[v↦v_new])

v_new ∉ { S(w) | w ∈ FV(c)−{v} }
```

binder clause는 initializer와 body에 서로 다른 map을 사용한다. `v_new` 선택은 surface name을 바꿔도 Renaming Theorem for Commands 때문에 denotation에는 영향을 주지 않는다.

> [!example] A numerical aliasing counterexample
> `z=3`에서 위 두 substitution result를 execute한다.
>
> 1. 첫 순서 `z:=z+1; z:=z×2`는 `3→4→8`이다.
> 2. 둘째 순서 `z:=z×2; z:=z+1`은 `3→6→7`이다.
> 3. 원래 command에서는 `x` 갱신이 `y` 식에, `y` 갱신이 `x` 식에 영향을 주지 않아 순서를 바꿀 수 있었다.
> 4. substitution `S(x)=S(y)=z`는 independence assumption을 파괴했으므로 semantic equality를 preserve하지 않는다.
>
> **결론:** aliasing은 단순 이름 충돌이 아니라 서로 달랐던 writable location을 하나로 만드는 의미 변화다.

> [!abstract] Why the induction hypothesis must be generalized
> binder case에서는 `S`를 `S[v↦v_new]`로 바꾸고 sequence case에서는 whole free-variable set보다 작은 각 subcommand set을 다룬다. 처음부터 ‘모든 variable에서 injective’나 ‘정확히 `FV(c)`에서만 대응’이라는 special statement로 잡으면 recursive call에 맞지 않는다. 더 큰 relevant set `V`를 parameter로 두고 그 위의 injectivity와 state correspondence (상태 대응)를 가정해야 structural induction이 닫힌다.

> [!question] Retrieval check
> 1. command substitution을 `Var→IntExp`가 아니라 `Var→Var`로 제한해야 하는 이유를 반례로 보라.
> 2. capture avoidance와 alias prevention이 해결하는 서로 다른 문제를 설명하라.
> 3. bound-variable renaming은 safe하지만 두 free variable을 하나로 map하는 substitution은 위험한 이유는 무엇인가?
> 4. substitution theorem의 상태 대응 조건 `σ(w)=σ'(S(w))`가 무엇을 뜻하는지 말하라.

### English companion — Command substitution, fresh renaming, and aliasing

*Command substitution may map variables only to variables, and semantic preservation requires injectivity on the relevant names.*

Expression substitution may replace a variable by any integer expression, but commands have assignment targets. Replacing `x` in `x:=x+1` by `10` yields illegal `10:=10+1`; replacing it by `y×z` is equally invalid. Command substitution maps are therefore restricted to `S:Var→Var`, applying the same renaming to read and write occurrences.

Crossing a binder requires the same capture avoidance as Chapter 1. For `(newvar v:=e in c)/S`, choose fresh `v_new`, apply the original `S` to the initializer, and apply `S[v↦v_new]` to the body. Freshness requires that no other free body variable is already mapped to `v_new`; otherwise the new binder would capture it.

Avoiding capture is not enough for semantic preservation. Mapping distinct `x` and `y` both to `z` creates aliasing. The commands `x:=x+1; y:=y×2` and `y:=y×2; x:=x+1` have equal denotations while `x` and `y` are independent. After substitution they become `z:=z+1; z:=z×2` and `z:=z×2; z:=z+1`, which generally differ. Equal commands have been mapped to unequal ones.

The command substitution theorem therefore assumes that `S` maps distinct relevant variables to distinct variables. If corresponding initial states satisfy `σ(w)=σ'(S(w))`, the two executions either both diverge or terminate with corresponding values for the relevant names. Global injectivity is stronger than necessary; it suffices to exclude collisions among names the command freely reads or writes.

Bound-variable renaming still preserves meaning. If `v_new` avoids other free body names, `newvar v:=e in c` and `newvar v_new:=e in c[v↦v_new]` have the same command denotation. Aliasing arises when two free storage locations are merged; α-renaming gives one local binder a fresh name and does not merge locations.

> [!tip] Binding, substitution, and aliasing must stay distinct
> Binding creates scope, substitution rewrites free occurrences subject to capture avoidance, and aliasing is the semantic phenomenon of distinct names designating one writable location. They must not collapse into a generic notion of renaming.
>
> The Substitution Theorem for Commands restricts maps to `S:Var→Var` and requires injectivity on relevant names. The injectivity condition prevents semantic aliasing rather than merely tidying syntax.
>
> The Renaming Theorem for Commands concerns fresh alpha-renaming of one local binder and does not merge locations. The command Coincidence Theorem separately tracks relevant results and a frame property, rather than whole-state equality.

### Key clauses of command substitution

```text
(v:=e)/S = S(v) := e/S
(c₀;c₁)/S = (c₀/S);(c₁/S)

(newvar v:=e in c)/S
  = newvar v_new:=e/S in c/(S[v↦v_new])

v_new ∉ { S(w) | w ∈ FV(c)−{v} }
```

The binder clause uses different maps for initializer and body. Different valid choices of `v_new` alter surface names but not meaning, by the renaming theorem.

> [!example] A numerical aliasing counterexample
> Execute the two substituted commands above from `z=3`.
>
> 1. The first order `z:=z+1; z:=z×2` gives `3→4→8`.
> 2. The second order `z:=z×2; z:=z+1` gives `3→6→7`.
> 3. Originally, updating `x` could not affect the expression for `y`, nor vice versa, so the assignments commuted.
> 4. The substitution `S(x)=S(y)=z` destroys that independence and therefore fails to preserve semantic equality.
>
> **Conclusion:** Aliasing is not a cosmetic name collision; it semantically merges previously distinct writable locations.

> [!abstract] Why the induction hypothesis must be generalized
> The binder case replaces `S` by `S[v↦v_new]`, while the sequence case applies induction to subcommands with smaller free-variable sets. A special statement using global injectivity or exactly `FV(c)` does not fit these recursive calls. Parameterizing by a larger relevant set `V`, with injectivity and state correspondence on `V`, makes structural induction close.

> [!question] Retrieval check
> 1. Give a counterexample showing why command substitution must be `Var→Var`, not `Var→IntExp`.
> 2. Explain the distinct problems solved by capture avoidance and alias prevention.
> 3. Why is bound-variable renaming safe while mapping two free variables to one is dangerous?
> 4. What does the state-correspondence condition `σ(w)=σ'(S(w))` mean in the substitution theorem?

---

## 11. Using `for` desugaring as a language-design audit — §2.6 · pp. 45–47 · 6 min

> [!abstract] Section focus
> syntactic sugar는 짧은 표기를 core language로 옮기는 번역이며, 번역식이 세부 실행 정책을 고정한다.

`for v:=e₀ to e₁ do c`는 `e₀`부터 `e₁`까지 포함하는 increasing interval (증가 구간)의 각 integer에 `v`를 두고 body를 실행하는 convenience syntax다. 별도 semantic domain이나 semantic equation을 추가하는 대신 기존 `newvar`, `while`, assignment로 translate할 수 있다. 모든 `for`를 반복적으로 eliminate해 core command를 얻을 수 있으면 새 notation은 계산 가능성의 범위를 넓히지 않지만 의도를 더 짧고 제한적으로 표현한다.

첫 translation `v:=e₀; while v≤e₁ do (c;v:=v+1)`은 empty interval (빈 구간)에서 body를 실행하지 않지만 outer `v`를 덮어쓴다. `newvar v:=e₀ in ...`으로 감싸면 control variable이 local이 되어 outer value를 보존한다. 그러나 이 translation도 매 iteration마다 `e₁`을 다시 evaluate한다. body가 `e₁`의 free variable을 바꾸거나 `e₁`이 `v`를 포함하면 upper bound가 움직여 iteration count가 예측되지 않는다.

final translation은 fresh `w`에 upper bound를 먼저 저장하고 그 안에서 local `v`를 initialize한다. `w`는 `v`와 다르고 `e₀`와 `c`의 free-variable set에 나타나지 않아야 한다. 또한 `v∉FA(c)`라는 well-formedness restriction (정형성 제한)을 두어 body가 control variable에 assign하지 못하게 한다. 이 condition들이 있어야 두 bound를 시작 시 한 번씩 evaluate하고 interval size만큼 정확히 실행한다는 contract가 성립한다.

translation order에도 scope information이 들어 있다. outer `newvar w:=e₁`의 initializer는 local `v` scope 밖이므로 `e₁`의 `v`는 바깥 값을 읽는다. 다음 `newvar v:=e₀`의 initializer도 local `v` scope 밖이라 `e₀`의 `v` 역시 바깥 값을 읽는다. loop 안에서만 `v`가 control variable이다. naive macro substitution으로는 이 evaluation timing (평가 시점)과 binding structure를 놓치기 쉽다.

### Recommended `for` desugaring

```text
for v:=e₀ to e₁ do c
≜ newvar w:=e₁ in
    newvar v:=e₀ in
      while v≤w do (c; v:=v+1)

side conditions:
  w≠v
  w∉FV(e₀)∪FV(c)
  v∉FA(c)
```

`≤` 때문에 구간은 양 끝을 포함한다. `e₀>e₁`이면 첫 test부터 거짓이어서 body는 0회 실행된다.

> [!example] Repairing a bad translation step by step
> `for x:=1 to x do skip`을 상한을 다시 평가하는 번역과 고정 상한 번역으로 비교한다.
>
> 1. 나쁜 local 번역은 `newvar x:=1 in while x≤x do (skip;x:=x+1)`이다.
> 2. 가드 `x≤x`가 항상 참이므로 loop는 끝나지 않는다.
> 3. fresh `w`를 쓰면 먼저 바깥 `x` 값을 `w`에 저장하고 local `x`를 1로 둔다.
> 4. 이후 비교는 고정된 `w`를 사용하므로 바깥 `x≥1`이면 유한 횟수, `x<1`이면 0회 실행한다.
>
> **결론:** desugaring은 ‘for가 while과 비슷하다’는 비유가 아니라 평가 시점과 scope까지 정하는 정식 정의다.

> [!question] Retrieval check
> 1. 단순한 `v:=e₀; while ...` 번역이 바깥 상태에 남기는 원치 않는 효과는 무엇인가?
> 2. upper bound를 fresh 변수에 저장하지 않으면 실행 횟수가 바뀌는 예를 만들어라.
> 3. side condition `v∉FA(c)`가 보장하는 `for`의 추론상 장점은 무엇인가?

### English companion — Using `for` desugaring as a language-design audit

*Syntactic sugar is a translation into the core language, and the translation fixes detailed execution policy.*

`for v:=e₀ to e₁ do c` is convenient syntax intended to run the body with `v` taking every integer in the inclusive increasing interval from `e₀` to `e₁`. Instead of adding a new semantic domain or primitive equation, it can be translated into `newvar`, `while`, and assignment. If repeated translation removes every `for`, the construct adds no computational expressiveness, though it can express a restricted intention more clearly.

A first translation, `v:=e₀; while v≤e₁ do (c;v:=v+1)`, correctly skips the body for an empty interval but overwrites outer `v`. Wrapping it in `newvar v:=e₀ in ...` makes the control variable local. Yet this still reevaluates `e₁` after every iteration; if the body changes a free variable of `e₁`, or if `e₁` mentions `v`, the bound moves and the iteration count becomes unpredictable.

The final translation first saves the upper bound in fresh `w`, then initializes local `v` inside it. The name `w` must differ from `v` and not occur free in `e₀` or `c`. A well-formedness restriction `v∉FA(c)` prevents the body from assigning to the control variable. These conditions establish the contract that both bounds are evaluated once at entry and the body runs exactly the interval size.

Translation order also encodes scope. The outer initializer `w:=e₁` lies outside local `v`, so any `v` in `e₁` reads the outer value. The initializer `v:=e₀` likewise lies outside its own scope, so `v` in `e₀` also reads the outer value. Only inside the loop is `v` the control variable. Naive textual macros easily lose these evaluation-time and binding facts.

### Recommended `for` desugaring

```text
for v:=e₀ to e₁ do c
≜ newvar w:=e₁ in
    newvar v:=e₀ in
      while v≤w do (c; v:=v+1)

side conditions:
  w≠v
  w∉FV(e₀)∪FV(c)
  v∉FA(c)
```

The `≤` makes the interval inclusive. If `e₀>e₁`, the first test is false and the body executes zero times.

> [!example] Repairing a bad translation step by step
> Compare reevaluated-bound and fixed-bound translations of `for x:=1 to x do skip`.
>
> 1. The bad local translation is `newvar x:=1 in while x≤x do (skip;x:=x+1)`.
> 2. Its guard `x≤x` is always true, so the loop diverges.
> 3. With fresh `w`, the outer value of `x` is saved before local `x` is set to 1.
> 4. The loop then compares against fixed `w`, running finitely many times if outer `x≥1` and zero times otherwise.
>
> **Conclusion:** Desugaring is not an analogy that `for` resembles `while`; it is a formal definition fixing evaluation time and scope.

> [!question] Retrieval check
> 1. What unwanted outer-state effect does the naive `v:=e₀; while ...` translation leave?
> 2. Construct an example where failing to save the upper bound changes the iteration count.
> 3. What reasoning advantage for `for` is guaranteed by `v∉FA(c)`?

---

## 12. How arithmetic-error policy changes semantic types — §2.7 · pp. 47–48 · 5 min

> [!abstract] Section focus
> 이 절은 오류 결과를 실제로 추가하지 않고, 검출 정책과 비검출 정책이 각각 어떤 semantics을 요구하는지 분리한다.

이 언어에는 0으로 나누기와 overflow라는 두 산술 위험이 있다. overflow는 더 넓은 정수 기계에서는 발생하지 않을 수 있지만 division by zero는 완전한 정수 연산에서도 값이 없다. 그 차이에도 불구하고 언어 설계자는 둘을 검출해 보고할지, underlying hardware가 내는 결과를 받아들일지 결정해야 한다. 이 정책은 구현 세부가 아니라 프로그램이 관찰할 수 있는 동작을 정하는 언어 정의의 일부다.

오류를 검출하지 않는 언어에는 현재 semantics을 유지할 수 있다. 단, 나눗셈과 덧셈을 포함한 모든 primitive를 hardware가 실제 계산하는 정확한 total function으로 지정해야 한다. `x÷0`도 어떤 정수 함수값을 내야 하고 overflow 결과도 deterministic해야 한다. 수학적으로 기대한 값이 아니더라도 같은 입력은 같은 결과를 내므로 expression semantic type `Σ→ℤ`가 유지된다.

error를 detect하려면 현재 model을 조금 고치는 것으로는 부족하다. integer result와 Boolean result에 error를 추가하고 모든 compound expression에서 evaluation order와 error propagation을 정하며 command가 expression error를 만났을 때 어떤 result를 내는지 정해야 한다. error를 bottom과 합치면 보고된 중단과 nontermination을 구별할 수 없다. separate error를 두면 result domain과 observation이 달라진다.

교재는 2장에서 이 확장을 채택하지 않는다. 명령형 semantics의 주된 논점에서 벗어나고, boolean expression을 quantifier-free assertion과 가깝게 유지해 3장의 명세·증명 체계와 연결하려는 목적 때문이다. 오류 result를 가진 expression semantics은 함수형 언어를 다루는 뒤 장에서 본격적으로 돌아온다. 따라서 현재 `⊥`를 arithmetic error라고 해석하면 이 절의 결론을 거꾸로 읽는 셈이다.

> [!warning] Error policy changes the semantic result space
> unchecked arithmetic와 checked arithmetic은 implementation option만 다른 같은 semantics가 아니다. unchecked arithmetic을 선택하면 division과 overflow를 포함한 모든 primitive operation이 machine이 계산하는 total function으로 정확히 지정되어야 한다. mathematical integer operation과 값이 다를 수 있어도 같은 input에는 같은 output을 주므로 기존 expression type `Σ→ℤ`와 Boolean-expression type `Σ→𝔹`를 유지할 수 있다.
>
> checked arithmetic을 선택하면 integer result와 Boolean result에 explicit error outcome을 추가해야 한다. compound expression의 evaluation order에 따라 어떤 error가 먼저 observable한지 달라질 수 있으므로 propagation rule도 syntax-directed하게 정의해야 한다. command가 expression error를 만나면 abort하는지, recover하는지, 별도 result를 내는지도 command semantic type에 포함해야 한다. 단순히 prose에서 ‘error가 난다’고 말하는 것으로는 total semantic function을 얻을 수 없다.
>
> bottom과 error를 같은 element로 합치면 nontermination과 reported termination을 구별하지 못한다. bottom은 현재 lifted state domain에서 final state가 생산되지 않는 nontermination을 나타내지만, error는 finite execution 뒤 observer에게 보고될 수 있는 outcome이다. 두 outcome을 분리하면 result domain, sequencing rule, observation set이 모두 바뀌고 이전 semantic equality도 다시 검토해야 한다.
>
> Chapter 2가 explicit error semantics을 보류하는 이유는 error가 중요하지 않아서가 아니다. 이 장은 state transformer, domain, least fixed point, local binding이라는 핵심 construction에 집중하고 Chapter 3의 predicate-logic assertion language와 Boolean expression의 연결을 유지한다. 따라서 현재 text에서 bottom을 arithmetic error의 번역어처럼 읽으면 model boundary를 넘고, 이 section이 강조하는 design choice를 거꾸로 이해하게 된다.

### Semantic obligations by policy

- 비검출: 모든 primitive arithmetic을 구현이 따르는 precise total function으로 정한다.
- checked: normal value·error·nontermination을 구별하고 compound expression과 command의 propagation order를 정한다.
- 현재 장: 분석은 하지만 error result를 도입하지 않고 expression을 total·error-free로 유지한다.

> [!example] Equations valid even without checking
> division by zero의 실제 정수 결과를 모른다고 해도 total·functional하다고 가정한다.
>
> 1. 같은 상태에서 `x÷0`을 두 번 계산하면 같은 정수를 얻으므로 `x÷0=x÷0`은 true다.
> 2. `if x+y=z then c else c`는 가드값과 무관하게 같은 branch 의미 `⟦c⟧`를 선택한다.
> 3. 이 등식들은 arithmetic 결과가 mathematically correct하다는 가정이 아니라 함수라는 가정에 의존한다.
> 4. 검출된 error를 추가하면 첫 expression은 true가 아니라 error가 될 수 있어 등식이 다시 검토되어야 한다.
>
> **결론:** semantic law는 값의 수학적 의도뿐 아니라 오류 정책과 관찰 가능한 결과에 상대적이다.

> [!question] Retrieval check
> 1. unchecked arithmetic에서 primitive가 반드시 total function이어야 하는 이유는 무엇인가?
> 2. 검출된 error를 `⊥`와 합치면 잃는 관찰을 말하라.
> 3. 2장이 explicit error semantics을 논의하면서도 채택하지 않는 이유를 두 가지 말하라.

### English companion — How arithmetic-error policy changes semantic types

*This section does not actually add error results; it separates the semantics required by checked and unchecked arithmetic.*

The language has two arithmetic hazards: division by zero and overflow. Overflow may disappear on a machine with a wider integer range, whereas division by zero has no value even with perfect integer arithmetic. Despite this difference, the language designer must decide whether to detect and report either event or accept the underlying hardware's result. That policy is part of the language definition, not a mere implementation detail.

For an unchecked language, the current semantics can remain. Every primitive—including division and addition—must be specified as the exact total function computed by the hardware. Even `x÷0` must return some integer, and overflow must be deterministic. The value may not be mathematically intended, but equal inputs produce equal results, preserving the type `Σ→ℤ`.

Checked arithmetic requires a nontrivial extension. Error outcomes must be added to integer and Boolean results; evaluation order and propagation must be fixed for compound expressions; commands must specify what happens when an expression errors. Collapsing error into bottom loses the distinction between reported termination and endless divergence. Keeping it separate changes both the result domain and the observations.

Chapter 2 deliberately does not adopt this extension. It would distract from the main imperative-semantic issues and break the close fit between Boolean expressions and the assertion language used for Chapter 3 specifications and proofs. Expression semantics with explicit errors returns later for functional languages. Reading current bottom as arithmetic error therefore reverses the section's conclusion.

> [!warning] Error policy changes the semantic result space
> Unchecked and checked arithmetic are different semantic policies, not merely implementation switches. Unchecked primitives must be specified as total machine functions so the existing expression types remain valid.
>
> Checked arithmetic adds explicit error outcomes, syntax-directed propagation rules, and command behavior for expression errors. Prose alone cannot make the semantic functions total.
>
> Bottom denotes absence of a final state through nontermination, while an error may be a finitely reported outcome. Separating them changes the result domain, sequencing, observations, and potentially semantic equality.
>
> Chapter 2 defers explicit errors to keep focus on state transformers, domains, fixed points, and binding, and to preserve its connection to Chapter 3 assertions. Reading bottom as arithmetic error crosses the model boundary.

### Semantic obligations by policy

- Unchecked: specify every primitive arithmetic operation as the precise total function implemented.
- Checked: distinguish normal values, errors, and divergence, and fix propagation order through expressions and commands.
- This chapter: analyze the choice but introduce no error result, retaining total error-free expressions.

> [!example] Equations valid even without checking
> Assume division by zero has some total functional integer result, even if we do not know which.
>
> 1. Evaluating `x÷0` twice in the same state gives the same integer, so `x÷0=x÷0` is true.
> 2. `if x+y=z then c else c` selects the same branch denotation `⟦c⟧` regardless of the guard value.
> 3. These equations rely on arithmetic being functional, not on its results being mathematically correct.
> 4. With checked errors, the first expression may produce error rather than true, so the equation must be reconsidered.
>
> **Conclusion:** Semantic laws are relative not only to mathematical intent but also to error policy and observable outcomes.

> [!question] Retrieval check
> 1. Why must primitives be total functions under unchecked arithmetic?
> 2. Which observation is lost by collapsing a detected error into bottom?
> 3. Give two reasons Chapter 2 discusses but does not adopt explicit error semantics.

---

## 13. Defining soundness and full abstraction through observations — §2.8 · pp. 48–51 · 7 min

> [!abstract] Section focus
> semantics의 추상화 수준은 어떤 phrase를 어떤 context에 넣고 무엇을 관찰하는지 정한 뒤에만 평가할 수 있다.

denotational semantics의 목적은 사용자에게 무관한 실행 세부를 버리고 중요한 동작만 남기는 것이다. semantics `⟦-⟧₁`이 `⟦-⟧₀`보다 적어도 더 abstract하다는 말은 `⟦p⟧₀=⟦q⟧₀`이면 반드시 `⟦p⟧₁=⟦q⟧₁`이라는 뜻이다. 더 abstract한 semantics은 더 많은 phrase 쌍을 같게 볼 수 있지만, 사용자에게 보이는 차이까지 지우면 안 된다.

이를 정확히 하려면 observable phrase 집합, outcome을 내는 observation 집합 `O`, 그리고 hole 하나를 가진 observable context 집합 `C`를 정한다. `C[p]`는 hole에 phrase `p`를 넣은 결과다. 여기서 plugging은 syntactic substitution이 아니므로 binder renaming을 자동으로 하지 않는다. 어떤 context에 넣느냐에 따라 자유 이름이 결박될 수 있다는 사실도 language context의 능력에 포함된다.

soundness는 semantic equality가 모든 observation 아래의 contextual indistinguishability를 함의한다는 조건이다. 즉 `⟦c⟧=⟦d⟧`인데 어떤 `O,C`가 `O(C[c])≠O(C[d])`를 보인다면 semantics이 너무 거칠어 unsound하다. full abstraction은 역방향까지 요구한다. 어떤 observation과 context도 둘을 구별하지 못한다면 denotation도 같아야 한다. 역방향이 실패한 semantics은 안전하지만 사용자가 볼 수 없는 내부 차이를 남겨 지나치게 세밀하다.

현재 state-transformer semantics에서 모든 command를 관찰할 수 있고 initial state, termination 여부, final variable value를 볼 수 있다면 full abstraction이 직관적이다. function이 다르면 어떤 input state에서 bottom 여부나 final state의 variable value가 다르고 바로 그 observation이 차이를 드러낸다. 더 놀랍게도 observation을 closed command의 termination만으로 제한해도 `newvar` context가 free variable에 원하는 initial value를 넣고 result difference를 termination/nontermination 차이로 바꾸어 구별할 수 있다.

그러나 결론은 observation과 context에 상대적이다. `x:=x+1;x:=x+1`과 `x:=x+2`는 최종 상태만 보면 같다. 실행 시간, 중간 variable trace, 전력 사용을 관찰하면 다를 수 있다. concurrency context를 추가하면 중간 갱신이 다른 thread에 보이므로 이전의 semantic equality가 observable difference를 숨겨 unsound해질 수 있다. 13장의 procedure와 aliasing도 context의 힘을 바꾼다.

> [!tip] Soundness and full abstraction use observation vocabulary
> semantic soundness는 semantic equality가 contextual equivalence를 함의하는 방향이다. model이 두 command를 같다고 선언했다면 어떤 allowed context와 observation도 그 equality를 반박할 수 없어야 한다. 이 방향이 실패하면 model은 사용자가 실제로 볼 수 있는 차이를 지웠으므로 too coarse하다. 여기서 soundness는 inference rule이 false judgment를 증명하지 않는다는 proof-rule soundness와 구별한다.
>
> full abstraction은 converse까지 더해 semantic equality와 contextual equivalence가 정확히 일치하게 한다. 어떤 context와 observation도 두 command를 구별하지 못한다면 denotation도 같아야 한다. 이 converse가 실패하면 model은 user가 볼 수 없는 internal difference를 남겨 too fine하다. 따라서 full abstraction은 단순히 soundness보다 막연히 강하다는 말이 아니라 두 relation의 equality를 요구하는 정확한 biconditional이다.
>
> contextual equivalence는 context와 observation의 선택에 상대적이다. final state만 관찰하면 같은 command도 execution time, intermediate trace, power consumption, concurrency interference를 observation에 추가하면 달라질 수 있다. language feature를 확장할 때 기존 semantics의 equality를 다시 검토해야 하는 이유가 바로 observation vocabulary가 바뀌기 때문이다.

### Soundness and full abstraction

```text
contextuallyEqual(c,d)
  iff ∀O∈Obs. ∀C∈Ctx. O(C[c]) = O(C[d])

sound:
  ⟦c⟧=⟦d⟧ ⇒ contextuallyEqual(c,d)

fully abstract:
  ⟦c⟧=⟦d⟧ ⇔ contextuallyEqual(c,d)
```

semantic soundness는 denotationally equal하다고 선언한 pair를 user observation이 반박할 수 없게 한다. full abstraction은 user가 context로 영원히 구별할 수 없는 pair를 model도 불필요하게 나누지 않게 한다.

> [!example] Amplifying a final-value difference into termination
> 두 command가 같은 초기 상태에서 모두 끝나지만 `v`의 최종값이 다르고 첫 command만 `v=K`라고 하자.
>
> 1. 각 free variable에 initial-state value를 주는 nested `newvar` declaration으로 두 command를 closed하게 만든다.
> 2. hole 뒤에 `if v=K then skip else while true do skip`을 순차로 붙인다.
> 3. 첫 command를 넣으면 test가 참이어서 전체 closed command가 종료한다.
> 4. second command를 plug하면 test가 false여서 whole closed command가 nonterminate한다.
> 5. 따라서 변수값을 직접 관찰하지 못해도 context가 값 차이를 종료 여부로 변환한다.
>
> **결론:** full abstraction proof는 context가 semantic difference를 허용된 observation으로 얼마나 잘 증폭할 수 있는지에 달려 있다.

> [!warning] Semantic soundness versus proof-rule soundness
> 여기서 semantics이 sound하다는 말은 semantic equality가 observation을 보존한다는 뜻이다. 1장과 3장에서 추론 규칙이 sound하다는 말은 derivable judgment가 semantic truth를 보존한다는 뜻이다. 둘 다 ‘거짓 긍정을 만들지 않는다’는 가족 유사성이 있지만 비교하는 대상이 다르므로 정의를 바꾸어 쓰면 안 된다.

> [!question] Retrieval check
> 1. soundness와 full abstraction의 논리 방향을 각각 식으로 쓰고 ‘too coarse’와 ‘too fine’을 연결하라.
> 2. closed command의 termination만 관찰해도 현재 semantics이 fully abstract일 수 있는 이유를 `newvar` context로 설명하라.
> 3. concurrency를 context에 추가하면 final-state semantics의 기존 equality가 unsound해질 수 있는 예를 말하라.
> 4. semantics soundness와 inference-rule soundness를 구분하라.

### English companion — Defining soundness and full abstraction through observations

*A semantics can be judged too coarse or too fine only after phrases, contexts, and observations are fixed.*

Denotational semantics discards execution details irrelevant to its users while retaining behavior they care about. Semantics `⟦-⟧₁` is at least as abstract as `⟦-⟧₀` when `⟦p⟧₀=⟦q⟧₀` always implies `⟦p⟧₁=⟦q⟧₁`. A more abstract semantics may equate more phrases, but it must not erase user-visible differences.

To formalize this, choose observable phrases, a set `O` of outcome-producing observations, and observable one-hole contexts `C`. The notation `C[p]` plugs phrase `p` into the hole. Plugging is not syntactic substitution and performs no automatic binder renaming; a surrounding language context may bind formerly free names, and that is part of its expressive power.

Soundness says semantic equality implies contextual indistinguishability under every observation. If `⟦c⟧=⟦d⟧` yet some `O,C` yields `O(C[c])≠O(C[d])`, the semantics is too coarse and unsound. Full abstraction adds the converse: if no observation in any context distinguishes the commands, their denotations must be equal. A sound model failing the converse is too fine, retaining differences users cannot observe.

For the current state-transformer model, full abstraction is immediate if every command is observable and an observer may choose an initial state, see termination, and inspect one final variable. Different functions differ on some state by termination or a variable value. More surprisingly, even if only termination of closed commands is observable, `newvar` contexts can install desired values for free variables and convert a final-state difference into a termination difference.

The conclusion is relative to observations and contexts. `x:=x+1;x:=x+1` and `x:=x+2` agree on final states but may differ in execution time, intermediate traces, or power use. Adding concurrency lets another thread observe intermediate updates, making the former equality unsound for the extended language. Procedures and aliasing in Chapter 13 likewise strengthen contexts.

> [!tip] Soundness and full abstraction use observation vocabulary
> Semantic soundness is the direction from semantic equality to contextual equivalence. If it fails, the model has erased an observable distinction and is too coarse. This differs from proof-rule soundness.
>
> Full abstraction adds the converse, making semantic equality coincide exactly with contextual equivalence. A model that retains an unobservable distinction is too fine.
>
> Contextual equivalence is relative to the chosen contexts and observations. Adding time, traces, power, or concurrency can invalidate an equality that was sound for final-state observations alone.

### Soundness and full abstraction

```text
contextuallyEqual(c,d)
  iff ∀O∈Obs. ∀C∈Ctx. O(C[c]) = O(C[d])

sound:
  ⟦c⟧=⟦d⟧ ⇒ contextuallyEqual(c,d)

fully abstract:
  ⟦c⟧=⟦d⟧ ⇔ contextuallyEqual(c,d)
```

Soundness prevents users from refuting an equality claimed by the model. Full abstraction prevents the model from needlessly separating phrases users can never distinguish.

> [!example] Amplifying a final-value difference into termination
> Suppose two commands terminate from one state with different final `v`, and only the first ends with `v=K`.
>
> 1. Use nested `newvar` declarations to initialize every free variable and close both commands.
> 2. After the hole, sequence `if v=K then skip else while true do skip`.
> 3. Plugging the first command makes the test true, so the closed command terminates.
> 4. Plugging the second command makes the test false, so the closed command diverges.
> 5. Thus, even without direct value observation, the context converts a value difference into termination behavior.
>
> **Conclusion:** A full-abstraction proof depends on whether contexts can amplify semantic differences into allowed observations.

> [!warning] Semantic soundness versus proof-rule soundness
> Here, a semantics is sound when semantic equality preserves observations. In Chapters 1 and 3, proof rules are sound when derivability preserves semantic truth. Both avoid false positives, but they compare different objects and their definitions must not be interchanged.

> [!question] Retrieval check
> 1. Write the logical directions of soundness and full abstraction and relate them to ‘too coarse’ and ‘too fine’.
> 2. How can the current semantics remain fully abstract when only termination of closed commands is observed? Use `newvar` contexts.
> 3. Give an example where adding concurrency contexts can make an old final-state equality unsound.
> 4. Distinguish semantic soundness from soundness of inference rules.

---

## 14. Practice workshop: calculate states, approximants, and translations — Integrated practice · pp. 24–53 · 7 min

> [!abstract] Section focus
> 2장의 이해는 용어 암기보다 semantic type을 맞추고 작은 계산을 끝까지 전개할 때 드러난다.

exercise를 시작할 때는 항상 phrase class와 semantic type을 먼저 쓴다. expression인지 command인지, ordinary codomain인지 lifted codomain인지 확인하면 많은 오류를 계산 전에 막을 수 있다. 다음으로 각 constructor의 immediate subphrase를 표시하고 정확히 한 semantic equation씩 적용한다. bottom이 나오면 strict extension이 어디에서 propagate되는지, binder를 만나면 initializer와 body의 scope가 어디서 갈리는지 적는다.

`while` 문제에서는 unwinding equation을 final answer로 멈추지 않는다. functional `F`의 type을 쓰고 least function을 찾은 뒤 `F⁰⊥,F¹⊥,…`가 특정 initial state에서 무엇을 아는지 계산한다. result가 어느 finite stage에서 나타나는지, 아니면 모든 stage가 bottom인지 확인한다. fixed-point equation, continuity, leastness 중 어느 fact를 사용하는지도 구분한다.

binding 문제에서는 `FV`와 `FA`를 따로 계산하고 substitution map이 syntax을 보존하는지부터 검사한다. 두 free variable이 같은 name으로 map되면 원래 commute하던 assignment를 찾아 aliasing counterexample (반례)을 만들 수 있다. `for` 문제에서는 translation 전후의 surface form만 비교하지 말고 bound evaluation count, local control variable, empty interval, body의 control assignment를 차례로 점검한다.

> [!example] Integrated calculation: a loop inside a local declaration
> `newvar x:=2 in while x>0 do (y:=y+x; x:=x-1)`을 초기 `x=9,y=4`에서 계산한다.
>
> 1. initializer는 2이므로 body의 local 초기 상태는 `x=2,y=4`다. 바깥 `x=9`는 복원용으로 보존한다.
> 2. 첫 body 실행 뒤 `y=6,x=1`, 둘째 뒤 `y=7,x=0`이다.
> 3. 다음 guard가 거짓이므로 loop의 finite approximant는 충분한 단계부터 local 최종 상태 `x=0,y=7`을 준다.
> 4. declaration을 나가며 `x`를 9로 restore하고 `y=7`은 retain한다.
> 5. 최종 결과는 `x=9,y=7`이며, loop가 종료하므로 `⊥`는 결과가 아니다.
>
> **결론:** 한 예제 안에서도 fixed point는 loop 종료를, restoration은 scope 밖 관찰을 각각 책임진다.

> [!example] Designing independent exercises
> 아래 과제는 원문 연습문제를 복제하지 않고 같은 정의를 다른 입력에 적용한다.
>
> 1. double assignment `x,y := y,x`를 새 constructor로 넣고 두 expression을 initial state에서 simultaneous하게 evaluate하는 semantic equation을 작성하라.
> 2. `repeat c until b`를 least fixed point로 직접 정의한 뒤 `c; while ¬b do c`라는 desugaring과 비교하라.
> 3. `FV(c₀)∩FA(c₁)=FA(c₀)∩FV(c₁)=∅`이면 `c₀;c₁`과 `c₁;c₀`가 commute할 조건을 상태 의존성으로 설명하라.
> 4. 실행 시간 observation을 추가했을 때 `skip;skip`과 `skip`의 equality가 sound한지 모델 비용 가정과 함께 논하라.
>
> **결론:** 좋은 해답은 식만 적지 않고 필요한 side condition과 semantic type을 함께 밝힌다.

> [!tip] Solution audit order
> (1) syntax이 well formed한가, (2) 의미 식의 양변 type이 같은가, (3) nontermination이 strict하게 전파되는가, (4) initializer와 binder scope가 맞는가, (5) substitution이 alias를 만드는가, (6) observation을 바꾸면 주장한 equality가 유지되는가를 확인한다. 이 여섯 질문은 뒤 장의 더 복잡한 언어에도 그대로 확장된다.

> [!question] Retrieval check
> 1. `repeat`의 direct fixed-point semantics과 desugared semantics이 같음을 보이려면 어떤 두 방향을 확인해야 하는가?
> 2. double assignment와 두 single assignments의 차이를 expression 평가 시점으로 설명하라.
> 3. semantic equality를 주장하기 전에 observation 집합을 명시해야 하는 이유를 예제로 말하라.

### English companion — Practice workshop: calculate states, approximants, and translations

*Understanding Chapter 2 shows up not in vocabulary recall but in well-typed semantic calculations carried to completion.*

Begin each exercise by writing the phrase class and semantic type. Checking expression versus command, and ordinary versus lifted codomain, prevents many errors before calculation. Mark immediate subphrases and apply exactly one semantic equation per constructor. If bottom appears, record where strict extension propagates it; at a binder, mark where initializer and body scopes diverge.

For a `while` exercise, do not stop at the unwinding equation. State the type of functional `F`, identify the least function, and calculate what `F⁰⊥,F¹⊥,…` knows at a chosen initial state. Determine at which finite stage a result appears, or whether every stage remains bottom. Distinguish uses of the fixed-point equation, continuity, and leastness.

For binding exercises, compute `FV` and `FA` separately and first check that a substitution map preserves syntax. When two free variables map to one name, commuting assignments often yield an aliasing counterexample. For `for`, compare not just surface forms but bound-evaluation count, locality of the control variable, the empty interval, and body assignments to the control variable.

> [!example] Integrated calculation: a loop inside a local declaration
> Evaluate `newvar x:=2 in while x>0 do (y:=y+x; x:=x-1)` from `x=9,y=4`.
>
> 1. The initializer is 2, so the local body starts at `x=2,y=4`; outer `x=9` is retained for restoration.
> 2. After the first body run, `y=6,x=1`; after the second, `y=7,x=0`.
> 3. The next guard is false, so sufficiently large finite approximants return local final state `x=0,y=7`.
> 4. Leaving the declaration restores `x` to 9 and retains `y=7`.
> 5. The final result is `x=9,y=7`; because the loop terminates, bottom is not the result.
>
> **Conclusion:** Even in one example, the fixed point accounts for loop termination while restoration determines the observation outside scope.

> [!example] Designing independent exercises
> These tasks apply the same definitions to new inputs rather than reproducing textbook exercises.
>
> 1. Add double assignment `x,y := y,x` as a constructor and write an equation evaluating both expressions in the initial state.
> 2. Define `repeat c until b` directly by a least fixed point, then compare it with desugaring `c; while ¬b do c`.
> 3. Explain through state dependencies why `c₀;c₁` and `c₁;c₀` commute under `FV(c₀)∩FA(c₁)=FA(c₀)∩FV(c₁)=∅`.
> 4. With execution time observable, discuss whether `skip;skip` equals `skip`, stating assumptions about the cost model.
>
> **Conclusion:** A strong solution states semantic types and side conditions rather than presenting equations alone.

> [!tip] Solution audit order
> Check, in order: (1) well-formed syntax, (2) equal semantic types on both sides, (3) strict propagation of divergence, (4) initializer and binder scope, (5) alias creation by substitution, and (6) stability of claimed equality under changed observations. These six questions scale to richer languages in later chapters.

> [!question] Retrieval check
> 1. What two directions must be checked to show equality of direct fixed-point and desugared semantics for `repeat`?
> 2. Explain the difference between double assignment and two single assignments in terms of expression evaluation time.
> 3. Why must the observation set be stated before claiming semantic equality? Give an example.

---

## 15. Connecting state change to recursion and abstraction — Chapter synthesis · pp. 24–53 · 4 min

> [!abstract] Section focus
> Chapter 2는 small command language를 통해 partial computation (부분 계산), recursion (재귀), binding, language extension, observational equivalence (관찰 동치)를 한 이론으로 묶는다.

첫 연결은 syntax에서 domain으로 간다. finite constructor로 생성된 command에 syntax-directed semantics을 주되 `while` recursion은 command-denotation function space의 continuous functional로 옮긴다. bottom에서 시작한 chain의 limit가 finite execution으로 정당화되는 least denotation을 만든다. Chapter 1의 initial algebra (초기 대수)와 Chapter 2의 least fixed point는 둘 다 finite stage에서 생성된 것만 넣는 least solution (최소 해) 원리를 공유한다.

둘째 연결은 binding에서 program structure로 간다. `newvar`는 name scope뿐 아니라 initialization과 normal termination 뒤 restoration을 semantic equation에 넣는다. command substitution은 writable location 때문에 variable renaming으로 제한되고 alias-free condition에서만 general semantic-preservation theorem을 얻는다. pure expression에서 안전해 보이던 substitution이 effectful language에서는 추가 side condition을 요구한다는 첫 사례다.

셋째 연결은 언어 설계에서 관찰로 간다. `for` desugaring은 scope, bound 평가 횟수, empty interval, control assignment를 번역식과 side condition으로 고정한다. arithmetic error 정책은 결과 공간을 결정한다. soundness와 full abstraction은 그 결과 공간의 equality가 선택한 context와 observation에 맞는지 검사한다. 새 feature를 추가하면 기존 equality를 다시 감사해야 한다.

이 세 연결을 하나의 design procedure (설계 절차)로 읽을 수 있다. 새 construct를 제안하면 먼저 phrase class와 binder를 포함한 syntax을 정하고, 다음으로 모든 normal/abnormal result를 담는 semantic type을 선택한다. recursion이 있으면 approximation order와 continuity를 제시하고 convenience syntax라면 hygienic translation과 side condition을 준다. 마지막으로 user가 allowed context에서 무엇을 관찰할 수 있는지 정해 semantic equality를 검증한다. Chapter 2는 이 procedure를 small language에서 처음 완주한다.

읽을 때도 같은 순서를 역으로 점검하면 좋다. 눈앞의 등식이 무엇을 관찰하지 않기로 했는지 묻고, 그 equality를 만드는 semantic type과 domain order를 확인한 뒤, 마지막으로 어느 syntax constructor와 scope 규칙에서 등식이 시작되었는지 돌아간다. 계산 결과만 맞히는 것보다 가정의 층위를 표시하는 습관이 뒤의 transition semantics, continuation, type system을 비교할 때 훨씬 중요하다.

### What you should explain before closing Chapter 2

- 왜 command의 codomain이 `Σ`가 아니라 `Σ⊥`인지, bottom이 현재 무엇을 뜻하는지
- 왜 while 펼침 방정식이 해를 고르지 못하며 continuity와 leastness가 어떻게 고치는지
- `newvar` initializer의 scope, 복원, `FV`/`FA`, fresh renaming, alias-free substitution의 관계
- 정확한 `for` 번역과 side condition이 각 design defect를 어떻게 막는지
- error policy와 observation/context의 변화가 semantic equality를 왜 바꾸는지

> [!tip] Bridge to Chapter 3
> Chapter 2는 command가 어떤 state transformer를 denote하는지 정의했다. Chapter 3은 이 function을 매번 직접 계산하는 대신 `{p} c {q}` 같은 specification과 syntax-directed inference rule로 원하는 relation을 증명한다. assignment semantics은 backward substitution rule이 되고 `while`의 iteration structure는 invariant rule이 된다. Chapter 2의 semantic equation이 Chapter 3 proof rule의 soundness criterion이다.

> [!question] Retrieval check
> 1. Chapter 2의 least fixed point가 Chapter 1의 finite syntax generation과 공유하는 least-solution principle을 설명하라.
> 2. 새 language feature가 observation이나 context를 넓힐 때 기존 semantics을 다시 검토해야 하는 이유는 무엇인가?
> 3. 2장의 assignment와 while 의미가 3장의 어떤 proof-rule 아이디어로 이어지는가?

### English companion — Connecting state change to recursion and abstraction

*Through a small command language, Chapter 2 unifies partial computation, recursion, binding, language extension, and observational equivalence.*

The first connection runs from syntax to domains. Commands generated by finite constructors receive syntax-directed semantics, while `while` recursion is moved into a continuous functional on the command-denotation space. The limit of the chain from bottom gives the least meaning justified by finite execution. Chapter 1's initial algebra and Chapter 2's least fixed point both select the least solution generated in finite stages.

The second connection runs from binding to program structure. `newvar` puts scope, initialization, and restoration after normal termination into one semantic equation. Because names denote writable locations, command substitution is restricted to variable renaming and obtains a general preservation theorem only under alias-free conditions. This is the first example where substitution that looks safe for pure expressions needs extra side conditions in an effectful language.

The third connection runs from language design to observation. `for` desugaring fixes scope, bound-evaluation count, empty intervals, and control assignment through a translation and side conditions. Arithmetic-error policy determines the result space. Soundness and full abstraction test whether equality in that space matches chosen contexts and observations. Every new feature requires existing equalities to be audited again.

These connections form a reusable design procedure. For a new construct, first specify its phrase class, syntax, and binders; next choose semantic types containing every normal and abnormal outcome. Recursion requires an approximation order and continuity; convenience syntax requires a hygienic translation and side conditions. Finally choose what users can observe in allowed contexts and validate semantic equality. Chapter 2 completes this procedure for the first time on a small language.

The same sequence is useful in reverse while reading: ask what an equation chooses not to observe, identify the semantic type and domain order that support its equality, then trace it back to the syntax constructor and scope rule where it began. Marking these layers of assumptions matters more than merely obtaining the right result, especially when later comparing transition semantics, continuations, and type systems.

### What you should explain before closing Chapter 2

- Why commands return `Σ⊥` rather than `Σ`, and what bottom currently means.
- Why while unwinding fails to select a solution and how continuity plus leastness repairs it.
- How declaration scope, restoration, `FV`/`FA`, fresh renaming, and alias-free substitution fit together.
- How the final `for` translation and each side condition prevent a specific design defect.
- Why error policy and changed observations or contexts alter semantic equality.

> [!tip] Bridge to Chapter 3
> Chapter 2 defines which state transformation a command denotes. Chapter 3 avoids recalculating that function each time by proving specifications such as `{p} c {q}` with syntax-directed inference rules. Assignment semantics becomes backward substitution; loop structure becomes the invariant rule. Chapter 2's equations are the standard against which Chapter 3's proof rules are shown sound.

> [!question] Retrieval check
> 1. Explain the least-solution principle shared by Chapter 2 fixed points and Chapter 1 finite syntax generation.
> 2. Why must existing semantics be reconsidered when a new language feature expands observations or contexts?
> 3. Which Chapter 3 proof-rule ideas arise from Chapter 2's assignment and while semantics?

# Condensed review

## Step 1 — Read commands as state transformers — §2.1–2.2

expression은 state를 관찰하고 command는 state를 바꾸는 state transformer다.

assignment는 한 variable만 갱신하고, sequencing은 두 state transformer를 합성하며, conditional은 Boolean expression의 값으로 분기한다. nontermination은 final state의 부재이므로 command denotation에는 bottom element `⊥`가 필요하다.

> [!question] Close the book and answer
> `x:=x+1; y:=x`의 denotation을 두 state transformer의 composition으로 써 보라.

### English companion

Expressions observe a state; commands transform it.

Assignment updates one variable, sequencing composes transformations, and conditionals branch on a Boolean expression. Nontermination is represented by the absence of a final state, introducing the bottom value ⊥.

---

## Step 2 — Approximation and least fixed points — §2.3–2.4

domain order는 계산 결과의 정보량을 나타내고 continuous function은 증가하는 approximation의 limit를 보존한다.

`while` functional `F`를 0회, 1회, 2회 펼친 finite approximant에서 시작한다. bottom에서 `F`를 반복해 얻는 chain의 least upper bound (lub)가 `fix F`, 즉 least fixed point다.

> [!question] Close the book and answer
> diverging loop의 모든 finite approximant가 왜 final state를 주지 않는지 설명하라.

### English companion

A domain order represents information content, and continuous functions preserve limits of increasing approximations.

Approximate a while loop by allowing zero, one, two, and more unfoldings. Iterating F from ⊥ yields a chain whose least upper bound is `fix F`, the least solution that adds no unjustified behavior.

---

## Step 3 — Declarations, scope, and aliasing — §2.5

local declaration은 name을 bind하고, 서로 다른 name이 같은 storage location을 가리키면 aliasing이 생긴다.

semantics은 declaration 전 값을 저장하고 scope가 끝날 때 복원하는 effect를 모델링한다. syntactic substitution은 binder를 피하고, 서로 다른 variable을 하나로 합치는 substitution이 assignment effect를 바꿀 수 있음을 고려해야 한다.

> [!question] Close the book and answer
> input과 output parameter가 같은 variable로 substitute될 때 factorial program이 깨질 수 있는 이유는?

### English companion

A local declaration binds a name; aliasing occurs when different names designate the same storage.

The semantics models saving the old value and restoring it after the scope. Syntactic substitution must avoid binders and must account for substitutions that merge distinct variables, changing assignment effects.

---

## Step 4 — Extensions and observability — §2.6–2.8

`for` 같은 construct는 core language로 translate할 수 있고 arithmetic-error policy는 observable result space를 바꿀 수 있다.

syntactic sugar는 새 primitive semantics 없이 core language translation으로 정의된다. semantic soundness는 denotationally equal한 program을 어떤 허용 context와 observation도 구별하지 못하게 하며 full abstraction은 converse까지 요구한다.

> [!question] Close the book and answer
> 두 program의 denotation은 다르지만 어떤 language context도 구별하지 못한다면 full abstraction에 어떤 문제가 생기는가?

### English companion

Constructs such as `for` can be translated into the core language, while arithmetic-error policy can change the space of observable results.

Syntactic sugar is defined by translation into the core language rather than a new primitive meaning. Semantic soundness requires denotationally equal programs to be indistinguishable by every allowed context and observation; full abstraction also requires the converse.

## Self-check quiz

### Q1. Why choose the least fixed point for a while loop?

`while` denotation에 least fixed point를 택하는 이유는?

- A. 가장 빠른 implementation이어서 / Because it is the fastest implementation
- B. finite unfolding이 정당화하는 behavior만 포함하기 위해 / To include only behavior justified by finite unfoldings
- C. 모든 loop를 terminate시키기 위해 / To make every loop terminate

> [!success]- Answer and explanation
> **B.** leastness는 fixed-point equation만 만족하는 임의의 추가 behavior를 배제한다.
>
> EN: Leastness excludes arbitrary extra behavior that merely satisfies the equation.

### Q2. What does ⊥ represent in command semantics?

command semantics에서 `⊥`가 나타내는 것은?

- A. syntax error / A syntax error
- B. nontermination 또는 아직 없는 information / Nontermination or absent information
- C. empty state / An empty state

> [!success]- Answer and explanation
> **B.** final state를 생산하지 못하는 computation을 나타낸다.
>
> EN: It represents a computation that produces no final state.

### Q3. What best describes syntactic sugar?

syntactic sugar의 가장 좋은 설명은?

- A. 핵심 언어로 의미 보존 번역되는 convenience syntax / Convenient syntax translated meaning-preservingly into a core language
- B. 파서가 무시하는 주석 / A comment ignored by the parser
- C. 새로운 하드웨어 명령 / A new hardware instruction

> [!success]- Answer and explanation
> **A.** convenience syntax은 표현력을 반드시 늘리지 않는다.
>
> EN: Convenience syntax need not increase expressive power.

## Next concept

state transformer denotation을 얻었으니, 다음에는 그 transformer가 specification을 만족함을 syntactic rule로 증명한다.

**English:** With state-transformer meanings in hand, we next prove syntactically that those transformations meet specifications.

## Source boundary

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 24–53.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
