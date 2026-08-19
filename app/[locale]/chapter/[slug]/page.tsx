import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompletionButton } from "../../../components/CompletionButton";
import { LongformLesson } from "../../../components/LongformLesson";
import { QuizPanel } from "../../../components/QuizPanel";
import { ResizableChapterLayout } from "../../../components/ResizableChapterLayout";
import { SiteHeader } from "../../../components/SiteHeader";
import { chapterGuides } from "../../../../content/chapter-guides";
import { chapterLongforms } from "../../../../content/chapter-longforms";
import { getUnit, getUnitNeighbors, isLocale, units } from "../../../../content/course";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["ko", "en"].flatMap((locale) => units.map((unit) => ({ locale, slug: unit.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const unit = getUnit(slug);
  if (!unit) return {};
  return {
    title: `${unit.number}. ${unit.title[locale]}`,
    description: unit.overview[locale],
    alternates: { languages: { ko: `/ko/chapter/${slug}`, en: `/en/chapter/${slug}` } },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const unit = getUnit(slug);
  if (!unit) notFound();
  const locale = localeParam;
  const guide = chapterGuides[slug];
  if (!guide) notFound();
  const longform = chapterLongforms[slug];
  const { previous, next } = getUnitNeighbors(slug);
  const headingsInEnglish = slug === "predicate-logic" || slug === "simple-imperative-language";
  const headingLocale = headingsInEnglish ? "en" : locale;

  return (
    <div className="site-shell chapter-shell" lang={locale}>
      <SiteHeader locale={locale} alternateHref={`/${locale === "ko" ? "en" : "ko"}/chapter/${slug}`} />
      <main>
        <section className="chapter-hero">
          <div className="chapter-breadcrumb"><Link href={`/${locale}`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link><span>/</span><span>{unit.number}</span></div>
          <div className="chapter-hero-grid">
            <div>
              <p className="kicker">
                PART {unit.part} · PP. {unit.pages} · {longform ? `${longform.readingMinutes} MIN+` : (locale === "ko" ? "요약본" : "GUIDED BRIEF")}
              </p>
              <h1><span>{unit.number}</span>{unit.title[headingLocale]}</h1>
              <p className="chapter-eyebrow">{unit.eyebrow[headingLocale]}</p>
              <p className="chapter-overview">{unit.overview[locale]}</p>
              <div className="chapter-actions">
                <CompletionButton locale={locale} slug={slug} />
                <Link className="chapter-glossary-button" href={`/${locale}/chapter/${slug}/glossary`}>
                  <span aria-hidden="true">Aa</span>{locale === "ko" ? "이 장의 용어집" : "Chapter glossary"}<span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <aside className="learning-goals">
              <p>{locale === "ko" ? "이 장을 마치면" : "AFTER THIS UNIT"}</p>
              <ol>{unit.goals.map((goal) => <li key={goal.en}>{goal[locale]}</li>)}</ol>
            </aside>
          </div>
        </section>

        <ResizableChapterLayout
          locale={locale}
          sidebar={<aside className="chapter-toc">
            <p>{locale === "ko" ? "학습 단계" : "ON THIS PAGE"}</p>
            <nav aria-label={locale === "ko" ? "장 목차" : "Chapter contents"}>
              <a href="#contents"><span>00</span>{locale === "ko" ? "상세 내용 지도" : "Detailed contents"}</a>
              {longform
                ? longform.sections.map((section, index) => {
                  const textbookSectionNumber = section.covers.match(/^§(\d+\.\d+)/)?.[1];
                  const navigationTitle = textbookSectionNumber
                    ? section.title[headingLocale].replace(new RegExp(`^${textbookSectionNumber.replace(".", "\\.")}\\s+`), "")
                    : section.title[headingLocale];
                  return <a href={`#${section.id}`} key={section.id}>
                    <span>{textbookSectionNumber ?? String(index + 1).padStart(2, "0")}</span>{navigationTitle}
                  </a>;
                })
                : unit.steps.map((step, index) => <a href={`#${step.id}`} key={step.id}><span>{String(index + 1).padStart(2, "0")}</span>{step.title[locale].replace(/^.*?—\s*/, "")}</a>)}
              {longform && <a href="#review"><span>R</span>{locale === "ko" ? "압축 복습" : "Condensed review"}</a>}
              <Link href={`/${locale}/chapter/${slug}/glossary`}><span>G</span>{locale === "ko" ? "장별 용어집" : "Chapter glossary"}</Link>
              <a href="#quiz"><span>✓</span>{locale === "ko" ? "개념 확인" : "Concept check"}</a>
            </nav>
            <div className="toc-terms"><p>{locale === "ko" ? "핵심 용어" : "KEY TERMS"}</p>{unit.keyTerms.map((term) => <span key={term.en}>{term[locale]}<small>{locale === "ko" ? term.en : term.ko}</small></span>)}</div>
          </aside>}
        >

          <article className="lesson-content">
            <section className="chapter-deep-guide" id="contents">
              <p className="section-index">00 · {locale === "ko" ? "장 전체 내용 지도" : "DETAILED CHAPTER MAP"}</p>
              <h2>{headingsInEnglish || locale === "en" ? "What this chapter actually covers" : "이 장에서 실제로 다루는 것"}</h2>
              <p className="deep-guide-purpose">{guide.purpose[locale]}</p>
              {guide.termPrimer && (
                <section className="term-primer" aria-labelledby={`${slug}-term-primer-heading`}>
                  <header>
                    <p>{locale === "ko" ? "처음 읽는 용어 연결 지도" : "FIRST-PASS TERMINOLOGY MAP"}</p>
                    <h3 id={`${slug}-term-primer-heading`}>{guide.termPrimer.title[headingLocale]}</h3>
                    <div>{guide.termPrimer.lead[locale]}</div>
                  </header>
                  <ol>
                    {guide.termPrimer.connections.map((item) => (
                      <li key={item.path}>
                        <code>{item.path}</code>
                        <p>{item.explanation[locale]}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              <div className="section-brief-list">
                {guide.sections.map((item) => (
                  <article key={item.covers}>
                    <span>{item.covers}</span>
                    <div><h3>{item.title[headingLocale]}</h3><p>{item.detail[locale]}</p></div>
                  </article>
                ))}
              </div>
              <div className="precision-panels">
                <section>
                  <p>{locale === "ko" ? "반드시 남겨야 할 핵심" : "WHAT TO RETAIN"}</p>
                  <ul>{guide.takeaways.map((item) => <li key={item.en}>{item[locale]}</li>)}</ul>
                </section>
                <section className="caution-panel">
                  <p>{locale === "ko" ? "자주 생기는 혼동" : "COMMON CONFUSIONS"}</p>
                  <ul>{guide.cautions.map((item) => <li key={item.en}>{item[locale]}</li>)}</ul>
                </section>
              </div>
            </section>

            {longform && <LongformLesson lesson={longform} locale={locale} headingLocale={headingLocale} />}

            <section className={longform ? "lesson-review" : undefined} id={longform ? "review" : undefined}>
              {longform && (
                <header className="lesson-review-header">
                  <p className="section-index">R · {locale === "ko" ? "압축 복습" : "CONDENSED REVIEW"}</p>
                  <h2>{headingsInEnglish || locale === "en" ? `Chapter ${Number(unit.number)} again in four steps` : `네 단계로 다시 잡는 ${unit.number}장`}</h2>
                  <p>{locale === "ko" ? "장문 본문을 읽은 뒤 핵심 연결을 빠르게 회상하는 구간입니다." : "Use this section to retrieve the central connections after the complete lesson."}</p>
                </header>
              )}
              {unit.steps.map((step, index) => (
                <section className="study-step" id={step.id} key={step.id}>
                  <div className="step-meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{step.covers}</small></div>
                  <div className="step-body">
                    <h2>{step.title[headingLocale]}</h2>
                    <p className="step-summary">{step.summary[locale]}</p>
                    <p>{step.detail[locale]}</p>
                    {step.notation && <div className="notation" aria-label={locale === "ko" ? "핵심 표기" : "Key notation"}><span>NOTATION</span><code>{step.notation}</code></div>}
                    <div className="checkpoint"><span aria-hidden="true">?</span><div><strong>{locale === "ko" ? "책을 덮고 답해 보기" : "Close the book and answer"}</strong><p>{step.checkpoint[locale]}</p></div></div>
                  </div>
                </section>
              ))}
            </section>

            <section className="bridge-card">
              <p className="kicker">{locale === "ko" ? "개념 다리" : "CONCEPTUAL BRIDGE"}</p>
              <h2>{next ? (headingsInEnglish || locale === "en" ? `Next: ${next.title.en}` : `다음: ${next.title.ko}`) : (headingsInEnglish || locale === "en" ? "Return to the full map" : "전체 지도 다시 보기")}</h2>
              <p>{unit.bridge[locale]}</p>
            </section>

            <div id="quiz"><QuizPanel locale={locale} headingLocale={headingLocale} questions={unit.quiz} slug={slug} /></div>
          </article>
        </ResizableChapterLayout>

        <nav className="chapter-neighbors" aria-label={locale === "ko" ? "이전 및 다음 장" : "Previous and next chapters"}>
          {previous ? <Link href={`/${locale}/chapter/${previous.slug}`}><span>← {locale === "ko" ? "이전" : "PREVIOUS"}</span><strong>{previous.number}. {previous.title[locale]}</strong></Link> : <Link href={`/${locale}/overview`}><span>← {locale === "ko" ? "먼저 읽기" : "START HERE"}</span><strong>{locale === "ko" ? "책 전체 개요" : "Whole-book overview"}</strong></Link>}
          {next ? <Link className="next" href={`/${locale}/chapter/${next.slug}`}><span>{locale === "ko" ? "다음" : "NEXT"} →</span><strong>{next.number}. {next.title[locale]}</strong></Link> : <Link className="next" href={`/${locale}`}><span>{locale === "ko" ? "완료" : "FINISH"} →</span><strong>{locale === "ko" ? "과정 지도" : "Course map"}</strong></Link>}
        </nav>
      </main>
      <footer className="site-footer"><span>Theories of PL</span><p>{locale === "ko" ? "독립 학습 노트 · 원문 미수록" : "Independent study notes · textbook not included"}</p><Link href={`/${locale}`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link></footer>
    </div>
  );
}
