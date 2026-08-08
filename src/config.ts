import "dotenv/config";
import { z } from "zod";

const schema = z
  .object({
    // Se acepta FIGMA_TOKEN o su alias FIGMA_API_KEY.
    FIGMA_TOKEN: z.string().min(1).optional(),
    FIGMA_API_KEY: z.string().min(1).optional(),
    FIGMA_FILE_KEY: z.string().min(1, "FIGMA_FILE_KEY es obligatorio (ver .env.example)"),
    FIGMA_PNG_SCALE: z.coerce.number().positive().default(2),
    FIGMA_CONCURRENCY: z.coerce.number().int().positive().default(3),
  })
  .refine((v) => v.FIGMA_TOKEN || v.FIGMA_API_KEY, {
    message: "Falta el token: define FIGMA_TOKEN (o FIGMA_API_KEY) en .env",
    path: ["FIGMA_TOKEN"],
  });

export interface CliFlags {
  noAssets: boolean;
  rawOnly: boolean;
  fileKeyOverride?: string;
}

export function parseFlags(argv: string[]): CliFlags {
  const flags: CliFlags = { noAssets: false, rawOnly: false };
  for (const arg of argv) {
    if (arg === "--no-assets") flags.noAssets = true;
    else if (arg === "--raw-only") flags.rawOnly = true;
    else if (arg.startsWith("--file-key=")) flags.fileKeyOverride = arg.split("=")[1];
  }
  return flags;
}

export function loadConfig(flags: CliFlags) {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `  - ${i.message}`).join("\n");
    throw new Error(`Configuración inválida:\n${msg}\n\nCopia .env.example a .env y rellena los valores.`);
  }
  const env = parsed.data;
  return {
    token: (env.FIGMA_TOKEN ?? env.FIGMA_API_KEY)!,
    fileKey: flags.fileKeyOverride ?? env.FIGMA_FILE_KEY,
    pngScale: env.FIGMA_PNG_SCALE,
    concurrency: env.FIGMA_CONCURRENCY,
  };
}

export type Config = ReturnType<typeof loadConfig>;
