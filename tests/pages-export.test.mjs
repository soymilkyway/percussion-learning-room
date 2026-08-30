import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const out = path.resolve("out");
const base = process.env.PAGES_BASE_PATH ?? "/percussion-learning-room";
const origin = process.env.PAGES_ORIGIN ?? "https://soymilkyway.github.io";
const routes = ["", "basics", "instruments", "appreciation", "band-knowledge"];

test("Review-only brake drum photograph is not published", () => {
  const html = readFileSync(path.join(out, "instruments/index.html"), "utf8");
  assert.doesNotMatch(html, /brake-drum.webp/);
  assert.match(html, /QTrJGhEjuyo/);
  assert.equal(existsSync(path.join(out, "images/instruments/cutouts/brake-drum.webp")), false);
  assert.equal(existsSync(path.join(out, "images/instruments/review/brake-drum.webp")), false);
});

function assertLocalTarget(value, from) {
  if (!value || /^(?:https?:|data:|mailto:|#)/.test(value)) return;
  const url = new URL(value, `https://example.test${base}/${from}`);
  assert.ok(url.pathname.startsWith(`${base}/`), `Link outside project: ${value}`);
  const relative = decodeURIComponent(url.pathname.slice(base.length + 1));
  const local = path.join(out, relative);
  assert.ok(existsSync(local), `Missing exported asset/page: ${value}`);
  if (statSync(local).isDirectory()) assert.ok(existsSync(path.join(local, "index.html")), value);
}

for (const route of routes) {
  test(`GitHub Pages /${route} has content and working local links`, () => {
    const html = readFileSync(path.join(out, route, "index.html"), "utf8");
    assert.match(html, /打擊樂器學習室/);
    assert.match(html, /<h1[\s>]/);
    assert.doesNotMatch(html, /Building your site|codex-preview/);
    assert.ok(html.includes(`${origin}${base}/og-v2.png`), "Absolute social preview URL");
    for (const match of html.matchAll(/\b(?:src|href)="([^"<>]+)"/g)) {
      assertLocalTarget(match[1].replaceAll("&amp;", "&"), `${route}/`);
    }
    for (const destination of routes) {
      assert.ok(html.includes(`href="${base}/${destination ? `${destination}/` : ""}"`), `Missing nav ${destination}`);
    }
  });
}

test("Export includes real CSS/font files and bypasses Jekyll", () => {
  assert.ok(existsSync(path.join(out, ".nojekyll")));
  let count = 0;
  function scan(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (file.endsWith(".css")) {
        count++;
        const css = readFileSync(file, "utf8");
        for (const match of css.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) {
          assertLocalTarget(match[1], path.relative(out, file).replaceAll("\\", "/"));
        }
      }
    }
  }
  scan(out);
  assert.ok(count > 0);
  for (const font of ["NotoSansTC-site.woff2", "NotoSerifTC-site.woff2"]) {
    assert.ok(existsSync(path.join(out, "fonts", font)), `Missing local font ${font}`);
    const html = readFileSync(path.join(out, "index.html"), "utf8");
    assert.ok(html.includes(`${base}/fonts/${font}`), `Font URL is missing the project base path: ${font}`);
  }
});

test("GitHub Pages links back to the homepage glossary anchor", () => {
  for (const route of routes) {
    const html = readFileSync(path.join(out, route, "index.html"), "utf8");
    assert.ok(html.includes(`href="${base}/#glossary"`), `Missing glossary link on /${route}`);
  }
});

test("Glossary instrument links retain the project base path and matching anchors", () => {
  const home = readFileSync(path.join(out, "index.html"), "utf8");
  const instruments = readFileSync(path.join(out, "instruments/index.html"), "utf8");
  for (const anchor of ["snare-drum", "timbales", "tubular-bells", "crotales", "finger-cymbals", "sleigh-bells"]) {
    assert.ok(home.includes(`href="${base}/instruments/#${anchor}"`), `Missing glossary link ${anchor}`);
    assert.ok(instruments.includes(`id="${anchor}"`), `Missing instrument anchor ${anchor}`);
  }
  assert.doesNotMatch(home, /href="[^"]*#bell-tree"/);
});
