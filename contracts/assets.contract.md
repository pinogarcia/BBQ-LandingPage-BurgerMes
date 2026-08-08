# Contrato de assets

## Dónde vive cada cosa

| Ubicación | Uso |
|-----------|-----|
| `shared/assets/logos/` | Logos Bodecatta reutilizables |
| `shared/assets/icons/` | Iconos de marca compartidos |
| `landings/{slug}/assets/images/` | Imágenes propias de la campaña |
| `landings/{slug}/assets/video/` | Video propio de la campaña |
| `images/` (raíz) | Raw / fuente de trabajo (no paste a Oxygen) |

## Convención en `assets.md`

Tabla por slot:

| Slot | Archivo o URL | Estado | Notas |
|------|---------------|--------|-------|
| hero | `assets/images/hero.jpg` | ready / missing / shared / placeholder | … |
| logo | `../../shared/assets/logos/Bodecatta-MedioLogo-white.png` | shared | … |

Estados:

- `ready` — archivo en la carpeta de la landing
- `shared` — se usará un global
- `missing` — aún no hay archivo; `/crear-landing` usará shared o placeholder
- `wp` — URL absoluta en WordPress Media Library

## Oxygen / WordPress

Tras subir a WP, actualizar `src` en `oxygen/markup.php` a URLs absolutas:

`https://bodecatta.com/wp-content/uploads/YYYY/MM/archivo.ext`

En `preview/` se usan paths relativos al repo (`../assets/…` o `../../shared/…`).

## Regla de build

Assets faltantes **no** detienen `/crear-landing`. Ver [`readiness.contract.md`](readiness.contract.md).
