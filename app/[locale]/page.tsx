import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseBrowser } from "../components/CourseBrowser";
import { SiteHeader } from "../components/SiteHeader";
import { isLocale, parts, units } from "../../content/course";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "ko" ? "프로그래밍 언어 이론 학습 지도" : "Programming Language Theory Study Map",
    description: locale === "ko"
      ? "Reynolds의 Theories of Programming Languages를 20개 단원으로 공부하는 한영 학습 사이트"
      : "A 20-unit bilingual study companion for Reynolds' Theories of Programming Languages.",
    alternates: { languages: { ko: "/ko", en: "/en" } },
  };
}

export default async function CourseHome({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;
  const firstUnit = units[0];

  return (
    <div className="site-shell" lang={locale}>
      <SiteHeader locale={locale} alternateHref={`/${locale === "ko" ? "en" : "ko"}`} />
      <main>
        <section className="course-hero">
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="course-hero-copy">
            <p className="kicker">{locale === "ko" ? "JOHN C. REYNOLDS · 단계별 학습 동반자" : "JOHN C. REYNOLDS · A GUIDED STUDY COMPANION"}</p>
            <h1>{locale === "ko" ? <>계산에 관한 <em>아름다운 이야기</em>를<br />하나의 지도로 읽다.</> : <>Read the <em>beautiful stories</em><br />of computation as one map.</>}</h1>
            <p className="hero-lead">{locale === "ko"
              ? "추상 구문에서 Algol의 스택 규율까지. 장마다 핵심 질문, 의미 흐름, 손으로 풀어 보는 점검 문제를 연결했습니다."
              : "From abstract syntax to Algol's stack discipline. Every chapter connects a driving question, semantic dataflow, and retrieval practice."}</p>
            <div className="hero-actions">
              <Link className="button primary" href={`/${locale}/overview`}>{locale === "ko" ? "책 전체 개요부터" : "Start with the overview"}<span aria-hidden="true">→</span></Link>
              <Link className="button text" href={`/${locale}/chapter/${firstUnit.slug}`}>{locale === "ko" ? "바로 1장 시작" : "Go to Chapter 1"}<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <aside className="hero-index-card" aria-label={locale === "ko" ? "과정 구성" : "Course structure"}>
            <div className="index-card-header"><span>THE MAP</span><strong>{units.length}</strong></div>
            {parts.map((part) => (
              <div className="index-card-row" key={part.number}>
                <span>0{part.number}</span>
                <p><strong>{part[locale]}</strong><small>{part.range}</small></p>
              </div>
            ))}
            <div className="index-card-footer"><span>{locale === "ko" ? "예상 학습" : "EST. STUDY"}</span><strong>{Math.round(units.reduce((sum, unit) => sum + unit.minutes, 0) / 60)} h</strong></div>
          </aside>
        </section>

        <section className="overview-invitation">
          <div><span>00</span><p className="kicker">{locale === "ko" ? "장별 학습 전에" : "BEFORE THE CHAPTERS"}</p></div>
          <h2>{locale === "ko" ? "먼저 책 전체가 무엇을 설명하려는지 읽어 보세요." : "First see what the book is trying to explain as a whole."}</h2>
          <p>{locale === "ko"
            ? "네 개의 개념 흐름, 반복되는 의미론적 도구, 19개 장의 역할을 한 페이지에서 연결합니다."
            : "Connect the four conceptual arcs, recurring semantic tools, and the role of all 19 chapters on one page."}</p>
          <Link href={`/${locale}/overview`}>{locale === "ko" ? "책 전체 개요 읽기" : "Read the whole-book overview"}<span aria-hidden="true">→</span></Link>
        </section>

        <section className="method-strip" aria-label={locale === "ko" ? "학습 방법" : "Study method"}>
          <p><span>01</span><strong>{locale === "ko" ? "방향 잡기" : "Orient"}</strong>{locale === "ko" ? "이 장이 해결하는 질문을 먼저 읽습니다." : "Start with the question the chapter solves."}</p>
          <p><span>02</span><strong>{locale === "ko" ? "단계 따라가기" : "Trace"}</strong>{locale === "ko" ? "구문 → 의미 → 증명의 흐름을 따라갑니다." : "Follow syntax → meaning → proof."}</p>
          <p><span>03</span><strong>{locale === "ko" ? "인출하기" : "Retrieve"}</strong>{locale === "ko" ? "책을 덮고 체크포인트와 퀴즈를 풉니다." : "Close the book and answer checkpoints."}</p>
          <p><span>04</span><strong>{locale === "ko" ? "연결하기" : "Connect"}</strong>{locale === "ko" ? "다음 장으로 이어지는 개념 다리를 확인합니다." : "Use the bridge into the next chapter."}</p>
        </section>

        <CourseBrowser locale={locale} />

        <section className="source-note">
          <div>
            <p className="kicker">{locale === "ko" ? "출처와 범위" : "SOURCE & SCOPE"}</p>
            <h2>{locale === "ko" ? "책을 대신하지 않는 학습 동반자" : "A companion, not a replacement"}</h2>
          </div>
          <p>{locale === "ko"
            ? "이 사이트는 John C. Reynolds의 Theories of Programming Languages(1998, 2009 디지털 인쇄본)를 장별로 재구성한 독립 요약·설명·자체 제작 퀴즈입니다. 페이지 범위는 인쇄본을 따르며 원문과 연습문제 전문은 포함하지 않습니다. 정확한 정의와 증명은 소장한 교재에서 확인하세요."
            : "This site contains independent summaries, explanations, and original quizzes organized around John C. Reynolds' Theories of Programming Languages (1998; digitally printed 2009). Page references follow the print edition. It does not reproduce the text or full exercises; consult your copy for exact definitions and proofs."}</p>
        </section>
      </main>
      <footer className="site-footer"><span>Semantic Atlas</span><p>{locale === "ko" ? "의미를 따라, 증명하고, 연결하기." : "Trace meaning. Prove behavior. Connect ideas."}</p><Link href="/">KO / EN</Link></footer>
    </div>
  );
}
