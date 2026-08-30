import assert from "node:assert/strict";
import test from "node:test";
import { percussionGlossary } from "../app/data/glossary.mjs";
import { isGlossaryEasterEggQuery, matchesGlossarySearch } from "../app/lib/glossary-search.mjs";

const entries = percussionGlossary.flatMap((group) =>
  group.rows.map(([name, english, abbreviation, anchor]) => ({
    group: group.title,
    name,
    english,
    abbreviation,
    anchor,
  })),
);

test("每一種樂器都能以完整中文名與英文名搜尋", () => {
  assert.equal(entries.length, 33);
  for (const entry of entries) {
    assert.ok(matchesGlossarySearch(entry, entry.name), `中文名稱找不到：${entry.name}`);
    assert.ok(matchesGlossarySearch(entry, entry.english), `英文名稱找不到：${entry.english}`);
  }
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
