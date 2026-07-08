import type { Node, RGBA } from "./figma/types.js";

/** rgba (0..1) → #RRGGBB o #RRGGBBAA si a < 1. */
export function rgbaToHex(c: RGBA): string {
  const to2 = (n: number) => Math.round(clamp01(n) * 255).toString(16).padStart(2, "0");
  const hex = `#${to2(c.r)}${to2(c.g)}${to2(c.b)}`;
  return c.a < 1 ? `${hex}${to2(c.a)}` : hex;
}

export function rgbaToCss(c: RGBA): string {
  const to255 = (n: number) => Math.round(clamp01(n) * 255);
  return `rgba(${to255(c.r)}, ${to255(c.g)}, ${to255(c.b)}, ${round(c.a, 3)})`;
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

export function round(n: number, digits = 2): number {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

/** Nombre → slug seguro para nombres de archivo y tokens. */
export function slug(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "unnamed";
}

/** Convierte "Colors/Brand/Primary" en ["colors","brand","primary"] para agrupar tokens. */
export function pathSegments(name: string): string[] {
  return name.split("/").map((s) => s.trim()).filter(Boolean);
}

/** Recorre el árbol de nodos aplicando un visitor. */
export function walk(node: Node, visit: (n: Node, depth: number) => void, depth = 0): void {
  visit(node, depth);
  if (node.children) {
    for (const child of node.children) walk(child, visit, depth + 1);
  }
}

/** Divide un array en lotes de tamaño `size`. */
export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
