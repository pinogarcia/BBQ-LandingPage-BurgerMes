import type { FileResponse, Node, TypeStyle } from "../figma/types.js";
import type { ColorToken, ShadowToken, TypographyToken } from "../model.js";
import { effectToShadow } from "../transform/effects.js";
import { typeStyleToToken } from "../transform/typography.js";
import { rgbaToCss, rgbaToHex, round, walk } from "../util.js";

export interface RawUsageResult {
  colors: ColorToken[];
  typography: TypographyToken[];
  shadows: ShadowToken[];
}

export interface RawUsageOptions {
  /** Máximo de colores en la paleta (ordenados por frecuencia de uso). */
  maxColors?: number;
  /** Ignora colores usados menos de este nº de veces (filtra ruido). */
  minColorUses?: number;
}

/**
 * Reconstruye el design system "de facto" a partir del uso real de valores en el documento,
 * para archivos que NO formalizan Styles/Variables (colores/tipografías aplicados directo en nodos).
 * - colors: paleta de fills SOLID visibles, rankeada por frecuencia.
 * - typography: escala de estilos de texto únicos (familia|peso|tamaño|line-height).
 * - shadows: efectos DROP/INNER_SHADOW únicos.
 */
export function extractRawUsage(file: FileResponse, opts: RawUsageOptions = {}): RawUsageResult {
  const maxColors = opts.maxColors ?? 24;
  const minColorUses = opts.minColorUses ?? 2;

  const colorFreq = new Map<string, { hex: string; css: string; count: number }>();
  const typoByKey = new Map<string, TypographyToken>();
  const shadowByCss = new Map<string, ShadowToken>();

  walk(file.document, (node) => {
    collectColors(node.fills, colorFreq);
    collectColors(node.strokes, colorFreq);
    collectTypography(node, typoByKey);
    collectShadows(node, shadowByCss);
  });

  const colors: ColorToken[] = [...colorFreq.values()]
    .filter((c) => c.count >= minColorUses)
    .sort((a, b) => b.count - a.count)
    .slice(0, maxColors)
    .map((c, i) => ({ name: `palette/${String(i + 1).padStart(2, "0")}`, hex: c.hex, css: c.css }));

  return {
    colors,
    typography: [...typoByKey.values()].sort(sortBySizeDesc),
    shadows: [...shadowByCss.values()],
  };
}

function collectColors(paints: Node["fills"], freq: Map<string, { hex: string; css: string; count: number }>): void {
  if (!paints) return;
  for (const paint of paints) {
    if (paint.visible === false || paint.type !== "SOLID" || !paint.color) continue;
    const color = { ...paint.color };
    if (typeof paint.opacity === "number") color.a = color.a * paint.opacity;
    const hex = rgbaToHex(color);
    const entry = freq.get(hex);
    if (entry) entry.count++;
    else freq.set(hex, { hex, css: rgbaToCss(color), count: 1 });
  }
}

function collectTypography(node: Node, out: Map<string, TypographyToken>): void {
  if (node.type !== "TEXT" || !node.style) return;
  const s = node.style;
  const key = typoKey(s);
  if (out.has(key)) return;
  const family = (s.fontFamily ?? "font").toLowerCase().replace(/\s+/g, "-");
  const name = `text/${family}-${s.fontWeight ?? 400}-${Math.round(s.fontSize ?? 0)}`;
  out.set(key, typeStyleToToken(name, s));
}

function collectShadows(node: Node, out: Map<string, ShadowToken>): void {
  if (!node.effects) return;
  for (const eff of node.effects) {
    if (eff.visible === false) continue;
    const shadow = effectToShadow("shadow", eff);
    if (!shadow || shadow.type === "blur") continue;
    if (!out.has(shadow.css)) {
      out.set(shadow.css, { ...shadow, name: `shadow/${String(out.size + 1).padStart(2, "0")}` });
    }
  }
}

function typoKey(s: TypeStyle): string {
  return `${s.fontFamily}|${s.fontWeight}|${round(s.fontSize ?? 0)}|${s.lineHeightPx ?? s.lineHeightPercent ?? ""}`;
}

function sortBySizeDesc(a: TypographyToken, b: TypographyToken): number {
  return (b.fontSize ?? 0) - (a.fontSize ?? 0);
}
