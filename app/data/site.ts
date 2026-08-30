export const siteNavigation = [
  { href: "/", label: "首頁" },
  { href: "/#glossary", label: "樂器對照" },
  { href: "/band-knowledge", label: "管樂團知識" },
  { href: "/instruments", label: "樂器介紹" },
  { href: "/basics", label: "演奏基本功" },
  { href: "/appreciation", label: "音樂賞析" },
] as const;

export const beginnerPath = [
  { href: "/band-knowledge", title: "管樂團知識", en: "Concert Band Guide", text: "先了解樂團由哪些家族組成，以及大家在舞台上的位置。" },
  { href: "/instruments", title: "樂器介紹", en: "Instruments", text: "接著認識常見打擊樂器的名稱、分類與聲音。" },
  { href: "/basics", title: "演奏基本功", en: "Playing Basics", text: "再從握棒、姿勢與回彈建立穩定的動作。" },
  { href: "/appreciation", title: "音樂賞析", en: "Music Appreciation", text: "最後把樂器放回作品中，聽見管樂團的完整樣貌。" },
] as const;

export const homeLessons = [
  { href: "/basics", title: "演奏基本功", en: "Playing Basics", text: "怎麼握鼓棒？姿勢長什麼樣？" },
  { href: "/instruments", title: "樂器介紹", en: "Instruments", text: "一次認識鼓與鈸類、琴類、小型與特殊打擊樂器。" },
  { href: "/appreciation", title: "音樂賞析", en: "Music Appreciation", text: "從經典原創曲、行進曲，到電影、遊戲與流行音樂改編，探索管樂的廣大世界。" },
  { href: "/band-knowledge", title: "管樂團知識", en: "Concert Band Guide", text: "從可點選的樂團配置圖開始，逐步認識木管、銅管與打擊樂器在舞台上的位置。" },
] as const;
