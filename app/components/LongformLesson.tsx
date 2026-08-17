import type { ReactNode } from "react";
import type { ChapterLongform, LessonBlock } from "../../content/longform-types";
import type { Locale } from "../../content/types";
import { looksLikeMath, MathExpression } from "./MathExpression";

function RichText({ children }: { children: string }) {
  const parts = children.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const source = part.slice(1, -1);
      return looksLikeMath(source)
        ? <MathExpression key={`${part}-${index}`} source={source} />
        : <code key={`${part}-${index}`}>{source}</code>;
    }
    return <span key={`${part.slice(0, 16)}-${index}`}>{part}</span>;
  });
}

function renderBlock(block: LessonBlock, locale: Locale, headingLocale: Locale, index: number): ReactNode {
  if (block.kind === "prose") {
    return (
      <div className="longform-prose" key={`prose-${index}`}>
        {block.paragraphs.map((paragraph, paragraphIndex) => (
          <p key={`${paragraph.en.slice(0, 24)}-${paragraphIndex}`}><RichText>{paragraph[locale]}</RichText></p>
        ))}
      </div>
    );
  }

  if (block.kind === "list") {
    return (
      <div className="longform-list" key={`list-${index}`}>
        {block.title && <h3>{block.title[headingLocale]}</h3>}
        <ul>
          {block.items.map((item, itemIndex) => (
            <li key={`${item.en.slice(0, 24)}-${itemIndex}`}><RichText>{item[locale]}</RichText></li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.kind === "notation") {
    return (
      <figure className="longform-notation" key={`notation-${index}`}>
        <figcaption>{block.title[headingLocale]}</figcaption>
        {block.latex
          ? <MathExpression source={block.notation} latex={block.latex} display />
          : <pre><code>{block.notation}</code></pre>}
        <p><RichText>{block.explanation[locale]}</RichText></p>
      </figure>
    );
  }

  if (block.kind === "example") {
    return (
      <section className="worked-example" key={`example-${index}`}>
        <p className="worked-example-label">{locale === "ko" ? "예제 · 풀이" : "WORKED EXAMPLE"}</p>
        <h3>{block.title[headingLocale]}</h3>
        <p className="worked-example-setup"><RichText>{block.setup[locale]}</RichText></p>
        <ol>
          {block.steps.map((step, stepIndex) => (
            <li key={`${step.en.slice(0, 24)}-${stepIndex}`}><RichText>{step[locale]}</RichText></li>
          ))}
        </ol>
        <p className="worked-example-conclusion"><RichText>{block.conclusion[locale]}</RichText></p>
      </section>
    );
  }

  return (
    <aside className={`longform-callout ${block.tone}`} key={`callout-${index}`}>
      <p className="longform-callout-label">
        {block.tone === "warning"
          ? (locale === "ko" ? "주의" : "CAUTION")
          : block.tone === "proof"
            ? (locale === "ko" ? "증명 해설" : "PROOF IDEA")
            : (locale === "ko" ? "핵심" : "KEY IDEA")}
      </p>
      <h3>{block.title[headingLocale]}</h3>
      {block.paragraphs.map((paragraph, paragraphIndex) => (
        <p key={`${paragraph.en.slice(0, 24)}-${paragraphIndex}`}><RichText>{paragraph[locale]}</RichText></p>
      ))}
    </aside>
  );
}

export function LongformLesson({ lesson, locale, headingLocale = locale }: { lesson: ChapterLongform; locale: Locale; headingLocale?: Locale }) {
  return (
    <section className="chapter-longform" aria-labelledby="longform-heading">
      <header className="longform-header">
        <div>
          <p className="section-index">{locale === "ko" ? "완전 학습 본문" : "COMPLETE STUDY TEXT"}</p>
          <h2 id="longform-heading">{lesson.title[headingLocale]}</h2>
        </div>
        <p className="longform-duration">
          <strong>{lesson.readingMinutes}</strong>
          <span>{locale === "ko" ? "분 읽기" : "MIN READ"}</span>
        </p>
      </header>

      <div className="longform-introduction">
        {lesson.introduction.map((paragraph, index) => (
          <p key={`${paragraph.en.slice(0, 24)}-${index}`}><RichText>{paragraph[locale]}</RichText></p>
        ))}
      </div>

      {lesson.sections.map((section, sectionIndex) => (
        <section className="longform-section" id={section.id} key={section.id}>
          <header className="longform-section-header">
            <div className="longform-section-number">{String(sectionIndex + 1).padStart(2, "0")}</div>
            <div>
              <p>{section.covers} · {section.minutes} {locale === "ko" ? "분" : "min"}</p>
              <h2>{section.title[headingLocale]}</h2>
              <div className="longform-lead"><RichText>{section.lead[locale]}</RichText></div>
            </div>
          </header>
          <div className="longform-blocks">
            {section.blocks.map((block, blockIndex) => renderBlock(block, locale, headingLocale, blockIndex))}
          </div>
          <aside className="section-checkpoints">
            <p>{locale === "ko" ? "이 절을 덮고 확인하기" : "RETRIEVAL CHECK"}</p>
            <ol>
              {section.checkpoints.map((checkpoint, checkpointIndex) => (
                <li key={`${checkpoint.en.slice(0, 24)}-${checkpointIndex}`}><RichText>{checkpoint[locale]}</RichText></li>
              ))}
            </ol>
          </aside>
        </section>
      ))}
    </section>
  );
}
