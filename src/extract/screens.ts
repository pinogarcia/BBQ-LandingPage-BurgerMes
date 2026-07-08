import type { FileResponse, Node } from "../figma/types.js";
import type { ScreenEntry } from "../model.js";

/**
 * Detecta "pantallas": los frames de primer nivel dentro de cada página (CANVAS).
 * Son las landings / vistas existentes que servirán de referencia visual.
 * El asset PNG se rellena luego en assets.ts.
 */
export function extractScreens(file: FileResponse): ScreenEntry[] {
  const screens: ScreenEntry[] = [];

  for (const page of file.document.children ?? []) {
    if (page.type !== "CANVAS") continue;
    for (const child of page.children ?? []) {
      if (child.type !== "FRAME") continue;
      screens.push({
        id: child.id,
        name: child.name,
        page: page.name,
        width: child.absoluteBoundingBox?.width,
        height: child.absoluteBoundingBox?.height,
      });
    }
  }

  return screens;
}

/** Recolecta ids de nodos vectoriales de primer nivel (candidatos a iconos) para renderizar como SVG. */
export function collectIconNodes(file: FileResponse, maxIcons = 300): { id: string; name: string }[] {
  const icons: { id: string; name: string }[] = [];

  const visit = (node: Node): void => {
    if (icons.length >= maxIcons) return;
    // Heurística: VECTOR sueltos o frames pequeños llamados "icon".
    const looksLikeIcon =
      node.type === "VECTOR" ||
      (/icon/i.test(node.name) && node.absoluteBoundingBox && node.absoluteBoundingBox.width <= 64 && node.absoluteBoundingBox.height <= 64);
    if (looksLikeIcon) {
      icons.push({ id: node.id, name: node.name });
      return; // no descendemos dentro de un icono
    }
    for (const child of node.children ?? []) visit(child);
  };

  visit(file.document);
  return icons;
}
