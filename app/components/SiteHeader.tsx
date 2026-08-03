import Link from "next/link";
import type { Locale } from "../../content/course";

type Props = {
  locale: Locale;
  alternateHref: string;
};

export function SiteHeader({ locale, alternateHref }: Props) {
  return (
    <header className="site-header">
      <Link className="wordmark" href={`/${locale}`} aria-label="Semantic Atlas home">
        <span className="wordmark-glyph" aria-hidden="true">λ</span>
        <span>Semantic Atlas</span>
      </Link>
      <nav className="header-nav" aria-label={locale === "ko" ? "주요 탐색" : "Primary navigation"}>
        <Link href={`/${locale}#course-map`}>{locale === "ko" ? "과정 지도" : "Course map"}</Link>
        <Link href={`/${locale}/chapter/mathematical-background`}>{locale === "ko" ? "수학 부록" : "Math appendix"}</Link>
        <Link className="locale-switch" href={alternateHref} hrefLang={locale === "ko" ? "en" : "ko"}>
          {locale === "ko" ? "EN" : "KO"}
        </Link>
      </nav>
    </header>
  );
}
