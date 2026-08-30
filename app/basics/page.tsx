/* eslint-disable @next/next/no-img-element -- local reference-based teaching illustrations */
import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { siteUrl } from "../lib/site-url";

export const metadata: Metadata = { title: "演奏基本功" };

const grips = [
  { id: "german", name: "德式握法", en: "German Grip", cue: "掌心向下，兩支鼓棒形成約 90°", description: "手背朝上、掌心向下，兩支鼓棒的尖端不會碰到，以手腕帶動鼓棒來打擊。" },
  { id: "french", name: "法式握法", en: "French Grip", cue: "掌心左右相對，兩支鼓棒平行", description: "雙手拇指較朝上，掌心彼此相對；鼓棒保持平行且尖端不碰觸，手指較容易參與細緻控制。" },
  { id: "american", name: "美式握法", en: "American Grip", cue: "掌心向下，鼓棒尖端夾角約 45°", description: "掌心朝下但角度比德式自然收窄，兩支鼓棒向內延伸並保留距離。手腕與手指都能自然參與。" },
] as const;

function GripDiagram({ variant, label }: { variant: string; label: string }) {
  return (
    <div className={`grip-diagram grip-${variant}`}>
      <img src={siteUrl(`/images/grips/${variant === "american" ? "american-with-stand" : variant}.webp`)} alt={`${label}：依參考照片重繪的斜上方視角，雙手握住鼓棒，棒尖彼此分開`} width="1200" height="800" />
    </div>
  );
}

export default function Basics() {
  return (
    <SiteShell>
      <PageIntro eyebrow="STICK CONTROL" title="演奏基本功" english="Playing Basics">
        從放鬆的對稱式握法開始。德式、美式與法式不是互相排斥的規則，而是手掌角度不同的三種位置；演奏時會依樂器、速度、音色與身體狀況自然調整。
      </PageIntro>
      <section className="content-wrap grip-guide">
        <section className="matched-grip-intro" aria-labelledby="matched-grip-title">
          <div><p className="eyebrow">MATCHED GRIP</p><h2 id="matched-grip-title">對稱式鼓棒握法</h2></div>
          <p>左右手以相同方式握棒。先找到拇指與食指附近能讓鼓棒自然轉動的支點，其餘手指輕貼鼓棒，不要把回彈捏住。</p>
        </section>
        <div className="grip-grid">
          {grips.map((grip) => (
            <article className="grip-card" key={grip.id}>
              <GripDiagram variant={grip.id} label={grip.name} />
              <p className="english">{grip.en}</p>
              <h2>{grip.name}</h2>
              <strong>{grip.cue}</strong>
              <p>{grip.description}</p>
            </article>
          ))}
        </div>
        <aside className="grip-reminder"><strong>握法提醒</strong><p>鼓棒握法只是協助一開始學習握棒的方式，習慣之後自己可以根據舒服的角度握鼓棒</p></aside>
        <section className="notation-placeholder" aria-labelledby="notation-placeholder-title">
          <div className="notation-placeholder-heading">
            <span className="notation-placeholder-icon" aria-hidden="true">♪</span>
            <div>
              <p className="eyebrow">COMING SOON</p>
              <h2 id="notation-placeholder-title">常見樂譜記號</h2>
              <p>認識譜面上常見的速度、強弱、拍號與演奏記號。</p>
            </div>
          </div>
          <div className="notation-placeholder-status">
            <strong>內容整理中／施工中</strong>
            <p>這是預計新增的學習單元，目前尚未開放；網站其他內容仍可正常使用。</p>
          </div>
        </section>
        <section className="grip-sources" aria-labelledby="grip-sources-title">
          <h2 id="grip-sources-title">參考資料</h2>
          <a href="https://jeremydrums.pixnet.net/blog/posts/5053459908" target="_blank" rel="noopener noreferrer">Jeremy Drums：鼓棒握法文章 ↗</a>
          <a href="https://www.drumeo.com/beat/how-to-hold-drumsticks/" target="_blank" rel="noopener noreferrer">Drumeo：三種對稱式握法說明 ↗</a>
          <a href="https://ae.vicfirth.com/wp-content/uploads/Lesson-32.pdf" target="_blank" rel="noopener noreferrer">Vic Firth：鼓棒與握法術語資料 ↗</a>
        </section>
      </section>
    </SiteShell>
  );
}
