# AGENTS — Bodecatta Landings

Instrucciones para cualquier agente (Cursor, Codex, VS Code / Copilot, etc.).

## Qué es este repo

Kit para landings Bodecatta listos para Oxygen Code Block: `markup.php` (HTML + PHP opcional) + CSS + JS, con design system global.

## Skills (canónicas)

Viven en [`.agents/skills/`](.agents/skills/) (estándar Agent Skills). Hay symlinks a `.cursor/skills`, `.codex/skills` y `.github/skills` para descubrimiento por IDE.

| Skill | Cuándo |
|-------|--------|
| `nueva-landing` | Crear carpeta + briefs demo. Input: nombre. **Sin código.** |
| `crear-landing` | Generar `oxygen/` + `preview/`. Input: slug/path. Aborta si hay `BD_DEMO` en README/wireframe/copy. |

Invocación típica: `/nueva-landing`, `/crear-landing`, o pedir explícitamente la skill por nombre.

## Flujo obligatorio

1. `nueva-landing` → `landings/{slug}/` con MD demo (`BD_DEMO` + prompts sugeridos).
2. Humano: wireframe aprobado → copy → assets (imágenes opcionales).
3. `crear-landing` → código solo si el brief está listo.

## Reglas duras

- No editar `design-system/tokens.css` desde una landing.
- Overrides solo en root scoped `#bd-{slug}` / `overrides.md`.
- Assets faltantes **no** bloquean el build → `shared/assets/` o placeholders.
- Referencia de código: `landings/smash-burger-mex/oxygen/`.
- Contratos: `contracts/*.md`.

## Docs

- [README.md](README.md)
- [docs/workflow.md](docs/workflow.md)
- [docs/getting-started.md](docs/getting-started.md)
- [design-system/](design-system/)
