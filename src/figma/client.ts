import pLimit from "p-limit";

const BASE = "https://api.figma.com";
const MAX_RETRIES = 5;

export interface ClientOptions {
  token: string;
  concurrency: number;
}

/**
 * Cliente REST para la Figma API con:
 * - autenticación via header X-Figma-Token
 * - limitación de concurrencia (p-limit)
 * - reintentos con backoff exponencial en 429 / 5xx (respeta Retry-After)
 */
export class FigmaClient {
  private readonly token: string;
  private readonly limit: ReturnType<typeof pLimit>;

  constructor(opts: ClientOptions) {
    this.token = opts.token;
    this.limit = pLimit(opts.concurrency);
  }

  /** GET a un endpoint de la API (relativo a https://api.figma.com) devolviendo JSON tipado. */
  async get<T>(path: string): Promise<T> {
    return this.limit(() => this.request<T>(`${BASE}${path}`));
  }

  private async request<T>(url: string, attempt = 0): Promise<T> {
    let res: Response;
    try {
      res = await fetch(url, {
        headers: { "X-Figma-Token": this.token },
      });
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        await sleep(backoffMs(attempt));
        return this.request<T>(url, attempt + 1);
      }
      throw new Error(`Fallo de red en ${url}: ${(err as Error).message}`);
    }

    if (res.status === 429 || res.status >= 500) {
      if (attempt < MAX_RETRIES) {
        const retryAfter = Number(res.headers.get("retry-after"));
        const wait = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : backoffMs(attempt);
        await sleep(wait);
        return this.request<T>(url, attempt + 1);
      }
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      const err = new HttpError(res.status, `Figma API ${res.status} en ${url}: ${body.slice(0, 300)}`);
      throw err;
    }

    return (await res.json()) as T;
  }

  /** Descarga un binario (usado para las URLs S3 que devuelve la Images API). */
  async downloadBinary(url: string): Promise<Buffer> {
    return this.limit(async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Descarga fallida ${res.status}: ${url}`);
      const arr = await res.arrayBuffer();
      return Buffer.from(arr);
    });
  }
}

export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

function backoffMs(attempt: number): number {
  return Math.min(1000 * 2 ** attempt, 16000) + Math.random() * 250;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
