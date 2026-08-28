import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("首頁呈現網站名稱、主要導覽與學習路線", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>打擊樂器學習室<\/title>/);
  assert.match(html, /給剛加入打擊的你/);
  assert.match(html, /有事沒事可以點進來了解看看<br\s*\/>帶你一步步認識管樂打擊/);
  assert.match(html, /⨳這個頁面下方有樂器中英文對照，方便你記得樂器名!/);
  assert.doesNotMatch(html, /基礎樂理/);
  assert.match(html, /演奏基本功/);
  assert.match(html, /怎麼握鼓棒？姿勢長什麼樣？/);
  assert.match(html, /樂器介紹/);
  assert.match(html, /音樂賞析/);
  assert.match(html, /管樂團知識/);
  assert.match(html, /打擊樂器中英文與縮寫對照表/);
  assert.match(html, /Suspended Cymbal/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

const routes = [
  ["/basics", "對稱式鼓棒握法"],
  ["/instruments", "鼓與鈸類"],
  ["/appreciation", "管樂經典曲目"],
  ["/band-knowledge", "扇形樂團配置"],
];

test("首頁對照表以四個分類呈現完整29種樂器，中英文同列並保留縮寫", async () => {
  const html = await (await render()).text();
  assert.equal((html.match(/class="percussion-terms-table"/g) ?? []).length, 4);
  assert.equal((html.match(/class="glossary-name"/g) ?? []).length, 29);
  assert.equal((html.match(/class="glossary-english"/g) ?? []).length, 29);
  assert.equal((html.match(/<details class="glossary-group"/g) ?? []).length, 4);
  assert.match(html, /<summary>鼓類/);
  assert.match(html, /<summary>鈸與鑼類/);
  assert.match(html, /<summary>琴類/);
  assert.match(html, /<summary>小樂器/);
  assert.doesNotMatch(html, /種樂器/);
  assert.match(html, /爵士鼓\/鼓組/);
  assert.match(html, /高音木琴/);
  assert.doesNotMatch(html, /（高音）木琴/);
  assert.match(html, /<th scope="row"><span class="glossary-name">小鼓<\/span><span class="glossary-english" lang="en">Snare Drum<\/span><\/th><td><span class="glossary-abbreviation">S.D.<\/span><\/td>/);
  assert.match(html, /class="glossary-unavailable" aria-label="未提供縮寫">—/);
  assert.doesNotMatch(html, /terms-table-scroll|可左右捲動的打擊/);
});

for (const [path, expected] of routes) {
  test(`${path} 可正常呈現`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(expected));
    assert.match(html, /打擊樂器學習室/);
  });
}

test("樂器頁在同一頁提供四大分類", async () => {
  const response = await render("/instruments");
  const html = await response.text();
  assert.match(html, /id="drums"/);
  assert.match(html, /id="mallets"/);
  assert.match(html, /id="small"/);
  assert.match(html, /id="special"/);
  assert.match(html, /小鼓/);
  assert.match(html, /康加鼓/);
  assert.match(html, /邦哥鼓/);
  assert.match(html, /Tam-tam/);
  assert.match(html, /馬林巴木琴/);
  assert.match(html, /管鐘/);
  assert.match(html, /三角鐵/);
  assert.match(html, /沙槌/);
  assert.match(html, /Maracas/);
  assert.match(html, /Wind Chime/);
  assert.doesNotMatch(html, /Mark Tree/);
  assert.match(html, /卡巴薩/);
  assert.match(html, /響棒/);
  assert.match(html, /震盪器/);
  assert.match(html, /Vibraslap/);
  assert.match(html, /拍板（樂鞭）/);
  assert.match(html, /Flexatone/);
  assert.match(html, /Brake Drum/);
  assert.match(html, /Agogo Bell/);
  assert.match(html, /vibraslap-side.webp/);
  assert.doesNotMatch(html, /\/cutouts\/vibraslap.webp/);
  assert.match(html, /slapstick.webp/);
  assert.match(html, /flexatone.webp/);
  assert.doesNotMatch(html, /brake-drum.webp/);
  assert.match(html, /QTrJGhEjuyo/);
  assert.match(html, /agogo-bells.webp/);
  assert.match(html, /instrument-card-image/);
  assert.match(html, /其他特殊打擊樂器/);
  assert.match(html, /id="special"[\s\S]*刮葫/);
  assert.doesNotMatch(html, /<dt>聲音特色<\/dt>/);
  assert.match(html, /<dt>聲音示範<\/dt>/);
  assert.match(html, /Bot7XxatiBE/);
  assert.match(html, /DHYSDeKTIcB/);
  assert.match(html, /QCYZRxc1UkM/);
  assert.match(html, /bVEBHnlqJ9M/);
  assert.doesNotMatch(html, /共通原則|<dt>注意<\/dt>/);
});

test("全站頁尾顯示非商業教學用途聲明", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /本網站僅供教學用途，非用於商業上之行為/);
  assert.doesNotMatch(html, /給第一次接觸音樂的你：先聽、再數、最後演奏。/);
});

test("管樂團知識頁提供三個可點選配置區域", async () => {
  const response = await render("/band-knowledge");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /href="#woodwinds"/);
  assert.match(html, /href="#brass"/);
  assert.match(html, /href="#percussion"/);
  assert.match(html, /木管樂器/);
  assert.match(html, /銅管樂器/);
  assert.match(html, /打擊樂器/);
  assert.match(html, /短笛/);
  assert.match(html, /Bass Clarinet/);
  assert.match(html, /Soprano／Alto／Tenor／Baritone/);
  assert.match(html, /Euphonium/);
  assert.match(html, /Double Bass/);
  assert.match(html, /樂團用來增厚低音或是有樂曲特別需要才會出現/);
  assert.match(html, /harp-color-cutout\.webp/);
  assert.match(html, /Electric Bass/);
  assert.match(html, /images\/band\/cutouts\/piccolo.webp/);
  assert.match(html, /images\/band\/cutouts\/electric-bass-v2.webp/);
  assert.match(html, /圖片為 Alto/);
  assert.match(html, /class="ensemble-rings" aria-hidden="true"/);
  assert.match(html, /置中的120度扇形配置圖/);
  assert.match(html, /class="zone-name woodwind-label" href="#woodwinds"/);
  assert.match(html, /class="zone-name brass-label" href="#brass"/);
  assert.match(html, /class="zone-name percussion-label" href="#percussion"/);
  assert.match(html, /images\/instruments\/review\/crash-cymbals.webp/);
  assert.doesNotMatch(html, /seat-dots|● ●/);
});

test("演奏基本功顯示三種對稱式握法與簡易示意圖", async () => {
  const response = await render("/basics");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /德式握法/);
  assert.match(html, /美式握法/);
  assert.match(html, /法式握法/);
  assert.match(html, /grip-german/);
  assert.match(html, /grip-american/);
  assert.match(html, /grip-french/);
  for (const grip of ["german", "french"]) assert.match(html, new RegExp(`/images/grips/${grip}.webp`));
  assert.match(html, /\/images\/grips\/american-with-stand\.webp/);
  assert.doesNotMatch(html, /diagram-stick|grip-hand/);
  assert.match(html, /德式握法[\s\S]*法式握法[\s\S]*美式握法/);
  assert.match(html, /形成約 90°/);
  assert.match(html, /鼓棒尖端夾角約 45°/);
});

test("音樂賞析的中文曲名以第二行小字呈現並使用更新後連結", async () => {
  const response = await render("/appreciation");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /music-title-zh/);
  assert.match(html, />ポケットモンスター SV メインテーマ</);
  assert.match(html, />寶可夢朱紫 主題曲</);
  assert.match(
    html,
    /<span class="music-title-main">ポケットモンスター SV メインテーマ<\/span><small class="music-title-zh">寶可夢朱紫 主題曲<\/small>/,
  );
  assert.match(html, /UwqkNEunB-ZgXRd3/);
});
