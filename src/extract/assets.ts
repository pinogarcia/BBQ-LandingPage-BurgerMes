import { FigmaApi } from "../figma/api.js";
import { FigmaClient } from "../figma/client.js";
import type { Writer } from "../output/writer.js";
import { chunk, slug } from "../util.js";

const BATCH = 40;

export interface RenderTarget {
  id: string;
  name: string;
  /** Subcarpeta bajo assets/ y formatos deseados. */
  category: "components" | "icons" | "screens";
  formats: ("png" | "svg")[];
  /** Escala PNG específica (las pantallas grandes usan una escala menor para no dar timeout). */
  pngScale?: number;
}

export interface AssetResult {
  /** nodeId → { png?, svg? } rutas relativas al root de output. */
  byId: Map<string, { png?: string; svg?: string }>;
  downloaded: number;
  failed: number;
}

/**
 * Renderiza los nodos objetivo vía Images API (en lotes) y descarga los binarios.
 * Si un lote PNG da "render timeout" (400), se parte a la mitad y se reintenta recursivamente
 * hasta poder renderizar imagen a imagen. Devuelve un map id → rutas relativas guardadas.
 */
export async function extractAssets(
  api: FigmaApi,
  client: FigmaClient,
  writer: Writer,
  targets: RenderTarget[],
  defaultPngScale: number,
): Promise<AssetResult> {
  const ctx: RenderCtx = { api, client, writer, byId: new Map(), downloaded: 0, failed: 0 };

  // SVG: no depende de escala; un solo grupo.
  await renderFormat(ctx, targets.filter((t) => t.formats.includes("svg")), "svg", 1);

  // PNG: agrupamos por escala (pantallas usan escala reducida).
  const pngTargets = targets.filter((t) => t.formats.includes("png"));
  const byScale = new Map<number, RenderTarget[]>();
  for (const t of pngTargets) {
    const scale = t.pngScale ?? defaultPngScale;
    (byScale.get(scale) ?? byScale.set(scale, []).get(scale)!).push(t);
  }
  for (const [scale, group] of byScale) {
    await renderFormat(ctx, group, "png", scale);
  }

  return { byId: ctx.byId, downloaded: ctx.downloaded, failed: ctx.failed };
}

interface RenderCtx {
  api: FigmaApi;
  client: FigmaClient;
  writer: Writer;
  byId: Map<string, { png?: string; svg?: string }>;
  downloaded: number;
  failed: number;
}

async function renderFormat(ctx: RenderCtx, targets: RenderTarget[], format: "png" | "svg", scale: number): Promise<void> {
  if (targets.length === 0) return;
  for (const batch of chunk(targets, BATCH)) {
    await renderBatch(ctx, batch, format, scale);
  }
}

/** Renderiza un lote; si falla y tiene más de 1 elemento, lo parte y reintenta. */
async function renderBatch(ctx: RenderCtx, batch: RenderTarget[], format: "png" | "svg", scale: number): Promise<void> {
  const targetById = new Map(batch.map((t) => [t.id, t]));
  let images: Record<string, string | null>;
  try {
    const res = await ctx.api.images(batch.map((t) => t.id), format, scale);
    if (res.err) throw new Error(res.err);
    images = res.images;
  } catch (err) {
    if (batch.length > 1) {
      const mid = Math.ceil(batch.length / 2);
      await renderBatch(ctx, batch.slice(0, mid), format, scale);
      await renderBatch(ctx, batch.slice(mid), format, scale);
      return;
    }
    console.warn(`  ⚠ No se pudo renderizar "${batch[0].name}" (${format}): ${(err as Error).message}`);
    ctx.failed++;
    return;
  }

  await Promise.all(
    Object.entries(images).map(async ([id, url]) => {
      const target = targetById.get(id);
      if (!target) return;
      if (!url) {
        ctx.failed++;
        return;
      }
      const rel = `assets/${target.category}/${slug(target.name)}-${sanitizeId(id)}.${format}`;
      try {
        const buf = await ctx.client.downloadBinary(url);
        await ctx.writer.binary(rel, buf);
        const entry = ctx.byId.get(id) ?? {};
        entry[format] = rel;
        ctx.byId.set(id, entry);
        ctx.downloaded++;
      } catch (err) {
        console.warn(`  ⚠ Descarga fallida (${target.name}): ${(err as Error).message}`);
        ctx.failed++;
      }
    }),
  );
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9]+/g, "_");
}
