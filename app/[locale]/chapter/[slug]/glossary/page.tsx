import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../../components/SiteHeader";
import { getChapterGlossary } from "../../../../../content/chapter-glossaries";
import { getUnit, getUnitNeighbors, isLocale, units } from "../../../../../content/course";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["ko", "en"].flatMap((locale) => units.map((unit) => ({ locale, slug: unit.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const unit = getUnit(slug);
  const entries = getChapterGlossary(slug);
  if (!unit || !entries) return {};
  const headingsInEnglish = slug === "simple-imperative-language";

  return {
    title: headingsInEnglish || locale === "en" ? `Chapter ${unit.number} glossary · ${unit.title.en}` : `${unit.number}장 용어집 · ${unit.title.ko}`,
    description: locale === "ko"
      ? `${unit.title.ko}의 핵심 용어 ${entries.length}개를 비SW 엔지니어도 이해할 수 있도록 설명합니다.`
      : `${entries.length} key terms from ${unit.title.en}, explained for engineers outside software.`,
    alternates: {
      languages: {
        ko: `/ko/chapter/${slug}/glossary`,
        en: `/en/chapter/${slug}/glossary`,
      },
    },
  };
}

export default async function ChapterGlossaryPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const unit = getUnit(slug);
  const entries = getChapterGlossary(slug);
  if (!unit || !entries) notFound();

  const locale = localeParam;
  const { previous, next } = getUnitNeighbors(slug);
  const otherLocale = locale === "ko" ? "en" : "ko";
  const headingsInEnglish = slug === "simple-imperative-language";

  return (
    <div className="site-shell glossary-shell" lang={locale}>
      <SiteHeader locale={locale} alternateHref={`/${otherLocale}/chapter/${slug}/glossary`} />
      <main>
        <section className="glossary-hero">
          <div className="chapter-breadcrumb">
            <Link href={`/${locale}`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link>
            <span>/</span>
            <Link href={`/${locale}/chapter/${slug}`}>{unit.number}. {unit.title[locale]}</Link>
            <span>/</span>
            <span>{locale === "ko" ? "용어집" : "Glossary"}</span>
          </div>
          <div className="glossary-hero-grid">
            <div>
              <p className="kicker">CHAPTER {unit.number} · {locale === "ko" ? "ENGINEER-FRIENDLY GLOSSARY" : "ENGINEER-FRIENDLY GLOSSARY"}</p>
              <h1>{headingsInEnglish || locale === "en" ? `${unit.title.en} glossary` : `${unit.title.ko} 용어집`}</h1>
              <p className="glossary-lead">
                {locale === "ko"
                  ? "프로그래밍 언어 이론을 처음 접하는 엔지니어를 위한 장별 참조 페이지입니다. 먼저 정확한 뜻을 읽고, 하드웨어 관점의 비유로 익숙한 모델에 연결하세요."
                  : "A chapter reference for engineers new to programming-language theory. Read the precise meaning first, then use the hardware-oriented view to connect it to a familiar model."}
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#terms">{locale === "ko" ? `${entries.length}개 용어 보기` : `Browse ${entries.length} terms`}<span aria-hidden="true">↓</span></a>
                <Link className="button text" href={`/${locale}/chapter/${slug}`}>{locale === "ko" ? "학습 본문으로" : "Back to lesson"}<span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <aside className="glossary-reading-rule">
              <span>{locale === "ko" ? "읽는 순서" : "READ IN THIS ORDER"}</span>
              <ol>
                <li><strong>01</strong><p>{locale === "ko" ? "정확한 뜻으로 개념의 경계를 잡습니다." : "Use the definition to establish the concept’s boundary."}</p></li>
                <li><strong>02</strong><p>{locale === "ko" ? "엔지니어 관점으로 익숙한 시스템에 연결합니다." : "Connect it to a familiar system through the engineering view."}</p></li>
                <li><strong>03</strong><p>{locale === "ko" ? "표기가 있으면 손으로 한 번 읽어 봅니다." : "If notation is shown, read it through once by hand."}</p></li>
              </ol>
            </aside>
          </div>
        </section>

        <div className="glossary-layout">
          <aside className="glossary-index">
            <p>{locale === "ko" ? "이 장의 용어" : "TERMS IN THIS CHAPTER"}</p>
            <nav aria-label={locale === "ko" ? "용어 바로가기" : "Glossary term index"}>
              {entries.map((entry, index) => (
                <a href={`#${entry.id}`} key={entry.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{entry.term[locale]}<small>{entry.term[otherLocale]}</small></span>
                </a>
              ))}
            </nav>
            <Link className="glossary-lesson-link" href={`/${locale}/chapter/${slug}`}>
              <span aria-hidden="true">←</span>{locale === "ko" ? "이 장의 학습 본문" : "Chapter lesson"}
            </Link>
          </aside>

          <article className="glossary-content" id="terms">
            <section className="analogy-note">
              <span aria-hidden="true">≈</span>
              <div>
                <strong>{locale === "ko" ? "비유는 출발점이지 정의가 아닙니다" : "An analogy is a bridge, not the definition"}</strong>
                <p>{locale === "ko"
                  ? "하드웨어 예시는 첫 mental model을 만들기 위한 근사입니다. 두 분야가 완전히 같다는 뜻은 아니므로, 판단이 엇갈리면 각 카드의 ‘정확한 뜻’을 기준으로 삼으세요."
                  : "Hardware examples are approximations for building an initial mental model. The fields are not identical; when the analogy and concept diverge, treat the precise definition as authoritative."}</p>
              </div>
            </section>

            <div className="glossary-entry-list">
              {entries.map((entry, index) => (
                <section className="glossary-entry" id={entry.id} key={entry.id}>
                  <header>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h2>{entry.term[locale]}</h2>
                      {entry.term[otherLocale] !== entry.term[locale] && <p>{entry.term[otherLocale]}</p>}
                    </div>
                  </header>
                  <div className="glossary-definition">
                    <p className="glossary-label">{locale === "ko" ? "정확한 뜻" : "PLAIN DEFINITION"}</p>
                    <p>{entry.definition[locale]}</p>
                  </div>
                  <div className="glossary-engineer-view">
                    <p className="glossary-label">{locale === "ko" ? "엔지니어 관점" : "ENGINEERING VIEW"}</p>
                    <p>{entry.engineerView[locale]}</p>
                  </div>
                  {entry.notation && (
                    <div className="glossary-notation">
                      <span>{locale === "ko" ? "표기" : "NOTATION"}</span>
                      <code>{entry.notation}</code>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <section className="glossary-return-card">
              <div>
                <p className="kicker">{locale === "ko" ? "용어를 문맥에 다시 넣기" : "PUT THE TERMS BACK IN CONTEXT"}</p>
                <h2>{unit.number}. {unit.title[locale]}</h2>
                <p>{locale === "ko" ? "용어가 낯설지 않다면 이제 학습 본문에서 개념들이 어떻게 연결되는지 확인하세요." : "Now return to the lesson and see how these terms connect into one model."}</p>
              </div>
              <Link className="button primary" href={`/${locale}/chapter/${slug}`}>{locale === "ko" ? "학습 본문 열기" : "Open lesson"}<span aria-hidden="true">→</span></Link>
            </section>
          </article>
        </div>

        <nav className="chapter-neighbors" aria-label={locale === "ko" ? "이전 및 다음 장 용어집" : "Previous and next chapter glossaries"}>
          {previous
            ? <Link href={`/${locale}/chapter/${previous.slug}/glossary`}><span>← {locale === "ko" ? "이전 용어집" : "PREVIOUS GLOSSARY"}</span><strong>{previous.number}. {previous.title[locale]}</strong></Link>
            : <Link href={`/${locale}/overview`}><span>← {locale === "ko" ? "먼저 읽기" : "START HERE"}</span><strong>{locale === "ko" ? "책 전체 개요" : "Whole-book overview"}</strong></Link>}
          {next
            ? <Link className="next" href={`/${locale}/chapter/${next.slug}/glossary`}><span>{locale === "ko" ? "다음 용어집" : "NEXT GLOSSARY"} →</span><strong>{next.number}. {next.title[locale]}</strong></Link>
            : <Link className="next" href={`/${locale}`}><span>{locale === "ko" ? "완료" : "FINISH"} →</span><strong>{locale === "ko" ? "과정 지도" : "Course map"}</strong></Link>}
        </nav>
      </main>
      <footer className="site-footer">
        <span>Theories of PL</span>
        <p>{locale === "ko" ? "장별 용어 · 정확한 뜻 · 엔지니어 관점" : "Chapter terms · precise meanings · engineering views"}</p>
        <Link href={`/${locale}/chapter/${slug}`}>{locale === "ko" ? "학습 본문" : "Chapter lesson"}</Link>
      </footer>
    </div>
  );
}
