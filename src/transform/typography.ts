import type { TypeStyle } from "../figma/types.js";
import type { TypographyToken } from "../model.js";
import { round } from "../util.js";

/** TypeStyle de Figma → TypographyToken normalizado. */
export function typeStyleToToken(name: string, s: TypeStyle): TypographyToken {
  return {
    name,
    fontFamily: s.fontFamily,
    fontWeight: s.fontWeight,
    fontSize: s.fontSize != null ? round(s.fontSize) : undefined,
    lineHeight: resolveLineHeight(s),
    letterSpacing: s.letterSpacing != null ? round(s.letterSpacing, 3) : undefined,
    textCase: s.textCase,
  };
}

function resolveLineHeight(s: TypeStyle): number | string | undefined {
  if (s.lineHeightUnit === "PERCENT" && s.lineHeightPercent != null) {
    return `${round(s.lineHeightPercent)}%`;
  }
  if (s.lineHeightPx != null) return round(s.lineHeightPx);
  return undefined;
}

export function dedupeTypography(items: TypographyToken[]): TypographyToken[] {
  const seen = new Map<string, TypographyToken>();
  for (const t of items) if (!seen.has(t.name)) seen.set(t.name, t);
  return [...seen.values()];
}
