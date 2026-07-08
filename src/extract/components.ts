import type { FileResponse, Node } from "../figma/types.js";
import type { ComponentEntry } from "../model.js";

/**
 * Recorre el documento y extrae componentes y component sets con sus variantes,
 * propiedades y página contenedora. Los assets (png/svg) se rellenan más tarde en assets.ts.
 * Una sola recursión rastrea la página actual y si estamos dentro de un COMPONENT_SET
 * (para no duplicar las variantes como componentes sueltos).
 */
export function extractComponents(file: FileResponse): ComponentEntry[] {
  const entries: ComponentEntry[] = [];
  const meta = file.components ?? {};
  const setMeta = file.componentSets ?? {};

  const visit = (node: Node, page: string, insideSet: boolean): void => {
    let currentPage = page;
    if (node.type === "CANVAS") currentPage = node.name;

    if (node.type === "COMPONENT_SET") {
      entries.push({
        id: node.id,
        key: setMeta[node.id]?.key,
        name: node.name,
        description: setMeta[node.id]?.description || (node.description as string | undefined),
        type: "COMPONENT_SET",
        page: currentPage,
        variants: (node.children ?? []).map((c) => c.name),
        properties: node.componentPropertyDefinitions ? Object.keys(node.componentPropertyDefinitions) : undefined,
        assets: {},
      });
    } else if (node.type === "COMPONENT" && !insideSet) {
      entries.push({
        id: node.id,
        key: meta[node.id]?.key,
        name: node.name,
        description: meta[node.id]?.description,
        type: "COMPONENT",
        page: currentPage,
        properties: node.componentPropertyDefinitions ? Object.keys(node.componentPropertyDefinitions) : undefined,
        assets: {},
      });
    }

    const childInside = insideSet || node.type === "COMPONENT_SET";
    for (const child of node.children ?? []) visit(child, currentPage, childInside);
  };

  visit(file.document, "", false);
  return entries;
}
