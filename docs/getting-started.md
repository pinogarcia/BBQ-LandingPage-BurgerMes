# Getting started

## Qué es este repo

Kit para crear **landing pages Bodecatta** listas para pegar en el widget **Code Block de Oxygen** (WordPress): HTML/PHP + CSS + JS, con un design system compartido.

## Requisitos

- Un agente compatible con Agent Skills (Cursor, Codex, VS Code/Copilot, etc.)
- Node 20+ solo si vas a correr el extractor de Figma (`npm run extract`)

Las skills viven en `.agents/skills/` y se exponen a cada IDE por symlink. Detalle: [`.agents/README.md`](../.agents/README.md).

## Flujo en 4 pasos

1. **Skill `nueva-landing`** — da el nombre de la campaña. Se crea `landings/{slug}/` con markdowns demo.
2. **Wireframe** — edita `wireframe.md` (puedes usar el prompt sugerido dentro del archivo en otro chat). Quita `BD_DEMO`.
3. **Copy + assets** — `copy.md` + `assets.md` (+ archivos en `assets/` si los tienes). Assets faltantes **no** bloquean el código.
4. **Skill `crear-landing`** — da el slug. Si el brief está listo, genera `oxygen/` y `preview/`.

## Pegar en Oxygen

1. Sube imágenes a la Media Library de WordPress.
2. Abre la página en Oxygen → 3 Code Blocks (HTML / CSS / JS).
3. Pega `oxygen/markup.php`, `styles.css`, `app.js`.
4. Sustituye paths locales por URLs `wp-content/uploads/…` si hace falta.

Detalle: [`oxygen-workflow.md`](oxygen-workflow.md).

## Ejemplo listo

[`landings/smash-burger-mex/`](../landings/smash-burger-mex/) — brief completo + código de referencia.
