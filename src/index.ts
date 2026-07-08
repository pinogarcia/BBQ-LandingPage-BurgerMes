import { loadConfig, parseFlags } from "./config.js";
import { FigmaClient } from "./figma/client.js";
import { FigmaApi } from "./figma/api.js";
import { Writer } from "./output/writer.js";
import { extractVariables } from "./extract/variables.js";
import { extractStyles } from "./extract/styles.js";
import { extractComponents } from "./extract/components.js";
import { extractScreens, collectIconNodes } from "./extract/screens.js";
import { extractAssets, type RenderTarget } from "./extract/assets.js";
import { dedupeColors } from "./transform/colors.js";
import { dedupeTypography } from "./transform/typography.js";
import { dedupeShadows } from "./transform/effects.js";
import { inferScales } from "./transform/spacing.js";
import { buildDtcg, buildCss } from "./transform/tokens.js";
import { buildCatalog } from "./transform/catalog.js";
import { buildContext } from "./transform/context.js";
import type { DesignModel, ScaleToken } from "./model.js";

async function main() {
  const flags = parseFlags(process.argv.slice(2));
  const config = loadConfig(flags);

  const client = new FigmaClient({ token: config.token, concurrency: config.concurrency });
  const api = new FigmaApi(client, config.fileKey);
  const writer = new Writer();

  console.log(`\n▶ Extrayendo Figma file ${config.fileKey}\n`);

  // 1) Documento completo -----------------------------------------------------
  console.log("• Descargando documento…");
  const file = await api.file();
  await writer.json("raw/file.json", file);
  console.log(`  ✓ "${file.name}" (modificado ${file.lastModified})`);

  if (flags.rawOnly) {
    console.log("\n--raw-only: guardado output/raw/file.json y saliendo.\n");
    return;
  }

  // 2) Tokens: Variables API (Enterprise) con fallback a Styles ----------------
  console.log("• Extrayendo tokens…");
  const vars = await extractVariables(api);
  const styles = extractStyles(file);
  if (vars.available) {
    await writer.json("raw/variables.json", vars.raw);
    console.log(`  ✓ Variables API disponible (${vars.colors.length} colores, ${vars.numbers.length} números)`);
  } else {
    console.log("  ⚠ Variables API no disponible (plan no-Enterprise o sin scope). Usando Styles.");
  }

  // Fusión: Variables tiene prioridad; Styles complementa lo que falte por nombre.
  const colors = dedupeColors([...vars.colors, ...styles.colors]);
  const typography = dedupeTypography(styles.typography);
  const shadows = dedupeShadows(styles.shadows);

  // Escalas: inferidas del árbol + números de Variables si los hay.
  const inferred = inferScales(file);
  const spacing = mergeScales("spacing", inferred.spacing, vars.numbers.filter((n) => /space|gap|pad/i.test(n.name)));
  const radii = mergeScales("radius", inferred.radii, vars.numbers.filter((n) => /radius|round|corner/i.test(n.name)));

  // 3) Componentes y pantallas -------------------------------------------------
  console.log("• Extrayendo componentes y pantallas…");
  const components = extractComponents(file);
  const screens = extractScreens(file);
  const icons = collectIconNodes(file);
  console.log(`  ✓ ${components.length} componentes, ${screens.length} pantallas, ${icons.length} iconos`);

  // 4) Assets (renders PNG + SVG) ----------------------------------------------
  let assetStats = { downloaded: 0, failed: 0 };
  if (!flags.noAssets) {
    console.log("• Renderizando y descargando assets (PNG + SVG)…");
    const targets: RenderTarget[] = [
      ...components.map((c): RenderTarget => ({ id: c.id, name: c.name, category: "components", formats: ["svg", "png"] })),
      ...icons.map((i): RenderTarget => ({ id: i.id, name: i.name, category: "icons", formats: ["svg"] })),
      ...screens.map((s): RenderTarget => ({ id: s.id, name: s.name, category: "screens", formats: ["png"] })),
    ];
    const assets = await extractAssets(api, client, writer, targets, config.pngScale);
    assetStats = { downloaded: assets.downloaded, failed: assets.failed };

    for (const c of components) {
      const a = assets.byId.get(c.id);
      if (a) c.assets = a;
    }
    for (const s of screens) {
      const a = assets.byId.get(s.id);
      if (a?.png) s.asset = a.png;
    }
    console.log(`  ✓ ${assets.downloaded} archivos descargados${assets.failed ? `, ${assets.failed} fallidos` : ""}`);
  } else {
    console.log("• --no-assets: se omiten renders.");
  }

  // 5) Ensamblado del modelo y salidas -----------------------------------------
  const model: DesignModel = {
    fileName: file.name,
    fileKey: config.fileKey,
    lastModified: file.lastModified,
    variablesApiUsed: vars.available,
    colors,
    typography,
    shadows,
    spacing,
    radii,
    components,
    screens,
  };

  console.log("• Escribiendo design system y contexto…");
  await writer.json("design-system/design-tokens.json", buildDtcg(model));
  await writer.text("design-system/tokens.css", buildCss(model));
  await writer.json("design-system/component-catalog.json", buildCatalog(model));
  await writer.json("design-context.json", buildContext(model));

  const manifest = {
    file: file.name,
    fileKey: config.fileKey,
    lastModified: file.lastModified,
    generatedAt: new Date().toISOString(),
    variablesApiUsed: vars.available,
    counts: {
      colors: colors.length,
      typography: typography.length,
      shadows: shadows.length,
      spacing: spacing.length,
      radii: radii.length,
      components: components.length,
      screens: screens.length,
      assetsDownloaded: assetStats.downloaded,
      assetsFailed: assetStats.failed,
    },
    outputs: {
      designTokens: "design-system/design-tokens.json",
      tokensCss: "design-system/tokens.css",
      componentCatalog: "design-system/component-catalog.json",
      designContext: "design-context.json",
      raw: "raw/",
      assets: "assets/",
    },
  };
  await writer.json("manifest.json", manifest);

  console.log(`\n✓ Listo. Salida en ${writer.root}\n`);
  console.table(manifest.counts);
}

/** Une escalas inferidas con valores de Variables, dedup por valor, ordenadas. */
function mergeScales(prefix: string, inferred: ScaleToken[], fromVars: ScaleToken[]): ScaleToken[] {
  const values = new Set<number>();
  for (const s of [...fromVars, ...inferred]) values.add(Math.round(s.value));
  return [...values].sort((a, b) => a - b).map((value) => ({ name: `${prefix}-${value}`, value }));
}

main().catch((err) => {
  console.error(`\n✖ Error: ${err.message}\n`);
  process.exitCode = 1;
});
