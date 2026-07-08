import type { DesignModel } from "../model.js";

/**
 * design-context.json: bundle compacto y legible por un LLM. Es el puente hacia la etapa
 * de generación de landings desde un wireframe Mermaid — resume la identidad visual del sitio
 * (paleta, tipografía, spacing, sombras), el inventario de componentes con su render, y las
 * pantallas existentes como referencia.
 */
export function buildContext(model: DesignModel) {
  return {
    meta: {
      file: model.fileName,
      fileKey: model.fileKey,
      lastModified: model.lastModified,
      variablesApiUsed: model.variablesApiUsed,
      generatedAt: new Date().toISOString(),
    },
    instructions:
      "Usa estos tokens y componentes como guía de diseño obligatoria al generar landings a partir de un wireframe Mermaid. Respeta la paleta, tipografía y spacing. Reutiliza los componentes listados por su nombre; sus renders están en las rutas 'assets'.",
    palette: model.colors.map((c) => ({ name: c.name, hex: c.hex, modes: c.modes })),
    typography: model.typography.map((t) => ({
      name: t.name,
      fontFamily: t.fontFamily,
      fontWeight: t.fontWeight,
      fontSize: t.fontSize,
      lineHeight: t.lineHeight,
      letterSpacing: t.letterSpacing,
    })),
    spacingScale: model.spacing.map((s) => s.value),
    radiusScale: model.radii.map((r) => r.value),
    shadows: model.shadows.map((s) => ({ name: s.name, type: s.type, css: s.css })),
    components: model.components.map((c) => ({
      name: c.name,
      type: c.type,
      page: c.page,
      description: c.description,
      variants: c.variants,
      properties: c.properties,
      render: c.assets.svg ?? c.assets.png,
    })),
    screens: model.screens.map((s) => ({
      name: s.name,
      page: s.page,
      width: s.width,
      height: s.height,
      render: s.asset,
    })),
  };
}
