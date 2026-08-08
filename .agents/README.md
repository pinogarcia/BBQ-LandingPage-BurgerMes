# Agent Skills (portable)

Skills canónicas del repo. Formato [Agent Skills](https://agentskills.io) (`SKILL.md`).

```
.agents/skills/
  nueva-landing/     # scaffold de brief
  crear-landing/     # generación Oxygen
```

## Compatibilidad

| Entorno | Cómo las encuentra |
|---------|-------------------|
| **Cualquiera (canónico)** | `.agents/skills/` |
| Cursor | symlink `.cursor/skills` → aquí |
| Codex | symlink `.codex/skills` → aquí (+ escaneo de `.agents/skills`) |
| VS Code / Copilot | symlink `.github/skills` → aquí (+ `.agents/skills`) |

No dupliques skills en carpetas de vendor: edita solo `.agents/skills/`.

También ver [`AGENTS.md`](../AGENTS.md) en la raíz.
