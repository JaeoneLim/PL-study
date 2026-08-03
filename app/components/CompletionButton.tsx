"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "../../content/course";

const STORAGE_KEY = "semantic-atlas-completed-v1";

export function CompletionButton({ locale, slug }: { locale: Locale; slug: string }) {
  const complete = useSyncExternalStore(
    (notify) => {
      window.addEventListener("storage", notify);
      window.addEventListener("semantic-atlas-progress", notify);
      return () => {
        window.removeEventListener("storage", notify);
        window.removeEventListener("semantic-atlas-progress", notify);
      };
    },
    () => {
      try {
        const values: string[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
        return values.includes(slug);
      } catch {
        return false;
      }
    },
    () => false,
  );

  function toggle() {
    try {
      const values: string[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      const next = values.includes(slug) ? values.filter((value) => value !== slug) : [...values, slug];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("semantic-atlas-progress"));
    } catch {
      // The page remains readable if browser storage is unavailable.
    }
  }

  return (
    <button className={`completion-button ${complete ? "complete" : ""}`} onClick={toggle} aria-pressed={complete}>
      <span aria-hidden="true">{complete ? "✓" : "○"}</span>
      {complete ? (locale === "ko" ? "학습 완료" : "Completed") : (locale === "ko" ? "완료로 표시" : "Mark complete")}
    </button>
  );
}
