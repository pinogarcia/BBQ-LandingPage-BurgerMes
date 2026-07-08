import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  FIGMA_TOKEN: z.string().min(1, "FIGMA_TOKEN es obligatorio (ver .env.example)"),
  FIGMA_FILE_KEY: z.string().min(1, "FIGMA_FILE_KEY es obligatorio (ver .env.example)"),
  FIGMA_PNG_SCALE: z.coerce.number().positive().default(2),
  FIGMA_CONCURRENCY: z.coerce.number().int().positive().default(3),
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
    token: env.FIGMA_TOKEN,
    fileKey: flags.fileKeyOverride ?? env.FIGMA_FILE_KEY,
    pngScale: env.FIGMA_PNG_SCALE,
    concurrency: env.FIGMA_CONCURRENCY,
  };
}

export type Config = ReturnType<typeof loadConfig>;
