import { SiteShell } from "./components/SiteShell";
import { homeLessons } from "./data/site";
import { pageUrl } from "./lib/site-url";

// Each row is [Chinese name, English name, abbreviation]. Leave unavailable abbreviations empty.
const percussionGlossary = [
  { id: "drums", title: "鼓類", rows: [
    ["小鼓", "Snare Drum", "S.D."],
    ["大鼓", "Bass Drum", "B.D."],
    ["筒鼓", "Tom-tom", "Tom"],
    ["邦哥鼓", "Bongo", ""],
    ["康加鼓", "Conga", ""],
    ["定音鼓", "Timpani", "Timp."],
    ["爵士鼓/鼓組", "Drumset / Drums", ""],
  ] },
  { id: "cymbals", title: "鈸與鑼類", rows: [
    ["手鈸／雙鈸", "Crash Cymbals", "Cr. Cyms."],
    ["吊鈸", "Suspended Cymbal", "Sus. Cym."],
    ["鑼", "Tam-tam / Gong", ""],
  ] },
  { id: "mallets", title: "琴類", rows: [
    ["高音木琴", "Xylophone", "Xylo."],
    ["馬林巴木琴", "Marimba", ""],
    ["鐵琴／顫音琴", "Vibraphone", "Vib."],
    ["鐘琴", "Glockenspiel / Bells", "Glock."],
    ["管鐘", "Chimes", ""],
  ] },
  { id: "accessories", title: "小樂器", rows: [
    ["鈴鼓", "Tambourine", "Tamb."],
    ["三角鐵", "Triangle", "Tri."],
    ["風鈴", "Wind Chime", "W. Chime"],
    ["樹鈴", "Bell Tree", ""],
    ["木魚", "Wood Block", "W.B."],
    ["牛鈴", "Cowbell", ""],
    ["沙鈴", "Shaker", ""],
    ["沙槌", "Maracas", ""],
    ["卡巴薩", "Cabasa", ""],
    ["響棒", "Claves", "Clv."],
    ["響板", "Castanets", "Cast."],
    ["拍板", "Whip", ""],
    ["震盪器", "Vibra-slap", ""],
    ["阿哥哥鈴", "Agogo Bells", "Agogo"],
  ] },
] as const;

export default function Home() {
  return (
    <SiteShell>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">PERCUSSION STARTER</p>
          <h1>給剛加入打擊的你</h1>
          <p className="lead">有事沒事可以點進來了解看看<br />帶你一步步認識管樂打擊<br /><span className="hero-glossary-hint">⨳這個頁面下方有樂器中英文對照，方便你記得樂器名!</span></p>
          <div className="hero-actions">
            <a className="button primary" href={pageUrl("/basics")} target="_top">從基本功開始 <span aria-hidden="true">→</span></a>
            <a className="button quiet" href={pageUrl("/instruments")} target="_top">先認識樂器</a>
          </div>
          <ul className="hero-tags" aria-label="網站特色">
            <li>零基礎友善</li><li>手機快速查閱</li><li>課後也能複習</li>
          </ul>
        </div>
      </section>

      <section className="home-section" aria-labelledby="course-map">
        <div className="section-heading">
          <div><h2 id="course-map">挑選你想深入了解的單元</h2></div>
        </div>
        <div className="lesson-grid">
          {homeLessons.map((lesson) => (
            <a href={pageUrl(lesson.href)} target="_top" className="lesson-card" key={lesson.href}>
              <h3>{lesson.title}</h3><p className="english">{lesson.en}</p>
              <p>{lesson.text}</p><span className="card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section percussion-terms-section" aria-labelledby="percussion-terms-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PERCUSSION GLOSSARY</p>
            <h2 id="percussion-terms-title">打擊樂器中英文與縮寫對照表</h2>
          </div>
          <p>中英文名稱放在同一列，右側查閱縮寫。樂譜上的寫法可能因出版社或作曲家而不同；「—」表示此處未提供縮寫。</p>
        </div>
        <div className="glossary-grid">
          {percussionGlossary.map((group) => (
            <details className="glossary-group" key={group.id}>
              <summary>{group.title}<span aria-hidden="true">＋</span></summary>
              <table className="percussion-terms-table">
                <caption className="sr-only">{group.title}中英文與縮寫</caption>
                <colgroup><col /><col className="glossary-abbreviation-column" /></colgroup>
                <thead><tr><th scope="col">樂器名稱<span className="glossary-heading-hint">中／英文</span></th><th scope="col">縮寫</th></tr></thead>
                <tbody>
                  {group.rows.map(([name, english, abbreviation]) => (
                    <tr key={name}>
                      <th scope="row"><span className="glossary-name">{name}</span><span className="glossary-english" lang="en">{english}</span></th>
                      <td>{abbreviation ? <span className="glossary-abbreviation">{abbreviation}</span> : <span className="glossary-unavailable" aria-label="未提供縮寫">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
