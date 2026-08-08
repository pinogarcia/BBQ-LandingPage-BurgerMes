# Design system Bodecatta

Fuente de verdad del branding compartido por **todas** las landings.

| Archivo | Contenido |
|---------|-----------|
| [`tokens.css`](tokens.css) | Variables CSS canónicas |
| [`colors.md`](colors.md) | Paleta y uso |
| [`typography.md`](typography.md) | Fuentes y jerarquía |
| [`components.md`](components.md) | Patrones UI (btn, wrap, eyebrow…) |
| [`motion.md`](motion.md) | Reveal y micro-interacciones |
| [`figma.md`](figma.md) | Conexión con Figma + extractor |

## Regla de oro

- **Global:** solo se cambia aquí (decisión de marca / PR).
- **Por landing:** overrides locales en el root `#bd-{slug}` tras embeber estos tokens. Nunca editar `tokens.css` desde `/crear-landing`.

Al generar código Oxygen, los tokens se **copian** dentro del CSS scoped (Oxygen no puede `@import` este archivo del repo).
