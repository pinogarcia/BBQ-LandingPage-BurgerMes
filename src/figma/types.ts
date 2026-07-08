/**
 * Tipos (parciales) de la Figma REST API.
 * Solo cubrimos los campos que consumimos; el resto se deja abierto con `unknown`.
 * Docs: https://www.figma.com/developers/api
 */

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Paint {
  type: string; // SOLID | GRADIENT_* | IMAGE ...
  visible?: boolean;
  opacity?: number;
  color?: RGBA;
  gradientStops?: { position: number; color: RGBA }[];
  [k: string]: unknown;
}

export interface TypeStyle {
  fontFamily?: string;
  fontPostScriptName?: string | null;
  fontWeight?: number;
  fontSize?: number;
  lineHeightPx?: number;
  lineHeightPercent?: number;
  lineHeightUnit?: string;
  letterSpacing?: number;
  textCase?: string;
  textDecoration?: string;
  [k: string]: unknown;
}

export interface Effect {
  type: string; // DROP_SHADOW | INNER_SHADOW | LAYER_BLUR | BACKGROUND_BLUR
  visible?: boolean;
  radius?: number;
  color?: RGBA;
  offset?: { x: number; y: number };
  spread?: number;
  [k: string]: unknown;
}

export interface Node {
  id: string;
  name: string;
  type: string; // DOCUMENT | CANVAS | FRAME | COMPONENT | COMPONENT_SET | INSTANCE | TEXT | VECTOR ...
  visible?: boolean;
  children?: Node[];

  // Layout / auto-layout
  layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
  itemSpacing?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;

  // Visual
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  effects?: Effect[];
  cornerRadius?: number;
  rectangleCornerRadii?: [number, number, number, number];
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number } | null;

  // Text
  characters?: string;
  style?: TypeStyle;

  // Referencias a estilos aplicados: { fill?: styleId, text?: styleId, effect?: styleId, ... }
  styles?: Record<string, string>;

  // Component metadata
  componentId?: string;
  componentPropertyDefinitions?: Record<string, ComponentPropertyDefinition>;

  [k: string]: unknown;
}

export interface ComponentPropertyDefinition {
  type: string; // BOOLEAN | TEXT | INSTANCE_SWAP | VARIANT
  defaultValue?: unknown;
  variantOptions?: string[];
  [k: string]: unknown;
}

/** Entrada del map `styles` que devuelve GET /files/:key */
export interface StyleMapEntry {
  key: string;
  name: string;
  styleType: "FILL" | "TEXT" | "EFFECT" | "GRID";
  description?: string;
  remote?: boolean;
}

export interface FileResponse {
  name: string;
  lastModified: string;
  version: string;
  document: Node;
  components: Record<string, ComponentMeta>;
  componentSets: Record<string, ComponentSetMeta>;
  styles: Record<string, StyleMapEntry>;
  [k: string]: unknown;
}

export interface ComponentMeta {
  key: string;
  name: string;
  description?: string;
  componentSetId?: string;
  documentationLinks?: { uri: string }[];
  [k: string]: unknown;
}

export interface ComponentSetMeta {
  key: string;
  name: string;
  description?: string;
  [k: string]: unknown;
}

/** GET /files/:key/nodes?ids= */
export interface NodesResponse {
  nodes: Record<string, { document: Node; components?: Record<string, ComponentMeta>; styles?: Record<string, StyleMapEntry> } | null>;
}

/** GET /files/:key/styles (published) */
export interface PublishedStylesResponse {
  meta: {
    styles: PublishedStyle[];
  };
}

export interface PublishedStyle {
  key: string;
  file_key: string;
  node_id: string;
  style_type: "FILL" | "TEXT" | "EFFECT" | "GRID";
  name: string;
  description?: string;
}

/** GET /files/:key/components */
export interface PublishedComponentsResponse {
  meta: { components: PublishedComponent[] };
}

export interface PublishedComponent {
  key: string;
  file_key: string;
  node_id: string;
  name: string;
  description?: string;
  containing_frame?: { name?: string; pageName?: string };
}

/** GET /files/:key/component_sets */
export interface PublishedComponentSetsResponse {
  meta: { component_sets: PublishedComponentSet[] };
}

export interface PublishedComponentSet {
  key: string;
  file_key: string;
  node_id: string;
  name: string;
  description?: string;
}

/** GET /files/:key/variables/local (Enterprise) */
export interface VariablesResponse {
  meta: {
    variables: Record<string, Variable>;
    variableCollections: Record<string, VariableCollection>;
  };
}

export interface VariableCollection {
  id: string;
  name: string;
  modes: { modeId: string; name: string }[];
  defaultModeId: string;
  variableIds: string[];
}

export interface Variable {
  id: string;
  name: string;
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  variableCollectionId: string;
  valuesByMode: Record<string, VariableValue>;
  description?: string;
  scopes?: string[];
}

export type VariableValue =
  | number
  | string
  | boolean
  | RGBA
  | { type: "VARIABLE_ALIAS"; id: string };

/** GET /images/:key */
export interface ImagesResponse {
  err: string | null;
  images: Record<string, string | null>;
}
