# Contrato de readiness (`/crear-landing`)

Antes de escribir código, el agente **debe** validar esto. Si falla, se detiene y lista qué falta.

## Gates que bloquean (hard fail)

1. Existe `landings/{slug}/`.
2. Existen `README.md`, `wireframe.md`, `copy.md`, `assets.md`.
3. Ninguno de `README.md`, `wireframe.md`, `copy.md` contiene la cadena `BD_DEMO`.
4. `wireframe.md` y `copy.md` tienen contenido real (no vacíos): al menos secciones nombradas y textos utilizables.
5. `README.md` declara `slug` y `goal`.

## Gates suaves (no bloquean)

### Assets

Si faltan imágenes o video declarados en `assets.md`:

1. Preferir un asset de [`shared/assets/`](../shared/assets/) (logos, iconos genéricos).
2. Si no hay match, usar **placeholder** (bloque CSS / SVG data-URI / color sólido) y dejar nota en el markup (`<!-- placeholder: hero -->`).
3. Documentar en el resumen final qué slots quedaron como placeholder.

**No abortar** por assets faltantes.

### overrides.md

Si no existe o está vacío → usar solo tokens globales. Si existe y no tiene `BD_DEMO`, aplicar solo overrides listados ahí.

## Mensaje de abort

Formato obligatorio:

```
No puedo crear la landing `{slug}`. Falta:

- [ ] landings/{slug}/ no existe → corre /nueva-landing
- [ ] wireframe.md aún tiene BD_DEMO → reemplaza el demo
- [ ] copy.md vacío o demo → …
```
