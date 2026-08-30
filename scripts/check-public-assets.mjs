import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const sources = JSON.parse(readFileSync("public/images/IMAGE_SOURCES.json", "utf8"));
const pending = sources.filter((entry) => entry.publicationPending && existsSync(path.join("public/images", entry.asset)));
if (pending.length) {
  throw new Error(`Publication blocked: resolve usage permission or omit these review-only assets before uploading: ${pending.map((entry) => entry.asset).join(", ")}`);
}
console.log("No review-only image files are included in this publication.");
