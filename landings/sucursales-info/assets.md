<!-- BD_DEMO: borrar este bloque y reemplazar con contenido real. -->

# Assets — Sucursales Info

> Lista los slots. Si un archivo aún no exista, pon `missing` — **eso no bloquea** `/crear-landing` (se usará `shared/` o placeholder).

## Qué se espera

Tabla de slots alineada al wireframe:

| Slot | Archivo o URL | Estado | Notas |
|------|---------------|--------|-------|
| logo | `../../shared/assets/logos/Bodecatta-MedioLogo-white.png` | shared | Logo marca |
| hero | `assets/images/hero.jpg` | missing | Foto producto dominante |
| … | … | ready / missing / shared / wp / placeholder | … |

Estados: `ready` · `missing` · `shared` · `wp` · `placeholder`

Coloca archivos en `assets/images/` o `assets/video/`.

## Prompt sugerido (otro chat)

```
Eres productor de assets para landings Bodecatta.
A partir de este wireframe y copy, genera la tabla assets.md (markdown) con slots necesarios.
Para cada slot: nombre de archivo sugerido (kebab-case), estado missing o shared (logo), notas de framing/alt text.
Si no hay foto, marca missing (no inventes URLs falsas).
NO incluyas BD_DEMO.
Wireframe + copy:
<<<PEGA>>>
```
