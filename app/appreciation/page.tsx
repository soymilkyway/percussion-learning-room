import type { Metadata } from "next";
import { LazyYouTubeEmbed } from "../components/LazyYouTubeEmbed";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = { title: "音樂賞析" };

// 新增曲目：複製任一首 song，修改 title、subtitle、credit、description 與 youtubeUrl。
// subtitle 是顯示在原文曲名下方的中文名稱；沒有副標題時可留空字串。
// 播放器會自行從一般 YouTube 或 youtu.be 網址取得影片 ID。
const categories = [
  {
    id: "classics",
    label: "管樂經典曲目",
    en: "Concert Band Classics",
    intro: "這些曲子在管樂的圈子裡可謂無人不知無人不曉的存在。經典曲目實在是太多很難選XD",
    songs: [
      {
        title: "Centuria",
        subtitle: "創世紀",
        credit: "作曲：James Swearingen",
        description: "經常放在各個頒獎典禮，又或是管樂團演出的第一首曲子。具有容易記住的旋律、鮮明節奏與有趣的打擊樂聲部，是 James Swearingen 廣受學生管樂團歡迎的代表作品之一。",
        youtubeUrl: "https://youtu.be/BWwF_QJpvH0?si=fYDCQIaRi_6_xtmK&t=14",
        sourceUrl: "https://barnhouse.com/product/012-1901-00/",
        sourceLabel: "C. L. Barnhouse 樂譜介紹",
      },
      {
        title: "たなばた",
        subtitle: "七夕",
        credit: "作曲：酒井格（Itaru Sakai）",
        description: "作品描寫被銀河分隔的織女與彥星，只能在每年七月七日相會的七夕傳說。中段的薩克斯風與上低音號獨奏象徵故事中的兩位主角，讓幻想色彩與抒情旋律交織。",
        youtubeUrl: "https://youtu.be/m1Xk9z7Ihoo?si=GkvlHfcDDKE7evIv&t=8",
        sourceUrl: "https://www.brain-shop.net/shop/g/gDHP0920450-010/?ismodesmartphone=on",
        sourceLabel: "Brain Music 樂譜介紹",
      },
    ],
  },
  {
    id: "marches",
    label: "行進曲",
    en: "Marches",
    intro: "源於軍隊，具有強烈且規律的節奏，讓聽的人也不自覺地想跨出腳步。",
    songs: [
      {
        title: "Stars and Stripes Forever",
        subtitle: "星條旗永不落",
        credit: "作曲：John Philip Sousa",
        description: "美國最廣為人知的行進曲之一，1987 年更由美國國會正式定為美國國家行進曲。中段著名的短笛對位旋律極具辨識度，是管樂團表演的經典片段",
        youtubeUrl: "https://www.youtube.com/watch?v=i9o6412lwGA",
        sourceUrl: "https://www.loc.gov/collections/patriotic-melodies/articles-and-essays/stars-and-stripes-forever/",
        sourceLabel: "美國國會圖書館",
      },
      {
        title: "マーチ《プロヴァンスの風》",
        subtitle: "普羅旺斯之風",
        credit: "作曲：田坂直樹",
        description: "2015 年全日本吹奏樂大賽課題曲。作曲者以風的旅程為構想：從帶有西班牙色彩的段落出發，在中段抵達溫暖抒情的普羅旺斯，最後再回到充滿活力的音樂。",
        youtubeUrl: "https://youtu.be/rBME62reb5Y?si=XEBa4EBWOHgfq3Vg&t=22",
        sourceUrl: "https://ndlsearch.ndl.go.jp/books/R100000002-I034019127",
        sourceLabel: "日本國立國會圖書館",
      },
    ],
  },
  {
    id: "screen",
    label: "電影動畫與遊戲改編",
    en: "Film, Animation & Games",
    intro: "除了經典曲子之外，電影及動畫配樂也是管樂經常演出的曲目；當然，遊戲音樂也是不可少的。",
    songs: [
      {
        title: "The Lion King",
        subtitle: "獅子王",
        credit: "原曲：Hans Zimmer、Elton John｜編曲：John Higgins",
        description: "將《獅子王》的電影音樂與歌曲重新放進管樂團的音色中。Hans Zimmer 的配樂、Elton John 的歌曲旋律，透過木管、銅管與打擊樂呈現電影的壯闊感。",
        youtubeUrl: "https://www.youtube.com/watch?v=fPWVGZXIsY4",
        sourceUrl: "https://hans-zimmer.com/product/the-lion-king/",
        sourceLabel: "Hans Zimmer 官方作品資料",
      },
      {
        title: "竈門炭治郎のうた",
        subtitle: "竈門炭治郎之歌",
        credit: "作曲：椎名豪｜編曲：今村愛紀",
        description: "原曲是動畫《鬼滅之刃》第 19 話〈火之神〉的插曲。這個吹奏樂版本由今村愛紀編入四樂章《鬼滅之刃》交響組曲，並作為其中的第三樂章。",
        youtubeUrl: "https://youtu.be/p6V5pMCMNPk?si=edCuIHwD6S7pZSjB&t=8",
        sourceUrl: "https://www.youtube.com/watch?v=p6V5pMCMNPk",
        sourceLabel: "演出影片公開說明",
      },
      {
        title: "FINAL FANTASYメドレー",
        subtitle: "FF 組曲",
        credit: "原曲作曲：植松伸夫",
        description: "大阪桐蔭吹奏樂部的版本選用 FF 最終幻想系列主題與戰鬥音樂，讓遊戲中熟悉的旋律透過完整管樂團重新展開。影片公開說明未列出此版本的編曲者。",
        youtubeUrl: "https://www.youtube.com/watch?v=S-XoFfnhAVU",
        sourceUrl: "https://www.youtube.com/watch?v=S-XoFfnhAVU",
        sourceLabel: "演出影片公開說明",
      },
      {
        title: "ポケットモンスター SV メインテーマ",
        subtitle: "寶可夢朱紫 主題曲",
        credit: "作曲者：無法找到可靠資料",
        description: "寶可夢官方將這首主題曲設計為以管樂器為核心的吹奏樂作品，並公開完整總譜、各聲部樂譜及參考演奏，讓玩家也能真正組團演奏遊戲音樂。",
        youtubeUrl: "https://youtu.be/BEtfH5P0PSk?si=UwqkNEunB-ZgXRd3&t=33",
        sourceUrl: "https://www.pokemon.co.jp/info/2022/07/220722_cm02.html",
        sourceLabel: "寶可夢官方網站",
      },
    ],
  },
  {
    id: "pop",
    label: "流行樂改編",
    en: "Pop Arrangements",
    intro: "現代流行樂當然也是常見的改編對象；熟悉的歌曲換成管樂團演奏，展現出完全不同的聲音體驗。",
    songs: [
      {
        title: "五月天 組曲",
        subtitle: "",
        credit: "詞曲：五月天阿信｜編曲：葉欣儀（Yap Sin Yee）",
        description: "由〈倔強〉、〈知足〉、〈溫柔〉與〈戀愛ing〉串成的組曲。不同速度與情緒的歌曲被重新連接，讓管樂團一次展現抒情、熱情與舞台感染力。",
        youtubeUrl: "https://www.youtube.com/watch?v=cZ2b2JjAZrY",
        sourceUrl: "https://www.ntso.gov.tw/cp.aspx?n=9500",
        sourceLabel: "國立臺灣交響樂團演出資料",
      },
      {
        title: "Mrs. GREEN APPLE メドレー",
        subtitle: "青蘋果小姐 組曲",
        credit: "作曲：大森元貴｜編曲：郷間幹男",
        description: "將 Mrs. GREEN APPLE 多首廣受歡迎的歌曲濃縮成吹奏樂組曲。",
        youtubeUrl: "https://www.youtube.com/watch?v=tp_xBhtxl-o",
        sourceUrl: "https://www.youtube.com/watch?v=tp_xBhtxl-o",
        sourceLabel: "演出影片公開說明",
      },
    ],
  },
];

export default function Appreciation() {
  return (
    <SiteShell>
      <PageIntro eyebrow="" title="音樂賞析" english="Music Appreciation">
        從你一定要知道的管樂曲，到電影、遊戲與流行音樂改編；管樂的世界可是非常大的，一起從這些作品開始聽吧！
      </PageIntro>
      <section className="content-wrap">
        <nav className="chip-nav category-nav" aria-label="音樂賞析分類">
          {categories.map((category) => <a href={`#${category.id}`} key={category.id}>{category.label}</a>)}
        </nav>
        {categories.map((category) => (
          <section className="music-group" id={category.id} key={category.id}>
            <header>
              <div><p>{category.en}</p><h2>{category.label}</h2></div>
              <p className="group-intro">{category.intro}</p>
            </header>
            <div className="music-grid">
              {category.songs.map((song) => (
                <article className="music-card" key={song.youtubeUrl}>
                  <LazyYouTubeEmbed youtubeUrl={song.youtubeUrl} title={`${song.title}${song.subtitle ? `（${song.subtitle}）` : ""}`} />
                  <div className="music-card-body">
                    <h3 className="music-title">
                      <span className="music-title-main">{song.title}</span>
                      {song.subtitle && <small className="music-title-zh">{song.subtitle}</small>}
                    </h3>
                    <p className="music-credit">{song.credit}</p>
                    <p>{song.description}</p>
                    <a className="source-link" href={song.sourceUrl} target="_blank" rel="noopener noreferrer">資料來源：{song.sourceLabel} <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
    </SiteShell>
  );
}
