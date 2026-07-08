import type { FileResponse, Node } from "../figma/types.js";
import type { ScaleToken } from "../model.js";
import { walk } from "../util.js";

/**
 * Infiere escalas de spacing y radios recorriendo el documento:
 * - spacing: padding e itemSpacing de contenedores auto-layout.
 * - radii: cornerRadius de frames/rects.
 * Se cuenta la frecuencia de cada valor y se devuelven ordenados; el nombre es su valor en px.
 */
export function inferScales(file: FileResponse): { spacing: ScaleToken[]; radii: ScaleToken[] } {
  const spacingFreq = new Map<number, number>();
  const radiiFreq = new Map<number, number>();

  walk(file.document, (node) => {
    collectSpacing(node, spacingFreq);
    collectRadius(node, radiiFreq);
  });

  return {
    spacing: toScale(spacingFreq, "spacing"),
    radii: toScale(radiiFreq, "radius"),
  };
}

function collectSpacing(node: Node, freq: Map<number, number>): void {
  if (node.layoutMode && node.layoutMode !== "NONE") {
    for (const v of [node.itemSpacing, node.paddingLeft, node.paddingRight, node.paddingTop, node.paddingBottom]) {
      if (typeof v === "number" && v > 0) bump(freq, v);
    }
  }
}

function collectRadius(node: Node, freq: Map<number, number>): void {
  if (typeof node.cornerRadius === "number" && node.cornerRadius > 0) bump(freq, node.cornerRadius);
  if (Array.isArray(node.rectangleCornerRadii)) {
    for (const r of node.rectangleCornerRadii) if (r > 0) bump(freq, r);
  }
}

function bump(freq: Map<number, number>, value: number): void {
  const v = Math.round(value);
  freq.set(v, (freq.get(v) ?? 0) + 1);
}

/** Convierte el map de frecuencias en tokens ordenados por valor, filtrando ruido (freq >= 2). */
function toScale(freq: Map<number, number>, prefix: string): ScaleToken[] {
  return [...freq.entries()]
    .filter(([, count]) => count >= 2)
    .map(([value]) => value)
    .sort((a, b) => a - b)
    .map((value) => ({ name: `${prefix}-${value}`, value }));
}
