# Glossary

> [!info] 용어 정책과 읽는 법
> 한국어 학습 노트에서도 syntax, semantics, statement, assertion, constructor와 그 표준 파생 표현은 영문으로 쓴다. 각 장의 링크를 열면 정확한 뜻, English companion, 하드웨어 중심의 엔지니어 관점을 함께 볼 수 있다.

## [[chapter-01-predicate-logic#장별 용어 해설|01. 술어 논리]]

### 술어 논리 (predicate logic)

대상의 값과 관계를 변수, 논리 연산자, 그리고 ‘모든’·‘어떤’ 같은 수량자로 표현하는 논리 체계다. 명제가 한 비트의 참·거짓이라면, predicate는 입력값에 따라 참·거짓이 달라지는 조건이다.

**English:** A logic for expressing values and relationships with variables, logical connectives, and quantifiers such as “for every” and “there exists.” If a proposition is one true/false bit, a predicate is a condition whose bit depends on its inputs.

### syntax

어떤 표현이 언어의 올바른 모양인지 정하는 규칙이다. 아직 그 표현이 무엇을 계산하는지는 말하지 않는다.

**English:** The rules that determine which expressions are well-formed in a language. Syntax alone does not say what those expressions compute.

### semantics

올바른 syntax에 정확한 의미를 부여하는 규칙 또는 수학적 함수다. 프로그램이 어떤 결과, 상태 변화, 또는 관찰 가능한 동작을 만드는지 설명한다.

**English:** Rules or mathematical functions that assign precise meanings to well-formed syntax. They explain the result, state change, or observable behavior produced by a program.

### 상태 (state)

특정 순간에 각 변수에 저장된 값을 한꺼번에 나타낸 지도다. 식의 의미는 대개 상태를 입력받아 값을 내놓는 함수로 정의된다.

**English:** A map containing the value stored in every variable at one instant. The meaning of an expression is often defined as a function from a state to a value.

### assertion

상태가 만족해야 하는 참·거짓 조건이다. 프로그램 명령이 아니라 프로그램이나 상태에 관해 우리가 확인하려는 주장이다.

**English:** A true-or-false condition that a state may satisfy. It is a claim about a program or state, not a command executed by the program.

### abstract syntax

괄호, 공백, 우선순위처럼 표기에만 필요한 부분을 버리고 표현의 실제 트리 구조만 남긴 것이다.

**English:** The tree structure of an expression after discarding notational details such as parentheses, whitespace, and precedence conventions.

### constructor

abstract syntax 트리에서 한 종류의 노드를 만드는 기본 형식이다. 상수, 덧셈, 수량자 등이 각각 constructor가 된다.

**English:** A basic form that creates one kind of node in an abstract syntax tree. Constants, addition, and quantification are examples of constructors.

### 합성성 (compositionality)

전체 표현의 의미가 바로 아래 부분 표현들의 의미와 현재 constructor만으로 결정되는 성질이다.

**English:** The property that the meaning of a whole expression is determined solely by its constructor and the meanings of its immediate parts.

### 타당성 (validity)

assertion이 특정 상태 하나가 아니라 고려하는 모든 상태에서 참인 성질이다. ‘증명 규칙으로 증명했다’는 유도 가능성과는 별개의 semantic 개념이다.

**English:** The property that an assertion is true in every state under consideration, not merely one state. It is a semantic notion distinct from derivability by proof rules.

### 구조적 귀납법 (structural induction)

숫자의 크기가 아니라 syntax 트리가 만들어지는 방식에 따라 성질을 증명한다. 각 기본 constructor와 각 재귀 constructor를 처리하면 모든 유한 트리를 다룬다.

**English:** A proof method that follows how syntax trees are built rather than the size of a number. Cover every base constructor and every recursive constructor to cover all finite trees.

### 캡처 회피 치환 (capture-avoiding substitution)

자유 변수를 다른 식으로 바꿀 때 새 식의 자유 이름이 주변 바인더에 우연히 묶이지 않도록 먼저 충돌하는 이름을 바꾸는 치환이다.

**English:** Substitution that first renames conflicting binders so that free names in the inserted expression do not accidentally become bound.

---

## [[chapter-02-simple-imperative-language#장별 용어 해설|02. 단순 명령형 언어]]

### 도메인 (domain)

계산 결과의 정보량을 순서로 나타내고, 점점 더 정확해지는 근사의 극한을 담을 수 있는 수학적 공간이다. 여기서 ⊥는 결과가 아직 없거나 계산이 끝나지 않음을 나타낸다.

**English:** A mathematical space that orders computation results by information content and contains limits of increasingly precise approximations. Its bottom element ⊥ represents no result yet, including nontermination.

### 연속 함수 (continuous function)

정보가 증가하는 근사 사슬의 최소 상한을 보존하는 함수다. 유한한 입력 정보에서 갑자기 무한히 새로운 정보를 요구하지 않는다는 뜻이다.

**English:** A function that preserves least upper bounds of increasing chains of information. Intuitively, it cannot demand infinitely much new information all at once from finite input evidence.

### 최소 고정점 (least fixed point)

`F(x)=x`를 만족하는 해들 가운데 정보 순서로 가장 작은 해다. 재귀나 while을 유한 번 펼쳐서 정당화할 수 있는 동작만 포함한다.

**English:** The least solution, in the information order, of `F(x)=x`. For recursion or while loops, it includes only behavior justified by some finite unfolding.

### syntactic sugar

핵심 언어의 기존 구성으로 의미 보존 번역할 수 있는 편의 표기다. 쓰기 편해지지만 원칙적으로 새로운 계산 능력을 추가하지 않는다.

**English:** Convenient notation that can be translated meaning-preservingly into existing core-language constructs. It improves usability without necessarily adding computational power.

### 완전 추상성 (full abstraction)

semantics이 두 프로그램을 같다고 보는 경우와 어떤 프로그램 문맥도 둘을 구별하지 못하는 경우가 정확히 일치하는 성질이다.

**English:** The property that semantic equality coincides exactly with indistinguishability by every program context.

---

## [[chapter-03-program-specifications#장별 용어 해설|03. 프로그램 명세와 증명]]

### Hoare 삼중항 (Hoare triple)

`{p} c {q}` 형태로, 전제조건 p를 만족하는 상태에서 명령 c를 실행해 종료하면 사후조건 q가 성립한다는 명세다.

**English:** A specification `{p} c {q}` saying that if command c starts in a state satisfying precondition p and terminates, its final state satisfies postcondition q.

### 루프 불변식 (loop invariant)

루프에 들어가기 전 참이고, 본문을 한 번 실행해도 보존되며, 루프 종료 시 원하는 결과를 끌어내는 assertion이다.

**English:** An assertion that is true before entering a loop, preserved by one body iteration, and strong enough to imply the desired result when the loop exits.

### 변량 함수 (variant function)

루프가 반복될 때마다 엄격히 감소하고 0 아래로 내려갈 수 없는 자연수 값이다. 무한 반복이 불가능함을 증명하는 데 쓴다.

**English:** A natural-number measure that strictly decreases on every loop iteration and cannot fall below zero. It is used to prove that infinite iteration is impossible.

### 결과 규칙 (rule of consequence)

이미 증명한 Hoare 삼중항의 전제조건을 더 강하게 하거나 사후조건을 더 약하게 하여 다른 유효한 명세를 얻는 규칙이다.

**English:** A rule that derives another valid Hoare triple by strengthening the precondition or weakening the postcondition of one already proved.

### 건전성 (soundness)

증명 규칙으로 유도할 수 있는 모든 결론이 실제 semantics에서도 참이라는 성질이다. 잘못된 프로그램을 규칙만으로 ‘증명’하지 못하게 한다.

**English:** The property that every conclusion derivable by the proof rules is also true in the semantics. It prevents the rules from proving incorrect programs correct.

---

## [[chapter-04-arrays#장별 용어 해설|04. 배열]]

### 함수 갱신 (functional update)

기존 배열을 직접 바꾸는 대신 한 인덱스에서만 새 값을 돌려주고 나머지에서는 기존 값과 같은 새 함수를 만드는 관점이다.

**English:** A view of array update that creates a new function returning the new value at one index and the old values everywhere else, rather than mutating the old array in place.

### 정의역 (domain)

함수가 입력으로 받을 수 있도록 정의된 값들의 집합이다. 배열을 함수로 보면 유효한 인덱스 집합이 정의역이 된다.

**English:** The set of inputs on which a function is defined. When an array is viewed as a function, its valid index set is the domain.

### 범위 오류 (bounds error)

배열의 정의역 밖 인덱스로 읽거나 쓰려고 할 때 생기는 오류다. semantics은 이를 실패, 중단, 또는 미정의 동작 중 하나로 명시해야 한다.

**English:** An error caused by reading or writing an index outside an array’s domain. A semantics must say whether this means failure, abort, or undefined behavior.

### 이진 탐색 (binary search)

정렬된 배열에서 중간 원소와 비교해 후보 구간을 매 단계 절반으로 줄이는 탐색 알고리즘이다.

**English:** A search algorithm for sorted arrays that compares the middle element and halves the candidate interval at every step.

### higher-order assertion

값뿐 아니라 함수나 predicate 자체를 변수로 받아 그 성질을 표현하는 assertion이다.

**English:** An assertion that can quantify over or otherwise describe functions and predicates themselves, not only ordinary data values.

---

## [[chapter-05-failure-io-continuations#장별 용어 해설|05. 실패, 입출력, 계속]]

### 시퀀스 도메인 (sequence domain)

유한 또는 무한한 관찰 순서를 원소로 삼고, 짧은 prefix가 긴 실행의 근사가 되도록 순서를 둔 도메인이다.

**English:** A domain whose elements are finite or infinite observation sequences, ordered so that a shorter prefix approximates a longer execution.

### 재귀 도메인 동형 (recursive domain isomorphism)

정의하려는 의미 공간이 자기 자신을 포함하는 방정식의 해라는 뜻이다. 펼쳤다가 다시 접을 수 있는 구조적 대응으로 재귀 데이터를 엄밀히 만든다.

**English:** A meaning space defined as a solution to an equation that contains the space itself. A structural correspondence for unfolding and folding makes recursive data precise.

### 재개 (resumption)

입출력 하나를 내보낸 뒤 환경의 응답에 따라 계산을 이어 가는 나머지 동작을 담은 재귀적 의미 구조다.

**English:** A recursive semantic structure that emits one interaction and contains the remaining computation to resume after the environment responds.

### 계속 (continuation)

현재 계산이 값을 만든 뒤 수행할 나머지 계산을 함수나 데이터로 나타낸 것이다.

**English:** A representation, as a function or data structure, of the rest of the computation to perform after the current computation produces a value.

### CPS (continuation-passing style)

함수가 결과를 직접 반환하지 않고, 그 결과를 받을 계속 함수를 명시적 인수로 받아 호출하는 프로그램 형태다.

**English:** A program form in which a function does not return directly; instead it receives an explicit continuation function and calls it with the result.

---

## [[chapter-06-transition-semantics#장별 용어 해설|06. transition semantics]]

### 구성 (configuration)

실행의 한 순간을 완전히 설명하는 정보 묶음이다. 보통 남은 프로그램, 현재 상태, 저장소처럼 다음 단계를 결정하는 모든 요소를 담는다.

**English:** A bundle containing everything needed to describe one instant of execution and determine its next step, such as the remaining program, state, and store.

### small-step semantics

프로그램 실행을 한 번에 최종 결과로 보내지 않고, 원자적인 한 단계 전이들의 연속으로 정의하는 방식이다.

**English:** A style of semantics that defines execution as a sequence of atomic transitions rather than mapping a whole program directly to its final result.

### 전이 폐쇄 (transition closure)

한 단계 전이 관계를 0회 이상 또는 1회 이상 이어 붙여 여러 단계 실행 관계를 만드는 연산이다.

**English:** The operation that chains a one-step transition relation zero or more times, or one or more times, to obtain multi-step execution.

### 결정성 (determinacy)

같은 구성에서 가능한 다음 구성 또는 최종 관찰이 하나로 정해지는 성질이다.

**English:** The property that a given configuration determines a unique next configuration or a unique final observation.

### 라벨 전이 (labeled transition)

상태 사이의 전이에 입력, 출력, 통신 같은 관찰 가능한 사건 이름을 붙인 관계다.

**English:** A transition relation whose edges carry labels for observable events such as inputs, outputs, or communications.

---

## [[chapter-07-nondeterminism#장별 용어 해설|07. 비결정성과 보호 명령]]

### 보호 명령 (guarded command)

Boolean 조건인 guard와, 그 조건이 참일 때 실행할 명령을 한 쌍으로 묶은 구성이다. 여러 guard가 참이면 그중 하나를 선택할 수 있다.

**English:** A construct pairing a Boolean guard with a command enabled when that guard is true. If several guards are true, one of their commands may be selected.

### 비결정성 (nondeterminism)

같은 시작 상태에서 언어 규칙이 둘 이상의 실행 결과나 다음 단계를 허용하지만 어느 것을 택할지 지정하지 않는 성질이다.

**English:** The property that language rules permit more than one next step or result from the same starting state without specifying which one is chosen.

### 파워도메인 (powerdomain)

비결정적 계산이 만들 수 있는 결과 집합을 도메인 이론의 정보 순서와 함께 다루도록 만든 의미 공간이다.

**English:** A semantic domain designed to represent sets of possible outcomes of a nondeterministic computation while retaining an information ordering.

### 교착 (deadlock)

실행이 끝난 것은 아닌데 현재 참인 guard나 가능한 전이가 하나도 없어 더 진행할 수 없는 상태다.

**English:** A non-final state in which no guard is enabled and no transition can proceed.

### 최약 전제조건 (weakest precondition)

명령을 실행한 뒤 목표 사후조건이 반드시 성립하도록 보장하는 시작 조건 중 가장 약한, 즉 가장 많은 상태를 허용하는 조건이다.

**English:** The least restrictive starting condition that guarantees a target postcondition after executing a command.

---

## [[chapter-08-shared-variable-concurrency#장별 용어 해설|08. 공유 변수 동시성]]

### 인터리빙 (interleaving)

여러 실행 주체의 원자 단계를 각각의 내부 순서는 유지한 채 하나의 전체 순서로 섞어 동시 실행을 모델링하는 방식이다.

**English:** A model of concurrency that mixes atomic steps from several participants into one total order while preserving each participant’s internal order.

### 임계 구역 (critical region)

공유 자원의 일관성을 지키기 위해 다른 경쟁 실행과 섞이지 않고 원자적으로 수행되어야 하는 코드 구간이다.

**English:** A section of code that must execute atomically, without interleaving with competitors, to preserve a shared resource’s consistency.

### 상호 배제 (mutual exclusion)

한 시점에 최대 하나의 실행 주체만 특정 임계 구역에 들어갈 수 있다는 안전 성질이다.

**English:** A safety property stating that at most one participant can occupy a particular critical region at any time.

### 교착 (deadlock)

둘 이상의 실행 주체가 서로가 가진 자원이나 사건을 기다려 어느 쪽도 다음 단계로 갈 수 없는 상태다.

**English:** A state where two or more participants wait on resources or events held by one another, so none can take a next step.

### 공정성 (fairness)

계속 실행 가능하거나 반복해서 요청하는 참여자가 scheduler에 의해 영원히 무시되지 않는다는 실행 가정이다.

**English:** An assumption that a participant which remains enabled, or requests repeatedly, is not ignored forever by the scheduler.

### 말더듬/뭉개기 (stuttering/mumbling)

말더듬은 관찰상 변화 없는 단계를 trace에 추가하는 것이고, 뭉개기는 여러 내부 단계를 하나의 큰 단계로 합치는 것이다.

**English:** Stuttering inserts steps with no observable change into a trace; mumbling combines several internal steps into one larger step.

---

## [[chapter-09-csp#장별 용어 해설|09. 통신 순차 프로세스]]

### CSP (communicating sequential processes)

독립적인 순차 process들이 공유 변수 대신 이름 붙은 통신 사건으로 상호작용하도록 모델링하는 동시성 체계다.

**English:** A concurrency model in which independent sequential processes interact through named communication events instead of shared variables.

### 랑데부 (rendezvous)

보내는 process와 받는 process가 모두 준비된 바로 그때 하나의 통신 사건이 발생하는 동기화다.

**English:** A synchronization in which one communication event occurs exactly when both the sending and receiving processes are ready.

### 채널 (channel)

process 사이의 통신 사건을 식별하고 전달 방향과 값의 종류를 정하는 이름 붙은 연결이다.

**English:** A named connection that identifies communication events between processes and determines direction and the kind of values transferred.

### 동기식 통신 (synchronous communication)

송신과 수신이 같은 사건으로 함께 일어나며, 상대가 준비되지 않으면 준비된 쪽도 기다리는 통신 방식이다.

**English:** Communication where send and receive occur together as one event, and a ready participant waits if its counterpart is not ready.

### 통신 교착 (communication deadlock)

각 process가 상대가 먼저 수행해야 하는 통신을 기다리며 전체 시스템에 가능한 통신 사건이 사라진 상태다.

**English:** A state where every process waits for communication that another process must perform first, leaving the whole system with no possible communication event.

---

## [[chapter-10-lambda-calculus#장별 용어 해설|10. 람다 계산]]

### 람다 추상화 (lambda abstraction)

입력 매개변수 하나와 그 매개변수를 사용하는 본문을 묶어 익명 함수를 만드는 항이다.

**English:** A term that creates an anonymous function by pairing one input parameter with a body that may use that parameter.

### β-축약 (beta-reduction)

함수 적용 `(λx.e) v`에서 본문의 자유로운 x를 인수 v로 안전하게 치환하여 `e[x↦v]`로 바꾸는 계산 단계다.

**English:** The computation step that turns an application `(λx.e) v` into `e[x↦v]` by safely substituting argument v for free occurrences of x in the body.

### 정상 순서 (normal order)

항의 가장 바깥쪽, 가장 왼쪽에 있는 β-redex를 먼저 줄이는 평가 순서다. 정상형이 존재한다면 이 전략은 결국 그것을 찾는다.

**English:** An evaluation order that reduces the leftmost, outermost beta redex first. If a normal form exists, this strategy eventually finds it.

### 적극 평가 (eager evaluation)

함수 본문에 들어가기 전에 인수를 먼저 값으로 계산하는 평가 전략이다. call-by-value가 대표적인 형태다.

**English:** An evaluation strategy that computes a function’s argument to a value before entering the function body. Call-by-value is the standard example.

### 고정점 결합자 (fixed-point combinator)

함수 F를 받아 `F(f)=f`를 만족하는 고정점 f를 만들어 이름 없는 람다 계산 안에서 재귀를 표현하게 하는 항이다.

**English:** A lambda term that takes a function F and produces a fixed point f satisfying `F(f)=f`, enabling recursion without named recursive definitions.

---

## [[chapter-11-eager-functional-language#장별 용어 해설|11. 적극 함수형 언어]]

### evaluation semantics

식이 여러 작은 단계를 거치는 대신 어떤 값으로 평가되는지를 직접 나타내는 판단 규칙 체계다. 환경과 식에서 시작해 값으로 끝나는 큰 단계 설명으로 자주 쓴다.

**English:** A system of judgment rules that directly relates an expression to the value it evaluates to, often as a big-step description from environment and expression to value.

### 클로저 (closure)

함수의 코드와 그 함수가 정의될 때 자유 변수 값을 찾을 환경을 함께 묶은 실행 값이다.

**English:** A runtime value pairing function code with the environment used to resolve the function’s free variables when it was defined.

### 패턴 매칭 (pattern matching)

값의 constructor 모양을 검사하고 그 안의 구성 요소에 이름을 붙여 알맞은 분기를 선택하는 연산이다.

**English:** An operation that inspects a value’s constructor shape, binds names to its components, and selects the corresponding branch.

### 재귀 환경 (recursive environment)

함수 이름이 자기 자신이나 같은 그룹의 다른 함수를 가리킬 수 있도록 고정점으로 묶인 환경이다.

**English:** An environment tied as a fixed point so a function name can refer to itself or to other functions in the same recursive group.

### 동적 바인딩 (dynamic binding)

자유 변수의 값을 함수가 정의된 위치가 아니라 함수가 호출된 시점의 호출 환경에서 찾는 이름 해석 방식이다.

**English:** A name-resolution strategy that looks up a function’s free variables in the caller’s environment at call time rather than where the function was defined.

---

## [[chapter-12-functional-continuations#장별 용어 해설|12. 함수형 언어의 계속]]

### 계속 전달 방식 (continuation-passing style)

모든 함수가 정상 반환 대신 ‘다음에 할 일’을 나타내는 계속을 명시적 인수로 받도록 프로그램 전체를 쓰거나 변환하는 방식이다.

**English:** A style or transformation in which every function receives an explicit continuation representing what to do next instead of returning normally.

### 일급 계속 (first-class continuation)

현재 남은 계산을 보통 값처럼 저장하고, 전달하고, 나중에 다시 호출할 수 있게 만든 계속이다.

**English:** A continuation made into an ordinary value that can be stored, passed, and invoked later to resume the remaining computation.

### call/cc

현재 계속을 일급 값으로 함수에 넘기는 제어 연산이다. 받은 계속을 호출하면 현재 흐름을 버리고 캡처한 지점 이후로 이동한다.

**English:** A control operator that passes the current continuation to a function as a first-class value. Invoking it abandons the current flow and resumes after the capture point.

### 비지역 탈출 (nonlocal exit)

현재 함수 하나만 반환하는 것이 아니라 여러 겹의 호출 문맥을 한 번에 건너뛰어 바깥 처리 지점으로 제어를 옮기는 동작이다.

**English:** A control transfer that skips several nested call contexts at once and resumes at an outer handler rather than returning from only the current function.

### 비함수화 (defunctionalization)

가능한 함수 값들을 유한한 data constructor들로 바꾸고, 하나의 apply dispatcher가 각 경우를 실행하도록 만드는 변환이다.

**English:** A transformation that replaces possible function values with a finite set of data constructors and one apply dispatcher that interprets each case.

---

## [[chapter-13-iswim-like-languages#장별 용어 해설|13. ISWIM 계열 언어]]

### 위치 (location)

저장소에서 값을 넣어 둘 수 있는 식별 가능한 자리다. 위치 자체와 그 위치에 현재 저장된 값은 구분된다.

**English:** An identifiable place in the store where a value can reside. The location itself is distinct from the value currently stored there.

### 참조 (reference)

저장소의 위치를 가리키는 일급 값이다. 역참조하면 현재 값을 읽고, 대입하면 그 위치의 값을 바꾼다.

**English:** A first-class value that designates a location in the store. Dereferencing reads its current content; assignment changes the content at that location.

### 저장소 (store)

각 위치를 그 위치에 현재 들어 있는 값으로 보내는 전체 메모리 상태다.

**English:** The complete memory state, modeled as a map from every allocated location to the value currently stored there.

### 별칭 (aliasing)

서로 다른 두 이름이나 참조가 같은 저장 위치를 가리키는 현상이다. 한 경로로 쓴 값이 다른 경로의 읽기에도 보인다.

**English:** The situation where two distinct names or references designate the same storage location. A write through one path is visible through the other.

### 예외 처리기 (exception handler)

정상 계산 중 특정 예외가 발생하면 일반 계속 대신 제어를 넘겨받아 복구하거나 다른 결과를 만드는 코드다.

**English:** Code that receives control when a particular exception occurs during normal computation, replacing the ordinary continuation to recover or produce another result.

### 백트래킹 (backtracking)

한 선택 뒤 계산이 실패하면 이전 선택 지점의 상태와 남은 대안을 복원해 다른 경로를 시도하는 제어 방식이다.

**English:** A control strategy that, after a chosen path fails, restores an earlier choice point and tries a remaining alternative.

---

## [[chapter-14-normal-order-language#장별 용어 해설|14. 정상 순서 언어]]

### 이름에 의한 호출 (call-by-name)

인수 식을 먼저 계산하지 않고 함수 본문에 전달하며, 매개변수가 사용될 때마다 그 식을 다시 계산하는 호출 방식이다.

**English:** A calling convention that passes an unevaluated argument expression into the body and reevaluates it each time the parameter is used.

### 지연 평가 (lazy evaluation)

인수 계산을 실제로 필요할 때까지 미루고, 한 번 계산한 결과를 공유해 같은 식을 반복 계산하지 않는 전략이다.

**English:** An evaluation strategy that delays a computation until its value is needed and shares the result after the first evaluation to avoid repeated work.

### 썽크 (thunk)

아직 실행하지 않은 식과 나중에 그 식을 계산하는 데 필요한 환경을 묶어 둔 지연 계산 객체다.

**English:** A delayed-computation object pairing an unevaluated expression with the environment needed to evaluate it later.

### 강제 (forcing)

썽크가 나타내는 지연 계산의 실제 값을 요구해 평가를 시작하고 그 결과를 얻는 동작이다.

**English:** The operation of demanding the actual value represented by a thunk, triggering its evaluation and obtaining the result.

### 메모화 (memoization)

계산 결과를 저장해 같은 계산이 다시 요구될 때 실행하지 않고 저장된 값을 돌려주는 기법이다.

**English:** A technique that stores a computed result and returns the stored value rather than rerunning the same computation on later demand.

### 무한 리스트 (infinite list)

끝을 미리 모두 만들지 않고 현재 원소와 다음 원소를 계산할 지연 recipe로 표현한 끝없는 데이터 구조다.

**English:** An unbounded data structure represented by a current element and a delayed recipe for computing the rest, rather than being fully constructed in advance.

---

## [[chapter-15-simple-type-system#장별 용어 해설|15. 단순 타입 체계]]

### 타입 문맥 (typing context)

현재 범위에서 각 자유 변수에 어떤 타입이 약속되어 있는지 기록한 지도다.

**English:** A map recording the type promised for every free variable currently in scope.

### 타입 판단 (typing judgment)

타입 문맥 Γ 아래에서 식 e가 타입 τ를 가진다고 증명 규칙으로 유도할 수 있다는 형식적 statement다.

**English:** A formal statement, derivable by typing rules, that expression e has type τ under typing context Γ.

### 보존 (preservation)

잘 타입된 항이 한 단계 계산한 뒤에도 같은 타입을 유지한다는 성질이다.

**English:** The property that when a well-typed term takes one computation step, the resulting term still has the same type.

### 진행 (progress)

닫혀 있고 잘 타입된 항은 이미 값이거나 적어도 한 단계 계산할 수 있으며, 타입 오류 때문에 막히지 않는다는 성질이다.

**English:** The property that a closed, well-typed term is either already a value or can take a computation step; it is not stuck because of a type mismatch.

### 외재적 의미 (extrinsic semantics)

먼저 타입 없는 전체 항의 의미 공간을 만들고, 타입 규칙을 그중 안전한 항을 골라내는 별도 predicate로 보는 접근이다.

**English:** An approach that first gives meaning to all untyped terms, then treats typing as a separate predicate selecting the safe subset.

### 내재적 의미 (intrinsic semantics)

타입마다 별도의 의미 공간을 두어 애초에 잘 타입된 항만 표현되도록 만드는 접근이다.

**English:** An approach that gives each type its own semantic space so only well-typed terms can be represented in the first place.

### 재귀 타입 (recursive type)

자기 자신의 타입을 정의 안에 다시 포함하는 타입이다. fold와 unfold를 통해 유한 syntax로 재귀 데이터 구조를 표현한다.

**English:** A type whose definition refers back to itself. Folding and unfolding let finite syntax describe recursive data structures.

---

## [[chapter-16-subtypes-intersection-types#장별 용어 해설|16. 서브타입과 교차 타입]]

### 서브타이핑 (subtyping)

S 타입의 모든 값을 T가 필요한 곳에서 안전하게 사용할 수 있을 때 성립하는 `S <: T` 관계다. 단순히 두 타입의 표현이 비슷하다는 뜻은 아니다.

**English:** A relation `S <: T` holding when every value of type S can be used safely wherever T is expected. It is not merely similarity of representations.

### 대체 가능성 (substitutability)

프로그램이 기대하는 관찰 가능한 동작을 깨뜨리지 않고 한 타입의 값을 다른 타입 자리에서 바꿔 쓸 수 있는 성질이다.

**English:** The ability to replace a value with one of another type without violating the observable behavior expected by the surrounding program.

### 공변성 (covariance)

구성 타입 안쪽의 서브타입 방향과 바깥 구성 타입의 서브타입 방향이 같은 성질이다. 보통 읽기만 하는 결과 위치에서 안전하다.

**English:** The property that a type constructor preserves the subtype direction of its component. It is typically safe in output-only or read-only positions.

### 반공변성 (contravariance)

구성 타입 안쪽의 서브타입 방향이 바깥에서는 반대로 뒤집히는 성질이다. 함수의 입력처럼 값을 받아들이는 위치에서 나타난다.

**English:** The property that a type constructor reverses the subtype direction of its component. It appears in consuming positions such as function inputs.

### 교차 타입 (intersection type)

같은 값이 타입 S와 타입 T의 요구를 모두 만족함을 나타내는 `S ∩ T` 타입이다.

**English:** A type `S ∩ T` describing values that satisfy the requirements of both type S and type T.

### 일관성 (coherence)

같은 typing judgment를 만드는 서로 다른 유도 경로가 있더라도 프로그램의 최종 의미가 경로에 따라 달라지지 않는 성질이다.

**English:** The property that different derivation paths for the same typing judgment do not give the program different final meanings.

---

## [[chapter-17-polymorphism#장별 용어 해설|17. 다형성]]

### 전칭 다형성 (universal polymorphism)

하나의 항이 모든 타입 α에 대해 같은 구조로 동작함을 `∀α.T`로 표현하는 타입 체계 기능이다.

**English:** A type-system feature, written `∀α.T`, stating that one term works uniformly for every choice of type α.

### 타입 추상화 (type abstraction)

타입 변수를 매개변수로 묶어, 나중에 어떤 타입을 넣을지 정하는 다형적 값을 만드는 항이다.

**English:** A term that binds a type variable as a parameter, creating a polymorphic value whose concrete type argument will be chosen later.

### 타입 적용 (type application)

다형적 값의 타입 매개변수에 구체 타입을 넣어 해당 인스턴스로 사용하는 항이다.

**English:** A term that supplies a concrete type argument to a polymorphic value, selecting an instance for that type.

### System F

타입 추상화와 타입 적용을 명시적으로 포함하는, 전칭 다형성의 핵심 람다 계산이다. 2차 람다 계산이라고도 한다.

**English:** The core lambda calculus of universal polymorphism, with explicit type abstraction and type application. It is also called the second-order lambda calculus.

### 다형적 인코딩 (polymorphic encoding)

별도 primitive data type 없이 전칭 다형 함수의 사용 규칙만으로 Boolean, pair, list 같은 구조를 표현하는 방법이다.

**English:** A method of representing structures such as Booleans, pairs, or lists using only the behavior of universally polymorphic functions, without primitive data types.

---

## [[chapter-18-module-specification#장별 용어 해설|18. 모듈 명세]]

### 추상 타입 (abstract type)

모듈 밖에서는 내부 표현을 알 수 없고 공개된 연산을 통해서만 값을 만들고 관찰할 수 있는 타입이다.

**English:** A type whose internal representation is hidden outside a module, so clients can create and observe values only through exported operations.

### 실존 타입 (existential type)

‘어떤 숨겨진 표현 타입 α가 존재하고, 그 α로 이 인터페이스 T를 구현한다’를 `∃α.T`로 나타내는 패키지 타입이다.

**English:** A package type `∃α.T` saying that some hidden representation type α exists together with an implementation of interface T at that α.

### 패키징 (packing)

구체 표현 타입과 그 구현 값을 실존 타입 뒤에 봉인하여 클라이언트가 표현을 직접 사용하지 못하게 하는 연산이다.

**English:** The operation that seals a concrete representation type and implementation value behind an existential type so clients cannot use the representation directly.

### 개봉 (unpacking)

실존 패키지를 열어 숨겨진 타입을 신선한 추상 이름으로, 구현을 인터페이스 값으로 잠시 사용하되 표현이 밖으로 새지 못하게 하는 연산이다.

**English:** The operation that opens an existential package, temporarily naming its hidden type abstractly and its implementation as an interface value, without allowing the representation to escape.

### 표현 독립성 (representation independence)

공개 연산의 관찰 결과를 보존하는 한 내부 표현을 다른 것으로 바꿔도 모든 올바른 클라이언트의 동작이 같다는 성질이다.

**English:** The property that one internal representation can replace another without changing any well-behaved client, provided observations through exported operations are preserved.

---

## [[chapter-19-algol-like-languages#장별 용어 해설|19. Algol 계열 언어]]

### 구절 타입 (phrase type)

저장되는 데이터의 종류가 아니라 expression, 쓰기 대상, command, procedure처럼 프로그램 조각이 제공하는 계산 능력을 분류하는 타입이다.

**English:** A type classifying the computational capability provided by a program phrase—expression, writable target, command, or procedure—rather than the kind of stored data.

### acceptor

주어진 타입의 값을 받아 저장하거나 반영할 수 있는 쓰기 능력을 나타내는 구절이다. 값을 읽어 내는 expression과 반대 방향이다.

**English:** A phrase representing the capability to accept and store or otherwise act on a value of a given type. Its direction contrasts with an expression that produces a value.

### variable

같은 저장 대상을 읽는 expression 능력과 쓰는 acceptor 능력을 함께 제공하는 구절이다.

**English:** A phrase combining an expression capability for reading a storage object with an acceptor capability for writing it.

### 선언자 (declarator)

새 저장 공간과 그 이름 또는 능력을 만들고, 정해진 본문 범위에 제공한 뒤 범위가 끝나면 회수하는 프로그램 구성이다.

**English:** A program construct that allocates fresh storage and a name or capability for it, supplies it within a body scope, and reclaims it when that scope ends.

### 스택 규율 (stack discipline)

나중에 할당된 지역 저장이 먼저 해제되고, 지역 위치가 그 범위보다 오래 살아남지 못하도록 하는 LIFO 수명 규칙이다.

**English:** A LIFO lifetime rule under which later local allocations are released first and no local location survives beyond its scope.

### Algol

block structure, lexical scope, 지역 변수, procedure를 현대적 형태로 정립한 초기 언어 계열이다. 이 장에서는 그 설계 원리를 의미와 타입으로 분석한다.

**English:** An early language family that established modern forms of block structure, lexical scope, local variables, and procedures. This chapter studies its design principles semantically and through types.

---

## [[appendix-mathematical-background#장별 용어 해설|A. 수학적 배경]]

### 멱집합 (powerset)

집합 S에서 만들 수 있는 모든 부분집합을 원소로 갖는 집합이다. 빈 집합과 S 자체도 포함한다.

**English:** The set of every subset that can be formed from S, including the empty set and S itself.

### 관계 합성 (relational composition)

관계 R로 한 번 이동하고 이어서 관계 S로 이동할 수 있을 때 시작과 끝을 직접 연결하는 새 관계를 만드는 연산이다.

**English:** An operation forming a new relation between start and end points whenever one can first follow relation R and then relation S through an intermediate point.

### 부분 함수 (partial function)

정의역의 일부 입력에서는 결과가 존재하지 않을 수 있는 함수다. 결과가 존재하는 입력에서는 여전히 하나의 결과만 갖는다.

**English:** A function that may have no result for some inputs in its intended input set. Wherever it is defined, it still has only one result.

### 데카르트 곱 (Cartesian product)

A의 원소 하나와 B의 원소 하나를 순서쌍으로 함께 담는 모든 경우의 집합이다.

**English:** The set of every ordered pair containing one element from A together with one element from B.

### 분리합 (disjoint union)

A의 값 또는 B의 값 중 하나를, 어느 쪽에서 왔는지 나타내는 tag와 함께 담는 집합이다.

**English:** A set containing either a value from A or a value from B together with a tag recording which side it came from.

### 반사·추이 폐쇄 (reflexive-transitive closure)

관계 R을 0회 이상 이어서 도달할 수 있는 모든 쌍을 포함하는 가장 작은 관계다. 0회 경로 때문에 각 원소는 자기 자신과도 관계된다.

**English:** The smallest relation containing every pair reachable by following R zero or more times. Zero-length paths make every element related to itself.
