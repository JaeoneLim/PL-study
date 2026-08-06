"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { parts, units, type Locale } from "../../content/course";
import { longformReadingMinutes } from "../../content/longform-status";

const STORAGE_KEY = "semantic-atlas-completed-v1";

function readCompleted(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CourseBrowser({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [activePart, setActivePart] = useState<number | "all">("all");
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setCompleted(readCompleted());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("semantic-atlas-progress", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("semantic-atlas-progress", sync);
    };
  }, []);

  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return units.filter((unit) => {
      const partMatches = activePart === "all" || unit.part === activePart;
      const text = `${unit.number} ${unit.title.ko} ${unit.title.en} ${unit.keyTerms.map((term) => `${term.ko} ${term.en}`).join(" ")}`.toLocaleLowerCase();
      return partMatches && (!normalized || text.includes(normalized));
    });
  }, [activePart, query]);

  const percent = Math.round((completed.length / units.length) * 100);

  return (
    <section className="course-section" id="course-map" aria-labelledby="course-heading">
      <div className="section-heading-row">
        <div>
          <p className="kicker">{locale === "ko" ? "20단계 학습 경로" : "20-UNIT LEARNING PATH"}</p>
          <h2 id="course-heading">{locale === "ko" ? "과정 지도" : "Course map"}</h2>
        </div>
        <div className="progress-summary" aria-label={locale === "ko" ? "학습 진도" : "Study progress"}>
          <span>{locale === "ko" ? "완료" : "COMPLETED"}</span>
          <strong>{completed.length}<small> / {units.length}</small></strong>
          <div className="progress-track"><span style={{ width: `${percent}%` }} /></div>
        </div>
      </div>

      <div className="course-controls">
        <label className="search-field">
          <span className="sr-only">{locale === "ko" ? "단원 검색" : "Search units"}</span>
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "ko" ? "개념 또는 장 검색" : "Search chapters or concepts"} />
        </label>
        <div className="part-filters" aria-label={locale === "ko" ? "과정 필터" : "Course filters"}>
          <button className={activePart === "all" ? "active" : ""} onClick={() => setActivePart("all")}>{locale === "ko" ? "전체" : "All"}</button>
          {parts.map((part) => (
            <button key={part.number} className={activePart === part.number ? "active" : ""} onClick={() => setActivePart(part.number)}>
              {locale === "ko" ? `${part.number}부` : `Part ${part.number}`}
            </button>
          ))}
        </div>
      </div>

      <div className="chapter-grid">
        {visible.map((unit) => {
          const done = completed.includes(unit.slug);
          const longformMinutes = longformReadingMinutes[unit.slug];
          return (
            <Link className={`chapter-card ${done ? "is-complete" : ""}`} href={`/${locale}/chapter/${unit.slug}`} key={unit.slug}>
              <div className="chapter-card-top">
                <span className="chapter-number">{unit.number}</span>
                <span className="chapter-status">
                  {done
                    ? (locale === "ko" ? "완료 ✓" : "Done ✓")
                    : longformMinutes
                      ? `${longformMinutes} min+`
                      : (locale === "ko" ? "요약본" : "Brief")}
                </span>
              </div>
              <p className="chapter-part">{locale === "ko" ? `${unit.part}부` : `PART ${unit.part}`} · pp. {unit.pages}</p>
              <h3>{unit.title[locale]}</h3>
              <p>{unit.eyebrow[locale]}</p>
              <div className="term-row">
                {unit.keyTerms.slice(0, 3).map((term) => <span key={term.en}>{term[locale]}</span>)}
              </div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </Link>
          );
        })}
      </div>
      {visible.length === 0 && <p className="empty-state">{locale === "ko" ? "일치하는 단원이 없습니다." : "No matching units."}</p>}
    </section>
  );
}
