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
  assert.match(html, /第一次來的學習順序/);
  assert.match(html, /管樂團知識[\s\S]*樂器介紹[\s\S]*演奏基本功[\s\S]*音樂賞析/);
  assert.match(html, /樂器中英文對照表/);
  assert.match(html, /id="glossary"/);
  assert.match(html, /placeholder="例如：小鼓、snare、SD、timp"/);
  assert.match(html, /href="\/#glossary"/);
  assert.match(html, /<nav aria-label="行動版主要導覽">[\s\S]*首頁[\s\S]*樂器對照[\s\S]*管樂團知識[\s\S]*樂器介紹[\s\S]*演奏基本功[\s\S]*音樂賞析[\s\S]*<\/nav>/);
  assert.match(html, /Suspended Cymbal/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

const routes = [
  ["/basics", "對稱式鼓棒握法"],
  ["/instruments", "鼓與鈸類"],
  ["/appreciation", "管樂經典曲目"],
  ["/band-knowledge", "扇形樂團配置"],
];

test("首頁對照表以四個分類呈現完整33種樂器，中英文同列並保留縮寫與有效連結", async () => {
  const html = await (await render()).text();
  assert.equal((html.match(/class="percussion-terms-table"/g) ?? []).length, 4);
  assert.equal((html.match(/class="glossary-name"/g) ?? []).length, 33);
  assert.equal((html.match(/class="glossary-english"/g) ?? []).length, 33);
  assert.equal((html.match(/<details class="glossary-group"/g) ?? []).length, 4);
  assert.match(html, /<summary>鼓類/);
  assert.match(html, /<summary>鈸與鑼類/);
  assert.match(html, /<summary>琴類/);
  assert.match(html, /<summary>小樂器/);
  assert.doesNotMatch(html, /種樂器/);
  assert.match(html, /爵士鼓\/鼓組/);
  assert.match(html, /高音木琴/);
  assert.doesNotMatch(html, /（高音）木琴/);
  assert.match(html, /href="\/instruments#snare-drum"[^>]*><span class="glossary-name">小鼓<\/span><span class="glossary-english" lang="en">Snare Drum<\/span><\/a>/);
  assert.match(html, /手指鈸/);
  assert.match(html, /Finger Cymbals/);
  assert.match(html, /Finger Cyms/);
  assert.match(html, /雪鈴/);
  assert.match(html, /S\. Bells/);
  assert.match(html, /<span class="glossary-name">雪鈴<\/span>[\s\S]*<span class="glossary-name">響棒<\/span>/);
  assert.match(html, /<span class="glossary-name">阿哥哥鈴<\/span>[\s\S]*<span class="glossary-name">手指鈸<\/span>/);
  assert.match(html, /天巴鼓/);
  assert.match(html, /Timbales/);
  assert.match(html, /饒鈸/);
  assert.match(html, /Crotales/);
  assert.match(html, /管鐘[\s\S]*Chimes \/ Tubular Bells/);
  assert.doesNotMatch(html, /href="\/instruments#bell-tree"/);
  assert.match(html, /class="glossary-instrument-name"><span class="glossary-name">樹鈴/);
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
  assert.match(html, /Chimes \/ Tubular Bells/);
  assert.match(html, /Glockenspiel \/ Bells/);
  assert.match(html, /id="timbales"/);
  assert.match(html, /天巴鼓/);
  assert.match(html, /id="crotales"/);
  assert.match(html, /饒鈸/);
  assert.match(html, /id="finger-cymbals"/);
  assert.match(html, /手指鈸/);
  assert.ok(html.indexOf("響棒") < html.indexOf('id="finger-cymbals"'), "手指鈸應位於小型打擊樂器的最後");
  assert.ok(html.indexOf('id="finger-cymbals"') < html.indexOf('id="special"'), "手指鈸應在其他特殊打擊樂器分類之前");
  assert.match(html, /id="sleigh-bells"/);
  assert.match(html, /雪鈴/);
  for (const image of ["timbales", "crotales", "finger-cymbals", "sleigh-bells"]) {
    assert.match(html, new RegExp(`instrument-image-${image}`));
    assert.match(html, new RegExp(`images/instruments/cutouts/${image}\\.webp`));
  }
  for (const videoId of ["RJ8VkJzVisw", "l8HA4DrNlLE", "_4sWSBiajv0", "R1dMVof3OGc"]) {
    assert.match(html, new RegExp(videoId));
  }
  assert.doesNotMatch(html, /Finger Cyms|S\. Bells/);
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
  assert.match(html, /製作者 \/ 問題回報：Boichen/);
  assert.match(html, /href="https:\/\/www\.instagram\.com\/boichen0731\/"[^>]*target="_blank"[^>]*>Instagram<\/a>/);
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
  assert.match(html, /harp-user-provided\.webp/);
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

test("音樂賞析的中文曲名以獨立第二行呈現並使用更新後連結", async () => {
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
  assert.match(html, /class="music-thumbnail music-play-button"/);
  assert.match(html, /在網頁播放/);
  assert.match(html, /前往 YouTube 觀看/);
  assert.doesNotMatch(html, /<iframe/);
});
