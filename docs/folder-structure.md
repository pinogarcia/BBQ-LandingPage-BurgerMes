# Estructura del repo

```
bodecatta-landing/
├── README.md                 # Hub: qué es y cómo usarlo
├── contracts/                # Contratos (brief, readiness, oxygen, assets)
├── design-system/            # Branding global (tokens + docs + Figma)
├── shared/assets/            # Logos / iconos compartidos
├── landings/
│   └── {slug}/
│       ├── README.md         # meta + status
│       ├── wireframe.md
│       ├── copy.md
│       ├── assets.md
│       ├── overrides.md      # opcional
│       ├── assets/images|video/
│       ├── oxygen/           # paste Oxygen (tras /crear-landing)
│       └── preview/          # QA local
├── docs/                     # Guías humanas
├── AGENTS.md                 # Instrucciones multi-IDE
├── .agents/skills/           # Skills canónicas (portable)
│   ├── nueva-landing/        # scaffold
│   └── crear-landing/        # código
├── .cursor/skills → .agents/skills   # symlink Cursor
├── .codex/skills  → .agents/skills   # symlink Codex
├── .github/skills → .agents/skills   # symlink VS Code / Copilot
├── .cursor/rules/            # Reglas Cursor (complemento de AGENTS.md)
├── images/                   # raw / fuente de trabajo
└── src/                      # extractor Figma (opcional)
```

## Status de una landing

| status | Significado |
|--------|-------------|
| `briefing` | Carpetas + demos; falta brief real |
| `ready` | Brief sin `BD_DEMO` (opcional marcar a mano) |
| `coded` | `oxygen/` generado |
