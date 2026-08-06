import Link from "next/link";
import { units } from "../content/course";

export default function LanguageGateway() {
  return (
    <main className="gateway">
      <div className="gateway-grid" aria-hidden="true" />
      <section className="gateway-panel">
        <p className="kicker">REYNOLDS · 1998 / 2009</p>
        <div className="gateway-mark" aria-hidden="true">λ</div>
        <h1>Theories of PL</h1>
        <p className="gateway-lead">
          A bilingual, chapter-by-chapter companion to <em>Theories of Programming Languages</em>.
        </p>
        <p className="gateway-ko">
          semantics의 큰 지도를 따라, 한 장씩 읽고 설명하고 확인하세요.
        </p>
        <div className="gateway-stats" aria-label="Course summary">
          <span><strong>{units.length}</strong> study units</span>
          <span><strong>{units.reduce((sum, unit) => sum + unit.quiz.length, 0)}</strong> concept checks</span>
          <span><strong>KO / EN</strong> full course</span>
        </div>
        <div className="language-choices">
          <Link className="language-card primary" href="/ko/overview">
            <span className="language-code">KO</span>
            <span><strong>한국어로 공부하기</strong><small>기술 용어는 영어와 함께 표시됩니다</small></span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link className="language-card" href="/en/overview">
            <span className="language-code">EN</span>
            <span><strong>Study in English</strong><small>Switch languages from any chapter</small></span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="gateway-note">
          Independent study notes. The copyrighted textbook PDF is not included.
        </p>
      </section>
    </main>
  );
}
