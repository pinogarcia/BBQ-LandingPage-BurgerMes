import type { ComponentEntry, DesignModel } from "../model.js";

/** Catálogo de componentes normalizado y agrupado por página, listo para consumo. */
export function buildCatalog(model: DesignModel) {
  const byPage: Record<string, ComponentEntry[]> = {};
  for (const c of model.components) {
    const page = c.page || "sin-pagina";
    (byPage[page] ??= []).push(c);
  }

  return {
    total: model.components.length,
    sets: model.components.filter((c) => c.type === "COMPONENT_SET").length,
    components: model.components.filter((c) => c.type === "COMPONENT").length,
    byPage,
  };
}
