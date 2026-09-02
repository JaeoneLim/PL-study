import { b, type Bilingual } from "./types";
import type {
  ChapterLongform,
  LessonCalloutBlock,
  LessonExampleBlock,
  LessonListBlock,
  LessonNotationBlock,
  LessonProseBlock,
} from "./longform-types";

const englishHeading = (title: Bilingual): Bilingual => b(title.en, title.en);
const prose = (...paragraphs: Bilingual[]): LessonProseBlock => ({ kind: "prose", paragraphs });
const list = (title: Bilingual | undefined, ...items: Bilingual[]): LessonListBlock => ({
  kind: "list",
  title: title ? englishHeading(title) : undefined,
  items,
});
const notation = (title: Bilingual, source: string, explanation: Bilingual, latex?: string): LessonNotationBlock => ({
  kind: "notation",
  title: englishHeading(title),
  notation: source,
  latex,
  explanation,
});
const example = (
  title: Bilingual,
  setup: Bilingual,
  steps: Bilingual[],
  conclusion: Bilingual,
): LessonExampleBlock => ({ kind: "example", title: englishHeading(title), setup, steps, conclusion });
const callout = (
  tone: LessonCalloutBlock["tone"],
  title: Bilingual,
  ...paragraphs: Bilingual[]
): LessonCalloutBlock => ({ kind: "callout", tone, title: englishHeading(title), paragraphs });

export const programSpecificationsLongform: ChapterLongform = {
  slug: "program-specifications",
  readingMinutes: 93,
  minimumKoreanCharacters: 12000,
  title: b("Chapter 3 complete study text", "Chapter 3 complete study text"),
  introduction: [
    b(
      "Chapter 2는 command를 initial state에서 final state 또는 bottom으로 보내는 state transformer (상태 변환 함수)로 정의했다. Chapter 3의 질문은 한 단계 다르다. 특정 command의 denotation 전체를 다시 계산하지 않고도, 사용자가 요구한 input-output contract (입출력 계약)를 만족한다고 어떻게 증명할 수 있는가? 이 장은 Predicate Logic의 assertion을 precondition (사전조건)과 postcondition (사후조건)으로 배치하고, command의 syntax를 따라가는 inference rule (추론 규칙)로 그 계약을 증명한다.",
      "Chapter 2 defined a command as a state transformer from an initial state to either a final state or bottom. Chapter 3 asks a different question: how can we prove that a command meets a required input-output contract without recalculating its entire denotation? Predicate-logic assertions become preconditions and postconditions, and inference rules follow command syntax to prove the contract."
    ),
    b(
      "교재는 partial correctness specification (부분 정확성 명세) `{p} c {q}`와 total correctness specification (전체 정확성 명세) `[p] c [q]`를 구분한다. braces `{ }`는 `c`가 terminate한다면 결과가 `q`를 만족한다는 조건부 약속이다. brackets `[ ]`는 같은 postcondition뿐 아니라 모든 `p`-state에서 termination도 약속한다. 두 표기는 장식이 아니라 nontermination을 계약에 포함할지 결정하는 서로 다른 semantic judgment다.",
      "The textbook distinguishes the partial-correctness specification `{p} c {q}` from the total-correctness specification `[p] c [q]`. Braces promise the postcondition only if the command terminates; brackets additionally promise termination from every precondition state. The delimiters therefore mark different semantic judgments, not typographic variants."
    ),
    b(
      "증명은 program text를 무시한 자유로운 수학 논증이 아니다. assignment에는 substitution, sequential composition에는 intermediate assertion, `while`에는 loop invariant와 loop variant가 대응한다. 대부분의 proof skeleton은 syntax가 결정하지만, intermediate assertion과 invariant를 발견하고 남은 implication을 Predicate Logic으로 증명하는 일에는 사람이 이해한 algorithmic idea가 필요하다. formal proof는 그 아이디어를 machine-checkable한 작은 step으로 정제한다.",
      "A proof is not an unconstrained mathematical argument that ignores program text. Assignment corresponds to substitution, sequential composition to an intermediate assertion, and while to an invariant and a variant. Syntax fixes most of the proof skeleton, while discovering annotations and proving the remaining implications still require the programmer's algorithmic idea. A formal proof refines that idea into mechanically checkable steps."
    ),
    b(
      "본문은 교재의 §3.1–§3.8 순서를 그대로 따른다. 먼저 specification의 syntax와 semantics을 분리하고, inference rule과 derivation을 정의한 뒤, assignment·sequencing·while·나머지 constructor 순으로 rule을 쌓는다. 그 다음 Computing Fibonacci Numbers와 Fast Exponentiation을 통해 invariant discovery를 실제로 수행하고, 마지막에 formal proof가 specification의 누락이나 assertion language의 표현력 부족을 자동으로 고쳐 주지는 않는다는 한계를 검토한다.",
      "The lesson preserves the textbook's §3.1–§3.8 order: specification syntax and semantics, inference and derivation, rules for assignment and sequencing, rules for while, further rules, two complete algorithmic examples, and finally the limitations of the method."
    ),
    b(
      "§3.1과 §3.2를 먼저 분리하는 이유는 truth와 proof를 섞지 않기 위해서다. specification semantics은 어떤 contract가 실제 command denotation에 대해 true인지 정한다. inference calculus는 그 truth를 finite symbolic steps로 establish하는 방법을 제공한다. soundness theorem이 있어야 proof step에서 semantic conclusion으로 안전하게 이동할 수 있다.",
      "Sections 3.1 and 3.2 separate truth from proof: semantics defines validity, the calculus constructs derivations, and soundness connects them."
    ),
    b(
      "§3.3–§3.5의 순서는 command constructor의 복잡도를 따른다. assignment는 한 state update, sequence는 두 transformer의 연결, while은 arbitrary iteration, conditional과 declaration은 guard와 binding side condition을 추가한다. 각 rule을 isolated formula로 외우기보다 Chapter 2 semantic equation의 proof-oriented interface로 읽는다.",
      "Sections 3.3–3.5 progress from one update through composition and iteration to guards and binding; each rule is a proof-oriented interface to a Chapter 2 semantic equation."
    ),
    b(
      "§3.6과 §3.7은 이미 주어진 invariant를 대입하는 연습만이 아니다. final mathematical goal을 moving program state에 맞게 generalize하고, body data dependency가 요구하는 auxiliary relation을 발견하며, exit condition에서 goal이 다시 나타나도록 설계하는 과정을 보여 준다. proof calculation과 algorithm understanding이 만나는 지점이다.",
      "Sections 3.6 and 3.7 emphasize invariant discovery: generalize the final goal, add relations demanded by the body, and arrange for the goal to reappear at exit."
    ),
    b(
      "§3.8은 앞의 proof를 무효화하는 appendix가 아니라 scope를 정확히 닫는 절이다. calculus가 sound해도 contract가 intent를 빠뜨릴 수 있고, assertion language가 needed relation을 표현하지 못할 수 있으며, mathematical model이 deployed system의 behavior를 생략할 수 있다. 무엇을 증명했는지와 무엇을 증명하지 않았는지를 함께 말해야 formal result가 신뢰할 만하다.",
      "Section 3.8 closes the scope precisely: sound rules do not ensure an adequate contract, expressive assertions, or a faithful deployment model."
    ),
    b(
      "수식을 읽을 때 `p,q,i`는 assertion, `b`는 executable Boolean expression, `c`는 command, `e`는 integer expression, `σ`는 state, `v₀`는 fresh logical variable이라는 sort를 계속 표시한다. 같은 글자가 value와 phrase를 오가도록 읽으면 substitution과 semantic evaluation을 혼동하게 된다. notation box의 양변 type을 먼저 확인하는 습관을 유지한다.",
      "Track phrase sorts throughout: assertions, guards, commands, expressions, states, and fresh logical variables play distinct roles. Type-check notation before manipulating it."
    ),
    b(
      "한국어 설명에서도 canonical English term을 primary label로 유지한다. partial correctness, total correctness, intermediate assertion, loop invariant, loop variant, ghost variable, verification condition은 서로 교체 가능한 번역 표현이 아니라 proof의 다른 위치와 obligation을 가리킨다. 괄호 안 한국어 gloss는 이해를 돕지만 rule name과 source literature를 추적하는 기준은 English term이다.",
      "Canonical English terms remain primary because each names a distinct proof position and obligation; Korean glosses aid understanding without replacing those identifiers."
    ),
    b(
      "각 절의 checkpoint는 정의 암기보다 연결 설명을 요구한다. 답할 때는 rule 기호만 쓰지 말고 어떤 state를 가정하는지, command가 그 state를 어떻게 바꾸는지, 어떤 assertion이 boundary를 설명하는지, termination이 별도 obligation인지까지 문장으로 풀어 쓴다. 이 습관이 proof diagram을 실제 program reasoning으로 바꾼다. 특히 계산 결과와 그 결과를 정당화한 rule 또는 arithmetic lemma를 항상 나란히 기록하고, 숨은 가정이 없는지도 끝까지 꼭 다시 확인한다.",
      "The checkpoints ask for connections rather than symbol recall: identify the states, transformations, boundary assertions, and separate termination obligations in words."
    ),
  ],
  sections: [
    {
      id: "section-3-1",
      covers: "§3.1 · pp. 55–57",
      minutes: 10,
      title: b("3.1 Syntax and Semantics of Specifications", "3.1 Syntax and Semantics of Specifications"),
      lead: b(
        "braces와 brackets를 별개의 specification constructor로 정의하고, Chapter 2의 bottom을 이용해 partial correctness와 total correctness의 차이를 정확히 쓴다.",
        "Define braces and brackets as different specification constructors, then use Chapter 2 bottom to state the precise difference between partial and total correctness."
      ),
      blocks: [
        callout(
          "key",
          b("The Chapter 3 vocabulary pipeline", "The Chapter 3 vocabulary pipeline"),
          b(
            "assertion은 state의 집합을 기술한다. assertion `p`를 command 앞에 두면 precondition, `q`를 뒤에 두면 postcondition이 된다. 둘과 command를 묶은 것이 specification이다. specification이 denotational semantics에서 true이면 semantically valid (의미적으로 타당)하고, inference rule로 finite derivation을 만들 수 있으면 derivable (유도 가능)하다. soundness는 `derivable ⇒ valid`를 보장하는 metatheorem이며 두 단어를 같은 definition으로 만들지 않는다.",
            "An assertion describes a set of states. Before a command it is a precondition; after the command it is a postcondition. Together they form a specification. A specification may be semantically valid or syntactically derivable. Soundness is the metatheorem derivable implies valid; it does not identify the two notions."
          ),
          b(
            "partial correctness는 terminating behavior의 safety를 제한하고 total correctness는 여기에 termination을 더한다. assignment와 sequencing은 backward reasoning으로 precondition을 계산한다. while에서는 loop invariant가 모든 finite iteration의 safety를 연결하고, loop variant가 well-founded order에서 감소해 infinite iteration을 배제한다. 마지막에는 verification condition이 남는데, 이것은 command가 아니라 Predicate Logic으로 증명할 pure assertion implication이다.",
            "Partial correctness constrains safe terminating behavior; total correctness adds termination. Assignment and sequencing reason backward. A loop invariant connects all finite iterations, while a loop variant decreases in a well-founded order to exclude infinite iteration. What remains is a verification condition: a pure assertion implication rather than a command."
          )
        ),
        prose(
          b(
            "specification의 abstract syntax은 두 form을 가진다. `{p} c {q}`는 partial correctness specification이고 `[p] c [q]`는 total correctness specification이다. 여기서 `p,q`는 Chapter 1의 assertion, `c`는 Chapter 2의 command다. 따라서 Chapter 3은 새 data language를 만드는 장이 아니라 앞의 두 language를 judgment level에서 연결하는 장이다. `p`와 `q` 안의 variable은 각각 initial state와 final state에서 평가되므로, input value를 결과에서도 기억해야 한다면 변하지 않는 auxiliary variable을 사용해야 한다.",
            "Specification syntax has two forms. `{p} c {q}` is partial correctness and `[p] c [q]` is total correctness. Assertions come from Chapter 1 and commands from Chapter 2, so Chapter 3 connects the prior languages at the judgment level. Variables in pre- and postconditions are evaluated in their respective states; an auxiliary variable is needed to remember an input value."
          ),
          b(
            "예를 들어 `{x=m} x:=x+1 {x=m+1}`은 initial `x`를 바꾸지 않는 logical variable `m`으로 기억한다. 반면 `{true} x:=x+1 {x=x+1}`은 postcondition의 양쪽 `x`가 모두 final state에서 같은 값을 읽으므로 false다. specification은 자연어 의도를 자동으로 알아내지 않는다. 어떤 값이 old value인지, 어떤 variable을 보존해야 하는지 contract 안에 명시해야 한다.",
            "For example, `{x=m} x:=x+1 {x=m+1}` remembers the initial value using an unchanged logical variable `m`. By contrast, `{true} x:=x+1 {x=x+1}` compares the same final value on both sides and is false. A formal specification does not infer the intended old values; the contract must state them."
          )
        ),
        prose(
          b(
            "precondition과 postcondition은 command가 실행되는 동안 계속 검사되는 runtime assertion이 아니다. specification semantics은 initial state와, terminate한 경우의 final state 사이 relation을 외부에서 기술한다. 따라서 중간 state가 postcondition을 잠시 위반해도 final state에서 회복하면 contract에는 문제가 없다. 반대로 execution trace 하나가 성공했다고 universal specification이 증명되지는 않는다. semantic clause의 universal quantifier는 p를 만족하는 모든 initial state를 대상으로 한다.",
            "Preconditions and postconditions are not runtime assertions checked continuously. They externally relate initial and final states. Intermediate states may violate the postcondition, and one successful trace does not prove the universally quantified specification."
          ),
          b(
            "partial correctness의 vacuity를 이해하려면 implication과 disjunction을 그대로 읽어야 한다. p가 false인 state는 contract 대상이 아니고, p가 true여도 command result가 bottom이면 `{p}c{q}`의 `bottom or q`가 참이다. 이것은 logic의 defect가 아니라 contract가 termination을 의도적으로 약속하지 않은 결과다. 종료가 요구사항이면 braces를 유지한 채 자연어로 덧붙이지 말고 total form을 사용하거나 별도의 termination property를 명시해야 한다.",
            "The apparent vacuity of partial correctness follows directly from implication and disjunction. States outside p are irrelevant, and bottom satisfies the partial clause. This is not a logical defect; termination must be stated as a separate or total-correctness requirement."
          ),
          b(
            "total correctness는 partial correctness보다 stronger한 claim이다. `[p]c[q]`가 valid하면 같은 p,c,q의 `{p}c{q}`도 valid하지만 converse는 성립하지 않는다. 또한 precondition을 stronger하게 만들면 termination proof도 쉬워질 수 있다. 앞의 x-increment loop에서 `true`를 `x≤10`으로 strengthen하면 diverging inputs를 contract 밖으로 제외하므로 total specification이 valid해진다. 이때 프로그램을 고친 것이 아니라 admissible input contract를 좁힌 것이다.",
            "Total correctness implies the corresponding partial correctness, not conversely. Strengthening a precondition can make termination provable by excluding diverging inputs, which changes the contract rather than the program."
          )
        ),
        notation(
          b("The two semantic clauses", "The two semantic clauses"),
          "[p] c [q]  is valid iff  ∀σ∈Σ. p(σ) ⇒ (⟦c⟧σ ≠ ⊥ ∧ q(⟦c⟧σ))\n{p} c {q}  is valid iff  ∀σ∈Σ. p(σ) ⇒ (⟦c⟧σ = ⊥ ∨ q(⟦c⟧σ))",
          b(
            "total clause는 result가 bottom이 아니라고 먼저 요구한 뒤 final state에서 `q`를 검사한다. partial clause는 result가 bottom이면 참이고, normal state이면 `q`를 요구한다. 이 disjunction 때문에 diverging command가 매우 강한 partial postcondition도 vacuously satisfy할 수 있다.",
            "The total clause first excludes bottom, then checks q in the final state. The partial clause is true on bottom and requires q only on normal termination, so a diverging command may satisfy even a very strong partial postcondition vacuously."
          ),
          "\\begin{aligned}\\models [p]\\,c\\,[q] &\\iff \\forall \\sigma\\in\\Sigma.\\; p(\\sigma)\\Rightarrow(\\llbracket c\\rrbracket\\sigma\\neq\\bot\\land q(\\llbracket c\\rrbracket\\sigma))\\\\\\models \\{p\\}\\,c\\,\\{q\\} &\\iff \\forall \\sigma\\in\\Sigma.\\; p(\\sigma)\\Rightarrow(\\llbracket c\\rrbracket\\sigma=\\bot\\lor q(\\llbracket c\\rrbracket\\sigma))\\end{aligned}"
        ),
        example(
          b("Separating result correctness from termination", "Separating result correctness from termination"),
          b("`while x ≠ 10 do x:=x+1`을 세 precondition에서 비교한다.", "Compare `while x ≠ 10 do x:=x+1` under three preconditions."),
          [
            b("`x≤10`이면 매 iteration에서 x가 1 증가하고 유한 번 뒤 10에 도달한다. 따라서 `{x≤10} c {x=10}`과 `[x≤10] c [x=10]` 모두 valid다.", "From x≤10, each iteration increments x and finitely reaches 10. Both the partial and total specifications are valid."),
            b("`true`에서 시작하면 x>10인 state도 허용한다. 그런 state에서는 x가 계속 커져 10에 도달하지 않으므로 `[true] c [x=10]`은 invalid다.", "The precondition true includes states with x>10. From them x keeps growing and never reaches 10, so the total specification is invalid."),
            b("그러나 `{true} c {x=10}`은 valid다. x>10인 실행은 bottom이므로 partial clause의 첫 disjunct가 참이고, 종료하는 실행은 반드시 guard가 false인 x=10에서 끝난다.", "Yet the partial specification is valid: runs from x>10 yield bottom, while every terminating run exits exactly when x=10.")
          ],
          b("postcondition이 맞는가와 프로그램이 끝나는가는 독립된 proof obligation이다. braces에서 brackets로 바꾸는 순간 termination argument가 추가된다.", "Postcondition correctness and termination are separate obligations. Replacing braces with brackets adds a termination argument.")
        ),
        callout(
          "key",
          b("Reading a specification without guessing", "Reading a specification without guessing"),
          b(
            "specification을 읽을 때는 먼저 delimiter를 확인하고, precondition이 허용하는 initial state set을 그린 뒤, command denotation이 각 state에서 normal result인지 bottom인지 나눈다. normal result에만 postcondition을 적용한다. 이 순서를 거꾸로 하면 `{p}c{q}`를 ‘p가 참이면 c가 끝나고 q가 참’이라고 잘못 읽어 partial form에 termination을 끼워 넣기 쉽다.",
            "Read a specification by checking its delimiters, identifying the precondition states, classifying command results as normal or bottom, and applying the postcondition only where required. This prevents smuggling termination into partial correctness."
          ),
          b(
            "`p=true`는 아무 assumption도 두지 않는 가장 weak한 precondition이고 `p=false`는 어떤 initial state도 허용하지 않는 가장 strong한 precondition이다. 그래서 false precondition의 specification은 command behavior와 무관하게 vacuously valid하다. 반대로 postcondition에서는 true가 가장 weak하고 false가 가장 strong하다. `{true}c{false}`는 c가 어떤 input에서도 normal terminate하지 않을 때에만 partial-valid하다.",
            "True is the weakest precondition and false the strongest; the order reverses for postconditions. A false precondition makes a contract vacuous, while `{true}c{false}` characterizes absence of normal termination in partial correctness."
          ),
          b(
            "old-value logical variable은 state component처럼 command가 update하지 않는다. `{x=X∧y=Y}c{z=X+Y}`에서 uppercase X,Y는 execution 전체에서 같은 mathematical value를 가리킨다. program variable을 단순히 다른 글꼴로 쓴 것이 아니라 quantification 바깥에서 고정된 parameter처럼 사용한다. 이 구분 없이 `z=x+y`만 쓰면 c가 x,y를 바꾸어도 final equality가 성립할 수 있어 original inputs의 sum이라는 intent를 놓친다.",
            "Old-value logical variables remain fixed throughout execution. They act as mathematical parameters, preventing a postcondition from accidentally referring only to modified final program variables."
          ),
          b(
            "deterministic language에서도 specification은 function equality보다 abstraction된 relation이다. q가 final state의 일부 variable만 언급하면 나머지 component는 unconstrained다. 따라서 한 command는 서로 다른 strength의 많은 valid specification을 가진다. proof goal은 denotation 전체를 재구성하는 것이 아니라 chosen observation을 충분히 보장하는 contract 하나를 establish하는 것이다.",
            "Even for deterministic commands, a specification is an abstract relation rather than full function equality. Unmentioned final-state components remain unconstrained, so one command satisfies many contracts of different strengths."
          )
        ),
        list(
          b("Semantic edge cases worth calculating", "Semantic edge cases worth calculating"),
          b("`{false}c{q}`와 `[false]c[q]`는 모두 valid다. universal clause에서 precondition implication의 antecedent가 언제나 false이므로 c의 termination이나 q의 truth를 검사할 initial state가 없다. 이런 vacuity는 inconsistent assumption을 찾는 contract review가 필요한 이유다.", "Both partial and total specifications with precondition false are valid vacuously, because no initial state activates the contract."),
          b("`{p}c{true}`는 모든 command에 대해 partial-valid다. normal result에서는 true가 성립하고 bottom도 허용된다. 그러나 `[p]c[true]`는 p-state에서 termination을 정확히 요구하므로 trivial하지 않다. 같은 postcondition이라도 delimiter가 proof content를 바꾼다.", "A true postcondition makes the partial form trivial, while the total form still exactly demands termination from p-states."),
          b("`{true}c{false}`는 normal termination이 하나라도 있으면 invalid이고 모든 input에서 diverge하면 valid다. `[true]c[false]`는 termination과 impossible final condition을 동시에 요구하므로 어떤 deterministic command도 satisfy할 수 없다. 두 formula는 divergence를 분류하는 useful test다.", "The partial false-postcondition form characterizes total divergence; the corresponding total form is impossible because it requires both termination and a false final assertion."),
          b("`[p]c[q]`가 valid하고 p′가 p를 imply하면 `[p′]c[q]`도 valid다. 반대로 q가 q′를 imply하면 `[p]c[q′]`도 valid다. 이 monotonicity가 뒤의 SP/WC rule의 semantic basis이며 precondition/postcondition strength의 방향을 검산한다.", "Total specifications are monotone under precondition strengthening and postcondition weakening, the semantic basis of SP and WC."),
          b("command denotation이 더 defined해지는 refinement에서는 total correctness와 partial correctness가 서로 다른 variance를 보인다. terminating behavior를 추가하면 total contract에는 도움이 될 수 있지만 새 normal result가 q를 위반하면 partial contract를 깨뜨릴 수 있다. specification form을 implementation refinement와 연결할 때 bottom의 위치를 다시 확인해야 한다.", "Adding defined behavior interacts differently with total and partial contracts; a new terminating result may help termination yet violate a partial postcondition."),
        ),
      ],
      checkpoints: [
        b("`{true} while true do skip {false}`가 valid인 이유를 semantic clause의 어느 disjunct로 설명할 수 있는가?", "Which disjunct of the semantic clause makes `{true} while true do skip {false}` valid?"),
        b("initial `x`를 postcondition에서 참조하려면 왜 별도 logical variable이 필요한가?", "Why is a separate logical variable needed to refer to the initial value of x in a postcondition?"),
      ],
    },
    {
      id: "section-3-2",
      covers: "§3.2 · p. 57",
      minutes: 7,
      title: b("3.2 Inference Rules", "3.2 Inference Rules"),
      lead: b(
        "validity라는 semantic question을 axiom schema와 inference rule의 finite derivation이라는 syntactic question으로 옮긴다.",
        "Move from semantic validity to the syntactic construction of finite derivations from axiom schemata and inference rules."
      ),
      blocks: [
        prose(
          b(
            "inference rule은 zero or more premisses (전제)와 one conclusion (결론)을 가진 schema다. horizontal bar 위의 specification을 모두 이미 derive했고 side condition도 만족하면 아래 conclusion을 derive할 수 있다. premiss가 없는 rule은 axiom schema다. metavariable `p,q,c`는 구체 assertion과 command로 instantiate되며, substitution 같은 syntactic operation은 instance를 만들 때 실제로 수행한다.",
            "An inference rule is a schema with zero or more premisses and one conclusion. Once every premiss above the bar is derived and all side conditions hold, the conclusion below may be derived. A rule with no premiss is an axiom schema. Metavariables are instantiated by concrete assertions and commands, and syntactic operations such as substitution are actually performed."
          ),
          b(
            "derivation은 root가 목표 specification이고 leaf가 axiom 또는 Predicate Logic fact인 finite tree다. 각 internal node는 rule instance 하나다. ‘이 프로그램은 obvious하게 맞다’는 설명은 derivation이 아니다. 반대로 derivation이 길다고 mathematical idea가 깊은 것도 아니다. 대부분의 node는 program syntax가 기계적으로 결정하고, 사람이 제공하는 핵심 정보는 sequence 사이의 assertion과 loop invariant/variant다.",
            "A derivation is a finite tree whose root is the target specification and whose leaves are axioms or predicate-logic facts. Every internal node is a rule instance. Informal obviousness is not a derivation; conversely, length need not mean depth. Program syntax determines most nodes, while intermediate assertions, invariants, and variants carry the creative content."
          )
        ),
        prose(
          b(
            "rule schema와 rule instance를 구분해야 표기 안의 letter를 올바르게 읽을 수 있다. AS에 쓰인 `p`, `v`, `e`는 특정 assertion이나 variable이 아니라 각각 전체 class를 range하는 metavariable이다. 목표 command가 `x:=x+1`이고 postcondition이 `x>0`일 때 비로소 p를 x>0, v를 x, e를 x+1로 instantiate한다. 그 뒤 schema에 적힌 substitution을 실행해 concrete premise 또는 axiom instance를 얻는다.",
            "Distinguish a rule schema from an instance. The letters in AS are metavariables ranging over assertions, variables, and expressions; only a concrete target instantiates them and triggers the indicated substitution."
          ),
          b(
            "derivation을 위에서 아래로 읽으면 premiss가 conclusion을 justify하는 설명이고, proof search를 할 때는 root goal에서 위로 거꾸로 읽어 필요한 subgoal을 생성한다. 예를 들어 outer command가 sequence이면 SQ를 선택해 unknown intermediate assertion을 도입한다. outer command가 while이면 WHP 또는 WHT를 선택해 invariant와 variant obligation을 만든다. 같은 rule diagram이 proof checking에서는 forward, proof construction에서는 backward로 쓰인다.",
            "A rule reads forward when checking that premisses justify a conclusion, but backward during proof search to generate subgoals. Sequence introduces an intermediate assertion; while introduces invariant and variant obligations."
          ),
          b(
            "formal proof가 mechanical하다는 말은 discovery가 mechanical하다는 말이 아니다. annotation을 이미 주면 checker는 finite tree의 각 node가 permitted rule instance인지 검사할 수 있다. 하지만 어떤 q가 sequence를 잘 나누는지, 어떤 i가 loop body에서 보존되는지 찾는 일은 program을 작성할 때의 informal correctness idea를 사용한다. 좋은 도구는 이 creative choice를 요구한 뒤 나머지 substitution과 verification-condition generation을 자동화한다.",
            "Mechanical checking does not imply mechanical discovery. Given annotations, a checker validates each finite rule instance, while finding useful intermediate assertions and invariants still depends on the algorithmic argument."
          )
        ),
        notation(
          b("Validity, derivability, and soundness", "Validity, derivability, and soundness"),
          "⊢ s    means: specification s has a finite derivation\n⊨ s    means: the semantic function maps s to true\nSoundness:  if ⊢ s, then ⊨ s",
          b(
            "`⊢`는 chosen calculus 안에서 proof가 존재한다는 syntactic relation이고 `⊨`는 모든 relevant state에서 semantic clause가 참이라는 relation이다. soundness가 실패하면 규칙이 false specification을 증명할 수 있다. completeness는 반대 방향 `valid ⇒ derivable`이며 별도 property다.",
            "Turnstile is syntactic derivability; double turnstile is semantic validity. Soundness prevents the calculus from proving false specifications. Completeness is the separate converse direction."
          ),
          "\\vdash s\\;\\Rightarrow\\;\\models s\\quad\\text{(soundness)}\\qquad\\models s\\;\\Rightarrow\\;\\vdash s\\quad\\text{(completeness question)}"
        ),
        callout(
          "warning",
          b("A formal proof cannot repair the wrong contract", "A formal proof cannot repair the wrong contract"),
          b(
            "`[true] c [y=max(x,y)]`를 prove해도 command가 initial `x,y`의 maximum을 `y`에 저장했다는 뜻은 아니다. postcondition의 `x,y`는 final values이므로 `x`를 함께 바꾸는 엉뚱한 command도 통과할 수 있다. proof checker는 specification에 쓰지 않은 intent를 검사하지 않는다. old values와 preserved variables를 assertion에 포함하는 specification review가 derivation보다 먼저다.",
            "Proving `[true] c [y=max(x,y)]` does not show that y contains the maximum of the initial x and y: both names denote final values, and an unintended command that changes x may pass. A checker cannot verify intent omitted from the contract."
          )
        ),
        prose(
          b(
            "proof tree의 leaf에는 두 종류가 나타난다. AS나 SK처럼 premiss가 없는 program axiom instance가 있고, SP/WC 또는 invariant preservation에서 나온 pure Predicate Logic assertion이 있다. 후자는 Chapter 1 calculus나 trusted arithmetic solver로 discharge한다. program rule과 assertion rule을 같은 label 없이 섞으면 어느 semantics에 대한 soundness theorem을 사용했는지 추적하기 어려우므로 proof record에서 origin을 구분한다.",
            "Proof leaves are either program axiom instances or pure predicate-logic facts. Keeping their origins distinct clarifies which soundness result justifies each step."
          ),
          b(
            "rule의 side condition도 premiss만큼 checkable한 proof data다. fresh variable condition, free-variable condition, assigned-variable disjointness를 자연어 주석으로만 남기면 alpha-renaming이나 later refactoring 뒤에 깨질 수 있다. formal system은 syntax에서 FV와 FA를 계산해 condition을 검사한다. side condition을 생략한 proof diagram은 보기에는 간단해도 complete certificate가 아니다.",
            "Side conditions are checkable proof data. Freshness and free/assigned-variable constraints should be computed from syntax, not left as informal comments that may break after renaming."
          ),
          b(
            "soundness proof는 각 inference rule마다 local하게 할 수 있다. all premisses가 semantically valid하다고 가정하고 conclusion도 valid함을 Chapter 2 denotation으로 보인다. derivation tree 전체의 soundness는 tree height에 대한 induction으로 따라온다. leaf axiom의 validity와 rule의 validity preservation을 결합하면 어떤 finite derivation도 invalid root를 만들 수 없다.",
            "Rule soundness is local: valid premisses imply a valid conclusion. Induction on derivation height then proves soundness of every finite proof tree."
          ),
          b(
            "completeness가 있어도 proof search가 반드시 efficient하거나 decidable한 것은 아니다. valid specification마다 finite proof가 존재한다는 existence claim과, 그 proof를 algorithm이 항상 찾아낸다는 claim은 다르다. invariant space가 무한하면 candidate search가 끝나지 않을 수 있다. Chapter 3의 학습 목표는 rule을 sound하게 적용하고 필요한 annotation의 의미를 이해하는 것이지 universal automatic verifier를 얻는 것이 아니다.",
            "Completeness is an existence claim, not an efficient decision procedure. Infinite annotation spaces can make proof search diverge even when a finite proof exists."
          )
        ),
        list(
          b("Anatomy of one rule application", "Anatomy of one rule application"),
          b("goal의 outer command constructor를 확인한다. `c₀;c₁`이면 SQ, assignment이면 AS, while이면 WHP 또는 WHT가 primary candidate다. SP/WC만 계속 적용해 program structure를 피하면 useful subgoal이 만들어지지 않는다.", "Inspect the goal's outer command constructor first and choose its primary compositional rule rather than endlessly reshaping the contract."),
          b("schema metavariable를 concrete phrase로 instantiate한다. 같은 metavariable occurrence는 모두 같은 phrase로 바꾸고, phrase class가 맞아야 한다. assertion 자리에 command를 넣는 것은 visually plausible해도 well-formed rule instance가 아니다.", "Instantiate every occurrence of a metavariable consistently with a phrase of the correct class."),
          b("표시된 substitution, negation, conjunction을 actual syntax operation으로 계산한다. capture-avoidance와 precedence를 확인하며, abbreviation을 펼쳤을 때도 같은 abstract phrase인지 점검한다.", "Carry out the indicated syntactic operations with capture avoidance and correct precedence."),
          b("freshness나 FV/FA disjointness 같은 side condition을 별도 obligation으로 기록한다. condition이 false이면 rule을 억지로 쓰지 말고 bound variable을 rename하거나 다른 annotation을 선택한다.", "Record side conditions explicitly; when they fail, rename bound variables or choose a different annotation instead of forcing the rule."),
          b("생성된 subgoal을 recursively derive한 뒤 rule label과 premiss reference를 붙인다. 이 provenance가 있어야 checker와 reviewer가 conclusion이 어디서 왔는지 local하게 확인할 수 있다.", "Derive the generated subgoals and record the rule label and premiss references so each conclusion has checkable provenance."),
        ),
      ],
      checkpoints: [
        b("`⊢s`와 `⊨s`는 각각 무엇에 의해 정의되는가?", "What defines `⊢s` and `⊨s`, respectively?"),
        b("soundness와 completeness의 implication 방향을 각각 써 보라.", "Write the implication direction for soundness and for completeness."),
      ],
    },
    {
      id: "section-3-3",
      covers: "§3.3 · pp. 57–63",
      minutes: 13,
      title: b("3.3 Rules for Assignment and Sequential Composition", "3.3 Rules for Assignment and Sequential Composition"),
      lead: b(
        "assignment의 backward substitution과 sequencing의 intermediate assertion을 이용해 straight-line program을 증명한다.",
        "Prove straight-line programs using backward substitution for assignment and an intermediate assertion for sequencing."
      ),
      blocks: [
        notation(
          b("Assignment and sequential composition", "Assignment and sequential composition"),
          "(AS)   ─────────────────────\n       [ p[v↦e] ] v:=e [ p ]\n\n(SQ)   [p] c₀ [q]    [q] c₁ [r]\n       ───────────────────────────\n              [p] c₀;c₁ [r]",
          b(
            "square brackets는 total correctness form이지만 assignment와 finite sequencing은 항상 terminate하므로 같은 shape를 braces에도 사용할 수 있다. AS는 postcondition `p`의 free occurrence of `v`를 `e`로 capture-avoiding substitute한다. SQ의 `q`는 first command의 postcondition이면서 second command의 precondition인 intermediate assertion이다.",
            "The brackets show total correctness, but assignment and finite sequencing terminate, so the same shape works for braces. AS substitutes e for free v in the postcondition. In SQ, q is the first command's postcondition and the second command's precondition."
          ),
          "\\frac{}{[\\,p[v\\mapsto e]\\,]\\;v:=e\\;[\\,p\\,]}\\;\\mathrm{AS}\\qquad\\frac{[p]\\;c_0\\;[q]\\quad[q]\\;c_1\\;[r]}{[p]\\;c_0;c_1\\;[r]}\\;\\mathrm{SQ}"
        ),
        prose(
          b(
            "AS를 forward assignment simulation으로 읽으면 방향을 잃는다. 목표가 `[?] x:=x+1 [x>0]`이면 assignment 뒤의 `x`는 이전의 `x+1`이므로 필요한 precondition은 `(x+1)>0`, 즉 `x>-1`이다. postcondition에서 시작해 syntax상 replacement를 수행한 결과가 weakest direct precondition이다. `x>0`을 먼저 놓고 새 `x`를 덧붙이는 식의 forward reasoning은 old/new value를 섞는다.",
            "Read AS backward from the desired postcondition. For `[?] x:=x+1 [x>0]`, the needed precondition is `(x+1)>0`, equivalently x>-1. Forward reasoning easily confuses old and new values."
          ),
          b(
            "SQ에서 semicolon `;`은 Chapter 2와 동일한 sequential composition (순차 합성)이다. `c₀;c₁`은 `c₀`를 먼저 실행하고, 그것이 정상 종료해 만든 state를 `c₁`의 input으로 사용한다. proof에서도 같은 boundary가 필요하다. `q`는 임의의 장식이 아니라 그 boundary state를 설명해 두 proof를 접착하는 interface다. `c₀`가 diverge하면 whole command도 diverge하므로 total proof에서는 first premise가 termination도 보장해야 한다.",
            "The semicolon is sequential composition: run c₀ first, then feed its final state to c₁. The intermediate assertion q describes that boundary state and acts as the interface joining the two proofs. If c₀ diverges, the whole sequence diverges, so a total proof must establish termination in each premise."
          )
        ),
        prose(
          b(
            "sequential composition의 intermediate assertion은 두 방향의 요구를 동시에 만족해야 한다. c₀가 establish할 수 있을 만큼 weak해야 하고, c₁이 final postcondition을 establish하는 데 충분할 만큼 strong해야 한다. 너무 strong하면 first premise가 실패하고 너무 weak하면 second premise가 실패한다. backward calculation은 c₁의 weakest requirement를 먼저 계산해 이 균형을 잡는 실용적인 방법이다. straight-line assignment만 있다면 이 과정은 거의 기계적이다.",
            "An intermediate assertion must be weak enough for c₀ to establish and strong enough for c₁ to use. Backward calculation from c₁ finds a practical balance and is nearly mechanical for straight-line assignments."
          ),
          b(
            "substitution notation `p[v↦e]`에서 바뀌는 것은 p 안의 free occurrence of v다. e 자체를 평가해 숫자로 바꾸는 operation이 아니며, assignment target v를 syntax 안에서 replace하는 것도 아니다. 예를 들어 postcondition `x=y`와 command `x:=y+1`이면 precondition은 `(y+1)=y`로 unsatisfiable하다. 이것은 command가 잘못되었다기보다 해당 postcondition을 만족하는 initial state가 없다는 정확한 계산이다.",
            "In p[v↦e], free occurrences of v in p are syntactically replaced; e is not evaluated to a number and the assignment target is not rewritten. An unsatisfiable result can correctly show that no initial state meets the requested postcondition."
          ),
          b(
            "SP와 WC에서 implication 방향은 contract의 set interpretation으로 검산할 수 있다. p가 q보다 stronger하다는 것은 p-state set이 q-state set의 subset이라는 뜻이다. 그래서 `[q]c[r]`가 모든 q-input을 처리하면 더 작은 p-input set도 처리한다. q가 r을 imply하면 q-output set이 r-output set 안에 있으므로 q를 보장하는 command는 r도 보장한다. stronger/weaker라는 일상어가 헷갈리면 state set inclusion으로 돌아가면 된다.",
            "Check SP and WC using state-set inclusion. A stronger precondition denotes a smaller input set; a weaker postcondition denotes a larger accepted output set. This fixes the implication directions."
          ),
          b(
            "여러 assignment의 derived rule은 rightmost postcondition부터 substitution을 중첩한다. `v₀:=e₀;v₁:=e₁`에서는 q에 먼저 `v₁↦e₁`을 적용하고, 그 결과에 `v₀↦e₀`을 적용한다. 두 expression이 original state에서 동시에 평가되는 multiple assignment와 같다고 가정하면 안 된다. sequential command에서는 second right-hand side가 first update를 볼 수 있기 때문에 substitution order가 execution order의 반대로 나타난다.",
            "For repeated sequential assignments, substitutions are nested from the rightmost command backward. This differs from simultaneous assignment because later right-hand sides may observe earlier updates."
          )
        ),
        example(
          b("A complete backward calculation", "A complete backward calculation"),
          b("`[y>3] x:=2*y; x:=x-y [x≥4]`를 rightmost assignment부터 계산한다.", "Prove `[y>3] x:=2*y; x:=x-y [x≥4]` from the rightmost assignment backward."),
          [
            b("final postcondition `x≥4`에 second assignment의 right side `x-y`를 substitute하면 intermediate requirement `x-y≥4`를 얻는다.", "Substitute x-y for x in the final postcondition to obtain the intermediate requirement x-y≥4."),
            b("first assignment `x:=2*y`를 거꾸로 통과시키면 `(2*y)-y≥4`, 즉 `y≥4`가 된다.", "Push that assertion backward through x:=2*y to obtain (2y)-y≥4, or y≥4."),
            b("integer에서는 `y>3 ⇒ y≥4`가 valid하다. 이 pure implication이 program-specific derivation에 필요한 verification condition이다.", "Over integers, y>3 implies y≥4. This pure implication is the verification condition."),
            b("두 AS instance를 SQ로 합치고, initial implication으로 precondition을 strengthen하면 원래 total specification을 얻는다.", "Combine the two AS instances with SQ and strengthen the precondition using the initial implication.")
          ],
          b("straight-line proof는 postcondition에서 command를 오른쪽에서 왼쪽으로 지나며 substitution하고, 마지막에 주어진 precondition이 계산된 requirement를 imply하는지 확인하는 과정이다.", "A straight-line proof propagates the postcondition from right to left by substitution, then checks that the supplied precondition implies the calculated requirement.")
        ),
        notation(
          b("Strengthening precedent and weakening consequent", "Strengthening precedent and weakening consequent"),
          "(SP)   p ⇒ q    [q] c [r]          (WC)   [p] c [q]    q ⇒ r\n       ───────────────────                ───────────────────\n             [p] c [r]                          [p] c [r]",
          b(
            "Reynolds의 이름에서 precedent는 precondition, consequent는 postcondition이다. stronger precondition은 허용 input을 줄이고 weaker postcondition은 요구 output을 줄이므로 이미 증명한 specification에서 안전하게 이동한다. 두 rule은 command의 outer constructor를 분해하지 않으므로 noncompositional이다.",
            "In Reynolds's terminology, precedent is the precondition and consequent the postcondition. A stronger precondition admits fewer inputs; a weaker postcondition demands less of outputs. These rules are noncompositional because they do not decompose the command's outer constructor."
          ),
          "\\frac{p\\Rightarrow q\\quad[q]\\,c\\,[r]}{[p]\\,c\\,[r]}\\;\\mathrm{SP}\\qquad\\frac{[p]\\,c\\,[q]\\quad q\\Rightarrow r}{[p]\\,c\\,[r]}\\;\\mathrm{WC}"
        ),
        callout(
          "proof",
          b("Why the assignment rule is sound", "Why the assignment rule is sound"),
          b(
            "Chapter 1의 Substitution Theorem이 soundness bridge다. initial state `σ`가 `p[v↦e]`를 satisfy하면 theorem에 의해 `p`는 updated state `σ[v↦⟦e⟧σ]`에서 true다. Chapter 2 assignment equation은 이 updated state가 정확히 `⟦v:=e⟧σ`라고 말한다. syntax substitution, state update, command denotation이 같은 triangle을 이루므로 AS conclusion이 semantically valid하다.",
            "The Chapter 1 Substitution Theorem is the soundness bridge. If σ satisfies p[v↦e], then p holds in σ updated at v with the value of e. Chapter 2 says that this update is exactly the assignment denotation. Syntactic substitution and semantic state update therefore commute."
          )
        ),
        list(
          b("A straight-line proof checklist", "A straight-line proof checklist"),
          b("final postcondition의 모든 program variable가 final state를 읽는다는 점을 먼저 표시하고, old input이 필요하면 stable logical variable을 precondition에 도입한다.", "Mark every program variable in the postcondition as a final-state value and introduce stable logical variables for old inputs."),
          b("rightmost command부터 outer constructor에 맞는 rule을 선택한다. assignment이면 substitution, skip이면 identity, conditional이면 guard case split을 수행한다.", "Starting at the rightmost command, choose the matching rule: substitution for assignment, identity for skip, and guarded case split for a conditional."),
          b("sequence boundary마다 얻은 requirement를 intermediate assertion으로 기록한다. 이 assertion은 source code line 사이 state에 대한 contract이므로 execution order와 같은 위치에 놓는다.", "Record each propagated requirement as the intermediate assertion at the corresponding source-code boundary."),
          b("given precondition과 calculated requirement 사이 차이는 SP의 implication으로 남긴다. final guarantee를 약하게 바꾸는 단계는 WC implication으로 분리한다.", "Leave the gap between the supplied and calculated preconditions as an SP implication, and isolate any weakening of the final guarantee as WC."),
          b("각 substitution이 capture-avoiding인지, sequential assignment order가 뒤집힌 substitution nesting에 반영되었는지, integer simplification이 실제 theorem인지 마지막에 검사한다.", "Finally check capture avoidance, reverse nesting for sequential assignments, and the validity of every arithmetic simplification."),
          b("program syntax이 모두 사라지고 assertion implication만 남았을 때 structural proof generation이 끝난다. command가 남아 있다면 아직 적용하지 않은 compositional rule이 있는지 확인한다.", "Structural generation is complete only when commands have disappeared and pure assertion implications remain.")
        ),
        callout(
          "key",
          b("Substitution order is execution order seen backward", "Substitution order is execution order seen backward"),
          b(
            "forward execution은 initial state에서 c₀ update를 만든 뒤 c₁을 실행한다. backward proof는 final q에서 c₁이 요구한 state를 먼저 계산하고 그 requirement를 다시 c₀ 앞까지 옮긴다. 그래서 command order와 substitution calculation order가 반대다. 이 reversal은 semantics을 뒤집는 것이 아니라 final requirement의 preimage를 successive state transformer 아래에서 구하는 것이다.",
            "Execution runs c₀ then c₁; backward proof takes the final requirement through c₁ and then c₀. The reversal computes successive preimages under the state transformers."
          ),
          b(
            "예를 들어 `x:=x+1; x:=2*x` 뒤 x=8을 원하면 second assignment를 먼저 통과해 x=4를 얻고, first assignment를 통과해 x+1=4, 즉 x=3을 얻는다. forward로 검산하면 3→4→8이다. substitution을 source order로 적용하면 다른 expression을 만들어 sequential semantics과 어긋난다.",
            "For `x:=x+1; x:=2*x` with final x=8, backward reasoning gives x=4 then x=3; forward execution checks 3→4→8. Source-order substitution would be wrong."
          ),
          b(
            "assignment right-hand side도 assignment 전 state에서 evaluate된다. `x:=x+1`의 q substitution에 등장한 x+1 안의 x는 old x다. multiple assignment proof에서 각 backward step을 수행할 때 현재 assertion의 occurrence가 어느 program point 값을 나타내는지 표시하면 old/new 혼동을 막을 수 있다.",
            "Each right-hand side is evaluated in its pre-assignment state. Marking the program point represented by each assertion prevents old/new confusion during nested substitutions."
          )
        ),
      ],
      checkpoints: [
        b("`[?] y:=x+y [y=2*x]`의 direct precondition을 substitution으로 계산하라.", "Calculate the direct precondition of `[?] y:=x+y [y=2*x]`."),
        b("`c₀;c₁`의 semicolon 의미와 SQ의 intermediate assertion 역할을 같은 boundary state로 설명하라.", "Explain both the semicolon and SQ's intermediate assertion using the same boundary state."),
        b("SP에서 precondition을 stronger하게 만드는 것이 왜 더 쉬운 계약을 만드는가?", "Why does strengthening the precondition make a contract easier to satisfy?"),
      ],
    },
    {
      id: "section-3-4",
      covers: "§3.4 · pp. 63–66",
      minutes: 13,
      title: b("3.4 Rules for while Commands", "3.4 Rules for while Commands"),
      lead: b(
        "loop invariant로 모든 terminating iteration의 결과를 연결하고, loop variant와 ghost variable로 termination을 추가 증명한다.",
        "Use a loop invariant to connect all terminating iterations, then add a loop variant and ghost variable to prove termination."
      ),
      blocks: [
        prose(
          b(
            "loop invariant `i`는 loop 진입 시 한 번만 참인 조건이 아니라, guard test 직전마다 유지되는 assertion이다. partial proof의 세 역할은 establishment, preservation, usefulness다. loop 앞 code가 `i`를 establish하고, `{i∧b} c {i}`가 body 한 번 뒤에도 preserve하며, exit에서는 guard가 false이므로 `i∧¬b`에서 desired postcondition을 derive한다. WHP rule 자체는 가운데 preservation과 exit shape를 제공한다.",
            "A loop invariant is an assertion true before every guard test. A partial proof must establish it, preserve it with the body under the guard, and make it useful at exit. WHP captures preservation and yields i∧¬b."
          ),
          b(
            "guard `b`를 invariant로 착각하면 안 된다. body는 보통 guard를 eventually false로 만들기 때문에 `b` 자체를 preserve하지 않는다. 반대로 postcondition만 invariant로 쓰면 loop 도중에는 너무 strong할 수 있다. practical discovery는 postcondition에서 exit-specific fact `¬b`를 제거하고, 변하는 counter와 accumulated result 사이의 relation을 generalize하는 것이다.",
            "The guard is usually not the invariant because the body is intended eventually to falsify it. The final postcondition may be too strong during the loop. A useful discovery heuristic removes the exit-only fact and generalizes a relation between the counter and accumulated result."
          )
        ),
        prose(
          b(
            "invariant establishment는 WHP bar 위에 직접 보이지 않지만 whole program proof에서는 빠질 수 없다. loop 앞 initialization `c₀`가 있다면 SQ로 `[p]c₀[i]`와 `[i]while... [i∧¬b]`를 연결한다. 즉 WHP가 i를 가정하는 것은 proof obligation을 없앤 것이 아니라 loop boundary 밖의 앞 command에게 넘긴 것이다. postcondition usefulness도 WC를 통해 `i∧¬b⇒q`라는 logical obligation으로 처리한다.",
            "Invariant establishment is not printed in WHP because sequencing assigns it to the code before the loop. Likewise, usefulness is discharged afterward by weakening with i∧¬b⇒q. The obligations are relocated, not removed."
          ),
          b(
            "preservation premise는 `i`만으로 body를 시작하지 않고 `i∧b`를 사용한다. body는 guard가 true인 state에서만 실행되므로 이 additional fact가 arithmetic step을 정당화할 수 있다. countdown에서 x≥0만으로 x:=x-1이 nonnegativity를 preserve하지 않지만 x≥0∧x>0이면 preserve한다. 실행되지 않는 state까지 body contract에 넣으면 필요한 것보다 strong한 premise를 요구해 좋은 invariant를 버리게 된다.",
            "Preservation starts from i∧b because the body runs only when the guard is true. That guard fact often makes arithmetic preservation possible, as in decrementing a positive counter."
          ),
          b(
            "WHT의 first premise는 decrease만 말하지 않고 square brackets를 사용해 body의 total correctness도 요구한다. body가 variant를 줄이는 final state를 만든다고 해도 그 body 자체가 어떤 input에서 diverge하면 outer loop termination은 나오지 않는다. nested loop가 body에 있다면 inner loop의 total proof가 먼저 필요하다. termination argument는 syntax tree 안의 모든 반복 level에서 compositional하게 쌓인다.",
            "The first WHT premiss uses brackets because the body itself must terminate. A body that would decrease the variant only if it finished is insufficient. Nested loops therefore require nested total-correctness proofs."
          ),
          b(
            "ghost variable `v₀`는 새 program storage가 아니라 logical snapshot이다. premise에 `e=v₀`를 넣으면 body 실행 전 measure를 이름 붙일 수 있고 postcondition `e<v₀`에서 new measure와 비교할 수 있다. freshness condition은 body나 invariant가 v₀를 변경하거나 다른 의미로 사용하는 것을 막는다. practical verifier의 `old(e)` 표기가 같은 역할을 하지만, calculus에서는 ordinary logical variable과 side condition으로 표현한다.",
            "The ghost variable is a logical snapshot, not program storage. It names the old measure so the post-state can compare against it. Freshness prevents the program or assertions from giving that name another role; verifier notation such as old(e) serves a similar purpose."
          )
        ),
        notation(
          b("Partial correctness of while", "Partial correctness of while"),
          "(WHP)        { i ∧ b } c { i }\n             ───────────────────────\n             { i } while b do c { i ∧ ¬b }",
          b(
            "soundness는 Chapter 2의 finite approximants에 대한 induction으로 볼 수 있다. zero-stage는 terminate하지 않아 partial claim을 vacuously satisfy한다. n-stage에서 invariant가 유지된다고 가정하고 body preservation을 붙이면 n+1-stage에서도 exit state가 `i∧¬b`를 만족한다. approximant들의 least upper bound가 실제 while denotation이므로 모든 finite terminating run에 결론이 이어진다.",
            "Soundness follows by induction over Chapter 2 finite approximants. The zero stage cannot terminate; preservation extends the claim from n unfoldings to n+1; the least upper bound is the actual while denotation."
          ),
          "\\frac{\\{i\\land b\\}\\;c\\;\\{i\\}}{\\{i\\}\\;\\mathbf{while}\\ b\\ \\mathbf{do}\\ c\\;\\{i\\land\\neg b\\}}\\;\\mathrm{WHP}"
        ),
        notation(
          b("Total correctness of while", "Total correctness of while"),
          "(WHT)   [ i ∧ b ∧ e=v₀ ] c [ i ∧ e<v₀ ]     i ∧ b ⇒ e≥0\n        ─────────────────────────────────────────────────────\n              [ i ] while b do c [ i ∧ ¬b ]\n\nside condition: v₀ ∉ FV(i)∪FV(b)∪FV(e)∪FV(c)",
          b(
            "`e`는 loop variant (반복 변량), `v₀`는 iteration 시작 시 `e`의 old value를 기억하는 fresh ghost variable (유령 변수)다. first premiss는 body가 total-correct하고 `e`를 strictly decrease함을 보인다. second premiss는 guard가 true인 동안 `e`가 natural-number region에 있음을 보인다. 자연수는 infinite descending chain이 없으므로 iteration이 무한히 이어질 수 없다.",
            "e is the loop variant; fresh ghost variable v₀ remembers its old value at the start of an iteration. The first premiss proves total body execution and strict decrease; the second keeps the measure nonnegative while the guard holds. Natural numbers admit no infinite descending chain."
          ),
          "\\frac{[i\\land b\\land e=v_0]\\;c\\;[i\\land e<v_0]\\quad i\\land b\\Rightarrow e\\ge 0}{[i]\\;\\mathbf{while}\\ b\\ \\mathbf{do}\\ c\\;[i\\land\\neg b]}\\;\\mathrm{WHT}"
        ),
        example(
          b("Proving a countdown loop", "Proving a countdown loop"),
          b("`[x=n ∧ n≥0] while x>0 do x:=x-1 [x=0]`에서 invariant와 variant를 분리한다.", "Separate invariant and variant for a countdown loop."),
          [
            b("invariant로 `x≥0`을 택한다. precondition이 이를 imply하고, `x≥0∧x>0`에서 `x:=x-1` 뒤에도 `x≥0`이다.", "Choose invariant x≥0. The precondition implies it, and decrement preserves it when x>0."),
            b("exit에서 `x≥0∧¬(x>0)`이므로 integer order에서 `x=0`을 얻는다. 이것이 partial correctness 부분이다.", "At exit, x≥0 and not x>0 imply x=0. This is the partial-correctness part."),
            b("variant로 `e=x`를 택한다. guard가 true이면 x≥1이라 nonnegative이고, old value를 v₀라 하면 assignment 뒤 x=v₀-1<v₀이다.", "Choose variant e=x. Under the guard it is nonnegative, and after decrement x=v₀-1<v₀."),
            b("WHT는 body가 terminate한다는 fact도 요구한다. assignment는 즉시 terminate하므로 strict descent와 결합해 total specification을 얻는다.", "WHT also needs the body itself to terminate. Assignment does, so strict descent yields the total specification.")
          ],
          b("invariant는 ‘종료한다면 결과가 맞다’를, variant는 ‘실제로 종료한다’를 담당한다. 두 assertion을 한 덩어리로 부르면 proof obligation이 흐려진다.", "The invariant establishes result correctness if termination occurs; the variant establishes termination. Keeping them distinct clarifies the obligations.")
        ),
        callout(
          "warning",
          b("A decreasing integer is not enough", "A decreasing integer is not enough"),
          b(
            "integer expression이 매번 감소한다는 사실만으로 termination은 나오지 않는다. `...,2,1,0,-1,-2,...`는 무한히 감소할 수 있다. WHT의 `i∧b⇒e≥0`은 단순한 technical side condition이 아니라 well-founded descent를 만드는 핵심이다. 다른 well-founded set을 쓸 수도 있지만, 이 calculus는 natural-number measure로 그 구조를 표현한다.",
            "Strict decrease over all integers does not prove termination because integers have infinite descending chains. The nonnegativity premiss creates well-founded descent. Other well-founded orders are possible, but this calculus encodes the argument with a natural-number measure."
          )
        ),
        prose(
          b(
            "invariant candidate를 검증하는 세 implication을 직접 쓰는 습관이 중요하다. initialization은 `p⇒i`, preservation은 program specification `{i∧b}c{i}`, exit usefulness는 `i∧¬b⇒q`다. 첫째가 실패하면 invariant가 entry에서 너무 strong하고, 둘째가 실패하면 body relation을 빠뜨렸거나 false fact를 넣었으며, 셋째가 실패하면 desired result를 끌어내기에 너무 weak하다. failure location이 수정 방향을 알려 준다.",
            "Test an invariant with initialization p⇒i, preservation `{i∧b}c{i}`, and exit usefulness i∧¬b⇒q. Each failure identifies whether the candidate is too strong, not preserved, or too weak."
          ),
          b(
            "invariant는 실행마다 바뀌지 않는 single numeric value일 필요가 없다. variable 값은 변해도 그들 사이 relation이 유지되면 된다. Fibonacci의 f와 k는 모두 변하지만 f=fib(k)는 보존된다. fast exponentiation의 y,x,z가 모두 변해도 y*x^z는 constant다. ‘불변’은 state가 같다는 뜻이 아니라 assertion truth가 모든 loop boundary에서 같다는 뜻이다.",
            "An invariant need not name an unchanging numeric value. Variables may change while a relation among them remains true; what stays invariant is assertion truth at loop boundaries."
          ),
          b(
            "variant도 실제 program counter일 필요가 없다. 여러 variable의 expression이나 lexicographic tuple을 well-founded order로 비교할 수 있다. 이 chapter rule은 integer expression e와 nonnegative lower bound를 사용하지만, 핵심 논증은 매 iteration strict descent와 infinite descending chain의 부재다. loop가 단계에 따라 서로 다른 counter를 줄인다면 하나의 simple integer보다 tuple measure가 자연스러울 수 있다.",
            "A variant need not be a program counter. It may be an expression or a lexicographic tuple over a well-founded order; the essential facts are strict descent and absence of infinite descending chains."
          ),
          b(
            "partial correctness proof를 먼저 완성한 뒤 termination을 더하는 workflow는 두 obligation을 분리해 debug하기 좋다. invariant preservation이 실패하면 result argument를 고치고, variant decrease가 실패하면 progress argument를 고친다. 그러나 total WHT premise에서는 body specification 자체가 total form이어야 하므로 마지막 결합 단계에서 nested nontermination을 다시 점검한다.",
            "Proving partial correctness first separates result debugging from progress debugging, but the final WHT premiss still requires total correctness of the body, including nested loops."
          )
        ),
        list(
          b("Invariant and variant failure patterns", "Invariant and variant failure patterns"),
          b("`p⇒i`가 실패하면 candidate invariant가 initialization에서 아직 성립하지 않는다. initialization code를 수정하거나 i에서 entry에 불필요한 conjunct를 제거해야 하며, body preservation을 먼저 증명해도 이 gap은 사라지지 않는다.", "If p⇒i fails, initialization does not establish the candidate; change the setup or remove an unjustified entry conjunct."),
          b("`{i∧b}c{i}`가 실패하면 trace counterexample에서 body가 어떤 relation을 깨는지 본다. temporary value, bound, parity처럼 다음 iteration을 설명하는 history fact를 invariant에 추가하거나 실제 code bug를 고친다.", "If preservation fails, inspect which relation the body destroys and add missing history facts or fix the code."),
          b("`i∧¬b⇒q`가 실패하면 invariant가 exit에서 너무 weak하다. q를 moving index나 residual quantity로 generalize한 relation을 추가해야 한다. q 자체를 그대로 i에 넣는 것은 initialization이나 preservation을 다시 깨뜨릴 수 있다.", "If exit usefulness fails, strengthen the invariant with a generalized relation rather than blindly inserting the final postcondition."),
          b("variant가 감소하지만 lower bound가 실패하면 negative infinite descent가 가능하다. guard를 strengthen할 수 없다면 absolute value나 remaining distance처럼 well-founded region을 명확히 하는 다른 measure를 찾는다.", "If decrease holds but the lower bound fails, choose a measure whose well-founded region is guaranteed by the invariant and guard."),
          b("variant가 어떤 branch에서 unchanged이면 total proof는 그 branch가 무한히 반복될 수 있는지 조사해야 한다. 여러 step을 묶어 감소하는 measure나 lexicographic pair가 필요할 수 있고, fairness를 가정해야 하는 nondeterministic setting은 later logic의 대상이다.", "If a branch leaves the variant unchanged, investigate possible infinite repetition; a multi-step or lexicographic measure may be needed."),
        ),
      ],
      checkpoints: [
        b("WHP conclusion이 `i`가 아니라 `i∧¬b`를 postcondition으로 주는 이유는?", "Why does WHP conclude i∧¬b rather than merely i?"),
        b("WHT에서 fresh `v₀`가 필요한 이유와 program variable로 사용하면 안 되는 이유를 설명하라.", "Why does WHT need fresh v₀, and why must it not be a program variable used by the loop?"),
        b("strictly decreasing integer expression만으로 termination을 증명할 수 없는 counterexample을 제시하라.", "Give a counterexample showing why a strictly decreasing integer expression alone does not prove termination."),
      ],
    },
    {
      id: "section-3-5",
      covers: "§3.5 · pp. 66–69",
      minutes: 10,
      title: b("3.5 Further Rules", "3.5 Further Rules"),
      lead: b(
        "skip, conditional, local declaration의 compositional rule과 renaming, conjunction, disjunction, constancy의 structural rule을 구분한다.",
        "Distinguish compositional rules for skip, conditionals, and local declarations from structural rules for renaming, conjunction, disjunction, and constancy."
      ),
      blocks: [
        notation(
          b("Rules for the remaining command constructors", "Rules for the remaining command constructors"),
          "(SK)   [p] skip [p]\n\n(CD)   [p∧b] c₀ [q]    [p∧¬b] c₁ [q]\n       ───────────────────────────────\n          [p] if b then c₀ else c₁ [q]\n\n(DC′)  [p] v:=e;c [q]\n       ───────────────────   v∉FV(q)\n       [p] newvar v:=e in c [q]",
          b(
            "SK는 state를 바꾸지 않는다. CD는 initial `p`를 두 guard case로 partition하고 두 branch가 같은 `q`를 establish하게 한다. DC′는 Chapter 2 local declaration을 initialization sequence로 증명하되 local `v`가 밖으로 restore되므로 final contract `q`가 `v`에 의존하지 않아야 한다. 이 side condition을 빼면 hidden local value를 postcondition에서 관찰하는 unsound conclusion을 만들 수 있다.",
            "SK preserves the state. CD partitions the precondition by the guard. DC′ reasons via initialization followed by the body, but because local v is restored, q must not depend on v. Omitting the side condition would expose a hidden local value."
          ),
          "\\frac{}{[p]\\;\\mathbf{skip}\\;[p]}\\;\\mathrm{SK}\\qquad\\frac{[p\\land b]\\;c_0\\;[q]\\quad[p\\land\\neg b]\\;c_1\\;[q]}{[p]\\;\\mathbf{if}\\ b\\ \\mathbf{then}\\ c_0\\ \\mathbf{else}\\ c_1\\;[q]}\\;\\mathrm{CD}"
        ),
        prose(
          b(
            "compositional rule은 conclusion command의 outer syntax constructor를 보고 immediate subcommand의 specification으로 proof를 분해한다. AS, SQ, WHP/WHT, SK, CD, DC′가 여기에 속한다. proof tool은 이 규칙을 syntax-directed하게 적용해 verification condition generator를 만들 수 있다. SP와 WC, renaming, specification conjunction/disjunction, constancy rule은 command 구조와 무관하게 contract를 재배열하므로 noncompositional rule이다.",
            "A compositional rule decomposes the outer command constructor into specifications of immediate subcommands. Such rules support syntax-directed verification-condition generation. Structural rules instead rearrange contracts independently of command syntax."
          ),
          b(
            "constancy rule은 frame reasoning의 초기 형태다. assertion `p`의 free variable이 command가 assign할 수 있는 variable `FA(c)`와 disjoint하면 execution은 `p`의 truth를 바꾸지 않는다. partial form `{p} c {p}`는 termination을 요구하지 않는다. total form은 이미 `[q] c [r]`라는 termination proof가 있을 때 `[p∧q] c [p∧r]`로 unchanged fact를 frame한다. ‘c가 p를 언급하지 않는다’가 아니라 ‘c가 p가 읽는 variable에 assign하지 않는다’가 정확한 condition이다.",
            "Constancy is an early frame principle. If p reads no variable that c may assign, execution preserves p. The partial form needs no termination; the total form frames p around an existing total proof. The key condition concerns assigned variables, not merely textual mention."
          )
        ),
        prose(
          b(
            "SK의 `[p]skip[p]`는 trivial해 보이지만 compositional calculus의 completeness에 필요한 identity case다. sequencing에서 skip이 들어간 branch를 별도 예외로 다루지 않고 같은 SQ를 사용할 수 있다. derived rule ISK는 `p⇒q`와 SK, consequence를 결합해 `[p]skip[q]`를 준다. 아무 state change가 없어도 contract strength를 조절하려면 logical implication이 필요하다는 점을 보여 준다.",
            "SK is the identity case needed for compositional reasoning. Combining it with implication yields the derived rule for `[p] skip [q]`, showing that even no state change may require logical weakening."
          ),
          b(
            "CD의 two premises는 guard truth가 exhaustive하고 mutually exclusive하다는 Boolean semantics에 의존한다. each branch에서 같은 q를 얻는 form이 가장 단순하지만, 서로 다른 q₀,q₁을 얻은 뒤 disjunction이나 implication으로 common postcondition을 만들 수도 있다. 중요한 것은 guard evaluation이 state를 바꾸지 않는 Chapter 2 model이라는 점이다. side-effecting guard를 허용하는 language라면 이 rule을 그대로 재사용할 수 없다.",
            "CD relies on pure Boolean guards whose truth cases are exhaustive and exclusive. Branch-specific postconditions may later be combined, but side-effecting guards would require a different rule."
          ),
          b(
            "declaration rule의 `v∉FV(q)`는 local value가 normal exit에서 outer value로 restore된다는 denotational equation과 직접 연결된다. body proof에서는 initialized local v를 자유롭게 사용하지만 public postcondition은 hidden local result에 의존할 수 없다. outer v의 restored value에 관한 fact가 필요하다면 declaration 전 value를 fresh logical name으로 기억하고 그 name을 q에 사용해야 한다. binder scope와 proof scope를 혼동하지 않는 방법이다.",
            "The declaration side condition follows directly from restoration of the outer value. The body may reason about local v, but the public postcondition cannot depend on the hidden local result; remember an outer value with a fresh logical name instead."
          ),
          b(
            "conjunction과 disjunction rule은 같은 command에 대해 이미 얻은 specification을 조합한다. conjunction은 두 precondition을 모두 가정하고 두 postcondition을 모두 보장한다. disjunction은 어느 input case인지 몰라도 해당 case의 output guarantee 중 하나를 얻는다. 이 rules는 useful하지만 invariant discovery를 대신하지 않는다. loop body의 separate facts를 CA로 합치려면 먼저 각 fact가 실제로 preserved된다는 derivation이 있어야 한다.",
            "Conjunction and disjunction combine existing contracts for the same command. They can assemble separately proved invariant facts but cannot invent or justify those facts."
          )
        ),
        notation(
          b("Combining and framing specifications", "Combining and framing specifications"),
          "(CA)  [p]c[q]  [p′]c[q′]  /  [p∧p′]c[q∧q′]\n(DA)  [p]c[q]  [p′]c[q′]  /  [p∨p′]c[q∨q′]\n(CSP) {p}c{p}                 if FV(p)∩FA(c)=∅\n(CST) [q]c[r] / [p∧q]c[p∧r]  if FV(p)∩FA(c)=∅",
          b(
            "CA와 DA는 같은 command에 대한 독립 contract를 결합한다. CSP/CST는 untouched state fact를 보존한다. RN은 bound variable의 consistent fresh renaming으로 alpha-equivalent specification 사이를 이동한다. 이 rule들은 proof modularity를 높이지만, side condition을 추적하지 않으면 binding과 assignment 때문에 soundness가 깨진다.",
            "CA and DA combine contracts for the same command; constancy preserves untouched facts; renaming moves between alpha-equivalent specifications. Their side conditions are essential in the presence of binding and assignment."
          ),
          "\\frac{[p]c[q]\\quad[p']c[q']}{[p\\land p']c[q\\land q']}\\;\\mathrm{CA}\\qquad FV(p)\\cap FA(c)=\\varnothing"
        ),
        example(
          b("Conditional proof by case partition", "Conditional proof by case partition"),
          b("`[true] if x≥0 then y:=x else y:=-x [y≥0]`를 CD로 분해한다.", "Decompose `[true] if x≥0 then y:=x else y:=-x [y≥0]` with CD."),
          [
            b("then premise의 precondition은 `true∧x≥0`; AS를 backward 적용하면 postcondition `y≥0`의 requirement가 `x≥0`이므로 즉시 성립한다.", "In the then branch, backward assignment turns y≥0 into x≥0, already provided by the guarded precondition."),
            b("else premise의 precondition은 `true∧¬(x≥0)`, 즉 x<0; substitution은 `-x≥0`을 요구하고 integer arithmetic으로 성립한다.", "In the else branch, x<0 and substitution requires -x≥0, a valid integer fact."),
            b("두 branch가 같은 postcondition을 establish하므로 CD로 whole conditional을 conclude한다.", "Both branches establish the same postcondition, so CD concludes the specification for the whole conditional.")
          ],
          b("conditional proof에서 case split은 임의의 논리 전략이 아니라 command guard가 만든 exact partition이다.", "The case split is the exact partition created by the program guard, not an arbitrary proof tactic.")
        ),
        prose(
          b(
            "compositionality는 large proof를 source structure와 같은 hierarchy로 나누게 한다. sequence의 두 child, conditional의 두 branch, loop의 body contract를 독립적으로 검토할 수 있고, implementation이 한 subtree에서만 바뀌면 해당 derivation을 다시 만들면 된다. SP/WC 같은 structural rule도 필요하지만 남용하면 source node와 proof node의 대응이 흐려져 proof maintenance가 어려워진다.",
            "Compositionality mirrors source hierarchy, allowing subcommand proofs to be reviewed and updated independently. Structural rules remain necessary but can obscure this correspondence when overused."
          ),
          b(
            "renaming rule은 단순 text search-and-replace가 아니다. bound variable과 그 governed occurrences를 consistently fresh name으로 바꾸는 alpha-renaming이다. free logical variable까지 바꾸면 contract parameter가 달라지고, binder 하나만 바꾸면 capture가 생길 수 있다. Chapter 1과 2에서 만든 FV와 capture-avoiding renaming machinery가 specification proof에서도 그대로 필요하다.",
            "Renaming is capture-avoiding alpha-renaming of bound variables, not arbitrary textual replacement. Changing free logical parameters or only part of a binder scope changes meaning."
          ),
          b(
            "constancy의 FA는 ‘실제로 이 execution에서 assign된 variable’이 아니라 command syntax가 assign할 수 있는 variable의 safe over-approximation이다. unreachable branch의 assignment도 FA에 들어가면 rule 적용이 막힐 수 있지만 soundness는 유지된다. 더 precise analysis로 condition을 완화할 수 있어도 그 analysis 자체의 correctness proof가 필요하다. simple syntactic condition은 conservative한 대신 check하기 쉽다.",
            "FA is a safe syntactic over-approximation of variables the command may assign, including possibly unreachable branches. It can be conservative, but any more precise relaxation needs its own soundness argument."
          ),
          b(
            "partial constancy `{p}c{p}`가 valid한 이유는 두 case다. c가 diverge하면 partial specification이 vacuously true이고, terminate하면 c가 p가 읽는 variable을 assign하지 않아 initial truth가 final state에도 남는다. total constancy에서는 divergence를 허용할 수 없으므로 기존 total specification `[q]c[r]`가 termination을 공급하고 p만 frame한다. 두 form의 premise 차이는 delimiter semantics에서 직접 나온다.",
            "Partial constancy is valid by divergence or preservation of untouched variables. Total constancy must borrow termination from an existing total specification, so its rule has an additional premiss."
          )
        ),
        list(
          b("Rule index and the question each rule answers", "Rule index and the question each rule answers"),
          b("AS — desired postcondition이 assignment 뒤 true이려면 assignment 전 state에서 어떤 substituted assertion이 true여야 하는가를 계산한다.", "AS calculates the substituted assertion required before an assignment for the desired postcondition afterward."),
          b("SQ — first command의 final state와 second command의 initial state를 어떤 intermediate assertion으로 동일하게 설명할 수 있는가를 묻는다.", "SQ asks which intermediate assertion describes the shared boundary between two sequential commands."),
          b("SP — already-proved precondition보다 더 restrictive한 caller assumption을 사용할 수 있는지 implication으로 확인한다.", "SP checks by implication whether a more restrictive caller assumption may use an existing contract."),
          b("WC — already-proved output guarantee가 caller가 요구한 더 weak한 guarantee를 imply하는지 확인한다.", "WC checks whether an existing output guarantee implies a weaker requested guarantee."),
          b("WHP — invariant와 true guard에서 body 한 번이 invariant를 preserve하면 arbitrary finite iteration 뒤 false guard exit에서도 무엇이 남는지 정한다.", "WHP carries invariant truth through arbitrary finite iterations to an exit with a false guard."),
          b("WHT — WHP result에 더해 body termination, old measure보다 strict decrease, guard 아래 lower bound가 infinite iteration을 배제하는지 확인한다.", "WHT adds body termination, strict decrease, and a lower bound to exclude infinite iteration."),
          b("SK — 아무 state component도 바꾸지 않는 identity command가 같은 assertion을 precondition에서 postcondition으로 그대로 전달한다.", "SK carries an assertion unchanged across the identity command."),
          b("CD — guard가 만든 exhaustive two cases에서 각각 어느 branch contract를 prove하면 common postcondition을 whole conditional에 붙일 수 있는지 정한다.", "CD proves a common postcondition separately in the two exhaustive guard cases."),
          b("DC′ — initialization sequence proof를 local declaration proof로 옮길 때 restored local name을 public postcondition이 관찰하지 않는지 검사한다.", "DC′ transfers an initialization proof to a local declaration while preventing the public postcondition from observing the restored local name."),
          b("RN — bound name spelling만 consistent fresh name으로 바꾼 alpha-equivalent specification 사이에서 proof를 재사용한다.", "RN reuses proofs across specifications differing only by consistent fresh renaming of bound names."),
          b("CA/DA — 같은 command에 대한 independently proved conjunctive facts나 alternative input cases를 하나의 specification으로 결합한다.", "CA and DA combine independently proved facts or alternative input cases for the same command."),
          b("CSP/CST — command가 assign하지 않는 variable에 의존한 assertion을 partial 또는 existing total contract 주변에 frame한다.", "CSP and CST frame assertions depending only on variables the command cannot assign."),
        ),
      ],
      checkpoints: [
        b("DC′의 `v∉FV(q)` side condition을 제거하면 local variable의 어떤 성질을 어기게 되는가?", "What property of local variables would fail without the DC′ side condition?"),
        b("`FV(p)∩FA(c)=∅`가 ‘c가 p의 variable을 읽지 않는다’보다 정확한 이유는?", "Why is FV(p)∩FA(c)=∅ more precise than saying c does not read p's variables?"),
      ],
    },
    {
      id: "section-3-6",
      covers: "§3.6 · pp. 69–71",
      minutes: 10,
      title: b("3.6 Computing Fibonacci Numbers", "3.6 Computing Fibonacci Numbers"),
      lead: b(
        "consecutive Fibonacci values를 state에 유지하는 invariant를 설계하고, initialization·preservation·exit·termination을 각각 검증한다.",
        "Design an invariant that stores consecutive Fibonacci values, then verify initialization, preservation, exit, and termination separately."
      ),
      blocks: [
        prose(
          b(
            "Fibonacci recurrence는 `fib(0)=0`, `fib(1)=1`, `fib(k+1)=fib(k)+fib(k-1)`이다. iterative program은 현재 index `k`와 consecutive pair를 함께 움직인다. 핵심 invariant를 `0≤k≤n ∧ f=fib(k) ∧ g=fib(k-1)`로 잡으면 body의 addition이 recurrence와 정확히 맞는다. `g`는 final output에는 없지만 next Fibonacci value를 계산하는 history summary다.",
            "The recurrence is fib(0)=0, fib(1)=1, and fib(k+1)=fib(k)+fib(k-1). The iterative program advances an index and a pair of consecutive values. The invariant aligns one body addition with the recurrence; g is a history summary needed for the next value even though it is not part of the final output."
          ),
          b(
            "순차 assignment의 order가 중요하다. `t:=f+g; g:=f; f:=t; k:=k+1`은 old `f,g`를 temporary `t`로 보존한다. `f:=f+g; g:=f`처럼 쓰면 second assignment의 `f`가 이미 updated되어 consecutive pair가 깨진다. proof의 backward substitution은 이 bug를 숨기지 않고 invariant preservation implication이 false가 되는 것으로 드러낸다.",
            "Sequential assignment order matters. A temporary preserves the old pair. Updating f before copying it into g destroys the recurrence relation, and backward substitution exposes the bug as a failed preservation implication."
          )
        ),
        prose(
          b(
            "algorithm specification을 쓰기 전에 Fibonacci indexing convention을 고정해야 한다. 여기서는 fib(0)=0, fib(1)=1을 사용하므로 n≥1 input에서는 f=1,g=0,k=1로 initialize한다. 다른 교재처럼 sequence를 1,1에서 시작하면 같은 variable 이름이라도 invariant의 subscript가 달라진다. formal proof는 정의가 다른 두 `fib`를 자동으로 구분하지 못하므로 recurrence와 base case를 assertion theory에 명시해야 한다.",
            "Fix the Fibonacci indexing convention before writing the specification. With fib(0)=0 and fib(1)=1, initialization at k=1 uses f=1 and g=0. Different conventions require different invariants and base facts."
          ),
          b(
            "initialization proof는 여러 assignment를 단순 실행해 보는 것이 아니라 target invariant를 backward substitute하는 과정으로 만들 수 있다. target의 k에 1을, f에 1을, g에 0을 차례로 되대입하면 `1≤1≤N ∧ 1=fib(1) ∧ 0=fib(0)`이 남는다. precondition N≥1과 sequence definition이 이를 imply한다. 이 계산은 loop에 들어가기 전 invariant가 왜 성립하는지 formal하게 닫는다.",
            "Initialization can be proved by backward substitution into the target invariant, leaving only the input bound and the two Fibonacci base equations as pure obligations."
          ),
          b(
            "preservation에서는 simultaneous mathematical update와 sequential program을 구분한다. 원하는 abstract transition은 `(f,g,k)↦(f+g,f,k+1)`이다. program이 temporary를 사용해 이 transition을 구현한다는 것을 four assignment substitutions으로 확인한다. 만약 language가 simultaneous multiple assignment를 primitive로 제공한다면 rule이 달라질 수 있지만, 이 chapter의 semicolon은 각 assignment 뒤 state를 다음 assignment가 본다.",
            "The desired mathematical transition updates the pair simultaneously, while the program implements it with sequential assignments and a temporary. Four substitutions verify that implementation."
          ),
          b(
            "exit reasoning에서 invariant의 bound conjunct가 중요하다. guard false는 k≥n만 주며 이것만으로 k=n은 나오지 않는다. body가 한 번에 1 증가하고 invariant가 k≤N을 보존하며 n=N이 유지된다는 facts를 함께 써야 equality를 얻는다. invariant에서 ‘obvious한’ bound를 빼면 recurrence facts는 모두 보존되어도 final postcondition으로 이어지지 않는 weak invariant가 된다.",
            "At exit, false guard gives only k≥n. The invariant bound k≤N together with n=N is required to conclude k=N. Omitting an apparently obvious bound produces an invariant too weak for the postcondition."
          )
        ),
        notation(
          b("Fibonacci program and invariant", "Fibonacci program and invariant"),
          "pre: n=N ∧ N≥1\nf:=1; g:=0; k:=1;\nwhile k<n do\n  (t:=f+g; g:=f; f:=t; k:=k+1)\npost: f=fib(N)\n\nI ≜ 1≤k≤N ∧ f=fib(k) ∧ g=fib(k-1)\nvariant: N-k",
          b(
            "logical variable `N` remembers the initial input because program variable `n` could in general be modified; 여기서는 constancy로 `n=N`을 유지할 수도 있다. initialization은 fib(1)=1과 fib(0)=0을 사용한다. exit에서 `k≥n`과 invariant의 `k≤N`, `n=N`을 합치면 k=N이므로 f=fib(N)이다.",
            "Logical variable N remembers the input. Initialization uses the two base cases. At exit, k≥n together with k≤N and n=N yields k=N, hence f=fib(N)."
          ),
          "I\\;\\equiv\\;1\\le k\\le N\\land f=\\operatorname{fib}(k)\\land g=\\operatorname{fib}(k-1)\\qquad V=N-k"
        ),
        example(
          b("One preservation calculation", "One preservation calculation"),
          b("body 시작 시 `I∧k<n`이 참이라고 가정하고 한 iteration 뒤의 state를 계산한다.", "Assume I∧k<n at body entry and calculate the state after one iteration."),
          [
            b("old values를 `f₀=fib(k)`와 `g₀=fib(k-1)`라 두면 `t:=f+g` 뒤 t=fib(k)+fib(k-1)=fib(k+1)이다.", "With old f=fib(k) and g=fib(k-1), t becomes fib(k+1) by the recurrence."),
            b("`g:=f`는 g를 old fib(k)로 만들고 `f:=t`는 f를 fib(k+1)로 만든다. temporary 덕분에 두 source value가 구분된다.", "Then g receives old fib(k) and f receives fib(k+1); the temporary separates the source values."),
            b("`k:=k+1` 뒤 new index를 k′라 하면 f=fib(k′), g=fib(k′-1)이다. 또한 old k<n=N에서 k′≤N을 얻는다.", "After increment, writing k′=k+1 gives f=fib(k′), g=fib(k′-1), and k′≤N."),
            b("variant `N-k`는 old guard 아래 positive이고 new value는 정확히 1 작다. body는 finite assignments이므로 WHT의 termination premise도 만족한다.", "The variant N-k is positive under the guard and decreases by exactly one. The finite body also terminates.")
          ],
          b("invariant는 recurrence를 program state의 local relation으로 바꾸고, variant는 index가 input bound까지 남은 거리를 측정한다.", "The invariant turns the recurrence into a local state relation, while the variant measures the remaining distance to the input bound.")
        ),
        callout(
          "key",
          b("How to discover the invariant", "How to discover the invariant"),
          b(
            "postcondition `f=fib(N)`에서 시작해 loop 중에는 아직 k=N이 아니라고 본다. N을 moving index k로 generalize해 `f=fib(k)`를 얻고, body가 다음 값을 계산하려면 무엇을 더 기억해야 하는지 물어 `g=fib(k-1)`를 추가한다. 마지막으로 index safety와 exit reasoning에 필요한 `1≤k≤N`을 붙인다. invariant는 guess라기보다 postcondition을 loop state에 맞게 generalize하고 다음 step의 data dependency를 보충한 결과다.",
            "Start from f=fib(N), generalize the final index N to the moving index k, add the preceding Fibonacci value required by the recurrence, and finally add index bounds needed for exit and safety. The invariant is a systematic generalization of the postcondition plus the body's data dependency."
          )
        ),
        callout(
          "proof",
          b("From the annotated program to verification conditions", "From the annotated program to verification conditions"),
          b(
            "annotated program은 각 program point에 assertion을 배치한다. precondition 뒤 initialization, loop header의 I, body statement 사이의 intermediate assertions, exit의 I∧¬b, final postcondition 순으로 적는다. 이 annotation은 실행되는 code가 아니라 proof decomposition을 위한 지도다. 각 adjacent pair가 하나의 AS, SQ, SP 또는 WC instance로 연결되는지 검사하면 whole derivation을 국소 obligation으로 나눌 수 있다.",
            "An annotated program places assertions at program points to map the proof decomposition. Each adjacent pair should be justified by a local rule instance."
          ),
          b(
            "body의 target invariant를 backward substitute하면 마지막 k increment 전에는 `f=fib(k+1)∧g=fib(k)`, f assignment 전에는 `t=fib(k+1)∧g=fib(k)`, g assignment 전에는 `t=fib(k+1)∧f=fib(k)`, t assignment 전에는 `f+g=fib(k+1)∧f=fib(k)` 형태가 나온다. source invariant의 두 recurrence value가 마지막 requirement를 exactly imply한다.",
            "Backward substitution through the body exposes intermediate assertions whose final arithmetic obligation is exactly the Fibonacci recurrence."
          ),
          b(
            "index conjunct는 같은 calculation에서 old k<N으로 new k≤N을 보장한다. equality n=N이 invariant에 유지되는 이유는 body가 n을 assign하지 않기 때문이며 constancy rule로 분리할 수 있다. data recurrence와 control bound를 한 implication에 섞어도 valid하지만 separate lemmas로 나누면 failure가 value update인지 counter update인지 빠르게 찾을 수 있다.",
            "The guarded bound proves the next index remains within N, while constancy preserves n=N. Separating data and control lemmas makes failures easier to diagnose."
          ),
          b(
            "exit VC는 `I∧¬(k<n)⇒f=fib(N)`이고, termination VC는 `I∧k<n⇒N-k≥0` 및 body 뒤 `N-k<N-k_old`다. 이렇게 적으면 partial result와 total progress가 서로 다른 assertion fact를 사용하는 것이 보인다. 모든 VC를 한꺼번에 ‘obvious’라고 표시하면 실제로 어느 hypothesis가 필요했는지 잃는다.",
            "The exit, lower-bound, and decrease verification conditions expose which hypotheses support result correctness and which support progress."
          )
        ),
        prose(
          b(
            "Fibonacci proof를 derivation tree로 펼치면 top level은 initialization과 while의 SQ다. initialization node는 repeated assignment rule로 invariant를 establish한다. while node는 WHT이며 body node는 다시 four assignments의 repeated rule이다. body node 아래에는 recurrence identity와 index inequality가 verification conditions로 남는다. 이 hierarchy는 informal 설명의 ‘초기 pair가 맞고, 한 step이 다음 pair를 만들며, counter가 끝까지 간다’를 정확히 분해한다.",
            "The derivation hierarchy mirrors the informal argument: initialization establishes the pair, the body advances it by the recurrence, exit identifies the requested index, and the variant proves progress."
          ),
          b(
            "proof에서 logical variable N이 program variable n과 다른 역할을 한다. n은 state component여서 command가 assign할 수 있고 각 assertion은 그 시점의 값을 읽는다. N은 specification parameter로 고정되어 initial input을 나타낸다. 현재 program이 n을 assign하지 않는다는 constancy fact를 prove하면 n=N을 invariant에 유지할 수 있지만, N 없이 final n만 사용하면 future refactoring에서 n이 바뀔 때 contract meaning도 조용히 바뀐다.",
            "Program variable n is a mutable state component; logical N is a fixed specification parameter. Constancy may preserve n=N, but naming the original input explicitly keeps the contract stable under refactoring."
          ),
          b(
            "n=0 case를 처리하려면 현재 initialization k=1은 맞지 않는다. conditional로 zero case를 분리하거나 pair convention과 initialization을 바꿔 k=0에서 시작해야 한다. precondition N≥1은 이 boundary를 contract에 명시적으로 둔 선택이다. proof가 N=0을 다루지 않는 것은 hidden defect가 아니라 stated input restriction이지만, 실제 requirement가 nonnegative input 전체라면 specification 또는 program을 확장해야 한다.",
            "The current initialization assumes N≥1. Supporting zero requires a separate branch or different pair convention. Whether that is a defect depends on the intended input contract."
          ),
          b(
            "trace table은 proof obligation을 찾는 도구로 쓸 수 있다. 작은 N에서 `(k,f,g)`를 적어 보면 columns가 `(k,fib(k),fib(k-1))` pattern을 드러낸다. 그러나 몇 개 row가 맞는다고 preservation theorem이 되는 것은 아니다. pattern을 assertion으로 올린 뒤 arbitrary k에 대해 recurrence와 assignment semantics으로 one-step preservation을 prove해야 induction이 모든 iteration으로 확장된다.",
            "Small traces can reveal the invariant pattern, but only a symbolic one-step preservation proof for arbitrary k promotes that pattern to all iterations."
          )
        ),
      ],
      checkpoints: [
        b("Fibonacci invariant에서 `g=fib(k-1)`가 final postcondition에 없어도 필요한 이유는?", "Why is g=fib(k-1) needed even though g is absent from the final postcondition?"),
        b("temporary `t`를 제거하고 assignment 순서를 바꾸면 어느 preservation equality가 실패하는가?", "Which preservation equality fails if the temporary is removed and assignments are reordered?"),
      ],
    },
    {
      id: "section-3-7",
      covers: "§3.7 · pp. 71–74",
      minutes: 10,
      title: b("3.7 Fast Exponentiation", "3.7 Fast Exponentiation"),
      lead: b(
        "exponent를 줄이면서 accumulator와 remaining power의 product가 original power를 보존한다는 algebraic invariant를 사용한다.",
        "Use an algebraic invariant saying that the accumulator times the remaining power equals the original power while the exponent shrinks."
      ),
      blocks: [
        prose(
          b(
            "naive exponentiation은 n번 곱하지만 fast exponentiation은 parity에 따라 exponent를 절반으로 줄인다. even case의 identity는 `x^z=(x*x)^(z/2)`, odd case의 identity는 `y*x^z=(y*x)*x^(z-1)`이다. 두 변환의 공통 invariant를 `y*x^z = A^N`으로 잡으면 branch마다 algebraic equality 하나만 확인하면 된다. `A,N`은 initial base와 exponent를 기억하는 logical variables다.",
            "Naive exponentiation multiplies n times; fast exponentiation halves the exponent in even cases. The even and odd algebraic identities are unified by the invariant y·x^z=A^N, where A and N remember the inputs."
          ),
          b(
            "이 invariant의 모양은 ‘계산된 부분 × 남은 부분 = original goal’이다. loop가 진행되면 y는 accumulated contribution을, x^z는 residual obligation을 나타낸다. final guard `z=0`에서 residual은 1이 되어 y=A^N이 바로 나온다. 이런 conservation equation은 factorial의 `f*n! = N!`, division의 quotient-remainder relation처럼 많은 loop proof에서 재사용된다.",
            "The invariant has the form computed part times remaining part equals the original goal. The accumulator records completed work and x^z the residual obligation. At z=0 the residual becomes one, yielding y=A^N. Similar conservation equations recur in factorial and division proofs."
          )
        ),
        prose(
          b(
            "odd branch의 sequential order도 proof에 반영된다. `y:=y*x; z:=z-1` 뒤 target invariant를 backward하면 먼저 z를 z-1로, 이어 y를 y*x로 substitute해 `(y*x)*x^(z-1)=A^N`을 얻는다. old z가 positive odd라는 guard fact에서 z≥1이고 exponent law로 left side가 y*x^z와 같아진다. source invariant가 바로 이 equality를 제공한다.",
            "Backward substitution through the odd branch yields (y·x)·x^(z-1)=A^N. Positivity and the exponent law reduce this to the source invariant y·x^z=A^N."
          ),
          b(
            "even branch에서는 target에 new x=x*x, new z=z/2를 넣어 `y*(x*x)^(z/2)=A^N`을 얻는다. z가 even nonnegative이면 `(x²)^(z/2)=x^z`이므로 source invariant로 돌아간다. guard가 단순히 ‘odd가 아니다’라고만 쓰였을 때 integer parity theorem이 even임을 제공한다. division semantics이 truncation이라도 even input에서는 exact quotient이므로 proof가 닫힌다.",
            "The even branch yields y·(x²)^(z/2)=A^N. For nonnegative even z, the exponent identity reduces it to the source invariant, and integer division is exact on that case."
          ),
          b(
            "termination decrease는 asymptotic speed claim과 구분한다. odd branch에서 z가 1 감소하고 even positive branch에서 z/2<z이므로 variant z는 strict decrease한다. 이것으로 finite termination은 증명되지만 logarithmic multiplication count까지 자동으로 나오지는 않는다. complexity specification을 원하면 iteration count나 cost를 state에 추가하거나 별도의 cost semantics을 사용해야 한다.",
            "Strict descent proves finite termination, not a logarithmic cost bound. Complexity requires a cost specification or an instrumented state in addition to total correctness."
          ),
          b(
            "invariant discovery는 code의 branch identity를 거꾸로 묶는 과정으로 볼 수 있다. odd branch는 exponent 한 단위를 completed product로 옮기고 even branch는 같은 residual power를 더 작은 exponent representation으로 바꾼다. 두 branch에서 변하지 않는 expression을 찾으면 y*x^z가 나오고, initial state에 대입하면 그 constant가 A^N임을 알 수 있다. final postcondition을 억지로 반복마다 유지하려는 것보다 변화하지 않는 conservation quantity를 찾는 편이 자연스럽다.",
            "Invariant discovery can be viewed as finding a quantity unchanged by both branch identities. Evaluating that quantity initially identifies the constant A^N, giving the conservation equation."
          )
        ),
        notation(
          b("Fast exponentiation program", "Fast exponentiation program"),
          "pre: a=A ∧ n=N ∧ N≥0\nx:=a; y:=1; z:=n;\nwhile z≠0 do\n  if odd(z) then (y:=y*x; z:=z-1)\n  else (x:=x*x; z:=z/2)\npost: y=A^N\n\nI ≜ z≥0 ∧ y*x^z=A^N\nvariant: z",
          b(
            "initialization은 `1*A^N=A^N`이다. odd branch는 exponent를 1 줄이며 한 factor x를 accumulator로 옮긴다. even branch는 base를 square하고 exponent를 halve한다. nonnegative z가 각 branch에서 strict decrease하므로 total correctness도 얻는다. integer division은 even guard 아래 exact하다.",
            "Initialization is 1·A^N=A^N. The odd branch moves one factor into the accumulator; the even branch squares the base and halves an even exponent. Nonnegative z strictly decreases in either branch, giving total correctness."
          ),
          "I\\;\\equiv\\;z\\ge 0\\land y\\,x^z=A^N\\qquad V=z"
        ),
        example(
          b("Tracing A=3 and N=5", "Tracing A=3 and N=5"),
          b("state `(y,x,z)`를 기록하며 invariant `y*x^z=3^5`를 매 step 확인한다.", "Track state (y,x,z) while checking y·x^z=3^5 at every step."),
          [
            b("initial `(1,3,5)`: 1·3⁵=3⁵. z=5는 odd이므로 y에 x를 곱하고 z를 1 줄인다.", "Initially (1,3,5), the invariant is immediate. Since z is odd, move one factor x into y."),
            b("`(3,3,4)`: 3·3⁴=3⁵. z=4는 even이므로 x를 9로 square하고 z를 2로 halve한다.", "At (3,3,4), square x and halve z."),
            b("`(3,9,2)`: 3·9²=3⁵. 다시 even branch를 적용해 `(3,81,1)`을 얻는다.", "At (3,9,2), another even step gives (3,81,1)."),
            b("z=1에서 odd branch를 적용하면 `(243,81,0)`이고, exit에서 y=243=3⁵이다. z sequence 5,4,2,1,0은 strict descent다.", "The final odd step gives (243,81,0), so y=3⁵. The sequence 5,4,2,1,0 strictly descends.")
          ],
          b("proof는 모든 input을 한꺼번에 다루고 trace는 한 input만 보여 준다. trace는 invariant discovery와 sanity check에는 유용하지만 universal derivation을 대신하지 않는다.", "A trace handles one input; the proof handles all inputs. Tracing helps discover and test an invariant but does not replace a universal derivation.")
        ),
        callout(
          "warning",
          b("Arithmetic assumptions belong in the proof", "Arithmetic assumptions belong in the proof"),
          b(
            "`z/2`가 exact integer half라는 step은 `¬odd(z)`와 z≥0에 의존한다. exponentiation law도 nonnegative integer exponent에 대해 사용한다. 실제 machine integer라면 multiplication overflow가 equality를 깨뜨릴 수 있다. 이 chapter의 mathematical integers에서는 overflow가 없지만, implementation proof로 옮길 때는 range precondition 또는 modular arithmetic postcondition을 추가해야 한다.",
            "Exact halving depends on even nonnegative z, and exponent laws assume natural exponents. Mathematical integers do not overflow; a machine-integer proof needs range assumptions or a modular postcondition."
          )
        ),
        callout(
          "proof",
          b("Branch-local verification conditions", "Branch-local verification conditions"),
          b(
            "CD는 while body proof를 `I∧z≠0∧odd(z)`와 `I∧z≠0∧¬odd(z)`의 두 input region으로 나눈다. 두 branch 모두 target I를 establish하면 common postcondition을 얻는다. 이 case split 덕분에 odd branch에서는 z=2k+1, even branch에서는 z=2k 같은 서로 다른 arithmetic lemma를 사용할 수 있다.",
            "CD splits the body proof into odd and even input regions, letting each branch use its own arithmetic identity before rejoining at the common invariant."
          ),
          b(
            "odd preservation VC는 `z>0∧y*x^z=A^N ⇒ (y*x)*x^(z-1)=A^N`이다. associativity와 `x*x^(z-1)=x^z`로 닫힌다. decrease VC는 new z=z-1<old z이며 lower-bound VC는 z≠0∧z≥0에서 z≥1을 얻어 new z≥0도 보인다. result preservation과 domain preservation을 모두 기록한다.",
            "The odd branch uses one exponent identity for conservation and separate inequalities for strict decrease and preservation of nonnegativity."
          ),
          b(
            "even preservation VC는 `z>0∧even(z)∧y*x^z=A^N ⇒ y*(x*x)^(z/2)=A^N`이다. z=2k를 도입하면 `(x*x)^k=x^(2k)`로 변환된다. decrease는 positive z에 대해 z/2<z이며, quotient가 nonnegative라는 fact도 next invariant에 필요하다. equality proof만 하고 range conjunct를 잊으면 I 전체 preservation이 끝나지 않는다.",
            "The even branch proves both the exponent identity and the range facts for halving; preserving only the equality is not enough to re-establish the full invariant."
          ),
          b(
            "exit VC는 `z≥0∧y*x^z=A^N∧¬(z≠0)⇒y=A^N`이다. guard negation에서 z=0, exponent law에서 x^0=1을 얻는다. 이 final step이 간단한 이유는 invariant를 설계할 때 residual exponent가 zero가 되면 desired output이 바로 드러나도록 conservation equation을 선택했기 때문이다.",
            "At exit z=0 and x^0=1 collapse the conservation invariant directly to the desired result, validating the invariant's design."
          )
        ),
        prose(
          b(
            "fast exponentiation의 correctness와 efficiency를 함께 말하려면 서로 다른 specification layer가 필요하다. current Hoare specification은 final y value와 termination만 말한다. iteration count가 O(log N)이라는 claim은 cost observation이 없으므로 이 calculus conclusion에서 직접 나오지 않는다. z가 even step에서 halve된다는 arithmetic argument를 이용해 별도의 recurrence나 instrumented counter를 분석해야 한다.",
            "The current Hoare contract establishes result and termination, not asymptotic cost. A logarithmic bound needs a separate cost model or instrumented counter."
          ),
          b(
            "base A가 negative여도 nonnegative exponent law는 성립하므로 invariant는 유지된다. 반면 N이 negative이면 integer-only exponent expression을 어떻게 정의할지부터 달라지고 result가 rational일 수 있다. precondition N≥0은 variant lower bound뿐 아니라 mathematical operation의 domain을 고정한다. 한 conjunct가 safety, termination, function definition의 여러 역할을 동시에 할 수 있음을 보여 준다.",
            "Negative bases are harmless for natural exponents, but negative exponents change the result domain. N≥0 fixes both the variant region and the mathematical meaning of exponentiation."
          ),
          b(
            "odd/even branch order를 바꾸거나 combined update를 사용하면 같은 abstract transition을 구현하는지 다시 확인해야 한다. 예를 들어 even branch에서 z를 먼저 halve한 뒤 x를 square해도 x assignment가 z를 읽지 않아 result는 같지만, expression에 shared variables가 더 있으면 순서가 observable할 수 있다. algebraic pseudocode를 actual sequential semantics으로 옮길 때 AS nesting이 implementation fidelity를 검사한다.",
            "Reordering independent-looking updates requires rechecking the actual sequential semantics. Backward AS nesting verifies that pseudocode and implementation realize the same abstract transition."
          ),
          b(
            "cryptographic modular exponentiation으로 옮기면 invariant를 `y*x^z ≡ A^N (mod M)`로 약화한다. 각 multiplication 뒤 modulo reduction을 해도 congruence가 preserved된다. ordinary equality proof와 structure는 같지만 postcondition과 arithmetic lemmas가 modular theory로 바뀐다. 이 예는 program rule은 재사용하면서 assertion theory를 domain에 맞게 교체할 수 있음을 보여 준다.",
            "For modular exponentiation, weaken the invariant to congruence modulo M. Program rules remain the same while arithmetic verification conditions move to modular theory."
          )
        ),
      ],
      checkpoints: [
        b("even branch가 `y*x^z`를 보존하는 algebraic equality를 써 보라.", "Write the algebraic equality showing that the even branch preserves y·x^z."),
        b("fast exponentiation에서 variant z는 왜 두 branch 모두에서 strict decrease하는가?", "Why does variant z strictly decrease in both branches?"),
      ],
    },
    {
      id: "section-3-8",
      covers: "§3.8 · pp. 74–80",
      minutes: 8,
      title: b("3.8 Complications and Limitations", "3.8 Complications and Limitations"),
      lead: b(
        "proof calculus가 보장하는 것과 specification quality, arithmetic truth, assertion expressiveness가 별도로 요구하는 것을 구분한다.",
        "Separate what the proof calculus guarantees from the independent demands of specification quality, arithmetic truth, and assertion expressiveness."
      ),
      blocks: [
        prose(
          b(
            "첫 limitation은 specification problem이다. formal derivation은 written contract에 대해서만 correct하다. input preservation, exceptional case, overflow, resource bound를 contract가 빠뜨리면 proof는 그 omission을 발견하지 못할 수 있다. 그래서 verification은 ‘specification이 intent를 capture하는가’와 ‘program이 specification을 meet하는가’라는 두 review를 요구한다. 후자만 machine-check해도 전자의 오류는 남는다.",
            "The first limitation is specification itself. A derivation proves only the written contract. Omitted preservation, exceptional cases, overflow, or resource bounds may go unnoticed. Verification therefore separates whether the specification captures intent from whether the program meets it."
          ),
          b(
            "둘째 limitation은 assertion language와 theorem proving이다. program rule을 모두 적용해도 마지막에는 arithmetic implication이 남는다. 그 implication이 true인지 결정하는 일은 program calculus가 아니라 underlying Predicate Logic에 속한다. general integer arithmetic과 quantification은 완전 자동화가 어렵고, 필요한 invariant가 chosen assertion language로 expressible하지 않을 수도 있다. 상대적 completeness는 assertion language가 필요한 intermediate relation을 표현하고 모든 true assertion implication을 oracle이 증명해 준다고 가정할 때의 completeness다.",
            "The second limitation lies in the assertion language and theorem proving. Program rules leave arithmetic implications to the underlying logic. General quantified integer reasoning is not automatically decidable, and the needed invariant may be inexpressible. Relative completeness assumes expressive assertions and an oracle for all valid assertion implications."
          ),
          b(
            "셋째 complication은 language feature와 semantic model의 mismatch다. Chapter 2는 arithmetic expression이 모든 state에서 integer value를 준다고 가정했지만 real language의 division by zero나 overflow는 error를 낼 수 있다. 그런 behavior를 무시한 assertion proof는 real execution을 cover하지 않는다. array bounds, failure, nondeterminism, concurrency가 추가되면 specification meaning과 rule도 함께 확장해야 한다. Chapter 4와 Chapter 7–9가 바로 이 확장을 수행한다.",
            "The third complication is mismatch between the language and model. Real arithmetic may fail or overflow even though Chapter 2 expressions are total. Arrays, failure, nondeterminism, and concurrency require corresponding changes to specifications and proof rules, developed in later chapters."
          )
        ),
        prose(
          b(
            "validity와 provability 사이에는 underlying mathematics의 난점이 남는다. assignment와 command structure를 모두 제거한 뒤 `∀n. n≥0⇒...` 같은 formula를 얻어도 그것이 쉬운 것은 아니다. quantifier, multiplication, recursively defined Fibonacci function이 함께 있으면 general decision procedure를 기대할 수 없다. proof assistant는 lemma와 induction hypothesis를 요구할 수 있고 SMT solver는 theory boundary에서 unknown을 반환할 수 있다. 이는 program rule의 soundness failure가 아니다.",
            "Removing command structure can still leave difficult mathematics. Quantifiers, multiplication, and recursive functions may require lemmas and induction beyond automatic decision procedures; solver failure is not failure of the program rules' soundness."
          ),
          b(
            "assertion expressiveness 문제는 단순히 proof tool 성능이 느리다는 뜻보다 근본적이다. semantic state relation으로는 invariant가 존재해도 chosen syntax 안에서 그 relation을 적을 방법이 없으면 WHP/WHT instance를 만들 수 없다. auxiliary variable, recursively defined mathematical function, quantification을 추가하면 표현력이 커지지만 proof theory도 복잡해진다. relative completeness는 이 표현 가능성과 logical oracle를 이상적으로 가정해 control rules의 충분성을 평가한다.",
            "Expressiveness is deeper than solver performance. A semantic invariant may exist but be inexpressible in the chosen assertion syntax. Adding auxiliaries, recursive functions, or quantifiers increases power and proof complexity; relative completeness idealizes these issues to assess the control rules."
          ),
          b(
            "specification omission은 valid but useless contract를 만든다. `[true] c [true]`는 terminate하는 많은 command에 대해 쉽게 valid하지만 output intent를 거의 말하지 않는다. 반대로 inconsistent precondition `false`는 모든 command specification을 vacuously valid하게 만든다. proof를 시작하기 전에 precondition satisfiability, postcondition strength, frame property, old-value naming을 검토해야 하는 이유다. 높은 proof coverage도 weak contract를 보상하지 못한다.",
            "A valid contract can still be useless. `[true] c [true]` says almost nothing about outputs, while a false precondition makes every contract vacuous. Review satisfiability, strength, framing, and old-value references before proof."
          ),
          b(
            "model fidelity는 abstraction boundary를 문서화하는 일이다. mathematical integer proof는 arbitrary precision arithmetic을 가정한다. real implementation이 fixed-width wraparound를 쓰면 `x+1>x` 같은 lemma는 maximum value에서 false다. error-stop을 bottom과 같게 처리하면 partial correctness가 error를 허용하는 unintended result를 낼 수도 있다. semantics이 어떤 outcome을 normal, divergent, erroneous로 구분하는지 먼저 정해야 proof meaning도 안정된다.",
            "Model fidelity requires documenting abstraction boundaries. Fixed-width arithmetic invalidates some integer lemmas, and conflating errors with bottom may accidentally permit them under partial correctness. Outcomes must be classified before proof meaning is stable."
          )
        ),
        notation(
          b("The verification boundary", "The verification boundary"),
          "program + annotations\n        │ syntax-directed rules\n        ▼\nverification conditions in Predicate Logic\n        │ theorem proving / human mathematics\n        ▼\nvalid specification, provided the calculus is sound",
          b(
            "verification condition generator는 proof의 mechanical structure를 자동화하지만 annotation discovery와 logical validity를 자동으로 해결했다는 뜻은 아니다. soundness는 generated obligations을 모두 valid하게 증명했을 때 conclusion을 신뢰할 수 있게 한다. completeness와 decidability는 다른 질문이다.",
            "A verification-condition generator automates proof structure, not annotation discovery or all logical validity. Soundness makes discharged obligations trustworthy; completeness and decidability remain separate questions."
          ),
          "\\text{program+annotations}\\longrightarrow\\text{verification conditions}\\longrightarrow\\text{valid specification}"
        ),
        list(
          b("Four questions before trusting a proof", "Four questions before trusting a proof"),
          b("Contract adequacy: precondition이 실제 admissible input을, postcondition이 old value와 preserved state를 포함한 intended result를 정확히 표현하는가?", "Contract adequacy: do pre- and postconditions capture admissible inputs, old values, preserved state, and intended results?"),
          b("Model fidelity: error, overflow, nontermination, I/O처럼 implementation에서 observable한 outcome이 semantics에 들어 있는가?", "Model fidelity: does the semantics include observable errors, overflow, divergence, and effects?"),
          b("Rule soundness: 각 inference rule이 그 semantics에서 validity를 preserve한다는 proof가 있는가?", "Rule soundness: is every inference rule proved to preserve validity in that semantics?"),
          b("Logical discharge: 남은 verification condition이 실제로 valid하며, 사용한 arithmetic theorem의 hypothesis가 모두 명시되었는가?", "Logical discharge: are the remaining verification conditions valid with every arithmetic hypothesis stated?")
        ),
        callout(
          "key",
          b("What formal proof contributes", "What formal proof contributes"),
          b(
            "formal proof의 가치는 algorithm을 몰랐던 사람에게 magic하게 correctness를 찾아 주는 데 있지 않다. programmer가 가진 informal argument를 invariant, variant, intermediate assertion, implication으로 분해해 숨은 가정과 false step을 노출한다. proof failure는 code bug일 수도 있고 contract bug, missing invariant, insufficient assertion language일 수도 있으므로 실패 지점의 층위를 구분해야 한다.",
            "Formal proof does not magically invent correctness. It decomposes an informal algorithmic argument into invariants, variants, intermediate assertions, and implications, exposing hidden assumptions and false steps. A failure may indicate a code bug, contract bug, missing annotation, or weak assertion language."
          )
        ),
        callout(
          "warning",
          b("Validity is always relative to a stated model", "Validity is always relative to a stated model"),
          b(
            "같은 program text도 integer arithmetic model, fixed-width wraparound model, checked-overflow model에서 서로 다른 denotation을 가진다. 따라서 specification string이 같아도 validity가 달라질 수 있다. proof report에는 variable range, division convention, error behavior, termination observation 같은 semantic assumption을 함께 기록해야 한다. formula만 떼어 내면 theorem이 어느 language에 관한 것인지 잃는다.",
            "The same program text has different denotations under mathematical integers, wraparound arithmetic, and checked overflow. Proof results must record the semantic assumptions that determine validity."
          ),
          b(
            "partial correctness가 bottom을 허용한다는 사실을 error 허용으로 확장해서는 안 된다. Chapter 2의 bottom은 final state가 없는 nontermination이다. error가 finitely observable한 distinct outcome이면 result domain에 error를 따로 넣고 `{p}c{q}`가 그 outcome을 허용하는지 막는지 새 clause로 정해야 한다. bottom과 error를 합치면 safety bug가 vacuous success로 사라질 수 있다.",
            "Partial correctness permits divergence, not automatically every error. A finitely observable error needs its own semantic result and specification clause."
          ),
          b(
            "nondeterministic command에서는 ‘모든 terminating execution이 q를 만족’하는 demonic reading과 ‘어떤 execution이 q에 도달’하는 angelic reading을 구분해야 한다. deterministic state transformer의 single result clause를 그대로 쓰면 choice의 quantification이 숨는다. Chapter 7은 powerdomain과 guarded command를 도입해 이 distinction을 명시한다.",
            "Nondeterminism requires explicit quantification over possible executions—demonic or angelic—rather than the single-result clause of deterministic state transformers."
          ),
          b(
            "concurrency에서는 interference 때문에 sequential constancy와 local invariant preservation이 그대로 성립하지 않는다. 다른 thread가 assertion의 variable을 assign할 수 있으므로 environment step까지 stable한 assertion이나 rely/guarantee 같은 추가 structure가 필요하다. Chapter 3 rule을 배운 목적은 모든 language에 그대로 복사하는 것이 아니라 feature가 바뀔 때 어떤 semantic assumption과 proof rule을 재검토할지 아는 것이다.",
            "Concurrency invalidates naive local constancy because other threads may modify assertion variables. Richer stability or interference reasoning is required."
          )
        ),
        list(
          b("Claims a Chapter 3 proof does not establish by itself", "Claims a Chapter 3 proof does not establish by itself"),
          b("precondition이 real deployment의 모든 legal input을 포함한다는 claim. 지나치게 strong한 precondition은 proof를 쉽게 하지만 필요한 case를 contract 밖으로 밀어낼 수 있다.", "It does not show that the precondition includes every legal deployment input."),
          b("postcondition이 stakeholder intent의 모든 output property를 포함한다는 claim. unmentioned variable, stability, ordering, secrecy property는 proof conclusion에 생기지 않는다.", "It does not show that the postcondition captures every intended output, stability, ordering, or secrecy property."),
          b("mathematical integer semantics이 target machine arithmetic과 같다는 claim. bit width, overflow, division rounding, exceptional behavior를 별도로 연결해야 한다.", "It does not identify mathematical integers with target-machine arithmetic without a separate correspondence argument."),
          b("termination이 deadline이나 complexity bound 안에 일어난다는 claim. WHT는 finite termination을 주지만 step count, memory use, energy consumption을 측정하지 않는다.", "It proves finite termination, not deadlines, complexity, memory, or energy bounds."),
          b("theorem prover가 valid verification condition을 항상 자동으로 찾는다는 claim. completeness existence와 practical search, timeout, decidable fragment는 서로 다르다.", "It does not guarantee that an automated prover will discover every valid verification condition proof."),
          b("source program과 deployed binary가 같은 command denotation을 가진다는 claim. compiler correctness와 runtime/environment assumptions은 별도 verification layer다.", "It does not establish compiler correctness or equivalence between source and deployed binary."),
          b("concurrent environment가 state를 방해하지 않는다는 claim. Chapter 3은 closed sequential command를 다루며 interference는 later rule과 semantics을 요구한다.", "It assumes a closed sequential command; environmental interference needs richer rules."),
          b("proof annotation이 유일하거나 최적이라는 claim. 여러 invariant와 intermediate assertion이 같은 specification을 증명할 수 있고 maintainability는 별도 engineering criterion이다.", "It does not make annotations unique or optimal; many proof decompositions may establish the same contract."),
        ),
        list(
          b("Classifying a failed verification", "Classifying a failed verification"),
          b("code defect: valid precondition state에서 execution이 required output을 만들지 않거나 terminate하지 않는다. concrete counterexample trace가 program semantics 안에서 failure를 재현한다.", "Code defect: a legal execution violates the result or termination requirement, witnessed by a semantic counterexample."),
          b("contract defect: proof된 behavior가 stakeholder intent보다 weak하거나 different하다. old input, preserved variable, boundary case, failure outcome을 specification이 빠뜨렸는지 확인한다.", "Contract defect: the written behavior is weaker than or different from intent; review old inputs, preserved variables, boundary cases, and failures."),
          b("annotation defect: contract와 code는 맞지만 intermediate assertion이나 invariant가 too weak, too strong, or not preserved다. failed obligation의 위치를 이용해 relation을 generalize한다.", "Annotation defect: code and contract may be correct while an intermediate assertion or invariant is inadequate."),
          b("logic limitation: verification condition은 valid하지만 current theorem prover가 필요한 induction, nonlinear arithmetic, quantified lemma를 찾지 못한다. lemma와 proof strategy를 제공한다.", "Logic limitation: a valid condition needs induction, nonlinear arithmetic, or quantified lemmas beyond the current prover."),
          b("model mismatch: proof model이 implementation의 overflow, abort, I/O, nondeterminism을 표현하지 않는다. assertion만 고칠 문제가 아니라 semantic domain과 rule set을 확장해야 한다.", "Model mismatch: overflow, aborts, effects, or nondeterminism are absent from the model, requiring semantic and rule extensions."),
        ),
        prose(
          b(
            "proof failure를 진단할 때 먼저 generated obligation이 false인지 unknown인지 구분한다. counterexample이 나오면 code, contract, annotation 중 하나가 실제로 맞지 않을 가능성이 크다. solver timeout이나 unsupported theory로 unknown이 나오면 claim이 false라고 결론낼 수 없다. lemma를 추가하거나 assertion theory를 바꾸거나 human proof를 제공해야 할 수 있다. formal workflow는 실패 원인도 typed하게 다룬다.",
            "Distinguish a false verification condition with a counterexample from an unknown result caused by solver limits. Unknown does not mean false and may require lemmas, a stronger theory, or human proof."
          ),
          b(
            "soundness theorem도 semantic assumptions에 상대적이다. expression이 total integer function이고 command가 deterministic state transformer라는 Chapter 2 model에서 증명한 AS/CD/WHT soundness를, exception이나 nondeterministic choice가 있는 language에 아무 수정 없이 옮길 수 없다. new outcome이 생기면 specification clause가 그 outcome을 성공, failure, divergence 중 무엇으로 분류하는지 정하고 각 rule을 다시 검토한다.",
            "Soundness is relative to a semantic model. Rules proved for total expressions and deterministic state transformers cannot simply be reused with exceptions or nondeterminism; new outcomes require new clauses and renewed rule proofs."
          ),
          b(
            "proof granularity에도 engineering tradeoff가 있다. 모든 assignment 사이 assertion을 수동으로 쓰면 certificate는 자세하지만 유지 비용이 커진다. weakest-precondition calculation이 mechanical한 straight-line region은 tool이 annotation을 생성하고, loop boundary나 abstraction boundary처럼 creative fact가 필요한 곳만 사람이 제공하는 방식이 일반적이다. 중요한 것은 자동 생성된 step도 trusted checker가 같은 rule로 검증한다는 점이다.",
            "Proof granularity is an engineering tradeoff. Tools can generate straight-line annotations mechanically while users supply creative loop and abstraction facts, with all steps still checked against the same trusted rules."
          ),
          b(
            "Chapter 3 calculus가 모든 실무 property를 표현하지는 않는다. memory safety, temporal response, information flow, probability, concurrency interference는 simple pre/post state relation보다 풍부한 logic을 요구한다. 하지만 contract meaning, compositional rule, annotation, verification condition, soundness를 분리하는 architecture는 separation logic, temporal logic, refinement type 같은 확장에서도 반복된다. 이 장의 가치는 특정 rule 목록과 함께 그 architecture를 배우는 데 있다.",
            "Simple pre/post relations do not express every practical property, but the architecture of contracts, compositional rules, annotations, verification conditions, and soundness persists in richer logics."
          )
        ),
      ],
      checkpoints: [
        b("sound proof system으로 wrong specification을 prove할 수 있는 이유를 예로 설명하라.", "How can a sound proof system prove a specification that is wrong as a statement of intent?"),
        b("relative completeness의 ‘relative’가 어떤 두 가정을 가리키는가?", "Which assumptions make relative completeness relative?"),
      ],
    },
    {
      id: "practice-workshop",
      covers: "Integrated practice · Chapter 3",
      minutes: 10,
      title: b("Practice workshop: turn programs into proof obligations", "Practice workshop: turn programs into proof obligations"),
      lead: b(
        "답을 먼저 계산하지 말고 specification form, rule instance, annotation, pure logical obligation을 층별로 적는다.",
        "Separate specification form, rule instance, annotation, and pure logical obligation before solving."
      ),
      blocks: [
        list(
          b("Exercises", "Exercises"),
          b("`[x=m] x:=x+2; y:=3*x [y=3*(m+2)]`를 두 AS와 SQ로 derive하고 intermediate assertion을 표시하라.", "Derive the straight-line specification with two AS instances and SQ, naming the intermediate assertion."),
          b("`while x<n do x:=x+2`에 postcondition `x≥n`을 주었을 때 partial invariant와 termination variant를 제안하라. parity 때문에 exact equality `x=n`이 항상 나오지 않는 이유도 말하라.", "Propose an invariant and variant for the loop, and explain why parity prevents an unconditional x=n result."),
          b("absolute-value conditional의 두 CD premise를 직접 쓰고 각 branch의 AS substitution 결과를 계산하라.", "Write both CD premisses for the absolute-value conditional and calculate each assignment substitution."),
          b("fast exponentiation의 odd branch를 right-to-left substitution으로 계산해 `y*x^z=A^N` preservation condition을 얻어라.", "Calculate the odd branch backward to obtain preservation of y·x^z=A^N.")
        ),
        example(
          b("Specification audit before proof", "Specification audit before proof"),
          b("‘x와 y 중 큰 값을 y에 저장한다’는 intent에 `[true] c [y=max(x,y)]`를 제안했다고 하자. derivation 전에 contract부터 검사한다.", "Audit `[true] c [y=max(x,y)]` against the intent to store the maximum of the initial x and y in y."),
          [
            b("postcondition 안의 x와 y는 모두 final state에서 읽힌다. initial pair를 기억하는 symbol이 전혀 없다.", "Both x and y in the postcondition denote final values; no symbol remembers the input pair."),
            b("command `x:=y` 뒤에는 final x=final y이므로 y=max(x,y)가 성립한다. 하지만 y에는 original maximum이 아니라 original y가 그대로 남을 수 있다.", "The command x:=y satisfies the written equality but need not put the original maximum in y."),
            b("command `y:=x`도 final pair가 같아져 specification을 만족하지만 original y가 더 컸던 input에서는 intended result를 잃는다.", "Likewise y:=x can satisfy the contract while losing a larger original y."),
            b("fresh logical variables X,Y로 input을 기억해 `[x=X∧y=Y] c [y=max(X,Y)]`라고 고친다.", "Remember the inputs with logical X,Y and write the corrected postcondition y=max(X,Y)."),
            b("x도 보존해야 한다면 `x=X`를 final postcondition에 추가한다. preservation requirement는 intent에 따라 별도로 명시해야 한다.", "If x must be preserved, add x=X explicitly; preservation is a separate requirement."),
            b("이제 `if x≥y then y:=x else skip`은 두 branch에서 desired postcondition을 establish하며 CD와 AS/SK로 prove할 수 있다.", "The intended conditional now proves by CD with AS and SK in its branches."),
          ],
          b("proof 가능성보다 contract adequacy가 먼저다. sound derivation은 빠진 old-value relation을 스스로 복구하지 않는다.", "Contract adequacy comes before provability; a sound derivation cannot restore an omitted old-value relation.")
        ),
        example(
          b("Backward proof of an in-place swap", "Backward proof of an in-place swap"),
          b("overflow가 없는 mathematical integer model에서 `[x=X∧y=Y] x:=x+y; y:=x-y; x:=x-y [x=Y∧y=X]`를 검토한다.", "Verify the arithmetic in-place swap under mathematical integers without overflow."),
          [
            b("final postcondition부터 last `x:=x-y`를 통과시키면 `(x-y)=Y∧y=X`가 된다.", "Push the final postcondition backward through the last assignment."),
            b("second `y:=x-y`를 substitute하면 `x-(x-y)=Y ∧ (x-y)=X`가 된다.", "Substitution through the second assignment yields x-(x-y)=Y and x-y=X."),
            b("first `x:=x+y`를 substitute하면 `(x+y)-((x+y)-y)=Y ∧ ((x+y)-y)=X`가 된다.", "Substitution through the first assignment replaces x by x+y in the entire requirement."),
            b("integer algebra로 first conjunct는 y=Y, second conjunct는 x=X로 simplify된다.", "Integer algebra simplifies the two conjuncts to y=Y and x=X."),
            b("given precondition x=X∧y=Y가 calculated requirement를 imply하므로 SP로 initial boundary를 연결한다.", "The supplied precondition implies the calculated requirement, so SP closes the initial boundary."),
            b("세 AS instance를 SQ의 derived repeated-assignment form으로 합치면 target total specification을 얻는다.", "Combine the three assignment instances using repeated sequential composition."),
            b("fixed-width machine arithmetic에서도 wraparound addition/subtraction이 같은 width로 일관되면 modular swap은 성립할 수 있지만, signed overflow가 undefined인 language에는 이 proof model을 그대로 적용할 수 없다.", "The machine-level validity depends on the language's overflow model, illustrating the model-fidelity check."),
          ],
          b("substitution nesting을 실행 순서와 반대로 정확히 적용하면 temporary가 없는 update의 data dependency도 mechanical하게 드러난다.", "Reverse-order substitution exposes the data dependencies of the temporary-free update mechanically.")
        ),
        example(
          b("Factorial as a second loop pattern", "Factorial as a second loop pattern"),
          b("`f:=1; while n>0 do (f:=f*n; n:=n-1)`이 initial N≥0,n=N에서 f=N!을 계산함을 conservation invariant로 증명한다.", "Prove factorial using a conservation invariant."),
          [
            b("final goal f=N!에서 loop 중 남은 work를 n!로 표현해 `f*n!=N!`을 candidate invariant로 잡는다.", "Represent remaining work by n! and choose f·n!=N! as the candidate invariant."),
            b("termination과 factorial definition을 위해 range conjunct n≥0을 추가한다. full invariant는 `n≥0∧f*n!=N!`이다.", "Add n≥0 for the factorial domain and termination measure."),
            b("initialization f:=1 뒤에는 `1*N!=N!`이므로 n=N∧N≥0에서 invariant가 establish된다.", "Initialization establishes the invariant because 1·N!=N!."),
            b("body target을 backward substitute하면 `(f*n)*(n-1)!=N!`과 n-1≥0을 요구한다.", "Backward substitution through the body produces the multiplication recurrence and next range requirement."),
            b("guard n>0과 source invariant에서 n≥1이고 `n!=(n)*(n-1)!`이므로 preservation implication이 valid하다.", "The guard and factorial recurrence prove preservation."),
            b("exit에서 n≥0∧¬(n>0)이므로 n=0이다. 0!=1을 넣으면 f=N!이 나온다.", "At exit n=0, and 0!=1 collapses the invariant to f=N!."),
            b("variant n은 guard 아래 nonnegative이고 body에서 exactly one 감소하며 assignment body는 terminate한다.", "Variant n is nonnegative under the guard and decreases by one; the body terminates."),
            b("이 invariant는 fast exponentiation과 같은 ‘accumulated result × remaining work = original goal’ pattern이다.", "The invariant has the same accumulated-result times remaining-work pattern as fast exponentiation."),
          ],
          b("서로 다른 algorithm에서도 conservation pattern을 인식하면 postcondition generalization을 처음부터 추측하는 부담이 줄어든다.", "Recognizing the conservation pattern makes invariant discovery reusable across algorithms.")
        ),
        example(
          b("Diagnosing a weak loop annotation", "Diagnosing a weak loop annotation"),
          b("`while k<n do k:=k+1`의 invariant로 `k≤n`만 적고 postcondition `k=n∧x=X`를 원한다고 하자.", "Diagnose the invariant k≤n for a loop whose postcondition also requires x=X."),
          [
            b("initialization VC가 p⇒k≤n을 만족한다면 entry는 통과한다. body preservation도 k<n에서 k+1≤n이므로 통과한다.", "Initialization and preservation may both succeed."),
            b("exit VC에서 k≤n∧¬(k<n)은 k=n을 충분히 준다. counter result에는 invariant strength가 맞다.", "At exit the invariant is strong enough to conclude k=n."),
            b("그러나 x=X는 invariant에 없으므로 exit implication이 그 conjunct를 만들 수 없다. failure는 usefulness 단계에서 나타난다.", "The missing x=X fact appears as a failed exit-usefulness implication."),
            b("body와 guard가 x를 assign하지 않는다면 constancy rule로 x=X를 loop contract에 frame할 수 있다.", "If the loop does not assign x, constancy can frame x=X around the loop proof."),
            b("또는 full invariant를 `k≤n∧x=X`로 쓰고 FA condition으로 x conjunct의 preservation을 따로 정당화한다.", "Alternatively include x=X in the full invariant and justify it using the assigned-variable condition."),
            b("variant n-k는 guard 아래 positive이고 body 뒤 one 감소해 total termination을 추가한다.", "The variant n-k adds the total-termination argument."),
            b("어느 VC가 실패했는지 알면 counter relation을 바꿀지, frame fact를 추가할지, progress measure를 고칠지 구체적으로 결정할 수 있다.", "The failed VC identifies whether to change the counter relation, add a frame fact, or repair progress."),
          ],
          b("invariant debugging은 무작정 condition을 더하는 일이 아니라 establishment, preservation, exit, termination의 실패 위치를 분류하는 과정이다.", "Invariant debugging classifies failure at establishment, preservation, exit, or termination rather than adding facts blindly.")
        ),
        callout(
          "proof",
          b("Audit order", "Audit order"),
          b(
            "(1) braces인지 brackets인지, (2) pre/postcondition의 variable이 어느 state를 읽는지, (3) outer command constructor에 맞는 rule인지, (4) intermediate assertion 또는 invariant가 충분한지, (5) variant가 guard 아래 lower bound와 strict decrease를 갖는지, (6) 마지막 implication이 pure Predicate Logic에서 valid한지 순서대로 확인한다.",
            "Check, in order: partial or total form; which state each variable denotes; the rule matching the outer command; adequacy of intermediate assertions and invariants; lower bound and strict decrease of the variant; and validity of the final pure logical implications."
          )
        ),
      ],
      checkpoints: [
        b("program proof에서 syntax-directed step과 creative annotation step을 각각 하나씩 들라.", "Name one syntax-directed step and one creative annotation step in a program proof."),
        b("verification condition에 command syntax가 남아 있다면 어떤 phase가 아직 끝나지 않은 것인가?", "If command syntax remains in a verification condition, which phase is unfinished?"),
      ],
    },
    {
      id: "chapter-synthesis",
      covers: "Chapter synthesis · pp. 54–80",
      minutes: 2,
      title: b("Connecting denotational semantics to mechanical proof", "Connecting denotational semantics to mechanical proof"),
      lead: b(
        "Chapter 3은 Chapter 1의 assertion과 Chapter 2의 state transformer를 proof judgment로 연결한다.",
        "Chapter 3 connects Chapter 1 assertions and Chapter 2 state transformers through proof judgments."
      ),
      blocks: [
        prose(
          b(
            "아래 연결에서 assignment rule의 soundness는 Chapter 1 Substitution Theorem과 Chapter 2 state-update equation을 잇는다. while rule의 soundness는 Chapter 2 finite approximant induction과 invariant preservation을 잇는다. 따라서 proof calculus는 semantics을 대체하지 않고, semantics에 대해 검증된 사용하기 쉬운 interface를 제공한다.",
            "In the chain below, assignment soundness joins the Chapter 1 substitution theorem to Chapter 2 state update; while soundness joins finite approximants to invariant preservation. The calculus is a usable interface validated against semantics, not a replacement for semantics."
          ),
          b(
            "실전 workflow는 contract를 먼저 검토하고, command tree를 따라 rule을 적용하고, sequence boundary와 loop에 annotation을 넣고, 생성된 Predicate Logic obligation을 증명하고, 마지막으로 model이 실제 failure mode를 포함하는지 확인하는 것이다. 이 순서를 지키면 ‘proof가 실패했다’는 한 문장을 code, specification, annotation, logic, model의 서로 다른 문제로 분해할 수 있다.",
            "The practical workflow is to review the contract, follow the command tree with rules, supply annotations at sequence and loop boundaries, prove the generated predicate-logic obligations, and finally check model fidelity. This separates failures of code, specification, annotation, logic, and model."
          )
        ),
        notation(
          b("The Chapter 3 proof pipeline", "The Chapter 3 proof pipeline"),
          "assertion → pre/postcondition → specification → inference-rule derivation → soundness → semantic validity",
          b(
            "위 사슬은 state를 기술하는 assertion에서 시작해 program contract, finite derivation, soundness theorem을 거쳐 semantic validity로 도달한다. 두 줄로 나눈 것은 표시를 위한 것이며 논리적 순서는 하나다.",
            "The chain starts with assertions over states and proceeds through program contracts, finite derivations, and soundness to semantic validity. The line break is typographic; the logical order is continuous."
          ),
          "\\begin{gathered}\\text{assertion}\\to\\text{pre/postcondition}\\to\\text{specification}\\\\\\text{inference-rule derivation}\\to\\text{soundness}\\to\\text{semantic validity}\\end{gathered}"
        ),
        callout(
          "key",
          b("Bridge to Chapter 4", "Bridge to Chapter 4"),
          b(
            "Chapter 4는 scalar variable 대신 array value를 state에 넣는다. array assignment는 단순한 scalar substitution이 아니라 functional update를 assertion에 반영해야 하고, binary search invariant는 candidate interval 전체를 quantifier로 기술한다. Chapter 3의 contract/rule/invariant workflow는 유지되지만 state model과 assertion language가 함께 확장된다.",
            "Chapter 4 adds arrays to states. Array assignment requires functional update rather than scalar substitution, and binary-search invariants quantify over candidate intervals. The Chapter 3 workflow remains, while state and assertion languages expand together."
          )
        ),
        list(
          b("What you should be able to explain after Chapter 3", "What you should be able to explain after Chapter 3"),
          b("왜 `{p}c{q}`의 braces가 termination을 약속하지 않고, `[p]c[q]`의 brackets가 bottom을 제외하는지 semantic clause로 설명할 수 있어야 한다.", "Explain from the semantic clauses why braces permit divergence and brackets exclude bottom."),
          b("왜 old program value를 postcondition의 같은 variable name으로 쓸 수 없고 fresh logical variable 또는 ghost notation으로 기억해야 하는지 설명할 수 있어야 한다.", "Explain why old program values require fresh logical names or ghost notation."),
          b("semantic validity `⊨`와 syntactic derivability `⊢`를 정의하고 soundness와 completeness의 implication 방향을 혼동 없이 말할 수 있어야 한다.", "Define semantic validity and syntactic derivability and state both metatheorem directions."),
          b("assignment rule이 postcondition에서 backward substitution을 수행하는 이유를 state update equation과 Substitution Theorem으로 연결할 수 있어야 한다.", "Connect backward assignment substitution to state update and the Substitution Theorem."),
          b("`c₀;c₁`의 semicolon이 나타내는 execution boundary와 SQ의 intermediate assertion이 설명하는 proof boundary가 같은 state임을 말할 수 있어야 한다.", "Identify the execution boundary of the semicolon with the proof boundary described by the intermediate assertion."),
          b("SP에서 precondition을 stronger하게 하고 WC에서 postcondition을 weaker하게 하는 방향을 state-set inclusion으로 검산할 수 있어야 한다.", "Check SP and WC directions using inclusion of state sets."),
          b("loop invariant의 establishment, preservation, exit usefulness와 loop variant의 lower bound, strict decrease, body termination을 별도 obligation으로 쓸 수 있어야 한다.", "Write the invariant and variant obligations separately."),
          b("WHT의 fresh ghost variable이 iteration 시작 measure를 기억하며 program execution에는 storage나 assignment를 추가하지 않는다는 점을 설명할 수 있어야 한다.", "Explain how WHT's fresh ghost variable remembers an old measure without changing execution."),
          b("Fibonacci의 consecutive-pair invariant를 recurrence에서 derive하고 temporary assignment가 old pair를 보존하는 방식을 substitution으로 검증할 수 있어야 한다.", "Derive and verify the Fibonacci consecutive-pair invariant."),
          b("fast exponentiation의 conservation invariant를 odd/even exponent law로 preserve하고 variant z로 finite termination을 증명할 수 있어야 한다.", "Preserve the fast-exponentiation invariant in both parity cases and prove termination with z."),
          b("formal proof failure를 code, contract, annotation, logic, model 문제로 분류하고 counterexample과 solver unknown을 다르게 해석할 수 있어야 한다.", "Classify proof failures and distinguish counterexamples from solver unknowns."),
          b("relative completeness가 expressive assertion language와 complete underlying assertion reasoning에 상대적이며 automatic decision procedure를 뜻하지 않음을 설명할 수 있어야 한다.", "Explain why relative completeness assumes expressive assertions and complete underlying reasoning rather than an automatic decision procedure."),
        ),
      ],
      checkpoints: [
        b("Chapter 1, 2, 3이 각각 assignment rule의 soundness에 제공하는 요소는 무엇인가?", "What does each of Chapters 1, 2, and 3 contribute to assignment-rule soundness?"),
        b("proof calculus가 denotational semantics을 대체하지 않는 이유는?", "Why does the proof calculus not replace denotational semantics?"),
      ],
    },
  ],
};
