/** Representación intermedia normalizada, independiente de la fuente (Variables API o Styles). */

export interface ColorToken {
  name: string; // ej. "Colors/Brand/Primary"
  hex: string;
  css: string; // rgba(...)
  /** modo → hex, cuando viene de Variables con múltiples modes (light/dark). */
  modes?: Record<string, string>;
}

export interface TypographyToken {
  name: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number | string;
  letterSpacing?: number;
  textCase?: string;
}

export interface ShadowToken {
  name: string;
  type: "drop-shadow" | "inner-shadow" | "blur";
  css: string; // valor listo para box-shadow / filter
}

export interface ScaleToken {
  name: string; // ej. "spacing-8"
  value: number; // px
}

export interface ComponentEntry {
  id: string;
  key?: string;
  name: string;
  description?: string;
  type: "COMPONENT" | "COMPONENT_SET";
  page?: string;
  variants?: string[]; // nombres de variantes hijas (para sets)
  properties?: string[]; // nombres de props definidas
  assets: { png?: string; svg?: string }; // rutas relativas a los renders
}

export interface ScreenEntry {
  id: string;
  name: string;
  page: string;
  width?: number;
  height?: number;
  asset?: string; // ruta al PNG
}

export interface DesignModel {
  fileName: string;
  fileKey: string;
  lastModified: string;
  variablesApiUsed: boolean;
  colors: ColorToken[];
  typography: TypographyToken[];
  shadows: ShadowToken[];
  spacing: ScaleToken[];
  radii: ScaleToken[];
  components: ComponentEntry[];
  screens: ScreenEntry[];
}
