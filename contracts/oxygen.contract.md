# Contrato Oxygen (entrega de código)

Cada landing genera exactamente **3 archivos** paste-ready en `landings/{slug}/oxygen/`:

| Archivo | Code Block Oxygen | Contenido |
|---------|-------------------|-----------|
| `markup.php` | HTML | HTML + PHP opcional en el **mismo** documento |
| `styles.css` | CSS | CSS scoped al root de la landing |
| `app.js` | JS | JS scoped al root (IIFE) |

También se genera `preview/` (HTML completo) para QA local. No es el artefacto de publicación.

## Root y scoping

- Root: `<div id="bd-{slug}">` (ej. `bd-smash-burger-mex` o el id histórico `bd-smash-landing` en la referencia Smash).
- **Todo** selector CSS bajo `#bd-{slug} …`.
- JS: `document.getElementById("bd-{slug}")` y salir si no existe.
- Tokens del design system se **embeben** en la sección 0 del CSS (Oxygen no importa archivos del repo). Overrides locales van en el mismo bloque root, **después** de los tokens globales.

## Secciones numeradas

Comentarios alineados en los 3 archivos:

```
<!-- --- SECCIÓN N: NOMBRE --- -->
/* --- SECCIÓN N: NOMBRE --- */
/* --- SECCIÓN N: NOMBRE --- */
```

Sección 0 del markup = config `window.BD_LANDING` (botones, WhatsApp, branches, etc.).

## PHP

- Solo en `markup.php`, mezclado con HTML cuando haga falta (no es obligatorio).
- Nunca PHP en CSS/JS.
- Asumir entorno WordPress/Oxygen si se usa PHP (`get_template_directory_uri`, etc. solo si el brief lo pide).

## Tipografía

Cargar Google Fonts (o equivalente del DS) en el markup antes del root:

- Display: Bebas Neue
- Body: Hanken Grotesk

## Referencia de código

Implementación canónica: [`landings/smash-burger-mex/oxygen/`](../landings/smash-burger-mex/oxygen/).
