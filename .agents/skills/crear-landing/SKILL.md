---
name: crear-landing
description: >-
  Generate Bodecatta Oxygen landing code (markup.php, styles.css, app.js +
  preview) from an existing landing brief folder. Use when the user invokes
  /crear-landing. Aborts if briefs are missing or still contain BD_DEMO.
  Missing images do not block; use shared assets or placeholders.
disable-model-invocation: true
---

# `crear-landing` — Generar código Oxygen

Compatible con Cursor, Codex, VS Code/Copilot y cualquier agente que cargue Agent Skills desde `.agents/skills/`.

Genera el código de una landing **solo** cuando el brief está listo.

## Input mínimo

- **Path o slug**: `smash-burger-mex` o `landings/smash-burger-mex`

Si falta, pídelo y detente.

## Gates (obligatorio)

Seguir `contracts/readiness.contract.md`.

### Hard fail → abortar y listar faltantes

- No existe `landings/{slug}/`
- Falta `README.md`, `wireframe.md`, `copy.md` o `assets.md`
- `README.md`, `wireframe.md` o `copy.md` contienen `BD_DEMO`
- `wireframe.md` / `copy.md` vacíos o solo ruido
- `README.md` sin `slug` / `goal`

### Soft (NO abortar)

- Imágenes/video `missing` → usar `shared/assets/` (logos) o placeholders CSS / `<!-- placeholder: slot -->`
- `overrides.md` ausente o demo → ignorar overrides

## Pasos si pasa el gate

1. Leer briefs de la landing + `design-system/` + `contracts/oxygen.contract.md` + `contracts/assets.contract.md`.
2. Usar como referencia de código: `landings/smash-burger-mex/oxygen/`.
3. Embeber tokens de `design-system/tokens.css` en el root scoped. Aplicar overrides reales si existen.
4. Generar:

```
landings/{slug}/oxygen/markup.php
landings/{slug}/oxygen/styles.css
landings/{slug}/oxygen/app.js
landings/{slug}/preview/index.html
landings/{slug}/preview/styles.css
landings/{slug}/preview/app.js
```

5. Root id: `bd-{slug}` (no romper la referencia Smash que usa `bd-smash-landing`).
6. Secciones `--- SECCIÓN N ---` alineadas en los 3 archivos.
7. Actualizar `README.md` → `status: coded`.
8. Resumir: paths, placeholders usados, checklist Oxygen (3 Code Blocks; subir media a WP).

## Prohibido

- Editar `design-system/tokens.css` u otros globales de marca
- Generar si hay `BD_DEMO` en brief crítico
- Inventar tipografía/colores fuera del DS sin overrides reales
- Cards / clutter en el hero (ver `design-system/components.md`)
