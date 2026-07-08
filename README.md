# Figma Extractor

Extrae *toda* la información posible de un proyecto de Figma vía REST API y la transforma en un **design system** portable + un **contexto de diseño** que sirve de guía para generar landings (etapa posterior, a partir de un wireframe Mermaid).

## Qué produce

```
output/
  raw/
    file.json                 # árbol completo del archivo (auditable)
    variables.json            # solo si el plan es Enterprise
  design-system/
    design-tokens.json        # W3C DTCG: color, typography, spacing, shadow, radius
    tokens.css                # CSS custom properties (+ dark mode si hay modes)
    component-catalog.json     # componentes normalizados por página
  assets/
    components/*.svg *.png     # render de cada componente / set
    icons/*.svg               # iconos detectados
    screens/*.png             # frames de primer nivel (landings existentes)
  design-context.json         # bundle consolidado para el generador de landings
  manifest.json               # índice + counts + flags (variablesApiUsed)
```

## Uso

1. Requisitos: Node ≥ 20.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura credenciales:
   ```bash
   cp .env.example .env
   # edita .env y rellena FIGMA_TOKEN y FIGMA_FILE_KEY
   ```
   - **FIGMA_TOKEN**: Personal Access Token (https://www.figma.com/developers/api#access-tokens).
     Scopes: `file_content:read`, `file_variables:read` (si Enterprise), `file_dev_resources:read`.
   - **FIGMA_FILE_KEY**: de la URL `figma.com/design/<FILE_KEY>/...`.
4. Ejecuta:
   ```bash
   npm run extract
   ```

### Flags

- `--no-assets` — omite el render/descarga de imágenes (mucho más rápido).
- `--raw-only` — solo descarga `output/raw/file.json` y sale (útil para inspeccionar).
- `--file-key=<KEY>` — sobreescribe el file key del `.env`.

## Estrategia de tokens

El plan de Figma determina la fuente de los tokens:

- **Enterprise** → usa la **Variables API** (`/variables/local`): tokens reales con modes (light/dark) y alias resueltos.
- **Pro / Org / desconocido** → cae automáticamente a los **Styles** del archivo (colores, tipografías, efectos) resueltos recorriendo el árbol de nodos.

El campo `variablesApiUsed` en `manifest.json` indica qué fuente se usó. El pipeline nunca falla por falta de acceso a Variables.

## Cómo encaja en el pipeline de landings

`design-context.json` es el artefacto puente: contiene paleta, tipografía, escalas, sombras, el inventario de componentes (con ruta a su render) y las pantallas existentes. La siguiente etapa lo inyecta como *guía de diseño obligatoria* junto al wireframe Mermaid para generar landings coherentes con el sitio actual.
