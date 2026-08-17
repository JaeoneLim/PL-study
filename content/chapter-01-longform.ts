import { b, type Bilingual } from "./types";
import type {
  ChapterLongform,
  LessonCalloutBlock,
  LessonExampleBlock,
  LessonListBlock,
  LessonNotationBlock,
  LessonProseBlock,
} from "./longform-types";

const prose = (...paragraphs: Bilingual[]): LessonProseBlock => ({ kind: "prose", paragraphs });
const list = (title: Bilingual | undefined, ...items: Bilingual[]): LessonListBlock => ({ kind: "list", title, items });
const notation = (title: Bilingual, source: string, explanation: Bilingual, latex?: string): LessonNotationBlock => ({
  kind: "notation",
  title,
  notation: source,
  latex,
  explanation,
});
const example = (
  title: Bilingual,
  setup: Bilingual,
  steps: Bilingual[],
  conclusion: Bilingual,
): LessonExampleBlock => ({ kind: "example", title, setup, steps, conclusion });
const callout = (
  tone: LessonCalloutBlock["tone"],
  title: Bilingual,
  ...paragraphs: Bilingual[]
): LessonCalloutBlock => ({ kind: "callout", tone, title, paragraphs });

export const predicateLogicLongform: ChapterLongform = {
  slug: "predicate-logic",
  readingMinutes: 60,
  minimumKoreanCharacters: 12000,
  title: b("1장 완전 학습 본문", "Chapter 1 complete study text"),
  introduction: [
    b(
      "이 본문은 교재 1장의 순서를 따라가되 문장을 옮겨 적는 번역본이 아니라, 정의가 왜 필요한지부터 계산과 증명에 어떻게 쓰이는지까지 독립적으로 풀어 쓴 학습 해설이다. 앞의 절을 이해해야 뒤의 절이 자연스럽게 이어지므로 처음 읽을 때는 순서대로 진행하는 편이 좋다.",
      "This is an independently written study explanation that follows the conceptual order of Chapter 1. Rather than reproducing the textbook, it develops why each definition is needed and how it is used in calculations and proofs. The sections are cumulative, so a first reading should proceed in order."
    ),
    b(
      "1장의 목적은 술어 논리 자체를 깊이 공부하는 데만 있지 않다. 익숙한 논리를 실험대로 삼아 언어 이론의 네 도구, 곧 abstract syntax·denotational semantics·추론 규칙·바인딩을 정확히 분리하는 것이 핵심이다. 2장 이후에는 대상 언어만 바뀌고 이 네 질문이 계속 돌아온다. 어떤 syntax을 허용하는가, 그 syntax은 무엇을 뜻하는가, 어떤 주장을 규칙으로 증명할 수 있는가, 이름의 범위와 치환은 의미를 어떻게 보존하는가를 묻는 습관이 이 장의 진짜 성과다.",
      "The goal is not merely to review predicate logic. A familiar logic serves as a laboratory for four tools—abstract syntax, denotational semantics, inference rules, and binding. Later chapters change the object language but repeatedly ask the same questions: which phrases exist, what they mean, what can be proved by rules, and how scope and substitution preserve meaning."
    ),
    b(
      "스터디에서 함께 말하고 검색할 때 표현이 어긋나지 않도록 syntax, semantics, statement, assertion, constructor는 한국어로 옮기지 않고 영문 표기를 유지한다. 파생 표현도 abstract syntax, denotational semantics, syntax-directed처럼 해당 분야에서 통용되는 영문 형태를 쓴다.",
      "To keep discussion and search vocabulary consistent across the study group, the Korean edition preserves syntax, semantics, statement, assertion, and constructor in English, including standard compounds such as abstract syntax, denotational semantics, and syntax-directed."
    ),
  ],
  sections: [
    {
      id: "why-logic",
      covers: "도입 · pp. 1",
      minutes: 4,
      title: b("왜 프로그래밍 언어 책이 술어 논리로 시작하는가", "Why a programming-languages book begins with predicate logic"),
      lead: b(
        "낯선 방법을 익숙한 대상에 먼저 적용하면 방법 자체를 선명하게 볼 수 있다.",
        "Applying unfamiliar methods to a familiar object makes the methods themselves easier to see."
      ),
      blocks: [
        prose(
          b(
            "프로그래밍 언어를 엄밀하게 설명하려면 소스 코드를 읽는 직관만으로는 부족하다. 같은 프로그램도 표면 표기, 파싱된 구조, 수학적 의미, 실행 규칙, 증명 체계라는 여러 층에서 볼 수 있기 때문이다. 이 층들을 한꺼번에 다루면 괄호를 어디에 붙이는 문제와 프로그램이 무엇을 계산하는 문제, 계산이 옳다는 것을 어떻게 보이는 문제가 뒤섞인다. 1장은 이들을 의도적으로 분리한 다음 서로 연결한다.",
            "A rigorous account of a programming language needs more than intuition about source code. The same program has surface notation, parsed structure, mathematical meaning, execution rules, and a proof system. Chapter 1 deliberately separates these layers and then reconnects them."
          ),
          b(
            "술어 논리는 이 작업에 알맞은 첫 대상이다. 첫째, 정수식과 논리식은 이미 익숙하므로 새 표기보다 설명 방법에 집중할 수 있다. 둘째, 이 장의 논리식은 언제나 정수나 진릿값을 내므로 비종료와 부분 정보라는 어려움을 잠시 미룰 수 있다. 셋째, 3장에서 명령형 프로그램의 사전조건과 사후조건을 바로 이 assertion language로 적게 된다. 따라서 1장은 예비 지식이면서 동시에 이후 증명 체계의 실제 부품이다.",
            "Predicate logic is a good first object for three reasons. Its arithmetic and logical notation are familiar; every expression receives an ordinary value, postponing divergence and partial information; and the assertion language becomes the specification language for imperative programs in Chapter 3."
          ),
          b(
            "이 책의 용어는 전통 논리학과 조금 다르다. 논리학의 항(term)은 정수식(integer expression), 잘 형성된 공식은 assertion, 변수에 값을 배정하는 assignment는 상태(state)라고 부른다. 이런 명칭은 곧 등장할 프로그래밍 언어와 어휘를 맞추려는 선택이다. 여기서 상태는 프로그램 메모리를 아직 뜻하지 않고, 각 변수 이름에 정수 하나를 대응시키는 함수다.",
            "The terminology is chosen to align logic with later programming languages: terms become integer expressions, formulas become assertions, and assignments of values to variables become states. At this point a state is simply a function from variable names to integers, not yet a machine store."
          )
        ),
        list(
          b("앞으로 모든 언어에 던질 네 질문", "Four questions to ask of every later language"),
          b("syntax: 어떤 종류의 구절이 있으며 어떤 constructor로 만들어지는가?", "Syntax: What kinds of phrases exist, and which constructors build them?"),
          b("semantics: 각 구절은 어떤 수학적 대상을 나타내는가?", "Semantics: What mathematical object does each phrase denote?"),
          b("증명: 어떤 형식의 판단을 어떤 규칙으로 유도할 수 있는가?", "Proof: What judgments can be derived, and by which rules?"),
          b("바인딩: 이름을 묶는 syntax은 범위·자유 변수·치환을 어떻게 바꾸는가?", "Binding: How do binders affect scope, free variables, and substitution?")
        ),
        callout(
          "key",
          b("읽는 관점", "Reading lens"),
          b(
            "이 장에서 나오는 정의를 논리학 상식의 반복으로 넘기지 말자. 각각은 뒤에서 명령, 함수, 타입, 모듈을 설명할 때 그대로 재사용되는 설계 패턴이다. 특히 ‘syntax을 먼저 정하고, 그 구조를 따라 의미 함수를 정의한다’는 순서는 책 전체의 뼈대다.",
            "Do not treat the definitions as a review of elementary logic. Each is a design pattern reused for commands, functions, types, and modules. The sequence ‘define syntax, then follow that structure when defining meaning’ is the spine of the book."
          )
        )
      ],
      checkpoints: [
        b("술어 논리에서는 당장 다루지 않아도 되지만 2장에서 반드시 추가해야 하는 계산 현상은 무엇인가?", "Which computational phenomenon can be postponed in predicate logic but must be added in Chapter 2?"),
        b("전통 논리학의 term, formula, assignment를 이 책은 각각 무엇이라 부르는가?", "What names does this book use for term, formula, and assignment?")
      ],
    },
    {
      id: "syntax-directed-semantics",
      covers: "§1.2 · pp. 9–12",
      minutes: 6,
      title: b("syntax-directedness, 유일성, 합성성", "Syntax direction, uniqueness, and compositionality"),
      lead: b(
        "의미 방정식은 예시 계산법의 모음이 아니라 모든 구절에 정확히 하나의 의미를 주는 재귀 정의다.",
        "Semantic equations are not a collection of examples; they recursively assign exactly one meaning to every phrase."
      ),
      blocks: [
        prose(
          b(
            "아무 방정식이나 의미 정의가 되는 것은 아니다. 이 책에서 의미 방정식은 두 조건을 지킨다. 첫째, 추상 문법의 생산 규칙마다 대응하는 방정식이 하나씩 있어야 한다. 둘째, 구성된 구절의 의미는 직접 부분구절의 의미만으로 계산되어야 한다. 변수처럼 미리 주어진 종류는 부분구절 자체를 사용할 수 있다. 이 대응 때문에 어떤 구절을 만나도 최상위 constructor를 보고 적용할 방정식을 바로 고를 수 있다.",
            "Not every collection of equations defines semantics. There must be one equation per syntactic production, and the meaning of a constructed phrase must be computed only from the meanings of its immediate subphrases, except for predefined items such as variable names."
          ),
          b(
            "이런 정의를 syntax-directed 또는 준동형적(homomorphic)이라고 한다. 이름은 의미 계산의 재귀 모양이 syntax tree의 모양을 그대로 따른다는 뜻이다. 덧셈 노드에서는 두 자식의 정수 의미를 더하고, 논리곱 노드에서는 두 자식의 진릿값을 논리곱하며, 수량자 노드에서는 본문의 의미를 갱신된 상태들에 적용한다. syntax structure와 의미 계산 구조가 평행하다.",
            "Such a definition is syntax-directed, or homomorphic: recursion in the semantic function follows the syntax tree. Addition combines integer meanings; conjunction combines Boolean meanings; a quantifier applies its body meaning to updated states."
          )
        ),
        callout(
          "proof",
          b("왜 해가 정확히 하나인가", "Why the solution is unique"),
          b(
            "구절 깊이에 대한 귀납법을 생각하자. 깊이 0에는 구절이 없어 자명하다. 깊이 `j+1`의 구절 `p`는 유한 생성 조건 때문에 어떤 constructor로 만들어졌다. 서로소 치역 때문에 그 constructor의 종류가 하나뿐이고, 단사성 때문에 직접 부분구절도 하나의 튜플로 정해진다. 각 부분구절은 더 얕으므로 귀납가정에 따라 의미가 유일하다. 해당 constructor에 대응하는 의미 방정식이 그 의미들을 결합하는 방법을 하나로 정하므로 `p`의 의미도 유일하다.",
            "Induct on phrase depth. A phrase at depth `j+1` has one outer constructor by disjoint ranges and one tuple of children by injectivity. The children have unique meanings by induction, and the one semantic equation for that constructor uniquely combines them."
          ),
          b(
            "존재성도 같은 논증에서 얻는다. constructor와 부분구절을 분해할 수 있고, 부분구절 의미가 이미 존재하며, 오른쪽의 메타언어 연산이 값을 돌려주므로 새 의미가 존재한다. 따라서 syntax 집합이 초기 대수이고 의미 함수가 목표 대수로 가는 유일한 준동형이라는 대수적 statement와 깊이 귀납 설명은 같은 사실의 두 얼굴이다.",
            "The same argument gives existence. This depth-induction account is the concrete face of the algebraic statement that syntax is initial and semantics is its unique homomorphism into the chosen target algebra."
          )
        ),
        prose(
          b(
            "syntax-directedness은 합성성(compositionality)을 낳는다. 합성적 semantics에서는 전체 의미가 직접 부분구절의 의미만으로 정해진다. 부분구절이 얼마나 길었는지, 어떤 변수 이름을 썼는지, 어떤 과정을 거쳐 만들어졌는지처럼 의미 이외의 속성을 엿보지 않는다. 그 결과 어떤 문맥 안의 부분구절을 의미가 같은 다른 구절로 바꾸어도 전체 의미가 변하지 않는다.",
            "Syntax direction yields compositionality: a whole phrase depends only on the denotations of its immediate children. Consequently, replacing a subphrase by another with the same denotation preserves the meaning of every enclosing context."
          ),
          b(
            "예를 들어 모든 상태에서 `e`와 `e'`가 같은 정수를 낸다면 `e+1<10`, `∀x. e=x`, `e=e∧p`처럼 `e`를 품은 어떤 올바른 syntactic context에서도 `e'`로 바꾸어 의미를 보존한다. 이 대체 원리는 최적화의 정확성, 등식 추론, 모듈 구현 교체를 뒷받침한다. 다만 ‘현재 한 상태에서 값이 같다’가 아니라 의미 함수 전체가 같아야 함에 주의하자.",
            "If `e` and `e'` return the same integer in every state, replacing one with the other in any well-formed context preserves meaning. This supports optimization, equational reasoning, and implementation replacement. Equality in one state is not enough; the entire denotation must agree."
          )
        ),
        example(
          b("의미 동치와 문맥 대체", "Semantic equivalence and contextual replacement"),
          b("정수식 `x+0`과 `x`는 모든 상태에서 같은 의미를 갖는다.", "The integer expressions `x+0` and `x` have equal denotations in every state."),
          [
            b("임의의 `σ`에서 `⟦x+0⟧σ = σ(x)+0 = σ(x) = ⟦x⟧σ`다.", "For arbitrary `σ`, `⟦x+0⟧σ = σ(x)+0 = σ(x) = ⟦x⟧σ`."),
            b("따라서 문맥 `[-]×y<z`에 넣은 `(x+0)×y<z`와 `x×y<z`도 같은 assertion 의미를 갖는다.", "Putting either expression in the context `[-]×y<z` produces equivalent assertions."),
            b("문맥이 여러 층이어도 각 층의 의미 방정식이 부분 의미만 사용하므로 동치가 바깥까지 전달된다.", "The equivalence propagates through arbitrarily many context layers because each equation uses only child meanings.")
          ],
          b("합성성은 ‘동일 의미를 동일하게 취급한다’는 교체 가능성을 수학적으로 보장한다.", "Compositionality mathematically guarantees substitutability of equal meanings.")
        ),
        prose(
          b(
            "의미 방정식에는 대상 언어와 메타언어가 동시에 등장한다. `⟦e₀+e₁⟧σ = ⟦e₀⟧σ + ⟦e₁⟧σ`에서 괄호 안의 `+`는 정의할 언어의 constructor이고, 괄호 밖의 `+`는 이미 알고 있는 정수 덧셈이다. 대상 언어(object language)는 설명 대상, 메타언어(metalanguage)는 설명을 적는 수학 언어다. `e`, `p`, `σ`, `n`은 대상 언어에 실제로 쓰이는 변수가 아니라 구절·상태·정수를 가리키는 메타변수다.",
            "Semantic equations mix object language and metalanguage. In `⟦e₀+e₁⟧σ = ⟦e₀⟧σ + ⟦e₁⟧σ`, the `+` inside brackets is an object-language constructor; the one outside is mathematical integer addition. Symbols such as `e`, `p`, `σ`, and `n` are metavariables."
          ),
          b(
            "대상 언어의 기능을 매우 비슷한 메타언어 기능으로 설명하는 방식을 메타순환적(metacircular)이라고 한다. 익숙한 정수 덧셈에는 간결하고 유용하지만, 메타언어 연산을 잘못 이해하면 오해가 그대로 대상 언어로 전달된다. 그래서 낯선 연산은 진리표나 별도 수학 정의로 풀어야 한다. 인터프리터가 구현 언어의 함수 호출로 대상 언어의 함수 호출을 설명할 때도 같은 위험이 생긴다.",
            "Explaining an object-language feature with an analogous metalanguage feature is metacircular. It is concise for familiar arithmetic but can merely transfer misunderstandings. Unfamiliar operations should be made explicit, for example by truth tables."
          )
        ),
        callout(
          "warning",
          b("0으로 나누기라는 균열", "The crack exposed by division by zero"),
          b(
            "이 장의 의미 함수 형식은 모든 정수식이 모든 상태에서 정수 하나를 내야 한다고 약속한다. 그러나 보통의 정수 나눗셈과 나머지는 제수가 0이면 값이 없다. 이를 무시하면 의미 함수가 실제로는 전체 함수가 아니다. 지금은 문제를 보류하지만, 2장에서는 오류와 비종료를 의미 영역에 어떻게 반영할지 다시 묻는다. 의미의 공역을 먼저 정하는 일이 언어 설계상의 오류 정책까지 강제한다는 좋은 사례다.",
            "The declared semantic type says every expression returns an integer in every state, but ordinary division and remainder are undefined when the divisor is zero. Chapter 1 postpones this mismatch; later semantics must decide how errors and divergence appear in the result domain."
          )
        )
      ],
      checkpoints: [
        b("syntax-directed 의미 방정식의 두 조건을 말하고, 각각이 빠졌을 때 생길 문제를 설명하라.", "State the two requirements on syntax-directed equations and explain what can fail without each."),
        b("‘한 상태에서 값이 같다’와 ‘두 식의 의미가 같다’를 구분하는 반례를 만들어 보라.", "Construct an example distinguishing equality in one state from equality of denotations."),
        b("메타순환성이 간결하면서도 위험한 이유는 무엇인가?", "Why is metacircularity both concise and potentially dangerous?")
      ],
    },
    {
      id: "validity-inference",
      covers: "§1.3 · pp. 12–15",
      minutes: 8,
      title: b("상태에서의 참, 타당성, 형식 증명", "Truth in a state, validity, and formal proof"),
      lead: b(
        "semantics이 무엇이 참인지 정한다면, 추론 체계는 무엇을 규칙으로 증명할 수 있는지 정한다.",
        "Semantics determines what is true; an inference system determines what can be proved by rules."
      ),
      blocks: [
        prose(
          b(
            "assertion `p`가 한 상태 `σ`에서 참이라는 것은 `⟦p⟧σ=true`라는 뜻이다. ‘`p`가 `σ`를 기술한다’, ‘`σ`가 `p`를 만족한다’도 같은 말이다. 반면 `p`가 타당(valid)하다는 것은 모든 상태에서 참이라는 뜻이다. `x>0`은 어떤 상태에서는 참이지만 타당하지 않다. `x=x`와 `x+0=x`는 모든 상태에서 참이므로 타당하다. 모든 상태에서 거짓인 assertion은 만족 불가능(unsatisfiable)하다고 한다.",
            "An assertion is true in a state `σ` when its denotation there is true. It is valid when true in every state. Thus `x>0` may be true but is not valid; `x=x` is valid. An assertion false in every state is unsatisfiable."
          ),
          b(
            "`p₀ ⇒ p₁`이 타당하면 `p₀`를 만족하는 모든 상태가 `p₁`도 만족한다. 이때 `p₀`가 `p₁`보다 강하고, `p₁`이 `p₀`보다 약하다고 한다. 강한 조건일수록 허용하는 상태 집합이 작다. `false`는 아무 상태도 허용하지 않으므로 모든 assertion보다 강하고, `true`는 모든 상태를 허용하므로 모든 assertion보다 약하다. 두 assertion이 서로보다 강하면 같은 상태 집합을 기술하므로 의미적으로 동치다.",
            "If `p₀ ⇒ p₁` is valid, every state satisfying `p₀` also satisfies `p₁`; `p₀` is stronger and `p₁` weaker. Stronger assertions admit fewer states. `false` is strongest, `true` weakest. Mutual strength is semantic equivalence."
          )
        ),
        notation(
          b("assertion을 상태 집합으로 읽기", "Reading assertions as sets of states"),
          "Sat(p) = { σ ∈ Σ | ⟦p⟧assert σ = true }\np₀ is stronger than p₁  ⇔  Sat(p₀) ⊆ Sat(p₁)\np₀ ≡ p₁                 ⇔  Sat(p₀) = Sat(p₁)\nSat(false) = ∅\nSat(true)  = Σ",
          b(
            "‘강하다’는 말이 역방향처럼 느껴질 수 있지만 정보량으로 보면 자연스럽다. `x=3`은 `x>0`보다 더 많은 정보를 주고 더 적은 상태만 남긴다.",
            "The order may feel reversed, but it follows information content: `x=3` says more than `x>0` and therefore leaves fewer possible states."
          ),
          String.raw`\begin{aligned}
\operatorname{Sat}(p)
  &= \{\sigma\in\Sigma\mid \llbracket p\rrbracket_{\mathit{assert}}\sigma=\mathsf{true}\} \\[5pt]
p_0\ \text{is stronger than}\ p_1
  &\Longleftrightarrow \operatorname{Sat}(p_0)\subseteq\operatorname{Sat}(p_1) \\
p_0\equiv p_1
  &\Longleftrightarrow \operatorname{Sat}(p_0)=\operatorname{Sat}(p_1) \\[5pt]
\operatorname{Sat}(\mathsf{false})&=\varnothing,\qquad
\operatorname{Sat}(\mathsf{true})=\Sigma
\end{aligned}`
        ),
        prose(
          b(
            "추론 규칙은 0개 이상의 전제와 하나의 결론으로 이루어진 틀이다. 전제와 결론에는 구체 assertion 대신 적절한 구절을 받을 메타변수가 들어갈 수 있다. 메타변수에 실제 대상 언어 구절을 넣으면 규칙의 인스턴스가 된다. 전제가 하나도 없는 규칙은 공리 스키마이고, 메타변수마저 없어 가능한 인스턴스가 하나뿐이면 단순히 공리라고 한다. 부가 조건이 붙은 규칙은 그 조건을 만족하는 교체만 인스턴스로 인정한다.",
            "An inference rule is a schema with zero or more premises and one conclusion. Replacing metavariables by suitable object-language phrases gives an instance. A zero-premise rule is an axiom schema; without metavariables it is simply an axiom."
          ),
          b(
            "형식 증명은 각 줄이 앞선 줄들을 전제로 하는 어떤 규칙 인스턴스의 결론인 유한한 assertion 열이다. 마지막 줄이 증명한 assertion이다. 같은 내용을 증명 트리로 그리면 결론이 아래 뿌리에 있고 그 규칙의 전제 증명들이 위쪽 가지가 된다. 트리는 의존 구조를 직접 보여 주지만 큰 증명은 넓어지므로 실제 문서에서는 번호가 매겨진 열과 규칙 주석을 자주 쓴다.",
            "A formal proof is a finite sequence in which every line concludes a rule instance whose premises appeared earlier. A proof tree displays the same dependency structure directly, though sequences scale better typographically."
          )
        ),
        example(
          b("규칙, 인스턴스, 증명 단계 구분", "Distinguishing a rule, an instance, and a proof step"),
          b("대칭성 스키마와 전건 긍정형 규칙을 단순화해 사용한다.", "Use a symmetry schema and a modus-ponens-shaped rule."),
          [
            b("공리 스키마: 임의의 정수식 `e₀,e₁`에 대해 `(e₀=e₁) ⇒ (e₁=e₀)`.", "Axiom schema: `(e₀=e₁) ⇒ (e₁=e₀)` for arbitrary integer expressions."),
            b("한 인스턴스: `(x+0=x) ⇒ (x=x+0)`.", "One instance: `(x+0=x) ⇒ (x=x+0)`."),
            b("이미 `x+0=x`를 증명했다면 두 전제를 연결하는 규칙으로 `x=x+0`을 결론 내릴 수 있다.", "Given a proof of `x+0=x`, modus ponens yields `x=x+0`."),
            b("마지막으로 타당한 assertion을 전칭 일반화하는 규칙을 적용해 `∀x. x=x+0`을 얻을 수 있다.", "Universal generalization of the valid assertion yields `∀x. x=x+0`.")
          ],
          b(
            "스키마는 무한히 많은 규칙 인스턴스를 압축하고, 증명은 그 인스턴스들을 유한 번 연결한다.",
            "A schema compresses infinitely many instances; a proof connects finitely many of them."
          )
        ),
        callout(
          "key",
          b("건전성은 syntax과 의미 사이의 다리", "Soundness bridges syntax and semantics"),
          b(
            "규칙이 건전하다는 것은 모든 인스턴스에서 전제들이 모두 타당하면 결론도 타당하다는 뜻이다. 모든 규칙이 건전하면 공리에서 시작해 규칙을 유한 번 적용한 모든 증명 줄이 타당하다. 즉 `⊢p`이면 `⊨p`다. 건전성은 증명기가 거짓을 증명하지 않는다는 보증이지, 모든 참을 반드시 증명한다는 보증은 아니다.",
            "A rule is sound when every instance preserves validity from all premises to its conclusion. If every rule is sound, derivability implies validity: `⊢p` entails `⊨p`. Soundness prevents false theorems; it does not guarantee that every truth is derivable."
          ),
          b(
            "규칙의 건전성 증명도 의미 방정식을 사용한다. 임의의 상태를 하나 잡고, 전제의 타당성으로 그 상태에서 전제들이 참임을 얻은 뒤, 연결사의 진리표나 수량자의 의미 방정식으로 결론이 참임을 보인다. 상태가 임의였으므로 결론이 모든 상태에서 참이다. 이 ‘임의의 상태’ 단계가 빠지면 타당성 대신 특정 상태의 참만 증명하게 된다.",
            "A soundness proof fixes an arbitrary state, invokes validity of the premises there, and uses semantic equations to establish the conclusion. Because the state was arbitrary, the conclusion is valid."
          )
        ),
        callout(
          "warning",
          b("추론과 함의를 혼동하지 않기", "Do not confuse inference with implication"),
          b(
            "함의 `p⇒q`는 한 assertion 안의 대상 언어 연결사이며 한 상태에서 진릿값을 갖는다. 추론 `p / q`는 두 증명 단계 사이의 메타언어 관계다. 한 상태에서 `p`가 참이라고 해서 그 상태에서 `∀x.p`도 참인 것은 아니므로 ‘현재 참인 `p`에서 `∀x.p`를 결론 내린다’는 읽기는 틀리다. 전칭 일반화 규칙이 건전한 이유는 전제 `p`가 한 상태에서 참이어서가 아니라 모든 상태에서 타당하다고 가정하기 때문이다.",
            "Implication `p⇒q` is an object-language connective with a truth value in one state. Inference is a metalanguage relationship between proof steps. Universal generalization relies on validity of its premise, not mere truth in the current state."
          )
        ),
        prose(
          b(
            "완전성은 건전성의 반대 방향이다. 의미적으로 타당한 모든 assertion이 규칙으로 증명 가능하면 추론 체계가 완전하다. 여기서는 정수 산술 연산의 의미를 고정했기 때문에 산술적 타당성 전체를 유한 규칙으로 포착할 수 없다는 불완전성 문제가 생긴다. 반면 연산 해석까지 임의로 바꾸어도 참인 논리적 타당성에는 완전한 일차 논리 계산이 존재한다. 프로그램 검증에서는 보통 실제 정수 연산을 고정해야 하므로, 논리 규칙만으로 모든 산술 사실을 해결하겠다는 기대를 버리고 필요한 산술 추론을 별도 이론이나 자동화에 맡긴다.",
            "Completeness asks the converse: is every semantically valid assertion derivable? With fixed integer arithmetic, no finite rule set captures every arithmetical truth. First-order logical validity under arbitrary interpretations has complete calculi, but program verification normally fixes the intended arithmetic and uses additional mathematical reasoning or automation."
          )
        )
      ],
      checkpoints: [
        b("`x=3`, `x>0`, `true`를 강한 순서부터 나열하고 상태 집합 포함 관계로 정당화하라.", "Order `x=3`, `x>0`, and `true` from strongest to weakest and justify the order by state-set inclusion."),
        b("건전성과 완전성을 각각 `⊢`와 `⊨`를 사용해 한 줄로 써 보라.", "Write soundness and completeness as implications using `⊢` and `⊨`."),
        b("왜 `x>0`은 형식 증명의 독립된 한 줄로 올 수 없지만 `(x>0)⇒(x≥0)`은 올 수 있는가?", "Why cannot `x>0` appear as a standalone proof line while `(x>0)⇒(x≥0)` can?")
      ],
    },
    {
      id: "abstract-grammar",
      covers: "§1.1 · pp. 1–3",
      minutes: 6,
      title: b("문자열과 syntax structure를 분리하기", "Separating strings from syntactic structure"),
      lead: b(
        "프로그램은 문자로 입력되지만 의미가 붙는 대상은 문자 배열이 아니라 파싱된 syntax structure다.",
        "Programs arrive as characters, but semantics is assigned to parsed syntactic structure rather than raw strings."
      ),
      blocks: [
        prose(
          b(
            "자연수 12는 문자 ‘1’과 ‘2’의 연결 그 자체가 아니다. 십진 문자열, 이진 문자열, 로마 숫자는 같은 수를 서로 다르게 나타낸다. 마찬가지로 `x + y`, `add(x,y)`, 루트가 `+`인 트리는 하나의 덧셈 구조를 다른 방식으로 표현한다. 의미 함수를 문자 위치와 괄호 개수에 맞추어 정의하면 표현을 바꿀 때마다 semantics도 다시 써야 한다. 그래서 semantics의 입력은 구체 문자열이 아니라 추상 구절이어야 한다.",
            "The natural number twelve is not identical to the characters ‘1’ and ‘2’; decimal, binary, and Roman notation can represent the same number. Likewise, `x + y`, `add(x,y)`, and a tree rooted at `+` can represent one addition structure. Semantic functions should consume abstract phrases rather than character positions and parentheses."
          ),
          b(
            "보통의 문맥 자유 문법은 어떤 문자열이 허용되는지 말하는 데 훌륭하지만, syntax structure와 표기상의 선택을 함께 적는다. 변수의 철자, 연산자가 앞에 오는지 가운데 오는지, 우선순위와 결합 방향은 파서에는 중요해도 덧셈이라는 구성의 본질은 아니다. 추상 문법은 비단말 기호와 부분구절의 배열로 구조를 드러내면서도, 사람이 읽을 최소한의 표기를 곁들인 절충 형식이다.",
            "A context-free grammar is excellent for recognizing strings but mixes structural information with representational choices: spelling, prefix versus infix notation, precedence, and associativity. An abstract grammar keeps the sorts and subphrase pattern while retaining only enough notation to remain readable."
          )
        ),
        notation(
          b("1장에서 사용하는 핵심 구절 종류", "Core phrase classes in Chapter 1"),
          "intexp e ::= n | v | -e | e + e | e - e | e × e | e ÷ e | e rem e\nassert p ::= true | false\n           | e = e | e ≠ e | e < e | e ≤ e | e > e | e ≥ e\n           | ¬p | p ∧ p | p ∨ p | p ⇒ p | p ⇔ p\n           | ∀v. p | ∃v. p",
          b(
            "`var`는 별도 생성 규칙으로 만드는 구절이 아니라 미리 주어진 셀 수 있는 무한 집합이다. 정수 상수도 실제 구현에서는 자연수 하나를 받는 상수 constructor로 묶을 수 있다. 문법의 각 선택지는 뒤에서 하나의 constructor와 하나의 의미 방정식에 대응한다.",
            "Variables form a predefined countably infinite set rather than being generated by productions. An implementation may combine the integer constants into one constructor taking a natural number. Each grammatical alternative will correspond to a constructor and a semantic equation."
          ),
          String.raw`\begin{aligned}
\mathit{intexp}\quad e\;::={}&\; n\mid v\mid -e\mid e+e\mid e-e\mid e\times e\mid e\div e\mid e\mathbin{\mathsf{\ rem\ }}e \\[3pt]
\mathit{assert}\quad p\;::={}&\; \mathsf{true}\mid\mathsf{false} \\
&\mid e=e\mid e\ne e\mid e<e\mid e\le e\mid e>e\mid e\ge e \\
&\mid \neg p\mid p\land p\mid p\lor p\mid p\Rightarrow p\mid p\Leftrightarrow p \\
&\mid \forall v.\,p\mid \exists v.\,p
\end{aligned}`
        ),
        prose(
          b(
            "추상 문법을 읽을 때 터미널과 메타변수를 구분해야 한다. 위 문법의 `+`, `∀`, 마침표는 표기 패턴을 이루는 기호이고, `e`, `p`, `v`는 그 자리에 올 부분구절의 종류를 가리킨다. 같은 왼쪽 종류를 만드는 서로 다른 생산 규칙은 터미널 패턴이나 부분구절 개수가 달라야 한다. 그래야 완전히 괄호 친 표현을 보았을 때 어느 생성 규칙을 썼는지 유일하게 복구할 수 있다.",
            "The terminal pattern must be distinguished from metavariables for subphrases. Alternatives producing the same sort need distinguishable terminal patterns or arities, so a fully parenthesized representation can be decoded into a unique constructor application."
          ),
          b(
            "실제로 글을 쓸 때 모든 부분구절에 괄호를 붙이지는 않는다. 그래서 우선순위와 왼쪽/오른쪽 결합 규칙이 구체 표기의 보조 장치로 필요하다. 하지만 이 규칙은 abstract syntax이 아니라 문자열을 트리로 읽기 위한 파싱 약속이다. `x + y × z`가 `x + (y × z)`로 파싱되고 나면 semantics은 곱셈이 높은 우선순위였다는 사실을 더 이상 알 필요가 없다.",
            "Precedence and associativity are parsing conventions for convenient surface notation. Once `x + y × z` has been parsed as `x + (y × z)`, semantics need not remember why that tree was selected."
          ),
          b(
            "수량자의 본문 범위는 특히 주의해야 한다. `∀x. p`의 본문은 정해진 멈춤 기호나 둘러싼 구절의 끝까지 뻗는다. 따라서 표면 문자열만 보고 범위를 추측하지 말고 먼저 괄호를 복원해야 한다. 뒤의 언어에서는 `do`, `else`, `in`, 쉼표 같은 기호도 이런 범위를 멈추는 역할을 한다. 범위 규칙은 바인딩을 결정하므로 단순한 인쇄 취향이 아니다.",
            "Quantifier bodies extend to a stopping symbol or the end of the enclosing phrase. Scope should be recovered during parsing rather than guessed from typography. Later languages introduce additional stopping symbols such as `do`, `else`, `in`, and commas."
          )
        ),
        example(
          b("표면 표기에서 constructor 트리로", "From surface notation to a constructor tree"),
          b("`x + y × z < 10 ∧ ¬(x = 0)`을 구조로 읽어 보자.", "Parse `x + y × z < 10 ∧ ¬(x = 0)` structurally."),
          [
            b("곱셈이 덧셈보다 먼저 묶이므로 왼쪽 정수식은 `x + (y × z)`다.", "Multiplication binds before addition, giving `x + (y × z)`."),
            b("관계 연산 `<`가 두 정수식을 받아 assertion `x + (y × z) < 10`을 만든다.", "The relation `<` consumes two integer expressions and produces an assertion."),
            b("`¬`가 등식 assertion `x = 0`을 감싸고, 마지막으로 `∧`가 두 assertion을 결합한다.", "Negation wraps `x = 0`, and conjunction combines the two assertions."),
            b("constructor expression으로는 대략 `C∧(C<(C+(Cvar(x), C×(Cvar(y), Cvar(z))), C10), C¬(C=(Cvar(x), C0)))`이다.", "A constructor expression is roughly `C∧(C<(C+(Cvar(x), C×(Cvar(y), Cvar(z))), C10), C¬(C=(Cvar(x), C0)))`.")
          ],
          b(
            "이 트리가 확정된 뒤에는 중위 표기나 우선순위가 달라져도 같은 abstract syntax을 가리킬 수 있다.",
            "Once the tree is fixed, different infix or prefix notations may still represent the same abstract phrase."
          )
        ),
        callout(
          "warning",
          b("BNF를 AST로 착각하지 않기", "Do not confuse BNF with the AST"),
          b(
            "문법에 `e + e`라고 적혀 있다는 사실은 `+` 문자가 추상 구절 안에 저장된다는 뜻이 아니다. 추상 구절에는 ‘두 정수식으로 덧셈을 구성했다’는 정보만 있으면 된다. 괄호와 우선순위는 파싱 과정에서 할 일을 마친다.",
            "Writing `e + e` in a grammar does not imply that the `+` character is stored inside the abstract phrase. The AST only needs to record that an addition constructor was applied to two integer-expression children."
          )
        )
      ],
      checkpoints: [
        b("`¬x = 0 ∨ y < 3`에 필요한 괄호를 모두 복원하고 가장 바깥 constructor를 말해 보라.", "Fully parenthesize `¬x = 0 ∨ y < 3` and identify the outermost constructor."),
        b("연산자 우선순위가 semantics이 아니라 concrete syntax의 문제인 이유를 설명하라.", "Explain why precedence belongs to concrete syntax rather than semantics.")
      ],
    },
    {
      id: "carriers-constructors",
      covers: "§1.1 · pp. 3–8",
      minutes: 7,
      title: b("운반집합·constructor·초기 대수", "Carriers, constructors, and the initial-algebra view"),
      lead: b(
        "abstract syntax은 특정 트리 구현이 아니라, 어떤 올바른 구현도 만족해야 하는 구조적 계약이다.",
        "Abstract syntax is a structural contract satisfied by any correct representation, not one privileged tree implementation."
      ),
      blocks: [
        prose(
          b(
            "syntax을 진짜로 추상화하려면 ‘구절은 트리다’라고 특정 자료구조까지 고정해서는 안 된다. 대신 각 구절 종류에 운반집합(carrier)을 두고, 생산 규칙마다 운반집합 사이의 constructor 함수를 둔다. 이 장에는 변수 집합 `Var`, 정수식 집합 `IntExp`, assertion 집합 `Assert`가 있다. 예를 들어 변수 constructor는 `Cvar : Var → IntExp`, 덧셈 constructor는 `C+ : IntExp × IntExp → IntExp`, 전칭 수량자 constructor는 `C∀ : Var × Assert → Assert`의 형식을 가진다.",
            "A genuinely abstract syntax does not commit to one tree data structure. It specifies a carrier for each phrase sort and a constructor function for each production. Here we have `Var`, `IntExp`, and `Assert`, with constructors such as `Cvar : Var → IntExp`, `C+ : IntExp × IntExp → IntExp`, and `C∀ : Var × Assert → Assert`."
          ),
          b(
            "상수처럼 자식이 없는 constructor는 빈 곱, 즉 원소가 하나뿐인 집합에서 운반집합으로 가는 함수로 볼 수 있다. `C0 : 1 → IntExp`라고 쓰면 `C0()`이 상수 0 구절이다. 구현 언어에서는 보통 `Const(0)`처럼 정수 하나를 받는 constructor로 모든 상수를 합치지만, 수학적 구조는 동일하다. constructor의 인자 수와 인자 종류가 구절의 직접 부분구절을 정확히 정한다.",
            "A nullary constructor can be viewed as a function from the one-element set into a carrier. Implementations often combine all numeric constants into `Const(n)`, but the structural role is the same: constructor arity and argument sorts determine the immediate subphrases."
          )
        ),
        list(
          b("올바른 abstract syntax 구현이 만족해야 할 세 조건", "Three conditions for a realization of abstract syntax"),
          b("단사성: 같은 constructor의 결과가 같으면 각 인자도 같아야 한다. `C+(e₀,e₁)=C+(e₂,e₃)`이면 `e₀=e₂`, `e₁=e₃`이다.", "Injectivity: equal results of one constructor imply equal corresponding arguments."),
          b("서로소 치역: 같은 운반집합으로 들어가는 서로 다른 constructor의 결과는 겹치지 않는다. 덧셈 구절이 동시에 곱셈 구절일 수 없다.", "Disjoint ranges: distinct constructors into one carrier never produce the same phrase."),
          b("유한 생성: 미리 주어진 집합의 원소를 제외한 모든 구절은 constructor를 유한 번 적용해 만들어져야 한다. 무한 깊이의 유령 구절은 허용하지 않는다.", "Finite generation: every non-predefined phrase is built by finitely many constructor applications; no infinitely deep phantom phrases are included.")
        ),
        prose(
          b(
            "첫 두 조건은 구절을 분해할 수 있게 한다. 어떤 assertion이 `p₀ ∧ p₁` 꼴이라면 최상위 constructor가 논리곱이라는 사실과 두 직접 sub-assertion `p₀`, `p₁`이 유일하다. 따라서 ‘구절의 모양에 따른 경우 분석’이 가능하다. 세 번째 조건은 이 분해를 반복하면 반드시 바닥의 상수나 변수에 도착함을 보장한다. 재귀 함수 정의와 구조적 귀납 증명이 바로 이 성질에 기대고 있다.",
            "The first two conditions make decomposition unique: if an assertion has the form `p₀ ∧ p₁`, its outer constructor and two children are uniquely determined. Finite generation guarantees that repeated decomposition reaches constants or variables. Recursive definitions and structural induction rely on exactly these facts."
          ),
          b(
            "유한 생성을 더 엄밀히 말하려면 깊이별 근사를 만든다. 깊이 0에는 아무 구절도 두지 않고, 깊이 `j+1`에는 깊이 `j` 이하의 구절들을 인자로 constructor를 한 번 적용해 얻는 구절을 넣는다. 모든 유한 깊이 집합의 합집합이 전체 운반집합이다. 이 정의는 2장에서 반복문의 의미를 근사하고 최소 고정점을 취하는 방식과 같은 모양을 갖는다. syntax 자체도 ‘생성 방정식의 최소 해’로 이해할 수 있다.",
            "Finite generation can be formalized by depth approximants. Start with no phrases at depth zero; at stage `j+1`, apply constructors to phrases available by stage `j`; take the union of all finite stages. This mirrors the least-fixed-point construction used for loops in Chapter 2."
          )
        ),
        notation(
          b("깊이 근사로 보는 정수식", "Integer expressions as depth approximants"),
          "IntExp⁽⁰⁾ = ∅\nIntExp⁽ʲ⁺¹⁾ = { Cₙ() | n ∈ ℕ }\n              ∪ { Cvar(v) | v ∈ Var }\n              ∪ { C−(e) | e ∈ IntExp⁽ʲ⁾ }\n              ∪ { C+(e₀,e₁), … | e₀,e₁ ∈ IntExp⁽ʲ⁾ }\nIntExp = ⋃ⱼ≥0 IntExp⁽ʲ⁾",
          b(
            "각 단계는 이전 단계에서 만들 수 있던 구절보다 한 층 더 깊은 구절을 허용한다. 합집합은 임의로 깊지만 언제나 유한한 구절만 포함한다.",
            "Each stage permits one more constructor layer than the preceding stage. The union contains phrases of arbitrary but always finite depth."
          ),
          String.raw`\begin{aligned}
\operatorname{IntExp}^{(0)} &= \varnothing \\
\operatorname{IntExp}^{(j+1)}
  &= \{C_n()\mid n\in\mathbb{N}\} \\
  &\quad\cup\{C_{\mathit{var}}(v)\mid v\in\operatorname{Var}\} \\
  &\quad\cup\{C_{-}(e)\mid e\in\operatorname{IntExp}^{(j)}\} \\
  &\quad\cup\{C_{+}(e_0,e_1),\ldots\mid e_0,e_1\in\operatorname{IntExp}^{(j)}\} \\[6pt]
\operatorname{IntExp} &= \bigcup_{j\ge0}\operatorname{IntExp}^{(j)}
\end{aligned}`
        ),
        example(
          b("하나의 abstract syntax, 여러 실현", "One abstract syntax, several realizations"),
          b("구조 `(0 - 1) + (-2)`를 세 방식으로 실현해 보자.", "Realize the structure `(0 - 1) + (-2)` in three ways."),
          [
            b("완전 괄호 중위 문자열: `((0) - (1)) + (-(2))`", "Fully parenthesized infix string: `((0) - (1)) + (-(2))`."),
            b("접두 함수 문자열: `add(subtract(0,1), negate(2))`", "Prefix functional string: `add(subtract(0,1), negate(2))`."),
            b("syntax tree: 루트 `+`, 왼쪽 자식은 루트 `-binary`와 잎 0·1, 오른쪽 자식은 루트 `-unary`와 잎 2", "Syntax tree: root `+`; a binary-minus subtree over 0 and 1; a unary-minus subtree over 2."),
            b("대수적 자료형 값: `Plus(Sub(Const(0), Const(1)), Neg(Const(2)))`", "Algebraic-data-type value: `Plus(Sub(Const(0), Const(1)), Neg(Const(2)))`.")
          ],
          b(
            "표현은 다르지만 각 constructor의 단사성, 서로소 치역, 유한 생성이라는 같은 계약을 만족하므로 이후 의미 정의와 증명을 공유한다.",
            "The representations differ, but each satisfies injectivity, disjointness, and finite generation, so one semantic definition and proof discipline applies to all of them."
          )
        ),
        callout(
          "proof",
          b("초기 대수라는 말의 직관", "Intuition for ‘initial algebra’"),
          b(
            "abstract syntax은 constructor가 요구하는 것 외에는 아무것도 추가하지 않은 가장 자유로운 대수다. constructor 방정식을 만족하는 어떤 목표 대수를 주어도, 각 syntax을 그 대수의 값으로 보내는 구조 보존 함수가 정확히 하나 존재한다. 다음 절의 의미 함수가 유일하게 정해지는 이유를 이 한 문장이 압축한다.",
            "Abstract syntax is the freely generated algebra containing nothing beyond what constructors require. For any target algebra interpreting those constructors, there is exactly one structure-preserving map from syntax to that target. This is the algebraic reason the next section's semantic function is unique."
          )
        ),
        callout(
          "warning",
          b("‘트리’도 하나의 표현이다", "Even ‘tree’ is a representation"),
          b(
            "그림으로 그린 트리가 abstract syntax 그 자체라고 말하면 편리하지만 엄밀히는 트리도 하나의 실현이다. 핵심은 노드의 메모리 배치나 라벨 철자가 아니라 constructor를 유일하게 분해할 수 있는 구조다. 이 구분 덕분에 컴파일러 AST, 증명 보조기의 귀납 자료형, 종이 위의 constructor expression이 같은 이론을 공유한다.",
            "A drawn tree is a convenient realization, not the essence of abstract syntax. What matters is unique decomposition by constructors, allowing compiler ASTs, inductive datatypes, and paper notation to share the same theory."
          )
        )
      ],
      checkpoints: [
        b("constructor의 단사성과 서로소 치역이 각각 어떤 종류의 모호성을 막는지 구분해서 설명하라.", "Explain which ambiguity is prevented by constructor injectivity and which by disjoint ranges."),
        b("유한 생성 조건이 없으면 구조적 귀납법이 왜 정당화되지 않는가?", "Why would structural induction fail without finite generation?"),
        b("대수적 자료형의 각 variant가 추상 문법의 무엇에 대응하는가?", "What does each variant of an algebraic datatype correspond to in an abstract grammar?")
      ],
    },
    {
      id: "denotations",
      covers: "§1.2 · pp. 8–10",
      minutes: 7,
      title: b("상태를 입력으로 받는 표시적 의미", "Denotational meaning as a function of state"),
      lead: b(
        "자유 변수가 있는 식의 의미는 정수 하나가 아니라, 상태가 주어질 때 정수를 돌려주는 함수다.",
        "An open expression denotes not one integer but a function that returns an integer when supplied a state."
      ),
      blocks: [
        prose(
          b(
            "닫힌 식 `2 + 3`은 상태와 무관하게 5를 낸다. 반면 `x + 3`의 값은 `x`가 무엇인지 알아야 정해진다. 그러므로 모든 정수식에 같은 종류의 의미를 주려면 의미를 `상태 → 정수` 함수로 잡아야 한다. assertion도 같은 이유로 `상태 → 진릿값` 함수가 된다. 상태 집합을 `Σ = Var → ℤ`, 진릿값 집합을 `𝔹 = {true,false}`라 두면 의미 함수의 형식이 선명해진다.",
            "A closed expression such as `2 + 3` always yields five, while `x + 3` needs a value for `x`. A uniform semantics therefore maps every integer expression to a function `State → Integer` and every assertion to `State → Boolean`. Let `Σ = Var → ℤ` and `𝔹 = {true,false}`."
          ),
          b(
            "denotational semantics은 syntax을 이미 이해한다고 가정하고 그 syntax이 나타내는 수학적 대상을 지정한다. 이 장에서 정수식의 의미 대상은 `Σ → ℤ`, assertion의 의미 대상은 `Σ → 𝔹`이다. 의미 괄호 `⟦e⟧exp σ`는 상태 `σ`에서 식 `e`의 값을, `⟦p⟧assert σ`는 같은 상태에서 assertion `p`의 진릿값을 뜻한다. 괄호 안은 대상 언어, 괄호 밖 계산은 메타언어에 속한다.",
            "Denotational semantics assigns mathematical objects to already parsed syntax. Here integer expressions denote elements of `Σ → ℤ`, assertions elements of `Σ → 𝔹`. Inside the semantic brackets is object-language syntax; outside is metalanguage mathematics."
          )
        ),
        notation(
          b("의미 함수와 상태 갱신", "Semantic functions and state update"),
          "⟦·⟧exp    : IntExp → (Σ → ℤ)\n⟦·⟧assert : Assert → (Σ → 𝔹)\nΣ = Var → ℤ\n[σ | v : n](v) = n\n[σ | v : n](w) = σ(w)    when w ≠ v",
          b(
            "`[σ | v : n]`은 `v`에만 새 값 `n`을 주고 나머지 변수에는 `σ`와 같은 값을 주는 상태다. 수량자의 의미에서 묶인 변수의 가능한 값을 하나씩 시험할 때 쓰인다.",
            "`[σ | v : n]` agrees with `σ` everywhere except at `v`, where it returns `n`. Quantifier semantics uses this update to test possible values for a bound variable."
          ),
          String.raw`\begin{aligned}
\llbracket\,\cdot\,\rrbracket_{\mathit{exp}}
  &:\operatorname{IntExp}\to(\Sigma\to\mathbb{Z}) \\
\llbracket\,\cdot\,\rrbracket_{\mathit{assert}}
  &:\operatorname{Assert}\to(\Sigma\to\mathbb{B}) \\
\Sigma &= \operatorname{Var}\to\mathbb{Z} \\[7pt]
[\sigma\mid v:n](v) &= n \\
[\sigma\mid v:n](w) &= \sigma(w)\qquad\text{when }w\ne v
\end{aligned}`
        ),
        list(
          b("syntax constructor를 따라가는 핵심 의미 방정식", "Core semantic equations following the constructors"),
          b("상수: `⟦n⟧exp σ = n`. 상태를 받지만 사용하지 않는다.", "Constant: `⟦n⟧exp σ = n`; the state is accepted but ignored."),
          b("변수: `⟦v⟧exp σ = σ(v)`. 변수의 의미는 현재 상태에서 조회한다.", "Variable: `⟦v⟧exp σ = σ(v)`; look up the variable in the state."),
          b("단항·이항 산술: `⟦-e⟧exp σ = -⟦e⟧exp σ`, `⟦e₀+e₁⟧exp σ = ⟦e₀⟧exp σ + ⟦e₁⟧exp σ`.", "Arithmetic: recursively interpret operands, then apply the corresponding mathematical operation."),
          b("관계: `⟦e₀<e₁⟧assert σ = (⟦e₀⟧exp σ < ⟦e₁⟧exp σ)`.", "Relation: compare the denotations of the two integer-expression children."),
          b("논리 연결사: `⟦p₀∧p₁⟧assert σ = ⟦p₀⟧assert σ ∧ ⟦p₁⟧assert σ`이며 다른 연결사도 같은 모양이다.", "Logical connectives combine the Boolean denotations of their assertion children."),
          b("수량자: `⟦∀v.p⟧assert σ = true` iff 모든 `n∈ℤ`에 대해 `⟦p⟧assert[σ|v:n]=true`다. `∃`는 적어도 한 `n`을 요구한다.", "Quantifier: `∀v.p` holds in `σ` exactly when `p` holds in `[σ|v:n]` for every integer `n`; `∃` requires at least one such `n`.")
        ),
        example(
          b("의미 방정식으로 실제 계산하기", "A calculation using semantic equations"),
          b("`σ(x)=3`, `σ(y)=7`일 때 `(x + 2 < y) ∧ ¬(x = 0)`을 계산한다.", "Evaluate `(x + 2 < y) ∧ ¬(x = 0)` when `σ(x)=3` and `σ(y)=7`."),
          [
            b("`⟦x+2⟧exp σ = σ(x)+2 = 5`이고 `⟦y⟧exp σ = 7`이다.", "`⟦x+2⟧exp σ = σ(x)+2 = 5`, while `⟦y⟧exp σ = 7`."),
            b("따라서 `⟦x+2<y⟧assert σ = (5<7) = true`다.", "Hence `⟦x+2<y⟧assert σ = (5<7) = true`."),
            b("`⟦x=0⟧assert σ = (3=0)=false`, 그러므로 부정은 `true`다.", "`⟦x=0⟧assert σ = false`, so its negation is true."),
            b("마지막 논리곱은 `true ∧ true = true`다.", "The final conjunction is `true ∧ true = true`.")
          ],
          b(
            "계산은 언제나 최상위 constructor의 방정식을 선택하고 직접 부분구절로 내려간 뒤, 얻은 의미를 다시 조합하는 방식으로 진행된다.",
            "Evaluation always chooses the equation for the outer constructor, descends to immediate children, and combines their denotations."
          )
        ),
        example(
          b("수량자는 상태를 덮어쓴다", "A quantifier overrides the state"),
          b("임의의 상태 `σ`에서 `∀x. x + 0 = x`의 의미를 계산한다.", "Evaluate `∀x. x + 0 = x` in an arbitrary state `σ`."),
          [
            b("전칭 수량자는 모든 정수 `n`에 대해 본문을 상태 `[σ|x:n]`에서 검사한다.", "The universal quantifier checks its body in `[σ|x:n]` for every integer `n`."),
            b("그 상태에서 `x`의 값은 원래 `σ(x)`가 아니라 `n`이다.", "In that updated state, `x` has value `n`, not the original `σ(x)`."),
            b("본문은 `n+0=n`이므로 모든 `n`에서 참이다.", "The body becomes `n+0=n`, true for every integer `n`."),
            b("따라서 전체 assertion은 원래 상태가 무엇이든 참이다.", "Therefore the entire assertion is true regardless of the original state.")
          ],
          b(
            "이 계산은 바인더가 변수의 현재 값을 읽는 대신 범위 안에서 새로운 값을 지정한다는 사실을 보여 준다.",
            "The calculation shows that a binder supplies a new value within its scope rather than reading the variable's old state value."
          )
        ),
        callout(
          "warning",
          b("상태와 저장소를 너무 일찍 동일시하지 않기", "Do not identify state with store too early"),
          b(
            "여기서 상태는 모든 변수에 정수를 배정하는 전체 함수다. 아직 주소, 할당, 별칭, 수명은 없다. 뒤에서 환경과 저장소가 분리될 때 이 단순한 상태 개념이 왜 충분하지 않은지 보게 된다.",
            "Here a state is a total function assigning an integer to every variable. There are no addresses, allocation, aliasing, or lifetimes yet. Later chapters separate environments from stores when this simple model becomes insufficient."
          )
        )
      ],
      checkpoints: [
        b("`σ(x)=2`, `σ(y)=-1`일 때 `∃z. x+z=y`의 의미를 상태 갱신 표기로 계산하라.", "Evaluate `∃z. x+z=y` when `σ(x)=2` and `σ(y)=-1`, explicitly using state update."),
        b("닫힌 assertion의 의미가 상태와 무관해야 하는 이유를 직관적으로 설명하라.", "Explain intuitively why the denotation of a closed assertion must be independent of state."),
        b("정수식과 assertion의 의미 함수 공역이 왜 다른가?", "Why do integer expressions and assertions have different semantic codomains?")
      ],
    },
    {
      id: "binding-free-variables",
      covers: "§1.4 · pp. 15–18",
      minutes: 8,
      title: b("바인딩, 자유 변수, 일치 정리", "Binding, free variables, and the Coincidence Theorem"),
      lead: b(
        "변수의 의미는 철자만으로 정해지지 않는다. 어느 바인더가 그 발생을 지배하는지가 syntax structure의 일부다.",
        "The meaning of a variable occurrence is not determined by spelling alone; its governing binder is part of the syntax."
      ),
      blocks: [
        prose(
          b(
            "`∀v.p`와 `∃v.p`에서 수량자 바로 뒤의 `v` 발생은 바인딩 발생, 즉 바인더다. 그 바인더의 범위는 본문 `p`다. 범위 안에 있는 같은 이름의 비바인딩 발생은 그 바인더에 묶인다. 같은 이름의 바인더가 중첩되어 있으면 가장 작은 범위, 즉 가장 가까운 안쪽 바인더가 지배한다. 어느 바인더에도 묶이지 않은 발생은 자유 발생이다. 자유 발생이 하나도 없는 구절을 닫힌 구절이라고 한다.",
            "In `∀v.p` and `∃v.p`, the occurrence after the quantifier is a binder whose scope is `p`. Matching nonbinding occurrences in the scope are bound by it; under nested binders, the innermost one wins. All other occurrences are free. A phrase with no free occurrences is closed."
          ),
          b(
            "자유인지 묶였는지는 변수 이름 자체가 아니라 ‘구절 안의 특정 발생’에 붙는 성질이다. 한 구절 안에서 같은 이름이 자유로도, 묶인 채로도 나타날 수 있다. 또 전체 구절에서는 묶인 발생이 어떤 부분구절만 떼어 보면 자유일 수 있다. 예컨대 `∀x.(x<y ∧ ∃y.x<y)`에서 첫 `x`와 마지막 `x`는 바깥 `∀x`에 묶이고, 첫 `y`는 자유이며, 마지막 `y`는 안쪽 `∃y`에 묶인다. 안쪽 본문 `x<y`만 떼면 그 안에서는 두 이름 모두 자유다.",
            "Free and bound are properties of occurrences, not names in isolation. The same name can occur both freely and bound, and an occurrence bound in a whole phrase may be free in a selected subphrase."
          )
        ),
        example(
          b("그림 없이 바인딩 구조 추적하기", "Tracing binding structure without a diagram"),
          b("assertion `∀x. (x<y ∨ ∃y. (x=y ∧ ∀x. x>y))`를 바깥에서 안쪽으로 읽는다.", "Analyze `∀x. (x<y ∨ ∃y. (x=y ∧ ∀x. x>y))` from outside inward."),
          [
            b("맨 앞 `∀x`는 큰 괄호 전체를 범위로 하며, 안쪽 `∀x` 범위 밖에 있는 `x` 발생들을 묶는다.", "The outer `∀x` scopes over the large parenthesis and binds `x` occurrences not shadowed by the inner `∀x`."),
            b("첫 비교 `x<y`의 `y`는 아직 `y` 바인더 범위에 들어가지 않았으므로 자유다.", "The `y` in the first comparison is free because it precedes the existential's scope."),
            b("`∃y`는 자기 본문의 `y`들을 묶으며, 맨 안쪽 `∀x`의 본문에서도 `y`에 대한 더 가까운 바인더는 없으므로 계속 지배한다.", "The existential binds the `y` occurrences in its body, including under the innermost universal."),
            b("맨 안쪽 `∀x`는 자기 본문의 `x`만 새로 묶어 바깥 `∀x`를 가린다.", "The innermost `∀x` shadows the outer binder only within its own body.")
          ],
          b("전체 assertion의 자유 변수 집합은 `{y}`다.", "The free-variable set of the whole assertion is `{y}`.")
        ),
        prose(
          b(
            "자유 변수 집합 함수 `FV`는 syntax을 따라 재귀적으로 정의한다. 상수와 진리 상수에는 자유 변수가 없고, 변수 `v`의 자유 변수는 `{v}`다. 단항 constructor는 자식의 집합을 그대로 전달하고, 이항 constructor는 두 집합의 합집합을 취한다. 수량자는 본문의 자유 변수 집합에서 자신이 묶는 이름 하나를 제거한다. 이 정의도 의미 정의는 아니지만 syntax-directed이므로 모든 구절에 유일한 결과를 준다.",
            "The free-variable function `FV` is syntax-directed. Constants contribute none; a variable `v` contributes `{v}`; unary constructors preserve the child's set; binary constructors take unions; a quantifier removes the name it binds from the body's set."
          )
        ),
        notation(
          b("자유 변수 집합의 대표 방정식", "Representative free-variable equations"),
          "FVexp(n) = ∅\nFVexp(v) = {v}\nFVexp(-e) = FVexp(e)\nFVexp(e₀+e₁) = FVexp(e₀) ∪ FVexp(e₁)\nFVassert(true) = ∅\nFVassert(e₀=e₁) = FVexp(e₀) ∪ FVexp(e₁)\nFVassert(¬p) = FVassert(p)\nFVassert(p₀∧p₁) = FVassert(p₀) ∪ FVassert(p₁)\nFVassert(∀v.p) = FVassert(p) − {v}\nFVassert(∃v.p) = FVassert(p) − {v}",
          b(
            "다른 산술 연산, 관계, 이항 연결사는 같은 모양의 방정식을 갖는다. 수량자 절에서만 집합에서 이름을 빼는 바인딩 특유의 동작이 나타난다.",
            "Other operations follow the same unary or binary patterns. Only binders subtract a name from the body's free-variable set."
          ),
          String.raw`\begin{aligned}
\operatorname{FV}_{\mathit{exp}}(n)&=\varnothing &
\operatorname{FV}_{\mathit{exp}}(v)&=\{v\} \\
\operatorname{FV}_{\mathit{exp}}(-e)&=\operatorname{FV}_{\mathit{exp}}(e) &
\operatorname{FV}_{\mathit{exp}}(e_0+e_1)&=\operatorname{FV}_{\mathit{exp}}(e_0)\cup\operatorname{FV}_{\mathit{exp}}(e_1) \\[4pt]
\operatorname{FV}_{\mathit{assert}}(\mathsf{true})&=\varnothing &
\operatorname{FV}_{\mathit{assert}}(e_0=e_1)&=\operatorname{FV}_{\mathit{exp}}(e_0)\cup\operatorname{FV}_{\mathit{exp}}(e_1) \\
\operatorname{FV}_{\mathit{assert}}(\neg p)&=\operatorname{FV}_{\mathit{assert}}(p) &
\operatorname{FV}_{\mathit{assert}}(p_0\land p_1)&=\operatorname{FV}_{\mathit{assert}}(p_0)\cup\operatorname{FV}_{\mathit{assert}}(p_1) \\[4pt]
\operatorname{FV}_{\mathit{assert}}(\forall v.\,p)&=\operatorname{FV}_{\mathit{assert}}(p)\setminus\{v\} &
\operatorname{FV}_{\mathit{assert}}(\exists v.\,p)&=\operatorname{FV}_{\mathit{assert}}(p)\setminus\{v\}
\end{aligned}`
        ),
        callout(
          "key",
          b("일치 정리(Coincidence Theorem)", "Coincidence Theorem"),
          b(
            "구절 `p`의 자유 변수들에 대해 두 상태 `σ`, `σ'`가 같은 값을 준다면 `p`의 의미도 두 상태에서 같다. 식과 assertion 모두에 대해 성립한다. 즉 의미 계산은 상태 전체를 받는 것처럼 보이지만 실제로는 유한 집합 `FV(p)`의 값만 관찰한다. 닫힌 구절은 자유 변수가 없으므로 어떤 두 상태에서도 의미가 같다.",
            "If states `σ` and `σ'` agree on every variable in `FV(p)`, then `p` has the same denotation in both states. A closed phrase therefore has state-independent meaning."
          ),
          b(
            "이 정리는 자유 변수의 정의가 단순한 syntax 목록이 아니라 의미 의존성의 정확한 상한임을 보여 준다. 이후 최적화나 환경 축소에서 ‘이 구절이 읽을 수 있는 이름은 무엇인가’를 정당화하며, 함수 클로저가 어떤 환경을 보존해야 하는지 이해하는 바탕이 된다.",
            "The theorem turns `FV` from bookkeeping into a semantic dependency bound. It later justifies environment restriction and clarifies which bindings a closure must retain."
          )
        ),
        callout(
          "proof",
          b("구조적 귀납 증명의 뼈대", "Skeleton of the structural-induction proof"),
          b(
            "임의의 구절 `p`를 잡고 직접 부분구절들에 대해서는 일치 정리가 이미 성립한다고 가정한다. 상수는 상태를 읽지 않으므로 자명하고, 변수는 `FV(v)={v}`이므로 두 상태가 그 변수에서 일치한다. 단항·이항 구성에서는 자유 변수 집합의 같음이나 합집합 성질로 각 자식에 귀납가정을 적용한 뒤 의미 방정식으로 결과를 조합한다.",
            "Induct on `p`. Constants ignore the state; variables use agreement at their one free variable; unary and binary cases apply induction to children and combine equal child meanings with the semantic equation."
          ),
          b(
            "수량자 경우가 핵심이다. `p=∀v.q`이고 `σ`, `σ'`가 `FV(q)−{v}`에서 일치한다고 하자. 임의의 정수 `n`을 골라 두 상태를 각각 `[σ|v:n]`, `[σ'|v:n]`으로 갱신하면, 이제 `v`에서도 둘 다 `n`이고 나머지 자유 변수에서도 원래부터 일치하므로 `FV(q)` 전체에서 일치한다. 귀납가정으로 본문 의미가 같고, 이것이 모든 `n`에 대해 성립하므로 전칭 수량자 의미도 같다. 존재 수량자도 같은 논리다.",
            "For `∀v.q`, update both states with the same arbitrary integer `n`. The updated states agree on all of `FV(q)`: at `v` by construction and elsewhere by the original hypothesis. Induction equates the body meanings for every `n`, so the quantified meanings agree."
          )
        ),
        prose(
          b(
            "구조적 귀납법은 자연수 귀납법의 변형이 아니라 그 위에 정당화된다. 구절의 깊이를 자연수로 보고 직접 부분구절의 깊이가 항상 더 작다는 사실을 사용한다. 실무적으로는 ‘각 constructor 경우를 모두 다루고, 자식에 대해 명제를 가정한다’는 방식으로 쓴다. constructor 하나를 빼먹으면 모든 구절을 덮지 못하고, 바인더 경우를 비바인더처럼 처리하면 상태 갱신 때문에 증명이 깨진다.",
            "Structural induction is justified by induction on phrase depth. In practice, cover every constructor and assume the proposition for immediate children. Binder cases require special handling because semantics changes the state."
          )
        )
      ],
      checkpoints: [
        b("`∃x.(x<z ∧ ∀z.z<x+y)`의 자유 변수 집합을 방정식 순서대로 계산하라.", "Compute the free-variable set of `∃x.(x<z ∧ ∀z.z<x+y)` step by step."),
        b("일치 정리에서 수량자 경우에 원래 상태가 아닌 갱신된 두 상태를 귀납가정에 넣어야 하는 이유는 무엇인가?", "Why does the quantifier case apply induction to updated states rather than the original states?"),
        b("일치 정리로 닫힌 assertion의 상태 독립성을 한 줄로 유도하라.", "Derive state independence of a closed assertion from the Coincidence Theorem.")
      ],
    },
    {
      id: "capture-avoiding-substitution",
      covers: "§1.4 · pp. 18–21",
      minutes: 10,
      title: b("캡처 회피 치환과 치환 정리", "Capture-avoiding substitution and the Substitution Theorem"),
      lead: b(
        "치환은 글자를 바꾸는 작업이 아니라 자유 변수의 의미 관계를 보존하는 syntactic operation이다.",
        "Substitution is not character replacement; it is a syntactic operation designed to preserve semantic relationships among free variables."
      ),
      blocks: [
        prose(
          b(
            "`p`의 자유 변수 `v`에 식 `e`를 넣는다는 직관은 간단해 보인다. 하지만 `e`에 자유롭게 등장하는 이름이 `p` 안의 바인더와 같으면 단순 텍스트 교체가 그 이름을 새로 묶어 버린다. 이를 변수 포획(capture)이라 한다. 포획은 단지 이름이 보기 싫게 겹치는 문제가 아니라 결과 assertion의 의미를 바꾼다.",
            "Replacing free occurrences of `v` in `p` by an expression `e` seems simple until a binder inside `p` uses a name occurring freely in `e`. Naive textual replacement then captures that occurrence and changes meaning."
          )
        ),
        example(
          b("포획이 참을 거짓으로 바꾸는 과정", "How capture can turn truth into falsehood"),
          b("`∃y. y>x`에서 자유 변수 `x`를 식 `y+1`로 바꾸고 싶다고 하자.", "Substitute `y+1` for the free variable `x` in `∃y. y>x`."),
          [
            b("잘못된 문자 교체는 `∃y. y>y+1`을 만든다.", "Naive character replacement produces `∃y. y>y+1`."),
            b("삽입한 식의 자유 `y`가 원래 존재 수량자의 `y`에 붙잡혔다.", "The free `y` in the inserted expression has been captured by the existential binder."),
            b("원래 의도는 현재 상태의 `y+1`보다 큰 정수가 존재한다는 말이어서 항상 참이지만, 포획된 결과는 어떤 정수도 자기보다 1 클 수 없다는 거짓 assertion이다.", "The intended claim says some integer exceeds the state's current `y+1`, which is true; the captured result says some integer exceeds itself plus one, which is false."),
            b("먼저 바운드 변수만 새 이름 `z`로 바꿔 `∃z.z>x`로 만든 뒤 치환하면 `∃z.z>y+1`이 되어 의도가 보존된다.", "First alpha-rename the bound `y` to fresh `z`, then substitute, yielding `∃z.z>y+1`.")
          ],
          b("치환 전에 필요한 이름변경을 수행하는 것이 캡처 회피의 핵심이다.", "Capture avoidance renames conflicting binders before replacement.")
        ),
        prose(
          b(
            "책은 한 변수 치환보다 모든 변수에 대한 동시 치환을 먼저 정의한다. 치환 맵 `S : Var → IntExp`는 각 변수 `v`를 넣을 정수식 `S(v)`에 대응시킨다. `p/S`는 `p`에 등장하는 모든 자유 변수 발생을 동시에 해당 식으로 바꾼 결과다. ‘동시에’라는 말은 먼저 바꾼 결과를 다음 치환이 다시 건드리지 않는다는 뜻이다. 예컨대 `x+y`에서 `x↦y`, `y↦x`를 동시 적용하면 `y+x`이지 `x+x`가 아니다.",
            "The chapter defines simultaneous substitution first. A map `S : Var → IntExp` assigns a replacement expression to each variable, and `p/S` replaces all free occurrences at once. Earlier replacements are not recursively processed by later ones; swapping `x↦y` and `y↦x` in `x+y` yields `y+x`."
          ),
          b(
            "상수는 그대로이고, 변수 `v`는 `S(v)`가 되며, 비바인딩 constructor에서는 자식들에 같은 치환을 재귀 적용한다. 어려운 절은 수량자다. `(∀v.p)/S`를 계산할 때 새 바인더 `v_new`를 고르되, 본문에서 자유롭게 남아 치환될 각 변수 `w`의 교체식 `S(w)`에 `v_new`가 자유롭게 나타나지 않게 해야 한다. 가능하면 기존 `v`를 유지하고, 충돌할 때만 표준 순서에서 처음 나오는 신선한 이름을 골라 정의 자체를 결정적으로 만든다.",
            "Constants remain unchanged, variables map through `S`, and nonbinding constructors recurse. For a quantifier, choose a binder `v_new` that is absent from the free variables of every replacement expression that may enter the body. Keep `v` when safe; otherwise choose a canonical fresh name."
          )
        ),
        notation(
          b("수량자 아래 동시 치환", "Simultaneous substitution under a quantifier"),
          "(∀v. p) / S = ∀v_new. ( p / [S | v : v_new] )\n\nChoose v_new so that\nv_new ∉ ⋃ { FVexp(S(w)) | w ∈ FVassert(p) − {v} }.\n\nSingle substitution:\np / v ↦ e  abbreviates  p / [Cvar | v : e].",
          b(
            "`[S|v:v_new]`은 바인더가 지배하던 `v` 발생을 새 변수식 `v_new`로 보내고 다른 변수에는 원래 `S`를 적용한다. 새 이름 조건은 밖에서 들어오는 교체식의 자유 변수가 포획되지 않도록 한다.",
            "`[S|v:v_new]` sends occurrences governed by the old binder to the fresh variable expression and otherwise behaves like `S`. Freshness prevents free variables of incoming replacements from being captured."
          ),
          String.raw`\begin{aligned}
(\forall v.\,p)/S
  &= \forall v_{\mathrm{new}}.\;p/\bigl[S\mid v:v_{\mathrm{new}}\bigr] \\[7pt]
v_{\mathrm{new}}
  &\notin \bigcup\{\operatorname{FV}_{\mathit{exp}}(S(w))\mid
      w\in\operatorname{FV}_{\mathit{assert}}(p)\setminus\{v\}\} \\[9pt]
p/(v\mapsto e)
  &\quad\text{abbreviates}\quad p/\bigl[C_{\mathit{var}}\mid v:e\bigr]
\end{aligned}`
        ),
        callout(
          "key",
          b("치환의 세 syntax 성질", "Three syntactic properties of substitution"),
          b(
            "첫째, 두 치환 맵이 `FV(p)`의 변수들에서만 같아도 `p/S`와 `p/S'`는 같다. 구절은 자유롭게 등장하지 않는 변수에 대한 치환을 관찰하지 못한다. 둘째, 각 변수를 자기 자신을 나타내는 변수식으로 보내는 `Cvar`는 항등 치환이다. 셋째, 치환 결과의 자유 변수 집합은 원래 자유 변수 각각의 교체식 자유 변수 집합을 모두 합친 것이다. 캡처 회피 정의가 올바르기 때문에 이 정확한 등식이 성립한다.",
            "Substitution depends only on replacements for variables free in the phrase; mapping every variable to itself is the identity substitution; and the free variables of `p/S` are exactly the union of free variables of `S(w)` for `w` free in `p`."
          )
        ),
        callout(
          "proof",
          b("치환 정리(Substitution Theorem)", "Substitution Theorem"),
          b(
            "치환 정리는 syntactic substitution과 의미 상태 구성을 연결한다. 상태 `σ`에서 치환된 구절 `p/S`를 해석하는 것은, 각 원래 자유 변수 `w`의 값을 `σ'`에서 교체식 `S(w)`를 계산한 값으로 정한 상태에서 원래 `p`를 해석하는 것과 같다. 더 간단히 쓰면 새 상태 `σ_S(w)=⟦S(w)⟧σ'`에 대해 `⟦p/S⟧σ' = ⟦p⟧σ_S`다. 필요한 자유 변수에서만 두 상태가 일치하면 충분하다.",
            "The Substitution Theorem connects syntax with semantic state composition. Interpreting `p/S` in `σ'` equals interpreting `p` in the state `σ_S` defined by `σ_S(w)=⟦S(w)⟧σ'`, at least on variables free in `p`."
          ),
          b(
            "증명은 다시 `p`에 대한 구조적 귀납이다. 비바인더 경우는 의미 방정식과 귀납가정으로 곧바로 끝난다. 수량자 경우에는 캡처 회피 조건이 결정적으로 쓰인다. 새 바인더 이름이 교체식들에 자유롭게 나타나지 않으므로 `σ'`에서 그 이름만 수량자 값 `n`으로 바꾸어도 교체식의 의미는 변하지 않는다. 그래서 syntax 쪽 이름변경과 의미 쪽 원래 변수 상태 갱신이 정확히 맞물린다.",
            "The proof is structural. In the binder case, freshness ensures that updating `σ'` at the new binder name does not alter any incoming replacement expression, allowing syntactic renaming and semantic state update to align."
          )
        ),
        example(
          b("유한 치환 정리로 계산 검산하기", "Using the finite substitution corollary"),
          b("`p ≡ x+z<y`에서 `x↦y+1`, `z↦2`를 동시에 치환한다.", "In `p ≡ x+z<y`, simultaneously substitute `x↦y+1` and `z↦2`."),
          [
            b("syntax 결과는 `(y+1)+2<y`다. 원래 `y`는 치환 대상이 아니므로 그대로 남는다.", "The syntactic result is `(y+1)+2<y`; the original `y` remains."),
            b("상태 `σ`에서 결과를 계산하는 것과, 원래 `p`를 `x` 값은 `⟦y+1⟧σ`, `z` 값은 2로 갱신한 상태에서 계산하는 것이 같다.", "Evaluating the result in `σ` equals evaluating `p` in the state updated with `x=⟦y+1⟧σ` and `z=2`."),
            b("이 등식은 컴파일러가 이름 기반 치환을 환경 기반 평가로 구현해도 되는 이유를 축약해서 보여 준다.", "This equality captures why an implementation may realize syntactic substitution through environment-based evaluation.")
          ],
          b("유한 치환 정리는 한 변수 또는 유한 변수 목록을 쓰는 실전 표기의 의미 보존 근거다.", "The finite corollary justifies practical notation for one or finitely many replacements.")
        ),
        prose(
          b(
            "치환 정리에서 전칭 수량자 인스턴스화의 건전성도 따라온다. `∀v.p`가 한 상태에서 참이면 모든 정수 `n`으로 `v`를 갱신해도 `p`가 참이다. 특히 `e`가 그 상태에서 내는 정수로 갱신한 경우도 참이고, 유한 치환 정리에 따라 이것은 `p/v↦e`가 그 상태에서 참이라는 말과 같다. 따라서 `(∀v.p)⇒(p/v↦e)`는 모든 상태에서 타당하다.",
            "The theorem validates universal instantiation. If `∀v.p` holds, then `p` holds when `v` receives the value denoted by any expression `e`; the finite substitution result identifies that with `p/v↦e`."
          ),
          b(
            "이름변경 정리는 바인더 이름을 본문에서 충돌하지 않는 새 이름으로 바꾸어도 의미가 같다고 말한다. `∀x.x+y>0`과 `∀z.z+y>0`은 같은 바인딩 구조를 갖는다. 이런 교체를 알파 변환(α-conversion)이라 한다. 더 나아가 고차 abstract syntax 관점은 알파 변환으로 연결되는 표현들을 애초에 하나의 추상 구절로 본다. 바운드 이름의 철자는 의미 없는 구체 표기라는 생각이다.",
            "The Renaming Theorem says that changing a binder to a fresh name preserves meaning. This alpha-conversion motivates higher-order abstract syntax, where alpha-related representations may be treated as one abstract phrase."
          )
        ),
        callout(
          "warning",
          b("세 종류의 ‘바꾸기’를 구분하라", "Distinguish three kinds of replacement"),
          b(
            "대상 변수에 대상 구절을 넣는 치환은 포획 회피가 필요한 형식적 syntactic operation이다. 메타언어 안에서 메타변수 식을 다른 메타언어 식으로 바꾸는 작업도 메타언어의 바인딩 규칙을 따른다. 반면 추론 규칙 스키마의 메타변수 `p`에 구체 대상 assertion을 넣어 인스턴스를 만드는 것은 대상 언어 치환이 아니라 스키마 변수에 값을 정하는 일이다. 대상 변수와 메타변수를 섞으면 불필요한 이름변경을 하거나 실제 포획을 놓치게 된다.",
            "Object-variable substitution is a capture-avoiding syntactic operation. Metalanguage replacement follows metalanguage binding. Instantiating a rule schema by assigning an object phrase to a metavariable is neither of those object-language substitutions."
          )
        )
      ],
      checkpoints: [
        b("`(∀y. x<y)/x↦y+1`을 캡처 없이 계산하고, 잘못된 단순 치환 결과와 의미를 비교하라.", "Compute `(∀y. x<y)/x↦y+1` capture-free and compare it with naive textual replacement."),
        b("동시 치환 `x↦y, y↦x`와 순차 치환 `x↦y` 후 `y↦x`가 왜 다른지 `x+y`로 보이라.", "Show on `x+y` why simultaneous swapping differs from sequential substitution."),
        b("치환 정리의 양변에서 syntactic manipulation과 상태 조작이 각각 어디에 나타나는가?", "Identify the syntactic operation and the semantic state operation on the two sides of the Substitution Theorem."),
        b("알파 변환에서 새 이름이 신선해야 하는 이유를 반례로 설명하라.", "Give a counterexample showing why an alpha-renaming target must be fresh.")
      ],
    },
    {
      id: "practice-workshop",
      covers: "연습 워크숍 · pp. 22–23의 주제 확장",
      minutes: 10,
      title: b("정의에서 손으로 계산하고 증명하기", "Practice workshop: calculate and prove from the definitions"),
      lead: b(
        "답을 읽는 것보다 먼저 종이에 풀고, 아래 해설로 정의를 적용한 순서를 검산하자.",
        "Work each problem on paper before reading the solution, then verify the order in which definitions were applied."
      ),
      blocks: [
        example(
          b("연습 1 — 자연어 statement를 수량자 구조로", "Practice 1 — Translate a counting statement"),
          b("‘0보다 크고 4보다 작은 서로 다른 정수가 적어도 두 개 있다’를 이 장의 assertion으로 적어 보라.", "Express: ‘There are at least two distinct integers greater than zero and less than four.’"),
          [
            b("두 증인을 나타낼 변수 `x`, `y`를 존재 수량자로 도입한다.", "Introduce existential variables `x` and `y` for the witnesses."),
            b("각 증인이 범위 안에 있다는 조건 `0<x ∧ x<4`, `0<y ∧ y<4`를 적는다.", "State the range constraints for both witnesses."),
            b("‘서로 다른’을 잊지 않고 `x≠y`를 논리곱한다.", "Include `x≠y` to enforce distinctness."),
            b("한 답은 `∃x.∃y.(0<x ∧ x<4 ∧ 0<y ∧ y<4 ∧ x≠y)`다.", "One answer is `∃x.∃y.(0<x ∧ x<4 ∧ 0<y ∧ y<4 ∧ x≠y)`."),
            b("‘많아야 두 개’라면 세 임의의 후보가 모두 조건을 만족할 때 적어도 두 후보가 같다는 전칭 구조로 바꿀 수 있다.", "‘At most two’ can be expressed by universally quantifying three candidates and requiring an equality whenever all qualify.")
          ],
          b("개수 조건은 증인의 존재와 서로 다름, 또는 너무 많은 후보 사이의 필연적 일치로 번역한다.", "Counting claims become witness existence plus distinctness, or forced equality among too many candidates.")
        ),
        example(
          b("연습 2 — 나눗셈 기호 없이 약수와 소수", "Practice 2 — Divisibility and primality without division"),
          b("변수들이 자연수만 돈다고 가정하고 `÷`, `rem` 없이 `d`가 `n`의 약수임을 적어 보라.", "Assuming variables range over natural numbers, express that `d` divides `n` without division or remainder."),
          [
            b("약수의 정의를 몫의 존재로 바꾼다: 어떤 자연수 `k`에 대해 `n=d×k`다.", "Use existence of a quotient: for some natural `k`, `n=d×k`."),
            b("따라서 `Divides(d,n) ≡ ∃k. n=d×k`로 약어를 둘 수 있다.", "Define the abbreviation `Divides(d,n) ≡ ∃k. n=d×k`."),
            b("`p`가 소수라는 말은 보통 `p>1`이고 모든 약수 `d`가 1 또는 `p`라는 뜻이다.", "A prime `p` is greater than one and has no divisors other than one and itself."),
            b("`Prime(p) ≡ p>1 ∧ ∀d.((∃k.p=d×k)⇒(d=1∨d=p))`라고 쓸 수 있다.", "Thus `Prime(p) ≡ p>1 ∧ ∀d.((∃k.p=d×k)⇒(d=1∨d=p))`."),
            b("자연수 전제가 없고 정수 전체라면 음의 약수와 부호를 추가로 처리해야 한다.", "Over all integers rather than naturals, negative divisors and signs require additional care.")
          ],
          b("사용 금지된 연산의 의미를 존재 수량자와 허용된 연산으로 다시 정의하는 것이 핵심이다.", "The key technique is to reconstruct a forbidden operation through quantification over allowed operations.")
        ),
        example(
          b("연습 3 — 동시 치환과 불필요한 이름변경 피하기", "Practice 3 — Simultaneous substitution with minimal renaming"),
          b("`∀x.∃z.(x<y ∧ y<z)`에 `y↦x+z`를 치환하라.", "Substitute `y↦x+z` into `∀x.∃z.(x<y ∧ y<z)`."),
          [
            b("교체식 `x+z`의 자유 변수는 `{x,z}`다.", "The replacement has free variables `{x,z}`."),
            b("바깥 `∀x`와 안쪽 `∃z` 모두 교체식의 자유 변수를 포획할 수 있으므로 둘 다 새 이름이 필요하다.", "Both binders conflict with those free variables and must be renamed."),
            b("신선한 이름을 `u`, `w`로 고르면 먼저 구조는 `∀u.∃w.(u<y ∧ y<w)`가 된다.", "With fresh `u,w`, alpha-rename to `∀u.∃w.(u<y ∧ y<w)`."),
            b("이제 자유 `y`에만 `x+z`를 넣어 `∀u.∃w.(u<x+z ∧ x+z<w)`를 얻는다.", "Replace only free `y`, yielding `∀u.∃w.(u<x+z ∧ x+z<w)`."),
            b("결과의 자유 변수 집합은 치환의 자유 변수 공식대로 `{x,z}`다.", "The resulting free-variable set is `{x,z}`, as predicted by the substitution law.")
          ],
          b("바인더를 무조건 모두 바꾸는 것도 의미는 보존하지만, 충돌하는 이름만 바꾸면 계산과 비교가 쉬워진다.", "Renaming every binder can preserve meaning, but renaming only conflicts keeps calculations readable.")
        ),
        example(
          b("연습 4 — 새 바인딩 syntax 설계", "Practice 4 — Design a new binding construct"),
          b("합 `sum v from e₀ to e₁ of e₂`를 정수식으로 추가한다고 하자. 어떤 항목을 정의해야 하는가?", "Add an integer expression `sum v from e₀ to e₁ of e₂`. What must be defined?"),
          [
            b("abstract syntax: `v`, 아래·위 경계식 `e₀,e₁`, 본문 `e₂`를 받는 constructor를 추가한다. `v`는 본문에서만 바인더이고 경계식에서는 자유로 읽는 설계를 명시한다.", "Add a constructor receiving `v,e₀,e₁,e₂`, specifying that `v` binds only in the body, not in the bounds."),
            b("의미: 먼저 현재 상태에서 두 경계를 계산하고, 그 정수 구간의 각 `n`에 대해 본문을 `[σ|v:n]`에서 계산해 합한다.", "Evaluate bounds in the current state, then sum body values in `[σ|v:n]` over the integer interval."),
            b("자유 변수: `FV(e₀)∪FV(e₁)∪(FV(e₂)−{v})`다.", "Free variables are `FV(e₀)∪FV(e₁)∪(FV(e₂)−{v})`."),
            b("치환: 경계식에는 그대로 적용하고, 본문에는 수량자와 같은 신선한 이름 선택 및 수정된 치환 맵을 적용한다.", "Substitute normally in the bounds; in the body use the same fresh-name discipline as a quantifier."),
            b("그 뒤 일치 정리와 치환 정리의 새 constructor 경우를 증명해야 언어 확장이 기존 메타이론과 호환된다.", "Prove new cases of the Coincidence and Substitution Theorems to show compatibility with existing metatheory.")
          ],
          b("바인더를 추가한다는 것은 문법 한 줄을 더하는 일이 아니라 의미·자유 변수·치환·정리를 함께 확장하는 일이다.", "Adding a binder means extending syntax, semantics, free variables, substitution, and metatheory together.")
        ),
        example(
          b("연습 5 — 일치 정리 직접 적용", "Practice 5 — Apply the Coincidence Theorem"),
          b("`p ≡ ∀x.(x+y<z)`이고 두 상태가 `y`, `z`에서만 같다고 하자. `p`의 의미가 같음을 보여라.", "Let `p ≡ ∀x.(x+y<z)` and suppose two states agree only at `y` and `z`. Show that `p` has the same meaning."),
          [
            b("본문의 자유 변수는 `{x,y,z}`지만 수량자가 `x`를 제거하므로 `FV(p)={y,z}`다.", "The body's free variables are `{x,y,z}`, and the quantifier removes `x`, giving `FV(p)={y,z}`."),
            b("가정이 정확히 `FV(p)`에서의 상태 일치를 준다.", "The hypothesis gives agreement exactly on `FV(p)`."),
            b("따라서 일치 정리를 즉시 적용해 `⟦p⟧σ=⟦p⟧σ'`를 얻는다.", "The theorem immediately yields `⟦p⟧σ=⟦p⟧σ'`."),
            b("직접 증명한다면 각 `n`에 대해 두 상태를 `x:n`으로 갱신한 후 본문 변수 세 개에서 일치함을 확인해야 한다.", "A direct proof would update both states at `x` with each `n` and establish agreement on all three body variables.")
          ],
          b("정리는 반복되는 상태 추론을 한 번의 자유 변수 계산으로 압축한다.", "The theorem compresses repeated state reasoning into one free-variable calculation.")
        ),
        callout(
          "proof",
          b("도전 — 치환 합성 법칙의 증명 전략", "Challenge — Strategy for substitution composition"),
          b(
            "`(p/S)/S'`를 한 번의 치환 `p/S''`와 비교하려면 각 원래 자유 변수 `w`에서 `S''(w)`를 `(S(w))/S'`로 정의한다. 비바인더 constructor는 구조적 귀납으로 바로 맞아떨어진다. 바인더에서는 두 계산이 서로 다른 신선한 이름을 고를 수 있으므로 결과가 글자 그대로 같다고 기대하면 안 된다. 대신 이름변경 정리를 사용해 두 결과가 알파 동치임을 보이는 것이 정확한 결론이다.",
            "To compare `(p/S)/S'` with one substitution, define `S''(w)=(S(w))/S'` on variables free in `p`. Nonbinding cases follow structurally. Binder cases may choose different fresh names, so the correct result is equality up to alpha-renaming rather than literal syntax equality."
          )
        ),
        list(
          b("워크숍을 마친 뒤 스스로 확인할 기준", "Self-check after the workshop"),
          b("수량자 개수 조건에서 증인, 범위, 서로 다름을 빠뜨리지 않았다.", "Counting formulas include witnesses, ranges, and distinctness."),
          b("치환 전 교체식의 자유 변수 집합부터 계산했다.", "Before substitution, the replacement's free-variable set was computed."),
          b("수량자 본문에서만 묶이는 이름과 경계식에서 자유인 이름을 구분했다.", "Binder scope was distinguished from expressions outside the scope."),
          b("정리 이름만 쓰지 않고 가정이 정리의 전제와 어떻게 맞는지 밝혔다.", "Applications of theorems explicitly matched hypotheses to theorem premises."),
          b("syntactic 동일성과 알파 동치를 구분했다.", "Literal syntactic equality was distinguished from alpha-equivalence.")
        )
      ],
      checkpoints: [
        b("위 연습을 보지 않고 약수와 소수의 assertion을 다시 구성하라.", "Reconstruct the divisibility and primality assertions without looking back."),
        b("새 바인딩 syntax을 추가할 때 함께 확장해야 하는 다섯 요소를 나열하라.", "List five components that must be extended when adding a new binding construct."),
        b("치환 합성 결과가 문자 그대로 같지 않고 이름변경까지만 같을 수 있는 이유는 무엇인가?", "Why may substitution composition agree only up to renaming rather than literal syntax equality?")
      ],
    },
    {
      id: "chapter-synthesis",
      covers: "1장 종합",
      minutes: 4,
      title: b("네 도구를 하나의 흐름으로 연결하기", "Connecting the four tools into one workflow"),
      lead: b(
        "1장의 개별 정의는 하나의 언어를 설계하고 검증하는 반복 가능한 절차를 이룬다.",
        "The chapter's definitions form a repeatable workflow for designing and validating a language."
      ),
      blocks: [
        list(
          b("1장의 전체 논증", "The complete argument of Chapter 1"),
          b("먼저 표면 문자열에서 독립된 구절 종류와 constructor를 정한다. 단사성·서로소 치역·유한 생성이 재귀와 귀납의 토대를 만든다.", "Define phrase sorts and constructors independently of surface strings; injectivity, disjointness, and finite generation support recursion and induction."),
          b("각 구절 종류에 알맞은 의미 영역을 고르고, 모든 constructor에 syntax-directed 의미 방정식을 하나씩 준다.", "Choose semantic domains and give one syntax-directed equation per constructor."),
          b("syntax-directedness과 초기성으로 의미 함수의 존재·유일성과 합성성을 얻는다.", "Syntax direction and initiality give existence, uniqueness, and compositionality."),
          b("semantics으로 상태에서의 참과 타당성을 정의하고, 추론 규칙의 건전성으로 증명 가능성을 의미적 참에 연결한다.", "Use semantics to define truth and validity, then soundness to connect derivability with semantic truth."),
          b("바인더가 있으면 자유 변수와 캡처 회피 치환을 구조적으로 정의하고, 일치·치환·이름변경 정리로 이름 조작이 의미를 보존함을 증명한다.", "For binders, define free variables and capture-avoiding substitution, then prove coincidence, substitution, and renaming results.")
        ),
        prose(
          b(
            "이 흐름은 뒤에서 그대로 확대된다. 2장은 assertion 대신 명령을 추가하고 의미 영역을 부분 상태 변환으로 바꾼다. 3장은 타당한 산술 assertion을 이용해 프로그램 명세의 추론 규칙을 만든다. 10장에서는 수량자 대신 람다가 이름을 묶고 베타 축약이 치환을 요구한다. 11장에서는 syntactic substitution 대신 환경과 클로저가 같은 의미 효과를 구현한다. 타입 장에서는 ‘의미 값’ 대신 타입 판단을 constructor에 맞춘 규칙으로 유도한다.",
            "The same workflow scales. Chapter 2 adds commands and partial state transformers; Chapter 3 builds program-proof rules; lambda abstraction introduces another binder and beta-reduction uses substitution; closures implement equivalent environment behavior; type systems derive judgments by syntax-directed rules."
          ),
          b(
            "1장을 제대로 이해했다는 기준은 기호를 외우는 것이 아니다. 처음 보는 언어 기능을 만났을 때 ‘추상 constructor는 무엇인가, 의미 함수의 형식은 무엇인가, 각 constructor의 방정식은 부분 의미만 쓰는가, 어떤 이름을 묶는가, 치환 정리가 계속 성립하는가’를 스스로 묻는다면 이 장의 도구를 얻은 것이다.",
            "Mastery is not symbol memorization. It is the habit of asking of a new construct: what is its abstract constructor, what semantic type is appropriate, is the equation compositional, which names are bound, and does substitution still respect meaning?"
          )
        ),
        callout(
          "key",
          b("2장으로 가져갈 질문", "Question to carry into Chapter 2"),
          b(
            "논리식은 모든 상태에서 즉시 진릿값을 내는 전체 함수로 해석할 수 있었다. 하지만 `while true do skip` 같은 명령은 최종 상태를 내지 않는다. syntax-directedness과 합성성을 유지하면서 ‘결과가 없음’을 수학적 의미에 넣으려면 어떤 값과 어떤 순서 구조가 필요한가? 이 질문이 도메인과 최소 고정점으로 이어진다.",
            "Assertions could be interpreted as total functions, but a command such as `while true do skip` produces no final state. How can absence of a result be represented while preserving syntax direction and compositionality? This leads to domains and least fixed points."
          )
        )
      ],
      checkpoints: [
        b("처음 보는 `let v=e in p` syntax을 추가한다면 1장의 순서에 따라 무엇부터 무엇까지 정의할지 설계안을 써 보라.", "Design the additions needed for a new construct `let v=e in p`, following the chapter's workflow."),
        b("1장의 네 도구 가운데 2장에서 가장 직접적으로 수정될 도구와 그 이유를 말하라.", "Which of the four tools changes most directly in Chapter 2, and why?")
      ],
    },
  ].sort((left, right) => {
    const order = [
      "why-logic",
      "abstract-grammar",
      "carriers-constructors",
      "denotations",
      "syntax-directed-semantics",
      "validity-inference",
      "binding-free-variables",
      "capture-avoiding-substitution",
      "practice-workshop",
      "chapter-synthesis",
    ];
    return order.indexOf(left.id) - order.indexOf(right.id);
  }),
};
