"use client";

import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "../../content/types";

const WIDTH_STORAGE_KEY = "semantic-atlas-sidebar-width-v1";
const COLLAPSED_STORAGE_KEY = "semantic-atlas-sidebar-collapsed-v1";
const DEFAULT_WIDTH = 270;
const MIN_WIDTH = 210;
const MAX_WIDTH = 420;
const KEYBOARD_STEP = 16;

function maximumWidthForViewport(viewportWidth: number): number {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, viewportWidth - 500));
}

function clampWidth(width: number, viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth): number {
  return Math.min(maximumWidthForViewport(viewportWidth), Math.max(MIN_WIDTH, Math.round(width)));
}

function readStoredWidth(): number {
  try {
    const value = Number(window.localStorage.getItem(WIDTH_STORAGE_KEY));
    return Number.isFinite(value) && value > 0 ? clampWidth(value) : DEFAULT_WIDTH;
  } catch {
    return DEFAULT_WIDTH;
  }
}

function readStoredCollapsed(): boolean {
  try {
    return window.localStorage.getItem(COLLAPSED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function ResizableChapterLayout({
  sidebar,
  children,
  locale,
}: {
  sidebar: ReactNode;
  children: ReactNode;
  locale: Locale;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ pointerX: 0, width: DEFAULT_WIDTH });
  const currentWidth = useRef(DEFAULT_WIDTH);

  useEffect(() => {
    const restoreStoredWidth = window.requestAnimationFrame(() => {
      const storedWidth = readStoredWidth();
      currentWidth.current = storedWidth;
      setSidebarWidth(storedWidth);
      setSidebarCollapsed(readStoredCollapsed());
    });

    const keepWidthInViewport = () => {
      const next = clampWidth(currentWidth.current);
      currentWidth.current = next;
      setSidebarWidth(next);
    };
    window.addEventListener("resize", keepWidthInViewport);
    return () => {
      window.cancelAnimationFrame(restoreStoredWidth);
      window.removeEventListener("resize", keepWidthInViewport);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-resizing-sidebar", dragging);
    return () => document.body.classList.remove("is-resizing-sidebar");
  }, [dragging]);

  const updateWidth = (width: number, persist = false) => {
    const next = clampWidth(width);
    currentWidth.current = next;
    setSidebarWidth(next);
    if (persist) {
      try {
        window.localStorage.setItem(WIDTH_STORAGE_KEY, String(next));
      } catch {
        // The layout remains usable when storage is unavailable.
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((collapsed) => {
      const next = !collapsed;
      try {
        window.localStorage.setItem(COLLAPSED_STORAGE_KEY, String(next));
      } catch {
        // The toggle remains usable when storage is unavailable.
      }
      return next;
    });
  };

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragStart.current = { pointerX: event.clientX, width: currentWidth.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    event.preventDefault();
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateWidth(dragStart.current.width + event.clientX - dragStart.current.pointerX);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
    updateWidth(currentWidth.current, true);
  };

  const resizeWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number | undefined;
    if (event.key === "ArrowLeft") next = currentWidth.current - KEYBOARD_STEP;
    if (event.key === "ArrowRight") next = currentWidth.current + KEYBOARD_STEP;
    if (event.key === "Home") next = MIN_WIDTH;
    if (event.key === "End") next = maximumWidthForViewport(window.innerWidth);
    if (next === undefined) return;
    event.preventDefault();
    updateWidth(next, true);
  };

  const style = {
    "--chapter-sidebar-width": `${sidebarWidth}px`,
  } as CSSProperties;

  return (
    <div className={`chapter-layout${dragging ? " is-dragging" : ""}${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`} style={style}>
      <div className="chapter-sidebar-panel" id="chapter-sidebar-content">
        {sidebar}
      </div>
      <div className="chapter-sidebar-controls">
        <button
          aria-controls="chapter-sidebar-content"
          aria-expanded={!sidebarCollapsed}
          aria-label={locale === "ko" ? (sidebarCollapsed ? "목차 열기" : "목차 닫기") : (sidebarCollapsed ? "Open contents sidebar" : "Close contents sidebar")}
          className="chapter-sidebar-toggle"
          onClick={toggleSidebar}
          title={locale === "ko" ? (sidebarCollapsed ? "목차 열기" : "목차 닫기") : (sidebarCollapsed ? "Open contents sidebar" : "Close contents sidebar")}
          type="button"
        >
          <span aria-hidden="true">{sidebarCollapsed ? "›" : "‹"}</span>
        </button>
        {!sidebarCollapsed && <div
          aria-label={locale === "ko" ? "목차 너비 조절" : "Resize contents sidebar"}
          aria-orientation="vertical"
          aria-valuemax={MAX_WIDTH}
          aria-valuemin={MIN_WIDTH}
          aria-valuenow={sidebarWidth}
          className="chapter-sidebar-resizer"
          onDoubleClick={() => updateWidth(DEFAULT_WIDTH, true)}
          onKeyDown={resizeWithKeyboard}
          onPointerCancel={stopDragging}
          onPointerDown={startDragging}
          onPointerMove={drag}
          onPointerUp={stopDragging}
          role="separator"
          tabIndex={0}
          title={locale === "ko" ? "드래그하거나 화살표 키로 목차 너비를 조절합니다" : "Drag or use arrow keys to resize the contents sidebar"}
        >
          <span aria-hidden="true">⋮</span>
        </div>}
      </div>
      {children}
    </div>
  );
}
