import { FigmaApi } from "../figma/api.js";
import { FigmaClient } from "../figma/client.js";
import type { Writer } from "../output/writer.js";
import { chunk, slug } from "../util.js";

const BATCH = 50;

export interface RenderTarget {
  id: string;
  name: string;
  /** Subcarpeta bajo assets/ y formatos deseados. */
  category: "components" | "icons" | "screens";
  formats: ("png" | "svg")[];
}

export interface AssetResult {
  /** nodeId → { png?, svg? } rutas relativas al root de output. */
  byId: Map<string, { png?: string; svg?: string }>;
  downloaded: number;
  failed: number;
}

/**
 * Renderiza los nodos objetivo vía Images API (en lotes por formato) y descarga los binarios.
 * Devuelve un map id → rutas relativas de los archivos guardados.
 */
export async function extractAssets(
  api: FigmaApi,
  client: FigmaClient,
  writer: Writer,
  targets: RenderTarget[],
  pngScale: number,
): Promise<AssetResult> {
  const byId = new Map<string, { png?: string; svg?: string }>();
  let downloaded = 0;
  let failed = 0;

  // Agrupamos por formato para minimizar llamadas.
  for (const format of ["png", "svg"] as const) {
    const forFormat = targets.filter((t) => t.formats.includes(format));
    if (forFormat.length === 0) continue;

    const targetById = new Map(forFormat.map((t) => [t.id, t]));

    for (const batch of chunk(forFormat, BATCH)) {
      const ids = batch.map((t) => t.id);
      let images: Record<string, string | null>;
      try {
        const res = await api.images(ids, format, pngScale);
        if (res.err) {
          console.warn(`  ⚠ Images API (${format}) devolvió error: ${res.err}`);
          failed += ids.length;
          continue;
        }
        images = res.images;
      } catch (err) {
        console.warn(`  ⚠ Fallo renderizando lote ${format}: ${(err as Error).message}`);
        failed += ids.length;
        continue;
      }

      // Descargamos los binarios en paralelo (el cliente ya limita la concurrencia global).
      await Promise.all(
        Object.entries(images).map(async ([id, url]) => {
          if (!url) {
            failed++;
            return;
          }
          const target = targetById.get(id);
          if (!target) return;
          const rel = `assets/${target.category}/${slug(target.name)}-${sanitizeId(id)}.${format}`;
          try {
            const buf = await client.downloadBinary(url);
            await writer.binary(rel, buf);
            const entry = byId.get(id) ?? {};
            entry[format] = rel;
            byId.set(id, entry);
            downloaded++;
          } catch (err) {
            console.warn(`  ⚠ Descarga fallida (${id}): ${(err as Error).message}`);
            failed++;
          }
        }),
      );
    }
  }

  return { byId, downloaded, failed };
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9]+/g, "_");
}
