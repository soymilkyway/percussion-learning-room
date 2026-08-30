// Full-page links avoid the deployed vinext navigation failure.
import { siteNavigation } from "../data/site";
import { pageUrl } from "../lib/site-url";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">跳至主要內容</a>
      <header className="site-header">
        <a href={pageUrl("/")} target="_top" className="brand" aria-label="打擊樂器學習室首頁">
          <span className="brand-mark" aria-hidden="true">●</span>
          <span>打擊樂器<br /><small>學習室</small></span>
        </a>
        <nav className="desktop-nav" aria-label="主要導覽">
          {siteNavigation.map((item) => <a href={pageUrl(item.href)} target="_top" key={item.href}>{item.label}</a>)}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="開啟網站選單"><span>選單</span><span className="menu-symbol" aria-hidden="true">＋</span></summary>
          <nav aria-label="行動版主要導覽">
            {siteNavigation.map((item) => <a href={pageUrl(item.href)} target="_top" key={item.href}>{item.label}<span aria-hidden="true">→</span></a>)}
          </nav>
        </details>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="footer-brand"><span className="brand-mark" aria-hidden="true">●</span><strong>打擊樂器學習室</strong></div>
        <div className="footer-meta">
          <p>本網站僅供教學用途，非用於商業上之行為</p>
          <p className="footer-contact">製作者 / 問題回報：Boichen · <a href="https://www.instagram.com/boichen0731/" target="_blank" rel="noreferrer">Instagram</a></p>
        </div>
        <a href="#main">回到頁首 <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  );
}
