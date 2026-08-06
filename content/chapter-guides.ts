import { b, type Bilingual } from "./types";

export type SectionBrief = {
  covers: string;
  title: Bilingual;
  detail: Bilingual;
};

export type ChapterGuide = {
  purpose: Bilingual;
  sections: SectionBrief[];
  takeaways: Bilingual[];
  cautions: Bilingual[];
};

const section = (covers: string, ko: string, en: string, detailKo: string, detailEn: string): SectionBrief => ({
  covers,
  title: b(ko, en),
  detail: b(detailKo, detailEn),
});

export const chapterGuides: Record<string, ChapterGuide> = {
  "predicate-logic": {
    purpose: b("이후 모든 장에서 사용할 세 가지 층위—syntax, 의미, 증명—를 분리하고 다시 연결하는 법을 세운다.", "Establishes how to separate and reconnect the three layers used throughout the book: syntax, semantics, and proof."),
    sections: [
      section("§1.1", "abstract syntax과 구조적 정의", "Abstract syntax and structural definition", "논리식의 표면 표기 대신 항과 공식의 constructor를 정의한다. 이 구조는 재귀 함수와 구조적 귀납법의 기준이 된다.", "Defines constructors for terms and formulas independently of surface notation. That structure supports recursive functions and structural induction."),
      section("§1.2", "환경을 통한 표시적 의미", "Denotational meaning through environments", "변수 환경과 기호 해석을 입력으로 받아 항은 값으로, 공식은 진릿값으로 보낸다. 의미 함수의 각 절은 syntax constructor에 대응한다.", "Given a variable environment and an interpretation of symbols, terms denote values and formulas denote truth values. Each semantic clause follows a syntax constructor."),
      section("§1.3", "타당성과 추론", "Validity and inference", "한 해석에서 참인 것, 모든 환경에서 참인 것, 모든 해석에서 타당한 것을 구분한다. 추론 규칙은 전제가 참일 때 결론도 참이라는 건전성 기준으로 평가한다.", "Distinguishes truth in one interpretation, truth under every environment, and validity across interpretations. Inference rules are judged by sound preservation of truth."),
      section("§1.4", "바인딩, 이름 변경, 치환", "Binding, renaming, and substitution", "자유·결박 변수를 정의하고 캡처 회피 치환을 구성한다. 대입 보조정리는 syntactic substitution과 환경 갱신이 같은 의미 효과를 낸다는 연결 고리다.", "Defines free and bound variables and constructs capture-avoiding substitution. The substitution lemma connects syntactic replacement with semantic environment update."),
    ],
    takeaways: [
      b("abstract syntax은 파싱 결과이며, 의미와 증명은 그 트리 위에서 재귀적으로 정의된다.", "Abstract syntax is the result of parsing; semantics and proofs are recursively defined over that tree."),
      b("의미는 기호 자체가 아니라 해석과 환경에 상대적이다.", "Meaning is relative to an interpretation and an environment, not inherent in a symbol."),
      b("치환 정리는 이후 선언, 함수 호출, 베타 축약의 정확성을 지탱한다.", "Substitution results later support declarations, function calls, and beta-reduction."),
    ],
    cautions: [
      b("공식이 특정 환경에서 참이라는 말과 논리적으로 타당하다는 말을 혼동하지 않는다.", "Do not confuse truth under one environment with logical validity."),
      b("문자열 치환은 변수를 포획할 수 있으므로 바인더 이름 변경이 필요하다.", "Textual replacement can capture variables, so bound-variable renaming may be required."),
    ],
  },
  "simple-imperative-language": {
    purpose: b("작은 명령형 언어를 완전한 수학적 대상으로 만들고, 반복과 재귀에 의미를 부여하는 도메인 이론의 최소 도구를 도입한다.", "Turns a small imperative language into a complete mathematical object and introduces the minimum domain theory needed to interpret iteration and recursion."),
    sections: [
      section("§2.1–2.2", "syntax, 상태, 의미 함수", "Syntax, states, and semantic functions", "식은 상태에서 값으로, 명령은 상태에서 상태로 가는 부분 함수로 해석된다. 정의되지 않음은 산술 오류가 아니라 비종료를 먼저 나타낸다.", "Expressions map states to values, while commands are partial functions from states to states. Undefinedness initially represents nontermination rather than arithmetic failure."),
      section("§2.3–2.4", "도메인, 연속성, 최소 고정점", "Domains, continuity, and least fixed points", "부분 정보를 순서화하고 증가 사슬의 최소 상계를 사용한다. 연속 함수의 최소 고정점은 while 의미를 유한한 반복 근사의 극한으로 구성한다.", "Partial information is ordered and increasing chains receive least upper bounds. A continuous function’s least fixed point constructs while-loop meaning as the limit of finite approximations."),
      section("§2.5–2.6", "선언, 치환, 문법 설탕", "Declarations, substitution, and syntactic sugar", "지역 변수 선언의 의미를 환경 확장과 치환으로 비교한다. for 문은 핵심 언어로 번역되는 파생 형식이며 번역이 변수 포획과 평가 횟수를 보존해야 한다.", "Local declarations are compared through environment extension and substitution. A for-command is derived syntax whose translation must preserve binding and evaluation behavior."),
      section("§2.7", "산술 오류의 명시화", "Making arithmetic errors explicit", "비종료와 오류를 같은 미정의 값으로 합치면 관찰을 잃는다. 결과 도메인에 오류를 별도 경우로 추가해 두 현상을 구분한다.", "Collapsing divergence and arithmetic error into one undefined result loses observations. Extending the result domain with an explicit error separates them."),
      section("§2.8", "건전성과 완전 추상성", "Soundness and full abstraction", "의미가 실행 관찰을 보존하는지, 그리고 문맥이 구별할 수 없는 프로그램만 의미적으로 같게 두는지 검사한다. 완전 추상성은 의미 동치와 문맥 동치의 일치를 요구한다.", "Checks whether denotations preserve operational observations and identify only programs no context can distinguish. Full abstraction asks denotational and contextual equivalence to coincide."),
    ],
    takeaways: [
      b("명령의 핵심 의미 객체는 상태 변환이며 비종료 때문에 보통 부분적이다.", "A command’s central semantic object is a state transformer, generally partial because of divergence."),
      b("while은 방정식의 아무 해가 아니라 유한 실행에서 접근 가능한 최소 해를 취한다.", "A while-loop takes the least solution of its semantic equation—the one approximated by finite executions."),
      b("언어 확장은 새 관찰을 의미 도메인에 추가하게 만든다.", "Language extensions force new observations into the semantic domain."),
    ],
    cautions: [
      b("⊥를 자동으로 ‘오류’라 부르지 않는다. 이 장의 기본 모델에서는 비종료다.", "Do not automatically read bottom as ‘error’; in the basic model it denotes nontermination."),
      b("고정점 방정식만 쓰는 것으로는 부족하다. 왜 최소 고정점인지 설명해야 한다.", "Writing a fixed-point equation is insufficient; explain why the least fixed point is selected."),
    ],
  },
  "program-specifications": {
    purpose: b("프로그램의 의미를 실행 결과뿐 아니라 사전·사후 조건과 증명 규칙으로 표현하고, 실제 알고리즘 증명에 적용한다.", "Expresses program meaning through preconditions, postconditions, and proof rules, then applies the system to nontrivial algorithms."),
    sections: [
      section("§3.1–3.2", "명세의 의미와 유도 체계", "Meaning of specifications and derivation systems", "Hoare 삼중항은 사전조건을 만족하는 상태에서 명령이 종료하면 사후조건이 성립한다는 부분 정확성 주장이다. 유도 트리는 기본 공리와 규칙으로 이런 주장을 만든다.", "A Hoare triple is a partial-correctness claim: if a command starts in a precondition state and terminates, the postcondition holds. Derivation trees construct such claims from axioms and rules."),
      section("§3.3–3.5", "대입, 순차 합성, 반복 규칙", "Rules for assignment, sequencing, and iteration", "대입 규칙은 사후조건에 역치환하고, 순차 합성은 중간 assertion을 연결한다. while 규칙의 핵심은 반복 전후에 보존되는 불변식이며 결과 조건은 불변식과 가드의 거짓을 결합한다.", "Assignment reasons backward by substitution in the postcondition; sequencing links an intermediate assertion. The while rule centers on an invariant preserved by the body, with exit combining the invariant and false guard."),
      section("§3.6", "피보나치 프로그램 증명", "Proof of a Fibonacci program", "연속한 피보나치 수를 상태 변수와 반복 횟수에 연결하는 불변식을 설계한다. 다중 대입의 동시성 여부가 불변식 보존에 직접 영향을 준다.", "An invariant relates state variables and the iteration count to consecutive Fibonacci numbers. Whether multiple assignment is simultaneous directly affects preservation."),
      section("§3.7", "빠른 거듭제곱 증명", "Proof of fast exponentiation", "지수를 짝수·홀수로 나누면서 누산값과 남은 밑·지수가 원래 거듭제곱을 보존한다는 대수적 불변식을 사용한다.", "An algebraic invariant states that the accumulator combined with the remaining base and exponent still represents the original power while even and odd cases reduce the exponent."),
      section("§3.8", "복잡성, 종료, 표현력의 한계", "Complications, termination, and limits", "부분 정확성과 전체 정확성을 구분하고, 종료 함수와 assertion language의 표현력이 추가로 필요함을 확인한다. 규칙의 건전성과 상대적 완전성도 별개의 질문이다.", "Separates partial from total correctness and identifies the extra need for variants and an expressive assertion language. Soundness and relative completeness of the rules are distinct questions."),
    ],
    takeaways: [
      b("프로그램 증명의 창조적 핵심은 계산이 아니라 적절한 불변식의 발견이다.", "The creative core of program proof is discovering the right invariant, not performing the derivation."),
      b("검증 조건은 큰 증명을 논리식 묶음으로 환원해 자동화 지점을 드러낸다.", "Verification conditions reduce a large proof to logical formulas and expose opportunities for automation."),
      b("부분 정확성은 종료를 약속하지 않는다. 전체 정확성에는 감소 척도가 필요하다.", "Partial correctness does not promise termination; total correctness needs a decreasing measure."),
    ],
    cautions: [
      b("while 가드를 불변식 자체로 착각하지 않는다. 불변식은 가드가 참인 반복 중에도 보존되어야 한다.", "Do not mistake the while guard for the invariant; the invariant must be preserved while the guard is true."),
      b("대입 규칙의 치환 방향은 사전조건에서 사후조건으로가 아니라 사후조건에서 거꾸로다.", "Assignment substitution works backward from the postcondition, not forward from the precondition."),
    ],
  },
  arrays: {
    purpose: b("배열을 포함하도록 상태와 assertion 논리를 확장하고, 이진 탐색을 통해 데이터 구조 불변식과 범위 추론을 연습한다.", "Extends states and assertion logic with arrays, using binary search to practice data-structure invariants and range reasoning."),
    sections: [
      section("§4.1–4.2", "배열 syntax과 함수적 저장", "Array syntax and functional stores", "배열 읽기와 갱신을 core syntax에 추가하고, 배열 값을 인덱스에서 원소로 가는 유한 함수로 본다. 갱신은 새 배열 값을 만들되 나머지 인덱스를 보존한다.", "Adds array selection and update, treating an array value as a finite function from indices to elements. Update creates a new array value while preserving all other indices."),
      section("§4.3", "이진 탐색과 구간 불변식", "Binary search and interval invariants", "검색 후보가 현재 경계 사이에만 존재한다는 불변식과 정렬 가정을 결합한다. 각 분기는 후보 구간을 줄이면서 목표 원소의 가능성을 보존한다.", "Combines sortedness with an invariant that any candidate lies within the current bounds. Each branch shrinks the interval while preserving the possibility of the target."),
      section("§4.4", "배열 대입의 추론 규칙", "Inference rules for array assignment", "스칼라 대입의 단순 치환 대신 배열 갱신 식을 assertion에 반영한다. 선택-갱신 관계는 같은 인덱스와 다른 인덱스의 경우를 나눈다.", "Replaces scalar substitution with array-update expressions inside assertions. Selection after update splits into equal-index and unequal-index cases."),
      section("§4.5", "배열 전체에 대한 higher-order assertion", "Higher-order assertions about arrays", "정렬됨, 구간 내 일치, 모든 원소의 성질처럼 인덱스를 양화하는 assertion을 사용한다. assertion language가 배열 함수와 양화를 충분히 표현해야 증명 규칙이 유용하다.", "Uses quantified assertions for sortedness, interval agreement, and elementwise properties. Useful proof rules require an assertion language expressive enough for arrays and quantification."),
    ],
    takeaways: [
      b("배열은 여러 독립 변수의 묶음이 아니라 인덱스 함수로 모델링할 수 있다.", "An array can be modeled as an indexed function rather than a bundle of unrelated variables."),
      b("배열 알고리즘의 불변식은 값뿐 아니라 유효 인덱스 구간을 함께 추적한다.", "Array-algorithm invariants track valid index ranges as well as values."),
      b("데이터 구조가 풍부해지면 assertion language의 표현력도 함께 확장되어야 한다.", "As data structures grow richer, the assertion language must grow with them."),
    ],
    cautions: [
      b("배열 갱신이 기존 배열의 모든 위치를 파괴한다고 생각하지 않는다.", "Do not treat array update as destroying every existing element."),
      b("경계 밖 접근과 정렬 가정은 알고리즘 증명에서 별도 의무다.", "Bounds safety and the sortedness assumption are separate proof obligations."),
    ],
  },
  "failure-io-continuations": {
    purpose: b("종료 상태 하나로는 설명할 수 없는 실패·중간 출력·입력을 모델링하고, 계속과 재개가 복잡한 제어를 어떻게 통일하는지 보인다.", "Models failure, intermediate output, and input—effects a single final state cannot express—and shows how continuations and resumptions unify complex control."),
    sections: [
      section("§5.1", "실패를 별도 결과로 분리", "Failure as a distinct result", "fail은 정상 종료나 비종료와 다른 관찰이다. 의미 결과에 실패 표식을 추가하고, 순차 합성이 실패 이후 계산을 실행하지 않도록 전파 규칙을 정한다.", "Failure is observable apart from normal termination and divergence. The result domain gains a failure case, and sequencing propagates failure without running the remainder."),
      section("§5.2–5.3", "중간 출력과 연속성의 물리적 의미", "Intermediate output and the physical case for continuity", "출력은 유한 또는 무한 관찰 시퀀스로 나타난다. 유한 시간에 얻는 정보는 유한 입력 정보에만 의존해야 한다는 계산 가능성 직관이 연속성 요구를 뒷받침한다.", "Output is represented by finite or infinite observation sequences. The idea that finite-time output depends only on finite input information motivates semantic continuity."),
      section("§5.4–5.5", "곱·분리합과 재귀 도메인 방정식", "Products, sums, and recursive domain equations", "여러 결과 성분은 곱으로, 대안 결과는 태그 있는 합으로 조립한다. 자기 참조하는 상호작용 구조는 도메인 동형 방정식의 최소 해로 구성한다.", "Products combine result components; tagged sums represent alternatives. Self-referential interaction structures are constructed as solutions to recursive domain isomorphisms."),
      section("§5.6", "입력과 재개", "Input and resumptions", "입력을 요청한 계산은 끝난 것이 아니라 가능한 각 입력에 대한 다음 계산을 기다린다. 재개는 출력, 입력 요청, 종료를 단계적으로 담는 나무형 의미다.", "A computation requesting input has not finished; it awaits a continuation for each possible input. A resumption is a tree-like meaning containing output, input requests, and termination step by step."),
      section("§5.7", "continuation semantics", "Continuation semantics", "명령의 의미가 최종 결과가 아니라 ‘나머지 계산을 받아 전체 결과를 만드는 함수’가 된다. 순차 합성은 명령들이 같은 계속을 넘겨받는 방식으로 단순해진다.", "A command denotes not a final result but a function that accepts the rest of the computation and produces the whole result. Sequencing becomes continuation threading."),
      section("§5.8", "효과 확장을 계속으로 통합", "Unifying effect extensions with continuations", "실패, 입출력, 비지역 제어의 차이는 계속을 호출·버림·변형하는 방식으로 표현된다. 이 관점은 뒤의 함수형 계속과 예외로 이어진다.", "Failure, I/O, and nonlocal control differ in how they invoke, discard, or transform continuations. This viewpoint leads to functional continuations and exceptions later."),
    ],
    takeaways: [
      b("관찰 가능한 효과가 늘 때마다 단순 state-transformer semantics의 결과형이 부족해진다.", "Each new observable effect exposes missing structure in plain state-transformer semantics."),
      b("재개는 상호작용의 가능한 미래를 데이터 구조로, 계속은 남은 계산을 함수로 나타낸다.", "Resumptions represent possible interactive futures as data; continuations represent the remaining computation as a function."),
      b("연속성은 수학적 편의뿐 아니라 유한 관찰의 계산 가능성을 표현한다.", "Continuity expresses computability of finite observations, not merely mathematical convenience."),
    ],
    cautions: [
      b("fail, 비종료, 산술 오류를 모두 같은 ⊥로 합치면 필요한 관찰을 잃는다.", "Collapsing failure, divergence, and arithmetic error into one bottom loses required observations."),
      b("계속은 단순한 함수 호출 스택이 아니라 관찰하려는 나머지 계산의 의미다.", "A continuation is not merely a runtime call stack; it is the semantic rest of the computation being observed."),
    ],
  },
  "transition-semantics": {
    purpose: b("프로그램 실행을 최종 함수가 아니라 작은 단계들의 관계로 설명하여 중간 상태, 실패, 입출력을 직접 관찰하게 한다.", "Describes execution as a relation of small steps rather than a final function, making intermediate state, failure, and I/O directly observable."),
    sections: [
      section("§6.1", "구성과 전이 관계", "Configurations and transitions", "구성은 남은 명령과 현재 상태를 함께 담는다. 한 단계 전이는 한 구성에서 다음 구성으로의 가능한 실행 움직임이다.", "A configuration pairs the command still to execute with the current state. A one-step transition is one possible execution move between configurations."),
      section("§6.2", "구조적 실행 규칙", "Structural execution rules", "대입, 순차 합성, 조건, 반복의 실행을 추론 규칙으로 정의한다. 복합 명령의 단계는 직접 하위 명령의 단계에서 유도되므로 syntax structure를 따른다.", "Inference rules define execution of assignment, sequencing, conditionals, and loops. Steps of a compound command are derived from steps of its immediate subcommands."),
      section("§6.3", "실패 구성", "Failure configurations", "실패는 더 진행할 수 없는 정상 종료와 구별되는 종착 구성이 된다. 주변 규칙은 이 구성을 순차 문맥 밖으로 전파한다.", "Failure becomes a terminal configuration distinct from normal completion. Context rules propagate it outward through sequencing."),
      section("§6.4", "입출력 표지 전이", "Labeled input/output transitions", "전이에 입력 또는 출력 사건을 붙이면 실행 경로가 관찰 흔적을 생성한다. 외부 환경과의 상호작용을 내부 상태 변경과 분리할 수 있다.", "Labeling transitions with input or output events makes execution paths generate observable traces and separates environment interaction from internal state change."),
    ],
    takeaways: [
      b("denotational semantics은 전체 결과를, transition semantics은 결과가 만들어지는 과정을 강조한다.", "Denotational semantics emphasizes whole results; transition semantics emphasizes the process that produces them."),
      b("실행기는 전이 규칙을 반복 적용하는 것으로 이해할 수 있다.", "An interpreter can be understood as repeatedly applying transition rules."),
      b("라벨이 있는 전이는 동시성과 통신에서 관찰 가능한 사건의 기반이 된다.", "Labeled transitions become the basis for observable events in concurrency and communication."),
    ],
    cautions: [
      b("진행할 규칙이 없는 상태가 항상 정상 종료는 아니다. stuck 상태와 종료를 구분한다.", "A configuration with no applicable rule is not necessarily successful; distinguish stuck states from termination."),
      b("메타언어의 규칙 적용 순서와 대상 언어의 실행 순서를 혼동하지 않는다.", "Do not confuse the metalanguage’s rule application with the object language’s execution order."),
    ],
  },
  nondeterminism: {
    purpose: b("하나의 시작 상태에서 여러 실행이 가능한 언어를 정의하고, 가능 결과 집합과 최약 전제조건으로 그 정확성을 추론한다.", "Defines languages with multiple possible executions from one state and reasons about them through sets of outcomes and weakest preconditions."),
    sections: [
      section("§7.1", "가드 명령과 선택", "Guarded commands and choice", "여러 참 가드 중 하나를 선택해 실행하는 조건·반복 syntax을 전이 규칙으로 정의한다. 선택 방법은 언어 의미가 의도적으로 정하지 않는다.", "Transition rules define conditionals and loops that choose one enabled guard. The language semantics deliberately leaves the choice unresolved."),
      section("§7.2", "유계 비결정성과 파워도메인", "Bounded nondeterminism and powerdomains", "프로그램 의미를 가능한 결과들의 집합으로 올리되, 발산 정보와 집합 순서를 어떻게 다룰지 정해야 한다. 유계 분기는 도메인 구조를 제어한다.", "Program meaning is lifted to sets of possible results, but divergence and the ordering of result sets must be chosen carefully. Finite branching controls the domain structure."),
      section("§7.3", "집합값 의미 방정식", "Set-valued semantic equations", "선택은 결과 집합의 합집합, 순차 합성은 각 가능한 중간 결과에 대한 다음 의미의 합집합이 된다. while은 다시 고정점으로 정의된다.", "Choice becomes union of outcome sets; sequencing unions the second command’s outcomes over all possible intermediate results. Loops again require a fixed point."),
      section("§7.4", "악마적 선택의 명세와 증명", "Specification under demonic choice", "모든 허용 실행이 사후조건을 만족해야 한다는 관점에서는 선택이 검증자에게 불리하게 작용한다. 증명 규칙은 각 가능한 분기를 모두 검사한다.", "If every permitted execution must satisfy the postcondition, choice behaves demonically from the verifier’s perspective. Proof rules must establish every possible branch."),
      section("§7.5", "최약 전제조건", "Weakest preconditions", "wp(C,Q)는 C가 원하는 종료 의미 아래 Q를 보장하게 하는 가장 약한 시작 조건이다. syntax별 변환 법칙은 프로그램을 논리식으로 역계산한다.", "wp(C,Q) is the weakest starting condition ensuring that C establishes Q under the chosen termination interpretation. Syntax-directed equations calculate it backward."),
    ],
    takeaways: [
      b("비결정성은 무작위성이 아니라 여러 행동을 모두 허용하는 명세다.", "Nondeterminism is not randomness; it specifies that multiple behaviors are permitted."),
      b("may와 must 관찰에 따라 결과 집합의 순서와 프로그램 동치가 달라진다.", "May- and must-observations induce different orders on result sets and different program equivalences."),
      b("최약 전제조건은 semantics과 자동 검증 조건 생성 사이의 다리다.", "Weakest preconditions bridge semantics and automatic verification-condition generation."),
    ],
    cautions: [
      b("한 번의 실행 결과만 보고 비결정적 프로그램의 정확성을 판단하지 않는다.", "Do not judge a nondeterministic program from one observed run."),
      b("종료를 요구하는 wp와 부분 정확성용 wlp의 차이를 확인한다.", "Check whether the transformer requires termination (wp) or only partial correctness (wlp)."),
    ],
  },
  "shared-variable-concurrency": {
    purpose: b("공유 저장소에서 명령들이 뒤섞여 실행될 때 상호 배제, 데드락, 공정성, 관찰 동치를 어떻게 정의하는지 다룬다.", "Explains mutual exclusion, deadlock, fairness, and observational equivalence when commands interleave over a shared store."),
    sections: [
      section("§8.1", "병렬 합성과 인터리빙", "Parallel composition and interleaving", "C₁ ∥ C₂는 어느 쪽의 다음 원자 단계도 선택할 수 있다. 가능한 실행은 각 구성요소의 순서를 보존하면서 서로 섞인 전이 경로다.", "In C₁ ∥ C₂, either component may take the next atomic step. Executions are interleavings that preserve each component’s local order."),
      section("§8.2–8.3", "임계 구역과 상호 배제", "Critical regions and mutual exclusion", "공유 불변식을 깨뜨릴 수 있는 코드 조각을 원자적으로 보호한다. 조건부 임계 구역은 가드가 참일 때만 진입하며 상호 배제와 대기를 함께 표현한다.", "Code that could violate a shared invariant is protected atomically. Conditional critical regions combine mutual exclusion with waiting until a guard holds."),
      section("§8.4–8.5", "데드락과 공정성", "Deadlock and fairness", "데드락은 종료하지 않았지만 아무 전이도 없는 전역 상태다. 공정성은 계속 가능하거나 반복 가능해지는 구성요소가 영원히 선택에서 배제되지 않도록 실행 경로를 제한한다.", "Deadlock is a nonterminal global state with no transition. Fairness restricts paths so a component that remains or repeatedly becomes enabled is not postponed forever."),
      section("§8.6", "재개를 이용한 병렬 의미", "Resumption semantics for parallelism", "각 명령의 가능한 다음 단계와 나머지 행동을 재개 나무로 표현한 뒤, 두 나무를 섞어 병렬 실행의 선택 구조를 만든다.", "Each command’s possible next steps and residual behavior form a resumption tree; combining two trees constructs the choices of a parallel execution."),
      section("§8.7", "전이 흔적", "Transition traces", "흔적은 외부에서 보이는 상태 변화의 연속으로 프로그램을 비교한다. 중간 상태를 포함하면 간섭 가능성과 원자성 경계가 드러난다.", "Traces compare programs by sequences of externally visible state changes. Intermediate states expose interference opportunities and atomicity boundaries."),
      section("§8.8", "머뭇거림과 뭉개짐", "Stuttering and mumbling", "내부적으로 아무 변화가 없는 단계를 삽입하는 stuttering과 연속 내부 단계를 하나로 합치는 mumbling 아래에서 닫힌 흔적 의미를 사용해 관찰 세분화 차이를 제거한다.", "Trace sets are closed under inserting unchanged steps (stuttering) and combining adjacent internal steps (mumbling), abstracting from irrelevant granularity."),
    ],
    takeaways: [
      b("병렬 정확성은 각 스레드의 단독 정확성만으로 얻어지지 않는다. 간섭을 함께 분석해야 한다.", "Parallel correctness does not follow from isolated thread correctness; interference must be analyzed."),
      b("안전성은 나쁜 일이 일어나지 않음을, 생존성은 좋은 일이 결국 일어남을 말한다.", "Safety says bad things never happen; liveness says good things eventually happen."),
      b("공정성은 프로그램 코드가 아니라 허용할 스케줄에 대한 semantic 가정이다.", "Fairness is a semantic assumption about admitted schedules, not merely a property of program text."),
    ],
    cautions: [
      b("원자성의 단위를 명시하지 않으면 가능한 인터리빙 집합이 결정되지 않는다.", "Without an explicit atomicity granularity, the set of possible interleavings is undefined."),
      b("데드락 없음이 기아 없음이나 공정성을 자동으로 보장하지 않는다.", "Freedom from deadlock does not automatically guarantee freedom from starvation or fairness."),
    ],
  },
  "communicating-sequential-processes": {
    purpose: b("공유 변수 대신 동기적 통신으로 프로세스를 결합하고, 통신 가능성·데드락·공정성을 사건 중심으로 분석한다.", "Composes processes through synchronous communication instead of shared variables and analyzes communication, deadlock, and fairness through events."),
    sections: [
      section("§9.1–9.2", "프로세스 syntax과 동기 전이", "Process syntax and synchronized transitions", "입력·출력 가드와 병렬 프로세스를 정의한다. 대응하는 송신과 수신이 동시에 준비될 때 하나의 통신 전이가 일어나며 값 전달과 두 프로세스의 진행이 함께 발생한다.", "Defines input/output guards and parallel processes. A communication transition occurs only when matching send and receive actions are ready, transferring a value and advancing both sides."),
      section("§9.3", "언어 설계 제한의 선택", "Choosing language restrictions", "채널 연결 형태, 한 채널의 송수신자 수, 가드 안 명령 허용 범위를 제한하면 구현과 추론은 단순해지지만 표현력도 달라진다.", "Restricting channel topology, numbers of senders and receivers, or commands inside guards simplifies implementation and reasoning while changing expressive power."),
      section("§9.4", "통신 프로토콜 예제", "Communication protocol examples", "파이프라인, 버퍼, 반복 서버 같은 예에서 프로세스 내부 상태와 외부 메시지 순서를 분리해 설계한다. 채널 방향과 종료 프로토콜이 전체 동작을 결정한다.", "Pipelines, buffers, and repeated servers separate private process state from external message order. Channel direction and termination protocol determine global behavior."),
      section("§9.5–9.6", "통신 데드락과 공정성", "Communication deadlock and fairness", "모든 프로세스가 맞지 않는 통신을 기다리면 데드락이다. 여러 통신이 가능한 반복 선택에서는 특정 파트너가 영원히 무시되지 않도록 공정성 조건을 구분한다.", "Deadlock occurs when every process waits for unmatched communication. Repeated choices among enabled communications require fairness conditions so a partner is not ignored forever."),
    ],
    takeaways: [
      b("CSP의 핵심 관찰은 메모리 셀이 아니라 프로세스 사이의 통신 사건이다.", "CSP’s central observations are communication events between processes, not shared memory cells."),
      b("동기 통신은 데이터 전달과 제어 동기화를 한 사건으로 결합한다.", "Synchronous communication combines data transfer and control synchronization in one event."),
      b("프로세스의 지역적 진행 가능성이 전체 시스템의 진행 가능성을 뜻하지 않는다.", "Local readiness of processes does not imply global system progress."),
    ],
    cautions: [
      b("비동기 메시지 큐 모델을 이 장의 동기 rendezvous 모델과 섞지 않는다.", "Do not mix an asynchronous message-queue model with this chapter’s synchronous rendezvous model."),
      b("통신 값뿐 아니라 통신 순서와 상대 프로세스도 관찰의 일부다.", "The order and partner of communications matter, not only the transmitted values."),
    ],
  },
  "lambda-calculus": {
    purpose: b("함수 정의와 적용만으로 계산을 표현하는 최소 언어를 세우고, 축약 전략·표시적 의미·데이터 인코딩을 연결한다.", "Builds a minimal language of function definition and application, connecting reduction strategy, denotational meaning, and data encodings."),
    sections: [
      section("§10.1–10.2", "람다 syntax과 축약", "Lambda syntax and reduction", "변수, 추상화, 적용으로 항을 만들고 자유 변수와 α-동치를 정의한다. β-축약은 함수 적용을 캡처 회피 치환으로 계산하며 여러 redex 중 어디를 줄일지 선택할 수 있다.", "Terms contain variables, abstraction, and application, with free variables and alpha-equivalence. Beta-reduction computes application by capture-avoiding substitution and permits choices among redexes."),
      section("§10.3", "정상 순서 평가", "Normal-order evaluation", "가장 바깥쪽 왼쪽 redex를 먼저 줄이는 전략은 정규형이 존재할 때 이를 찾는 성질이 있다. 사용되지 않는 인수는 평가하지 않을 수 있다.", "Reducing the leftmost outermost redex first finds a normal form when one exists and can avoid evaluating unused arguments."),
      section("§10.4", "적극 평가", "Eager evaluation", "함수 본문에 대입하기 전에 인수를 값으로 평가한다. 실제 구현과 잘 맞지만 정상 순서가 종료하는 일부 항에서 발산할 수 있다.", "Arguments are evaluated to values before substitution into a function body. This suits conventional implementations but may diverge on terms normal order can normalize."),
      section("§10.5", "함수 도메인의 표시적 의미", "Denotational semantics over function domains", "람다 항을 환경에서 의미 값으로 보내고 적용을 의미 함수 적용으로 해석한다. 자기 적용을 포함하려면 값 도메인이 자신의 함수 공간과 연결되는 재귀 구조가 필요하다.", "Maps lambda terms and environments to semantic values, interpreting application as semantic function application. Self-application requires a domain recursively related to its own function space."),
      section("§10.6", "람다 계산 안의 프로그래밍", "Programming inside the lambda calculus", "불리언, 자연수, 쌍, 목록, 재귀를 고차 함수로 인코딩한다. 표현 가능성은 높지만 평가 비용과 타입 안전성은 별도 문제다.", "Encodes booleans, naturals, pairs, lists, and recursion as higher-order functions. Expressiveness is high, while evaluation cost and type safety remain separate concerns."),
    ],
    takeaways: [
      b("β-축약은 단순 문자열 치환이 아니라 바인딩을 보존하는 계산 규칙이다.", "Beta-reduction is a binding-preserving computation rule, not textual replacement."),
      b("평가 전략은 같은 항의 종료 여부와 비용을 바꿀 수 있다.", "Evaluation strategy can change termination and cost for the same term."),
      b("최소 언어에서도 데이터와 제어는 고차 함수로 표현할 수 있다.", "Even a minimal language can represent data and control through higher-order functions."),
    ],
    cautions: [
      b("정규형이 존재한다는 것과 모든 축약 순서가 정규형에 도달한다는 것은 다르다.", "Existence of a normal form does not mean every reduction order reaches it."),
      b("α-동치인 항은 바인더 철자만 다르며 의미상 같은 바인딩 구조다.", "Alpha-equivalent terms differ only in binder spelling and have the same binding structure."),
    ],
  },
  "eager-functional-language": {
    purpose: b("람다 계산을 실제 프로그래밍에 가까운 적극 평가 언어로 확장하고, 환경·클로저·패턴·재귀의 평가와 표시적 의미를 비교한다.", "Extends lambda calculus into a practical eager language and compares evaluation and denotational accounts of environments, closures, patterns, and recursion."),
    sections: [
      section("§11.1–11.2", "concrete syntax과 큰 단계 평가", "Concrete syntax and big-step evaluation", "표면 프로그램을 핵심 식으로 파싱하고, 환경 아래 식이 값으로 평가된다는 판단을 규칙으로 정의한다. 함수 값은 코드와 정의 환경을 묶은 클로저다.", "Parses surface programs into core expressions and defines judgments that evaluate an expression to a value under an environment. Function values are closures pairing code with the defining environment."),
      section("§11.3", "정의, 패턴, 재귀", "Definitions, patterns, and recursion", "패턴 매칭은 값의 구조를 검사하며 성공 시 여러 이름을 동시에 바인딩한다. 상호 재귀 정의는 각 클로저가 자기 자신과 동료 정의를 볼 수 있는 재귀 환경을 만든다.", "Pattern matching inspects value structure and binds multiple names on success. Mutually recursive definitions create an environment in which closures see themselves and their peers."),
      section("§11.4–11.5", "목록과 함수형 예제", "Lists and functional examples", "목록 constructor와 패턴을 이용해 map, fold류 재귀 처리와 정렬·탐색 예제를 표현한다. 데이터 구조 재귀와 함수 재귀의 모양이 맞물린다.", "List constructors and patterns express recursive processing such as map- and fold-like functions, sorting, and search. Data recursion aligns with function recursion."),
      section("§11.6", "직접 표시적 의미", "Direct denotational semantics", "평가 규칙과 별도로 식을 환경에서 도메인 값으로 보내는 합성적 함수를 정의한다. 재귀 정의는 다시 환경 방정식의 최소 고정점이 된다.", "Independently of the evaluation rules, a compositional function maps expressions and environments to domain values. Recursive definitions again become least fixed points of environment equations."),
      section("§11.7", "정적 바인딩과 동적 바인딩", "Static versus dynamic binding", "정적 바인딩은 정의 환경을 클로저에 저장하고, 동적 바인딩은 호출 시점 환경에서 자유 변수를 찾는다. 같은 syntax이 호출 문맥에 따라 달라지는 이유를 비교한다.", "Static binding stores the defining environment in a closure; dynamic binding resolves free variables in the caller’s environment. The comparison shows how identical syntax can change meaning with call context."),
    ],
    takeaways: [
      b("클로저는 렉시컬 스코프를 런타임 값으로 구현한다.", "Closures implement lexical scope as runtime values."),
      b("evaluation semantics과 denotational semantics은 같은 언어를 다른 목적에 맞게 설명한다.", "Evaluation and denotational semantics describe the same language for different purposes."),
      b("재귀 환경은 자기 참조를 값 생성 이전에 연결해야 한다.", "Recursive environments must tie self-reference before the values are fully constructed."),
    ],
    cautions: [
      b("함수 본문의 자유 변수를 호출자 환경에서 찾으면 정적 바인딩이 아니다.", "Resolving a function body’s free variables in the caller’s environment is not static binding."),
      b("패턴 실패와 전체 프로그램 실패의 의미를 구분한다.", "Distinguish failure of one pattern match from failure of the whole program."),
    ],
  },
  "functional-continuations": {
    purpose: b("적극 함수형 언어의 제어 흐름을 계속 전달 방식으로 명시하고, 계속을 값으로 노출하거나 일차 평가기로 변환하는 과정을 보인다.", "Makes control flow explicit through continuation passing, exposes continuations as values, and derives a first-order evaluator from them."),
    sections: [
      section("§12.1", "continuation-passing semantics", "Continuation semantics", "식의 의미는 값 하나가 아니라 결과를 받아 다음 계산을 수행할 계속을 인수로 받는다. 평가 순서는 계속이 중첩되는 순서에 명시적으로 나타난다.", "An expression meaning accepts a continuation that consumes its value and performs the rest of the computation. Evaluation order becomes explicit in continuation nesting."),
      section("§12.2–12.3", "일급 계속과 프로그래밍 기법", "First-class continuations as a technique", "현재 계속을 값으로 캡처하면 이후 호출 시 현재 문맥을 버리고 저장된 제어 지점으로 이동할 수 있다. 조기 탈출, 코루틴, 탐색 같은 비지역 제어를 구성한다.", "Capturing the current continuation as a value permits later invocation to discard the current context and resume a saved control point, implementing early exit, coroutines, and search."),
      section("§12.4", "비함수화로 일차 상태 만들기", "Defunctionalization into first-order states", "실제로 만들어지는 계속 함수의 유한한 형태를 태그 있는 데이터 constructor로 바꾸고, 이를 해석하는 apply 단계로 분리한다. 고차 의미가 명시적 제어 스택을 가진 기계가 된다.", "Replaces the finite family of continuation functions with tagged data constructors plus an apply operation. The higher-order semantics becomes a machine with an explicit control stack."),
      section("§12.5", "일차 평가 기계의 구성", "Structure of the first-order evaluator", "제어 식, 환경, 계속 프레임 사이를 이동하는 상태 전이로 평가를 요약한다. 각 프레임은 아직 평가하지 않은 문맥의 정확한 종류를 기록한다.", "Evaluation is summarized as transitions among a control expression, environment, and continuation frames. Each frame records the exact pending context."),
      section("§12.6", "두 semantics의 대응", "Relating the two semantics", "일차 프레임을 다시 계속 함수로 해석하는 대응을 정의하고 각 기계 단계가 계속 의미를 보존함을 보여 두 설명의 동치를 정당화한다.", "Interprets first-order frames back as continuation functions and shows each machine step preserves continuation meaning, justifying equivalence of the accounts."),
    ],
    takeaways: [
      b("CPS는 숨은 평가 문맥과 순서를 함수 인수로 노출한다.", "CPS exposes hidden evaluation context and order as a function argument."),
      b("비함수화는 의미 정의에서 추상 기계와 구현을 체계적으로 유도한다.", "Defunctionalization systematically derives an abstract machine and implementation from a semantic definition."),
      b("일급 계속은 ‘돌아갈 곳’을 복사·저장·호출할 수 있는 값으로 만든다.", "First-class continuations make ‘where to return’ a value that can be copied, stored, and invoked."),
    ],
    cautions: [
      b("저장된 계속을 호출하는 것은 일반 함수 호출처럼 현재 위치로 다시 돌아오지 않는다.", "Invoking a saved continuation does not return to the invocation point like an ordinary function call."),
      b("CPS의 결과형과 원래 식의 값형을 같은 것으로 보지 않는다.", "Do not conflate the CPS answer type with the original expression’s value type."),
    ],
  },
  "iswim-like-languages": {
    purpose: b("적극 함수형 언어에 가변 참조를 결합하고, 예외·백트래킹·입출력까지 상태와 계속의 조합으로 설명한다.", "Combines mutable references with an eager functional language and explains exceptions, backtracking, and I/O through the interaction of state and continuations."),
    sections: [
      section("§13.1", "별칭, 위치, 저장소", "Aliasing, locations, and stores", "참조 값은 저장소 위치를 가리키고 여러 이름이 같은 위치를 가리키면 별칭이 생긴다. 환경은 이름을 값에, 저장소는 위치를 현재 내용에 대응시켜 분리된다.", "Reference values point to store locations; aliasing occurs when multiple names reach the same location. Environments map names to values, while stores separately map locations to current contents."),
      section("§13.2–13.3", "상태를 통과시키는 평가와 계속", "State-threaded evaluation and continuations", "평가 판단은 값과 함께 갱신된 저장소를 반환한다. continuation semantics에서는 계속이 값과 저장소를 함께 받아 평가 순서와 부작용 순서를 동시에 고정한다.", "Evaluation returns an updated store along with a value. In continuation semantics, continuations consume both value and store, fixing evaluation order and effect order together."),
      section("§13.4–13.6", "문법 설탕, 일차 기계, 예제", "Derived forms, first-order machine, and examples", "대입·블록·반복 같은 convenience syntax을 핵심 참조 연산으로 번역하고, 계속을 비함수화해 환경-저장소-제어 스택 기반 평가기를 얻는다.", "Translates assignment, blocks, loops, and other conveniences into core reference operations, then defunctionalizes continuations into an evaluator with environment, store, and control stack."),
      section("§13.7", "예외", "Exceptions", "정상 계속과 별도의 예외 계속을 사용하면 raise는 정상 나머지 계산을 건너뛰고 가장 가까운 handler로 제어와 값을 전달한다.", "With a separate exception continuation, raise bypasses the normal remainder and transfers control and a value to the nearest handler."),
      section("§13.8", "백트래킹과 상태 복원", "Backtracking and state restoration", "실패 계속은 다음 선택지를 기억한다. 선택 시점의 저장소도 보존할지 결정해야 하며, 복원 정책에 따라 탐색 의미가 달라진다.", "A failure continuation remembers the next alternative. Whether the store at the choice point is restored is a semantic decision that changes search behavior."),
      section("§13.9–13.10", "입출력과 효과 조합의 복잡성", "I/O and complications of combining effects", "입출력은 외부 세계와 되돌릴 수 없는 관찰을 만든다. 참조, 예외, 백트래킹, I/O를 함께 두면 효과 순서와 복구 가능성이 상호작용해 단순한 등식 추론을 깨뜨린다.", "I/O creates externally visible, often irreversible observations. Combining references, exceptions, backtracking, and I/O makes effect order and recoverability interact, invalidating simple equations."),
    ],
    takeaways: [
      b("환경은 이름의 스코프를, 저장소는 위치 내용의 시간 변화를 설명한다.", "The environment explains lexical naming; the store explains how location contents change over time."),
      b("별칭 때문에 한 이름을 통한 갱신이 다른 이름의 관찰을 바꾼다.", "Aliasing lets an update through one name change observations through another."),
      b("여러 효과의 조합은 각 효과를 따로 이해한 것보다 더 복잡하다.", "Combining effects is more complex than understanding each one in isolation."),
    ],
    cautions: [
      b("참조 값과 참조가 가리키는 현재 값을 구분한다.", "Distinguish a reference value from the current value stored at its location."),
      b("백트래킹이 제어만 되돌리는지 저장소와 출력까지 되돌리는지 모델에서 확인한다.", "Check whether backtracking restores only control or also state and output."),
    ],
  },
  "normal-order-language": {
    purpose: b("인수를 먼저 계산하지 않는 정상 순서 언어를 정의하고, 이름 호출과 필요 호출의 의미·비용·공유 차이를 분석한다.", "Defines a normal-order language and analyzes the meaning, cost, and sharing differences among call-by-name and call-by-need."),
    sections: [
      section("§14.1", "정상 순서 평가 판단", "Normal-order evaluation judgments", "함수 적용은 평가되지 않은 인수 식과 그 환경을 본문에 전달한다. 인수가 실제로 필요할 때마다 해당 환경에서 평가된다.", "Function application passes an unevaluated argument expression with its environment into the body. The argument is evaluated in that environment whenever demanded."),
      section("§14.2–14.3", "derived syntax과 무한 구조 예제", "Derived forms and infinite structures", "조건, 목록, 재귀를 정상 순서 핵심으로 표현하면 사용하지 않는 분기를 피하고 잠재적으로 무한한 목록의 유한 접두사를 소비할 수 있다.", "Encoding conditionals, lists, and recursion in the normal-order core avoids unused branches and permits finite consumption of potentially infinite lists."),
      section("§14.4", "직접 표시적 의미", "Direct denotational semantics", "식 의미가 필요한 정보만 근사하도록 비엄격 함수 공간을 사용한다. 엄격성 여부는 인수의 ⊥가 결과를 반드시 ⊥로 만드는지로 드러난다.", "Uses non-strict function spaces so expression meanings demand only needed information. Strictness is visible in whether a bottom argument necessarily yields bottom."),
      section("§14.5", "축약과 환경 평가의 대응", "Relating reduction and environment evaluation", "치환 기반 정상 순서 축약과 환경·서스펜션 기반 평가가 같은 관찰 결과를 주는 관계를 비교한다. 구현은 반복 치환을 피한다.", "Relates substitution-based normal-order reduction to evaluation using environments and suspensions. Implementations avoid repeated textual substitution while preserving observations."),
      section("§14.6", "필요 호출과 공유", "Call-by-need and sharing", "처음 강제한 인수 결과를 저장해 이후 사용이 같은 값을 재사용하게 한다. 이는 이름 호출의 의미를 유지하면서 중복 평가를 줄이지만 메모이제이션 저장소가 필요하다.", "Caches the result when an argument is first forced, so later uses share the value. This preserves call-by-name results while reducing repeated work, at the cost of memoization state."),
    ],
    takeaways: [
      b("정상 순서는 정규형이 존재할 때 찾지만 같은 계산을 반복할 수 있다.", "Normal order finds a normal form when one exists but may repeat work."),
      b("지연 평가는 정상 순서의 비엄격성과 결과 공유를 결합한다.", "Lazy evaluation combines normal-order non-strictness with sharing."),
      b("무한 자료 구조는 전체를 생성하지 않고 요구된 부분만 관찰한다.", "Infinite data structures are observed by producing only demanded portions."),
    ],
    cautions: [
      b("call-by-name과 call-by-need는 결과가 같아도 평가 횟수와 공간 동작이 다르다.", "Call-by-name and call-by-need may agree on results while differing in evaluation count and space behavior."),
      b("‘지연’이 항상 효율적이라는 뜻은 아니다. 유지되는 thunk가 공간 누수를 만들 수 있다.", "‘Lazy’ does not always mean efficient; retained thunks can cause space leaks."),
    ],
  },
  "simple-type-system": {
    purpose: b("타입 판단을 추론 규칙으로 정의하고, 타입 안전성을 외재적·내재적·집합론적 관점에서 비교한다.", "Defines typing judgments by inference rules and compares extrinsic, intrinsic, and set-theoretic accounts of type safety."),
    sections: [
      section("§15.1–15.2", "타입, 문맥, 판단, 규칙", "Types, contexts, judgments, and rules", "Γ ⊢ e : τ는 문맥 Γ가 자유 변수 타입을 가정할 때 e가 τ형이라는 유도 가능한 주장이다. 변수·함수·적용·곱·합 규칙이 syntax structure를 따른다.", "Γ ⊢ e : τ is a derivable claim that e has type τ under assumptions Γ for free variables. Rules for variables, functions, application, products, and sums follow syntax structure."),
      section("§15.3", "명시적 타입 표기", "Explicit typing", "람다 매개변수와 재귀 지점에 타입을 기록하면 타입 검사 규칙의 선택이 syntax에 드러난다. 암시적 추론과 달리 유도 탐색의 모호성이 줄어든다.", "Annotating lambda parameters and recursive points exposes typing choices in syntax and reduces ambiguity compared with implicit inference."),
      section("§15.4", "외재적 타입 의미", "Extrinsic meaning of types", "먼저 존재하는 비타입 언어의 항 중 안전하게 행동하는 항을 타입별로 분류한다. 보존과 진행 성질은 잘 타입된 닫힌 항이 타입 오류에 걸리지 않음을 뒷받침한다.", "Classifies safe terms inside an already existing untyped language. Preservation and progress support the claim that closed well-typed terms do not encounter type errors."),
      section("§15.5", "내재적 관점", "Intrinsic view", "타입 유도 자체를 프로그램 syntax의 일부로 보아 잘 타입된 항만 언어에 존재하게 한다. 같은 표면 항도 서로 다른 유도에 따라 다른 내재 객체가 될 수 있다.", "Treats typing derivations as part of program syntax so only well-typed terms inhabit the language. One surface term may correspond to different intrinsic objects through different derivations."),
      section("§15.6", "집합론적 해석", "Set-theoretic semantics", "각 타입을 값 집합으로, 함수 타입을 적절한 함수 집합으로 해석하고 타입 규칙이 의미 포함을 보존함을 확인한다.", "Interprets each type as a set of values and function types as suitable function sets, checking that typing rules preserve membership."),
      section("§15.7", "재귀 타입", "Recursive types", "목록·트리처럼 자기 자신을 참조하는 타입을 타입 방정식의 해로 정의한다. fold/unfold의 명시 여부와 양·음의 위치가 건전한 해 구성에 영향을 준다.", "Defines lists and trees as solutions of recursive type equations. Explicit fold/unfold and positive versus negative occurrences affect sound construction."),
    ],
    takeaways: [
      b("타입은 실행 전에 프로그램의 가능한 사용을 제한하는 정적 증명 체계다.", "A type system is a static proof system restricting how programs may be used before execution."),
      b("타입 건전성은 ‘잘 타입되면 원하는 모든 결과가 맞다’가 아니라 특정 오류가 배제된다는 주장이다.", "Type soundness excludes specified errors; it does not claim every well-typed result is otherwise correct."),
      b("외재적·내재적 의미는 타입과 항 중 무엇을 먼저 두는지 다르다.", "Extrinsic and intrinsic accounts differ in whether untyped terms or typed constructions come first."),
    ],
    cautions: [
      b("타입 검사 가능성과 타입 추론 가능성을 같은 문제로 보지 않는다.", "Do not equate type checking with type inference."),
      b("진행은 반드시 종료한다는 뜻이 아니라 다음 단계 또는 값이라는 뜻이다.", "Progress does not mean termination; it means a term is a value or can step."),
    ],
  },
  "subtypes-intersection-types": {
    purpose: b("타입을 정확히 같아야 하는 분류에서 안전한 대체 관계로 확장하고, 교차 타입으로 한 값의 여러 사용 능력을 표현한다.", "Extends typing from exact classification to safe substitutability and uses intersection types to describe multiple capabilities of one value."),
    sections: [
      section("§16.1", "서브타이핑 규칙과 변성", "Subtyping rules and variance", "τ <: υ는 τ 값을 υ가 필요한 곳에 쓸 수 있다는 관계다. 함수 매개변수는 반공변, 결과는 공변이며 추이성과 반사성이 유도를 구성한다.", "τ <: υ means a τ-value may be used where υ is expected. Function parameters are contravariant and results covariant; reflexivity and transitivity compose derivations."),
      section("§16.2", "이름 있는 곱과 합", "Named products and sums", "레코드는 더 많은 필드를 가진 값의 폭 서브타이핑과 필드 타입의 깊이 서브타이핑을 제공한다. variant는 허용 태그 방향이 레코드와 반대다.", "Records support width subtyping from extra fields and depth subtyping in field types. Variant subtyping reverses the relevant direction because it controls possible tags."),
      section("§16.3", "교차 타입", "Intersection types", "τ ∧ υ는 동일한 값이 두 타입의 요구를 모두 만족함을 나타낸다. 오버로딩과 사용별 세분화를 표현하지만 단순 집합 교집합 이상의 유도 구조가 필요할 수 있다.", "τ ∧ υ states that the same value satisfies both type requirements. It expresses overload-like capabilities and usage refinement, with derivational structure beyond a bare set intersection."),
      section("§16.4–16.5", "외재 의미와 제네릭 연산", "Extrinsic semantics and generic operations", "서브타입을 의미 집합 포함으로 읽고, 여러 타입 사례를 가진 연산을 교차 타입으로 부여한다. 적용 가능한 사례 선택이 일관된 결과를 내야 한다.", "Reads subtyping as inclusion of semantic value sets and gives intersection types to operations with several type cases. Overlapping applicable cases must yield coherent behavior."),
      section("§16.6", "내재 의미와 강제 변환의 일관성", "Intrinsic semantics and coercion coherence", "서브타이핑 유도를 명시적 강제 함수로 해석하면 같은 τ <: υ에 여러 유도 경로가 생긴다. 모든 경로가 관찰상 같은 변환을 해야 의미가 유도 선택에 의존하지 않는다.", "Interpreting subtype derivations as coercions creates multiple paths for the same τ <: υ. Coherence requires all paths to be observationally equivalent."),
    ],
    takeaways: [
      b("서브타이핑의 의미는 집합 포함보다 ‘문맥에서 안전한 대체’가 우선이다.", "The primary meaning of subtyping is safe contextual replacement, not merely set inclusion."),
      b("함수 입력의 반공변성은 호출자가 제공할 수 있는 인수 범위를 보존한다.", "Contravariance of function inputs preserves the arguments callers are entitled to provide."),
      b("교차 타입은 하나의 항에 동시에 성립하는 여러 정적 관점을 보존한다.", "Intersection types preserve several simultaneous static views of one term."),
    ],
    cautions: [
      b("상속 계층과 서브타이핑을 자동으로 동일시하지 않는다.", "Do not automatically identify inheritance with subtyping."),
      b("레코드와 variant의 폭 서브타이핑 방향을 반대로 기억하지 않도록 대체 상황을 직접 확인한다.", "Derive width-subtyping directions for records and variants from substitutability rather than memorizing them."),
    ],
  },
  polymorphism: {
    purpose: b("타입을 매개변수로 추상화하는 System F식 다형성을 정의하고, 하나의 프로그램이 여러 타입에서 균일하게 작동하는 방식을 설명한다.", "Defines System F-style abstraction over types and explains how one program acts uniformly at many types."),
    sections: [
      section("§17.1", "타입 추상화와 적용 규칙", "Type abstraction and application", "Λα.e는 타입 α에 대해 일반화된 항이고 e[τ]는 이를 특정 타입에 인스턴스화한다. 전칭 타입 ∀α.τ의 도입 규칙은 α가 값 문맥 가정에 의존하지 않는다는 신선성 조건을 요구한다.", "Λα.e generalizes a term over type α, while e[τ] instantiates it. Introduction of ∀α.τ requires a freshness condition so α does not depend on value-context assumptions."),
      section("§17.2", "다형적 프로그래밍과 데이터 인코딩", "Polymorphic programming and data encodings", "다형 항등 함수, 조합자, 목록 연산을 한 정의로 여러 원소 타입에 사용한다. 불리언·쌍·목록 같은 추상 자료를 다형 함수의 사용 규약으로 인코딩할 수도 있다.", "One definition of identity, combinators, and list operations works at many element types. Booleans, pairs, and lists can also be encoded by the polymorphic ways clients may consume them."),
      section("§17.3", "외재적 의미와 비술어성", "Extrinsic semantics and impredicativity", "전칭 타입의 값은 모든 타입 인스턴스에서 요구를 만족해야 한다. 타입이 자기 자신을 포함한 넓은 타입 우주를 양화하는 비술어성은 단순 집합론 해석을 어렵게 만든다.", "A universal value must satisfy its specification at every type instance. Impredicative quantification over a universe containing the quantified type itself complicates naive set-theoretic semantics."),
    ],
    takeaways: [
      b("매개변수 다형성은 타입별 분기 없이 균일한 구현을 재사용한다.", "Parametric polymorphism reuses one uniform implementation without type-specific branching."),
      b("∀ 도입과 제거는 값 수준 함수의 λ 추상화와 적용에 대응하는 타입 수준 구조다.", "Universal introduction and elimination are type-level analogues of value-level lambda abstraction and application."),
      b("다형 타입 자체가 프로그램 행동에 강한 제약을 준다.", "A polymorphic type alone places strong constraints on program behavior."),
    ],
    cautions: [
      b("매개변수 다형성과 서브타입 다형성·오버로딩을 구분한다.", "Distinguish parametric polymorphism from subtype polymorphism and overloading."),
      b("일반화할 타입 변수가 환경 가정에 자유롭게 나타나면 건전하지 않다.", "Generalizing a type variable that occurs free in assumptions is unsound."),
    ],
  },
  "module-specification": {
    purpose: b("추상 타입과 실존 타입으로 구현 표현을 숨기고, 공개 연산만을 통해 서로 다른 구현이 같은 모듈 명세를 만족하게 한다.", "Uses abstract and existential types to hide representations so different implementations can satisfy the same module specification through public operations alone."),
    sections: [
      section("§18.1", "타입 정의와 불투명 경계", "Type definitions and opaque boundaries", "투명 타입 정의는 새 이름과 표현 타입의 동등성을 공개하지만 불투명 정의는 구현 안에서만 그 관계를 허용한다. 클라이언트는 내보낸 연산으로만 값을 만들고 관찰한다.", "Transparent definitions expose equality between a new name and its representation; opaque definitions permit that knowledge only inside the implementation. Clients construct and observe values only through exports."),
      section("§18.2", "실존 패키지와 모듈", "Existential packages and modules", "∃α.T는 어떤 표현 타입 α와 그 위의 T 구현이 존재함을 말하되 α를 숨긴다. pack은 구현을 봉인하고 unpack은 신선한 추상 타입으로 열며 표현이 범위 밖으로 새지 못하게 한다.", "∃α.T states that some representation α and implementation of T exist while hiding α. Pack seals the implementation; unpack opens it under a fresh abstract name that may not escape."),
      section("§18.3", "추상화 위에 추상화 구현", "Implementing abstractions from abstractions", "기존 모듈의 공개 연산만 이용해 새 자료 추상화를 구현하고, 두 표현 사이의 추상 관계가 모든 연산에서 보존됨을 보인다. 타입 일치와 행동 명세 충족을 분리한다.", "Builds one data abstraction using only another module’s public operations and proves an abstraction relation is preserved by every operation. Type matching is separated from behavioral specification."),
    ],
    takeaways: [
      b("모듈은 값 묶음뿐 아니라 숨겨진 표현 타입과 그 연산의 패키지다.", "A module packages a hidden representation type together with its operations, not merely a record of values."),
      b("표현 독립성은 인터페이스를 지키는 모든 클라이언트가 구현 차이를 관찰하지 못한다는 성질이다.", "Representation independence means no interface-respecting client can observe the implementation choice."),
      b("실존 타입은 정보 은닉을 정적 범위 규칙으로 강제한다.", "Existential types enforce information hiding through static scope rules."),
    ],
    cautions: [
      b("unpack된 추상 타입이나 그에 의존하는 값을 허용 범위 밖으로 유출하지 않는다.", "Do not let an unpacked abstract type or values depending on it escape their permitted scope."),
      b("같은 함수 타입을 가진 구현들이 반드시 같은 추상 법칙을 만족하는 것은 아니다.", "Implementations with the same function types do not necessarily satisfy the same abstraction laws."),
    ],
  },
  "algol-like-languages": {
    purpose: b("함수형 추상화와 지역 가변 상태를 구절 타입 및 스택 수명 규율 아래 결합해 Algol식 언어의 의미와 구현 원리를 설명한다.", "Combines functional abstraction with local mutable state under phrase types and stack lifetimes to explain Algol-like meaning and implementation."),
    sections: [
      section("§19.1–19.2", "데이터 타입과 구절 타입", "Data types and phrase types", "데이터 타입은 저장되는 값의 종류를, 구절 타입은 표현식·수용자·변수·명령·프로시저처럼 계산이 제공하는 능력을 분류한다. 타입 규칙은 읽기와 쓰기를 분리한다.", "Data types classify stored values; phrase types classify capabilities such as expressions, acceptors, variables, commands, and procedures. Typing separates reading from writing."),
      section("§19.3", "매개변수 전달과 예제", "Parameter passing and examples", "값·이름·프로시저 매개변수를 구절 타입으로 비교한다. 실제 인수를 값이 아니라 계산 구절로 전달하면 재평가와 부작용이 호출 문맥에 남는다.", "Compares value, name, and procedure parameters through phrase types. Passing an actual argument as a computation rather than a value preserves re-evaluation and effects in the calling context."),
      section("§19.4", "배열과 선언자", "Arrays and declarators", "배열은 인덱스에서 변수 구절로 가는 값으로, 선언자는 신선한 지역 저장을 본문에 제공하는 고차 구절로 본다. 범위 종료 시 위치 수명도 끝나야 한다.", "Arrays map indices to variable phrases; declarators are higher-order phrases supplying fresh local storage to a body. Location lifetime must end with scope."),
      section("§19.5", "스택 규율을 내장한 의미", "Semantics enforcing stack discipline", "지역 위치가 결과나 장수 클로저를 통해 탈출하지 못하도록 의미 범주를 제한한다. 중첩 선언의 할당과 해제가 후입선출이 됨을 의미 수준에서 정당화한다.", "Semantic categories prevent local locations from escaping through results or longer-lived closures, justifying last-in-first-out allocation and deallocation for nested declarations."),
      section("§19.6–19.7", "변수와 프로시저 의미", "Meaning of variables and procedures", "변수는 읽는 expression과 쓰는 acceptor의 쌍으로, 프로시저는 인수 구절을 받아 결과 구절을 만드는 고차 의미로 해석한다. 별칭과 호출 방식이 이 구조에서 드러난다.", "Variables pair a readable expression with a writable acceptor; procedures are higher-order meanings from argument phrases to result phrases. Aliasing and calling modes become explicit."),
      section("§19.8", "확장과 단순화의 대가", "Tradeoffs in extensions and simplifications", "재귀 프로시저, 복합 데이터, 매개변수 방식 같은 확장을 넣을 때 구절 타입, 수명, 평가 규칙 중 무엇이 바뀌는지 추적한다. 단순화는 표현력이나 안전 보장을 줄일 수 있다.", "Tracks which phrase types, lifetimes, and evaluation rules change when adding recursion, richer data, or parameter modes. Simplification can reduce expressiveness or safety guarantees."),
    ],
    takeaways: [
      b("구절 타입은 값의 종류보다 프로그램 조각이 제공하는 사용 능력을 분류한다.", "Phrase types classify the capabilities offered by program fragments rather than only kinds of values."),
      b("스택 할당의 정당성은 지역 참조가 범위를 탈출하지 않는다는 의미·타입 성질에 달려 있다.", "Justifying stack allocation depends on a semantic or typing guarantee that local references do not escape."),
      b("Algol식 결합은 함수와 상태의 단순 이론을 함께 놓을 때 생기는 긴장을 드러낸다.", "The Algol-like combination exposes tensions that arise when the simple theories of functions and state meet."),
    ],
    cautions: [
      b("variable을 단순 위치와 동일시하지 않는다. 읽기와 쓰기 능력의 쌍으로 본다.", "Do not identify a variable with a bare location; treat it as paired read and write capabilities."),
      b("call-by-name 매개변수는 값이 아니므로 사용 횟수만큼 실제 인수가 다시 계산될 수 있다.", "A call-by-name parameter is not a value, so its actual argument may be recomputed at each use."),
    ],
  },
  "mathematical-background": {
    purpose: b("책의 의미 함수, 전이 관계, 도메인 구성에 반복 사용되는 집합·관계·함수·곱·분리합 표기를 준비한다.", "Prepares the set, relation, function, product, and disjoint-union notation repeatedly used in semantic functions, transition relations, and domain constructions."),
    sections: [
      section("§A.1", "집합과 멱집합", "Sets and powersets", "원소, 부분집합, 합집합, 교집합, 차집합, 멱집합을 정의한다. syntax category·상태 공간·가능 결과 집합을 읽는 기본 표기다.", "Defines membership, subset, union, intersection, difference, and powerset—the base notation for syntax categories, state spaces, and sets of outcomes."),
      section("§A.2, A.6", "관계, 합성, 폐쇄", "Relations, composition, and closure", "이항 관계의 역·합성·거듭제곱과 반사·대칭·추이 성질을 다룬다. 반사-추이 폐쇄는 0회 이상의 실행 단계를 표현한다.", "Covers converse, composition, powers of binary relations, and reflexive, symmetric, and transitive properties. Reflexive-transitive closure represents zero or more execution steps."),
      section("§A.3–A.4", "전체·부분 함수와 함수 연산", "Total and partial functions", "함수를 특별한 관계로 보고 정의역·치역·합성·제한·갱신을 정의한다. 부분 함수는 비종료나 정의되지 않은 연산의 첫 모델이 된다.", "Treats functions as special relations and defines domain, range, composition, restriction, and update. Partial functions provide the first model of divergence or undefined operations."),
      section("§A.5", "곱과 분리합", "Products and disjoint unions", "곱은 여러 성분이 함께 존재함을, 분리합은 태그가 붙은 대안 중 하나임을 표현한다. 구성·환경에는 곱이, 정상·오류 결과에는 분리합이 반복 사용된다.", "Products express simultaneous components; disjoint unions express one tagged alternative. Products recur in configurations and environments, sums in normal-versus-error results."),
    ],
    takeaways: [
      b("semantics 표기는 대부분 집합 사이의 함수와 관계를 정밀하게 조합한 것이다.", "Most semantic notation precisely combines functions and relations between sets."),
      b("부분 함수와 관계는 각각 결정적 계산과 여러 가능한 계산의 자연스러운 모델이다.", "Partial functions and relations naturally model deterministic and multiply possible computations, respectively."),
      b("곱과 합의 차이는 ‘모두 있음’과 ‘경우 중 하나’를 구분한다.", "The difference between products and sums is the difference between ‘all components’ and ‘one of several cases.’"),
    ],
    cautions: [
      b("x ∈ S와 X ⊆ S, 함수 적용과 관계 합성을 표기상 구분한다.", "Keep membership versus subset, and function application versus relation composition, notationally distinct."),
      b("분리합의 태그를 생략하면 겹치는 집합의 원소가 어느 경우에서 왔는지 잃는다.", "Without tags in a disjoint union, an element shared by both sets loses its originating case."),
    ],
  },
};
