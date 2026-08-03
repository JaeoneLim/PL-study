import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { bookOverview } from "../../../content/book-overview";
import { isLocale, parts, units } from "../../../content/course";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "ko" ? "책 전체 개요" : "Whole-book overview",
    description: bookOverview.lead[locale],
    alternates: { languages: { ko: "/ko/overview", en: "/en/overview" } },
  };
}

export default async function BookOverviewPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;
  const firstUnit = units[0];

  return (
    <div className="site-shell overview-shell" lang={locale}>
      <SiteHeader locale={locale} alternateHref={`/${locale === "ko" ? "en" : "ko"}/overview`} />
      <main>
        <section className="overview-hero">
          <div className="overview-breadcrumb">
            <Link href={`/${locale}`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link>
            <span>/</span>
            <span>{locale === "ko" ? "책 전체 개요" : "Whole-book overview"}</span>
          </div>
          <div className="overview-hero-grid">
            <div>
              <p className="kicker">{locale === "ko" ? "읽기 전에 · BOOK OVERVIEW" : "BEFORE YOU READ · BOOK OVERVIEW"}</p>
              <h1>{bookOverview.title[locale]}</h1>
              <p className="overview-lead">{bookOverview.lead[locale]}</p>
              <div className="hero-actions">
                <a className="button primary" href="#argument">{locale === "ko" ? "전체 흐름 읽기" : "Read the argument"}<span aria-hidden="true">↓</span></a>
                <Link className="button text" href={`/${locale}/chapter/${firstUnit.slug}`}>{locale === "ko" ? "1장으로 이동" : "Go to Chapter 1"}<span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <aside className="overview-stats" aria-label={locale === "ko" ? "책 구성" : "Book structure"}>
              <p><strong>19</strong><span>{locale === "ko" ? "장" : "chapters"}</span></p>
              <p><strong>04</strong><span>{locale === "ko" ? "개념 흐름" : "conceptual arcs"}</span></p>
              <p><strong>01</strong><span>{locale === "ko" ? "수학 부록" : "math appendix"}</span></p>
              <p><strong>513</strong><span>{locale === "ko" ? "인쇄본 페이지" : "print pages"}</span></p>
            </aside>
          </div>
        </section>

        <div className="overview-layout">
          <aside className="overview-toc">
            <p>{locale === "ko" ? "이 개요에서" : "IN THIS OVERVIEW"}</p>
            <nav aria-label={locale === "ko" ? "개요 목차" : "Overview contents"}>
              <a href="#argument"><span>01</span>{locale === "ko" ? "책의 중심 논지" : "Central argument"}</a>
              <a href="#arcs"><span>02</span>{locale === "ko" ? "네 개의 흐름" : "Four arcs"}</a>
              <a href="#spine"><span>03</span>{locale === "ko" ? "반복되는 사고 순서" : "Conceptual spine"}</a>
              <a href="#lenses"><span>04</span>{locale === "ko" ? "계속 돌아오는 관점" : "Recurring lenses"}</a>
              <a href="#itinerary"><span>05</span>{locale === "ko" ? "전체 장별 여정" : "Chapter itinerary"}</a>
              <a href="#study"><span>06</span>{locale === "ko" ? "읽는 방법" : "How to study"}</a>
            </nav>
          </aside>

          <article className="overview-content">
            <section className="overview-section" id="argument">
              <p className="section-index">01 · {locale === "ko" ? "책의 중심 논지" : "CENTRAL ARGUMENT"}</p>
              <h2>{locale === "ko" ? "언어의 표면이 아니라, 의미를 만드는 원리를 공부한다" : "Study the principles that create meaning—not the surface of languages"}</h2>
              <p className="overview-thesis">{bookOverview.thesis[locale]}</p>
              <blockquote className="driving-question">
                <span>{locale === "ko" ? "책 전체를 관통하는 질문" : "THE QUESTION THROUGHOUT THE BOOK"}</span>
                <p>{bookOverview.drivingQuestion[locale]}</p>
              </blockquote>
              <div className="overview-note">
                <strong>{locale === "ko" ? "이 책을 읽을 때의 핵심 전환" : "The key shift while reading"}</strong>
                <p>{locale === "ko"
                  ? "‘이 문법은 어떻게 쓰는가?’에서 멈추지 말고 ‘이 언어는 무엇을 관찰하며, 어떤 프로그램을 같다고 여기고, 어떤 성질을 증명하게 하는가?’까지 묻는다."
                  : "Do not stop at “How is this syntax used?” Ask instead: “What does this language observe, which programs count as equivalent, and which properties can its theory prove?”"}</p>
              </div>
            </section>

            <section className="overview-section" id="arcs">
              <p className="section-index">02 · {locale === "ko" ? "네 개의 흐름" : "FOUR CONNECTED ARCS"}</p>
              <h2>{locale === "ko" ? "각 파트는 앞선 모델의 한계를 다음 이론으로 넘긴다" : "Each part turns the previous model’s limit into the next theory"}</h2>
              <div className="arc-list">
                {bookOverview.arcs.map((arc) => (
                  <section className="arc-card" key={arc.number}>
                    <div className="arc-meta"><span>{arc.number}</span><small>CH. {arc.chapters}</small></div>
                    <div>
                      <h3>{arc.title[locale]}</h3>
                      <p className="arc-question">{arc.question[locale]}</p>
                      <p>{arc.summary[locale]}</p>
                      <strong>{arc.outcome[locale]}</strong>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className="overview-section" id="spine">
              <p className="section-index">03 · {locale === "ko" ? "반복되는 사고 순서" : "CONCEPTUAL SPINE"}</p>
              <h2>{locale === "ko" ? "새 언어가 나올 때마다 이 다섯 질문으로 돌아온다" : "Every new language returns to these five questions"}</h2>
              <ol className="semantic-spine">
                {bookOverview.semanticSpine.map((stage) => (
                  <li key={stage.number}>
                    <span>{stage.number}</span>
                    <div><h3>{stage.title[locale]}</h3><p>{stage.detail[locale]}</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="overview-section" id="lenses">
              <p className="section-index">04 · {locale === "ko" ? "계속 돌아오는 관점" : "RECURRING LENSES"}</p>
              <h2>{locale === "ko" ? "장을 넘어 반복되는 여섯 가지 연결 고리" : "Six connections that recur across chapters"}</h2>
              <div className="lens-grid">
                {bookOverview.recurringLenses.map((lens, index) => (
                  <article key={lens.title.en}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{lens.title[locale]}</h3>
                    <p>{lens.detail[locale]}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="overview-section" id="itinerary">
              <p className="section-index">05 · {locale === "ko" ? "전체 장별 여정" : "COMPLETE CHAPTER ITINERARY"}</p>
              <h2>{locale === "ko" ? "각 장이 전체 논증에서 맡는 자리" : "Where every chapter sits in the argument"}</h2>
              <div className="itinerary-list">
                {parts.map((part) => (
                  <section key={part.number}>
                    <header><span>0{part.number}</span><h3>{part[locale]}</h3><small>{part.range}</small></header>
                    <div>
                      {units.filter((unit) => unit.part === part.number).map((unit) => (
                        <Link href={`/${locale}/chapter/${unit.slug}`} key={unit.slug}>
                          <span>{unit.number}</span>
                          <div><strong>{unit.title[locale]}</strong><p>{unit.eyebrow[locale]}</p></div>
                          <span aria-hidden="true">↗</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className="overview-section" id="study">
              <p className="section-index">06 · {locale === "ko" ? "읽는 방법" : "HOW TO STUDY"}</p>
              <h2>{locale === "ko" ? "개요 → 장 → 인출 → 원문의 순서로 공부한다" : "Study in the order: overview → chapter → retrieval → source"}</h2>
              <ol className="overview-method">
                {bookOverview.studyMethod.map((step, index) => (
                  <li key={step.en}><span>{String(index + 1).padStart(2, "0")}</span><p>{step[locale]}</p></li>
                ))}
              </ol>
              <div className="overview-cta">
                <div><p className="kicker">{locale === "ko" ? "이제 첫 번째 도구를 준비할 차례" : "NOW PREPARE THE FIRST TOOL"}</p><h2>{locale === "ko" ? "1장 · 술어 논리" : "Chapter 1 · Predicate Logic"}</h2></div>
                <Link className="button primary" href={`/${locale}/chapter/${firstUnit.slug}`}>{locale === "ko" ? "학습 시작" : "Begin studying"}<span aria-hidden="true">→</span></Link>
              </div>
            </section>
          </article>
        </div>
      </main>
      <footer className="site-footer"><span>Semantic Atlas</span><p>{locale === "ko" ? "전체 지도를 보고, 한 장씩 깊게." : "See the whole map, then go deep one chapter at a time."}</p><Link href={`/${locale}#course-map`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link></footer>
    </div>
  );
}
