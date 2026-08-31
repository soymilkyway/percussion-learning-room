import { SiteShell } from "./components/SiteShell";
import { GlossarySearch } from "./components/GlossarySearch";
import { percussionGlossary } from "./data/glossary.mjs";
import { beginnerPath } from "./data/site";
import { pageUrl } from "./lib/site-url";

export default function Home() {
  const glossaryEntries = percussionGlossary.flatMap((group) =>
    group.rows.map(([name, english, abbreviation, anchor]) => ({
      group: group.title,
      name,
      english,
      abbreviation,
      href: anchor ? pageUrl(`/instruments#${anchor}`) : undefined,
    })),
  );

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
            <a className="button quiet" href="#glossary">查樂器中英文</a>
          </div>
          <ul className="hero-tags" aria-label="網站特色">
            <li>零基礎友善</li><li>手機快速查閱</li><li>課後也能複習</li>
          </ul>
        </div>
      </section>

      <section className="home-section beginner-path-section" aria-labelledby="beginner-path-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIRST VISIT</p>
            <h2 id="beginner-path-title">第一次來的學習順序</h2>
          </div>
          <p>不知道從哪裡開始？可以照這個順序逛逛；這只是建議，不需要照進度完成。</p>
        </div>
        <ol className="beginner-path-grid">
          {beginnerPath.map((step, index) => (
            <li key={step.href}>
              <a href={pageUrl(step.href)} target="_top">
                <span className="beginner-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p className="english">{step.en}</p>
                <p>{step.text}</p>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section percussion-terms-section" id="glossary" aria-labelledby="percussion-terms-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PERCUSSION GLOSSARY</p>
            <h2 id="percussion-terms-title">樂器中英文對照表</h2>
          </div>
          <p>樂譜上的寫法可能因出版社或作曲家而不同</p>
        </div>
        <GlossarySearch entries={glossaryEntries} />
        <div className="glossary-grid">
          {percussionGlossary.map((group) => (
            <details className="glossary-group" key={group.id} suppressHydrationWarning>
              <summary>{group.title}<span aria-hidden="true">＋</span></summary>
              <table className="percussion-terms-table">
                <caption className="sr-only">{group.title}中英文與縮寫</caption>
                <colgroup><col /><col className="glossary-abbreviation-column" /></colgroup>
                <thead><tr><th scope="col">樂器名稱<span className="glossary-heading-hint">中／英文</span></th><th scope="col">縮寫</th></tr></thead>
                <tbody>
                  {group.rows.map(([name, english, abbreviation, anchor]) => (
                    <tr key={name}>
                      <th scope="row">
                        {anchor ? (
                          <a className="glossary-instrument-link" href={pageUrl(`/instruments#${anchor}`)} target="_top"><span className="glossary-name">{name}</span><span className="glossary-english" lang="en">{english}</span></a>
                        ) : (
                          <span className="glossary-instrument-name"><span className="glossary-name">{name}</span><span className="glossary-english" lang="en">{english}</span></span>
                        )}
                      </th>
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
