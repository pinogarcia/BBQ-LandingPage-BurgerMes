import type { Paint } from "../figma/types.js";
import type { ColorToken } from "../model.js";
import { rgbaToCss, rgbaToHex } from "../util.js";

/** Convierte un Paint SOLID en un ColorToken. Ignora gradientes/imágenes (devuelve null). */
export function paintToColor(name: string, paint: Paint): ColorToken | null {
  if (paint.type === "SOLID" && paint.color) {
    const color = { ...paint.color };
    // El opacity del paint se combina con el alpha del color.
    if (typeof paint.opacity === "number") color.a = color.a * paint.opacity;
    return { name, hex: rgbaToHex(color), css: rgbaToCss(color) };
  }
  return null;
}

/** Deduplica por nombre, quedándose con la primera aparición. */
export function dedupeColors(colors: ColorToken[]): ColorToken[] {
  const seen = new Map<string, ColorToken>();
  for (const c of colors) if (!seen.has(c.name)) seen.set(c.name, c);
  return [...seen.values()];
}
