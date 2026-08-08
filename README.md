# Bodecatta Landings

Kit para generar **landing pages de Bodecatta BBQ** listas para el widget **Code Block de Oxygen** (WordPress): un documento HTML/PHP + CSS + JS, con design system compartido y un flujo brief → código.

## Cómo funciona

```
nueva-landing  →  wireframe + copy + assets  →  crear-landing  →  pegar en Oxygen
```

1. **Skill `nueva-landing`** — crea `landings/{slug}/` con briefs demo (incluye prompts para armar wireframe/copy en otro chat).
2. Apruebas wireframe, escribes copy, listas/recursos (las imágenes faltantes **no** bloquean).
3. **Skill `crear-landing`** — si el brief ya no tiene `BD_DEMO`, genera `oxygen/` (`markup.php`, `styles.css`, `app.js`) y `preview/`.

Documentación del flujo: [`docs/workflow.md`](docs/workflow.md) · inicio rápido: [`docs/getting-started.md`](docs/getting-started.md) · agentes: [`AGENTS.md`](AGENTS.md).

## Estructura

| Ruta | Rol |
|------|-----|
| [`landings/`](landings/) | Una carpeta por campaña |
| [`design-system/`](design-system/) | Tokens y docs de marca (**global**, no se edita por landing) |
| [`shared/assets/`](shared/assets/) | Logos / iconos compartidos |
| [`contracts/`](contracts/) | Contratos de brief, readiness, Oxygen y assets |
| [`.agents/skills/`](.agents/skills/) | Skills portables (`nueva-landing`, `crear-landing`) |
| [`AGENTS.md`](AGENTS.md) | Instrucciones para cualquier agente/IDE |
| [`docs/`](docs/) | Guías humanas |
| [`src/`](src/) | Extractor opcional de Figma |

Detalle: [`docs/folder-structure.md`](docs/folder-structure.md).

## Skills (Cursor · Codex · VS Code)

Canónicas en [`.agents/skills/`](.agents/skills/) (estándar Agent Skills). Symlinks a `.cursor/skills`, `.codex/skills` y `.github/skills` para que cada IDE las descubra sin duplicar archivos.

### `nueva-landing`

- **Input:** nombre de la landing  
- **Hace:** carpeta + `README`, `wireframe`, `copy`, `assets`, `overrides` (demo con `BD_DEMO` + prompt sugerido) + `assets/images|video`  
- **No hace:** código  

### `crear-landing`

- **Input:** slug o path (`smash-burger-mex`)  
- **Hace:** valida readiness → genera Oxygen + preview  
- **Aborta si:** no hay carpeta, faltan MD, o sigue el contenido demo (`BD_DEMO`)  
- **No aborta por:** imágenes faltantes (usa `shared/` o placeholders)

## Design system

Fuente de verdad: [`design-system/tokens.css`](design-system/tokens.css)  
Colores, tipografía (Bebas Neue + Hanken Grotesk), componentes y motion: carpeta [`design-system/`](design-system/).

Las landings pueden sobreescribir tokens **localmente** (`overrides.md` → root CSS). Nunca editar el global desde una campaña.

Conexión Figma: [`design-system/figma.md`](design-system/figma.md).

## Ejemplo de referencia

[`landings/smash-burger-mex/`](landings/smash-burger-mex/) — brief real + código Oxygen de referencia (Combo Smash $148).

## Oxygen

Ver [`docs/oxygen-workflow.md`](docs/oxygen-workflow.md) y [`contracts/oxygen.contract.md`](contracts/oxygen.contract.md).

## Extractor Figma (opcional)

```bash
npm install
cp .env.example .env   # FIGMA_TOKEN + FIGMA_FILE_KEY
npm run extract
```

La salida en `output/` es una **propuesta**; el canónico del repo sigue siendo `design-system/`.

## Contratos

- [`contracts/brief.contract.md`](contracts/brief.contract.md)
- [`contracts/readiness.contract.md`](contracts/readiness.contract.md)
- [`contracts/oxygen.contract.md`](contracts/oxygen.contract.md)
- [`contracts/assets.contract.md`](contracts/assets.contract.md)
