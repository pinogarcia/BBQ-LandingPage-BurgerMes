import type { FileResponse, Node, StyleMapEntry } from "../figma/types.js";
import type { ColorToken, ShadowToken, TypographyToken } from "../model.js";
import { effectToShadow } from "../transform/effects.js";
import { paintToColor } from "../transform/colors.js";
import { typeStyleToToken } from "../transform/typography.js";
import { walk } from "../util.js";

export interface StylesResult {
  colors: ColorToken[];
  typography: TypographyToken[];
  shadows: ShadowToken[];
}

/**
 * Extrae tokens desde los Styles del archivo (fuente de verdad cuando NO hay Variables API).
 * Estrategia: el archivo trae un map `styles` (styleId → {name, type}). Recorremos el árbol
 * buscando nodos que referencian esos estilos (node.styles) y capturamos su valor real
 * (fills / typeStyle / effects). Cubre estilos locales y publicados aplicados en el documento.
 */
export function extractStyles(file: FileResponse): StylesResult {
  const styleMeta: Record<string, StyleMapEntry> = file.styles ?? {};

  const colorByStyle = new Map<string, ColorToken>();
  const typoByStyle = new Map<string, TypographyToken>();
  const shadowByStyle = new Map<string, ShadowToken>();

  walk(file.document, (node) => {
    const refs = node.styles;
    if (!refs) return;

    for (const [kind, styleId] of Object.entries(refs)) {
      const meta = styleMeta[styleId];
      if (!meta) continue;
      const name = meta.name;

      // Colores (fill / stroke)
      if ((kind === "fill" || kind === "fills" || kind === "stroke" || kind === "strokes") && !colorByStyle.has(styleId)) {
        const paints = kind.startsWith("stroke") ? node.strokes : node.fills;
        const color = firstSolidColor(paints, name);
        if (color) colorByStyle.set(styleId, color);
      }

      // Tipografía (text)
      if ((kind === "text" || meta.styleType === "TEXT") && node.style && !typoByStyle.has(styleId)) {
        typoByStyle.set(styleId, typeStyleToToken(name, node.style));
      }

      // Efectos (effect)
      if ((kind === "effect" || kind === "effects" || meta.styleType === "EFFECT") && node.effects && !shadowByStyle.has(styleId)) {
        const shadow = firstEffect(node, name);
        if (shadow) shadowByStyle.set(styleId, shadow);
      }
    }
  });

  return {
    colors: [...colorByStyle.values()],
    typography: [...typoByStyle.values()],
    shadows: [...shadowByStyle.values()],
  };
}

function firstSolidColor(paints: Node["fills"], name: string): ColorToken | null {
  if (!paints) return null;
  for (const paint of paints) {
    if (paint.visible === false) continue;
    const color = paintToColor(name, paint);
    if (color) return color;
  }
  return null;
}

function firstEffect(node: Node, name: string): ShadowToken | null {
  if (!node.effects) return null;
  for (const eff of node.effects) {
    if (eff.visible === false) continue;
    const shadow = effectToShadow(name, eff);
    if (shadow) return shadow;
  }
  return null;
}
