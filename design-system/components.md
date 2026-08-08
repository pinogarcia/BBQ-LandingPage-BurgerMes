# Componentes / patrones

Patrones compartidos (no es un framework). Referencia visual: landing Smash.

## Layout

- `.wrap` — max-width `--maxw` (1120px), padding horizontal `--s-24`
- `section` — padding vertical `clamp(56px, 9vw, 112px)`

## Tipográficos

- `.eyebrow` — label superior accent
- `.section-title` + `.hl` — título con palabra destacada
- `.center` — alineación centrada

## Botones

- `.btn` / `.btn--primary` / `.btn--lg`
- Pill (`--r-pill`), hover lift suave + sombra accent
- En hero: un CTA principal claro (evitar clusters de pills)

## Nav

- Sticky, blur, logo ~120px, CTA compacto (oculto en mobile a favor del sticky CTA)

## Interacción

- FAQ accordion (`.faq__item` / `.faq__q` / `.faq__a`)
- Carrusel horizontal con snap (si el wireframe lo pide)
- Modal de sucursal (WhatsApp multi-branch) cuando el brief lo define
- Sticky CTA mobile

## Hero budget (branding)

Primer viewport: marca + un headline + una frase + un grupo CTA + una imagen dominante. Sin stats, schedules ni cards en el hero.
