import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  }));
  return files.flat().filter((path) => /\.(?:mjs|ts|tsx)$/.test(path));
}

test("外部新分頁連結皆阻止 opener 存取並移除 referrer", async () => {
  for (const path of await sourceFiles("app")) {
    const source = await readFile(path, "utf8");
    for (const tag of source.match(/<a\b[\s\S]*?>/g) ?? []) {
      if (!tag.includes('target="_blank"')) continue;
      assert.match(tag, /rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/, `${path} 缺少安全 rel`);
    }
  }
});

test("使用者輸入不經由不安全 HTML API 插入頁面", async () => {
  for (const path of await sourceFiles("app")) {
    const source = await readFile(path, "utf8");
    assert.doesNotMatch(source, /dangerouslySetInnerHTML|\.innerHTML\s*=|document\.write\s*\(|\beval\s*\(/, path);
  }
});

test("YouTube iframe 僅開啟播放所需權限", async () => {
  const source = await readFile("app/components/LazyYouTubeEmbed.tsx", "utf8");
  const urlSource = await readFile("app/lib/youtube.ts", "utf8");
  assert.match(source, /allow="autoplay; encrypted-media; picture-in-picture"/);
  assert.doesNotMatch(source, /clipboard-write|web-share|gyroscope|accelerometer/);
  assert.match(urlSource, /youtube-nocookie\.com/);
});

test("純靜態網站不依賴 Cloudflare Worker 模擬套件", async () => {
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  assert.equal(packageJson.devDependencies?.["@cloudflare/vite-plugin"], undefined);
  assert.equal(packageJson.devDependencies?.wrangler, undefined);
});
