"use client";

import { useState } from "react";
import type { Locale, QuizQuestion } from "../../content/course";

export function QuizPanel({ locale, headingLocale = locale, questions, slug }: { locale: Locale; headingLocale?: Locale; questions: QuizQuestion[]; slug: string }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const score = questions.reduce((sum, question, index) => sum + (answers[index] === question.correct ? 1 : 0), 0);

  function checkAnswers() {
    setChecked(true);
    try {
      const key = "semantic-atlas-quiz-v1";
      const previous = JSON.parse(window.localStorage.getItem(key) || "{}");
      previous[slug] = Math.max(previous[slug] || 0, score);
      window.localStorage.setItem(key, JSON.stringify(previous));
    } catch {
      // The quiz remains usable when storage is unavailable.
    }
  }

  function reset() {
    setAnswers({});
    setChecked(false);
  }

  return (
    <section className="quiz-panel" aria-labelledby="quiz-heading">
      <div className="quiz-heading">
        <div>
          <p className="kicker">{locale === "ko" ? "인출 연습" : "RETRIEVAL PRACTICE"}</p>
          <h2 id="quiz-heading">{headingLocale === "ko" ? "개념 확인 퀴즈" : "Concept check"}</h2>
        </div>
        <span>{questions.length} {locale === "ko" ? "문항" : "questions"}</span>
      </div>
      <div className="quiz-list">
        {questions.map((question, questionIndex) => (
          <fieldset className="quiz-question" key={question.question.en}>
            <legend><span>{String(questionIndex + 1).padStart(2, "0")}</span>{question.question[locale]}</legend>
            <div className="quiz-options">
              {question.options.map((option, optionIndex) => {
                const chosen = answers[questionIndex] === optionIndex;
                const correct = question.correct === optionIndex;
                const state = checked ? (correct ? "correct" : chosen ? "incorrect" : "") : chosen ? "selected" : "";
                return (
                  <label className={state} key={option.en}>
                    <input type="radio" name={`q-${questionIndex}`} checked={chosen} onChange={() => { setAnswers((current) => ({ ...current, [questionIndex]: optionIndex })); setChecked(false); }} />
                    <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                    <span>{option[locale]}</span>
                  </label>
                );
              })}
            </div>
            {checked && <p className={`quiz-explanation ${answers[questionIndex] === question.correct ? "correct" : "incorrect"}`}>{question.explanation[locale]}</p>}
          </fieldset>
        ))}
      </div>
      <div className="quiz-actions">
        {checked ? (
          <>
            <p><strong>{score} / {questions.length}</strong><span>{score === questions.length ? (locale === "ko" ? "핵심을 정확히 이해했습니다." : "You have the core ideas.") : (locale === "ko" ? "설명을 읽고 다시 시도해 보세요." : "Review the explanations and try again.")}</span></p>
            <button className="button secondary" onClick={reset}>{locale === "ko" ? "다시 풀기" : "Try again"}</button>
          </>
        ) : (
          <button className="button primary" onClick={checkAnswers}>{locale === "ko" ? "답 확인하기" : "Check answers"}</button>
        )}
      </div>
    </section>
  );
}
