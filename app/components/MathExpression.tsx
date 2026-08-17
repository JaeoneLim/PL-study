import katex from "katex";

const codeKeywords = /^(?:for|if|newvar|skip|while)\b/;
const mathematicalGlyphs = /[=<>_+−×÷₀₁₂₃₄₅₆₇₈₉ₙ₊⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁺∈∉∅∪⊆⊥⊑⊔∀∃μλΣσρτℤℕ𝔹⟦⟧⇒⇔→↦∧∨¬≤≥≠†]/;
const mathematicalNames = /^(?:FV(?:exp|assert)?|IntExp|Sat|contextuallyEqual|restore|[A-Za-z]|[A-Za-z]\([^)]*\))$/;

const subscriptCharacters: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
  "ₙ": "n", "₊": "+", "₍": "", "₎": "",
};

const superscriptCharacters: Record<string, string> = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
  "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  "ⁿ": "n", "⁺": "+", "ʲ": "j", "ᴰ": "D",
};

const symbolReplacements: Array<[RegExp, string]> = [
  [/⟦/g, "\\llbracket "], [/⟧/g, "\\rrbracket "],
  [/ℤ/g, "\\mathbb{Z}"], [/ℕ/g, "\\mathbb{N}"], [/𝔹/g, "\\mathbb{B}"],
  [/Σ/g, "\\Sigma "], [/σ/g, "\\sigma "], [/ρ/g, "\\rho "], [/τ/g, "\\tau "],
  [/μ/g, "\\mu "], [/λ/g, "\\lambda "],
  [/⊥/g, "\\bot "], [/⊑/g, "\\sqsubseteq "], [/⊔/g, "\\bigsqcup "],
  [/∀/g, "\\forall "], [/∃/g, "\\exists "], [/∈/g, "\\in "], [/∉/g, "\\notin "],
  [/∅/g, "\\varnothing "], [/∪/g, "\\cup "], [/⊆/g, "\\subseteq "],
  [/⇒/g, "\\Rightarrow "], [/⇔/g, "\\Leftrightarrow "],
  [/∧/g, "\\land "], [/∨/g, "\\lor "], [/¬/g, "\\neg "],
  [/≤/g, "\\le "], [/≥/g, "\\ge "], [/≠/g, "\\ne "],
  [/→/g, "\\to "], [/↦/g, "\\mapsto "],
  [/×/g, "\\times "], [/÷/g, "\\div "], [/−/g, "-"],
  [/†/g, "^{\\dagger}"],
];

export function looksLikeMath(source: string): boolean {
  const value = source.trim();
  if (!value || /[가-힣]/.test(value)) return false;
  if (codeKeywords.test(value) && /\s/.test(value)) return false;
  return mathematicalGlyphs.test(value) || mathematicalNames.test(value);
}

export function unicodeMathToLatex(source: string): string {
  let latex = source.replace(/[{}]/g, (character) => `\\${character}`);

  latex = latex.replace(/[₀₁₂₃₄₅₆₇₈₉ₙ₊₍₎]+/g, (sequence) => {
    const content = [...sequence].map((character) => subscriptCharacters[character]).join("");
    return `_{${content}}`;
  });
  latex = latex.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁺ʲᴰ]+/g, (sequence) => {
    const content = [...sequence].map((character) => superscriptCharacters[character]).join("");
    return `^{${content}}`;
  });
  latex = latex.replace(/_([A-Za-z0-9]+)/g, "_{$1}");

  latex = latex
    .replace(/\b(contextuallyEqual|FVassert|FVexp|IntExp|restore|Sat|Assert|Cvar|Ctx|Obs|Var)\b/g, "\\operatorname{$1}")
    .replace(/\b(chain)\b/g, "\\mathit{$1}")
    .replace(/\b(true|false|iff|or|rem|if|then|else|skip|while|do|newvar|for|to|in)\b/g, "\\mathsf{$1}\\,");

  for (const [pattern, replacement] of symbolReplacements) {
    latex = latex.replace(pattern, replacement);
  }

  return latex.trim();
}

export function MathExpression({
  source,
  latex = unicodeMathToLatex(source),
  display = false,
  className,
}: {
  source: string;
  latex?: string;
  display?: boolean;
  className?: string;
}) {
  const html = katex.renderToString(latex, {
    displayMode: display,
    output: "htmlAndMathml",
    strict: "ignore",
    throwOnError: false,
    trust: false,
  });

  return (
    <span
      className={[display ? "math-display" : "math-inline", className].filter(Boolean).join(" ")}
      data-math-source={source}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
