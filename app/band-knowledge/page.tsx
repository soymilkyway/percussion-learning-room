/* eslint-disable @next/next/no-img-element -- locally stored Wikimedia educational images */
import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { siteUrl } from "../lib/site-url";

export const metadata: Metadata = { title: "管樂團知識" };

const families = [
  {
    id: "woodwinds",
    label: "木管樂器",
    en: "Woodwinds",
    description: "通常位在指揮前方、樂團內圈；各種音色彼此交織，常負責旋律、快速音群與細膩色彩。",
    instruments: [
      { name: "短笛", en: "Piccolo", image: "piccolo" },
      { name: "長笛", en: "Flute", image: "flute" },
      { name: "豎笛", en: "Clarinet", image: "clarinet" },
      { name: "低音豎笛", en: "Bass Clarinet", image: "bass-clarinet" },
      { name: "雙簧管", en: "Oboe", image: "oboe" },
      { name: "薩克斯風", en: "Saxophone", detail: "圖片為 Alto；家族包含 Soprano／Alto／Tenor／Baritone", image: "saxophone" },
      { name: "低音管", en: "Bassoon", image: "bassoon" },
      { name: "低音提琴", en: "Double Bass", detail: "樂團用來增厚低音或是有樂曲特別需要才會出現", image: "double-bass" },
    ],
  },
  {
    id: "brass",
    label: "銅管樂器",
    en: "Brass",
    description: "多半配置在木管後方，以明亮、有力量的聲音支撐和聲、節奏與樂曲高潮。",
    instruments: [
      { name: "小號", en: "Trumpet", image: "trumpet" },
      { name: "長號", en: "Trombone", image: "trombone" },
      { name: "法國號", en: "Horn", image: "horn" },
      { name: "上低音號", en: "Euphonium", image: "euphonium" },
      { name: "低音號", en: "Tuba", image: "tuba" },
    ],
  },
  {
    id: "percussion",
    label: "打擊樂器",
    en: "Percussion",
    description: "通常位於樂團最外側或舞台後方；除了維持節奏，也負責重音、音色變化與戲劇效果。",
    instruments: [
      { name: "鼓類", en: "Drums", detail: "以小鼓為例", image: "snare", imageGroup: "percussion" },
      { name: "鈸類", en: "Cymbals", detail: "以雙鈸為例", image: "crash-cymbals", imageGroup: "percussion" },
      { name: "琴類", en: "Mallet Percussion", detail: "以木琴為例", image: "xylophone", imageGroup: "percussion" },
      { name: "小樂器", en: "Accessory Percussion", detail: "以鈴鼓為例", image: "tambourine", imageGroup: "percussion" },
    ],
  },
] as const;

const additionalInstruments = [
  { name: "鋼琴", en: "Piano", image: "piano" },
  { name: "豎琴", en: "Harp", image: "harp" },
  { name: "電貝斯", en: "Electric Bass", image: "electric-bass" },
] as const;

export default function BandKnowledge() {
  return (
    <SiteShell>
      <PageIntro eyebrow="ENSEMBLE GUIDE" title="管樂團知識" english="Concert Band Guide">
        從舞台上的座位配置開始，認識木管、銅管與打擊樂器如何組成一個管樂團。實際座位會依編制、場地與曲目調整，圖中呈現的是常見的概念配置。
      </PageIntro>
      <section className="content-wrap band-knowledge-wrap">
        <section className="ensemble-map-section" aria-labelledby="ensemble-map-title">
          <header>
            <div>
              <p className="eyebrow">SEATING MAP</p>
              <h2 id="ensemble-map-title">扇形樂團配置</h2>
            </div>
            <p>木管圍繞指揮，接著由內向外依序是木管、銅管與打擊；點選各色圓環名稱可查看該樂器家族。</p>
          </header>
          <div className="ensemble-map" aria-label="置中的120度扇形配置圖，由內而外為木管、銅管、打擊樂器">
            <div className="ensemble-arcs">
              <div className="ensemble-rings" aria-hidden="true">
                <span className="ensemble-zone percussion-zone" />
                <span className="ensemble-zone brass-zone" />
                <span className="ensemble-zone woodwind-zone" />
              </div>
              <a className="zone-name woodwind-label" href="#woodwinds"><b>木管</b><small>Woodwinds</small></a>
              <a className="zone-name brass-label" href="#brass"><b>銅管</b><small>Brass</small></a>
              <a className="zone-name percussion-label" href="#percussion"><b>打擊</b><small>Percussion</small></a>
            </div>
            <div className="conductor-position" aria-label="指揮位置"><span aria-hidden="true">◆</span> 指揮</div>
          </div>
        </section>

        <div className="band-family-list">
          {families.map((family) => (
            <section className="band-family" id={family.id} key={family.id}>
              <header>
                <div><p className="english">{family.en}</p><h2>{family.label}</h2></div>
                <p>{family.description}</p>
              </header>
              <ul className="band-instrument-grid">
                {family.instruments.map((instrument) => (
                  <li key={instrument.name}>
                    <img
                      className={`band-instrument-image band-instrument-${instrument.image}`}
                      src={siteUrl("imageGroup" in instrument && instrument.imageGroup === "percussion" ? `/images/instruments/review/${instrument.image}.webp` : `/images/band/cutouts/${instrument.image}.webp`)}
                      alt={`${instrument.name} ${instrument.en}`}
                    />
                    <div><strong>{instrument.name}</strong><span>{instrument.en}</span>{"detail" in instrument && <small>{instrument.detail}</small>}</div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="additional-band-instruments" aria-labelledby="additional-instruments-title">
          <div><p className="english">DEPENDS ON THE MUSIC</p><h2 id="additional-instruments-title">依曲目需求加入的樂器</h2></div>
          <p>根據不同樂曲的編制與音色需求，管樂團還可能加入：</p>
          <ul>{additionalInstruments.map((instrument) => (
            <li className={`additional-instrument-card additional-instrument-card-${instrument.image}`} key={instrument.name}>
              <div className="additional-instrument-visual"><img className={`additional-instrument-image additional-instrument-${instrument.image}`} src={siteUrl(`/images/band/cutouts/${instrument.image === "harp" ? "harp-color-cutout" : instrument.image === "electric-bass" ? "electric-bass-v2" : instrument.image}.webp`)} alt={`${instrument.name} ${instrument.en}`} /></div>
              <div className="additional-instrument-copy"><strong>{instrument.name}</strong><span>{instrument.en}</span></div>
            </li>
          ))}</ul>
        </section>
        <p className="image-credits">本頁管樂器與依曲目加入之樂器圖片取自 Wikimedia Commons，完整檔案與來源連結收錄於 <a href={siteUrl("/images/IMAGE_SOURCES.json")} target="_blank" rel="noreferrer">圖片來源清單 ↗</a>。</p>
      </section>
    </SiteShell>
  );
}
