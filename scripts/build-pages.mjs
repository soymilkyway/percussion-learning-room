import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";

const basePath = process.env.PAGES_BASE_PATH ?? "/percussion-learning-room";
if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) throw new Error("Invalid PAGES_BASE_PATH");
const origin = new URL(process.env.PAGES_ORIGIN ?? "https://soymilkyway.github.io").origin;
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build", "--webpack"], {
  stdio: "inherit",
  env: { ...process.env, BUILD_TARGET: "github-pages", NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_ORIGIN: origin, NEXT_TELEMETRY_DISABLED: "1" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
if (!existsSync("out/index.html")) throw new Error("Static export is missing index.html");
writeFileSync("out/.nojekyll", "");
