import type { DesignModel } from "../model.js";
import { pathSegments, slug } from "../util.js";

/** Estructura W3C DTCG: grupos anidados con hojas { $type, $value, $description? }. */
type DtcgLeaf = { $type: string; $value: unknown; $description?: string };
type DtcgNode = { [key: string]: DtcgNode | DtcgLeaf };

/** Construye el objeto design-tokens.json en formato W3C DTCG. */
export function buildDtcg(model: DesignModel): DtcgNode {
  const root: DtcgNode = {};

  const color: DtcgNode = {};
  for (const c of model.colors) {
    setDeep(color, pathSegments(c.name), { $type: "color", $value: c.hex });
  }

  const typography: DtcgNode = {};
  for (const t of model.typography) {
    setDeep(typography, pathSegments(t.name), {
      $type: "typography",
      $value: {
        fontFamily: t.fontFamily,
        fontWeight: t.fontWeight,
        fontSize: t.fontSize != null ? `${t.fontSize}px` : undefined,
        lineHeight: typeof t.lineHeight === "number" ? `${t.lineHeight}px` : t.lineHeight,
        letterSpacing: t.letterSpacing != null ? `${t.letterSpacing}px` : undefined,
      },
    });
  }

  const shadow: DtcgNode = {};
  for (const s of model.shadows) {
    setDeep(shadow, pathSegments(s.name), { $type: "shadow", $value: s.css, $description: s.type });
  }

  const spacing: DtcgNode = {};
  for (const s of model.spacing) {
    spacing[slug(s.name)] = { $type: "dimension", $value: `${s.value}px` };
  }

  const radius: DtcgNode = {};
  for (const r of model.radii) {
    radius[slug(r.name)] = { $type: "dimension", $value: `${r.value}px` };
  }

  if (Object.keys(color).length) root.color = color;
  if (Object.keys(typography).length) root.typography = typography;
  if (Object.keys(shadow).length) root.shadow = shadow;
  if (Object.keys(spacing).length) root.spacing = spacing;
  if (Object.keys(radius).length) root.radius = radius;

  return root;
}

/** Genera un archivo CSS con custom properties a partir del modelo. */
export function buildCss(model: DesignModel): string {
  const lines: string[] = [":root {"];

  for (const c of model.colors) lines.push(`  --color-${slug(c.name)}: ${c.hex};`);
  for (const s of model.spacing) lines.push(`  --${slug(s.name)}: ${s.value}px;`);
  for (const r of model.radii) lines.push(`  --${slug(r.name)}: ${r.value}px;`);
  for (const s of model.shadows) {
    if (s.type !== "blur") lines.push(`  --shadow-${slug(s.name)}: ${s.css};`);
  }
  for (const t of model.typography) {
    if (t.fontSize != null) lines.push(`  --font-size-${slug(t.name)}: ${t.fontSize}px;`);
  }

  lines.push("}");

  // Dark mode: si algún color trae modes con "dark".
  const darkColors = model.colors.filter((c) => c.modes && findMode(c.modes, "dark"));
  if (darkColors.length) {
    lines.push("", "@media (prefers-color-scheme: dark) {", "  :root {");
    for (const c of darkColors) {
      const val = findMode(c.modes!, "dark")!;
      lines.push(`    --color-${slug(c.name)}: ${val};`);
    }
    lines.push("  }", "}");
  }

  return lines.join("\n") + "\n";
}

function findMode(modes: Record<string, string>, needle: string): string | undefined {
  const key = Object.keys(modes).find((m) => m.toLowerCase().includes(needle));
  return key ? modes[key] : undefined;
}

/** Inserta `leaf` en `root` siguiendo la ruta de segmentos, creando grupos intermedios. */
function setDeep(root: DtcgNode, segments: string[], leaf: DtcgLeaf): void {
  const path = segments.length ? segments.map(slug) : ["default"];
  let cursor = root;
  for (let i = 0; i < path.length - 1; i++) {
    const seg = path[i];
    const next = cursor[seg];
    if (!next || isLeaf(next)) cursor[seg] = {} as DtcgNode;
    cursor = cursor[seg] as DtcgNode;
  }
  cursor[path[path.length - 1]] = leaf;
}

function isLeaf(n: DtcgNode | DtcgLeaf): n is DtcgLeaf {
  return "$value" in n;
}
