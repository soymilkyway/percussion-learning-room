/* eslint-disable @next/next/no-img-element -- local educational instrument photos */
import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { instrumentGroups } from "../data/instruments";
import { siteUrl } from "../lib/site-url";

export const metadata: Metadata = { title: "樂器介紹" };
const cutoutImages = new Set(["vibraslap", "slapstick", "flexatone", "agogo-bells", "timbales", "crotales", "finger-cymbals", "sleigh-bells"]);

export default function Instruments() {
  return (
    <SiteShell>
      <PageIntro eyebrow="" title="打擊樂器介紹" english="Percussion Instruments">
        打擊樂器的種類非常多🥁🪘🪇🎹<br />各式各樣你可能見過但或許不熟悉的都在這！<br />這邊會列舉管樂團中常見的一些打擊樂器給你認識
      </PageIntro>
      <section className="content-wrap">
        <nav className="chip-nav category-nav" aria-label="樂器分類">
          {instrumentGroups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.label}</a>)}
        </nav>
        {instrumentGroups.map((group) => (
          <section className="instrument-group" id={group.id} key={group.id}>
            <header>
              <div><p>{group.en}</p><h2>{group.label}</h2></div>
              <p className="group-intro">{group.intro}</p>
            </header>
            <div className="instrument-grid">
              {group.items.map((item) => (
                <article className="instrument-card" id={item.id ?? item.image} key={item.name}>
                  {item.image && <img className={`instrument-card-image instrument-image-${item.image}`} src={siteUrl(`/images/instruments/${cutoutImages.has(item.image) ? "cutouts" : "review"}/${item.image === "vibraslap" ? "vibraslap-side" : item.image}.webp`)} alt="" aria-hidden="true" />}
                  <div className="instrument-icon" aria-hidden="true">{group.icon}</div>
                  <div className="instrument-card-name"><h3>{item.name}</h3><p className="english">{item.en}</p></div>
                  <dl>
                    {item.soundUrl && (
                      <div className="video-link-row">
                        <dt>聲音示範</dt>
                        <dd><a href={item.soundUrl} target="_blank" rel="noopener noreferrer">{item.soundLabel ?? `觀看${item.name}聲音示範`} <span aria-hidden="true">↗</span></a></dd>
                      </div>
                    )}
                    {item.note && <div><dt>注意</dt><dd>{item.note}</dd></div>}
                  </dl>
                </article>
              ))}
              {group.items.length === 0 && (
                <div className="empty-instrument-state">
                  <span aria-hidden="true">?</span>
                  <h3>更多特殊樂器即將加入</h3>
                  <p>這個分類已經準備好，之後可以直接在樂器資料檔新增名稱、圖片與聲音示範。</p>
                </div>
              )}
            </div>
          </section>
        ))}
        <p className="image-credits">本頁圖片來源與素材說明收錄於 <a href={siteUrl("/images/IMAGE_SOURCES.json")} target="_blank" rel="noopener noreferrer">圖片來源清單 ↗</a>。</p>
      </section>
    </SiteShell>
  );
}
