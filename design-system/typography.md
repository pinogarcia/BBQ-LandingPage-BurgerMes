# Tipografía

| Rol | Familia | Token | Uso |
|-----|---------|-------|-----|
| Display | **Bebas Neue** (fallback Anton) | `--font-display` | Títulos, precios grandes, section titles |
| Body | **Hanken Grotesk** (300–800) | `--font-body` | Párrafos, UI, botones, FAQ |

## Carga (Oxygen markup)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

## Jerarquía típica

- Hero title: display, uppercase, `clamp(58px, 9vw, 118px)`, letter-spacing ~2px, line-height ~0.9
- Section title: display, `clamp(38px, 6vw, 68px)`
- Eyebrow: body bold, uppercase, letter-spacing 3px, 13px, color accent
- Body / hook: 16–22px, `--text-muted`
- Button: body 700, ~17px

Display siempre en mayúsculas para títulos de marca.
