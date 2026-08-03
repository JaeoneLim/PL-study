import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompletionButton } from "../../../components/CompletionButton";
import { QuizPanel } from "../../../components/QuizPanel";
import { SiteHeader } from "../../../components/SiteHeader";
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
  const { previous, next } = getUnitNeighbors(slug);

  return (
    <div className="site-shell chapter-shell" lang={locale}>
      <SiteHeader locale={locale} alternateHref={`/${locale === "ko" ? "en" : "ko"}/chapter/${slug}`} />
      <main>
        <section className="chapter-hero">
          <div className="chapter-breadcrumb"><Link href={`/${locale}`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link><span>/</span><span>{unit.number}</span></div>
          <div className="chapter-hero-grid">
            <div>
              <p className="kicker">PART {unit.part} · PP. {unit.pages} · {unit.minutes} MIN</p>
              <h1><span>{unit.number}</span>{unit.title[locale]}</h1>
              <p className="chapter-eyebrow">{unit.eyebrow[locale]}</p>
              <p className="chapter-overview">{unit.overview[locale]}</p>
              <CompletionButton locale={locale} slug={slug} />
            </div>
            <aside className="learning-goals">
              <p>{locale === "ko" ? "이 장을 마치면" : "AFTER THIS UNIT"}</p>
              <ol>{unit.goals.map((goal) => <li key={goal.en}>{goal[locale]}</li>)}</ol>
            </aside>
          </div>
        </section>

        <div className="chapter-layout">
          <aside className="chapter-toc">
            <p>{locale === "ko" ? "학습 단계" : "ON THIS PAGE"}</p>
            <nav aria-label={locale === "ko" ? "장 목차" : "Chapter contents"}>
              {unit.steps.map((step, index) => <a href={`#${step.id}`} key={step.id}><span>{String(index + 1).padStart(2, "0")}</span>{step.title[locale].replace(/^.*?—\s*/, "")}</a>)}
              <a href="#quiz"><span>✓</span>{locale === "ko" ? "개념 확인" : "Concept check"}</a>
            </nav>
            <div className="toc-terms"><p>{locale === "ko" ? "핵심 용어" : "KEY TERMS"}</p>{unit.keyTerms.map((term) => <span key={term.en}>{term[locale]}<small>{locale === "ko" ? term.en : term.ko}</small></span>)}</div>
          </aside>

          <article className="lesson-content">
            {unit.steps.map((step, index) => (
              <section className="study-step" id={step.id} key={step.id}>
                <div className="step-meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{step.covers}</small></div>
                <div className="step-body">
                  <h2>{step.title[locale]}</h2>
                  <p className="step-summary">{step.summary[locale]}</p>
                  <p>{step.detail[locale]}</p>
                  {step.notation && <div className="notation" aria-label={locale === "ko" ? "핵심 표기" : "Key notation"}><span>NOTATION</span><code>{step.notation}</code></div>}
                  <div className="checkpoint"><span aria-hidden="true">?</span><div><strong>{locale === "ko" ? "책을 덮고 답해 보기" : "Close the book and answer"}</strong><p>{step.checkpoint[locale]}</p></div></div>
                </div>
              </section>
            ))}

            <section className="bridge-card">
              <p className="kicker">{locale === "ko" ? "개념 다리" : "CONCEPTUAL BRIDGE"}</p>
              <h2>{next ? (locale === "ko" ? `다음: ${next.title.ko}` : `Next: ${next.title.en}`) : (locale === "ko" ? "전체 지도 다시 보기" : "Return to the full map")}</h2>
              <p>{unit.bridge[locale]}</p>
            </section>

            <div id="quiz"><QuizPanel locale={locale} questions={unit.quiz} slug={slug} /></div>
          </article>
        </div>

        <nav className="chapter-neighbors" aria-label={locale === "ko" ? "이전 및 다음 장" : "Previous and next chapters"}>
          {previous ? <Link href={`/${locale}/chapter/${previous.slug}`}><span>← {locale === "ko" ? "이전" : "PREVIOUS"}</span><strong>{previous.number}. {previous.title[locale]}</strong></Link> : <span />}
          {next ? <Link className="next" href={`/${locale}/chapter/${next.slug}`}><span>{locale === "ko" ? "다음" : "NEXT"} →</span><strong>{next.number}. {next.title[locale]}</strong></Link> : <Link className="next" href={`/${locale}`}><span>{locale === "ko" ? "완료" : "FINISH"} →</span><strong>{locale === "ko" ? "과정 지도" : "Course map"}</strong></Link>}
        </nav>
      </main>
      <footer className="site-footer"><span>Semantic Atlas</span><p>{locale === "ko" ? "독립 학습 노트 · 원문 미수록" : "Independent study notes · textbook not included"}</p><Link href={`/${locale}`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link></footer>
    </div>
  );
}
