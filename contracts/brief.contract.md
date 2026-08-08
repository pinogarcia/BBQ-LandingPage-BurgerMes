# Contrato de brief (por landing)

Cada landing vive en `landings/{slug}/` y debe tener estos archivos de brief **antes** de generar código.

| Archivo | Obligatorio | Propósito |
|---------|-------------|-----------|
| `README.md` | Sí | Meta: nombre, slug, goal, status |
| `wireframe.md` | Sí | Estructura de secciones aprobada |
| `copy.md` | Sí | Textos finales por sección |
| `assets.md` | Sí | Inventario de imágenes/video (paths, URLs o placeholder) |
| `overrides.md` | No | Tokens locales (no tocar el design system global) |

## Status en README.md

Valores permitidos:

- `briefing` — carpeta creada, briefs incompletos o demo
- `ready` — wireframe + copy listos (sin `BD_DEMO`); listo para `/crear-landing`
- `coded` — `oxygen/` y `preview/` generados

## Marcador demo

Los templates de `/nueva-landing` llevan:

```html
<!-- BD_DEMO: borrar este bloque y reemplazar con contenido real. -->
```

Mientras exista `BD_DEMO` en `README.md`, `wireframe.md` o `copy.md`, `/crear-landing` **aborta**.

`assets.md` puede seguir con slots sin archivo: eso **no** bloquea el build (se usan globales o placeholders).

## Referencia

Ver briefs reales en [`landings/smash-burger-mex/`](../landings/smash-burger-mex/).
