# Workflow: de idea a Oxygen

```mermaid
flowchart TD
  A["/nueva-landing nombre"] --> B["landings/slug + MD demo"]
  B --> C["Wireframe aprobado sin BD_DEMO"]
  C --> D["Copy final sin BD_DEMO"]
  D --> E["assets.md + archivos opcionales"]
  E --> F["/crear-landing slug"]
  F --> G{"Gates OK?"}
  G -->|No| H["Abort: checklist de faltantes"]
  G -->|Sí| I["oxygen/ + preview/"]
  I --> J["Pegar en Oxygen Code Blocks"]
```

## Skills

Canónicas en `.agents/skills/` (también vía `/nueva-landing` o `/crear-landing` según el IDE).

| Skill | Input | Output |
|-------|-------|--------|
| `nueva-landing` | Nombre | Carpeta + templates con `BD_DEMO` + prompts sugeridos |
| `crear-landing` | Path o slug | `markup.php` + CSS + JS (+ preview) |

Ver [`.agents/README.md`](../.agents/README.md) y [`AGENTS.md`](../AGENTS.md).

## Qué bloquea `/crear-landing`

- Carpeta inexistente
- Faltan MD de brief
- `BD_DEMO` aún en README / wireframe / copy

## Qué NO bloquea

- Imágenes o video ausentes → logo shared o placeholder
