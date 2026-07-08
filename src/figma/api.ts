import { FigmaClient } from "./client.js";
import type {
  FileResponse,
  NodesResponse,
  PublishedStylesResponse,
  PublishedComponentsResponse,
  PublishedComponentSetsResponse,
  VariablesResponse,
  ImagesResponse,
} from "./types.js";

/** Wrappers tipados de los endpoints que usamos. */
export class FigmaApi {
  constructor(
    private readonly client: FigmaClient,
    private readonly fileKey: string,
  ) {}

  file(): Promise<FileResponse> {
    return this.client.get<FileResponse>(`/v1/files/${this.fileKey}`);
  }

  /** Nodos específicos por id (en lotes). */
  nodes(ids: string[]): Promise<NodesResponse> {
    const q = encodeURIComponent(ids.join(","));
    return this.client.get<NodesResponse>(`/v1/files/${this.fileKey}/nodes?ids=${q}`);
  }

  publishedStyles(): Promise<PublishedStylesResponse> {
    return this.client.get<PublishedStylesResponse>(`/v1/files/${this.fileKey}/styles`);
  }

  publishedComponents(): Promise<PublishedComponentsResponse> {
    return this.client.get<PublishedComponentsResponse>(`/v1/files/${this.fileKey}/components`);
  }

  publishedComponentSets(): Promise<PublishedComponentSetsResponse> {
    return this.client.get<PublishedComponentSetsResponse>(`/v1/files/${this.fileKey}/component_sets`);
  }

  /** Variables locales (solo Enterprise). Puede lanzar HttpError 403/404. */
  variablesLocal(): Promise<VariablesResponse> {
    return this.client.get<VariablesResponse>(`/v1/files/${this.fileKey}/variables/local`);
  }

  /** Renderiza nodos a imágenes. Devuelve un map id → URL temporal (o null). */
  images(ids: string[], format: "png" | "svg", scale?: number): Promise<ImagesResponse> {
    const params = new URLSearchParams({ ids: ids.join(","), format });
    if (format === "png" && scale) params.set("scale", String(scale));
    if (format === "svg") params.set("svg_outline_text", "false");
    return this.client.get<ImagesResponse>(`/v1/images/${this.fileKey}?${params.toString()}`);
  }
}
