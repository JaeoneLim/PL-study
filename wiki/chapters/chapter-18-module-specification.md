---
type: chapter
title: "18. 모듈 명세"
title_en: "Module Specification"
created: 2026-08-03
updated: 2026-08-03
status: evergreen
volatile: low
pages: "398–414"
source: ".raw/private/reynolds-theories-of-programming-languages-2009.pdf"
tags:
  - programming-languages
  - semantics
  - reynolds
related:
  - "[[chapter-15-simple-type-system]]"
  - "[[chapter-16-subtypes-intersection-types]]"
  - "[[chapter-17-polymorphism]]"
---

# 18. 모듈 명세 (Module Specification)

> [!abstract] 한눈에 보기
> 타입 정의와 실존 양화를 사용해 모듈이 내부 표현 타입을 숨기면서 연산 계약을 공개하는 방식을 형식화한다.
>
> **English:** Type definitions and existential quantification formalize modules that hide an internal representation type while exposing an operational contract.

## 학습 목표

- 투명·불투명 타입 정의를 구분한다.
  - EN: Distinguish transparent and opaque type definitions.
- 실존 패키지의 pack/unpack 규칙을 사용한다.
  - EN: Use pack and unpack rules for existential packages.
- 한 추상을 다른 추상으로 구현하는 표현 함수를 추적한다.
  - EN: Trace representation functions when implementing one abstraction with another.

## 핵심 용어

- **추상 타입 (abstract type)**
- **실존 타입 (existential type)**
- **패키징 (packing)**
- **개봉 (unpacking)**
- **표현 독립성 (representation independence)**

## 장별 용어 해설

> [!info] 비유 사용법
> 하드웨어 예시는 첫 mental model을 만들기 위한 근사다. 비유와 정의가 어긋나면 각 항목의 정확한 정의를 기준으로 삼는다.

### 추상 타입 (abstract type)

모듈 밖에서는 내부 표현을 알 수 없고 공개된 연산을 통해서만 값을 만들고 관찰할 수 있는 타입이다.

> [!example] 엔지니어 관점
> 내부 register map을 숨기고 command/status interface만 공개한 IP와 같다. integration 코드는 구현 bit layout에 직접 의존할 수 없다.

**English definition:** A type whose internal representation is hidden outside a module, so clients can create and observe values only through exported operations.

> [!example] Engineering view
> It is like an IP block that hides its internal register map and exposes only command/status operations. Integration code cannot depend on the implementation’s bit layout.

### 실존 타입 (existential type)

‘어떤 숨겨진 표현 타입 α가 존재하고, 그 α로 이 인터페이스 T를 구현한다’를 `∃α.T`로 나타내는 패키지 타입이다.

> [!example] 엔지니어 관점
> 내부 SRAM인지 register array인지 밝히지 않은 채 read/write 계약만 제공하는 sealed IP package와 같다.

**English definition:** A package type `∃α.T` saying that some hidden representation type α exists together with an implementation of interface T at that α.

> [!example] Engineering view
> It is like a sealed IP package that exposes a read/write contract without revealing whether its storage is SRAM or a register array.

```text
∃α. T
```

### 패키징 (packing)

구체 표현 타입과 그 구현 값을 실존 타입 뒤에 봉인하여 클라이언트가 표현을 직접 사용하지 못하게 하는 연산이다.

> [!example] 엔지니어 관점
> 검증된 RTL과 내부 parameter를 encrypted IP wrapper 안에 넣고 공개 port 계약만 남기는 과정과 비슷하다.

**English definition:** The operation that seals a concrete representation type and implementation value behind an existential type so clients cannot use the representation directly.

> [!example] Engineering view
> It resembles placing verified RTL and internal parameters inside an encrypted IP wrapper while exposing only the public port contract.

```text
pack [R, m] as ∃α.T
```

### 개봉 (unpacking)

실존 패키지를 열어 숨겨진 타입을 신선한 추상 이름으로, 구현을 인터페이스 값으로 잠시 사용하되 표현이 밖으로 새지 못하게 하는 연산이다.

> [!example] 엔지니어 관점
> IP wrapper 안쪽에서만 private bus type을 연결하고 외부에는 표준 interface만 계속 노출하는 integration scope와 비슷하다.

**English definition:** The operation that opens an existential package, temporarily naming its hidden type abstractly and its implementation as an interface value, without allowing the representation to escape.

> [!example] Engineering view
> It resembles an integration scope where a private bus type is connected only inside an IP wrapper while the outside continues to see a standard interface.

```text
unpack [α, x] = p in e
```

### 표현 독립성 (representation independence)

공개 연산의 관찰 결과를 보존하는 한 내부 표현을 다른 것으로 바꿔도 모든 올바른 클라이언트의 동작이 같다는 성질이다.

> [!example] 엔지니어 관점
> FIFO를 flip-flop array에서 SRAM macro로 바꿔도 latency·ordering·handshake 계약이 같으면 상위 RTL을 수정할 필요가 없는 것과 같다.

**English definition:** The property that one internal representation can replace another without changing any well-behaved client, provided observations through exported operations are preserved.

> [!example] Engineering view
> It is like replacing a FIFO’s flip-flop array with an SRAM macro without changing surrounding RTL because latency, ordering, and handshake contracts remain identical.

## 장 전체 내용 지도

> [!abstract] 이 장의 역할
> 추상 타입과 실존 타입으로 구현 표현을 숨기고, 공개 연산만을 통해 서로 다른 구현이 같은 모듈 명세를 만족하게 한다.
>
> **English:** Uses abstract and existential types to hide representations so different implementations can satisfy the same module specification through public operations alone.

### §18.1 · 타입 정의와 불투명 경계

투명 타입 정의는 새 이름과 표현 타입의 동등성을 공개하지만 불투명 정의는 구현 안에서만 그 관계를 허용한다. 클라이언트는 내보낸 연산으로만 값을 만들고 관찰한다.

**English — Type definitions and opaque boundaries:** Transparent definitions expose equality between a new name and its representation; opaque definitions permit that knowledge only inside the implementation. Clients construct and observe values only through exports.

### §18.2 · 실존 패키지와 모듈

∃α.T는 어떤 표현 타입 α와 그 위의 T 구현이 존재함을 말하되 α를 숨긴다. pack은 구현을 봉인하고 unpack은 신선한 추상 타입으로 열며 표현이 범위 밖으로 새지 못하게 한다.

**English — Existential packages and modules:** ∃α.T states that some representation α and implementation of T exist while hiding α. Pack seals the implementation; unpack opens it under a fresh abstract name that may not escape.

### §18.3 · 추상화 위에 추상화 구현

기존 모듈의 공개 연산만 이용해 새 자료 추상화를 구현하고, 두 표현 사이의 추상 관계가 모든 연산에서 보존됨을 보인다. 타입 일치와 행동 명세 충족을 분리한다.

**English — Implementing abstractions from abstractions:** Builds one data abstraction using only another module’s public operations and proves an abstraction relation is preserved by every operation. Type matching is separated from behavioral specification.

## 반드시 남겨야 할 핵심

- 모듈은 값 묶음뿐 아니라 숨겨진 표현 타입과 그 연산의 패키지다.
  - EN: A module packages a hidden representation type together with its operations, not merely a record of values.
- 표현 독립성은 인터페이스를 지키는 모든 클라이언트가 구현 차이를 관찰하지 못한다는 성질이다.
  - EN: Representation independence means no interface-respecting client can observe the implementation choice.
- 실존 타입은 정보 은닉을 정적 범위 규칙으로 강제한다.
  - EN: Existential types enforce information hiding through static scope rules.

> [!warning] 자주 생기는 혼동
> - unpack된 추상 타입이나 그에 의존하는 값을 허용 범위 밖으로 유출하지 않는다.
>   - EN: Do not let an unpacked abstract type or values depending on it escape their permitted scope.
> - 같은 함수 타입을 가진 구현들이 반드시 같은 추상 법칙을 만족하는 것은 아니다.
>   - EN: Implementations with the same function types do not necessarily satisfy the same abstraction laws.

## 1단계 — 타입 이름에 경계 세우기 — §18.1

타입 정의는 표현 타입에 이름을 주며, 불투명 정의는 클라이언트가 그 등식을 사용하지 못하게 한다.

구현 내부에서는 새 타입과 표현 타입의 변환을 알 수 있지만 인터페이스 밖에서는 제공된 연산만 사용할 수 있다. 이 정보 은닉이 표현 교체 가능성의 기반이다.

> [!question] 책을 덮고 답해 보기
> 추상 stack 타입이 list와 같다는 사실을 공개하면 클라이언트가 어떤 불변식을 깨뜨릴 수 있는가?

### English companion

A type definition names a representation type; an opaque definition prevents clients from using that equality.

Inside the implementation, conversions to the representation are known; outside, only exported operations are available. This information hiding enables representation replacement.

---

## 2단계 — '어떤 표현이 존재한다'로 모듈 쓰기 — §18.2

`∃α.T` 패키지는 숨겨진 표현 타입 α와 그 타입에서 T를 만족하는 구현을 함께 담는다.

pack은 구체 표현 타입과 구현을 봉인한다. unpack은 α를 신선한 추상 타입으로 열어 T의 연산을 쓰게 하지만, α나 그 값이 범위 밖으로 표현을 누설하면 안 된다.

> [!question] 책을 덮고 답해 보기
> unpack의 α 신선성 조건이 필요한 이유는?

### English companion

A package of type `∃α.T` contains a hidden representation α and an implementation satisfying T at that type.

Pack seals a concrete representation and implementation. Unpack opens α as a fresh abstract type for using operations in T, but α and its values must not escape in a way that leaks the representation.

---

## 3단계 — 표현 독립성의 관찰 기준 — §18.2

서로 다른 표현을 가진 두 패키지가 인터페이스의 모든 클라이언트에서 같은 관찰을 내면 같은 모듈로 취급할 수 있다.

클라이언트는 α 값을 직접 분해하지 못하므로 공개 연산이 보존하는 관계만 관찰한다. 추상화 정리는 구현 사이의 관계가 각 연산에서 보존되면 클라이언트 동치가 따름을 보여 주는 방향으로 읽을 수 있다.

> [!question] 책을 덮고 답해 보기
> 리스트 기반 stack과 배열 기반 stack 사이에 어떤 관계를 세우면 같은 인터페이스 구현임을 보일 수 있는가?

### English companion

Two packages with different representations are equivalent when every interface-respecting client observes the same behavior.

Because clients cannot inspect α directly, they observe only relations preserved by exported operations. An abstraction theorem shows that a representation relation preserved by each operation yields client equivalence.

---

## 4단계 — 한 추상화를 다른 추상화로 구현 — §18.3

기존 추상 타입의 연산만 사용해 새 모듈을 만들면 내부 표현 관계를 합성해 정확성을 증명할 수 있다.

구현은 단순 타입 일치 이상으로 연산 법칙을 보존해야 한다. 모듈 명세는 숨겨진 표현과 공개 관찰 사이의 증명 경계를 명확히 한다.

> [!question] 책을 덮고 답해 보기
> 큐를 두 스택으로 구현할 때 타입 일치 외에 보존해야 할 핵심 추상 관계는?

### English companion

Building a module only from operations of an existing abstraction lets representation relations compose into a correctness proof.

An implementation must preserve operational laws, not merely match types. Module specifications clarify the proof boundary between hidden representation and public observations.

## 자체 점검 퀴즈

### Q1. 실존 타입이 모듈에서 숨기는 것은?

What does an existential type hide in a module?

- A. 표현 타입 / The representation type
- B. 모든 연산 이름 / All operation names
- C. 프로그램 종료 여부 / Whether the program terminates

> [!success]- 정답과 해설
> **A.** 클라이언트는 표현을 모르고 공개 연산만 사용한다.
>
> EN: Clients know only exported operations, not the representation.

### Q2. pack의 역할은?

What does pack do?

- A. 구체 표현과 구현을 실존 인터페이스로 봉인 / Seal a representation and implementation behind an existential interface
- B. 모든 타입을 같게 만듦 / Make all types equal
- C. 동적 바인딩 활성화 / Enable dynamic binding

> [!success]- 정답과 해설
> **A.** 구현 세부를 숨기는 도입 연산이다.
>
> EN: It is the introduction form that hides implementation details.

### Q3. 표현 독립성이 허용하는 것은?

What does representation independence permit?

- A. 관찰 동작을 보존하며 내부 표현 교체 / Replace an internal representation while preserving observations
- B. 인터페이스 삭제 / Delete the interface
- C. 모든 클라이언트 수정 / Modify every client

> [!success]- 정답과 해설
> **A.** 추상 경계를 지키는 클라이언트는 차이를 보지 못한다.
>
> EN: Clients respecting the abstraction boundary cannot tell the difference.

## 다음 개념으로

추상 타입과 함수형 모듈의 아이디어를 마지막 장에서는 명령·식·위치·프로시저가 공존하는 Algol식 블록 구조에 적용한다.

**English:** The final chapter applies abstraction and typing ideas to Algol-like block structure, where commands, expressions, locations, and procedures coexist.

## 출처 경계

- Source: `.raw/private/reynolds-theories-of-programming-languages-2009.pdf`, pp. 398–414.
- 이 노트의 설명과 문항은 독립적으로 작성된 학습 자료다.
- 정확한 정의, 정리, 증명, 원 연습문제는 로컬 교재에서 확인한다.
