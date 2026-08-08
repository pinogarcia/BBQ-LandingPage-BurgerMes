---
name: nueva-landing
description: >-
  Scaffold a new Bodecatta landing folder with brief templates (wireframe, copy,
  assets). Use when the user invokes /nueva-landing or asks to start a new
  landing campaign before code exists. Does not generate Oxygen code.
disable-model-invocation: true
---

# `nueva-landing` — Scaffold de brief

Compatible con Cursor, Codex, VS Code/Copilot y cualquier agente que cargue Agent Skills desde `.agents/skills/`.

Crea la carpeta de una landing nueva con markdowns de brief (demo) y subfolders de assets. **No genera código.**

## Input mínimo

- **Nombre de la landing** (humano). Se normaliza a `slug` kebab-case (`Smash Burger Mex` → `smash-burger-mex`).

Si falta el nombre, pídelo y detente hasta tenerlo.

## Pasos

1. Leer `contracts/brief.contract.md` (raíz del repo).
2. Derivar `slug` (solo `[a-z0-9-]`).
3. Si existe `landings/{slug}/` → **abortar** (no sobrescribir). Avisa que use otro nombre o limpie la carpeta.
4. Crear:

```
landings/{slug}/
  README.md
  wireframe.md
  copy.md
  assets.md
  overrides.md
  assets/images/
  assets/video/
```

5. Copiar plantillas desde `templates/` en esta skill, sustituyendo `{{TITLE}}` y `{{SLUG}}`.
6. Confirmar que cada MD demo incluye `BD_DEMO`, la estructura esperada y un **prompt sugerido**.
7. **No** crear `oxygen/` ni `preview/`.
8. Responder al usuario con:
   - path creado
   - checklist: wireframe → copy → assets → quitar `BD_DEMO` → skill `crear-landing`
   - recordar que assets faltantes no bloquean el build

## Prohibido

- Generar HTML/CSS/JS
- Editar `design-system/`
- Sobrescribir una landing existente
