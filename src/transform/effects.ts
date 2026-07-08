import type { Effect } from "../figma/types.js";
import type { ShadowToken } from "../model.js";
import { rgbaToCss, round } from "../util.js";

/** Effect de Figma → ShadowToken con valor CSS listo para box-shadow / filter. */
export function effectToShadow(name: string, eff: Effect): ShadowToken | null {
  const color = eff.color ? rgbaToCss(eff.color) : "rgba(0,0,0,0.25)";
  const r = round(eff.radius ?? 0);
  const x = round(eff.offset?.x ?? 0);
  const y = round(eff.offset?.y ?? 0);
  const spread = round(eff.spread ?? 0);

  switch (eff.type) {
    case "DROP_SHADOW":
      return { name, type: "drop-shadow", css: `${x}px ${y}px ${r}px ${spread}px ${color}` };
    case "INNER_SHADOW":
      return { name, type: "inner-shadow", css: `inset ${x}px ${y}px ${r}px ${spread}px ${color}` };
    case "LAYER_BLUR":
    case "BACKGROUND_BLUR":
      return { name, type: "blur", css: `blur(${r}px)` };
    default:
      return null;
  }
}

export function dedupeShadows(items: ShadowToken[]): ShadowToken[] {
  const seen = new Map<string, ShadowToken>();
  for (const s of items) if (!seen.has(s.name)) seen.set(s.name, s);
  return [...seen.values()];
}
