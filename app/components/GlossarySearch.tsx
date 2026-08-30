"use client";

import { useMemo, useState } from "react";
import { isGlossaryEasterEggQuery, matchesGlossarySearch, normalizeGlossarySearchText } from "../lib/glossary-search.mjs";

export type GlossarySearchEntry = {
  group: string;
  name: string;
  english: string;
  abbreviation: string;
  href?: string;
};

export function GlossarySearch({ entries }: { entries: GlossarySearchEntry[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeGlossarySearchText(query);
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return entries.filter((entry) => matchesGlossarySearch(entry, normalizedQuery));
  }, [entries, normalizedQuery]);
  const showEasterEgg = isGlossaryEasterEggQuery(normalizedQuery);
  const resultCount = results.length + (showEasterEgg ? 1 : 0);

  return (
    <div className="glossary-search">
      <label htmlFor="glossary-search-input">搜尋樂器中英文或縮寫</label>
      <div className="glossary-search-field">
        <span aria-hidden="true">⌕</span>
        <input
          id="glossary-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例如：小鼓、snare、SD、timp"
          autoComplete="off"
        />
      </div>
      <p className="glossary-search-help">搜尋會忽略英文大小寫、句點與空白。</p>
      {normalizedQuery && (
        <div className="glossary-search-results" aria-live="polite">
          <p>{resultCount ? `找到 ${resultCount} 項` : "找不到符合的樂器"}</p>
          {resultCount > 0 && (
            <ul>
              {results.map((entry) => (
                <li key={`${entry.group}-${entry.name}`}>
                  <span className="glossary-result-group">{entry.group}</span>
                  {entry.href ? (
                    <a className="glossary-result-link" href={entry.href} target="_top"><strong>{entry.name}</strong><small lang="en">{entry.english}</small></a>
                  ) : (
                    <span className="glossary-result-name"><strong>{entry.name}</strong><small lang="en">{entry.english}</small></span>
                  )}
                  {entry.abbreviation && <b>{entry.abbreviation}</b>}
                </li>
              ))}
              {showEasterEgg && (
                <li>
                  <span className="glossary-result-group">隱藏樂器</span>
                  <a
                    className="glossary-result-link"
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>瑞克響鈴（絕不放棄你）</strong>
                    <small lang="en">Rick Roll Bell</small>
                  </a>
                  <b>R.</b>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
