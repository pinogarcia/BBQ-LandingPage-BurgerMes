# Motion

Intentional, no ruido. Preferir 2–3 movimientos claros.

## Reveal on scroll

- Clase `.reveal` → opacity 0 + translateY(24px)
- Al intersectar: `.in` → visible
- `prefers-reduced-motion: reduce` → sin animación

## Micro

- Botones: `translateY(-2px)` + sombra en hover (~180ms)
- Cards de contenido (fuera del hero): lift suave + borde accent
- Carrusel: scroll-smooth por card

No usar partículas, glows púrpura ni animaciones decorativas sin propósito.
