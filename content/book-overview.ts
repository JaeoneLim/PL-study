import { b } from "./types";

export const bookOverview = {
  title: b(
    "한 권의 논증으로 읽는 프로그래밍 언어 이론",
    "Programming language theory as one connected argument",
  ),
  lead: b(
    "이 책은 언어 목록이나 문법 모음이 아니다. 프로그램을 수학적 대상으로 만들고, 그 의미와 실행을 설명하고, 올바름과 추상화를 증명하는 여러 이론이 어떻게 서로 이어지는지를 보여 주는 지도다.",
    "This is not a catalog of languages or a collection of grammars. It is a map of how programs become mathematical objects, how their meaning and execution are described, and how theories of correctness and abstraction connect.",
  ),
  thesis: b(
    "Reynolds의 중심 생각은 하나의 언어를 이해하려면 구문만 읽어서는 안 된다는 것이다. 어떤 수학적 세계가 의미를 담는지, 프로그램이 그 세계에서 어떻게 행동하는지, 그리고 그 설명으로 무엇을 증명할 수 있는지를 함께 보아야 한다. 책은 같은 작은 언어를 표시적·전이적·논리적 관점으로 거듭 비추며 각 관점의 힘과 한계를 비교한다.",
    "Reynolds’s central idea is that syntax alone cannot explain a language. We must also ask which mathematical world carries meaning, how programs behave in that world, and what the account lets us prove. The book repeatedly views small languages through denotational, transition-based, and logical lenses so that the power and limits of each become visible.",
  ),
  drivingQuestion: b(
    "구문, 의미, 실행, 증명, 타입을 어떻게 하나의 일관된 설명으로 연결할 것인가?",
    "How can syntax, meaning, execution, proof, and types form one coherent account?",
  ),
  arcs: [
    {
      number: "01",
      chapters: "1–5 + Appendix",
      title: b("기초와 명령형 의미론", "Foundations and imperative semantics"),
      question: b(
        "프로그램의 뜻을 수학적으로 정의하고 그 올바름을 어떻게 증명할까?",
        "How can we define a program’s meaning mathematically and prove it correct?",
      ),
      summary: b(
        "수학 부록과 술어 논리에서 집합·함수·관계·바인딩·추론 규칙을 준비한다. 이어 작은 명령형 언어를 상태 변환으로 해석하고, 재귀를 도메인과 최소 고정점으로 다루며, Hoare식 명세와 검증 조건으로 의미를 증명에 연결한다. 배열, 실패, 입출력은 단순 상태 변환이 부족해지는 지점을 드러내고 계속과 재개를 부른다.",
        "The appendix and predicate logic prepare sets, functions, relations, binding, and inference rules. A small imperative language is then interpreted as state transformation; domains and least fixed points handle recursion; Hoare-style specifications and verification conditions connect meaning to proof. Arrays, failure, and I/O expose the limits of plain state transformers and motivate continuations and resumptions.",
      ),
      outcome: b("‘프로그램은 무엇을 뜻하는가?’에 답하는 기본 어휘", "A basic vocabulary for answering “What does a program mean?”"),
    },
    {
      number: "02",
      chapters: "6–9",
      title: b("시간 속 행동과 동시성", "Behavior over time and concurrency"),
      question: b(
        "결과 하나가 아니라 가능한 실행 과정 전체를 어떻게 설명할까?",
        "How do we describe entire possible executions rather than one final result?",
      ),
      summary: b(
        "의미를 한 단계 전이 관계로 바꾸면 중간 상태와 실행 경로가 보인다. 이 틀은 비결정적 선택, 데드락, 공정성, 공유 변수 동시성을 표현하고, 마침내 CSP에서 공유 상태 대신 통신 사건과 흔적으로 프로세스의 관찰 가능한 행동을 설명한다.",
        "One-step transition relations make intermediate states and execution paths explicit. This framework captures nondeterministic choice, deadlock, fairness, and shared-variable concurrency. CSP then replaces shared state with communication events and traces to describe the observable behavior of processes.",
      ),
      outcome: b("‘프로그램은 어떻게 움직이는가?’를 경로와 관찰로 설명하는 법", "A way to answer “How does a program move?” with paths and observations"),
    },
    {
      number: "03",
      chapters: "10–14",
      title: b("함수, 평가, 제어", "Functions, evaluation, and control"),
      question: b(
        "함수와 바인딩만으로 계산을 만들고 평가 전략의 차이를 어떻게 드러낼까?",
        "How can functions and binding generate computation, and how do evaluation strategies differ?",
      ),
      summary: b(
        "람다 계산이 함수형 계산의 최소 핵심을 제공한다. 이를 적극 평가 언어로 확장하면서 환경과 클로저를 도입하고, 계속과 저장소를 함수 자체로 표현한다. ISWIM 계열 언어와 정상 순서 언어를 비교하면 call-by-value, call-by-name, lazy evaluation이 종료·효율·관찰 가능한 결과에 미치는 영향이 분명해진다.",
        "The lambda calculus supplies a minimal core of functional computation. Extending it to an eager language introduces environments and closures, while continuations and stores can themselves be represented functionally. Comparing ISWIM-like and normal-order languages reveals how call-by-value, call-by-name, and lazy evaluation affect termination, efficiency, and observable results.",
      ),
      outcome: b("바인딩과 평가 순서가 언어 설계를 바꾸는 이유", "Why binding and evaluation order reshape language design"),
    },
    {
      number: "04",
      chapters: "15–19",
      title: b("타입, 추상화, Algol", "Types, abstraction, and Algol"),
      question: b(
        "안전한 프로그램과 감춰진 구현을 어떻게 정적으로 표현할까?",
        "How can safe programs and hidden implementations be expressed statically?",
      ),
      summary: b(
        "단순 타입의 유도 규칙과 건전성에서 시작해 서브타이핑·교차 타입으로 사용 가능성을 세밀하게 표현한다. 전칭 다형성은 여러 타입에서 균일한 코드를, 실존 타입은 표현 타입을 감춘 모듈을 설명한다. 마지막 Algol 계열 언어에서는 표현식·수용자·명령 같은 구절 타입과 블록 구조가 함수형 추상화와 가변 상태를 한 체계로 결합한다.",
        "Typing rules and soundness for simple types lead to subtyping and intersection types, which refine where terms may be used. Universal polymorphism explains uniform code across types; existential types explain modules that hide representation. The final Algol-like language combines functional abstraction and mutable state through phrase types—expressions, acceptors, and commands—and block structure.",
      ),
      outcome: b("‘어떤 프로그램이 안전하게 조합되는가?’에 대한 정적 설명", "A static account of “Which programs compose safely?”"),
    },
  ],
  semanticSpine: [
    {
      number: "01",
      title: b("구문을 분리한다", "Separate the syntax"),
      detail: b("구체 표기에서 추상 구문을 떼어 내고, 자유 변수와 바인딩 범위를 명시한다.", "Detach abstract syntax from notation and make free variables and binding scopes explicit."),
    },
    {
      number: "02",
      title: b("의미의 세계를 고른다", "Choose a world of meanings"),
      detail: b("값, 상태 변환, 도메인, 전이, 흔적 중 무엇이 관찰을 담는지 결정한다.", "Decide whether values, state transformers, domains, transitions, or traces carry the relevant observations."),
    },
    {
      number: "03",
      title: b("구문과 의미를 연결한다", "Connect syntax to meaning"),
      detail: b("의미 함수나 전이 규칙을 합성적으로 정의해 복합 구절의 뜻을 부분에서 만든다.", "Define semantic functions or transition rules compositionally so compound phrases derive meaning from their parts."),
    },
    {
      number: "04",
      title: b("행동을 추론한다", "Reason about behavior"),
      detail: b("구조적 귀납법, 고정점 귀납법, 불변식, 검증 조건으로 원하는 성질을 증명한다.", "Use structural and fixed-point induction, invariants, and verification conditions to prove desired properties."),
    },
    {
      number: "05",
      title: b("안전하게 추상화한다", "Abstract safely"),
      detail: b("타입, 다형성, 모듈, 블록 구조로 허용되는 조합과 감춰야 할 구현을 표현한다.", "Use types, polymorphism, modules, and block structure to express legal composition and hidden implementation."),
    },
  ],
  recurringLenses: [
    {
      title: b("바인딩과 치환", "Binding and substitution"),
      detail: b("람다, 양화사, 선언은 모두 이름의 범위와 캡처 회피를 요구한다.", "Lambdas, quantifiers, and declarations all require scope and capture avoidance."),
    },
    {
      title: b("합성성", "Compositionality"),
      detail: b("전체의 의미를 부분의 의미에서 만들 수 있어야 언어 정의가 확장 가능하다.", "Language definitions scale when the meaning of a whole is built from the meanings of its parts."),
    },
    {
      title: b("재귀와 고정점", "Recursion and fixed points"),
      detail: b("자기 참조 프로그램의 의미를 근사들의 극한과 최소 해로 구성한다.", "Self-referential programs receive meaning through limits of approximations and least solutions."),
    },
    {
      title: b("문맥과 관찰", "Context and observation"),
      detail: b("동일한 결과처럼 보여도 종료, 실패, I/O, 흔적을 관찰하면 프로그램은 달라질 수 있다.", "Programs with the same apparent result may differ once termination, failure, I/O, or traces become observable."),
    },
    {
      title: b("제어와 상태", "Control and state"),
      detail: b("계속, 재개, 저장소는 ‘다음에 할 일’과 ‘지금 기억하는 것’을 의미 속에 드러낸다.", "Continuations, resumptions, and stores expose ‘what happens next’ and ‘what is remembered now’ inside meaning."),
    },
    {
      title: b("타입과 표현 독립성", "Types and representation independence"),
      detail: b("정적 규칙은 잘못된 조합을 막고, 추상 타입은 클라이언트가 구현 세부에 의존하지 못하게 한다.", "Static rules reject invalid combinations, while abstract types prevent clients from depending on representation details."),
    },
  ],
  studyMethod: [
    b("먼저 이 개요에서 현재 장이 전체 논증에서 맡은 역할을 찾는다.", "First locate the chapter’s role in the book’s overall argument on this overview."),
    b("장 페이지의 핵심 질문을 읽고 구문 → 의미 → 증명 순서를 따라간다.", "Read the chapter’s driving question and follow the syntax → meaning → proof sequence."),
    b("표기보다 모델의 선택에 집중한다. 무엇을 관찰하고 무엇을 추상화했는지 묻는다.", "Focus on the choice of model rather than notation: ask what is observed and what is abstracted away."),
    b("체크포인트와 퀴즈를 책 없이 풀고, 틀린 개념만 원문 정의와 증명으로 돌아가 확인한다.", "Answer checkpoints and quizzes without the book, then return to the original definitions and proofs only for weak concepts."),
  ],
} as const;
