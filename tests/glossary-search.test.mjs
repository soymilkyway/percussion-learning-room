import assert from "node:assert/strict";
import test from "node:test";
import { percussionGlossary } from "../app/data/glossary.mjs";
import { isGlossaryEasterEggQuery, matchesGlossarySearch } from "../app/lib/glossary-search.mjs";

const entries = percussionGlossary.flatMap((group) =>
  group.rows.map(([name, english, abbreviation, anchor, externalUrl]) => ({
    group: group.title,
    name,
    english,
    abbreviation,
    anchor,
    externalUrl,
  })),
);

test("每一種樂器都能以完整中文名與英文名搜尋", () => {
  assert.equal(entries.length, 42);
  for (const entry of entries) {
    assert.ok(matchesGlossarySearch(entry, entry.name), `中文名稱找不到：${entry.name}`);
    assert.ok(matchesGlossarySearch(entry, entry.english), `英文名稱找不到：${entry.english}`);
  }
});

test("新增樂器可用中文、英文與括號內名稱搜尋，並保留 YouTube 連結", () => {
  const additions = [
    ["海浪鼓", ["海浪鼓", "Ocean Drum"], "https://www.youtube.com/shorts/3UBZo1_Ys94"],
    ["雨柱 / 雨聲器", ["雨柱", "雨聲器", "Rain Stick"], "https://www.youtube.com/shorts/XlMeOkbiFmU"],
    ["船鐘", ["船鐘", "Ship's Bell"], "https://www.youtube.com/watch?v=ZMrhMEp3i8M"],
    ["神楽鈴", ["神楽鈴", "Kagura-Suzu"], "https://www.youtube.com/watch?v=-EZ6WbisTD0"],
    ["愛爾蘭手鼓", ["愛爾蘭手鼓", "Bodhran"], "https://www.youtube.com/shorts/pRMStd4mw0U"],
    ["非洲鼓", ["非洲鼓", "Djembe"], "https://www.youtube.com/shorts/cRkr6-amhzI"],
    ["締太鼓", ["締太鼓", "Shime-daiko", "締め太鼓"], "https://www.youtube.com/shorts/fpPA9yTbvSs"],
    ["和太鼓", ["和太鼓", "Wadaiko"], "https://www.youtube.com/shorts/TZZuBJTTMPk"],
    ["鉦", ["鉦", "Atari-Gane", "当たり鉦"], "https://www.youtube.com/shorts/Zd3CQk_2mfo"],
  ];

  for (const [name, queries, externalUrl] of additions) {
    const entry = entries.find((item) => item.name === name);
    assert.ok(entry, `缺少新增樂器：${name}`);
    assert.equal(entry.externalUrl, externalUrl);
    for (const query of queries) {
      assert.ok(matchesGlossarySearch(entry, query), `搜尋不到：${name} / ${query}`);
    }
  }

  assert.equal(entries.find((entry) => entry.name === "手指鈸")?.group, "鈸與鑼類");
});

test("每一個已提供的縮寫都能忽略大小寫、句點與空白搜尋", () => {
  for (const entry of entries.filter((item) => item.abbreviation)) {
    const variants = [
      entry.abbreviation,
      entry.abbreviation.toLocaleLowerCase(),
      entry.abbreviation.replaceAll(".", ""),
      entry.abbreviation.replaceAll(" ", ""),
    ];
    for (const query of variants) {
      assert.ok(matchesGlossarySearch(entry, query), `縮寫找不到：${entry.name} / ${query}`);
    }
  }
});

test("Bells 與 Tubular Bells 能找到鐘琴和管鐘", () => {
  const bellsResults = entries.filter((entry) => matchesGlossarySearch(entry, "Bells")).map((entry) => entry.name);
  assert.ok(bellsResults.includes("鐘琴"));
  assert.ok(bellsResults.includes("管鐘"));

  const tubularResults = entries.filter((entry) => matchesGlossarySearch(entry, "Tubular Bells")).map((entry) => entry.name);
  assert.ok(tubularResults.includes("管鐘"));
});

test("常見部分字與縮寫查詢仍可正確匹配", () => {
  const search = (query) => entries.filter((entry) => matchesGlossarySearch(entry, query)).map((entry) => entry.name);
  assert.ok(search("snare").includes("小鼓"));
  assert.ok(search("SD").includes("小鼓"));
  assert.ok(search("s d").includes("小鼓"));
  assert.ok(search("timp").includes("定音鼓"));
  assert.ok(search("glock").includes("鐘琴"));
});

test("彩蛋只由完整的 R 或彩蛋關鍵字觸發", () => {
  assert.equal(isGlossaryEasterEggQuery("R"), true);
  assert.equal(isGlossaryEasterEggQuery(" r "), true);
  assert.equal(isGlossaryEasterEggQuery("彩蛋"), true);
  assert.equal(isGlossaryEasterEggQuery("rick"), false);
  assert.equal(isGlossaryEasterEggQuery("樂器彩蛋"), false);
  assert.equal(isGlossaryEasterEggQuery(""), false);
});
