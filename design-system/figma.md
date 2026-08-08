# Conexión con Figma

Este repo incluye un **extractor** TypeScript (`src/`) que lee un archivo de Figma vía REST API y propone tokens/contexto.

## Flujo

```
Figma file
  → npm run extract
  → output/design-system/ (propuesta)
  → review humano
  → merge a design-system/tokens.css (+ docs si aplica)
  → landings embeben tokens al generar código
```

## Setup

1. `cp .env.example .env`
2. Completar `FIGMA_TOKEN` (o `FIGMA_API_KEY`) y `FIGMA_FILE_KEY`
3. `npm install && npm run extract`

Flags: `--no-assets`, `--raw-only`, `--file-key=<KEY>`.

## Qué es canónico

| Artefacto | Rol |
|-----------|-----|
| `design-system/tokens.css` | **Canónico** (branding en producción del repo) |
| `output/` tras extract | Propuesta; no se usa directo en landings |
| Landings | Consumen el global embebido; overrides locales opcionales |

## Variables API

- Plan Enterprise → Variables API (modes light/dark)
- Otros planes → fallback a Styles del archivo

Ver también [`README.md`](../README.md) sección Figma.
