# Workflow Oxygen

## Archivos a pegar

Desde `landings/{slug}/oxygen/`:

1. **HTML Code Block** ← `markup.php` (puede incluir PHP)
2. **CSS Code Block** ← `styles.css`
3. **JS Code Block** ← `app.js`

Orden recomendado en la página: HTML → CSS → JS (o según tu setup Oxygen; lo crítico es que el markup con el root `#bd-{slug}` esté en el DOM antes del JS).

## Config editable

En la sección 0 del markup, `window.BD_LANDING` controla:

- `waMessage`
- `logoUrl`
- `branches[]` (modal WhatsApp)
- `buttons{}` (textos / URLs)

## Media

1. Sube archivos de `assets/images/` a WP.
2. Reemplaza `src` por URLs absolutas de uploads.
3. Logos pueden reutilizarse desde media ya existente o desde `shared/assets/logos/`.

## Preview local

Abre `landings/{slug}/preview/index.html` en el navegador (paths relativos al repo). No uses preview como entrega a Oxygen.
