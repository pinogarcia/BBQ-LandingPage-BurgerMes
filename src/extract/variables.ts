import { FigmaApi } from "../figma/api.js";
import { HttpError } from "../figma/client.js";
import type { RGBA, Variable, VariablesResponse } from "../figma/types.js";
import type { ColorToken, ScaleToken } from "../model.js";
import { rgbaToCss, rgbaToHex } from "../util.js";

export interface VariablesResult {
  available: boolean;
  raw?: VariablesResponse;
  colors: ColorToken[];
  numbers: ScaleToken[];
}

/**
 * Extrae tokens desde la Variables API (solo Enterprise).
 * Si el endpoint devuelve 403/404 (plan sin acceso) marca available=false y no rompe el pipeline.
 */
export async function extractVariables(api: FigmaApi): Promise<VariablesResult> {
  let raw: VariablesResponse;
  try {
    raw = await api.variablesLocal();
  } catch (err) {
    if (err instanceof HttpError && (err.status === 403 || err.status === 404)) {
      return { available: false, colors: [], numbers: [] };
    }
    throw err;
  }

  const variables = Object.values(raw.meta.variables);
  const collections = raw.meta.variableCollections;
  const byId = raw.meta.variables;

  const colors: ColorToken[] = [];
  const numbers: ScaleToken[] = [];

  for (const v of variables) {
    const collection = collections[v.variableCollectionId];
    const modeNames = new Map(collection?.modes.map((m) => [m.modeId, m.name]) ?? []);
    const defaultModeId = collection?.defaultModeId ?? Object.keys(v.valuesByMode)[0];

    if (v.resolvedType === "COLOR") {
      const modes: Record<string, string> = {};
      for (const [modeId, val] of Object.entries(v.valuesByMode)) {
        const resolved = resolveColor(val, byId);
        if (resolved) modes[modeNames.get(modeId) ?? modeId] = rgbaToHex(resolved);
      }
      const defaultVal = resolveColor(v.valuesByMode[defaultModeId], byId);
      if (defaultVal) {
        colors.push({
          name: v.name,
          hex: rgbaToHex(defaultVal),
          css: rgbaToCss(defaultVal),
          modes: Object.keys(modes).length > 1 ? modes : undefined,
        });
      }
    } else if (v.resolvedType === "FLOAT") {
      const num = resolveNumber(v.valuesByMode[defaultModeId], byId);
      if (num != null) numbers.push({ name: v.name, value: num });
    }
  }

  return { available: true, raw, colors, numbers };
}

/** Resuelve un valor de color siguiendo alias VARIABLE_ALIAS de forma recursiva. */
function resolveColor(value: unknown, byId: Record<string, Variable>, seen = new Set<string>()): RGBA | null {
  if (value == null) return null;
  if (isAlias(value)) {
    if (seen.has(value.id)) return null;
    seen.add(value.id);
    const target = byId[value.id];
    if (!target) return null;
    const modeId = Object.keys(target.valuesByMode)[0];
    return resolveColor(target.valuesByMode[modeId], byId, seen);
  }
  if (isRgba(value)) return value;
  return null;
}

function resolveNumber(value: unknown, byId: Record<string, Variable>, seen = new Set<string>()): number | null {
  if (value == null) return null;
  if (isAlias(value)) {
    if (seen.has(value.id)) return null;
    seen.add(value.id);
    const target = byId[value.id];
    if (!target) return null;
    const modeId = Object.keys(target.valuesByMode)[0];
    return resolveNumber(target.valuesByMode[modeId], byId, seen);
  }
  return typeof value === "number" ? value : null;
}

function isAlias(v: unknown): v is { type: "VARIABLE_ALIAS"; id: string } {
  return typeof v === "object" && v !== null && (v as { type?: string }).type === "VARIABLE_ALIAS";
}

function isRgba(v: unknown): v is RGBA {
  return typeof v === "object" && v !== null && "r" in v && "g" in v && "b" in v;
}
